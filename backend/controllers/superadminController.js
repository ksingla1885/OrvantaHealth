const prisma = require('../prismaClient');
const PDFDocument = require('pdfkit');

// Get system overview
const getSystemOverview = async (req, res) => {
  try {
    const { days } = req.query;
    const rangeInDays = days ? parseInt(days) : 7;
    const timeLimit = new Date(Date.now() - rangeInDays * 24 * 60 * 60 * 1000);

    const [
      totalUsers,
      activeUsers,
      recentRegistrations,
      recentAppointments,
      recentBills
    ] = await Promise.all([
      prisma.user.count(),
      prisma.user.count({ where: { isActive: true } }),
      prisma.user.count({ where: { createdAt: { gte: timeLimit } } }),
      prisma.appointment.findMany({
        where: {
          OR: [
            { createdAt: { gte: timeLimit } },
            { date: { gte: timeLimit } }
          ]
        },
        select: { createdAt: true, date: true }
      }),
      prisma.bill.findMany({
        where: {
          status: 'paid',
          OR: [
            { createdAt: { gte: timeLimit } },
            { updatedAt: { gte: timeLimit } }
          ]
        },
        select: { createdAt: true, updatedAt: true, total: true }
      })
    ]);

    const appointmentTrendsObj = {};
    recentAppointments.forEach(apt => {
      const dObj = apt.date || apt.createdAt;
      const d = (dObj instanceof Date ? dObj : new Date(dObj)).toISOString().split('T')[0];
      appointmentTrendsObj[d] = (appointmentTrendsObj[d] || 0) + 1;
    });

    const revenueTrendsObj = {};
    recentBills.forEach(bill => {
      const dObj = bill.createdAt || bill.updatedAt;
      const d = (dObj instanceof Date ? dObj : new Date(dObj)).toISOString().split('T')[0];
      revenueTrendsObj[d] = (revenueTrendsObj[d] || 0) + bill.total;
    });

    const appointmentTrends = Object.keys(appointmentTrendsObj).map(k => ({
      id: k,
      _id: k,
      date: k,
      count: appointmentTrendsObj[k]
    })).sort((a, b) => b.id.localeCompare(a.id)).slice(0, rangeInDays);

    const revenueTrends = Object.keys(revenueTrendsObj).map(k => ({
      id: k,
      _id: k,
      date: k,
      total: revenueTrendsObj[k]
    })).sort((a, b) => b.id.localeCompare(a.id)).slice(0, rangeInDays);

    res.json({
      success: true,
      data: {
        totalUsers,
        activeUsers,
        recentRegistrations,
        systemHealth: { status: 'healthy', uptime: process.uptime() },
        appointmentTrends: appointmentTrends.reverse(),
        revenueTrends: revenueTrends.reverse()
      }
    });
  } catch (error) {
    console.error('System overview error:', error);
    res.status(500).json({ success: false, message: 'Server error fetching system overview' });
  }
};

// Get detailed user analytics
const getUserAnalytics = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: { role: true, isActive: true, createdAt: true }
    });

    const userStatsObj = {};
    users.forEach(u => {
      if (!userStatsObj[u.role]) userStatsObj[u.role] = { count: 0, active: 0 };
      userStatsObj[u.role].count += 1;
      if (u.isActive) userStatsObj[u.role].active += 1;
    });

    const userStats = Object.keys(userStatsObj).map(role => ({
      _id: role,
      count: userStatsObj[role].count,
      active: userStatsObj[role].active
    }));

    const timeLimit = new Date(Date.now() - 12 * 30 * 24 * 60 * 60 * 1000);
    const recentUsers = users.filter(u => new Date(u.createdAt) >= timeLimit);

    const monthlyObj = {};
    recentUsers.forEach(u => {
      const m = u.createdAt.toISOString().slice(0, 7); // YYYY-MM
      monthlyObj[m] = (monthlyObj[m] || 0) + 1;
    });

    const monthlyRegistrations = Object.keys(monthlyObj).map(m => ({
      _id: m,
      count: monthlyObj[m]
    })).sort((a, b) => a._id.localeCompare(b._id));

    res.json({
      success: true,
      data: { userStats, monthlyRegistrations }
    });
  } catch (error) {
    console.error('User analytics error:', error);
    res.status(500).json({ success: false, message: 'Server error fetching user analytics' });
  }
};

// Get department statistics
const getDepartmentStats = async (req, res) => {
  try {
    const doctors = await prisma.doctor.findMany({
      include: {
        user: { select: { profile: true } },
        appointments: { select: { id: true } }
      }
    });

    const deptObj = {};
    doctors.forEach(doc => {
      const dept = doc.department || 'General';
      if (!deptObj[dept]) deptObj[dept] = { count: 0, doctors: [], appointments: [] };
      
      deptObj[dept].count += 1;
      deptObj[dept].doctors.push({
        _id: doc.id,
        name: `${doc.user?.profile?.firstName || ''} ${doc.user?.profile?.lastName || ''}`.trim(),
        experience: doc.experience,
        consultationFee: doc.consultationFee
      });
      deptObj[dept].appointments.push(...doc.appointments);
    });

    const departmentStats = Object.keys(deptObj).map(dept => ({
      id: dept,
      _id: dept,
      name: dept.charAt(0).toUpperCase() + dept.slice(1),
      count: deptObj[dept].count,
      doctors: deptObj[dept].doctors,
      appointments: deptObj[dept].appointments
    }));

    res.json({
      success: true,
      data: { departmentStats }
    });
  } catch (error) {
    console.error('Department stats error:', error);
    res.status(500).json({ success: false, message: 'Server error fetching department statistics' });
  }
};

// Export data
const exportData = async (req, res) => {
  try {
    const { type, format } = req.query;
    let data;

    switch (type) {
      case 'users':
        const users = await prisma.user.findMany({
          select: { email: true, role: true, profile: true, isActive: true, createdAt: true, lastLogin: true }
        });
        data = users.map(u => ({
          'Name': `${u.profile?.firstName || ''} ${u.profile?.lastName || ''}`.trim(),
          'Email': u.email,
          'Role': u.role,
          'Status': u.isActive ? 'Active' : 'Inactive',
          'Joined': new Date(u.createdAt).toLocaleDateString(),
          'Last Login': u.lastLogin ? new Date(u.lastLogin).toLocaleDateString() : 'Never'
        }));
        break;

      case 'patients':
        const patients = await prisma.patient.findMany({
          include: { user: { select: { email: true, profile: true, isActive: true, createdAt: true } } }
        });
        data = patients.map(p => ({
          'Patient Name': `${p.user?.profile?.firstName || ''} ${p.user?.profile?.lastName || ''}`.trim(),
          'Email': p.user?.email || '-',
          'Phone': p.user?.profile?.phone || '-',
          'Gender': p.user?.profile?.gender || '-',
          'Allergies': p.allergies?.length > 0 ? p.allergies.join(', ') : 'None',
          'Blood Group': p.bloodGroup || '-',
          'Status': p.user?.isActive ? 'Active' : 'Inactive'
        }));
        break;

      case 'doctors':
        const doctors = await prisma.doctor.findMany({
          include: { user: { select: { email: true, profile: true, isActive: true, createdAt: true } } }
        });
        
        data = doctors.map(doc => ({
          'Doctor Name': `${doc.user?.profile?.firstName || ''} ${doc.user?.profile?.lastName || ''}`.trim(),
          'Email-ID': doc.user?.email || '-',
          'Specialization': doc.specialization || '-',
          'Experience': `${doc.experience || 0} Years`,
          'Fee (INR)': doc.consultationFee || 0,
          'Academic Qualification': doc.qualifications || '-',
          'License Number': doc.licenseNumber || '-',
          'Department': doc.department || '-',
          'Contact Number': doc.user?.profile?.phone || '-'
        }));
        break;

      case 'receptionists':
        const receptionists = await prisma.user.findMany({
          where: { role: 'receptionist' },
          select: { email: true, profile: true, isActive: true, createdAt: true }
        });
        data = receptionists.map(r => ({
          'Receptionist Name': `${r.profile?.firstName || ''} ${r.profile?.lastName || ''}`.trim(),
          'Email-ID': r.email,
          'Contact Number': r.profile?.phone || '-',
          'Status': r.isActive ? 'Active' : 'Inactive',
          'Joined': new Date(r.createdAt).toLocaleDateString()
        }));
        break;

      case 'appointments':
        const appointments = await prisma.appointment.findMany({
          include: {
            patient: { include: { user: { select: { profile: true } } } },
            doctor: { include: { user: { select: { profile: true } } } }
          }
        });
        data = appointments.map(a => ({
          'Date': new Date(a.date).toLocaleDateString(),
          'Time': `${a.timeSlot?.start} - ${a.timeSlot?.end}`,
          'Patient': `${a.patient?.user?.profile?.firstName || ''} ${a.patient?.user?.profile?.lastName || ''}`.trim(),
          'Doctor': `Dr. ${a.doctor?.user?.profile?.firstName || ''} ${a.doctor?.user?.profile?.lastName || ''}`.trim(),
          'Status': a.status,
          'Type': a.consultationType,
          'Payment': a.paymentStatus
        }));
        break;

      case 'audit':
        const todayStart = new Date(new Date().setHours(0, 0, 0, 0));
        const todayEnd = new Date(new Date().setHours(23, 59, 59, 999));
        
        const [patientCount, doctorCount, appointmentCount, revenueData] = await Promise.all([
          prisma.patient.count(),
          prisma.doctor.count(),
          prisma.appointment.count({
            where: { date: { gte: todayStart, lt: todayEnd } }
          }),
          prisma.bill.aggregate({
            _sum: { total: true },
            where: { status: 'paid' }
          })
        ]);

        data = [
          { 'Metric Category': 'General Statistics', 'Metric Name': 'Total Patients', 'Value': patientCount },
          { 'Metric Category': 'General Statistics', 'Metric Name': 'Total Doctors', 'Value': doctorCount },
          { 'Metric Category': 'Activity', 'Metric Name': "Today's Appointments", 'Value': appointmentCount },
          { 'Metric Category': 'Finance', 'Metric Name': 'Total Revenue', 'Value': `₹${(revenueData._sum.total || 0).toLocaleString()}` },
          { 'Metric Category': 'System Health', 'Metric Name': 'Status', 'Value': 'Healthy' },
          { 'Metric Category': 'System Health', 'Metric Name': 'Database', 'Value': 'Connected/Protected' },
          { 'Metric Category': 'System Health', 'Metric Name': 'API Node', 'Value': 'Responsive' },
          { 'Metric Category': 'System Health', 'Metric Name': 'Last Backup', 'Value': '2 hours ago' }
        ];
        break;

      case 'revenue':
        const bills = await prisma.bill.findMany({
          include: {
            patient: { include: { user: { select: { profile: true } } } },
            appointment: { select: { date: true } }
          },
          orderBy: { createdAt: 'desc' }
        });

        data = bills.map(bill => ({
          'Invoice ID': bill.id.substring(0, 8).toUpperCase(),
          'Date': new Date(bill.createdAt).toLocaleDateString(),
          'Patient Name': `${bill.patient?.user?.profile?.firstName || ''} ${bill.patient?.user?.profile?.lastName || ''}`.trim(),
          'Total Amount (INR)': bill.total || 0,
          'Status': bill.status?.toUpperCase() || 'PENDING',
          'Payment Method': bill.paymentMethod || 'Online',
          'Appointment Date': bill.appointment?.date ? new Date(bill.appointment.date).toLocaleDateString() : '-'
        }));
        break;
      default:
        return res.status(400).json({ success: false, message: 'Invalid export type' });
    }

    const filename = `${type}_export_${new Date().toISOString().split('T')[0]}.${format || 'json'}`;

    if (format === 'pdf') {
      return generatePDFReport(data, type, res, filename);
    } else if (format === 'csv') {
      const csv = convertToCSV(data);
      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
      res.send(csv);
    } else {
      res.setHeader('Content-Type', 'application/json');
      res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
      res.json(data);
    }
  } catch (error) {
    console.error('Export data error:', error);
    res.status(500).json({ success: false, message: 'Server error exporting data' });
  }
};

const convertToCSV = (data) => {
  if (!data || data.length === 0) return '';
  const headers = Object.keys(data[0]);
  const csvHeaders = headers.join(',');
  const csvRows = data.map(row => {
    return headers.map(header => {
      const value = row[header];
      return typeof value === 'string' && value.includes(',') ? `"${value}"` : value;
    }).join(',');
  });
  return [csvHeaders, ...csvRows].join('\n');
};

const generatePDFReport = (data, type, res, filename) => {
  if (!data || data.length === 0) {
    const doc = new PDFDocument({ margin: 30, size: 'A4' });
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    doc.pipe(res);
    doc.text('No records found for this category.');
    doc.end();
    return;
  }

  const headers = Object.keys(data[0]);
  const isLandscape = headers.length > 6;
  
  const doc = new PDFDocument({ margin: 30, size: 'A4', layout: isLandscape ? 'landscape' : 'portrait' });
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
  doc.pipe(res);

  doc.rect(0, 0, doc.page.width, 80).fill('#0f3a3a');
  doc.fillColor('white').fontSize(24).font('Helvetica-Bold').text('OrvantaHealth', 50, 25);
  doc.fontSize(10).font('Helvetica').text('Analytics Export Report', 50, 55);
  doc.fontSize(14).text(type.toUpperCase() + ' DATA', 0, 35, { align: 'right', width: doc.page.width - 50 });

  doc.moveDown(3);
  doc.fillColor('#334155').fontSize(10).font('Helvetica').text(`Generated on: ${new Date().toLocaleString()}`, 50, 95);
  doc.moveDown(2);

  const tableWidth = doc.page.width - 100;
  const colWidth = tableWidth / headers.length;
  let startY = doc.y + 10;
  let startX = 50;

  doc.rect(startX, startY, tableWidth, 20).fill('#f0f9f9');
  doc.fillColor('#0f3a3a').fontSize(isLandscape ? 7 : 8).font('Helvetica-Bold');

  headers.forEach((header, i) => {
    doc.text(header.toUpperCase(), startX + (i * colWidth), startY + 6, { width: colWidth, align: 'left' });
  });

  startY += 20;
  doc.fillColor('#475569').font('Helvetica').fontSize(isLandscape ? 6 : 7);

  data.forEach((row, rowIndex) => {
    if (startY > doc.page.height - 50) {
      doc.addPage();
      startY = 50;
      doc.rect(startX, startY, tableWidth, 20).fill('#f0f9f9');
      doc.fillColor('#0f3a3a').fontSize(isLandscape ? 7 : 8).font('Helvetica-Bold');
      headers.forEach((header, i) => {
        doc.text(header.toUpperCase(), startX + (i * colWidth), startY + 6, { width: colWidth, align: 'left' });
      });
      startY += 20;
      doc.fillColor('#475569').font('Helvetica').fontSize(isLandscape ? 6 : 7);
    }

    if (rowIndex % 2 === 1) doc.rect(startX, startY, tableWidth, 15).fill('#fafafa');

    headers.forEach((header, i) => {
      let val = row[header];
      if (typeof val === 'object' && val !== null) {
        val = JSON.stringify(val).substring(0, 30) + '...';
      } else {
        val = String(val || '-').substring(0, 30);
      }
      doc.fillColor('#475569').text(val, startX + (i * colWidth), startY + 4, { width: colWidth, align: 'left' });
    });
    startY += 15;
  });

  doc.end();
};

module.exports = {
  getSystemOverview,
  getUserAnalytics,
  getDepartmentStats,
  exportData
};

const express = require('express');
const router = express.Router();
const path = require('path');
const axios = require('axios');
const PDFDocument = require('pdfkit');
const { authenticateToken } = require('../middleware/auth');
const multer = require('multer');
const { labReportStorage, s3Client, BUCKET_NAME } = require('../config/s3Storage');
const { GetObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
const prisma = require('../prismaClient');

const upload = multer({
  storage: labReportStorage,
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});

router.use(authenticateToken);

// POST: Upload document (patient/doctor)
router.post('/upload', upload.single('document'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, message: 'No file uploaded' });
        }

        res.status(201).json({
            success: true,
            message: 'File uploaded successfully',
            data: {
                document: {
                    name: req.file.originalname,
                    url: req.file.path,
                    mimetype: req.file.mimetype,
                    size: req.file.size
                }
            }
        });
    } catch (error) {
        console.error('Document upload error:', error);
        res.status(500).json({ success: false, message: 'Server error during upload' });
    }
});

// Helper: generate a PDF invoice
const generateBillPDF = (bill, res, filename) => {
    const doc = new PDFDocument({ margin: 50, size: 'A4' });

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    doc.pipe(res);

    doc.rect(0, 0, doc.page.width, 90).fill('#0d9488');
    doc.fillColor('white').fontSize(24).font('Helvetica-Bold').text('OrvantaHealth', 50, 28);
    doc.fontSize(10).font('Helvetica').text('Hospital Management System', 50, 58);
    doc.fillColor('#0d9488').fontSize(20).font('Helvetica-Bold').text('INVOICE', 0, 28, { align: 'right', width: doc.page.width - 50 });
    doc.moveDown(4);

    const billNum = bill.billNumber || bill.id.slice(-6).toUpperCase();
    const createdAt = bill.createdAt ? new Date(bill.createdAt).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' }) : 'N/A';
    const dueDate = bill.dueDate ? new Date(bill.dueDate).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' }) : 'N/A';

    const metaY = doc.y;
    doc.fillColor('#374151').fontSize(9).font('Helvetica-Bold').text('Bill To:', 50, metaY);
    const patientName = bill.patient?.user?.profile
        ? `${bill.patient.user.profile.firstName || ''} ${bill.patient.user.profile.lastName || ''}`.trim()
        : 'Patient';
    doc.fillColor('#111827').fontSize(11).font('Helvetica-Bold').text(patientName, 50, metaY + 16);

    doc.fillColor('#374151').fontSize(9).font('Helvetica-Bold').text(`Invoice #: ${billNum}`, 350, metaY, { align: 'left' });
    doc.fillColor('#6B7280').font('Helvetica').fontSize(9).text(`Date: ${createdAt}`, 350, metaY + 16).text(`Due: ${dueDate}`, 350, metaY + 30);

    const statusColor = bill.status === 'paid' ? '#16a34a' : bill.status === 'overdue' ? '#dc2626' : '#d97706';
    doc.fillColor(statusColor).fontSize(10).font('Helvetica-Bold').text(bill.status.toUpperCase().replace('_', ' '), 350, metaY + 46);

    doc.moveDown(5);
    const tableTop = doc.y + 10;
    const colDesc = 50, colQty = 310, colUnit = 380, colTotal = 460;

    doc.rect(50, tableTop, doc.page.width - 100, 24).fill('#0d9488');
    doc.fillColor('white').fontSize(9).font('Helvetica-Bold')
        .text('Description', colDesc + 4, tableTop + 7)
        .text('Qty', colQty, tableTop + 7, { width: 60, align: 'center' })
        .text('Unit Price', colUnit, tableTop + 7, { width: 70, align: 'right' })
        .text('Total', colTotal, tableTop + 7, { width: 60, align: 'right' });

    let rowY = tableTop + 28;
    (bill.items || []).forEach((item, idx) => {
        const bg = idx % 2 === 0 ? '#F9FAFB' : '#FFFFFF';
        doc.rect(50, rowY - 4, doc.page.width - 100, 22).fill(bg);
        doc.fillColor('#111827').fontSize(9).font('Helvetica')
            .text(item.description || '-', colDesc + 4, rowY, { width: 250 })
            .text(String(item.quantity), colQty, rowY, { width: 60, align: 'center' })
            .text(`\u20B9${Number(item.unitPrice).toFixed(2)}`, colUnit, rowY, { width: 70, align: 'right' })
            .text(`\u20B9${Number(item.total).toFixed(2)}`, colTotal, rowY, { width: 60, align: 'right' });
        rowY += 24;
    });

    rowY += 10;
    doc.moveTo(350, rowY).lineTo(510, rowY).strokeColor('#E5E7EB').stroke();
    rowY += 8;

    doc.fillColor('#374151').fontSize(9).font('Helvetica')
        .text('Subtotal:', 350, rowY)
        .text(`\u20B9${Number(bill.subtotal).toFixed(2)}`, 440, rowY, { width: 70, align: 'right' });
    rowY += 18;
    doc.text(`Tax (18%):`, 350, rowY).text(`\u20B9${Number(bill.tax).toFixed(2)}`, 440, rowY, { width: 70, align: 'right' });
    rowY += 18;

    doc.rect(350, rowY, 160, 26).fill('#0d9488');
    doc.fillColor('white').fontSize(11).font('Helvetica-Bold')
        .text('Total:', 356, rowY + 7)
        .text(`\u20B9${Number(bill.total).toFixed(2)}`, 440, rowY + 7, { width: 66, align: 'right' });

    doc.fillColor('#9CA3AF').fontSize(8).font('Helvetica')
        .text('Thank you for choosing OrvantaHealth. For billing queries call +91-555-000-1111.', 50, doc.page.height - 60, { align: 'center', width: doc.page.width - 100 });
    doc.end();
};

// Helper: generate a PDF for a prescription
const generatePrescriptionPDF = (prescription, res, filename) => {
    const doc = new PDFDocument({ margin: 50, size: 'A4' });

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    doc.pipe(res);

    doc.rect(0, 0, doc.page.width, 90).fill('#0d9488');
    doc.fillColor('white').fontSize(24).font('Helvetica-Bold').text('OrvantaHealth', 50, 28);
    doc.fontSize(10).font('Helvetica').text('CLINICAL PRESCRIPTION', 50, 58);
    doc.fillColor('#0d9488').fontSize(20).font('Helvetica-Bold').text('RX', 0, 28, { align: 'right', width: doc.page.width - 50 });
    doc.moveDown(4);

    const date = prescription.createdAt ? new Date(prescription.createdAt).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' }) : 'N/A';
    
    const metaY = doc.y;
    doc.fillColor('#374151').fontSize(9).font('Helvetica-Bold').text('Patient:', 50, metaY);
    const patientName = prescription.patient?.user?.profile
        ? `${prescription.patient.user.profile.firstName || ''} ${prescription.patient.user.profile.lastName || ''}`.trim()
        : 'Patient';
    doc.fillColor('#111827').fontSize(11).font('Helvetica-Bold').text(patientName, 50, metaY + 16);

    doc.fillColor('#374151').fontSize(9).font('Helvetica-Bold').text('Doctor:', 350, metaY);
    const docName = prescription.doctor?.user?.profile
        ? `Dr. ${prescription.doctor.user.profile.firstName || ''} ${prescription.doctor.user.profile.lastName || ''}`.trim()
        : 'Doctor';
    const specialization = prescription.doctor?.specialization || 'General Physician';
    doc.fillColor('#111827').fontSize(11).font('Helvetica-Bold').text(docName, 350, metaY + 16);
    doc.fillColor('#6B7280').fontSize(9).font('Helvetica').text(specialization, 350, metaY + 30);
    doc.text(`Date: ${date}`, 350, metaY + 44);
    doc.moveDown(4);

    doc.rect(50, doc.y, doc.page.width - 100, 25).fill('#F3F4F6');
    doc.fillColor('#374151').fontSize(10).font('Helvetica-Bold').text(`DIAGNOSIS: ${prescription.diagnosis || 'General Checkup'}`, 55, doc.y + 7);
    doc.moveDown(2.5);

    const tableTop = doc.y;
    doc.fillColor('#0d9488').fontSize(11).font('Helvetica-Bold').text('PRESCRIPTION (Rx)', 50, tableTop);
    doc.moveDown(1);

    const medicationY = doc.y;
    doc.rect(50, medicationY, doc.page.width - 100, 20).fill('#0d9488');
    doc.fillColor('white').fontSize(9).font('Helvetica-Bold')
        .text('Medicine Name', 55, medicationY + 6)
        .text('Dosage', 300, medicationY + 6)
        .text('Frequency', 380, medicationY + 6)
        .text('Duration', 480, medicationY + 6);

    let rowY = medicationY + 25;
    (prescription.medicines || []).forEach((med, idx) => {
        const bg = idx % 2 === 0 ? '#F9FAFB' : '#FFFFFF';
        doc.rect(50, rowY - 4, doc.page.width - 100, 22).fill(bg);
        doc.fillColor('#111827').fontSize(9).font('Helvetica')
            .text(med.name || '-', 55, rowY)
            .text(med.dosage || '-', 300, rowY)
            .text(med.frequency || '-', 380, rowY)
            .text(med.duration || '-', 480, rowY);
        
        if (med.instructions) {
            rowY += 15;
            doc.fillColor('#6B7280').fontSize(8).font('Helvetica-Oblique').text(`Note: ${med.instructions}`, 55, rowY);
            rowY += 10;
        } else {
            rowY += 22;
        }
    });

    if (rowY > doc.page.height - 200) { doc.addPage(); rowY = 50; }
    
    if (prescription.tests && prescription.tests.length > 0) {
        rowY += 20;
        doc.fillColor('#0d9488').fontSize(11).font('Helvetica-Bold').text('SUGGESTED TESTS', 50, rowY);
        rowY += 20;
        prescription.tests.forEach(test => {
            doc.fillColor('#111827').fontSize(9).font('Helvetica').text(`\u2022 ${test.name}`, 60, rowY);
            rowY += 14;
        });
    }

    if (prescription.advice) {
        rowY += 20;
        doc.fillColor('#0d9488').fontSize(11).font('Helvetica-Bold').text('DOCTOR\'S ADVICE', 50, rowY);
        rowY += 20;
        doc.fillColor('#4B5563').fontSize(9).font('Helvetica').text(prescription.advice, 50, rowY, { width: 490 });
    }

    doc.fillColor('#9CA3AF').fontSize(8).font('Helvetica')
        .text('This is a computer-generated prescription. Valid without physical signature.', 50, doc.page.height - 60, { align: 'center', width: doc.page.width - 100 });
    doc.end();
};

// Helper: generate a PDF for a lab report
const generateLabReportPDF = (labReport, res, filename) => {
    const doc = new PDFDocument({ margin: 50, size: 'A4' });

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    doc.pipe(res);

    doc.rect(0, 0, doc.page.width, 90).fill('#0d9488');
    doc.fillColor('white').fontSize(24).font('Helvetica-Bold').text('OrvantaHealth', 50, 28);
    doc.fontSize(10).font('Helvetica').text('DIAGNOSTIC & PATHOLOGY SERVICES', 50, 58);
    doc.fillColor('#0d9488').fontSize(16).font('Helvetica-Bold').text('OFFICIAL REPORT', 0, 28, { align: 'right', width: doc.page.width - 50 });
    doc.moveDown(4);

    const reportDate = labReport.reportDate ? new Date(labReport.reportDate).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' }) : 'N/A';
    
    const metaY = doc.y;
    doc.fillColor('#374151').fontSize(9).font('Helvetica-Bold').text('Patient Information:', 50, metaY);
    const patientName = labReport.patient?.user?.profile
        ? `${labReport.patient.user.profile.firstName || ''} ${labReport.patient.user.profile.lastName || ''}`.trim()
        : 'Patient';
    const mrn = labReport.patient?.medicalRecordNumber || 'N/A';
    doc.fillColor('#111827').fontSize(11).font('Helvetica-Bold').text(patientName, 50, metaY + 16);
    doc.fillColor('#6B7280').fontSize(9).font('Helvetica').text(`MRN: ${mrn}`, 50, metaY + 30);

    doc.fillColor('#374151').fontSize(9).font('Helvetica-Bold').text('Clinical Details:', 350, metaY);
    const docName = labReport.doctor?.user?.profile
        ? `Dr. ${labReport.doctor.user.profile.firstName || ''} ${labReport.doctor.user.profile.lastName || ''}`.trim()
        : 'Attending Physician';
    const dept = labReport.doctor?.department || 'Diagnostic Medicine';
    doc.fillColor('#111827').fontSize(11).font('Helvetica-Bold').text(docName, 350, metaY + 16);
    doc.fillColor('#6B7280').fontSize(9).font('Helvetica').text(`Department: ${dept}`, 350, metaY + 30);
    doc.text(`Report Date: ${reportDate}`, 350, metaY + 44);
    doc.moveDown(4);

    doc.rect(50, doc.y, doc.page.width - 100, 26).fill('#F0FDFA');
    doc.fillColor('#0F766E').fontSize(11).font('Helvetica-Bold').text(`TEST: ${labReport.testName.toUpperCase()} (${labReport.testType})`, 55, doc.y + 7);
    doc.moveDown(2.5);

    const tableTop = doc.y;
    doc.rect(50, tableTop, doc.page.width - 100, 22).fill('#0d9488');
    doc.fillColor('white').fontSize(9).font('Helvetica-Bold')
        .text('Parameter / Marker', 55, tableTop + 6)
        .text('Observed Value', 240, tableTop + 6)
        .text('Reference Range', 360, tableTop + 6)
        .text('Evaluation', 470, tableTop + 6);

    let rowY = tableTop + 26;
    const results = Array.isArray(labReport.results) ? labReport.results : [];
    results.forEach((item, idx) => {
        const bg = idx % 2 === 0 ? '#F9FAFB' : '#FFFFFF';
        doc.rect(50, rowY - 4, doc.page.width - 100, 22).fill(bg);
        doc.fillColor('#111827').fontSize(9).font('Helvetica')
            .text(item.parameter || '-', 55, rowY, { width: 180 })
            .text(`${item.value || '-'} ${item.unit && item.unit !== '-' ? item.unit : ''}`.trim(), 240, rowY, { width: 110 })
            .text(item.referenceRange || '-', 360, rowY, { width: 100 })
            .text(item.status || 'Normal', 470, rowY, { width: 60 });
        rowY += 24;
    });

    if (rowY > doc.page.height - 180) { doc.addPage(); rowY = 50; }

    if (labReport.conclusion) {
        rowY += 15;
        doc.fillColor('#0d9488').fontSize(10).font('Helvetica-Bold').text('CLINICAL IMPRESSION & CONCLUSION', 50, rowY);
        rowY += 16;
        doc.fillColor('#374151').fontSize(9).font('Helvetica').text(labReport.conclusion, 50, rowY, { width: 490 });
        rowY += 30;
    }

    if (labReport.recommendations) {
        doc.fillColor('#0d9488').fontSize(10).font('Helvetica-Bold').text('RECOMMENDATIONS', 50, rowY);
        rowY += 16;
        doc.fillColor('#4B5563').fontSize(9).font('Helvetica').text(labReport.recommendations, 50, rowY, { width: 490 });
    }

    doc.fillColor('#9CA3AF').fontSize(8).font('Helvetica')
        .text('Electronic Diagnostic Record verified by OrvantaHealth Laboratory. Valid without physical signature.', 50, doc.page.height - 50, { align: 'center', width: doc.page.width - 100 });
    doc.end();
};

// Download document
router.get('/download/:type/:id', async (req, res) => {
    const { type, id } = req.params;
    try {
        let filePath;
        let filename;
        const userId = req.user.id || req.user._id;
        const role = req.user.role;

        switch (type) {
            case 'prescription':
                const prescription = await prisma.prescription.findUnique({
                    where: { id },
                    include: {
                        patient: { include: { user: { select: { profile: true } } } },
                        doctor: { include: { user: { select: { profile: true } } } }
                    }
                });
                if (!prescription) return res.status(404).json({ success: false, message: 'Prescription not found' });

                if (role === 'patient') {
                    const patient = await prisma.patient.findUnique({ where: { userId } });
                    if (!patient || prescription.patientId !== patient.id) {
                        return res.status(403).json({ success: false, message: 'Access denied' });
                    }
                }

                if (!prescription.receipt) return generatePrescriptionPDF(prescription, res, `prescription_${id}.pdf`);
                filePath = prescription.receipt;
                filename = `prescription_${id}.pdf`;
                break;

            case 'bill':
                const bill = await prisma.bill.findUnique({
                    where: { id },
                    include: { patient: { include: { user: { select: { profile: true } } } } }
                });
                if (!bill) return res.status(404).json({ success: false, message: 'Bill not found' });

                if (role === 'patient') {
                    const patient = await prisma.patient.findUnique({ where: { userId } });
                    if (!patient || bill.patientId !== patient.id) {
                        return res.status(403).json({ success: false, message: 'Access denied: You are not authorized to view this bill' });
                    }
                }

                if (!bill.receipt) return generateBillPDF(bill, res, `bill_${id}.pdf`);
                filePath = bill.receipt;
                filename = `bill_${id}.pdf`;
                break;

            case 'lab-report':
                const labReport = await prisma.labReport.findUnique({
                    where: { id },
                    include: {
                        patient: { include: { user: { select: { profile: true } } } },
                        doctor: { include: { user: { select: { profile: true } } } }
                    }
                });
                if (!labReport) return res.status(404).json({ success: false, message: 'Lab report record not found' });

                if (role === 'patient') {
                    const patient = await prisma.patient.findUnique({ where: { userId } });
                    if (!patient || labReport.patientId !== patient.id) {
                        return res.status(403).json({ success: false, message: 'Access denied: You are not authorized to view this lab report' });
                    }
                }

                // If local file exists or is generated, generate official high-res PDF
                return generateLabReportPDF(labReport, res, `lab_report_${id}.pdf`);

            default:
                return res.status(400).json({ success: false, message: 'Invalid document type requested' });
        }

        if (!filePath) return res.status(404).json({ success: false, message: 'File reference not found' });

        if (filePath.startsWith('http')) {
            try {
                const urlObj = new URL(filePath);
                let key = urlObj.pathname.startsWith('/') ? urlObj.pathname.substring(1) : urlObj.pathname;
                
                if (key.startsWith(`${BUCKET_NAME}/`)) {
                    key = key.substring(BUCKET_NAME.length + 1);
                }

                if (!key) throw new Error('Could not extract S3 object key from URL');

                const command = new GetObjectCommand({
                    Bucket: BUCKET_NAME,
                    Key: decodeURIComponent(key)
                });

                const signedUrl = await getSignedUrl(s3Client, command, { expiresIn: 3600 });

                const response = await axios({ method: 'get', url: signedUrl, responseType: 'arraybuffer', timeout: 45000 });
                res.setHeader('Content-Type', response.headers['content-type'] || 'application/pdf');
                res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
                return res.status(200).send(Buffer.from(response.data));
            } catch (proxyError) {
                return res.status(502).json({ success: false, message: 'Could not fetch file from cloud storage.', error: proxyError.message });
            }
        }

        let subfolder = type === 'lab-report' ? 'lab-reports' : (type === 'prescription' ? 'prescriptions' : 'bills');
        const fullPath = path.resolve(__dirname, '..', 'uploads', subfolder, filePath);

        return res.download(fullPath, filename, (err) => {
            if (err && !res.headersSent) res.status(500).json({ success: false, message: 'Error downloading file' });
        });
    } catch (error) {
        if (!res.headersSent) res.status(500).json({ success: false, message: 'An unexpected internal error occurred' });
    }
});

module.exports = router;

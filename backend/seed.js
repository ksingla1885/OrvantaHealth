require('dotenv').config();
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const prisma = require('./prismaClient');

async function seed() {
  console.log('------------------------------------------------------------');
  console.log('🚀 Starting OrvantaHealth Full Database Seeding');
  console.log('------------------------------------------------------------');

  try {
    // 1. Clean existing records in referential integrity order
    console.log('🧹 Cleaning existing data...');
    await prisma.auditLog.deleteMany();
    await prisma.contactMessage.deleteMany();
    await prisma.bedCapacity.deleteMany();
    await prisma.bill.deleteMany();
    await prisma.labReport.deleteMany();
    await prisma.prescription.deleteMany();
    await prisma.appointment.deleteMany();
    await prisma.triageRecord.deleteMany();
    await prisma.patient.deleteMany();
    await prisma.doctor.deleteMany();
    await prisma.user.deleteMany();
    console.log('✅ Clean complete.');

    // Passwords
    const defaultPassword = 'Password123!';
    const adminPasswordHash = await bcrypt.hash('Welcomeadmin', 10);
    const doctorPasswordHash = await bcrypt.hash('Doctor123!', 10);
    const receptionistPasswordHash = await bcrypt.hash('Reception123!', 10);
    const patientPasswordHash = await bcrypt.hash('Patient123!', 10);

    // =========================================================================
    // 2. SEED SUPERADMIN
    // =========================================================================
    console.log('👑 Seeding SuperAdmin...');
    const superAdmin = await prisma.user.create({
      data: {
        email: 'admin@orvantahealth.com',
        password: adminPasswordHash,
        role: 'superadmin',
        profile: {
          firstName: 'Vikram',
          lastName: 'Singhal',
          phone: '+91 98765 43210',
          gender: 'male',
          dateOfBirth: '1978-05-14',
          address: 'Suite 101, Executive Tower, Medical Enclave, New Delhi',
          designation: 'Chief Medical Director & Super Administrator',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250'
        },
        isActive: true,
        lastLogin: new Date()
      }
    });
    console.log(`✅ Superadmin created: ${superAdmin.email}`);

    // =========================================================================
    // 3. SEED RECEPTIONISTS (2 Receptionists: 1 Female, 1 Male)
    // =========================================================================
    console.log('💼 Seeding Receptionists (2 Staff)...');
    const receptionist1 = await prisma.user.create({
      data: {
        email: 'reception.priya@orvanta.com',
        password: receptionistPasswordHash,
        role: 'receptionist',
        profile: {
          firstName: 'Priya',
          lastName: 'Sharma',
          phone: '+91 98111 22334',
          gender: 'female',
          dateOfBirth: '1995-04-12',
          address: 'Flat 402, Lotus Greens, Sector 78, Noida, Uttar Pradesh',
          shift: 'Morning (07:00 - 15:30)',
          counterId: 'Desk-A (Main Lobby)'
        },
        isActive: true,
        lastLogin: new Date(Date.now() - 3600000 * 2)
      }
    });

    const receptionist2 = await prisma.user.create({
      data: {
        email: 'reception.rahul@orvanta.com',
        password: receptionistPasswordHash,
        role: 'receptionist',
        profile: {
          firstName: 'Rahul',
          lastName: 'Verma',
          phone: '+91 98222 33445',
          gender: 'male',
          dateOfBirth: '1993-08-22',
          address: 'B-14, Rosewood Enclave, South Extension II, New Delhi',
          shift: 'Evening (14:30 - 23:00)',
          counterId: 'Desk-B (Emergency Intake)'
        },
        isActive: true,
        lastLogin: new Date(Date.now() - 3600000 * 5)
      }
    });
    console.log(`✅ Receptionists created: ${receptionist1.email}, ${receptionist2.email}`);

    // =========================================================================
    // =========================================================================
    // 4. SEED DOCTORS (Active Staff & Former Practitioners/Archive)
    // Consultation fees: Minimum ₹2,000 baseline, scaled by department acuity & experience
    // =========================================================================
    console.log('🩺 Seeding Doctors (Active Practitioners + Former/Archived Staff)...');

    const doctorDefs = [
      // ── ACTIVE MEDICAL PRACTITIONERS (9 Staff across units) ──
      {
        firstName: 'Rajesh',
        lastName: 'Khanna',
        email: 'dr.rajesh.khanna@orvanta.com',
        gender: 'male',
        phone: '+91 98101 11223',
        dateOfBirth: '1976-03-14',
        address: '72, Golf Links, New Delhi',
        department: 'cardiology',
        specialization: 'Interventional Cardiology',
        qualifications: 'MBBS, MD, DM (Cardiology), FACC',
        experience: 16,
        licenseNumber: 'LIC-CRD-782190',
        consultationFee: 3500, // Cardiology (high acuity) + 16y experience
        dutyStatus: 'available',
        isAvailable: true,
        isActive: true,
        isOffboarded: false,
        availabilityDays: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
        timeSlots: [{ start: '09:00', end: '13:00' }, { start: '14:00', end: '17:00' }],
        rating: { average: 4.9, count: 64 }
      },
      {
        firstName: 'Ananya',
        lastName: 'Sen',
        email: 'dr.ananya.sen@orvanta.com',
        gender: 'female',
        phone: '+91 98102 22334',
        dateOfBirth: '1982-11-20',
        address: '45, Greater Kailash II, New Delhi',
        department: 'neurology',
        specialization: 'Cognitive Neurology & Epilepsy',
        qualifications: 'MBBS, MD (Medicine), DM (Neurology)',
        experience: 12,
        licenseNumber: 'LIC-NEU-549102',
        consultationFee: 2800, // Neurology + 12y experience
        dutyStatus: 'available',
        isAvailable: true,
        isActive: true,
        isOffboarded: false,
        availabilityDays: ['monday', 'wednesday', 'thursday', 'friday', 'saturday'],
        timeSlots: [{ start: '10:00', end: '14:00' }, { start: '15:00', end: '18:00' }],
        rating: { average: 4.8, count: 42 }
      },
      {
        firstName: 'Vikramaditya',
        lastName: 'Rathore',
        email: 'dr.vikram.rathore@orvanta.com',
        gender: 'male',
        phone: '+91 98103 33445',
        dateOfBirth: '1979-07-09',
        address: '12-A, Vasant Vihar, New Delhi',
        department: 'orthopedics',
        specialization: 'Joint Replacement & Sports Arthroscopy',
        qualifications: 'MBBS, MS (Orthopedics), M.Ch (Ortho)',
        experience: 15,
        licenseNumber: 'LIC-ORT-332918',
        consultationFee: 3100, // Orthopedic joint replacement + 15y experience
        dutyStatus: 'available',
        isAvailable: true,
        isActive: true,
        isOffboarded: false,
        availabilityDays: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
        timeSlots: [{ start: '09:30', end: '13:30' }, { start: '14:30', end: '17:00' }],
        rating: { average: 4.7, count: 38 }
      },
      {
        firstName: 'Sunita',
        lastName: 'Mehra',
        email: 'dr.sunita.mehra@orvanta.com',
        gender: 'female',
        phone: '+91 98104 44556',
        dateOfBirth: '1985-02-18',
        address: '88, Anand Niketan, New Delhi',
        department: 'pediatrics',
        specialization: 'Neonatal & Pediatric Critical Care',
        qualifications: 'MBBS, MD (Pediatrics), DNB (Pediatrics)',
        experience: 10,
        licenseNumber: 'LIC-PED-882314',
        consultationFee: 2500, // Pediatric critical care + 10y experience
        dutyStatus: 'available',
        isAvailable: true,
        isActive: true,
        isOffboarded: false,
        availabilityDays: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'],
        timeSlots: [{ start: '09:00', end: '13:00' }, { start: '16:00', end: '19:00' }],
        rating: { average: 4.9, count: 57 }
      },
      {
        firstName: 'Meenakshi',
        lastName: 'Sundaram',
        email: 'dr.meenakshi.s@orvanta.com',
        gender: 'female',
        phone: '+91 98105 55667',
        dateOfBirth: '1978-09-30',
        address: '33, Defense Colony, New Delhi',
        department: 'gynecology',
        specialization: 'Obstetrics & High-Risk Pregnancy',
        qualifications: 'MBBS, MS (Obstetrics & Gynecology), MRCOG (UK)',
        experience: 17,
        licenseNumber: 'LIC-GYN-991204',
        consultationFee: 3300, // High-risk maternal fetal + 17y experience
        dutyStatus: 'available',
        isAvailable: true,
        isActive: true,
        isOffboarded: false,
        availabilityDays: ['tuesday', 'wednesday', 'thursday', 'friday', 'saturday'],
        timeSlots: [{ start: '10:00', end: '14:00' }, { start: '15:00', end: '18:00' }],
        rating: { average: 4.9, count: 49 }
      },
      {
        firstName: 'Arjun',
        lastName: 'Kapoor',
        email: 'dr.arjun.kapoor@orvanta.com',
        gender: 'male',
        phone: '+91 98106 66778',
        dateOfBirth: '1987-12-05',
        address: '19, Hauz Khas Enclave, New Delhi',
        department: 'dermatology',
        specialization: 'Clinical Dermatology & Aesthetic Laser Surgery',
        qualifications: 'MBBS, MD (DVL), Fellowship in Dermatosurgery',
        experience: 9,
        licenseNumber: 'LIC-DER-441092',
        consultationFee: 2300, // Dermatology & dermatosurgery + 9y experience
        dutyStatus: 'available',
        isAvailable: true,
        isActive: true,
        isOffboarded: false,
        availabilityDays: ['monday', 'tuesday', 'thursday', 'friday', 'saturday'],
        timeSlots: [{ start: '11:00', end: '15:00' }, { start: '16:00', end: '19:00' }],
        rating: { average: 4.8, count: 35 }
      },
      {
        firstName: 'Kavita',
        lastName: 'Nair',
        email: 'dr.kavita.nair@orvanta.com',
        gender: 'female',
        phone: '+91 98107 77889',
        dateOfBirth: '1974-06-12',
        address: '64, Shanti Niketan, New Delhi',
        department: 'oncology',
        specialization: 'Medical Oncology & Targeted Immunotherapy',
        qualifications: 'MBBS, MD (Medicine), DM (Medical Oncology), ESMO',
        experience: 18,
        licenseNumber: 'LIC-ONC-112345',
        consultationFee: 3800, // Super-specialty Oncology + 18y senior experience
        dutyStatus: 'available',
        isAvailable: true,
        isActive: true,
        isOffboarded: false,
        availabilityDays: ['monday', 'tuesday', 'wednesday', 'thursday'],
        timeSlots: [{ start: '09:00', end: '14:00' }],
        rating: { average: 5.0, count: 68 }
      },
      {
        firstName: 'Devendra',
        lastName: 'Joshi',
        email: 'dr.devendra.joshi@orvanta.com',
        gender: 'male',
        phone: '+91 98108 88990',
        dateOfBirth: '1983-04-25',
        address: '5, Model Town II, Delhi',
        department: 'general',
        specialization: 'Internal Medicine, Hypertension & Diabetology',
        qualifications: 'MBBS, MD (General Medicine), PGD Diabetology',
        experience: 11,
        licenseNumber: 'LIC-GEN-667788',
        consultationFee: 2000, // Baseline minimum fee: ₹2,000 (Internal medicine, 11y)
        dutyStatus: 'available',
        isAvailable: true,
        isActive: true,
        isOffboarded: false,
        availabilityDays: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'],
        timeSlots: [{ start: '08:30', end: '13:00' }, { start: '14:00', end: '18:00' }],
        rating: { average: 4.7, count: 52 }
      },
      {
        firstName: 'Sameer',
        lastName: 'Alvi',
        email: 'dr.sameer.alvi@orvanta.com',
        gender: 'male',
        phone: '+91 98109 99001',
        dateOfBirth: '1988-10-14',
        address: '21, Civil Lines, Delhi',
        department: 'emergency',
        specialization: 'Trauma Life Support & Acute Resuscitation',
        qualifications: 'MBBS, MEM (Emergency Medicine), MRCEM (UK)',
        experience: 8,
        licenseNumber: 'LIC-EMG-221199',
        consultationFee: 2100, // Emergency medicine & acute resuscitation + 8y experience
        dutyStatus: 'available',
        isAvailable: true,
        isActive: true,
        isOffboarded: false,
        availabilityDays: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'],
        timeSlots: [{ start: '00:00', end: '12:00' }, { start: '12:00', end: '23:59' }],
        rating: { average: 4.8, count: 31 }
      },

      // ── FORMER PRACTITIONERS (ARCHIVE & DEACTIVATED STAFF) ──
      // Requirement: "in seeding add Some 'Former practicioners(Archive)' staff also in doctors side"
      {
        firstName: 'Bhaskar',
        lastName: 'Mukherjee',
        email: 'dr.bhaskar.mukherjee@orvanta.com',
        gender: 'male',
        phone: '+91 98110 00112',
        dateOfBirth: '1969-01-22',
        address: '88, Amrita Shergill Marg, New Delhi',
        department: 'cardiology',
        specialization: 'Cardiothoracic & Vascular Surgery (CTVS)',
        qualifications: 'MBBS, MS (General Surgery), M.Ch (CTVS), FACS',
        experience: 24, // Senior surgical chair
        licenseNumber: 'LIC-CTVS-110022',
        consultationFee: 4200, // Senior CTVS surgeon fee (24y exp)
        dutyStatus: 'off-duty',
        isAvailable: false,
        isActive: false,
        isOffboarded: true, // Left Institution (Archived record in audit vault)
        offboardedAt: new Date(Date.now() - 180 * 24 * 60 * 60 * 1000), // 6 months ago
        offboardedById: superAdmin.id,
        availabilityDays: [],
        timeSlots: [],
        rating: { average: 4.9, count: 112 }
      },
      {
        firstName: 'Shalini',
        lastName: 'Swaminathan',
        email: 'dr.shalini.s@orvanta.com',
        gender: 'female',
        phone: '+91 98110 00223',
        dateOfBirth: '1981-08-14',
        address: '24, Jor Bagh, New Delhi',
        department: 'pediatrics',
        specialization: 'Pediatric Neurology & Neurodevelopmental Disorders',
        qualifications: 'MBBS, MD (Pediatrics), DM (Pediatric Neurology)',
        experience: 14,
        licenseNumber: 'LIC-PNEU-773344',
        consultationFee: 2900, // Pediatric neurology super-specialist (14y exp)
        dutyStatus: 'off-duty',
        isAvailable: false,
        isActive: false,
        isOffboarded: true, // Left Institution (Archived record)
        offboardedAt: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000), // 3 months ago
        offboardedById: superAdmin.id,
        availabilityDays: [],
        timeSlots: [],
        rating: { average: 4.8, count: 54 }
      },
      {
        firstName: 'Tariq',
        lastName: 'Mansoor',
        email: 'dr.tariq.mansoor@orvanta.com',
        gender: 'male',
        phone: '+91 98110 00334',
        dateOfBirth: '1982-05-19',
        address: '17, Friends Colony West, New Delhi',
        department: 'orthopedics',
        specialization: 'Spine Surgery & Minimally Invasive Decompression',
        qualifications: 'MBBS, MS (Orthopedics), Fellowship in Spine Surgery',
        experience: 13,
        licenseNumber: 'LIC-SPN-998811',
        consultationFee: 3000, // Spine surgical specialist (13y exp)
        dutyStatus: 'on-leave',
        isAvailable: false,
        isActive: false, // Inactive status: renders 'Deactivated' badge in Doctors Management Archive tab
        isOffboarded: false, // On academic sabbatical / administrative leave
        availabilityDays: [],
        timeSlots: [],
        rating: { average: 4.7, count: 46 }
      }
    ];

    const doctors = [];
    for (const def of doctorDefs) {
      const user = await prisma.user.create({
        data: {
          email: def.email,
          password: doctorPasswordHash,
          role: 'doctor',
          profile: {
            firstName: def.firstName,
            lastName: def.lastName,
            phone: def.phone,
            gender: def.gender,
            dateOfBirth: def.dateOfBirth,
            address: def.address
          },
          isActive: def.isActive ?? true,
          isOffboarded: def.isOffboarded ?? false,
          offboardedAt: def.offboardedAt || null,
          offboardedById: def.offboardedById || null,
          lastLogin: new Date(Date.now() - Math.floor(Math.random() * 86400000 * 3))
        }
      });

      const doctor = await prisma.doctor.create({
        data: {
          userId: user.id,
          name: `Dr. ${def.firstName} ${def.lastName}`,
          specialization: def.specialization,
          qualifications: def.qualifications,
          experience: def.experience,
          licenseNumber: def.licenseNumber,
          consultationFee: def.consultationFee,
          department: def.department,
          isAvailable: def.isAvailable ?? true,
          dutyStatus: def.dutyStatus,
          rating: def.rating,
          leaves: def.leaves || [],
          availability: {
            days: def.availabilityDays,
            timeSlots: def.timeSlots
          }
        }
      });

      doctors.push({ ...doctor, user });
    }
    console.log(`✅ ${doctors.length} Doctors seeded (9 active clinical practitioners + 3 former/archived practitioners).`);

    // =========================================================================
    // 5. SEED PATIENTS (8 Patients with complete demographic & medical data)
    // =========================================================================
    console.log('🧑‍🤝‍🧑 Seeding Patients (8 Patients with full profiles)...');

    const patientDefs = [
      {
        firstName: 'Aarav',
        lastName: 'Verma',
        email: 'patient.aarav@example.com',
        gender: 'male',
        dateOfBirth: '1982-06-15',
        phone: '+91 98711 00111',
        address: 'B-204, Pinnacle Heights, Sector 62, Noida',
        mrn: 'MRN-100201',
        bloodGroup: 'O+',
        allergies: ['Penicillin', 'Dust Mites'],
        medicalHistory: [
          { condition: 'Essential Hypertension', diagnosedYear: 2020, status: 'Active (Controlled with ACEi)' },
          { condition: 'Mild Dyslipidemia', diagnosedYear: 2022, status: 'Dietary Management' }
        ],
        medications: [
          { name: 'Telmisartan 40mg', dosage: '1 tablet', frequency: 'Once daily (morning)', instructions: 'Post breakfast' },
          { name: 'Rosuvastatin 10mg', dosage: '1 tablet', frequency: 'Once daily (night)', instructions: 'Post dinner' }
        ],
        emergencyContact: {
          name: 'Pooja Verma',
          relationship: 'Spouse',
          phone: '+91 98711 00112',
          address: 'B-204, Pinnacle Heights, Sector 62, Noida'
        },
        insuranceInfo: {
          provider: 'HDFC ERGO Health Care',
          policyNumber: 'HDFC-HLT-9923841',
          coverageAmount: 1000000,
          validUntil: '2027-08-31',
          policyHolder: 'Aarav Verma'
        }
      },
      {
        firstName: 'Sunita',
        lastName: 'Roy',
        email: 'patient.sunita@example.com',
        gender: 'female',
        dateOfBirth: '1988-11-04',
        phone: '+91 98711 00222',
        address: 'A-12, Chittaranjan Park, New Delhi',
        mrn: 'MRN-100202',
        bloodGroup: 'A+',
        allergies: ['Sulfa Drugs', 'Iodine Contrast'],
        medicalHistory: [
          { condition: 'Chronic Migraine with Aura', diagnosedYear: 2018, status: 'Under Neurological Care' },
          { condition: 'Iron Deficiency Anemia', diagnosedYear: 2023, status: 'Supplementation complete' }
        ],
        medications: [
          { name: 'Propranolol 40mg', dosage: '1 tablet', frequency: 'Twice daily', instructions: 'Before meals' },
          { name: 'Naproxen 500mg', dosage: '1 tablet', frequency: 'SOS (during acute migraine attack)', instructions: 'With antacid' }
        ],
        emergencyContact: {
          name: 'Debashis Roy',
          relationship: 'Brother',
          phone: '+91 98711 00223',
          address: 'A-12, Chittaranjan Park, New Delhi'
        },
        insuranceInfo: {
          provider: 'Star Health & Allied Insurance',
          policyNumber: 'STAR-IND-4482109',
          coverageAmount: 750000,
          validUntil: '2026-12-15',
          policyHolder: 'Sunita Roy'
        }
      },
      {
        firstName: 'Harish',
        lastName: 'Mehta',
        email: 'patient.harish@example.com',
        gender: 'male',
        dateOfBirth: '1966-03-22',
        phone: '+91 98711 00333',
        address: 'Villa 18, Palm Meadows, Gurugram, Haryana',
        mrn: 'MRN-100203',
        bloodGroup: 'B+',
        allergies: ['Aspirin', 'NSAIDs'],
        medicalHistory: [
          { condition: 'Severe Bilateral Knee Osteoarthritis (Grade 3)', diagnosedYear: 2021, status: 'Physiotherapy & Injections' },
          { condition: 'Type 2 Diabetes Mellitus', diagnosedYear: 2015, status: 'Strict Glycemic Control' }
        ],
        medications: [
          { name: 'Metformin 500mg SR', dosage: '1 tablet', frequency: 'Twice daily', instructions: 'With meals' },
          { name: 'Glimepiride 1mg', dosage: '1 tablet', frequency: 'Once daily (morning)', instructions: 'Before breakfast' },
          { name: 'Glucosamine + Chondroitin', dosage: '1 capsule', frequency: 'Once daily', instructions: 'With water' }
        ],
        emergencyContact: {
          name: 'Anita Mehta',
          relationship: 'Spouse',
          phone: '+91 98711 00334',
          address: 'Villa 18, Palm Meadows, Gurugram, Haryana'
        },
        insuranceInfo: {
          provider: 'Care Health Insurance',
          policyNumber: 'CARE-SR-8831920',
          coverageAmount: 1500000,
          validUntil: '2028-03-31',
          policyHolder: 'Harish Mehta'
        }
      },
      {
        firstName: 'Pooja',
        lastName: 'Kapoor',
        email: 'patient.pooja@example.com',
        gender: 'female',
        dateOfBirth: '1995-09-18',
        phone: '+91 98711 00444',
        address: 'C-55, Lajpat Nagar III, New Delhi',
        mrn: 'MRN-100204',
        bloodGroup: 'AB+',
        allergies: ['Peanuts', 'Lactose'],
        medicalHistory: [
          { condition: 'Allergic Rhinitis', diagnosedYear: 2019, status: 'Seasonal episodes' },
          { condition: 'Post-Partum Health Wellness', diagnosedYear: 2024, status: 'Routine Check' }
        ],
        medications: [
          { name: 'Levocetirizine 5mg', dosage: '1 tablet', frequency: 'Once daily at bedtime (SOS)', instructions: 'When nasal congestion triggers' },
          { name: 'Calcium + Vit D3', dosage: '1 tablet', frequency: 'Once daily', instructions: 'After lunch' }
        ],
        emergencyContact: {
          name: 'Karan Kapoor',
          relationship: 'Spouse',
          phone: '+91 98711 00445',
          address: 'C-55, Lajpat Nagar III, New Delhi'
        },
        insuranceInfo: {
          provider: 'ICICI Lombard Complete Health',
          policyNumber: 'ICICI-FAM-3321908',
          coverageAmount: 1000000,
          validUntil: '2027-05-20',
          policyHolder: 'Karan Kapoor'
        }
      },
      {
        firstName: 'Deepa',
        lastName: 'Nair',
        email: 'patient.deepa@example.com',
        gender: 'female',
        dateOfBirth: '1991-01-29',
        phone: '+91 98711 00555',
        address: 'Flat 101, Mayfair Gardens, Hauz Khas, New Delhi',
        mrn: 'MRN-100205',
        bloodGroup: 'O-',
        allergies: ['Latex'],
        medicalHistory: [
          { condition: 'First Trimester Gestation (Twin Pregnancy)', diagnosedYear: 2025, status: 'Antenatal Monitoring' },
          { condition: 'Hypothyroidism (Hashimotos)', diagnosedYear: 2021, status: 'Euthyroid on medication' }
        ],
        medications: [
          { name: 'Levothyroxine 75mcg', dosage: '1 tablet', frequency: 'Once daily (fasting)', instructions: 'Early morning empty stomach' },
          { name: 'Folic Acid 5mg + Methylcobalamin', dosage: '1 tablet', frequency: 'Once daily', instructions: 'Post breakfast' }
        ],
        emergencyContact: {
          name: 'Rohan Nair',
          relationship: 'Spouse',
          phone: '+91 98711 00556',
          address: 'Flat 101, Mayfair Gardens, Hauz Khas, New Delhi'
        },
        insuranceInfo: {
          provider: 'Bajaj Allianz Health Guard',
          policyNumber: 'BAJAJ-MAT-6619023',
          coverageAmount: 800000,
          validUntil: '2026-11-30',
          policyHolder: 'Deepa Nair'
        }
      },
      {
        firstName: 'Rohit',
        lastName: 'Bansal',
        email: 'patient.rohit@example.com',
        gender: 'male',
        dateOfBirth: '2000-08-11',
        phone: '+91 98711 00666',
        address: 'H-30, Ashok Vihar Phase 1, Delhi',
        mrn: 'MRN-100206',
        bloodGroup: 'B-',
        allergies: ['Nickel', 'Benzoyl Peroxide'],
        medicalHistory: [
          { condition: 'Moderate Atopic Dermatitis & Eczema', diagnosedYear: 2022, status: 'Topical steroids flare-control' },
          { condition: 'Mild Bronchial Asthma', diagnosedYear: 2017, status: 'Inhaler as needed' }
        ],
        medications: [
          { name: 'Mometasone 0.1% Cream', dosage: 'Thin layer', frequency: 'Once daily', instructions: 'Apply locally over lesions' },
          { name: 'Ceramide Moisturizing Lotion', dosage: 'Liberal', frequency: 'Thrice daily', instructions: 'Within 3 mins of bath' }
        ],
        emergencyContact: {
          name: 'Sanjeev Bansal',
          relationship: 'Father',
          phone: '+91 98711 00667',
          address: 'H-30, Ashok Vihar Phase 1, Delhi'
        },
        insuranceInfo: {
          provider: 'Niva Bupa Health Companion',
          policyNumber: 'NIVA-IND-1102948',
          coverageAmount: 500000,
          validUntil: '2027-02-28',
          policyHolder: 'Rohit Bansal'
        }
      },
      {
        firstName: 'Ramesh',
        lastName: 'Gupta',
        email: 'patient.ramesh@example.com',
        gender: 'male',
        dateOfBirth: '1959-12-08',
        phone: '+91 98711 00777',
        address: '14, Barakhamba Road, Connaught Place, New Delhi',
        mrn: 'MRN-100207',
        bloodGroup: 'A-',
        allergies: ['Codeine', 'Morphine derivative'],
        medicalHistory: [
          { condition: 'Colorectal Carcinoma (Post-Resection Stage IIA)', diagnosedYear: 2023, status: 'Under Surveillance & Adjuvant Care' },
          { condition: 'Mild Coronary Artery Disease', diagnosedYear: 2020, status: 'Medical Management' }
        ],
        medications: [
          { name: 'Clopidogrel 75mg', dosage: '1 tablet', frequency: 'Once daily', instructions: 'Post dinner' },
          { name: 'Pantoprazole 40mg', dosage: '1 tablet', frequency: 'Once daily (morning)', instructions: 'Empty stomach' },
          { name: 'Ondansetron 4mg', dosage: '1 tablet', frequency: 'SOS (for nausea)', instructions: 'As required' }
        ],
        emergencyContact: {
          name: 'Alok Gupta',
          relationship: 'Son',
          phone: '+91 98711 00778',
          address: '14, Barakhamba Road, Connaught Place, New Delhi'
        },
        insuranceInfo: {
          provider: 'Tata AIG MediCare Premier',
          policyNumber: 'TATA-ONC-7749021',
          coverageAmount: 2500000,
          validUntil: '2028-10-31',
          policyHolder: 'Ramesh Gupta'
        }
      },
      {
        firstName: 'Neha',
        lastName: 'Singhal',
        email: 'patient.neha@example.com',
        gender: 'female',
        dateOfBirth: '2005-04-19',
        phone: '+91 98711 00888',
        address: 'Flat 6B, Silver Arch Apartments, Ferozeshah Road, New Delhi',
        mrn: 'MRN-100208',
        bloodGroup: 'O+',
        allergies: ['None known'],
        medicalHistory: [
          { condition: 'Acute Viral Pyrexia with Dehydration', diagnosedYear: 2024, status: 'Recovered' },
          { condition: 'Vitamin D Deficiency', diagnosedYear: 2023, status: 'Weekly booster completed' }
        ],
        medications: [
          { name: 'Multivitamin & Zinc Capsule', dosage: '1 capsule', frequency: 'Once daily', instructions: 'Post breakfast' }
        ],
        emergencyContact: {
          name: 'Meena Singhal',
          relationship: 'Mother',
          phone: '+91 98711 00889',
          address: 'Flat 6B, Silver Arch Apartments, Ferozeshah Road, New Delhi'
        },
        insuranceInfo: {
          provider: 'Oriental Health Shield',
          policyNumber: 'ORIENT-HLT-5510293',
          coverageAmount: 500000,
          validUntil: '2026-09-30',
          policyHolder: 'Meena Singhal'
        }
      }
    ];

    const patients = [];
    for (const def of patientDefs) {
      const user = await prisma.user.create({
        data: {
          email: def.email,
          password: patientPasswordHash,
          role: 'patient',
          profile: {
            firstName: def.firstName,
            lastName: def.lastName,
            phone: def.phone,
            gender: def.gender,
            dateOfBirth: def.dateOfBirth,
            address: def.address
          },
          isActive: true,
          lastLogin: new Date(Date.now() - Math.floor(Math.random() * 86400000 * 2))
        }
      });

      const patient = await prisma.patient.create({
        data: {
          userId: user.id,
          medicalRecordNumber: def.mrn,
          bloodGroup: def.bloodGroup,
          allergies: def.allergies,
          medicalHistory: def.medicalHistory,
          medications: def.medications,
          emergencyContact: def.emergencyContact,
          insuranceInfo: def.insuranceInfo
        }
      });

      patients.push({ ...patient, user });
    }
    console.log(`✅ 8 Patients created successfully.`);

    // =========================================================================
    // 6. SEED APPOINTMENTS
    // Requirement:
    // "make sure that some of the patients have confirmed appointments, some of them have not confirmed"
    // We will create:
    // - Confirmed upcoming appointments (status: 'confirmed')
    // - Pending unconfirmed appointments (status: 'pending')
    // - Completed past appointments (status: 'completed' - with prescriptions & bills)
    // - Checked-in appointments (status: 'checked_in')
    // - Cancelled appointments (status: 'cancelled')
    // =========================================================================
    console.log('📅 Seeding Appointments (Confirmed, Pending, Completed, Cancelled)...');

    const now = new Date();
    const dayMs = 24 * 60 * 60 * 1000;

    // Helper to get future date with specific day of week if needed
    const getDateOffset = (days, hour = 10, minute = 0) => {
      const d = new Date(now.getTime() + days * dayMs);
      d.setHours(hour, minute, 0, 0);
      return d;
    };

    const appointmentConfigs = [
      // ─────────────────────────────────────────────────────────────────────────
      // PAST 7 DAYS: OCT 5 to OCT 11 (Days -6 to 0) - Completed, Checked-in & Cancelled
      // ─────────────────────────────────────────────────────────────────────────
      // Day -6 (Oct 5)
      {
        tag: 'apt_d6_0',
        patientIdx: 0, // Aarav Verma
        doctorIdx: 0,  // Dr. Rajesh Khanna (Cardiology)
        date: getDateOffset(-6, 10, 0),
        timeSlot: { start: '10:00', end: '10:30' },
        status: 'completed',
        paymentMode: 'online',
        paymentStatus: 'paid',
        paymentDetails: { paymentId: 'pay_mock_crd_d6', orderId: 'ord_mock_d6', method: 'card', amount: 4130 },
        consultationType: 'in-person',
        symptoms: 'Initial cardiovascular assessment for persistent exertion shortness of breath',
        notes: 'Clinical evaluation completed. Advised lifestyle modifications and prescribed statins.'
      },
      {
        tag: 'apt_d6_1',
        patientIdx: 7, // Neha Singhal
        doctorIdx: 7,  // Dr. Devendra Joshi (General)
        date: getDateOffset(-6, 11, 30),
        timeSlot: { start: '11:30', end: '12:00' },
        status: 'completed',
        paymentMode: 'at_reception',
        paymentStatus: 'paid',
        paymentDetails: { paymentId: 'pay_mock_gen_d6', orderId: 'ord_mock_gen_d6', method: 'cash', amount: 2360 },
        consultationType: 'in-person',
        symptoms: 'General weakness, seasonal viral prodrome and mild sore throat',
        notes: 'Symptomatic therapy initiated. Vitals stable.'
      },

      // Day -5 (Oct 6)
      {
        tag: 'apt_d5_0',
        patientIdx: 3, // Pooja Kapoor
        doctorIdx: 3,  // Dr. Sunita Mehra (Pediatrics)
        date: getDateOffset(-5, 15, 30),
        timeSlot: { start: '15:30', end: '16:00' },
        status: 'completed',
        paymentMode: 'online',
        paymentStatus: 'paid',
        paymentDetails: { paymentId: 'pay_mock_ped_d5', orderId: 'ord_mock_ped_d5', method: 'upi', amount: 2950 },
        consultationType: 'in-person',
        symptoms: 'Baby 4-month milestones and developmental assessment',
        notes: 'Growth curves normal (75th percentile). Pentavalent dose administered.'
      },
      {
        tag: 'apt_d5_1',
        patientIdx: 2, // Harish Mehta
        doctorIdx: 2,  // Dr. Vikramaditya Rathore (Orthopedics)
        date: getDateOffset(-5, 11, 0),
        timeSlot: { start: '11:00', end: '11:30' },
        status: 'completed',
        paymentMode: 'at_reception',
        paymentStatus: 'paid',
        paymentDetails: { paymentId: 'pay_mock_ort_d5', orderId: 'ord_mock_ort_d5', method: 'cash', amount: 4602 },
        consultationType: 'in-person',
        symptoms: 'Bilateral knee joint pain, Grade 2 osteoarthritis',
        notes: 'Physical therapy exercises advised. X-Ray bilateral knees performed.'
      },

      // Day -4 (Oct 7)
      {
        tag: 'apt_d4_0',
        patientIdx: 4, // Deepa Nair
        doctorIdx: 4,  // Dr. Meenakshi Sundaram (Gynecology)
        date: getDateOffset(-4, 10, 0),
        timeSlot: { start: '10:00', end: '10:30' },
        status: 'completed',
        paymentMode: 'online',
        paymentStatus: 'paid',
        paymentDetails: { paymentId: 'pay_mock_gyn_d4', orderId: 'ord_mock_gyn_d4', method: 'card', amount: 3894 },
        consultationType: 'in-person',
        symptoms: 'First trimester twin pregnancy health consultation and dietary counseling',
        notes: 'Fetal heartbeat normal on Doppler. Maternal vitals normal.'
      },
      {
        tag: 'apt_d4_1',
        patientIdx: 5, // Rohit Bansal
        doctorIdx: 5,  // Dr. Arjun Kapoor (Dermatology)
        date: getDateOffset(-4, 14, 0),
        timeSlot: { start: '14:00', end: '14:30' },
        status: 'completed',
        paymentMode: 'online',
        paymentStatus: 'paid',
        paymentDetails: { paymentId: 'pay_mock_der_d4', orderId: 'ord_mock_der_d4', method: 'upi', amount: 3186 },
        consultationType: 'in-person',
        symptoms: 'Recurrent atopic dermatitis patches over bilateral antecubital fossa',
        notes: 'Prescribed topical barrier restoration cream and mild steroid.'
      },
      {
        tag: 'apt_d4_2',
        patientIdx: 0, // Aarav Verma
        doctorIdx: 0,  // Dr. Rajesh Khanna (Cardiology)
        date: getDateOffset(-4, 16, 0),
        timeSlot: { start: '16:00', end: '16:30' },
        status: 'completed',
        paymentMode: 'online',
        paymentStatus: 'paid',
        paymentDetails: { paymentId: 'pay_mock_crd_d4_2', orderId: 'ord_mock_crd_d4_2', method: 'card', amount: 5900 },
        consultationType: 'in-person',
        symptoms: 'Follow-up for echocardiogram review and blood pressure optimization',
        notes: 'Ejection fraction 62%, normal LV systolic function. Blood pressure stable at 128/82 mmHg.'
      },

      // Day -3 (Oct 8)
      {
        tag: 'apt_d3_0',
        patientIdx: 6, // Ramesh Gupta
        doctorIdx: 6,  // Dr. Kavita Nair (Oncology)
        date: getDateOffset(-3, 10, 30),
        timeSlot: { start: '10:30', end: '11:00' },
        status: 'completed',
        paymentMode: 'online',
        paymentStatus: 'paid',
        paymentDetails: { paymentId: 'pay_mock_onc_d3', orderId: 'ord_mock_onc_d3', method: 'card', amount: 5310 },
        consultationType: 'in-person',
        symptoms: 'Post-colectomy surveillance consult and CEA marker review',
        notes: 'Tumor markers within normal ranges. Surveillance PET schedule confirmed.'
      },
      {
        tag: 'apt_d3_1',
        patientIdx: 1, // Sunita Roy
        doctorIdx: 1,  // Dr. Ananya Sen (Neurology)
        date: getDateOffset(-3, 12, 0),
        timeSlot: { start: '12:00', end: '12:30' },
        status: 'completed',
        paymentMode: 'online',
        paymentStatus: 'paid',
        paymentDetails: { paymentId: 'pay_mock_neu_d3', orderId: 'ord_mock_neu_d3', method: 'upi', amount: 4012 },
        consultationType: 'in-person',
        symptoms: 'Episodic hemicranial migraine attacks with nausea and phonophobia',
        notes: 'Initiated prophylactic beta-blocker. Migraine diary provided.'
      },
      {
        tag: 'apt_d3_2',
        patientIdx: 7, // Neha Singhal
        doctorIdx: 7,  // Dr. Devendra Joshi (General Medicine)
        date: getDateOffset(-3, 15, 0),
        timeSlot: { start: '15:00', end: '15:30' },
        status: 'completed',
        paymentMode: 'at_reception',
        paymentStatus: 'paid',
        paymentDetails: { paymentId: 'pay_mock_gen_d3', orderId: 'ord_mock_gen_d3', method: 'cash', amount: 2714 },
        consultationType: 'in-person',
        symptoms: 'Fatigue, sore throat, mild pharyngitis resolution check',
        notes: 'Throat examination clear. Multivitamin supplement advised.'
      },

      // Day -2 (Oct 9)
      {
        tag: 'apt_d2_0',
        patientIdx: 2, // Harish Mehta
        doctorIdx: 8,  // Dr. Sameer Alvi (Emergency)
        date: getDateOffset(-2, 9, 30),
        timeSlot: { start: '09:30', end: '10:00' },
        status: 'completed',
        paymentMode: 'online',
        paymentStatus: 'paid',
        paymentDetails: { paymentId: 'pay_mock_emg_d2', orderId: 'ord_mock_emg_d2', method: 'card', amount: 3540 },
        consultationType: 'in-person',
        symptoms: 'Acute wrist contusion and swelling after slip and fall',
        notes: 'X-ray confirmed no fracture. Compression bandage applied.'
      },
      {
        tag: 'apt_d2_1',
        patientIdx: 3, // Pooja Kapoor
        doctorIdx: 0,  // Dr. Rajesh Khanna (Cardiology)
        date: getDateOffset(-2, 11, 30),
        timeSlot: { start: '11:30', end: '12:00' },
        status: 'completed',
        paymentMode: 'online',
        paymentStatus: 'paid',
        paymentDetails: { paymentId: 'pay_mock_crd_d2_1', orderId: 'ord_mock_crd_d2_1', method: 'card', amount: 5546 },
        consultationType: 'in-person',
        symptoms: 'Post-partum heart palpitations and resting sinus tachycardia evaluation',
        notes: 'ECG demonstrates sinus tachycardia; thyroid profile and ferritin ordered.'
      },
      {
        tag: 'apt_d2_2',
        patientIdx: 4, // Deepa Nair
        doctorIdx: 4,  // Dr. Meenakshi Sundaram (Gynecology)
        date: getDateOffset(-2, 15, 0),
        timeSlot: { start: '15:00', end: '15:30' },
        status: 'cancelled',
        paymentMode: 'online',
        paymentStatus: 'refunded',
        paymentDetails: { paymentId: 'pay_mock_gyn_d2_can', orderId: 'ord_mock_gyn_d2_can', method: 'card', amount: 3300 },
        consultationType: 'in-person',
        symptoms: 'Routine checkup reschedule',
        notes: 'Refund of ₹3,300 processed back to original payment card.',
        cancellationReason: 'Patient rescheduled due to official travel commitments',
        cancelledById: patients[4].userId
      },

      // Day -1 (Oct 10)
      {
        tag: 'apt_d1_0',
        patientIdx: 1, // Sunita Roy
        doctorIdx: 1,  // Dr. Ananya Sen (Neurology)
        date: getDateOffset(-1, 10, 0),
        timeSlot: { start: '10:00', end: '10:30' },
        status: 'completed',
        paymentMode: 'online',
        paymentStatus: 'paid',
        paymentDetails: { paymentId: 'pay_mock_neu_d1', orderId: 'ord_mock_neu_d1', method: 'card', amount: 3894 },
        consultationType: 'in-person',
        symptoms: 'Follow-up on cranial nerve exam and migraine frequency decrease',
        notes: 'Patient reports 70% reduction in headache frequency. Prophylaxis maintained.'
      },
      {
        tag: 'apt_d1_1',
        patientIdx: 5, // Rohit Bansal
        doctorIdx: 5,  // Dr. Arjun Kapoor (Dermatology)
        date: getDateOffset(-1, 14, 30),
        timeSlot: { start: '14:30', end: '15:00' },
        status: 'completed',
        paymentMode: 'online',
        paymentStatus: 'paid',
        paymentDetails: { paymentId: 'pay_mock_der_d1', orderId: 'ord_mock_der_d1', method: 'upi', amount: 3540 },
        consultationType: 'in-person',
        symptoms: 'Evaluation of facial erythema and suspected rosacea',
        notes: 'Prescribed gentle cleanser and metronidazole 0.75% topical gel.'
      },
      {
        tag: 'apt_d1_2',
        patientIdx: 0, // Aarav Verma
        doctorIdx: 0,  // Dr. Rajesh Khanna (Cardiology)
        date: getDateOffset(-1, 16, 30),
        timeSlot: { start: '16:30', end: '17:00' },
        status: 'completed',
        paymentMode: 'online',
        paymentStatus: 'paid',
        paymentDetails: { paymentId: 'pay_mock_crd_d1_2', orderId: 'ord_mock_crd_d1_2', method: 'card', amount: 6254 },
        consultationType: 'in-person',
        symptoms: 'Holter monitor report discussion and exercise treadmill clearance',
        notes: 'Holter shows 0 VT runs, 1.2% PVC burden. Cleared for aerobic physical training.'
      },

      // Day 0 (Oct 11 / Today)
      {
        tag: 'apt_d0_0',
        patientIdx: 6, // Ramesh Gupta
        doctorIdx: 6,  // Dr. Kavita Nair (Oncology)
        date: getDateOffset(0, 10, 0),
        timeSlot: { start: '10:00', end: '10:30' },
        status: 'checked_in',
        paymentMode: 'online',
        paymentStatus: 'paid',
        paymentDetails: { paymentId: 'pay_mock_onc_d0', orderId: 'ord_mock_onc_d0', method: 'card', amount: 5251 },
        consultationType: 'in-person',
        symptoms: 'Quarterly PET-CT scan review and post-chemo surveillance',
        notes: 'Patient checked in at 09:45 AM. Vitals recorded at nurse station.'
      },
      {
        tag: 'apt_d0_1',
        patientIdx: 0, // Aarav Verma
        doctorIdx: 0,  // Dr. Rajesh Khanna (Cardiology)
        date: getDateOffset(0, 11, 0),
        timeSlot: { start: '11:00', end: '11:30' },
        status: 'completed',
        paymentMode: 'online',
        paymentStatus: 'paid',
        paymentDetails: { paymentId: 'pay_mock_crd_d0', orderId: 'ord_mock_crd_d0', method: 'card', amount: 4130 },
        consultationType: 'in-person',
        symptoms: 'Cardiology routine review & medication renewal',
        notes: 'Comprehensive review completed. Prescription refilled for 60 days.'
      },
      {
        tag: 'apt_d0_2',
        patientIdx: 2, // Harish Mehta
        doctorIdx: 2,  // Dr. Vikramaditya Rathore (Orthopedics)
        date: getDateOffset(0, 14, 0),
        timeSlot: { start: '14:00', end: '14:30' },
        status: 'checked_in',
        paymentMode: 'at_reception',
        paymentStatus: 'paid',
        paymentDetails: { paymentId: 'pay_mock_ort_d0', orderId: 'ord_mock_ort_d0', method: 'cash', amount: 4130 },
        consultationType: 'in-person',
        symptoms: 'Right knee crepitus, stiffness after prolonged sitting',
        notes: 'Checked in at front desk. Waiting in Orthopedics lounge.'
      },
      {
        tag: 'apt_d0_3',
        patientIdx: 3, // Pooja Kapoor
        doctorIdx: 3,  // Dr. Sunita Mehra (Pediatrics)
        date: getDateOffset(0, 15, 30),
        timeSlot: { start: '15:30', end: '16:00' },
        status: 'pending',
        paymentMode: 'at_reception',
        paymentStatus: 'pending',
        consultationType: 'in-person',
        symptoms: 'Baby 6-month immunization schedule check and mild colic',
        notes: 'Awaiting front desk verification of vaccination card.'
      },
      {
        tag: 'apt_d0_4',
        patientIdx: 7, // Neha Singhal
        doctorIdx: 7,  // Dr. Devendra Joshi (General Medicine)
        date: getDateOffset(0, 16, 30),
        timeSlot: { start: '16:30', end: '17:00' },
        status: 'pending',
        paymentMode: 'at_reception',
        paymentStatus: 'pending',
        consultationType: 'in-person',
        symptoms: 'General lethargy, intermittent low-grade fever and body ache',
        notes: 'Walk-in requested online; appointment awaits reception confirmation.'
      },

      // ─────────────────────────────────────────────────────────────────────────
      // UPCOMING / FUTURE APPOINTMENTS (Days +1 to +5) - Confirmed & Pending
      // ─────────────────────────────────────────────────────────────────────────
      {
        tag: 'apt_f1_0',
        patientIdx: 0, // Aarav Verma
        doctorIdx: 0,  // Dr. Rajesh Khanna (Cardiology)
        date: getDateOffset(1, 10, 0),
        timeSlot: { start: '10:00', end: '10:30' },
        status: 'confirmed',
        paymentMode: 'online',
        paymentStatus: 'paid',
        paymentDetails: { paymentId: 'pay_mock_crd_f1', orderId: 'ord_mock_crd_f1', method: 'card', amount: 3500 },
        consultationType: 'in-person',
        symptoms: 'Follow-up for chest tightness and blood pressure optimization',
        notes: 'Patient requested morning slot; ECG report from last month attached.'
      },
      {
        tag: 'apt_f1_1',
        patientIdx: 4, // Deepa Nair
        doctorIdx: 4,  // Dr. Meenakshi Sundaram (Gynecology)
        date: getDateOffset(1, 11, 30),
        timeSlot: { start: '11:30', end: '12:00' },
        status: 'confirmed',
        paymentMode: 'online',
        paymentStatus: 'paid',
        paymentDetails: { paymentId: 'pay_mock_gyn_f1', orderId: 'ord_mock_gyn_f1', method: 'card', amount: 3300 },
        consultationType: 'in-person',
        symptoms: 'Routine antenatal 16-week twin anomaly ultrasound review',
        notes: 'Ultrasound requisition pre-approved by clinical coordinator.'
      },
      {
        tag: 'apt_f2_0',
        patientIdx: 1, // Sunita Roy
        doctorIdx: 1,  // Dr. Ananya Sen (Neurology)
        date: getDateOffset(2, 11, 0),
        timeSlot: { start: '11:00', end: '11:30' },
        status: 'confirmed',
        paymentMode: 'online',
        paymentStatus: 'paid',
        paymentDetails: { paymentId: 'pay_mock_neu_f2', orderId: 'ord_mock_neu_f2', method: 'upi', amount: 2800 },
        consultationType: 'in-person',
        symptoms: 'Recurring morning throbbing headache with visual aura',
        notes: 'Pre-consultation intake completed. Requested quiet examination room.'
      },
      {
        tag: 'apt_f3_0',
        patientIdx: 2, // Harish Mehta
        doctorIdx: 2,  // Dr. Vikramaditya Rathore (Orthopedics)
        date: getDateOffset(3, 10, 30),
        timeSlot: { start: '10:30', end: '11:00' },
        status: 'confirmed',
        paymentMode: 'at_reception',
        paymentStatus: 'paid',
        paymentDetails: { paymentId: 'pay_mock_ort_f3', orderId: 'ord_mock_ort_f3', method: 'cash', amount: 3100 },
        consultationType: 'in-person',
        symptoms: 'Right knee crepitus, stiffness after prolonged sitting',
        notes: 'Wheelchair assistance requested at entrance lobby.'
      },
      {
        tag: 'apt_f3_1',
        patientIdx: 5, // Rohit Bansal
        doctorIdx: 7,  // Dr. Devendra Joshi (General)
        date: getDateOffset(3, 14, 30),
        timeSlot: { start: '14:30', end: '15:00' },
        status: 'pending',
        paymentMode: 'at_reception',
        paymentStatus: 'pending',
        consultationType: 'in-person',
        symptoms: 'Annual health checkup and routine blood pressure screening',
        notes: 'Pending insurance pre-authorization check.'
      },
      {
        tag: 'apt_f4_0',
        patientIdx: 5, // Rohit Bansal
        doctorIdx: 5,  // Dr. Arjun Kapoor (Dermatology)
        date: getDateOffset(4, 16, 0),
        timeSlot: { start: '16:00', end: '16:30' },
        status: 'confirmed',
        paymentMode: 'online',
        paymentStatus: 'paid',
        paymentDetails: { paymentId: 'pay_mock_der_f4', orderId: 'ord_mock_der_f4', method: 'upi', amount: 2300 },
        consultationType: 'teleconsultation',
        symptoms: 'Facial contact dermatitis flare-up after chemical sunscreen use',
        notes: 'Virtual consultation link generated and sent to patient email.'
      },
      {
        tag: 'apt_f5_0',
        patientIdx: 0, // Aarav Verma
        doctorIdx: 7,  // Dr. Devendra Joshi (General)
        date: getDateOffset(5, 11, 0),
        timeSlot: { start: '11:00', end: '11:30' },
        status: 'pending',
        paymentMode: 'online',
        paymentStatus: 'pending',
        consultationType: 'teleconsultation',
        symptoms: 'Review of routine metabolic panel and dietary guidelines',
        notes: 'Payment gateway session initiated but pending completion.'
      },

      // ─────────────────────────────────────────────────────────────────────────
      // ARCHIVED PRACTITIONER HISTORICAL CONSULTATIONS (-210, -120, -45 days)
      // ─────────────────────────────────────────────────────────────────────────
      {
        tag: 'apt_arch_0',
        patientIdx: 6, // Ramesh Gupta
        doctorIdx: 9,  // Dr. Bhaskar Mukherjee (CTVS Surgery, Archived)
        date: getDateOffset(-210, 10, 0),
        timeSlot: { start: '10:00', end: '10:30' },
        status: 'completed',
        paymentMode: 'online',
        paymentStatus: 'paid',
        paymentDetails: { paymentId: 'pay_mock_ctvs_16', orderId: 'ord_mock_ctvs_16', method: 'card', amount: 4200 },
        consultationType: 'in-person',
        symptoms: 'Pre-operative evaluation for coronary artery bypass graft (CABG) clearance',
        notes: 'Comprehensive pre-operative cardiothoracic evaluation. Patient cleared for surgical intervention.'
      },
      {
        tag: 'apt_arch_1',
        patientIdx: 3, // Pooja Kapoor
        doctorIdx: 10, // Dr. Shalini Swaminathan (Pediatric Neurology, Archived)
        date: getDateOffset(-120, 14, 0),
        timeSlot: { start: '14:00', end: '14:30' },
        status: 'completed',
        paymentMode: 'online',
        paymentStatus: 'paid',
        paymentDetails: { paymentId: 'pay_mock_pneu_17', orderId: 'ord_mock_pneu_17', method: 'upi', amount: 2900 },
        consultationType: 'in-person',
        symptoms: 'Infantile febrile convulsion follow-up and electroencephalogram (EEG) review',
        notes: 'Neurodevelopmental assessment confirms age-appropriate milestones. Normal EEG.'
      },
      {
        tag: 'apt_arch_2',
        patientIdx: 2, // Harish Mehta
        doctorIdx: 11, // Dr. Tariq Mansoor (Spine Surgery, Deactivated)
        date: getDateOffset(-45, 11, 30),
        timeSlot: { start: '11:30', end: '12:00' },
        status: 'completed',
        paymentMode: 'at_reception',
        paymentStatus: 'paid',
        paymentDetails: { paymentId: 'pay_mock_spn_18', orderId: 'ord_mock_spn_18', method: 'cash', amount: 3000 },
        consultationType: 'in-person',
        symptoms: 'L4-L5 lumbar disc herniation with left lower extremity radiculopathy',
        notes: 'Conservative spine physical therapy regimen initiated prior to practitioner sabbatical leave.'
      }
    ];

    const aptMapByTag = {};
    const appointments = [];
    for (const cfg of appointmentConfigs) {
      const apt = await prisma.appointment.create({
        data: {
          patientId: patients[cfg.patientIdx].id,
          doctorId: doctors[cfg.doctorIdx].id,
          date: cfg.date,
          createdAt: cfg.date,
          timeSlot: cfg.timeSlot,
          status: cfg.status,
          paymentMode: cfg.paymentMode,
          paymentStatus: cfg.paymentStatus,
          paymentDetails: cfg.paymentDetails || null,
          consultationType: cfg.consultationType,
          symptoms: cfg.symptoms,
          notes: cfg.notes,
          patientDocuments: [],
          cancellationReason: cfg.cancellationReason || null,
          cancelledById: cfg.cancelledById || null
        }
      });
      aptMapByTag[cfg.tag] = apt;
      appointments.push({ ...apt, cfg });
    }
    console.log(`✅ ${appointments.length} Appointments seeded across statuses (confirmed, pending, completed, cancelled, checked_in, and archived history).`);

    // =========================================================================
    // 7. SEED PRESCRIPTIONS (Linked to Completed Appointments)
    // =========================================================================
    console.log('💊 Seeding Prescriptions...');

    const prescriptionDefs = [
      {
        aptTag: 'apt_d6_0',
        patientIdx: 0,
        doctorIdx: 0,
        diagnosis: 'Essential Hypertension (Stage 1) & Mild Hyperlipidemia',
        medicines: [
          { name: 'Telmisartan 40mg', dosage: '1 tablet', frequency: 'Once daily (morning)', duration: '60 days' },
          { name: 'Atorvastatin 10mg', dosage: '1 tablet', frequency: 'Once daily (night)', duration: '60 days' },
          { name: 'CoQ10 100mg', dosage: '1 capsule', frequency: 'Once daily', duration: '30 days' }
        ],
        tests: ['Lipid Profile', 'Serum Creatinine', 'ECG 12-Lead'],
        advice: 'Restrict sodium to < 2.3g/day, perform 30 minutes brisk walking 5 days a week.',
        followUpDate: getDateOffset(45)
      },
      {
        aptTag: 'apt_d3_1',
        patientIdx: 1,
        doctorIdx: 1,
        diagnosis: 'Episodic Migraine with Typical Aura & Tension-type Component',
        medicines: [
          { name: 'Propranolol 40mg', dosage: '1 tablet', frequency: 'Twice daily', duration: '90 days' },
          { name: 'Rizatriptan 10mg', dosage: '1 tablet', frequency: 'SOS (at onset of headache aura)', duration: '10 days supply' },
          { name: 'Magnesium Glycinate 400mg', dosage: '1 tablet', frequency: 'Once daily at bedtime', duration: '60 days' }
        ],
        tests: ['Brain MRI Screening without contrast', 'Serum Magnesium', 'TSH Level'],
        advice: 'Maintain regular sleep-wake cycle, avoid caffeine withdrawal, keep a digital migraine trigger log.',
        followUpDate: getDateOffset(30)
      },
      {
        aptTag: 'apt_d5_1',
        patientIdx: 2,
        doctorIdx: 2,
        diagnosis: 'Bilateral Knee Primary Osteoarthritis (Kellgren-Lawrence Grade II)',
        medicines: [
          { name: 'Diacerein 50mg + Glucosamine 750mg', dosage: '1 tablet', frequency: 'Twice daily post meals', duration: '60 days' },
          { name: 'Paracetamol 650mg ER', dosage: '1 tablet', frequency: 'SOS (during acute knee pain)', duration: '15 days' },
          { name: 'Diclofenac 1.16% Emulgel', dosage: 'Topical application', frequency: 'Thrice daily over both knees', duration: '30 days' }
        ],
        tests: ['X-Ray Both Knees (AP Standing & Lateral)', 'Serum Uric Acid'],
        advice: 'Avoid sitting cross-legged or squatting. Perform quad strengthening exercises.',
        followUpDate: getDateOffset(28)
      },
      {
        aptTag: 'apt_d5_0',
        patientIdx: 3,
        doctorIdx: 3,
        diagnosis: 'Well-Baby Check & Routine Infant Immunization Schedule',
        medicines: [
          { name: 'Vitamin D3 Drops (400 IU/ml)', dosage: '1 ml (400 IU)', frequency: 'Once daily morning', duration: '180 days' },
          { name: 'Paracetamol Pediatric Drops (100mg/ml)', dosage: '0.6 ml', frequency: 'SOS if post-vaccine fever > 100°F', duration: '3 days' }
        ],
        tests: ['Developmental Milestone Screening Form'],
        advice: 'Continue exclusive breastfeeding. Tummy time for 10-15 minutes 3 times daily under supervision.',
        followUpDate: getDateOffset(60)
      },
      {
        aptTag: 'apt_d6_1',
        patientIdx: 7,
        doctorIdx: 7,
        diagnosis: 'Acute Viral Pharyngitis & Mild Upper Respiratory Tract Infection',
        medicines: [
          { name: 'Paracetamol 500mg', dosage: '1 tablet', frequency: 'Thrice daily for 3 days', duration: '3 days' },
          { name: 'Warm Saline Gargles', dosage: '200ml with pinch of salt', frequency: '4 times daily', duration: '5 days' },
          { name: 'Vitamin C 500mg Chewable', dosage: '1 tablet', frequency: 'Twice daily', duration: '7 days' }
        ],
        tests: ['Complete Blood Count (CBC) with ESR'],
        advice: 'Adequate hydration (2.5L fluids daily), voice rest, warm fluids, avoid refrigerated drinks.',
        followUpDate: getDateOffset(7)
      },
      {
        aptTag: 'apt_arch_0',
        patientIdx: 6,
        doctorIdx: 9,
        diagnosis: 'Multi-vessel Coronary Artery Disease & Pre-CABG Surgical Clearance',
        medicines: [
          { name: 'Aspirin 75mg', dosage: '1 tablet', frequency: 'Once daily morning', duration: '90 days' },
          { name: 'Rosuvastatin 20mg', dosage: '1 tablet', frequency: 'Once daily night', duration: '90 days' },
          { name: 'Metoprolol Succinate 50mg ER', dosage: '1 tablet', frequency: 'Once daily morning', duration: '60 days' }
        ],
        tests: ['Coronary Angiogram (CD)', 'Echocardiogram LVEF Assessment', 'Pre-op Coagulation Profile (PT/INR)'],
        advice: 'Strict blood pressure control (< 130/80 mmHg). No heavy exertion. Maintain surgical clearance protocol.',
        followUpDate: getDateOffset(-150)
      },
      {
        aptTag: 'apt_arch_1',
        patientIdx: 3,
        doctorIdx: 10,
        diagnosis: 'Complex Febrile Seizure (Single Episode) - Benign Clinical Course',
        medicines: [
          { name: 'Midazolam Nasal Spray (0.5mg/actuation)', dosage: '1 puff per nostril', frequency: 'Emergency rescue SOS (if seizure > 3 mins)', duration: '1 container' },
          { name: 'Paracetamol Pediatric Oral Suspension (120mg/5ml)', dosage: '5 ml', frequency: 'SOS if temperature > 99.5°F', duration: '5 days' }
        ],
        tests: ['Video-EEG (Sleep & Awake Protocol)', 'Serum Calcium & Vitamin D3'],
        advice: 'Rapid antipyresis at first sign of febrile episode. Do not restrain child during convulsion. Keep rescue spray accessible.',
        followUpDate: getDateOffset(-60)
      },
      {
        aptTag: 'apt_arch_2',
        patientIdx: 2,
        doctorIdx: 11,
        diagnosis: 'L4-L5 Lumbar Intervertebral Disc Prolapse with L5 Nerve Root Radiculopathy',
        medicines: [
          { name: 'Pregabalin 75mg + Methylcobalamin 750mcg', dosage: '1 capsule', frequency: 'Once daily at bedtime', duration: '30 days' },
          { name: 'Thiocolchicoside 4mg', dosage: '1 capsule', frequency: 'Twice daily post meals', duration: '7 days' }
        ],
        tests: ['MRI Lumbar Spine with sagittal & axial views', 'Nerve Conduction Velocity (NCV) Lower Limbs'],
        advice: 'Strict bed rest for 48 hours during acute exacerbation. Avoid spinal flexion and forward bending.',
        followUpDate: getDateOffset(-15)
      }
    ];

    for (const pDef of prescriptionDefs) {
      const apt = aptMapByTag[pDef.aptTag];
      if (!apt) continue;
      const prescription = await prisma.prescription.create({
        data: {
          appointmentId: apt.id,
          patientId: patients[pDef.patientIdx].id,
          doctorId: doctors[pDef.doctorIdx].id,
          diagnosis: pDef.diagnosis,
          medicines: pDef.medicines,
          tests: pDef.tests,
          advice: pDef.advice,
          followUpDate: pDef.followUpDate,
          receipt: 'https://orvanta-health-docs.s3.amazonaws.com/receipts/rx_sample_' + apt.id.slice(0, 8) + '.pdf',
          createdAt: apt.date
        }
      });

      await prisma.appointment.update({
        where: { id: apt.id },
        data: { prescriptionId: prescription.id }
      });
    }
    console.log(`✅ ${prescriptionDefs.length} Prescriptions created (including active consultations and archived historical dossiers).`);

    // =========================================================================
    // 8. SEED BILLS (Financial & Accounting Records)
    // Consultation charges synchronized with doctor fee scale (>= ₹2,000)
    // =========================================================================
    console.log('💳 Seeding Bills...');

    const billDefs = [
      // Day -6
      {
        aptTag: 'apt_d6_0',
        patientIdx: 0,
        items: [
          { description: 'Comprehensive Cardiologist Consultation', quantity: 1, unitPrice: 3500, total: 3500 },
          { description: '12-Lead Electrocardiogram (ECG)', quantity: 1, unitPrice: 500, total: 500 }
        ],
        status: 'paid',
        paymentMethod: 'card'
      },
      {
        aptTag: 'apt_d6_1',
        patientIdx: 7,
        items: [
          { description: 'General Physician Assessment', quantity: 1, unitPrice: 2000, total: 2000 },
          { description: 'Vitals & Blood Pressure Screening', quantity: 1, unitPrice: 200, total: 200 }
        ],
        status: 'paid',
        paymentMethod: 'cash'
      },

      // Day -5
      {
        aptTag: 'apt_d5_0',
        patientIdx: 3,
        items: [
          { description: 'Pediatric Well-Baby Consultation', quantity: 1, unitPrice: 2500, total: 2500 },
          { description: 'Pentavalent Vaccine Administration', quantity: 1, unitPrice: 1500, total: 1500 }
        ],
        status: 'paid',
        paymentMethod: 'upi'
      },
      {
        aptTag: 'apt_d5_1',
        patientIdx: 2,
        items: [
          { description: 'Orthopedic Joint Specialist Consultation', quantity: 1, unitPrice: 3100, total: 3100 },
          { description: 'Digital X-Ray Bilateral Knees', quantity: 1, unitPrice: 800, total: 800 }
        ],
        status: 'paid',
        paymentMethod: 'cash'
      },

      // Day -4
      {
        aptTag: 'apt_d4_0',
        patientIdx: 4,
        items: [
          { description: 'Senior Obstetrician Antenatal Consultation', quantity: 1, unitPrice: 3300, total: 3300 },
          { description: 'Fetal Doppler Evaluation', quantity: 1, unitPrice: 1200, total: 1200 }
        ],
        status: 'paid',
        paymentMethod: 'card'
      },
      {
        aptTag: 'apt_d4_1',
        patientIdx: 5,
        items: [
          { description: 'Dermatologist Clinical Consultation', quantity: 1, unitPrice: 2300, total: 2300 },
          { description: 'Skin Lesion Microscopy & Scrape', quantity: 1, unitPrice: 400, total: 400 }
        ],
        status: 'paid',
        paymentMethod: 'upi'
      },
      {
        aptTag: 'apt_d4_2',
        patientIdx: 0,
        items: [
          { description: 'Senior Interventional Cardiologist Follow-up', quantity: 1, unitPrice: 3500, total: 3500 },
          { description: '2D Echocardiogram with Color Doppler', quantity: 1, unitPrice: 1500, total: 1500 }
        ],
        status: 'paid',
        paymentMethod: 'card'
      },

      // Day -3
      {
        aptTag: 'apt_d3_0',
        patientIdx: 6,
        items: [
          { description: 'Super-Specialist Oncology Follow-up', quantity: 1, unitPrice: 3800, total: 3800 },
          { description: 'Complete Blood Hemogram with Platelet Count', quantity: 1, unitPrice: 700, total: 700 }
        ],
        status: 'paid',
        paymentMethod: 'card'
      },
      {
        aptTag: 'apt_d3_1',
        patientIdx: 1,
        items: [
          { description: 'Senior Neurologist Clinical Consultation', quantity: 1, unitPrice: 2800, total: 2800 },
          { description: 'Digital EEG Interpretation Requisition', quantity: 1, unitPrice: 600, total: 600 }
        ],
        status: 'paid',
        paymentMethod: 'upi'
      },
      {
        aptTag: 'apt_d3_2',
        patientIdx: 7,
        items: [
          { description: 'General Physician Assessment', quantity: 1, unitPrice: 2000, total: 2000 },
          { description: 'Complete Blood Count (CBC)', quantity: 1, unitPrice: 300, total: 300 }
        ],
        status: 'paid',
        paymentMethod: 'cash'
      },

      // Day -2
      {
        aptTag: 'apt_d2_0',
        patientIdx: 2,
        items: [
          { description: 'Emergency Trauma & Resuscitation Consultation', quantity: 1, unitPrice: 2100, total: 2100 },
          { description: 'Wrist Immobilization Splint Application', quantity: 1, unitPrice: 900, total: 900 }
        ],
        status: 'paid',
        paymentMethod: 'card'
      },
      {
        aptTag: 'apt_d2_1',
        patientIdx: 3,
        items: [
          { description: 'Cardiology Specialist Consultation', quantity: 1, unitPrice: 3500, total: 3500 },
          { description: 'Treadmill Stress Test (TMT)', quantity: 1, unitPrice: 1200, total: 1200 }
        ],
        status: 'paid',
        paymentMethod: 'card'
      },

      // Day -1
      {
        aptTag: 'apt_d1_0',
        patientIdx: 1,
        items: [
          { description: 'Neurology Follow-up Examination', quantity: 1, unitPrice: 2800, total: 2800 },
          { description: 'Cranial Nerve Assessment', quantity: 1, unitPrice: 500, total: 500 }
        ],
        status: 'paid',
        paymentMethod: 'card'
      },
      {
        aptTag: 'apt_d1_1',
        patientIdx: 5,
        items: [
          { description: 'Dermatologist Clinical Consultation', quantity: 1, unitPrice: 2300, total: 2300 },
          { description: 'High-Resolution Dermoscopy', quantity: 1, unitPrice: 700, total: 700 }
        ],
        status: 'paid',
        paymentMethod: 'upi'
      },
      {
        aptTag: 'apt_d1_2',
        patientIdx: 0,
        items: [
          { description: 'Cardiology Special Consultation', quantity: 1, unitPrice: 3500, total: 3500 },
          { description: '24-Hour Ambulatory Holter Monitoring', quantity: 1, unitPrice: 1800, total: 1800 }
        ],
        status: 'paid',
        paymentMethod: 'card'
      },

      // Day 0 (Today)
      {
        aptTag: 'apt_d0_0',
        patientIdx: 6,
        items: [
          { description: 'Medical Oncology Review', quantity: 1, unitPrice: 3800, total: 3800 },
          { description: 'Comprehensive Metabolic Panel', quantity: 1, unitPrice: 650, total: 650 }
        ],
        status: 'paid',
        paymentMethod: 'card'
      },
      {
        aptTag: 'apt_d0_1',
        patientIdx: 0,
        items: [
          { description: 'Cardiology Routine Review & Renewal', quantity: 1, unitPrice: 3500, total: 3500 }
        ],
        status: 'paid',
        paymentMethod: 'card'
      },
      {
        aptTag: 'apt_d0_2',
        patientIdx: 2,
        items: [
          { description: 'Orthopedic Joint Specialist Consultation', quantity: 1, unitPrice: 3100, total: 3100 },
          { description: 'Joint Aspiration & Dressing', quantity: 1, unitPrice: 400, total: 400 }
        ],
        status: 'paid',
        paymentMethod: 'cash'
      },
      {
        aptTag: 'apt_d0_3',
        patientIdx: 3,
        items: [
          { description: 'Pediatric Well-Baby Consultation', quantity: 1, unitPrice: 2500, total: 2500 },
          { description: 'Routine 6-Month Booster Formulation', quantity: 1, unitPrice: 1800, total: 1800 }
        ],
        status: 'pending',
        paymentMethod: null
      },
      {
        aptTag: 'apt_d0_4',
        patientIdx: 7,
        items: [
          { description: 'General Physician Assessment', quantity: 1, unitPrice: 2000, total: 2000 }
        ],
        status: 'pending',
        paymentMethod: null
      },

      // Historical Archived Practitioner Bill
      {
        aptTag: 'apt_arch_0',
        patientIdx: 6,
        items: [
          { description: 'Advanced Cardiothoracic Surgical Consultation', quantity: 1, unitPrice: 4200, total: 4200 },
          { description: 'Surgical Cardiac Clearance Report', quantity: 1, unitPrice: 1200, total: 1200 }
        ],
        status: 'paid',
        paymentMethod: 'card'
      }
    ];

    for (const bDef of billDefs) {
      const apt = aptMapByTag[bDef.aptTag];
      if (!apt) continue;
      const subtotal = bDef.items.reduce((s, it) => s + it.total, 0);
      const tax = Math.round(subtotal * 0.18);
      const total = subtotal + tax;

      await prisma.bill.create({
        data: {
          patientId: patients[bDef.patientIdx].id,
          appointmentId: apt.id,
          items: bDef.items,
          subtotal,
          tax,
          total,
          status: bDef.status,
          paymentMethod: bDef.paymentMethod,
          dueDate: new Date(apt.date.getTime() + 7 * dayMs),
          createdById: receptionist1.id,
          createdAt: apt.date
        }
      });
    }
    console.log(`✅ Bills created successfully.`);

    // =========================================================================
    // 9. SEED LAB REPORTS
    // =========================================================================
    console.log('🧪 Seeding Lab Reports...');

    const labReportDefs = [
      {
        patientIdx: 0,
        doctorIdx: 0,
        testName: 'Comprehensive Lipid & Apolipoprotein Panel',
        testType: 'Biochemistry',
        reportDate: getDateOffset(-6),
        results: [
          { parameter: 'Total Cholesterol', value: '188', unit: 'mg/dL', referenceRange: '< 200 mg/dL', status: 'Optimal' },
          { parameter: 'HDL Cholesterol', value: '48', unit: 'mg/dL', referenceRange: '> 40 mg/dL', status: 'Normal' },
          { parameter: 'LDL Cholesterol', value: '112', unit: 'mg/dL', referenceRange: '< 100 mg/dL', status: 'Borderline' },
          { parameter: 'Triglycerides', value: '140', unit: 'mg/dL', referenceRange: '< 150 mg/dL', status: 'Optimal' },
          { parameter: 'Apolipoprotein B', value: '88', unit: 'mg/dL', referenceRange: '< 90 mg/dL', status: 'Normal' }
        ],
        conclusion: 'Lipid profile demonstrates adequate cardiovascular control under statin therapy.',
        recommendations: 'Maintain low-saturated fat diet and recheck in 6 months.',
        reportFile: 'https://orvanta-health-docs.s3.amazonaws.com/lab/lipid_panel_mrn100201.pdf'
      },
      {
        patientIdx: 1,
        doctorIdx: 1,
        testName: 'High-Resolution Brain MRI with Angiogram',
        testType: 'Radiology & Imaging',
        reportDate: getDateOffset(-8),
        results: [
          { parameter: 'Cerebral Parenchyma', value: 'Normal', unit: '-', referenceRange: 'Normal architecture', status: 'Normal' },
          { parameter: 'Ventricular System', value: 'Normal size & configuration', unit: '-', referenceRange: 'Symmetrical', status: 'Normal' },
          { parameter: 'Intracranial Vessels', value: 'No aneurysm or AVM detected', unit: '-', referenceRange: 'Patent', status: 'Clear' }
        ],
        conclusion: 'No structural intracranial pathology or mass effect identified. Findings consistent with primary migraine etiology.',
        recommendations: 'Continue prophylactic medical management as prescribed.',
        reportFile: 'https://orvanta-health-docs.s3.amazonaws.com/lab/mri_brain_mrn100202.pdf'
      },
      {
        patientIdx: 2,
        doctorIdx: 2,
        testName: 'Digital Radiography (X-Ray) Both Knees Weight-Bearing',
        testType: 'Radiology',
        reportDate: getDateOffset(-12),
        results: [
          { parameter: 'Medial Joint Space (Right)', value: 'Moderate reduction (2.8mm)', unit: 'mm', referenceRange: '> 4.0mm', status: 'Reduced' },
          { parameter: 'Medial Joint Space (Left)', value: 'Mild reduction (3.4mm)', unit: 'mm', referenceRange: '> 4.0mm', status: 'Mild Reduced' },
          { parameter: 'Osteophytes', value: 'Marginal spurring noted at patellofemoral margins', unit: '-', referenceRange: 'None', status: 'Present' }
        ],
        conclusion: 'Bilateral knee degenerative joint disease (Osteoarthritis Grade 2-3, right > left).',
        recommendations: 'Quadriceps strengthening, intra-articular hyaluronic acid consideration if refractory.',
        reportFile: 'https://orvanta-health-docs.s3.amazonaws.com/lab/xray_knees_mrn100203.pdf'
      },
      {
        patientIdx: 6,
        doctorIdx: 6,
        testName: 'Whole Body Contrast-Enhanced PET-CT Oncological Scan',
        testType: 'Nuclear Medicine',
        reportDate: getDateOffset(-1),
        results: [
          { parameter: 'Surgical Bed (Sigmoid Colon)', value: 'No pathological FDG uptake', unit: 'SUV max 1.8', referenceRange: '< 2.5', status: 'Clear' },
          { parameter: 'Hepatic Parenchyma', value: 'Homogeneous, no focal lesions', unit: '-', referenceRange: 'Normal', status: 'Clear' },
          { parameter: 'Retroperitoneal Lymph Nodes', value: 'No lymphadenopathy', unit: '-', referenceRange: '< 10mm', status: 'Clear' }
        ],
        conclusion: 'No evidence of local recurrence or distant metastatic disease. Complete metabolic remission maintained.',
        recommendations: 'Routine 6-month surveillance follow-up with CEA tumor marker.',
        reportFile: 'https://orvanta-health-docs.s3.amazonaws.com/lab/petct_onc_mrn100207.pdf'
      }
    ];

    for (const lr of labReportDefs) {
      await prisma.labReport.create({
        data: {
          patientId: patients[lr.patientIdx].id,
          doctorId: doctors[lr.doctorIdx].id,
          testName: lr.testName,
          testType: lr.testType,
          reportDate: lr.reportDate,
          results: lr.results,
          conclusion: lr.conclusion,
          recommendations: lr.recommendations,
          reportFile: lr.reportFile,
          uploadedById: receptionist1.id
        }
      });
    }
    console.log(`✅ Lab Reports created successfully.`);

    // =========================================================================
    // 10. SEED TRIAGE RECORDS (Receptionist Walk-in & AI Triage Queue)
    // =========================================================================
    console.log('🚨 Seeding Triage Records...');

    const triageDefs = [
      {
        patientName: 'Kishore Lal',
        age: 62,
        gender: 'male',
        contactNumber: '+91 98450 11223',
        symptoms: 'Sudden onset retrosternal chest pressure radiating to left arm with cold diaphoresis',
        vitals: { temperature: '98.4 F', bloodPressure: '160/95 mmHg', pulseRate: 104, spO2: 95, respiratoryRate: 22 },
        aiAnalysis: {
          urgencyLevel: 'Emergency',
          riskScore: 9.2,
          possibleConditions: ['Acute Coronary Syndrome', 'Myocardial Infarction', 'Unstable Angina'],
          reasoning: 'Cardiovascular red-flag symptoms with diaphoresis and hypertension indicate high probability of acute cardiac ischemia.'
        },
        status: 'referred',
        doctorReferredId: doctors[0].userId, // Referred to Dr. Rajesh Khanna (Cardiology)
        receptionistId: receptionist2.id
      },
      {
        patientName: 'Meera Deshmukh',
        age: 34,
        gender: 'female',
        contactNumber: '+91 98450 22334',
        symptoms: 'Severe right lower abdominal pain (iliac fossa) with nausea and low grade fever for 12 hours',
        vitals: { temperature: '100.2 F', bloodPressure: '118/76 mmHg', pulseRate: 88, spO2: 98, respiratoryRate: 18 },
        aiAnalysis: {
          urgencyLevel: 'Urgent',
          riskScore: 7.8,
          possibleConditions: ['Acute Appendicitis', 'Ovarian Cyst Rupture / Torsion', 'Mesenteric Adenitis'],
          reasoning: 'Localized right iliac fossa pain accompanied by pyrexia requires immediate surgical and gynecological evaluation.'
        },
        status: 'in-consultation',
        doctorReferredId: doctors[8].userId, // Emergency Dr. Sameer Alvi
        receptionistId: receptionist1.id
      },
      {
        patientName: 'Rohan Sharma',
        age: 26,
        gender: 'male',
        contactNumber: '+91 98450 33445',
        symptoms: 'Twisted right ankle during soccer, acute swelling and inability to bear weight',
        vitals: { temperature: '98.6 F', bloodPressure: '122/80 mmHg', pulseRate: 74, spO2: 99, respiratoryRate: 16 },
        aiAnalysis: {
          urgencyLevel: 'Routine',
          riskScore: 4.1,
          possibleConditions: ['Lateral Ankle Ligament Sprain', 'Fibula Malleolus Fracture', 'Avulsion Injury'],
          reasoning: 'Isolated extremity injury with intact neurovascular status. Requires X-Ray and immobilization.'
        },
        status: 'resolved',
        doctorReferredId: doctors[2].userId, // Ortho Dr. Vikram Rathore
        diagnosis: 'Grade 2 Lateral Ankle Inversion Sprain (ATFL)',
        prescribedMedicines: [
          { name: 'Aceclofenac + Paracetamol', dosage: '1 tab', frequency: 'Twice daily', duration: '5 days' },
          { name: 'Ankle Binder Support', dosage: 'Wear while walking', frequency: 'Continuous', duration: '2 weeks' }
        ],
        tests: ['X-Ray Right Ankle AP & Lateral'],
        advice: 'Follow RICE protocol (Rest, Ice, Compression, Elevation) for 48 hours.',
        receptionistId: receptionist1.id
      },
      {
        patientName: 'Aarav Verma', // Linked to existing patient
        age: 42,
        gender: 'male',
        contactNumber: '+91 98711 00111',
        patientId: patients[0].id,
        symptoms: 'Mild dizziness on standing up and episodic tension headache',
        vitals: { temperature: '98.6 F', bloodPressure: '138/88 mmHg', pulseRate: 78, spO2: 98, respiratoryRate: 16 },
        aiAnalysis: {
          urgencyLevel: 'Routine',
          riskScore: 3.5,
          possibleConditions: ['Benign Postural Hypotension', 'Tension Headache', 'Dehydration'],
          reasoning: 'Non-critical hemodynamics, mild blood pressure elevation.'
        },
        status: 'pending',
        receptionistId: receptionist1.id
      }
    ];

    for (let i = 0; i < triageDefs.length; i++) {
      const tr = triageDefs[i];
      const triageId = 'TRG-' + (Date.now() + i).toString().slice(-6) + Math.floor(100 + Math.random() * 900);

      await prisma.triageRecord.create({
        data: {
          patientName: tr.patientName,
          age: tr.age,
          gender: tr.gender,
          contactNumber: tr.contactNumber,
          symptoms: tr.symptoms,
          vitals: tr.vitals,
          aiAnalysis: tr.aiAnalysis,
          receptionistId: tr.receptionistId,
          doctorReferredId: tr.doctorReferredId || null,
          patientId: tr.patientId || null,
          status: tr.status,
          diagnosis: tr.diagnosis || null,
          prescribedMedicines: tr.prescribedMedicines || null,
          tests: tr.tests || null,
          advice: tr.advice || null,
          triageId,
          createdAt: new Date(Date.now() - (triageDefs.length - i) * 3600000 * 3)
        }
      });
    }
    console.log(`✅ Triage Records seeded with AI analysis and vitals.`);

    // =========================================================================
    // 11. SEED BED CAPACITIES (Real-time telemetry for departments)
    // =========================================================================
    console.log('🛏️ Seeding Bed Capacities...');

    const bedDefs = [
      { department: 'Cardiology', totalBeds: 30, occupiedBeds: 22, icuBeds: 10, occupiedIcuBeds: 7 },
      { department: 'Neurology', totalBeds: 25, occupiedBeds: 18, icuBeds: 8, occupiedIcuBeds: 5 },
      { department: 'Orthopedics', totalBeds: 35, occupiedBeds: 24, icuBeds: 6, occupiedIcuBeds: 3 },
      { department: 'Pediatrics', totalBeds: 25, occupiedBeds: 14, icuBeds: 6, occupiedIcuBeds: 2 },
      { department: 'Gynecology', totalBeds: 30, occupiedBeds: 20, icuBeds: 5, occupiedIcuBeds: 2 },
      { department: 'Emergency Medicine', totalBeds: 40, occupiedBeds: 32, icuBeds: 15, occupiedIcuBeds: 11 },
      { department: 'Oncology', totalBeds: 25, occupiedBeds: 19, icuBeds: 8, occupiedIcuBeds: 4 },
      { department: 'General Medicine', totalBeds: 50, occupiedBeds: 36, icuBeds: 10, occupiedIcuBeds: 6 }
    ];

    for (const b of bedDefs) {
      await prisma.bedCapacity.create({ data: b });
    }
    console.log(`✅ Bed Capacities initialized for 8 major medical departments.`);

    // =========================================================================
    // 12. SEED AUDIT LOGS (Security and System Observability)
    // =========================================================================
    console.log('🛡️ Seeding Audit Logs...');

    const auditDefs = [
      {
        action: 'SUPERADMIN_INITIALIZED',
        performedById: superAdmin.id,
        details: 'System root administrator account verified and active.',
        severity: 'info',
        ipAddress: '10.0.1.1'
      },
      {
        action: 'STAFF_ONBOARDED',
        performedById: superAdmin.id,
        targetUserId: doctors[0].userId,
        details: 'Onboarded Dr. Rajesh Khanna to Cardiology Unit.',
        severity: 'info',
        ipAddress: '10.0.1.1'
      },
      {
        action: 'STAFF_ONBOARDED',
        performedById: superAdmin.id,
        targetUserId: receptionist1.id,
        details: 'Onboarded Receptionist Priya Sharma for Front Desk Intake.',
        severity: 'info',
        ipAddress: '10.0.1.1'
      },
      {
        action: 'STAFF_OFFBOARDED',
        performedById: superAdmin.id,
        targetUserId: doctors[9].userId, // Dr. Bhaskar Mukherjee
        details: 'Authorized institutional offboarding and legal archive record creation for Dr. Bhaskar Mukherjee (CTVS Surgery).',
        severity: 'warning',
        ipAddress: '10.0.1.1'
      },
      {
        action: 'STAFF_OFFBOARDED',
        performedById: superAdmin.id,
        targetUserId: doctors[10].userId, // Dr. Shalini Swaminathan
        details: 'Completed offboarding protocol for Dr. Shalini Swaminathan (Pediatric Neurology); records transferred to historical vault.',
        severity: 'info',
        ipAddress: '10.0.1.1'
      },
      {
        action: 'STAFF_DEACTIVATED',
        performedById: superAdmin.id,
        targetUserId: doctors[11].userId, // Dr. Tariq Mansoor
        details: 'Practitioner Dr. Tariq Mansoor placed on temporary academic sabbatical and administrative leave.',
        severity: 'info',
        ipAddress: '10.0.1.1'
      },
      {
        action: 'BED_CAPACITY_UPDATED',
        performedById: superAdmin.id,
        details: 'Emergency telemetry updated: Total emergency beds set to 40.',
        severity: 'info',
        ipAddress: '10.0.1.1'
      },
      {
        action: 'EMERGENCY_TRIAGE_INTAKE',
        performedById: receptionist2.id,
        details: 'High-acuity triage intake recorded for patient Kishore Lal (Risk Score 9.2).',
        severity: 'critical',
        ipAddress: '192.168.1.105'
      },
      {
        action: 'PRESCRIPTION_ISSUED',
        performedById: doctors[0].userId,
        targetUserId: patients[0].userId,
        details: 'Digital clinical prescription issued for Essential Hypertension.',
        severity: 'info',
        ipAddress: '192.168.1.50'
      }
    ];

    for (const a of auditDefs) {
      await prisma.auditLog.create({
        data: {
          action: a.action,
          performedById: a.performedById,
          targetUserId: a.targetUserId || null,
          details: a.details,
          severity: a.severity,
          ipAddress: a.ipAddress
        }
      });
    }
    console.log(`✅ ${auditDefs.length} Audit Logs created (including root initialization, staff onboardings, and practitioner offboardings).`);

    // =========================================================================
    // 13. SEED CONTACT MESSAGES
    // =========================================================================
    console.log('📬 Seeding Contact Messages...');

    const contactDefs = [
      {
        name: 'Dr. Alok Verma',
        email: 'alok.verma@maxhealthcare.in',
        facility: 'Max Super Speciality Hospital',
        role: 'Chief Medical Officer',
        phone: '+91 99887 76655',
        message: 'Inquiring regarding OrvantaHealth multi-site clinical federation and bed telemetry integration API.',
        status: 'new'
      },
      {
        name: 'Sunil Chawla',
        email: 'sunil.chawla@apollohospitals.com',
        facility: 'Apollo Health City',
        role: 'Healthcare Operations Director',
        phone: '+91 98760 12345',
        message: 'Requesting enterprise demonstration of the automated triage workflow and patient records dashboard.',
        status: 'responded'
      }
    ];

    for (const c of contactDefs) {
      await prisma.contactMessage.create({ data: c });
    }
    console.log(`✅ Contact Messages seeded.`);

    console.log('------------------------------------------------------------');
    console.log('🎉 ORVANTAHEALTH SEEDING COMPLETED SUCCESSFULLY!');
    console.log('------------------------------------------------------------');
    console.log('Summary of Seeded Data:');
    console.log('• 1 SuperAdmin:');
    console.log('    Email: admin@orvantahealth.com | Password: Welcomeadmin');
    console.log('• 2 Receptionists:');
    console.log('    Email: reception.priya@orvanta.com | Password: Reception123!');
    console.log('    Email: reception.rahul@orvanta.com | Password: Reception123!');
    console.log(`• ${doctors.length} Doctors (9 Active Practitioners + 3 Former/Archived Staff, Min Fee ₹2,000):`);
    doctorDefs.forEach((d) => {
      const statusLabel = d.isOffboarded ? '[ARCHIVED - LEFT INSTITUTION]' : !d.isActive ? '[DEACTIVATED - ON LEAVE]' : '[ACTIVE]';
      console.log(`    - ${statusLabel} Dr. ${d.firstName} ${d.lastName} (${d.department}, ${d.experience}y exp) -> Fee: ₹${d.consultationFee} | ${d.email}`);
    });
    console.log('• 8 Patients (Full profiles, demographics, allergies, medications, insurance):');
    patientDefs.forEach((p) => {
      console.log(`    - [${p.gender.toUpperCase()}] ${p.firstName} ${p.lastName} (${p.mrn}) -> ${p.email} | Password: Patient123!`);
    });
    console.log(`• Appointments: ${appointments.length} (Confirmed, Pending, Completed, Cancelled, Checked-In, and Archived Historical Dossiers)`);
    console.log(`• ${prescriptionDefs.length} Clinical Prescriptions linked to completed visits & dossiers`);
    console.log(`• ${billDefs.length} Financial Invoices & Bills`);
    console.log('• 4 Comprehensive Diagnostic Lab Reports with full parameter ranges');
    console.log('• 4 Emergency/Walk-In Triage Records with AI analysis');
    console.log('• 8 Department Bed Capacity Telemetry records');
    console.log(`• ${auditDefs.length} Security Audit Logs`);
    console.log('• 2 Contact Messages');
    console.log('------------------------------------------------------------');

  } catch (error) {
    console.error('❌ Seeding failed with error:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

seed();

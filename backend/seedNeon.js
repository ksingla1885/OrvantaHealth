require('dotenv').config();
const { Client } = require('pg');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const pgClient = new Client({
  connectionString: process.env.DATABASE_URL,
});

async function seed() {
  try {
    console.log('Connecting to Neon PostgreSQL...');
    await pgClient.connect();
    console.log('Connected!');

    // 1. Create a Superadmin User
    const adminPassword = await bcrypt.hash('Welcomeadmin', 10);
    const adminId = crypto.randomUUID();
    
    await pgClient.query(`
      INSERT INTO "User" (id, email, password, role, profile, "isActive", "isOffboarded", "createdAt", "updatedAt") 
      VALUES ($1, $2, $3, $4, $5, true, false, NOW(), NOW())
      ON CONFLICT (email) DO NOTHING
    `, [adminId, 'admin@orvantahealth.com', adminPassword, 'superadmin', JSON.stringify({ firstName: 'Super', lastName: 'Admin' })]);

    // 2. Create a Doctor User
    const docPassword = await bcrypt.hash('Doctor123!', 10);
    const docUserId = crypto.randomUUID();
    
    await pgClient.query(`
      INSERT INTO "User" (id, email, password, role, profile, "isActive", "isOffboarded", "createdAt", "updatedAt") 
      VALUES ($1, $2, $3, $4, $5, true, false, NOW(), NOW())
      ON CONFLICT (email) DO NOTHING
    `, [docUserId, 'dr.smith@orvantahealth.com', docPassword, 'doctor', JSON.stringify({ firstName: 'John', lastName: 'Smith', phone: '1234567890' })]);

    // 3. Create Doctor Profile
    const docId = crypto.randomUUID();
    await pgClient.query(`
      INSERT INTO "Doctor" (id, "userId", specialization, qualifications, experience, "licenseNumber", "consultationFee", availability, "isAvailable", "dutyStatus", rating, department, leaves, "createdAt", "updatedAt")
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, true, 'available', '{}', $9, '{}', NOW(), NOW())
      ON CONFLICT ("userId") DO NOTHING
    `, [docId, docUserId, 'Cardiology', 'MD, FACC', 15, 'MED-12345-US', 150, JSON.stringify({ days: ['monday', 'tuesday'], timeSlots: [{start: '09:00', end:'17:00'}] }), 'Cardiology']);

    // 4. Create a Patient User
    const patPassword = await bcrypt.hash('Patient123!', 10);
    const patUserId = crypto.randomUUID();
    
    await pgClient.query(`
      INSERT INTO "User" (id, email, password, role, profile, "isActive", "isOffboarded", "createdAt", "updatedAt") 
      VALUES ($1, $2, $3, $4, $5, true, false, NOW(), NOW())
      ON CONFLICT (email) DO NOTHING
    `, [patUserId, 'patient@example.com', patPassword, 'patient', JSON.stringify({ firstName: 'Jane', lastName: 'Doe', phone: '0987654321' })]);

    // 5. Create Patient Profile
    const patId = crypto.randomUUID();
    await pgClient.query(`
      INSERT INTO "Patient" (id, "userId", "medicalRecordNumber", "medicalHistory", allergies, medications, "emergencyContact", "bloodGroup", "createdAt", "updatedAt")
      VALUES ($1, $2, $3, '{}', '[]', '[]', '{}', 'O+', NOW(), NOW())
      ON CONFLICT ("userId") DO NOTHING
    `, [patId, patUserId, 'MRN-100200300']);

    // 6. Create an Appointment
    const aptId = crypto.randomUUID();
    await pgClient.query(`
      INSERT INTO "Appointment" (id, "patientId", "doctorId", date, "timeSlot", status, "paymentMode", "paymentStatus", "consultationType", symptoms, notes, "createdAt", "updatedAt")
      VALUES ($1, $2, $3, NOW() + INTERVAL '1 day', $4, 'scheduled', 'online', 'completed', 'in-person', 'Mild chest pain', 'First time visit', NOW(), NOW())
    `, [aptId, patId, docId, JSON.stringify({ start: '10:00', end: '10:30' })]);

    console.log('Seed completed! You now have a Superadmin, Doctor, Patient, and an Appointment.');
  } catch (error) {
    console.error('Seed failed:', error);
  } finally {
    await pgClient.end();
  }
}

seed();

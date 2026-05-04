const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config({ path: './.env' });

async function checkDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to DB');

    const patientUsers = await User.find({ role: 'patient' });
    console.log(`Users with role 'patient': ${patientUsers.length}`);
    patientUsers.forEach(u => console.log(`- ${u.email}`));

    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

checkDB();

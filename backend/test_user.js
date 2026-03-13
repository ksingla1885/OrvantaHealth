const mongoose = require('mongoose');
require('dotenv').config();
const Patient = require('./models/Patient');

const fixMRN = async () => {
    await mongoose.connect(process.env.MONGODB_URI);
    const patients = await Patient.find({});
    for(let p of patients){
        let modified = false;
        
        if (p.bloodGroup === '') {
            p.bloodGroup = undefined;
            modified = true;
        }

        if (!p.medicalRecordNumber) {
            p.medicalRecordNumber = undefined; // trigger generation if missing
            modified = true;
        }
        
        if(modified) {
            await p.save();
            console.log("Assigned MRN to patient:", p._id);
        }
    }
    console.log("done");
    process.exit(0);
};

fixMRN();

const express = require('express');
const router = express.Router();
const path = require('path');
const { authenticateToken } = require('../middleware/auth');
const Prescription = require('../models/Prescription');
const Bill = require('../models/Bill');
const LabReport = require('../models/LabReport');
const Patient = require('../models/Patient');
const Doctor = require('../models/Doctor');

router.use(authenticateToken);

// Download document (shared among roles)
router.get('/download/:type/:id', async (req, res) => {
    try {
        const { type, id } = req.params;
        let filePath;
        let filename;

        // Authorization logic
        const userId = req.user._id;
        const role = req.user.role;

        switch (type) {
            case 'prescription':
                const prescription = await Prescription.findById(id);
                if (!prescription) return res.status(404).json({ success: false, message: 'Prescription not found' });

                // Authorization: Admin/Receptionist, or the Doctor who wrote it, or the Patient it's for
                if (role === 'patient') {
                    const patient = await Patient.findOne({ userId });
                    if (!patient || prescription.patientId.toString() !== patient._id.toString()) {
                        return res.status(403).json({ success: false, message: 'Access denied' });
                    }
                } else if (role === 'doctor') {
                    const doctor = await Doctor.findOne({ userId });
                    if (!doctor || prescription.doctorId.toString() !== doctor._id.toString()) {
                        return res.status(403).json({ success: false, message: 'Access denied' });
                    }
                }
                // Admin and Receptionist can access all

                filePath = prescription.receipt;
                filename = `prescription_${id}.pdf`;
                break;

            case 'bill':
                const bill = await Bill.findById(id);
                if (!bill) return res.status(404).json({ success: false, message: 'Bill not found' });

                if (role === 'patient') {
                    const patient = await Patient.findOne({ userId });
                    if (!patient || bill.patientId.toString() !== patient._id.toString()) {
                        return res.status(403).json({ success: false, message: 'Access denied' });
                    }
                }
                // Others can access all bills

                filePath = bill.receipt || (bill.billNumber ? `bill_${bill.billNumber}.pdf` : null);
                filePath = bill.receipt; // Use stored filename
                filename = `bill_${id}.pdf`;
                break;

            case 'lab-report':
                const labReport = await LabReport.findById(id);
                if (!labReport) return res.status(404).json({ success: false, message: 'Lab report not found' });

                if (role === 'patient') {
                    const patient = await Patient.findOne({ userId });
                    if (!patient || labReport.patientId.toString() !== patient._id.toString()) {
                        return res.status(403).json({ success: false, message: 'Access denied' });
                    }
                }

                filePath = labReport.reportFile;
                filename = `lab_report_${id}.pdf`;
                break;

            default:
                return res.status(400).json({ success: false, message: 'Invalid document type' });
        }

        if (!filePath) {
            return res.status(404).json({ success: false, message: 'File reference not found in database' });
        }

        // If it's a Cloudinary URL (starts with http), redirect to it
        if (filePath.startsWith('http')) {
            return res.redirect(filePath);
        }

        // Resolve full path for local files
        let subfolder = '';
        if (type === 'lab-report') subfolder = 'lab-reports';
        if (type === 'prescription') subfolder = 'prescriptions';
        // Add other subfolders if needed

        const fullPath = path.resolve(__dirname, '..', 'uploads', subfolder, filePath);

        res.download(fullPath, filename, (err) => {
            if (err) {
                console.error('Download error:', err);
                if (!res.headersSent) {
                    res.status(500).json({ success: false, message: 'Error downloading file' });
                }
            }
        });
    } catch (error) {
        console.error('Document download error:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

module.exports = router;

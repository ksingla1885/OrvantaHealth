const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendEmail = async ({ to, subject, html }) => {
  try {
    const info = await transporter.sendMail({
      from: `"OrvantaHealth" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    });
    console.log('Email sent: %s', info.messageId);
    return info;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};

const sendPaymentConfirmationEmail = async (patientEmail, appointmentDetails) => {
  const { doctorName, date, time, amount, paymentId } = appointmentDetails;
  
  const subject = 'Appointment Confirmation and Payment Received';
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
      <h2 style="color: #2c3e50; text-align: center;">Appointment Confirmation</h2>
      <p>Dear Patient,</p>
      <p>Thank you for booking an appointment with OrvantaHealth. Your payment of <strong>₹${amount}</strong> has been successfully received.</p>
      
      <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin: 20px 0;">
        <h3 style="margin-top: 0; color: #3498db;">Appointment Details</h3>
        <p><strong>Doctor:</strong> Dr. ${doctorName}</p>
        <p><strong>Date:</strong> ${date}</p>
        <p><strong>Time:</strong> ${time}</p>
      </div>
      
      <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin: 20px 0;">
        <h3 style="margin-top: 0; color: #3498db;">Payment Details</h3>
        <p><strong>Payment ID:</strong> ${paymentId}</p>
        <p><strong>Amount Paid:</strong> ₹${amount}</p>
        <p><strong>Status:</strong> Success</p>
      </div>
      
      <p>Please arrive 10 minutes before your scheduled time. If you need to cancel or reschedule, please do so at least 24 hours in advance.</p>
      
      <p style="margin-top: 30px; font-size: 0.9em; color: #7f8c8d; text-align: center;">
        This is an automated email. Please do not reply.
      </p>
    </div>
  `;

  return sendEmail({ to: patientEmail, subject, html });
};

module.exports = {
  sendEmail,
  sendPaymentConfirmationEmail
};

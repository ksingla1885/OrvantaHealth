const express = require('express');
const router = express.Router();
const { authenticateToken, superAdminOnly } = require('../middleware/auth');
const prisma = require('../prismaClient');
const { sendEmail } = require('../utils/emailService');

// @route   POST /api/contact
// @desc    Submit a contact sales message
// @access  Public
router.post('/', async (req, res) => {
  try {
    const { name, email, facility, role, phone, message } = req.body;

    const newMessage = await prisma.contactMessage.create({
      data: {
        name,
        email,
        facility,
        role,
        phone,
        message,
        status: 'new'
      }
    });

    res.status(201).json({
      success: true,
      data: newMessage
    });
  } catch (error) {
    console.error('Error in contact form submission:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
});

// @route   GET /api/contact
// @desc    Get all contact sales messages
// @access  Private/SuperAdmin
router.get('/', authenticateToken, superAdminOnly, async (req, res) => {
  try {
    const messages = await prisma.contactMessage.findMany({
      orderBy: { createdAt: 'desc' }
    });

    res.status(200).json({
      success: true,
      count: messages.length,
      data: messages
    });
  } catch (error) {
    console.error('Error fetching contact messages:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
});

// @route   PUT /api/contact/:id/status
// @desc    Update message status
// @access  Private/SuperAdmin
router.put('/:id/status', authenticateToken, superAdminOnly, async (req, res) => {
  try {
    const { status } = req.body;
    
    if (!['new', 'read', 'replied'].includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status' });
    }

    const { id } = req.params;

    let message = await prisma.contactMessage.findUnique({ where: { id } });
    if (!message) return res.status(404).json({ success: false, message: 'Message not found' });

    message = await prisma.contactMessage.update({
      where: { id },
      data: { status }
    });

    res.status(200).json({
      success: true,
      data: message
    });
  } catch (error) {
    console.error('Error updating message status:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
});

// @route   POST /api/contact/:id/reply
// @desc    Reply to a contact message and set status to replied
// @access  Private/SuperAdmin
router.post('/:id/reply', authenticateToken, superAdminOnly, async (req, res) => {
  try {
    const { replyMessage } = req.body;
    const { id } = req.params;

    if (!replyMessage) {
      return res.status(400).json({ success: false, message: 'Reply message is required' });
    }

    let message = await prisma.contactMessage.findUnique({ where: { id } });

    if (!message) {
      return res.status(404).json({ success: false, message: 'Message not found' });
    }

    const emailSubject = `Re: Your Inquiry with OrvantaHealth`;
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #0d9488;">Hello ${message.name},</h2>
        <p>Thank you for reaching out to OrvantaHealth.</p>
        <p style="white-space: pre-line; line-height: 1.6;">${replyMessage}</p>
        <hr style="border: 1px solid #eee; margin: 20px 0;" />
        <p style="color: #666; font-size: 0.9em;">
          <strong>Your Original Message:</strong><br />
          ${message.message}
        </p>
      </div>
    `;

    await sendEmail({
      to: message.email,
      subject: emailSubject,
      html: emailHtml
    });

    message = await prisma.contactMessage.update({
      where: { id },
      data: { status: 'replied' }
    });

    res.status(200).json({
      success: true,
      data: message
    });
  } catch (error) {
    console.error('Error replying to message:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
});

module.exports = router;

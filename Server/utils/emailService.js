const nodemailer = require('nodemailer');

let transporter;

const createTransporter = () => {
  if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
    console.error('GMAIL_USER or GMAIL_APP_PASSWORD environment variables are not set');
    return null;
  }

  return nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // Use TLS
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD
    }
  });
};

const sendEmail = async (options) => {
  if (!transporter) {
    transporter = createTransporter();
    if (!transporter) {
      throw new Error('Email transporter could not be created. Check your environment variables.');
    }
  }

  const mailOptions = {
    from: `${process.env.APP_NAME} <${process.env.GMAIL_USER}>`,
    to: options.to,
    subject: options.subject,
    text: options.text,
    html: options.html // Optional: Send HTML email
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully to:', options.to);
    return info;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};

module.exports = sendEmail;
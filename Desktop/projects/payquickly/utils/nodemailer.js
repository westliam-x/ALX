const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  // host: "smtp.gmail.com",
  // port: 465,
  // secure: true,
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});


const sendOtpEmail = async (email, otp) => {
  const mailOptions = {
    from: 'westnetlix@gmail.com', // Use the same email as the sender
    to: email,
    subject: 'Your OTP',
    text: `Your OTP is: ${otp}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('OTP email sent successfully');
  } catch (error) {
    console.error('Error sending OTP email:', error);
    throw error; // Propagate the error for handling in the calling code if needed
  }
};

module.exports = {
  sendOtpEmail,
};

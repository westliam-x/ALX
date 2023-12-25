const express = require('express');
// const { sendOtpEmail } = require('../utils/nodemailer');

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { email } = req.body;

    function generateRandomAlphanumeric(length) {
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      let result = '';

      for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters.charAt(randomIndex);
      }

      return result;
    }

    // Generate a random alphanumeric value of length 5
    const otp = generateRandomAlphanumeric(5);

    if (!email || !otp) {
      return res.status(400).json({ error: 'Both email and OTP are required' });
    }

    // Retry mechanism
    const MAX_RETRIES = 3;
    let retries = 0;

    while (retries < MAX_RETRIES) {
      try {
        // Call the function to send OTP email
        await sendOtpEmail(email, otp);
        console.log('OTP email sent successfully');
        return res.json({ message: 'OTP email sent successfully', otp });
      } catch (error) {
        console.error(`Error sending OTP email (Retry ${retries + 1}/${MAX_RETRIES}):`, error);
        retries++;
      }
    }

    // If all retries fail
    console.error('Max retries reached. Unable to send OTP email.');
    return res.status(500).json({ error: 'Internal Server Error', otp });
  } catch (error) {
    console.error('Error in /send-otp route:', error);
    return res.status(500).json({ error: 'Internal Server Error', otp });
  }
});


const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
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

module.exports = router;

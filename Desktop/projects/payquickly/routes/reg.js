const express = require('express');
const bcrypt = require('bcrypt');
const { connection } = require('../conn');

const router = express.Router();

// Route for user registration
router.post('/', async (req, res) => {
  // Destructure values from the request body
  const { email, password, firstName, lastName, middleName, verification } = req.body;

  // Validate required fields
  if (!email || !password || !firstName || !lastName) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    // Hash the user's password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Check if the email is already associated with an existing user
    const existingUsers = await new Promise((resolve, reject) => {
      connection.query('SELECT * FROM user WHERE email = ?', [email], (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });

    if (existingUsers.length > 0) {
      return res.status(409).json({ message: 'Username or email already taken' });
    }

    // Prepare the new user data
    const newUser = {
      firstName: firstName,
      lastName: lastName,
      middleName: middleName,
      verification: verification,
      password: hashedPassword,
      email: email,
    };

    // Insert the new user into the database
    await new Promise((resolve, reject) => {
      connection.query('INSERT INTO user SET ?', newUser, (error) => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      });
    });

    // Respond with success message and user details
    res.status(201).json({ message: 'User registered successfully', user: newUser });
  } catch (error) {
    // Handle errors and log them
    console.error('Error during user registration:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;

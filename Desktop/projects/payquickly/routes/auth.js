const express = require('express');
const bcrypt = require('bcrypt');
const util = require('util');
const { connection } = require('../conn');

const router = express.Router();
const queryAsync = util.promisify(connection.query).bind(connection);

router.post('/', async (req, res) => {
  try {
    // Check if the database connection is established
    if (connection.state === 'disconnected') {
      console.error('Database connection is not established.');
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    const { email, password } = req.body;
    const query = 'SELECT * FROM user WHERE email = ?';
    const results = await queryAsync(query, [email]);

    if (results.length > 0) {
      const user = results[0];
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (passwordMatch) {
        res.json({ message: 'Login successful' });
      } else {
        res.status(401).json({ error: 'Invalid credentials' });
      }
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;

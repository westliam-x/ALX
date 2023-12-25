require("dotenv").config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import the cors middleware
const { connectToDatabase } = require('./conn');
const otpRoutes = require('./routes/sendOtp');
const regRoutes = require('./routes/reg');
const authRoutes = require('./routes/auth');

const app = express();
const port = 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to the database
connectToDatabase();

app.get('/', (req, res) => {
    console.log('This is a route handler');
    res.send('everybody scream!');
  });

// Routes
app.use("/api/sendOtp", otpRoutes);
app.use("/api/reg",regRoutes);
app.use("/api/auth",authRoutes);

// Global Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

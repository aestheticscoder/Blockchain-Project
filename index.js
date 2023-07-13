const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

// Connect to MongoDB database
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('MongoDB connection error:', error));



// Middleware
app.use(express.json());

// Routes
const coinRoutes = require("./route/route");
app.use('/api', coinRoutes);

// Start the server
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

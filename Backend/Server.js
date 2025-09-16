const path = require('path');


const express = require("express");
require("dotenv").config();
const connectDB = require("./config/db");
const Test = require("./models/Test");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");
const cors = require("cors");

const app = express();
app.use(cors("*"));
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware to parse JSON
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});



// Test database route
app.post("/test-db", async (req, res) => {
  try {
    const test = new Test({
      message: "Test database connection"
    });
    await test.save();
    res.json({ message: "Database test successful", data: test });
  } catch (error) {
    res.status(500).json({ message: "Database test failed", error: error.message });
  }
});

// Get all test documents
app.get("/test-db", async (req, res) => {
  try {
    const tests = await Test.find();
    res.json(tests);
  } catch (error) {
    res.status(500).json({ message: "Error fetching tests", error: error.message });
  }
});

app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

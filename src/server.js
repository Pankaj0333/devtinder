const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { connectDB } = require("./config/database");
const errorHandler = require('./middleware/errorHandler');
const cookieParser = require('cookie-parser');
// 🔐 Load .env before doing anything else
dotenv.config();

// ✅ Create Express app
const app = express();

// 🧩 Global middlewares
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse incoming JSON requests
app.use(cookieParser());


// Routes 
const authRoutes = require("./routes/authRoutes");



// Use Routes
app.use("/api/auth",authRoutes);



// Root
app.get("/",(req,res)=>{
    res.send("App is running ");
})

app.use(errorHandler); // Global error handler

// 📦 Load env variables
const PORT = process.env.PORT || 5000;

// 🚀 IIFE to run immediately Connect to DB then start server
(async () => {
    try {
      await connectDB(); // ⛓️ MongoDB connection
      console.log("✅ Database connected successfully");
  
      app.listen(PORT, () => {
        console.log(`🚀 Server running on http://localhost:${PORT}`);
      });
    } catch (err) {
      console.error("❌ Failed to connect to DB:", err.message);
      process.exit(1); // Exit with failure
    }
  })();
  



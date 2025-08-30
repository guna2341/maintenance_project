const mongoose = require("mongoose");

const Database = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/maintenance_project");
    console.log("✅ MongoDB connected successfully");
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err);
  }
};

module.exports = Database;

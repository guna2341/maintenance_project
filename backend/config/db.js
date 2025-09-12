const mongoose = require("mongoose");

const connection_string = process.env.MONGO_CONNECTION_STRING;

const Database = async () => {
  try {
    await mongoose.connect(connection_string);
    console.log("✅ MongoDB connected successfully");
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err);
  }
};

module.exports = Database;

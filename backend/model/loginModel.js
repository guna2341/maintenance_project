const { default: mongoose } = require("mongoose");


const loginSchema = new mongoose.Schema({
  userName: String,
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true, 
    trim: true,
    match: [/^\S+@\S+\.\S+$/, "Please use a valid email address"], 
    },
  password: String
});

const UserModel = mongoose.model("User", loginSchema);

module.exports = UserModel;
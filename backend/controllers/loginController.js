const UserModel = require("../model/loginModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const login = async (req, res) => { 
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }        
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid password' });
        }
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        return res.json({ token });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    };
};

const register = async (req, res) => { 
    try {
        const { userName, email, password } = req.body;
        const hashedPassword = bcrypt.hashSync(password, 10);
        const user = await UserModel.findOne({ email });
        if (user) {
            return res.json({message: "User already exists.Please login to continue"});
        }
        await UserModel.create({
            userName,
            email,
            password: hashedPassword
        });
        return res.json({ message: 'User registered successfully' });
    }
    catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    };
};

module.exports = { login, register };
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
        const token = jwt.sign({ userId: user._id, role:user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        return res.json({ token, userData:{
            userName:user.userName,
            role: user.role
        } });
    } catch (error) {
        return res.status(500).json({ message: error?.message });
    };
};

const register = async (req, res) => { 
    try {
        const { userName, email, password, role } = req.body;
        if (!userName || !email || !password) {
            return res.json({message: "Please fill all the fields"});
        }
        let userRole = role;
        if (!userRole) {
            userRole = "user";
        }

        const hashedPassword = bcrypt.hashSync(password, 10);
        const user = await UserModel.findOne({ email });
        if (user) {
            return res.json({message: "User already exists.Please login to continue"});
        }
        await UserModel.create({
            userName,
            email,
            password: hashedPassword,
            role: userRole
        });

        return res.json({ message: 'User registered successfully' });
    }
    catch (error) {
        return res.status(500).json({ message:error?.message });
    };
};

module.exports = { login, register };
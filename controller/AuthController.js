const User = require("../model/UserModel")
const bcrypt = require("bcrypt");
const { createSecretToken } = require("../util/SecretToken");

module.exports.Login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.json({ message: 'All fields are required' })
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.json({ message: 'Incorrect password or email' })
        }
        const auth = await bcrypt.compare(password, user.password)
        if (!auth) {
            return res.json({ message: 'Incorrect password or email' })
        }
        const token = createSecretToken(user._id);
        res.cookie("token", token, {
            withCredentials: true,
            httpOnly: false,
        });
        res.status(201).json({ message: "User logged in successfully", success: true });
        next()
    } catch (error) {
        console.error(error);
    }
}

module.exports.GetUser = async (req, res, next) => {
    try {
        const listUser = await User.find({}).sort({ createdAt: -1 }).exec();
        res.json(listUser)
        next()
    } catch (error) {
        console.error(error)
    }
}

module.exports.createUser = async (req, res) => {
    try {
        const {
            email,
            username,
            phoneNumber,
            gender,
            images,
            country,
            state,
            skills,
            role,
            password,
        } = req.body;

        if (!email,
            !username,
            !phoneNumber,
            !gender,
            !country,
            !images,
            !state,
            !skills,
            !role,
            !password) {
            return res.json({ message: 'All fields are required' })
        }

        const newUser = new User({
            email,
            username,
            phoneNumber,
            gender,
            images,
            country,
            state,
            skills,
            role,
            password,
        });

        const savedUser = await newUser.save();

        res.status(201).json(savedUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports.deleteUser = async (req, res) => {
    try {
        const userId = req.params.userId;
        console.log('Received DELETE request for user ID:', userId);

        const deletedUser = await User.findByIdAndDelete(userId);
        if (!deletedUser) {
            console.log('User not found for deletion');
            return res.status(404).json({ error: 'User not found' });
        }
        console.log('User deleted:', deletedUser);
        res.json(deletedUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

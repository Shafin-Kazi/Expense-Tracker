const User = require("../models/User")

const jwt = require("jsonwebtoken");

//jwt token gen. krne k lie

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1h" });
}


//register user krne k lie
exports.registerUser = async (req, res) => {
    const { fullName, email, password, profileImageUrl } = req.body;

    //validation : chck for missin fields
    if (!fullName || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }
    try {
        //check if email already exist
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already exist" });
        }

        //create the user
        const user = await User.create({
            fullName,
            email,
            password,
            profileImageUrl,
        });

        res.status(201).json({
            id: user._id,
            user,
            token: generateToken(user._id),
        });

    }
    catch (err) {
        res
            .status(500)
            .json({ message: "Error registering user", error: err.message });
    }
};

//login user
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const user = await User.findOne({ email });
        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        res.status(200).json({
            id: user._id,
            user,
            token: generateToken(user._id),
        });
    }
    catch (err) {
        res.status(500)
            .json({
                message: "Error logging in user", error: err.message
            })
    }

};

//user info
exports.getUserInfo = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json(user);
    }
    catch (err) {
        res.status(500)
            .json({
                message: "Error logging in user", error: err.message
            })
    }
};

//update user profile
exports.updateUser = async (req, res) => {
    try {
        const { fullName, profileImageUrl } = req.body;
        const userId = req.user.id;

        // Validation
        if (!fullName) {
            return res.status(400).json({ message: "Full name is required" });
        }

        // Find and update user
        const user = await User.findByIdAndUpdate(
            userId,
            {
                fullName,
                ...(profileImageUrl && { profileImageUrl })
            },
            { new: true, runValidators: true }
        ).select("-password");

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json(user);
    }
    catch (err) {
        res.status(500).json({
            message: "Error updating user",
            error: err.message
        });
    }
};


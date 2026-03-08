import { User } from "../moduls/user.module.js";

const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if(!username || !email || !password) {
            return res.status(400).json({message: "Please provide all the required fields."});
        };

        const existingUser = await User.findOne({email})
        if(existingUser) {
            return res.status(400).json({message: "Email already exists."});
        }

        const user = await User.create({
            username,
            email: email.toLowerCase(),
            password: password
        })
        
        return res.status(201).json({
            message: "User created successfully.",
            user: {id: user._id, username: user.username, email: user.email}
        });
    } catch(err) {
    return res.status(500).json({ message: `Internal server error: ${err.message}` })
}
}

const loginUser = async (req, res) => {
    try {
        
        const { email, password } = req.body;

        if(!email || !password) {
            return res.status(400).json({message: "Please provide all the required fields."});
        };

        const user = await User.findOne({
            email: email.toLowerCase(),
        });

        if(!user) {
            return res.status(400).json({message: "User not found."});
        }
        
        return res.status(200).json({
            message: "User logged in successfully.",
            user: {id: user._id, username: user.username, email: user.email}
        });
        
    } catch(err) {
        return res.status(500).json({message: "Internal server error."});
    }
}

const logoutUser = async (req, res) => {
    try {
        const { email} = req.body;
        const user = await User.findOne({email: email.toLowerCase()});
        if(!user) res.status(400).json({message: "User not found."});
        res.status(200).json({message: "User logged out successfully."});

    } catch(err) {
        return res.status(500).json({message: "Internal server error: ", err});
    }
}

export {
    registerUser,
    loginUser,
    logoutUser
}
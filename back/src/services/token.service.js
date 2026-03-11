import jwt from "jsonwebtoken"
import  { User } from "../moduls/user.module.js"


export const generateToken = async (user) => {
    
    const accessToken = jwt.sign(
        { email: user.email },
        process.env.ACCESS_TOKEN,
        { expiresIn: "30s" }
    );
    const refreshToken = jwt.sign(
        { email: user.email },
        process.env.REFRESH_TOKEN,
        { expiresIn: "1d" }
    );
    await User.findByIdAndUpdate(user._id, { refreshToken});
    return { accessToken, refreshToken }
}
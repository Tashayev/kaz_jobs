import mongoose from "mongoose"
import { User } from "../moduls/user.module.js"
import { generateToken } from "../services/token.service.js"

const registerUser = async (req, res) => {
  const session = await mongoose.startSession()
  try {
    session.startTransaction()
    const { username, email, password, role } = req.body

    if (!username || !email || !password || !role) {
      return res
        .status(400)
        .json({ message: "Please provide all the required fields." })
    }

    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists." })
    }

    const user = await User.create(
      [
        {
          username,
          email: email.toLowerCase(),
          password,
          role
        },
      ],
      { session },
    )

    const { accessToken } = await generateToken(user)
    await session.commitTransaction()
    res.status(201).json({
      message: "User created successfully.",
      user: { id: user._id, username: user.username, email: user.email, role: user.role },
      accessToken,
    })
  } catch (err) {
    session.abortTransaction()
    return res
      .status(500)
      .json({ message: `Internal server error: ${err.message}` })
  } finally {
    session.endSession()
  }
}

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Please provide all the required fields." })
    }

    const user = await User.findOne({
      email: email.toLowerCase(),
    })

    if (!user) {
      return res.status(400).json({ message: "User not found." })
    }

    if (!(await user.comparePassword(password))) {
      return res.status(400).json({ message: "Incorrect password." })
    }

    const { accessToken } = await generateToken(user)
    res.status(200).json({
      message: "User logged in successfully.",
      user: { id: user._id, username: user.username, email: user.email, role: user.role },
      accessToken,
    })
  } catch (err) {
    return res.status(500).json({ message: "Internal server error." })
  }
}

const logoutUser = async (req, res) => {
  try {
    const { email } = req.body
    const user = await User.findOne({ email: email.toLowerCase() })
    if (!user) return res.status(400).json({ message: "User not found." })

    await User.findByIdAndUpdate(user._id, { refreshToken: null })

    res.status(200).json({ message: "User logged out successfully." })
  } catch (err) {
    return res.status(500).json({ message: "Internal server error: ", err })
  }
}

const getProfile = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.user.email }).select(
      "-password -refreshToken",
    )
    if (!user) return res.status(404).json({ message: "User not found." })
    res.status(200).json({ user })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ message: "Internal server error." })
  }
}

const getRefreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.body
    if (!refreshToken) {
      return res.status(400).json({ message: "refreshToken is required." })
    }

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET)

    const user = await User.findOne({ refreshToken })
    if (!user) {
      return res.status(401).json({ message: "Invalid refreshToken." })
    }

    const { accessToken } = await generateToken(user)
    res.status(200).json({ accessToken })
  } catch (err) {
    console.error(err)
    return res.status(401).json({ message: "Invalid or expired refreshToken." })
  }
}

const getUsers = async (req, res) => {
  try {
    const { role } = req.query
    const filter = role ? { role } : {}
    const users = await User.find(filter).select("-password -refreshToken -__v ")
    res.status(200).json({ users })
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }
}

export {
  registerUser,
  loginUser,
  logoutUser,
  getProfile,
  getRefreshToken,
  getUsers
}

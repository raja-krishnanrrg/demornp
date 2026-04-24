
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// 🔹 Generate Token
const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

// 🔹 Register
export const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const lowerEmail = email.toLowerCase();

    const existingUser = await User.findOne({ email: lowerEmail });
    if (existingUser) {
      return res.status(400).json({ msg: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email: lowerEmail,
      password: hashedPassword,
      role,
    });

    res.json({
      token: generateToken(user._id, user.role),
      user: {
        id: user._id,
        role: user.role,
        name: user.name, // ✅ important
      },
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Server error" });
  }
};

// 🔹 Login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const lowerEmail = email.toLowerCase();

    const user = await User.findOne({ email: lowerEmail });

    if (!user) {
      return res.status(400).json({ msg: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ msg: "Wrong password" });
    }

    res.json({
      token: generateToken(user._id, user.role),
      user: {
        id: user._id,
        role: user.role,
        name: user.name, // ✅ important
      },
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Server error" });
  }
};


// // 🔹 Delete Account
export const deleteMyAccount = async (req, res) => {
  try {
    console.log("USER:", req.user);

    await User.findByIdAndDelete(req.user.id);

    res.json({ msg: "User deleted successfully" });

  } catch (err) {
    console.log("ERROR:", err);
    res.status(500).json({ msg: "Server error" });
  }
};
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";
import crypto from "crypto";
import dotenv from "dotenv";
import dns from "dns";
import jwt from "jsonwebtoken";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

//added to make database work
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const conStr =
  "mongodb+srv://admin:admin123@hct-cluster.czj4w6k.mongodb.net/HCSDB?retryWrites=true&w=majority&appName=HCT-Cluster";

mongoose
  .connect(conStr)
  .then(() => console.log("Database Connected..."))
  .catch((error) => console.log("Database Error: " + error));

const UserSchema = new mongoose.Schema({
  username: String,
  email: String,
  phone: String,
  centerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "CENTER"
  },
  password: String,

  role: {
    type: String,
    default: "customer",
  },

  resetToken: String,
  resetTokenExpiry: Date,
});

const UserModel = mongoose.model("USER", UserSchema, "USER");

const CenterSchema = new mongoose.Schema({
  centerName: String,
  image: String,
  isActive: String,
  location: String,
});

const CenterModel = mongoose.model("CENTER", CenterSchema, "CENTER");

// Register API
app.post("/register", async (req, res) => {
  try {
    const { username, email, phone, password } = req.body;

    const user = await UserModel.findOne({ email });

    if (user) {
      return res.send({ message: "User Exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new UserModel({
      username,
      email,
      phone,
      password: hashedPassword,
    });

    await newUser.save();

    res.send({ message: "User Registered" });
  } catch (error) {
    res.send({ message: "Register Error: " + error });
  }
});


// Register Center API - Admin Only
const verifyAdmin = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Access denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.role !== "admin") {
      return res.status(403).json({ message: "Admin only" });
    }

    UserModel.findById(decoded.id)
      .then((admin) => {
        if (!admin || admin.role !== "admin") {
          return res.status(403).json({
            message: "Admin only",
          });
        }

        req.adminId = admin._id;
        next();
      })
      .catch(() => {
        return res.status(500).json({
          message: "Authorization error",
        });
      });

  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

// Register New Center API
app.post("/register-center", verifyAdmin, async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    if (!name || !email || !phone || !password) {
      return res.status(400).json({
        message: "Please fill in all fields",
      });
    }

    if (!email.endsWith(".om")) {
      return res.status(400).json({
        message: "Email must end with .om",
      });
    }

    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
      return res.status(409).json({
        message: "Email already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newCenterUser = new UserModel({
      username: name,
      email,
      phone,
      password: hashedPassword,
      role: "center",
    });

    const newCenter = new CenterModel({
      centerName: name,
      image: "",
      isActive: "true",
      location: "",
    });

    await newCenter.save();
    newCenterUser.centerId = newCenter._id;

    try {
      await newCenterUser.save();
    } catch (error) {
      await CenterModel.findByIdAndDelete(newCenter._id);
      throw error;
    }

    return res.status(201).json({
      message: "Center account registered successfully",
    });
  } catch (error) {
    console.error("Register Center Error:", error);
    return res.status(500).json({
      message: "Center registration failed",
    });
  }
});


 // Remove Center API - Admin Only
app.delete("/remove-center", verifyAdmin, async (req, res) => {
  try {
    const { centerName } = req.body;

    if (!centerName || !centerName.trim()) {
      return res.status(400).json({
        message: "Please enter center name",
      });
    }

    const center = await CenterModel.findOne({
      centerName: centerName.trim(),
    });

    if (!center) {
      return res.status(404).json({
        message: "Center not found",
      });
    }

    await UserModel.deleteMany({
      centerId: center._id,
      role: "center",
    });

    await CenterModel.findByIdAndDelete(center._id);

    return res.status(200).json({
      message: "Center removed successfully",
    });
  } catch (error) {
    console.error("Remove Center Error:", error);
    return res.status(500).json({
      message: "Failed to remove center",
    });
  }
});



// Login API
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("LOGIN EMAIL:", email);

    const user = await UserModel.findOne({ email });
    console.log("FOUND USER:", user);
    console.log("DATABASE:", mongoose.connection.name);
    console.log("USERS COUNT:", await UserModel.countDocuments());

    // user login
    if (!user) {
      return res.send({
        message: "Invalid Email",
      });
    }

    // admin & center login
    if (user.role === "admin" || user.role === "center") {

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.send({
          message: "Email or Password Invalid",
        });
      }

      const token = jwt.sign(
        {
          id: user._id,
          role: user.role,
        },
        process.env.JWT_SECRET,
        { expiresIn: "2h" }
      );

      const safeUser = user.toObject();
      delete safeUser.password;

      return res.send({
        message: "success",
        user: safeUser,
        token: token,
      });
    }

    // user login
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.send({
        message: "Invalid Password",
      });
    }

    const safeUser = user.toObject();
    delete safeUser.password;

    res.send({
      message: "success",
      user: safeUser,
    });

  } catch (error) {
    res.send({
      message: "Login Error: " + error.message,
    });
  }
});

// Forgot Password API
app.post("/forgot-password", async (req, res) => {
  console.log("Forgot password request received:", req.body);
  try {
    const { email } = req.body;

    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.send({ message: "Email not found" });
    }

    const token = crypto.randomBytes(32).toString("hex");

    user.resetToken = token;
    user.resetTokenExpiry = Date.now() + 15 * 60 * 1000;
    await user.save();

    const resetLink = `${process.env.CLIENT_URL}/reset-password/${token}`;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Reset Your Password",
      html: `
        <h3>Reset Password</h3>
        <p>Click the link below to reset your password:</p>
        <a href="${resetLink}">Reset Password</a>
        <p>This link will expire in 15 minutes.</p>
      `,
    });

    res.send({ message: "Reset link sent successfully" });
  } catch (error) {
    res.send({ message: "Email Error: " + error.message });
  }
});

// Get Users
app.get("/getUsers", async (req, res) => {
  try {
    const users = await UserModel.find({});
    res.send(users);
  } catch (error) {
    res.send({ message: "Read Error: " + error });
  }
});

// Reset Password 
app.post("/reset-password", async (req, res) => {
  try {
    const { token, password } = req.body;

    const user = await UserModel.findOne({
      resetToken: token,
      resetTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return res.send({ message: "Invalid or expired token" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user.password = hashedPassword;
    user.resetToken = undefined;
    user.resetTokenExpiry = undefined;

    await user.save();

    res.send({ message: "Password updated successfully" });

  } catch (error) {
    res.send({ message: "Reset Error: " + error.message });
  }
});

app.listen(3002, () => {
  console.log("Server Connected...");
});

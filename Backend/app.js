const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const User = require("./models/User");
const multer = require("multer");
const cors = require("cors");

const app = express();
const port = 3000;

mongoose.connect("mongodb://localhost:27017/employeesDb", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(cors());

const employeeStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: employeeStorage });

app.use(upload.any());
app.use("/uploads", express.static("uploads"));

app.use(bodyParser.json());

// CRUD operations

// Create

app.post("/employee", async (req, res) => {
  try {
    const { name, email, password, profilePic, role } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser && existingUser.email) {
      return res.json({
        status: false,
        message: "Email already exists. Please choose a different email.",
      });
    }
    const userFields = {
      name,
      email,
      password,
      profilePic,
      role,
    };
    if (req.files && req.files.length > 0) {
      userFields.profilePic = "/uploads/" + req.files[0].filename;
    }
    const user = new User(userFields);
    await user.save();
    res.json({
      status: true,
      message: "User created successfully",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Failed to create data",
      error: error.message,
    });
  }
});

// Read all
app.get("/employee", async (req, res) => {
  try {
    const employee = await User.find({});
    res.json({
      status: true,
      message: "Data fetched successfully",
      data: employee,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Failed to fetch data",
      error: error.message,
    });
  }
});

// Read one
app.get("/employee/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.json({
      status: true,
      message: "Data fetched successfully",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Failed to fetch data",
      error: error.message,
    });
  }
});

// Update
app.post("/employee/:id", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !role) {
      return res.status(400).json({
        status: false,
        message: "Name, email, and role are required fields.",
      });
    }

    let profilePicPath = "";
    if (req.files && req.files.length > 0) {
      profilePicPath = "/uploads/" + req.files[0].filename;
    }

    const user = await User.findById(req.params.id);

    if (user) {
      user.name = name;
      user.email = email;
      user.role = role;
      if (profilePicPath) {
        user.profilePic = profilePicPath;
      }
      await user.save();
      return res.json({
        status: true,
        message: "Data updated successfully",
        data: user,
      });
    } else {
      return res.status(404).json({
        status: false,
        message: "User not found",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: false,
      message: "Failed to update data",
      error: error.message,
    });
  }
});

// Delete
app.delete("/employee/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    res.json({
      status: true,
      message: "Data deleted successfully",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Failed to delete data",
      error: error.message,
    });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

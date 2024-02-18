const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const User = require("./models/User");
const multer = require("multer");

const app = express();
const port = 3000;

mongoose.connect("mongodb://localhost:27017/employeesDb", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const userStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: userStorage });

app.use(upload.any());

app.use(bodyParser.json());

// CRUD operations

// Create

app.post("/users", async (req, res) => {
  try {
    const { name, email, password, profilePic, phone } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser && existingUser.email) {
      return res.status(400).json({
        status: false,
        message: "Email already exists. Please choose a different email.",
      });
    }
    const userFields = {
      name,
      email,
      password,
      profilePic,
      phone,
    };
    if (req.files && req.files.length > 0) {
      userFields.profilePic = "./uploads/" + req.files[0].filename;
    }
    const user = new User(userFields);
    await user.save();
    res.json({
      status: true,
      message: "User created successfully",
      data: user,
    });
  } catch (error) {
    // Handle errors
    res.status(500).json({
      status: false,
      message: "Failed to create data",
      error: error.message,
    });
  }
});

// Read all
app.get("/getAllUsers", async (req, res) => {
  try {
    const users = await User.find({});
    res.json({
      status: true,
      message: "Data fetched successfully",
      data: users,
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
app.get("/users/:id", async (req, res) => {
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
app.put("/users/:id", async (req, res) => {
  try {
    const data = req.body;
    const user = await User.findByIdAndUpdate(req.params.id, data, {
      new: true,
    });
    res.json({
      status: true,
      message: "Data updated successfully",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Failed to update data",
      error: error.message,
    });
  }
});

// Delete
app.delete("/users/:id", async (req, res) => {
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

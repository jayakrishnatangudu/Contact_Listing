import express from "express";
import User from "../models/user.model.js";

const router = express.Router();

router.post("/add", async (req, res) => {
  try {
    const { name, number } = req.body;
    console.log("Received Data backend: ", name, number);

    if (!name.trim() || !number.trim()) {
      return res.status(400).json({
        success: false,
        message: "Name and number are required",
      });
    }

    // Check for duplicate name (case-insensitive)
    const existingName = await User.findOne({
      name: { $regex: new RegExp(`^${name.trim()}$`, "i") },
    });

    if (existingName) {
      return res.status(409).json({
        success: false,
        message: `A contact with the name "${name}" already exists.`,
      });
    }

    // Check for duplicate number
    const existingNumber = await User.findOne({ number: number.trim() });

    if (existingNumber) {
      return res.status(409).json({
        success: false,
        message: "This phone number already exists.",
      });
    }

    const user = new User({
      name: name.trim(),
      number: number.trim(),
    });
    await user.save();

    res.status(201).json({
      success: true,
      message: "Contact added successfully",
      user,
    });
  } catch (error) {
    console.error("Error adding user:", error);
    res.status(500).json({
      success: false,
      message: "Error while adding user",
    });
  }
});

router.get("/all", async (req, res) => {
  try {
    const users = await User.find().sort({ name: 1 }); // Sort alphabetically
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error while fetching the contact list",
    });
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({
        success: false,
        message: "Contact not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Contact deleted successfully",
      deletedUser,
    });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({
      success: false,
      message: "Error while deleting contact",
    });
  }
});

export default router;

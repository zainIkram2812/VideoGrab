const express = require("express");
const User = require("../models/User");
const Download = require("../models/download");
const auth = require("../middleware/auth");

const router = express.Router();

// Get user profile
router.get("/profile", auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.resetDailyDownloads();
    await user.save();

    res.json({
      id: user._id,
      email: user.email,
      name: user.name,
      subscription: user.subscription,
      subscriptionExpiry: user.subscriptionExpiry,
      downloadsToday: user.downloadsToday,
      totalDownloads: user.totalDownloads,
      isPro: user.isPro(),
      createdAt: user.createdAt,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get download history
router.get("/downloads", auth, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const downloads = await Download.find({ userId: req.userId })
      .sort({ downloadedAt: -1 })
      .limit(limit)
      .skip(skip);

    const total = await Download.countDocuments({ userId: req.userId });

    res.json({
      downloads,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update user profile
router.put("/profile", auth, async (req, res) => {
  try {
    const { name } = req.body;

    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (name) user.name = name;
    await user.save();

    res.json({
      id: user._id,
      email: user.email,
      name: user.name,
      subscription: user.subscription,
      downloadsToday: user.downloadsToday,
      isPro: user.isPro(),
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

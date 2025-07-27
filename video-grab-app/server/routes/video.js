const express = require("express");
const axios = require("axios");
const User = require("../models/User");
const Download = require("../models/download");
const auth = require("../middleware/auth");

const router = express.Router();

// Detect platform from URL
const detectPlatform = (url) => {
  if (url.includes("youtube.com") || url.includes("youtu.be")) return "youtube";
  if (url.includes("instagram.com")) return "instagram";
  if (url.includes("tiktok.com")) return "tiktok";
  return null;
};

// Mock function to get video info (replace with actual API calls)
const getVideoInfo = async (url, platform) => {
  // This is a mock implementation
  // In production, you'd use actual APIs or services like yt-dlp
  const mockData = {
    youtube: {
      title: "Sample YouTube Video",
      thumbnail:
        "https://images.pexels.com/photos/1092644/pexels-photo-1092644.jpeg?auto=compress&cs=tinysrgb&w=400",
      duration: 180,
      availableFormats: ["360p", "480p", "720p", "1080p"],
    },
    instagram: {
      title: "Instagram Reel",
      thumbnail:
        "https://images.pexels.com/photos/1162983/pexels-photo-1162983.jpeg?auto=compress&cs=tinysrgb&w=400",
      duration: 30,
      availableFormats: ["480p", "720p"],
    },
    tiktok: {
      title: "TikTok Video",
      thumbnail:
        "https://images.pexels.com/photos/1851415/pexels-photo-1851415.jpeg?auto=compress&cs=tinysrgb&w=400",
      duration: 15,
      availableFormats: ["480p", "720p"],
    },
  };

  return mockData[platform] || null;
};

// Get video info
router.post("/info", auth, async (req, res) => {
  try {
    const { url } = req.body;

    if (!url) {
      return res.status(400).json({ error: "URL is required" });
    }

    const platform = detectPlatform(url);
    if (!platform) {
      return res.status(400).json({ error: "Unsupported platform" });
    }

    const videoInfo = await getVideoInfo(url, platform);
    if (!videoInfo) {
      return res
        .status(400)
        .json({ error: "Could not fetch video information" });
    }

    res.json({
      platform,
      ...videoInfo,
      originalUrl: url,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Download video
router.post("/download", auth, async (req, res) => {
  try {
    const { url, format = "mp4", quality = "480p" } = req.body;
    const userId = req.userId;

    // Get user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Reset daily downloads if needed
    user.resetDailyDownloads();

    // Check rate limits for free users
    if (!user.isPro() && user.downloadsToday >= 3) {
      return res.status(429).json({
        error: "Daily download limit reached",
        message: "Upgrade to Pro for unlimited downloads",
      });
    }

    const platform = detectPlatform(url);
    if (!platform) {
      return res.status(400).json({ error: "Unsupported platform" });
    }

    const videoInfo = await getVideoInfo(url, platform);
    if (!videoInfo) {
      return res
        .status(400)
        .json({ error: "Could not fetch video information" });
    }

    // Check quality restrictions for free users
    if (!user.isPro() && ["720p", "1080p"].includes(quality)) {
      return res.status(403).json({
        error: "HD quality requires Pro subscription",
        message: "Upgrade to Pro for HD downloads",
      });
    }

    // Create download record
    const download = new Download({
      userId,
      videoUrl: url,
      platform,
      videoTitle: videoInfo.title,
      thumbnail: videoInfo.thumbnail,
      format,
      quality,
      duration: videoInfo.duration,
      fileSize: Math.floor(Math.random() * 50000000), // Mock file size
    });

    await download.save();

    // Update user stats
    user.downloadsToday += 1;
    user.totalDownloads += 1;
    user.lastDownloadDate = new Date();
    await user.save();

    // In production, this would trigger actual video processing
    const downloadLink = `https://example.com/download/${download._id}`;

    res.json({
      downloadId: download._id,
      downloadLink,
      message: "Download prepared successfully",
      videoInfo: {
        title: videoInfo.title,
        thumbnail: videoInfo.thumbnail,
        format,
        quality,
        platform,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

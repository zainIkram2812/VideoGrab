const mongoose = require("mongoose");

const downloadSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  videoUrl: {
    type: String,
    required: true,
  },
  platform: {
    type: String,
    enum: ["youtube", "instagram", "tiktok"],
    required: true,
  },
  videoTitle: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
    default: "",
  },
  format: {
    type: String,
    enum: ["mp4", "mp3"],
    default: "mp4",
  },
  quality: {
    type: String,
    enum: ["360p", "480p", "720p", "1080p"],
    default: "480p",
  },
  downloadedAt: {
    type: Date,
    default: Date.now,
  },
  fileSize: {
    type: Number,
    default: 0,
  },
  duration: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("Download", downloadSchema);

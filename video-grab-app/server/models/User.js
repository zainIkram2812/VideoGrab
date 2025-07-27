const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  subscription: {
    type: String,
    enum: ["free", "pro", "pro-trial"],
    default: "free",
  },
  subscriptionExpiry: {
    type: Date,
    default: null,
  },
  downloadsToday: {
    type: Number,
    default: 0,
  },
  lastDownloadDate: {
    type: Date,
    default: null,
  },
  totalDownloads: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Compare password method
userSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

// Check if user is pro
userSchema.methods.isPro = function () {
  if (this.subscription === "free") return false;
  if (this.subscription === "pro") return true;
  if (this.subscription === "pro-trial") {
    return this.subscriptionExpiry && this.subscriptionExpiry > new Date();
  }
  return false;
};

// Reset daily downloads if new day
userSchema.methods.resetDailyDownloads = function () {
  const today = new Date();
  const lastDownload = this.lastDownloadDate;

  if (!lastDownload || lastDownload.toDateString() !== today.toDateString()) {
    this.downloadsToday = 0;
    this.lastDownloadDate = today;
  }
};

module.exports = mongoose.model("User", userSchema);

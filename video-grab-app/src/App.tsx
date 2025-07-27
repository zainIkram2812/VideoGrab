import React, { useState } from "react";
import { Download, Video, User, LogOut, Crown, Zap } from "lucide-react";
import Navbar from "./components/Navbar";
import VideoInput from "./components/VideoInput";
import VideoPreview from "./components/VideoPreview";
import DownloadOptions from "./components/DownloadOptions";
import UserDashboard from "./components/UserDashboard";
import AuthModal from "./components/AuthModal";
import ProModal from "./components/ProModal";
import { AuthProvider, useAuth } from "./components/context/AuthContext";

function AppContent() {
  const { user, logout } = useAuth();
  const [currentView, setCurrentView] = useState("home");
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showProModal, setShowProModal] = useState(false);
  const [videoData, setVideoData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleVideoSubmit = async (url) => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/video/info", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ url }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch video info");
      }

      const data = await response.json();
      setVideoData(data);
    } catch (error) {
      console.error("Error fetching video info:", error);
      alert(
        "Error fetching video information. Please check the URL and try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = async (options) => {
    try {
      const response = await fetch("/api/video/download", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          url: videoData.originalUrl,
          format: options.format,
          quality: options.quality,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 403 || response.status === 429) {
          setShowProModal(true);
          return;
        }
        throw new Error(data.error || "Download failed");
      }

      // Simulate download
      alert(`Download started! File: ${data.videoInfo.title}`);
      setVideoData(null);
    } catch (error) {
      console.error("Download error:", error);
      alert(error.message || "Download failed");
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <div className="bg-gradient-to-r from-purple-500 to-blue-500 p-4 rounded-full">
                <Download className="h-12 w-12 text-white" />
              </div>
            </div>
            <h1 className="text-5xl font-bold text-white mb-4">VideoGrab</h1>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Download videos from YouTube, Instagram Reels, and TikTok with
              ease. High quality, fast downloads, and professional features.
            </p>
            <button
              onClick={() => setShowAuthModal(true)}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Get Started Free
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: <Video className="h-8 w-8" />,
                title: "Multi-Platform Support",
                description:
                  "Download from YouTube, Instagram Reels, and TikTok",
              },
              {
                icon: <Zap className="h-8 w-8" />,
                title: "Lightning Fast",
                description:
                  "High-speed downloads with multiple quality options",
              },
              {
                icon: <Crown className="h-8 w-8" />,
                title: "Pro Features",
                description: "HD downloads, no watermarks, batch processing",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 text-center"
              >
                <div className="bg-gradient-to-r from-purple-500 to-blue-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-white">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      <Navbar
        user={user}
        currentView={currentView}
        onViewChange={setCurrentView}
        onLogout={logout}
        onShowPro={() => setShowProModal(true)}
      />

      <main className="container mx-auto px-4 py-8">
        {currentView === "home" && (
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-gray-800 mb-4">
                Download Your Favorite Videos
              </h1>
              <p className="text-xl text-gray-600">
                Paste any video URL and download in seconds
              </p>
            </div>

            <VideoInput onSubmit={handleVideoSubmit} isLoading={isLoading} />

            {videoData && (
              <div className="mt-8 space-y-6">
                <VideoPreview video={videoData} />
                <DownloadOptions
                  video={videoData}
                  user={user}
                  onDownload={handleDownload}
                  onShowPro={() => setShowProModal(true)}
                />
              </div>
            )}

            {/* Usage Stats */}
            <div className="mt-12 bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Today's Usage
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">
                    {user.downloadsToday || 0}
                  </div>
                  <div className="text-sm text-gray-600">Downloads</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    {user.isPro
                      ? "∞"
                      : Math.max(0, 3 - (user.downloadsToday || 0))}
                  </div>
                  <div className="text-sm text-gray-600">Remaining</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {user.totalDownloads || 0}
                  </div>
                  <div className="text-sm text-gray-600">Total</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">
                    {user.isPro ? "Pro" : "Free"}
                  </div>
                  <div className="text-sm text-gray-600">Plan</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {currentView === "dashboard" && <UserDashboard user={user} />}
      </main>

      <ProModal isOpen={showProModal} onClose={() => setShowProModal(false)} />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;

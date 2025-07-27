import React, { useState } from "react";
import { Download, Link, Youtube, Instagram } from "lucide-react";

interface VideoInputProps {
  onSubmit: (url: string) => void;
  isLoading: boolean;
}

const VideoInput: React.FC<VideoInputProps> = ({ onSubmit, isLoading }) => {
  const [url, setUrl] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url.trim()) {
      onSubmit(url.trim());
    }
  };

  const getSupportedPlatforms = () => [
    { name: "YouTube", icon: Youtube, color: "text-red-600", bg: "bg-red-100" },
    {
      name: "Instagram",
      icon: Instagram,
      color: "text-pink-600",
      bg: "bg-pink-100",
    },
    { name: "TikTok", icon: Link, color: "text-black", bg: "bg-gray-100" },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="video-url"
            className="block text-lg font-semibold text-gray-800 mb-3"
          >
            Paste Video URL
          </label>
          <div className="relative">
            <input
              id="video-url"
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://youtube.com/watch?v=... or https://instagram.com/reel/... or https://tiktok.com/@user/video/..."
              className="w-full px-4 py-4 pl-12 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-100 outline-none transition-all duration-300 text-lg"
              required
              disabled={isLoading}
            />
            <Link className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading || !url.trim()}
          className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:from-gray-400 disabled:to-gray-400 text-white py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
        >
          {isLoading ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
              <span>Analyzing...</span>
            </>
          ) : (
            <>
              <Download className="h-5 w-5" />
              <span>Get Video Info</span>
            </>
          )}
        </button>
      </form>

      <div className="mt-8">
        <h3 className="text-sm font-semibold text-gray-600 mb-4 uppercase tracking-wide">
          Supported Platforms
        </h3>
        <div className="grid grid-cols-3 gap-4">
          {getSupportedPlatforms().map((platform, index) => (
            <div
              key={index}
              className={`${platform.bg} rounded-lg p-4 text-center`}
            >
              <platform.icon
                className={`h-6 w-6 ${platform.color} mx-auto mb-2`}
              />
              <span className="text-sm font-medium text-gray-700">
                {platform.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VideoInput;

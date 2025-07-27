import React from "react";
import { Play, Clock, Eye } from "lucide-react";

interface VideoPreviewProps {
  video: {
    title: string;
    thumbnail: string;
    platform: string;
    duration: number;
    availableFormats: string[];
  };
}

const VideoPreview: React.FC<VideoPreviewProps> = ({ video }) => {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case "youtube":
        return "bg-red-500";
      case "instagram":
        return "bg-gradient-to-r from-purple-500 to-pink-500";
      case "tiktok":
        return "bg-black";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      <div className="relative">
        <img
          src={video.thumbnail}
          alt={video.title}
          className="w-full h-64 object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-full p-4">
            <Play className="h-12 w-12 text-white" />
          </div>
        </div>
        <div className="absolute top-4 left-4">
          <span
            className={`${getPlatformColor(
              video.platform
            )} text-white px-3 py-1 rounded-full text-sm font-semibold capitalize`}
          >
            {video.platform}
          </span>
        </div>
        <div className="absolute bottom-4 right-4 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-sm flex items-center space-x-1">
          <Clock className="h-3 w-3" />
          <span>{formatTime(video.duration)}</span>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4 line-clamp-2">
          {video.title}
        </h3>

        <div className="flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Eye className="h-4 w-4" />
              <span>Ready to download</span>
            </div>
          </div>
          <div className="text-xs bg-gray-100 px-2 py-1 rounded">
            {video.availableFormats.length} quality options
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPreview;

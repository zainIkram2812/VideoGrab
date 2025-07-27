import React, { useState, useEffect } from "react";
import {
  Download,
  Calendar,
  BarChart3,
  Crown,
  Clock,
  FileVideo,
} from "lucide-react";

interface UserDashboardProps {
  user: any;
}

const UserDashboard: React.FC<UserDashboardProps> = ({ user }) => {
  const [downloads, setDownloads] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDownloads();
  }, []);

  const fetchDownloads = async () => {
    try {
      const response = await fetch("/api/user/downloads", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setDownloads(data.downloads);
      }
    } catch (error) {
      console.error("Error fetching downloads:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
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

  const stats = [
    {
      title: "Total Downloads",
      value: user.totalDownloads || 0,
      icon: Download,
      color: "text-blue-600",
      bg: "bg-blue-100",
    },
    {
      title: "Today's Downloads",
      value: user.downloadsToday || 0,
      icon: Calendar,
      color: "text-green-600",
      bg: "bg-green-100",
    },
    {
      title: "Plan Status",
      value: user.isPro ? "Pro" : "Free",
      icon: user.isPro ? Crown : BarChart3,
      color: user.isPro ? "text-orange-600" : "text-purple-600",
      bg: user.isPro ? "bg-orange-100" : "bg-purple-100",
    },
    {
      title: "Member Since",
      value: new Date(user.createdAt).toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
      }),
      icon: Clock,
      color: "text-gray-600",
      bg: "bg-gray-100",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Welcome back, {user.name}!
            </h1>
            <p className="text-gray-600 mt-2">
              Track your downloads and manage your account
            </p>
          </div>
          {user.isPro && (
            <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-full flex items-center space-x-2">
              <Crown className="h-5 w-5" />
              <span className="font-semibold">Pro Member</span>
            </div>
          )}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className={`${stat.bg} p-3 rounded-lg`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
            </div>
            <div className="text-2xl font-bold text-gray-800 mb-1">
              {stat.value}
            </div>
            <div className="text-sm text-gray-600">{stat.title}</div>
          </div>
        ))}
      </div>

      {/* Usage Progress */}
      {!user.isPro && (
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Daily Usage
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Downloads Today</span>
              <span className="font-semibold">
                {user.downloadsToday || 0}/3
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-purple-500 to-blue-500 h-3 rounded-full transition-all duration-300"
                style={{
                  width: `${Math.min(
                    ((user.downloadsToday || 0) / 3) * 100,
                    100
                  )}%`,
                }}
              ></div>
            </div>
            <p className="text-sm text-gray-500">
              {3 - (user.downloadsToday || 0)} downloads remaining today
            </p>
          </div>
        </div>
      )}

      {/* Recent Downloads */}
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-6">
          Recent Downloads
        </h3>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-2 border-purple-600 border-t-transparent"></div>
          </div>
        ) : downloads.length === 0 ? (
          <div className="text-center py-12">
            <FileVideo className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No downloads yet</p>
            <p className="text-sm text-gray-400">
              Start downloading videos to see them here
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {downloads.map((download: any, index) => (
              <div
                key={index}
                className="flex items-center space-x-4 p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
              >
                <img
                  src={download.thumbnail}
                  alt={download.videoTitle}
                  className="w-16 h-16 object-cover rounded-lg"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-gray-800 truncate">
                    {download.videoTitle}
                  </h4>
                  <div className="flex items-center space-x-4 mt-1">
                    <span
                      className={`${getPlatformColor(
                        download.platform
                      )} text-white px-2 py-1 rounded text-xs font-medium capitalize`}
                    >
                      {download.platform}
                    </span>
                    <span className="text-sm text-gray-500">
                      {download.quality} • {download.format.toUpperCase()}
                    </span>
                  </div>
                </div>
                <div className="text-sm text-gray-500">
                  {formatDate(download.downloadedAt)}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;

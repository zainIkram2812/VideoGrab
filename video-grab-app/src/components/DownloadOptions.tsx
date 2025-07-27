import React, { useState } from "react";
import { Download, Crown, Lock, CheckCircle } from "lucide-react";

interface DownloadOptionsProps {
  video: any;
  user: any;
  onDownload: (options: { format: string; quality: string }) => void;
  onShowPro: () => void;
}

const DownloadOptions: React.FC<DownloadOptionsProps> = ({
  video,
  user,
  onDownload,
  onShowPro,
}) => {
  const [selectedFormat, setSelectedFormat] = useState("mp4");
  const [selectedQuality, setSelectedQuality] = useState("480p");

  const qualityOptions = [
    { value: "360p", label: "360p", size: "~15MB", pro: false },
    { value: "480p", label: "480p (SD)", size: "~25MB", pro: false },
    { value: "720p", label: "720p (HD)", size: "~50MB", pro: true },
    { value: "1080p", label: "1080p (Full HD)", size: "~100MB", pro: true },
  ];

  const formatOptions = [
    { value: "mp4", label: "MP4 Video", icon: "🎥" },
    { value: "mp3", label: "MP3 Audio", icon: "🎵" },
  ];

  const handleDownload = () => {
    onDownload({ format: selectedFormat, quality: selectedQuality });
  };

  const isQualityLocked = (quality: string) => {
    const option = qualityOptions.find((q) => q.value === quality);
    return option?.pro && !user.isPro;
  };

  const canDownload = () => {
    if (!user.isPro && user.downloadsToday >= 3) return false;
    if (isQualityLocked(selectedQuality)) return false;
    return true;
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      <h3 className="text-2xl font-semibold text-gray-800 mb-6">
        Download Options
      </h3>

      <div className="space-y-6">
        {/* Format Selection */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Format
          </label>
          <div className="grid grid-cols-2 gap-3">
            {formatOptions.map((format) => (
              <button
                key={format.value}
                onClick={() => setSelectedFormat(format.value)}
                className={`p-4 border-2 rounded-xl transition-all duration-300 ${
                  selectedFormat === format.value
                    ? "border-purple-500 bg-purple-50 text-purple-700"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{format.icon}</span>
                  <span className="font-medium">{format.label}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Quality Selection */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <label className="block text-sm font-semibold text-gray-700">
              Quality
            </label>
            {!user.isPro && (
              <button
                onClick={onShowPro}
                className="text-xs text-orange-600 hover:text-orange-700 font-medium flex items-center space-x-1"
              >
                <Crown className="h-3 w-3" />
                <span>Upgrade for HD</span>
              </button>
            )}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {qualityOptions
              .filter((quality) =>
                video.availableFormats.includes(quality.value)
              )
              .map((quality) => {
                const isLocked = isQualityLocked(quality.value);
                const isSelected = selectedQuality === quality.value;

                return (
                  <button
                    key={quality.value}
                    onClick={() => {
                      if (isLocked) {
                        onShowPro();
                      } else {
                        setSelectedQuality(quality.value);
                      }
                    }}
                    className={`p-4 border-2 rounded-xl transition-all duration-300 relative ${
                      isSelected && !isLocked
                        ? "border-purple-500 bg-purple-50"
                        : isLocked
                        ? "border-gray-200 bg-gray-50 opacity-75"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="text-left">
                        <div className="font-medium text-gray-800 flex items-center space-x-2">
                          <span>{quality.label}</span>
                          {quality.pro && !user.isPro && (
                            <Crown className="h-4 w-4 text-orange-500" />
                          )}
                        </div>
                        <div className="text-sm text-gray-500">
                          {quality.size}
                        </div>
                      </div>
                      {isLocked ? (
                        <Lock className="h-5 w-5 text-gray-400" />
                      ) : isSelected ? (
                        <CheckCircle className="h-5 w-5 text-purple-600" />
                      ) : null}
                    </div>
                    {isLocked && (
                      <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-red-500/10 rounded-xl"></div>
                    )}
                  </button>
                );
              })}
          </div>
        </div>

        {/* Download Button */}
        <div className="pt-4">
          {!canDownload() && !user.isPro && user.downloadsToday >= 3 ? (
            <button
              onClick={onShowPro}
              className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
            >
              <Crown className="h-5 w-5" />
              <span>Upgrade to Pro - Daily Limit Reached</span>
            </button>
          ) : (
            <button
              onClick={handleDownload}
              disabled={!canDownload()}
              className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 disabled:from-gray-400 disabled:to-gray-400 text-white py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              <Download className="h-5 w-5" />
              <span>
                Download {selectedFormat.toUpperCase()} ({selectedQuality})
              </span>
            </button>
          )}
        </div>

        {/* Usage Info */}
        {!user.isPro && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-blue-800">
                  Free Plan: {user.downloadsToday || 0}/3 downloads today
                </div>
                <div className="text-xs text-blue-600">
                  Resets daily • Upgrade for unlimited downloads
                </div>
              </div>
              <button
                onClick={onShowPro}
                className="text-blue-600 hover:text-blue-700 font-medium text-sm"
              >
                Learn More →
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DownloadOptions;

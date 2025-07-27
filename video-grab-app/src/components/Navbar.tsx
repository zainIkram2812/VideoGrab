import React from "react";
import { Download, User, LogOut, Crown, Home, BarChart3 } from "lucide-react";

interface NavbarProps {
  user: any;
  currentView: string;
  onViewChange: (view: string) => void;
  onLogout: () => void;
  onShowPro: () => void;
}

const Navbar: React.FC<NavbarProps> = ({
  user,
  currentView,
  onViewChange,
  onLogout,
  onShowPro,
}) => {
  return (
    <nav className="bg-white shadow-lg border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-2">
              <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-2 rounded-lg">
                <Download className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-800">
                VideoDownloader
              </span>
            </div>

            <div className="hidden md:flex space-x-6">
              <button
                onClick={() => onViewChange("home")}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                  currentView === "home"
                    ? "bg-purple-100 text-purple-700"
                    : "text-gray-600 hover:text-purple-600"
                }`}
              >
                <Home className="h-4 w-4" />
                <span>Home</span>
              </button>
              <button
                onClick={() => onViewChange("dashboard")}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                  currentView === "dashboard"
                    ? "bg-purple-100 text-purple-700"
                    : "text-gray-600 hover:text-purple-600"
                }`}
              >
                <BarChart3 className="h-4 w-4" />
                <span>Dashboard</span>
              </button>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {!user.isPro && (
              <button
                onClick={onShowPro}
                className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-4 py-2 rounded-full font-medium transition-all duration-300 transform hover:scale-105 flex items-center space-x-2"
              >
                <Crown className="h-4 w-4" />
                <span>Upgrade to Pro</span>
              </button>
            )}

            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <div className="bg-purple-100 p-2 rounded-full">
                  <User className="h-4 w-4 text-purple-600" />
                </div>
                <div className="hidden md:block">
                  <div className="text-sm font-medium text-gray-800">
                    {user.name}
                  </div>
                  <div className="text-xs text-gray-500">
                    {user.isPro
                      ? "Pro Member"
                      : `${user.downloadsToday || 0}/3 downloads`}
                  </div>
                </div>
              </div>

              <button
                onClick={onLogout}
                className="text-gray-600 hover:text-red-600 p-2 rounded-lg transition-colors"
                title="Logout"
              >
                <LogOut className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

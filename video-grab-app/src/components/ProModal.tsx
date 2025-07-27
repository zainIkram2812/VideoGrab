import React from "react";
import { X, Crown, Check, Zap, Shield, Download } from "lucide-react";

interface ProModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ProModal: React.FC<ProModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const features = [
    {
      icon: Download,
      title: "Unlimited Downloads",
      description: "No daily limits, download as many videos as you want",
    },
    {
      icon: Crown,
      title: "HD Quality",
      description: "Access 720p and 1080p downloads with crystal clear quality",
    },
    {
      icon: Shield,
      title: "No Watermarks",
      description: "Clean downloads without any watermarks or logos",
    },
    {
      icon: Zap,
      title: "Batch Downloads",
      description: "Download multiple videos at once with our batch feature",
    },
  ];

  const plans = [
    {
      name: "3-Day Trial",
      price: "$3",
      period: "one-time",
      description: "Perfect for trying out Pro features",
      popular: false,
      features: ["All Pro features", "3 days access", "No commitment"],
    },
    {
      name: "Monthly Pro",
      price: "$5",
      period: "per month",
      description: "Full access to all premium features",
      popular: true,
      features: [
        "All Pro features",
        "Unlimited downloads",
        "Priority support",
        "Cancel anytime",
      ],
    },
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-orange-500 to-red-500 p-2 rounded-lg">
              <Crown className="h-6 w-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Upgrade to Pro</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6">
          {/* Hero Section */}
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-gray-800 mb-4">
              Unlock Premium Features
            </h3>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Get unlimited downloads, HD quality, and exclusive features with
              our Pro plan
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex items-start space-x-4 p-4 bg-gray-50 rounded-xl"
              >
                <div className="bg-gradient-to-r from-purple-500 to-blue-500 p-2 rounded-lg flex-shrink-0">
                  <feature.icon className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-1">
                    {feature.title}
                  </h4>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Pricing Plans */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {plans.map((plan, index) => (
              <div
                key={index}
                className={`relative border-2 rounded-2xl p-6 ${
                  plan.popular
                    ? "border-purple-500 bg-purple-50"
                    : "border-gray-200 bg-white"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="text-center mb-6">
                  <h4 className="text-xl font-bold text-gray-800 mb-2">
                    {plan.name}
                  </h4>
                  <div className="mb-2">
                    <span className="text-3xl font-bold text-gray-800">
                      {plan.price}
                    </span>
                    <span className="text-gray-600 ml-1">/{plan.period}</span>
                  </div>
                  <p className="text-gray-600 text-sm">{plan.description}</p>
                </div>

                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, featureIndex) => (
                    <li
                      key={featureIndex}
                      className="flex items-center space-x-3"
                    >
                      <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => alert("Payment integration coming soon!")}
                  className={`w-full py-3 px-6 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${
                    plan.popular
                      ? "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
                      : "bg-gray-800 hover:bg-gray-900 text-white"
                  }`}
                >
                  Choose {plan.name}
                </button>
              </div>
            ))}
          </div>

          {/* Comparison */}
          <div className="bg-gray-50 rounded-2xl p-6">
            <h4 className="text-lg font-semibold text-gray-800 mb-4">
              Free vs Pro Comparison
            </h4>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-2 text-gray-600">Feature</th>
                    <th className="text-center py-2 text-gray-600">Free</th>
                    <th className="text-center py-2 text-purple-600">Pro</th>
                  </tr>
                </thead>
                <tbody className="space-y-2">
                  <tr className="border-b border-gray-100">
                    <td className="py-2 text-gray-800">Daily Downloads</td>
                    <td className="text-center py-2">3</td>
                    <td className="text-center py-2 text-purple-600 font-semibold">
                      Unlimited
                    </td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-2 text-gray-800">Max Quality</td>
                    <td className="text-center py-2">480p</td>
                    <td className="text-center py-2 text-purple-600 font-semibold">
                      1080p HD
                    </td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-2 text-gray-800">Watermarks</td>
                    <td className="text-center py-2">❌</td>
                    <td className="text-center py-2">✅ Removed</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-2 text-gray-800">Batch Downloads</td>
                    <td className="text-center py-2">❌</td>
                    <td className="text-center py-2">✅</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Legal Notice */}
          <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-yellow-800">
              <strong>Legal Notice:</strong> This service is for personal and
              fair use only. We do not host or store any content. Please respect
              copyright laws and terms of service of the original platforms.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProModal;

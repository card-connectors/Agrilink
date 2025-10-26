import React from "react";
import { useNavigate } from "react-router-dom";

const ActivityBannerSection = () => {
  const navigate = useNavigate();

const actions = [
  {
    icon: "🏞️",
    title: "Manage Your Land Details",
    description:
      "Own land? Manage your land listings and connect with verified farmers who are ready to cultivate.",
    button: "Manage Land",
    color: "from-green-50 to-green-100",
    link: "/manage-land",
  },
  {
    icon: "🌾",
    title: "Manage Farming Details",
    description:
      "Are you a farmer? Manage your farming information and get connected with landowners or buyers.",
    button: "Manage Farming Info",
    color: "from-yellow-50 to-yellow-100",
    link: "/manage-farming",
  },
  {
    icon: "🚚",
    title: "Manage Your Products",
    description:
      "Supply organic vegetables, honey, mushrooms, or fruits directly to customers and markets.",
    button: "Manage Products",
    color: "from-blue-50 to-blue-100",
    link: "/manage-products",
  },
];

  return (
    <div className="w-full pt-10 px-6 bg-gray-50">
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 bg-linear-to-r from-green-500 to-emerald-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-3 shadow-sm">
          <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
          Exclusive Opportunity
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-3">
          Activities You Can Do
        </h2>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Unlock new possibilities in agriculture with our exclusive features
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {actions.map((item, index) => (
          <div
            key={index}
            className={`bg-linear-to-r ${item.color} rounded-2xl shadow-md p-6 flex flex-col justify-between hover:shadow-lg transition-all duration-300`}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-white rounded-full p-4 shadow text-3xl">
                {item.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-800">
                {item.title}
              </h3>
            </div>

            <p className="text-gray-600 text-sm grow">{item.description}</p>

            <button
              onClick={() => navigate(item.link)}
              className="mt-6 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg font-medium transition-colors duration-200"
            >
              {item.button}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityBannerSection;

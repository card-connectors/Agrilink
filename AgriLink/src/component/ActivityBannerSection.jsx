import React from "react";
import { useNavigate } from "react-router-dom";

const ActivityBannerSection = () => {
  const navigate = useNavigate();

  const actions = [
    {
      icon: "🏞️",
      title: "Add Your Land Details",
      description:
        "Own land? List your land and connect with verified farmers who are ready to cultivate.",
      button: "Add Land",
      color: "from-green-50 to-green-100",
      link: "/add-land",
    },
    {
      icon: "🌾",
      title: "Add Farming Details",
      description:
        "Are you a farmer? Add your farming details and get connected with landowners or buyers.",
      button: "Add Farming Info",
      color: "from-yellow-50 to-yellow-100",
      link: "/add-farming",
    },
    {
      icon: "🚚",
      title: "Start Selling Products",
      description:
        "Supply organic vegetables, honey, mushrooms, or fruits directly to customers and markets.",
      button: "Add Products",
      color: "from-blue-50 to-blue-100",
      link: "/add-product",
    },
  ];

  return (
    <div className="w-full pt-10 px-6 bg-gray-50">
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-3 shadow-sm">
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
            className={`bg-gradient-to-r ${item.color} rounded-2xl shadow-md p-6 flex flex-col justify-between hover:shadow-lg transition-all duration-300`}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-white rounded-full p-4 shadow text-3xl">
                {item.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-800">
                {item.title}
              </h3>
            </div>

            <p className="text-gray-600 text-sm flex-grow">{item.description}</p>

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

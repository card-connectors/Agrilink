import React from "react";
import { useNavigate } from "react-router-dom";
import ActivityBannerSection from "../component/ActivityBannerSection"

const Dashboard = () => {
  const navigate = useNavigate();

  const icons = {
    sent: (
      <div className="p-3 rounded-2xl bg-linear-to-br from-green-500/10 to-green-300/10">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-9 h-9 text-green-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 8l16-5-7 18-2-7-7-2z"
          />
        </svg>
      </div>
    ),
    received: (
      <div className="p-3 rounded-2xl bg-linear-to-br from-blue-500/10 to-blue-300/10">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-9 h-9 text-blue-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 11H5m14 0l-7 7m7-7l-7-7"
          />
        </svg>
      </div>
    ),
    yourOrders: (
      <div className="p-3 rounded-2xl bg-linear-to-br from-orange-500/10 to-orange-300/10">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-9 h-9 text-orange-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h18l-1 13H4L3 3z" />
          <circle cx="8" cy="16" r="2" />
          <circle cx="16" cy="16" r="2" />
        </svg>
      </div>
    ),
    ordersReceived: (
      <div className="p-3 rounded-2xl bg-linear-to-br from-green-400/10 to-green-200/20 shadow-inner">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-9 h-9 text-green-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 12v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M7 10V6a1 1 0 011-1h8a1 1 0 011 1v4" />
        </svg>
      </div>



    ),
  };

  const cards = [
    {
      title: "Sent Requests",
      description: "View and track the requests you've sent",
      count: 12,
      icon: icons.sent,
      path: "/sent-requests",
      badgeColor: "bg-green-500",
    },
    {
      title: "Received Requests",
      description: "Check and accept incoming requests",
      count: 8,
      pending: 3,
      icon: icons.received,
      path: "/received-requests",
      badgeColor: "bg-blue-500",
    },
    {
      title: "Your Orders",
      description: "Track your purchased products and delivery status",
      count: 15,
      icon: icons.yourOrders,
      path: "/your-orders",
      badgeColor: "bg-orange-500",
    },
    {
      title: "Orders Received",
      description: "View and manage product orders from customers",
      count: 24,
      pending: 5,
      icon: icons.ordersReceived,
      path: "/orders-received",
      badgeColor: "bg-purple-500",
    },
  ];

  return (
    <div className="min-h-screen p-10">
      <header className="text-center mb-10">
        <h1 className="text-5xl font-bold text-gray-800 mb-3">Welcome Back</h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Manage everything from your agricultural dashboard in one view.
        </p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
        {cards.map((card, i) => (
          <div
            key={i}
            onClick={() => navigate(card.path)}
            className="relative flex flex-col p-6 rounded-3xl bg-white/70 border border-gray-200 backdrop-blur-md shadow-md hover:shadow-2xl hover:scale-[1.03] transition-all duration-400 cursor-pointer overflow-hidden"
          >
            <div className="absolute inset-0 bg-linear-to-br from-white/0 via-white/30 to-transparent group-hover:from-green-100/20 opacity-0 hover:opacity-100 transition-opacity duration-500 rounded-3xl" />

            <div className="flex justify-between items-center mb-5">
              {card.icon}
              <div className="flex items-center space-x-2">
                {card.pending && (
                  <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs rounded-full font-medium">
                    {card.pending} pending
                  </span>
                )}
                <span
                  className={`px-3 py-1 text-white text-sm font-semibold shadow-sm rounded-full ${card.badgeColor}`}
                >
                  {card.count}
                </span>
              </div>
            </div>

            <h2 className="text-xl font-semibold text-gray-800 mb-2">{card.title}</h2>
            <p className="text-gray-600 text-sm mb-6 flex-1 leading-relaxed">{card.description}</p>

            <div className="flex items-center justify-between mt-auto border-t border-gray-100 pt-4">
              <span className="text-green-600 font-medium text-sm">View details</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 text-gray-400 group-hover:text-green-600 transition-colors duration-300 transform group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </div>
          </div>
        ))}
      </div>

        <ActivityBannerSection/>
    </div>
  );
};

export default Dashboard;

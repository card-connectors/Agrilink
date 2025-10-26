// components/LandCard.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const LandCard = ({ land }) => {
  // Destructure the land props for easier use
  const { 
    title, 
    location, 
    size, 
    condition, 
    description 
  } = land;

  // Function to determine condition color and icon
  const getConditionInfo = (condition) => {
    if (condition === 'Good') {
      return {
        color: 'bg-emerald-50 border-emerald-200',
        textColor: 'text-emerald-700',
        icon: '✅',
        badge: 'bg-emerald-100 text-emerald-800'
      };
    }
    if (condition === 'Damaged') {
      return {
        color: 'bg-yellow-50 border-yellow-200',
        textColor: 'text-yellow-700',
        icon: '⚠️',
        badge: 'bg-yellow-100 text-yellow-800'
      };
    }
    return {
      color: 'bg-gray-50 border-gray-200',
      textColor: 'text-gray-700',
      icon: '❓',
      badge: 'bg-gray-100 text-gray-800'
    };
  };

  const conditionInfo = getConditionInfo(condition);

  // Function to handle button click
  const navigate = useNavigate();
  const handleButtonClick = () => {
    navigate("/landdetails",{state: land})
  };

  return (
    <div className={`rounded-2xl border-2 ${conditionInfo.color} p-6 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1`}>
      
      {/* Header with Title and Condition Badge */}
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-2xl font-bold text-gray-900 pr-2">{title}</h3>
        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${conditionInfo.badge}`}>
          {conditionInfo.icon} {condition}
        </span>
      </div>

      {/* Location with Pin Icon */}
      <div className="flex items-center mb-4">
        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
          <span className="text-blue-600 text-lg">📍</span>
        </div>
        <div>
          <p className="text-gray-600 text-sm">Location</p>
          <p className="font-semibold text-gray-800">{location}</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        {/* Land Size */}
        <div className="bg-white rounded-xl p-3 shadow-sm">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mr-2">
              <span className="text-purple-600">📏</span>
            </div>
            <div>
              <p className="text-gray-500 text-xs">Size</p>
              <p className="font-bold text-gray-800">{size} acres</p>
            </div>
          </div>
        </div>

        {/* Status */}
        <div className="bg-white rounded-xl p-3 shadow-sm">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center mr-2">
              <span className="text-amber-600">🌱</span>
            </div>
            <div>
              <p className="text-gray-500 text-xs">Status</p>
              <p className="font-bold text-gray-800">Available</p>
            </div>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="mb-6">
        <p className="text-gray-600 leading-relaxed border-l-4 border-gray-200 pl-3">
          {description}
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-3">
        <button
          onClick={handleButtonClick}
          className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 px-4 rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300 font-semibold shadow-md hover:shadow-lg"
        >
          Explore Land
        </button>
        <button className="w-12 h-12 border-2 border-gray-300 rounded-xl flex items-center justify-center hover:border-blue-500 hover:bg-blue-50 transition-colors duration-300">
          <span className="text-gray-600 hover:text-blue-600">❤️</span>
        </button>
      </div>
    </div>
  );
};

export default LandCard;
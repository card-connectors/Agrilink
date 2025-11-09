import React, { useCallback, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { EntityContext } from '../ContextFiles/AllContext';

const LandCard = ({ land }) => {

const {landId,setLandId} = useContext(EntityContext); // stores the landId


  const {
    id,
    title,
    location,
    size,
    condition,
    soilType,
    suitableFor,
    waterResources,
    description,
  } = land;

  const getConditionInfo = (condition) => {
    if (condition === 'Good') {
      return {
        color: 'bg-emerald-50 border-emerald-200',
        textColor: 'text-emerald-700',
        badge: 'bg-emerald-100 text-emerald-800',
        icon: '✅'
      };
    }
    if (condition === 'Damaged') {
      return {
        color: 'bg-yellow-50 border-yellow-200',
        textColor: 'text-yellow-700',
        badge: 'bg-yellow-100 text-yellow-800',
        icon: '⚠️'
      };
    }
    return {
      color: 'bg-gray-50 border-gray-200',
      textColor: 'text-gray-700',
      badge: 'bg-gray-100 text-gray-800',
      icon: '🟦'
    };
  };

  const conditionInfo = getConditionInfo(condition);
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("/landdetails");
    setLandId(land.id);
  };

  return (
    <div className={`rounded-2xl border-2 ${conditionInfo.color} p-6 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1`}>
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-2xl font-bold text-gray-900 pr-2">{title}</h3>
        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${conditionInfo.badge}`}>
          {conditionInfo.icon} {condition}
        </span>
      </div>

      <div className="flex items-center mb-4">
        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-700 inline-block">
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M9 11a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" />
            <path d="M17.657 16.657l-4.243 4.243a2 2 0 0 1 -2.827 0l-4.244 -4.243a8 8 0 1 1 11.314 0z" />
          </svg>
        </div>
        <div>
          <p className="text-gray-600 text-sm">Location</p>
          <p className="font-semibold text-gray-800">{location}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-white rounded-xl p-3 shadow-sm">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mr-2">
              <span className="text-purple-600">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" stroke='currentcolor' viewBox="0 0 24 24" fill="currentcolor" className="text-purple-500 inline-block">
                  <path d="M3 3v18h18V3H3zm8 2h7v7h-7V5zm-2 0v7H5V5h4zm0 9v5H5v-5h4zm2 0h7v5h-7v-5z" />
                </svg>
              </span>
            </div>
            <div>
              <p className="text-gray-500 text-xs">Size</p>
              <p className="font-bold text-gray-800">{size} acres</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-3 shadow-sm">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center mr-2">
              <span className="text-amber-600">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke='currentcolor' strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" className="text-amber-400 inline-block">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M9 12l2 2l4-4" />
                </svg>
              </span>
            </div>
            <div>
              <p className="text-gray-500 text-xs">Status</p>
              <p className="font-bold text-gray-800">Available</p>
              <p>{id}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-3 flex flex-col gap-2">
        {soilType && <span className="text-sm text-green-700 font-medium">Soil: {soilType}</span>}
        {suitableFor && <span className="text-sm text-blue-700 font-medium">Best For: {suitableFor}</span>}
        {waterResources && Array.isArray(waterResources) && (
          <span className="text-sm text-purple-600 font-medium">
            Water: {waterResources.join(', ')}
          </span>
        )}
      </div>

      <div className="mb-6">
        <p className="text-gray-600 leading-relaxed border-l-4 border-gray-200 pl-3">
          {description}
        </p>
      </div>

      <div className="flex space-x-3">
        <button
          onClick={handleButtonClick}
          className="flex-1 bg-linear-to-r from-blue-500 to-blue-600 text-white py-3 px-4 rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300 font-semibold shadow-md hover:shadow-lg"
        >
          Explore Land
        </button>
      </div>
    </div>
  );
};

export default LandCard;

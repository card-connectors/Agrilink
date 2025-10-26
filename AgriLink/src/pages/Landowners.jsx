// pages/Lands.jsx
import React from 'react';
import LandCard from '../component/LandCard';

const Lands = () => {
  // Sample land data
  const lands = [
    {
      id: 1,
      title: "Green Valley Farm",
      location: "Salem",
      size: "50",
      condition: "Good",
      description: "Fertile land with modern irrigation system. Perfect for organic crop cultivation with excellent sun exposure."
    },
    {
      id: 2,
      title: "Sunset Fields",
      location: "Erode",
      size: "120", 
      condition: "Good",
      description: "Expansive agricultural land with natural water sources. Ideal for large-scale farming operations."
    },
    {
      id: 3,
      title: "Old Mill Property",
      location: "Nagapattinam",
      size: "25",
      condition: "Damaged",
      description: "Historic farmland needing restoration. Great potential for sustainable farming with proper care."
    },
    {
      id: 4,
      title: "Riverbend Acres",
      location: "Pollachi",
      size: "75",
      condition: "Good",
      description: "Picturesque riverside land perfect for irrigation-based crops and eco-friendly farming practices."
    },
    {
      id: 5,
      title: "Mountain View Plot",
      location: "Ranipet",
      size: "35",
      condition: "Damaged",
      description: "High-altitude land with rocky soil. Requires terracing but offers unique growing opportunities."
    },
    {
      id: 6,
      title: "Golden Harvest Land",
      location: "Ranipet",
      size: "200",
      condition: "Good",
      description: "Premium agricultural land with established infrastructure and excellent transportation access."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Available Farmlands</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover perfect lands for your agricultural projects. Connect with landowners directly.
          </p>
        </div>
        
        {/* Grid layout for multiple cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {lands.map((land) => (
            <LandCard key={land.id} land={land} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Lands;
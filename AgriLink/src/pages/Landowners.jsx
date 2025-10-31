import React, { useEffect, useState } from 'react';
import LandCard from '../component/LandCard';

const Lands = () => {
  const [lands, setLands] = useState([]);
  

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/auth/lands/')
      .then(res => res.json())
      .then(data => setLands(data));
  }, []);

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-blue-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Available Farmlands</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover perfect lands for your agricultural projects. Connect with landowners directly.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {lands.length > 0 ? (
            lands.map(land => (
              <LandCard
                key={land.id}
                land={{
                  ...land,
                  size: land.area, // Map 'area' from backend to 'size'
                  condition: land.condition || 'Good', // default as needed
                }}
              />
            ))
          ) : (
            <div className="text-center text-gray-500 col-span-full">
              No lands available currently.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Lands;

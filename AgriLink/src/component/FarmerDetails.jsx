import React, { useContext, useState } from 'react';
import FarmerImage from '../assets/images/Farmer.jpg';
import ThankYouModal from './ThankYouModal';
import { EntityContext } from '../ContextFiles/AllContext';

const FarmerDetails = () => {
  const [modalOpen, setModalOpen] = useState(false);
    const { userId } = useContext(AuthContext); // stores the userID
  const {farmerId} = useContext(EntityContext); // stores the farmerID

  const farmer = {
    name: "Nandha Kumar",
    location: "Coimbatore, Tamil Nadu",
    experience: "15 years",
    typeOfFarming: "Mixed Farming",
    about:
      "Nandha Kumar is a dedicated farmer from Coimbatore with over 15 years of hands-on experience in sustainable agriculture. He focuses on growing organic crops using eco-friendly methods and believes in maintaining soil fertility through crop rotation and natural composting. His approach combines both traditional wisdom and modern techniques to achieve better yield and quality produce.",
    image: FarmerImage
  };

  const handleRequest = () => {
    setModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
            {/* Left Side - Farmer Photo */}
            <div className="space-y-4">
              <div className="bg-gray-100 rounded-2xl overflow-hidden">
                <img
                  src={farmer.image}
                  alt={farmer.name}
                  className="w-full h-96 object-cover rounded-2xl"
                />
              </div>

              {/* Verified Badge */}
              <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                <div className="flex items-center">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-green-800">Verified Farmer</h3>
                    <p className="text-sm text-green-600">Identity and credentials verified</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Farmer Details */}
            <div className="space-y-6">
              {/* Name and Location */}
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{farmer.name}</h1>
                <p className="text-green-600 font-medium mt-1">{farmer.location}</p>
              </div>

              {/* Key Details */}
              <div className="grid grid-cols-2 gap-4 py-4 border-t border-b border-gray-200">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Experience</h3>
                  <p className="text-lg font-semibold text-gray-900">{farmer.experience} experience</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Type of Farming</h3>
                  <p className="text-lg font-semibold text-green-600">{farmer.typeOfFarming}</p>
                </div>
              </div>

              {/* About Farmer */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">About the Farmer</h3>
                <p className="text-gray-700 leading-relaxed">
                  {farmer.about}
                </p>
              </div>

              {/* Action Button */}
              <div className="flex space-x-4 pt-6">
                <button
                  onClick={handleRequest}
                  className="flex-1 bg-green-600 text-white py-3 px-6 rounded-xl font-semibold hover:bg-green-700 transition duration-200 flex items-center justify-center">
                  Send Request
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Thank You Modal */}
      <ThankYouModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
};

export default FarmerDetails;
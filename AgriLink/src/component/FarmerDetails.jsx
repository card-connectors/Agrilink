import React, { useState } from 'react';
// Import the local farmer image
import FarmerImage from '../assets/images/Farmer.jpg';
import ThankYouModal from './ThankYouModal';

const FarmerDetails = () => {
  const [modalOpen, setModalOpen] = useState(false);
  // Sample farmer data with local farmer photo
  const farmer = {
    name: "Rajesh Kumar",
    experience: "15 years",
    skillset: ["Organic Farming", "Drip Irrigation", "Crop Rotation", "Soil Management"],
    landType: "Black Cotton Soil",
    landSize: "25 acres",
    location: "Coimbatore, Tamil Nadu",
    rating: 4.8,
    reviews: 127,
    about: [
      "Specializes in organic vegetable cultivation",
      "Expert in water conservation techniques",
      "Uses traditional and modern farming methods",
      "Provides training to local farmers",
      "Focuses on sustainable agriculture practices"
    ],
    languages: ["Tamil", "English", "Hindi"],
    certifications: ["Organic Certification", "Soil Health Card", "FPO Member"],
    image: FarmerImage // Using the imported local image
  };

    const handleRequest = () => {
    setModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex mb-8" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-4">
            <li>
              <div className="flex items-center">
                <a href="#" className="text-gray-400 hover:text-gray-500">
                  Farmers
                </a>
              </div>
            </li>
            <li>
              <div className="flex items-center">
                <svg
                  className="flex-shrink-0 h-5 w-5 text-gray-300"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                >
                  <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
                </svg>
                <a href="#" className="ml-4 text-gray-400 hover:text-gray-500">
                  Tamil Nadu
                </a>
              </div>
            </li>
            <li>
              <div className="flex items-center">
                <svg
                  className="flex-shrink-0 h-5 w-5 text-gray-300"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                >
                  <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
                </svg>
                <span className="ml-4 text-green-600 font-medium">{farmer.name}</span>
              </div>
            </li>
          </ol>
        </nav>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
            {/* Left Side - Single Farmer Photo */}
            <div className="space-y-4">
              {/* Main Farmer Photo */}
              <div className="bg-gray-100 rounded-2xl overflow-hidden">
                <img
                  src={farmer.image}
                  alt={farmer.name}
                  className="w-full h-96 object-cover rounded-2xl"
                />
              </div>

              {/* Farmer Badge */}
              <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-green-800">Verified Farmer</h3>
                    <p className="text-sm text-green-600">Identity and credentials verified</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Farmer Details */}
            <div className="space-y-6">
              {/* Name and Rating */}
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{farmer.name}</h1>
                <div className="flex items-center mt-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.floor(farmer.rating)
                            ? 'text-yellow-400'
                            : 'text-gray-300'
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                    <span className="ml-2 text-gray-600">
                      {farmer.rating} ({farmer.reviews} reviews)
                    </span>
                  </div>
                  <span className="mx-2 text-gray-300">•</span>
                  <span className="text-green-600 font-medium">{farmer.experience} Experience</span>
                </div>
              </div>

              {/* Key Details */}
              <div className="grid grid-cols-2 gap-4 py-4 border-t border-b border-gray-200">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Experience</h3>
                  <p className="text-lg font-semibold text-gray-900">{farmer.experience}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Land Size</h3>
                  <p className="text-lg font-semibold text-gray-900">{farmer.landSize}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Location</h3>
                  <p className="text-lg font-semibold text-gray-900">{farmer.location}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Land Type</h3>
                  <p className="text-lg font-semibold text-green-600">{farmer.landType}</p>
                </div>
              </div>

              {/* Skillset */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Skills & Expertise</h3>
                <div className="flex flex-wrap gap-2">
                  {farmer.skillset.map((skill, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* About Farmer */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">About the Farmer</h3>
                <ul className="space-y-2">
                  {farmer.about.map((point, index) => (
                    <li key={index} className="flex items-start">
                      <svg
                        className="flex-shrink-0 w-5 h-5 text-green-500 mt-0.5 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="text-gray-700">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Additional Information */}
              <div className="grid grid-cols-2 gap-6 pt-4">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Languages Spoken</h4>
                  <div className="flex flex-wrap gap-2">
                    {farmer.languages.map((language, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-gray-100 text-gray-700 rounded-md text-sm"
                      >
                        {language}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Certifications</h4>
                  <div className="flex flex-wrap gap-2">
                    {farmer.certifications.map((cert, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-blue-100 text-blue-700 rounded-md text-sm"
                      >
                        {cert}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
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
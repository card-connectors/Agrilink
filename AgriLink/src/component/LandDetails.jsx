import React, { useState } from 'react';
import ThankYouModal from './ThankYouModal';


const LandDetails = () => {
    const [modalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);

  // Sample land data
  const land = {
    title: "25 Acres Agricultural Land with Water Source",
    location: "Coimbatore, Tamil Nadu",
    price: "₹75,00,000",
    pricePerAcre: "₹3,00,000/acre",
    totalArea: "25 acres",
    landType: "Black Cotton Soil",
    soilQuality: "Excellent",
    waterSource: ["Borewell", "Open Well", "Canal"],
    irrigation: "Drip Irrigation System",
    ownership: "Freehold",
    fencing: "Fully Fenced",
    approachRoad: "Tar Road - 30 feet",
    electricity: "3 Phase Connection",
    rating: 4.7,
    reviews: 89,
    description: "Premium agricultural land with excellent soil quality and multiple water sources. Ideal for organic farming, horticulture, and commercial agriculture. Well-maintained with proper irrigation facilities.",
    features: [
      "Ready for cultivation",
      "Multiple water sources",
      "Modern irrigation system",
      "Good road access",
      "Power connection available",
      "Soil tested and certified",
      "No legal disputes",
      "Clear title deed"
    ],
    cropsSuitable: ["Cotton", "Sugarcane", "Turmeric", "Vegetables", "Fruits"],
    images: [
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1574943320219-553eb213f72d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1560493676-04071c5f467b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    ],
    owner: {
      name: "Rajesh Kumar",
      verified: true,
      contact: "+91 9876543210",
      memberSince: "2018"
    },
    documents: ["Title Deed", "Soil Test Report", "Land Map", "Tax Receipts"]
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
                  Lands
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
                <a href="#" className="ml-4 text-gray-400 hover:text-gray-500">
                  Coimbatore
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
                <span className="ml-4 text-green-600 font-medium">Land Details</span>
              </div>
            </li>
          </ol>
        </nav>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
            {/* Left Side - Land Images */}
            <div className="space-y-4">
              {/* Main Image */}
              <div className="aspect-w-4 aspect-h-3 bg-gray-200 rounded-2xl overflow-hidden">
                <img
                  src={land.images[selectedImage]}
                  alt={land.title}
                  className="w-full h-96 object-cover rounded-2xl"
                />
              </div>
              
              {/* Thumbnail Images */}
              <div className="grid grid-cols-4 gap-4">
                {land.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-w-1 aspect-h-1 bg-gray-200 rounded-xl overflow-hidden border-2 transition-all duration-200 ${
                      selectedImage === index 
                        ? 'border-green-500 ring-2 ring-green-200' 
                        : 'border-transparent hover:border-gray-300'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`Land view ${index + 1}`}
                      className="w-full h-20 object-cover rounded-xl hover:scale-105 transition-transform duration-200"
                    />
                  </button>
                ))}
              </div>

              {/* Land Verification Badge */}
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mt-4">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-blue-800">Verified Land</h3>
                    <p className="text-sm text-blue-600">All documents verified and clear title</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Land Details */}
            <div className="space-y-6">
              {/* Title and Rating */}
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{land.title}</h1>
                <div className="flex items-center mt-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.floor(land.rating)
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
                      {land.rating} ({land.reviews} reviews)
                    </span>
                  </div>
                  <span className="mx-2 text-gray-300">•</span>
                  <span className="text-green-600 font-medium">{land.location}</span>
                </div>
              </div>

              {/* Price Section */}
              <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                <div className="flex items-baseline justify-between">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">{land.price}</h3>
                    <p className="text-green-600 font-medium">{land.pricePerAcre}</p>
                  </div>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                    Good Deal
                  </span>
                </div>
              </div>

              {/* Key Specifications */}
              <div className="grid grid-cols-2 gap-4 py-4 border-t border-b border-gray-200">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Total Area</h3>
                  <p className="text-lg font-semibold text-gray-900">{land.totalArea}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Land Type</h3>
                  <p className="text-lg font-semibold text-green-600">{land.landType}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Soil Quality</h3>
                  <p className="text-lg font-semibold text-gray-900">{land.soilQuality}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Ownership</h3>
                  <p className="text-lg font-semibold text-gray-900">{land.ownership}</p>
                </div>
              </div>

              {/* Water Sources */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Water Sources</h3>
                <div className="flex flex-wrap gap-2">
                  {land.waterSource.map((source, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
                    >
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {source}
                    </span>
                  ))}
                </div>
              </div>

              {/* Infrastructure */}
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Infrastructure</h4>
                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-gray-600">
                      <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      Irrigation: {land.irrigation}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      Fencing: {land.fencing}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      Road: {land.approachRoad}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      Electricity: {land.electricity}
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Suitable Crops</h4>
                  <div className="flex flex-wrap gap-2">
                    {land.cropsSuitable.map((crop, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-orange-100 text-orange-700 rounded-md text-sm"
                      >
                        {crop}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Land Description */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Description</h3>
                <p className="text-gray-700 leading-relaxed">{land.description}</p>
              </div>

              {/* Key Features */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Key Features</h3>
                <div className="grid grid-cols-2 gap-2">
                  {land.features.map((feature, index) => (
                    <div key={index} className="flex items-center">
                      <svg className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-sm text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Owner Information */}
              <div className="bg-gray-50 rounded-xl p-4">
                <h4 className="font-medium text-gray-900 mb-2">Owner Information</h4>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-900 font-medium">{land.owner.name}</p>
                    <p className="text-sm text-gray-600">Member since {land.owner.memberSince}</p>
                  </div>
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Verified Owner
                  </span>
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
      <ThankYouModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
};

export default LandDetails;
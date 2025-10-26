// pages/Landowner.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Farmers = () => {
  // State for search/filter (non-functional for now)
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('All');

  // Sample farmer data
  const farmers = [
    {
      id: 1,
      name: "Sarah",
      farmingType: "Beekeeping",
      location: "Kanyakumari",
      landRequirement: "2-5 acres",
      description: "Experienced beekeeper with 5+ years in organic honey production. Looking for land with good floral resources.",
      contact: "sarah.j@example.com"
    },
    {
      id: 2,
      name: "Manikandan",
      farmingType: "Mushroom Farming",
      location: "Erode",
      landRequirement: "1-3 acres",
      description: "Specializes in gourmet mushrooms. Uses sustainable farming practices and has established market connections.",
      contact: "mani@example.com"
    },
    {
      id: 3,
      name: "Kanishka",
      farmingType: "Mixed Farming",
      location: "Thanjavur",
      landRequirement: "10-15 acres",
      description: "Looking to expand organic vegetable and fruit operations. Experienced in irrigation management.",
      contact: "kani.farm@example.com"
    },
    {
      id: 4,
      name: "Gopinathan",
      farmingType: "Beekeeping",
      location: "Salem",
      landRequirement: "3-7 acres",
      description: "Focuses on native bee conservation and raw honey production. Prefers pesticide-free environments.",
      contact: "gopi@example.com"
    },
    {
      id: 5,
      name: "Priya",
      farmingType: "Mushroom Farming",
      location: "Salem",
      landRequirement: "2-4 acres",
      description: "Expert in medicinal mushrooms and organic cultivation. Looking for shaded, humid land areas.",
      contact: "priya.mushrooms@example.com"
    },
    {
      id: 6,
      name: "Thangavel",
      farmingType: "Mixed Farming",
      location: "Pudukkottai",
      landRequirement: "8-12 acres",
      description: "Seasonal crop rotation specialist. Interested in long-term land partnerships with landowners.",
      contact: "tangavel@example.com"
    },
    {
      id: 7,
      name: "Harini",
      farmingType: "Beekeeping",
      location: "Viluppuram",
      landRequirement: "1-3 acres",
      description: "Urban beekeeper expanding to rural areas. Focuses on pollination services and honey varieties.",
      contact: "harini.g@example.com"
    },
    {
      id: 8,
      name: "Murthy",
      farmingType: "Mushroom Farming",
      location: "Coimbatore",
      landRequirement: "1-2 acres",
      description: "Specialized in exotic mushroom varieties. Uses climate-controlled indoor and outdoor methods.",
      contact: "thomas.kim@example.com"
    }
  ];

  // Filter farmers based on search and type (basic implementation)
  const filteredFarmers = farmers.filter(farmer => {
    const matchesSearch = farmer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         farmer.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'All' || farmer.farmingType === selectedType;
    return matchesSearch && matchesType;
  });

  // Get unique farming types for filter
  const farmingTypes = ['All', ...new Set(farmers.map(farmer => farmer.farmingType))];

  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Find Farmers for Your Land
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Browse and connect with farmers looking for land. Find the perfect match for your available agricultural space.
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Search Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Search Farmers
              </label>
              <input
                type="text"
                placeholder="Search by name or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            {/* Farming Type Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Farming Type
              </label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                {farmingTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Results Count */}
          <div className="mt-4 text-sm text-gray-600">
            Showing {filteredFarmers.length} of {farmers.length} farmers
          </div>
        </div>

        {/* Farmers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFarmers.map((farmer) => (
            <div
              key={farmer.id}
              className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300"
            >
              {/* Card Header */}
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">{farmer.name}</h3>
                    <div className="flex items-center mt-2">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        {farmer.farmingType}
                      </span>
                    </div>
                  </div>
                  <div className="text-2xl">
                    {farmer.farmingType === 'Beekeeping' && '🐝'}
                    {farmer.farmingType === 'Mushroom Farming' && '🍄'}
                    {farmer.farmingType === 'Mixed Farming' && '🌾'}
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 space-y-4">
                {/* Location */}
                <div className="flex items-center text-gray-600">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>{farmer.location}</span>
                </div>

                {/* Land Requirement */}
                <div className="flex items-center text-gray-600">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Land needed: {farmer.landRequirement}</span>
                </div>

                {/* Description */}
                <div>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {farmer.description}
                  </p>
                </div>
              </div>

              {/* Card Footer */}
              <div className="p-6 border-t border-gray-100 bg-gray-50">
                <button
                  onClick={() =>  navigate("/farmersdetails", { state: farmer })}
                  className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors duration-200 font-medium"
                >
                  Farmer Profile
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredFarmers.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No farmers found</h3>
            <p className="text-gray-600">Try adjusting your search criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Farmers;
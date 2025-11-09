import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext, EntityContext } from "../ContextFiles/AllContext";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("All");
  const [priceRange, setPriceRange] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const { userId } = useContext(AuthContext);
  const { productId, setProductId } = useContext(EntityContext);
  const navigate = useNavigate();

  const pageSize = 10; // items per page

  useEffect(() => {
    // Fetch product data with pagination parameters
    fetch('http://127.0.0.1:8000/api/products/?page=1')
      .then((res) => res.json())
      .then((data) => {
        // Assuming backend pagination returns { results: [...], count, next, previous }
        setProducts(data.results || data);
        // Calculate total pages if count and page_size provided
        if (data.count) {
          setTotalPages(Math.ceil(data.count / pageSize));
        }
      })
      .catch((err) => console.error("Failed to fetch products:", err));
  }, [currentPage]);

  // Filter products locally after fetching page data
  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (product.farmer && product.farmer.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesType = selectedType === "All" || product.type === selectedType;

    let matchesPrice = true;
    const priceNum = parseFloat(product.price?.toString().replace("₹", ""));
    if (priceRange === "Under ₹15") {
      matchesPrice = priceNum < 15;
    } else if (priceRange === "₹15 - ₹30") {
      matchesPrice = priceNum >= 15 && priceNum <= 30;
    } else if (priceRange === "Over ₹30") {
      matchesPrice = priceNum > 30;
    }

    return matchesSearch && matchesType && matchesPrice;
  });

  const productTypes = ["All", ...new Set(products.map((p) => p.type))];
  const priceRanges = ["All", "Under ₹15", "₹15 - ₹30", "Over ₹30"];

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Explore Available Products</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Browse and connect with farmers selling their products. Fresh, organic, and locally sourced goods.
          </p>
        </div>

        {/* Search + Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Search Products</label>
              <input
                type="text"
                placeholder="Search by product or farmer..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              />
            </div>

            {/* Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Product Type</label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              >
                {productTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            {/* Price */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
              <select
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              >
                {priceRanges.map((range) => (
                  <option key={range} value={range}>
                    {range}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-4 text-sm text-gray-600">
            Showing {filteredProducts.length} of {products.length} products on page {currentPage} of {totalPages}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300"
            >
              {/* Image */}
              <div className="h-40 overflow-hidden bg-gray-100">
                <img
                  src={product.image || '/default-product.jpg'}
                  alt={product.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Card Content */}
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="text-lg font-bold text-gray-800">{product.name}</h3>
                    <div className="flex items-center mt-1">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                        {product.type}
                      </span>
                      {!product.inStock && (
                        <span className="ml-2 inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                          Out of Stock
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center text-gray-600 text-sm mb-2">
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span>By {product.farmer}</span>
                </div>

                <div className="flex items-center text-gray-600 text-sm mb-3">
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  </svg>
                  <span>{product.location}</span>
                </div>

                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {product.description}
                </p>

                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-amber-600">{product.price}</span>
                  <button
                    onClick={() => {
                      setProductId(product.id);
                      navigate('/product-details');
                    }}
                    disabled={!product.inStock}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                      product.inStock ? "bg-amber-500 text-white hover:bg-amber-600" : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
                  >
                    {product.inStock ? "Buy Now" : "Out of Stock"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-center mt-8 space-x-3">
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage <= 1}
            className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
          >
            Previous
          </button>
          {[...Array(totalPages)].map((_, idx) => (
            <button
              key={idx + 1}
              onClick={() => goToPage(idx + 1)}
              className={`px-4 py-2 rounded ${
                currentPage === idx + 1 ? "bg-amber-500 text-white" : "bg-gray-100"
              }`}
            >
              {idx + 1}
            </button>
          ))}
          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage >= totalPages}
            className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>

        {/* Empty state */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No products found</h3>
            <p className="text-gray-600">Try adjusting your search criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;

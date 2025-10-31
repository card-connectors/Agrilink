// pages/Products.jsx
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext, EntityContext } from "../ContextFiles/AllContext";

const Products = () => {
  // State for search/filter
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("All");
  const [priceRange, setPriceRange] = useState("All");
    const { userId } = useContext(AuthContext); // stores the userID
const {productId, setProductId} = useContext(EntityContext); // for productID

  const navigate = useNavigate();

  // Sample product data with real image URLs (can use your own from /public/products/)
const products = [
  {
    id: 1,
    name: "Raw Organic Honey",
    type: "Honey",
    farmer: "Sarah",
    price: "₹20",
    description:
      "Pure, raw honey from local wildflowers. Unprocessed and packed with natural enzymes and antioxidants.",
    location: "Kanyakumari",
    inStock: true,
    image:
      "https://images.unsplash.com/photo-1626285094816-39f688104ce0?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    name: "Shiitake Mushroom Spawn",
    type: "Mushroom Spawn",
    farmer: "Manikandan",
    price: "₹30",
    description:
      "High-quality shiitake mushroom spawn for cultivation. Ready for inoculation on hardwood logs.",
    location: "Erode",
    inStock: true,
    image:
      "https://www.thespruceeats.com/thmb/mX653gWXw44WciX33xypyLq86as=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-186473156-565bc8235f9b5835e470217a.jpg",
  },
  {
    id: 3,
    name: "Fresh Oyster Mushrooms",
    type: "Mushrooms",
    farmer: "Priya",
    price: "₹30",
    description:
      "Freshly harvested oyster mushrooms. Perfect for cooking, with a delicate flavor and texture.",
    location: "Salem",
    inStock: true,
    image:
      "https://5.imimg.com/data5/SELLER/Default/2025/3/498372849/CO/HK/VD/160794331/fresh-oyster-mushroom.jpg",
  },
  {
    id: 4,
    name: "Organic Seasonal Vegetables",
    type: "Vegetables",
    farmer: "Kanishka",
    price: "₹15",
    description:
      "Mixed seasonal vegetables including tomatoes, peppers, and zucchini. Grown without pesticides.",
    location: "Thanjavur",
    inStock: true,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRP1rAsYxJpBaTJSQf-XvjpGTpCDlbHKUBaKA&s",
  },
  {
    id: 5,
    name: "Bee Pollen",
    type: "Honey",
    farmer: "Gopinathan",
    price: "₹25",
    description:
      "Pure bee pollen collected from diverse floral sources. Rich in proteins, vitamins, and minerals.",
    location: "Salem",
    inStock: false,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpkbL7jUPOVkxIb0t2StM4CDAUBbbfwSH7DA&s",
  },
  {
    id: 6,
    name: "Lion's Mane Mushroom Kit",
    type: "Mushroom Spawn",
    farmer: "Thangavel",
    price: "₹35",
    description:
      "Complete grow-at-home kit for Lion's Mane mushrooms. Includes substrate and detailed instructions.",
    location: "Pudukkottai",
    inStock: true,
    image:
      "https://dujjhct8zer0r.cloudfront.net/media/prod_image/f4454641e71774971a4801fc91e5ff9d-08-18-25-17-50-48.webp",
  },
  {
    id: 7,
    name: "Fresh Herbs Bundle",
    type: "Vegetables",
    farmer: "Harini",
    price: "₹10",
    description:
      "Assorted fresh herbs including basil, mint, and cilantro. Perfect for cooking and garnishing.",
    location: "Viluppuram",
    inStock: true,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfltOi3f-h4SdOvsuxcpIlS3O71ESp31h1kQ&s",
  },
  {
    id: 8,
    name: "Propolis Tincture",
    type: "Honey",
    farmer: "Sarah",
    price: "₹30",
    description:
      "Natural propolis extract with immune-supporting properties. Alcohol-free and pure.",
    location: "Salem",
    inStock: true,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOMPJNDUSd1p9Zau4eTF-FmDABOAa_W6iYLA&s",
  },
  {
    id: 9,
    name: "Portobello Mushrooms",
    type: "Mushrooms",
    farmer: "Murthy",
    price: "₹30",
    description:
      "Large, meaty portobello mushrooms. Ideal for grilling, stuffing, or as meat substitutes.",
    location: "Coimbatore",
    inStock: true,
    image:
      "https://assets.woolworths.com.au/images/1005/89466.jpg?impolicy=wowbumxfyzp&w=500&h=500",
  },
  {
    id: 10,
    name: "Organic Potatoes",
    type: "Vegetables",
    farmer: "Jayaraman",
    price: "₹20",
    description:
      "Fresh organic potatoes from our farm. Great for baking, mashing, or roasting.",
    location: "Namakkal",
    inStock: true,
    image:
      "https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 11,
    name: "Royal Jelly",
    type: "Honey",
    farmer: "Kannan",
    price: "₹45",
    description:
      "Pure royal jelly harvested from our beehives. Known for its nutritional and wellness benefits.",
    location: "Thanjavur",
    inStock: true,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoriwiGvZJnN5GLFvBdJshW3cvY2KcGXoQzA&s",
  },
  {
    id: 12,
    name: "Maitake Mushroom Spawn",
    type: "Mushroom Spawn",
    farmer: "Priya",
    price: "₹30",
    description:
      "Maitake mushroom spawn for outdoor cultivation. Also known as Hen of the Woods.",
    location: "Salem",
    inStock: false,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS48zHXsQdOb5d1XBgNj-TQEQvvz8qZCmLtXg&s",
  },
];


  // Filter products
  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.farmer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === "All" || product.type === selectedType;

    let matchesPrice = true;
    const priceNum = parseFloat(product.price.replace("₹", ""));
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

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Explore Available Products
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Browse and connect with farmers selling their products. Fresh,
            organic, and locally sourced goods.
          </p>
        </div>

        {/* Search + Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Search Products
              </label>
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
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product Type
              </label>
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
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price Range
              </label>
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
            Showing {filteredProducts.length} of {products.length} products
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300"
            >
              {/* Image */}
              <div className="h-40 overflow-hidden bg-gray-100">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Card Content */}
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="text-lg font-bold text-gray-800">
                      {product.name}
                    </h3>
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
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
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
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                  </svg>
                  <span>{product.location}</span>
                </div>

                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {product.description}
                </p>

                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-amber-600">
                    {product.price}
                  </span>
                  <button
                    onClick={() =>
                      navigate('/product-details')
                    }
                    disabled={!product.inStock}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                      product.inStock
                        ? "bg-amber-500 text-white hover:bg-amber-600"
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
                  >
                    {product.inStock ? "Buy Now" : "Out of Stock"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              No products found
            </h3>
            <p className="text-gray-600">Try adjusting your search criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;

import React from "react";

const YourOrders = () => {

    const { userId } = useContext(AuthContext); // stores the userID

  const orders = [
    {
      id: "ORD-001",
      product: "Organic Rice 50kg",
      from: "Farmer Kavitha",
      quantity: 1,
      price: 2500,
      status: "Pending",
      dateOrdered: "14 Oct 2025",
      dateDelivered: null,
    },
    {
      id: "ORD-002",
      product: "Fresh Tomatoes 10kg",
      from: "Farmer Arjun",
      quantity: 2,
      price: 800,
      status: "Shipped",
      dateOrdered: "12 Oct 2025",
      dateDelivered: null,
    },
    {
      id: "ORD-003",
      product: "Organic Sugar 5kg",
      from: "Farmer Mani",
      quantity: 1,
      price: 400,
      status: "Delivered",
      dateOrdered: "10 Oct 2025",
      dateDelivered: "15 Oct 2025",
    },
  ];

  // Function to get status color based on order status
  const getStatusColor = (status) => {
    switch (status) {
      case "Delivered":
        return "bg-green-100 text-green-700 border-green-200";
      case "Shipped":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "Pending":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-4xl font-bold text-gray-900">Your Orders</h1>
        <p className="text-gray-600 mt-1">
          Track all the products you've purchased from farmers.
        </p>
      </div>

      {/* Compact Orders List */}
      <div className="space-y-4">
        {orders.map((order, index) => (
          <div
            key={index}
            className="border-2 border-gray-200 rounded-xl p-4 bg-white shadow-sm hover:shadow-md hover:border-gray-300 hover:scale-[1.02] transition-all duration-200"
          >
            <div className="flex items-start justify-between">
              {/* Left Section */}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <h3 className="font-semibold text-gray-900">{order.product}</h3>
                  <span className={`px-3 py-1 text-xs rounded-full border ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                </div>

                {/* Order Details */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="space-y-1">
                    <p className="text-gray-600">
                      <span className="font-medium">From:</span> {order.from}
                    </p>
                    <p className="text-gray-600">
                      <span className="font-medium">Quantity:</span> {order.quantity}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-gray-600">
                      <span className="font-medium">Price:</span> ₹{order.price}
                    </p>
                    <p className="text-gray-600">
                      <span className="font-medium">Ordered:</span> {order.dateOrdered}
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Section - Cancel Button */}
              {order.status === "Pending" && (
                <div className="flex flex-col items-end justify-between h-full">
                  <button className="text-sm text-red-600 hover:text-red-700 font-medium border border-red-200 hover:border-red-300 px-3 py-1 rounded-lg transition-colors">
                    Cancel
                  </button>
                </div>
              )}
            </div>

            {/* Footer with Shipping and Delivery Details */}
            <div className="mt-3 pt-3 border-t border-gray-100">
              {order.status === "Shipped" && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-blue-600 font-medium">Shipped - In Transit</span>
                  <span className="text-gray-500">Estimated delivery: 18 Oct 2025</span>
                </div>
              )}
              {order.status === "Delivered" && order.dateDelivered && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-green-600 font-medium">Delivered Successfully</span>
                  <span className="text-gray-500">On {order.dateDelivered}</span>
                </div>
              )}
              {order.status === "Pending" && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-yellow-600 font-medium">Processing Order</span>
                  <span className="text-gray-500">Will ship within 2 days</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default YourOrders;
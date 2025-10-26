import React from "react";

const OrdersReceived = () => {
  const orders = [
    {
      id: "ORD-001",
      product: "Organic Rice 50kg",
      from: "Customer Pooja",
      quantity: 1,
      price: 2500,
      status: "Pending",
      dateOrdered: "14 Oct 2025",
      dateDelivered: null,
      deliveryAddress: "No. 12, Green Street, Thanjavur, Tamil Nadu",
    },
    {
      id: "ORD-002",
      product: "Fresh Tomatoes 10kg",
      from: "Customer Ravi",
      quantity: 2,
      price: 800,
      status: "Shipped",
      dateOrdered: "12 Oct 2025",
      dateDelivered: null,
      deliveryAddress: "23, MG Road, Coimbatore, Tamil Nadu",
    },
    {
      id: "ORD-003",
      product: "Organic Sugar 5kg",
      from: "Customer Anjali",
      quantity: 1,
      price: 400,
      status: "Delivered",
      dateOrdered: "10 Oct 2025",
      dateDelivered: "15 Oct 2025",
      deliveryAddress: "45, Anna Nagar, Erode, Tamil Nadu",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex justify-center">
      <div className="w-full max-w-6xl space-y-4">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-4xl font-bold text-gray-900">Orders Received</h1>
          <p className="text-gray-600 mt-1">
            View all product orders placed by customers for your farm products.
          </p>
        </div>

        {/* Orders List */}
        {orders.map((order, index) => (
          <div
            key={index}
            className="w-full bg-white border-2 border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md hover:border-gray-300 hover:scale-[1.02] transition-all duration-200 flex flex-col"
          >
            {/* Header Section */}
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-bold text-gray-900">{order.product}</h3>
                <p className="text-gray-500 text-sm mt-1">Order #{order.id}</p>
              </div>
              <span
                className={`px-3 py-1 text-sm rounded-full font-semibold ${
                  order.status === "Delivered"
                    ? "bg-green-100 text-green-700"
                    : order.status === "Shipped"
                    ? "bg-blue-100 text-blue-700"
                    : order.status === "Pending"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {order.status}
              </span>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 text-sm">
              {/* Left Column */}
              <div className="space-y-2">
                <p className="font-semibold text-gray-600">Ordered by</p>
                <p className="text-gray-900">{order.from}</p>

                <p className="font-semibold text-gray-600 mt-2">Quantity</p>
                <p className="text-gray-900">{order.quantity}</p>

                <p className="font-semibold text-gray-600 mt-2">Price</p>
                <p className="text-gray-900">₹{order.price}</p>
              </div>

              {/* Right Column */}
              <div className="space-y-2">
                <p className="font-semibold text-gray-600">Date Ordered</p>
                <p className="text-gray-900">{order.dateOrdered}</p>

                {order.status === "Delivered" && order.dateDelivered && (
                  <>
                    <p className="font-semibold text-gray-600 mt-2">Delivered on</p>
                    <p className="text-gray-900">{order.dateDelivered}</p>
                  </>
                )}

                <p className="font-semibold text-gray-600 mt-2">Delivery Address</p>
                <p className="text-gray-900 bg-gray-50 p-2 rounded border border-gray-200">
                  {order.deliveryAddress}
                </p>
              </div>
            </div>

            {/* Footer Section - Action Button */}
            {order.status === "Pending" && (
              <div className="flex justify-end pt-4 border-t border-gray-200 mt-2">
                <button className="px-6 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white font-medium transition-colors duration-200">
                  Mark as Shipped
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrdersReceived;

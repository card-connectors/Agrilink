import React from "react";

const ReceivedRequests = () => {

    const { userId } = useContext(AuthContext); // stores the userID

  const requests = [
    {
      from: "Landowner Priya",
      type: "Land Lease",
      status: "Pending",
      date: "14 Oct 2025",
      location: "Madurai, Tamil Nadu",
      contact: "priya.land@gmail.com",
      phone: "+91 98765 55555",
    },
    {
      from: "Landowner Ravi",
      type: "Farming Collaboration",
      status: "Accepted",
      date: "12 Oct 2025",
      location: "Tiruchirappalli, Tamil Nadu",
      contact: "ravi.land@gmail.com",
      phone: "+91 98765 44444",
    },
    {
      from: "Landowner Sita",
      type: "Land Lease",
      status: "Declined",
      date: "10 Oct 2025",
      location: "Coimbatore, Tamil Nadu",
      contact: "sita.land@gmail.com",
      phone: "+91 98765 33333",
    },
  ];

  const receiveIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-8 h-8 text-green-600"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M19 11H5m14 0l-7 7m7-7l-7-7"
      />
    </svg>
  );

  return (
    <div className="min-h-screen p-8">
      {/* Enhanced Header */}
      <div className="mb-12 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <h1 className="text-4xl font-bold text-gray-800">Received Requests</h1>
          </div>
          <p className="text-gray-600 text-lg max-w-2xl">
            All requests you've received from landowners or farmers are listed below.
          </p>
        </div>
      </div>

      {/* Enhanced Requests Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {requests.map((req, index) => (
          <div
            key={index}
            className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 overflow-hidden hover:-translate-y-1"
          >
            {/* Status Indicator Bar */}
            <div className={`h-2 ${
              req.status === "Accepted"
                ? "bg-gradient-to-r from-green-500 to-emerald-500"
                : req.status === "Pending"
                ? "bg-gradient-to-r from-amber-400 to-orange-400"
                : "bg-gradient-to-r from-red-400 to-rose-500"
            }`} />
            
            <div className="p-6">
              {/* Enhanced Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-xl ${
                    req.status === "Accepted"
                      ? "bg-green-50"
                      : req.status === "Pending"
                      ? "bg-amber-50"
                      : "bg-red-50"
                  }`}>
                    {receiveIcon}
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-gray-800">
                      {req.type}
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">From: {req.from}</p>
                  </div>
                </div>
                <span
                  className={`px-4 py-2 text-sm font-semibold rounded-full border ${
                    req.status === "Accepted"
                      ? "bg-green-50 text-green-700 border-green-200"
                      : req.status === "Pending"
                      ? "bg-amber-50 text-amber-700 border-amber-200"
                      : "bg-red-50 text-red-700 border-red-200"
                  }`}
                >
                  {req.status}
                </span>
              </div>

              {/* Enhanced Details */}
              <div className="space-y-3 mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                  </svg>
                  <span>{req.location}</span>
                </div>
                
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                  </svg>
                  <span>Received: {req.date}</span>
                </div>
              </div>

              {/* Enhanced Contact Section */}
              {req.status === "Accepted" && (
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-4 border border-green-200 mb-4">
                  <div className="flex items-center gap-2 mb-3">
                    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                    </svg>
                    <h6 className="text-green-700 font-bold text-sm">Contact Information</h6>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-gray-700 min-w-12">Email:</span>
                      <span className="text-gray-600">{req.contact}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-gray-700 min-w-12">Phone:</span>
                      <span className="text-gray-600">{req.phone}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Enhanced Actions */}
              {req.status === "Pending" && (
                <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                  <button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-4 py-2 rounded-xl font-medium transition-all duration-200 hover:shadow-md">
                    Accept
                  </button>
                  <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-xl font-medium transition-all duration-200 hover:shadow-md">
                    Reject
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReceivedRequests;
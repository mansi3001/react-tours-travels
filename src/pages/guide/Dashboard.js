// src/pages/guide/Dashboard.js
import React from "react";

const GuideDashboard = () => {
  const stats = [
    { title: "Total Bookings", value: 12 },
    { title: "Pending Bookings", value: 5 },
    { title: "Completed Bookings", value: 7 },
  ];
  return (
    <main className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Guide Dashboard</h1>
      <p>Welcome to the guide panel. Check your assigned bookings.</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white p-4 rounded-lg shadow-md flex items-center justify-between"
          >
            <div>
              <h3 className="text-lg font-semibold">{stat.title}</h3>
              <p className="text-2xl font-bold">{stat.value}</p>
            </div>
            <div className="bg-indigo-100 p-2 rounded-full">
              <svg
                className="w-6 h-6 text-indigo-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default GuideDashboard;

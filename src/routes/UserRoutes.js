// src/routes/UserRoutes.js
import React from "react";
import { Routes, Route } from "react-router-dom";
import UserSidebar from "../components/UserSidebar";
import UserDashboard from "../pages/user/Dashboard";
import BrowsePackages from "../pages/user/BrowsePackages";
import BookingHistory from "../pages/user/BookingHistory";

const UserRoutes = () => {
  return (
    <div className="flex">
      <UserSidebar />
      <div className="p-6 flex-1">
        <Routes>
          <Route path="/dashboard" element={<UserDashboard />} />
          <Route path="/browse-packages" element={<BrowsePackages />} />
          <Route path="/booking-history" element={<BookingHistory />} />
        </Routes>
      </div>
    </div>
  );
};

export default UserRoutes;

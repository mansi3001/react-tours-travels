// src/routes/GuideRoutes.js
import React from "react";
import { Routes, Route } from "react-router-dom";
import GuideSidebar from "../components/GuideSidebar";
import GuideDashboard from "../pages/guide/Dashboard";
import AssignedBookings from "../pages/guide/AssignedBookings";
import UpdateTourStatus from "../pages/guide/UpdateTourStatus";
import GuideLogin from "../pages/guide/Login";
import GuideRegister from "../pages/guide/Register";

const GuideRoutes = () => {
  return (
    <div className="flex">
      <GuideSidebar />
      <div className="p-6 flex-1">
        <Routes>
          <Route path="/guide/dashboard" element={<GuideDashboard />} />
          <Route path="/guide/assigned-bookings" element={<AssignedBookings />} />
          <Route path="/guide/update-status" element={<UpdateTourStatus />} />
          <Route path="/guide/login" element={<GuideLogin />} />
          <Route path="/guide/register" element={<GuideRegister />} />
        </Routes>
      </div>
    </div>
  );
};

export default GuideRoutes;

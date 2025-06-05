// src/components/GuideSidebar.js
import React from "react";
import { Link } from "react-router-dom";

const GuideSidebar = () => (
  <nav className="bg-indigo-800 text-white w-48 min-h-screen p-4">
    <h2 className="text-xl mb-6 font-bold">Guide Panel</h2>
    <ul>
      <li className="mb-2"><Link to="/guide/dashboard">Dashboard</Link></li>
      <li className="mb-2"><Link to="/guide/bookings">Assigned Bookings</Link></li>
      <li className="mb-2"><Link to="/guide/update-status">Update Tour Status</Link></li>
    </ul>
  </nav>
);

export default GuideSidebar;

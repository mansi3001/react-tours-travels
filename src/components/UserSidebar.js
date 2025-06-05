// src/components/UserSidebar.js
import React from "react";
import { Link } from "react-router-dom";

const UserSidebar = () => (
  <nav className="bg-green-800 text-white w-48 min-h-screen p-4">
    <h2 className="text-xl mb-6 font-bold">User Panel</h2>
    <ul>
      <li className="mb-2"><Link to="/user/dashboard">Dashboard</Link></li>
      <li className="mb-2"><Link to="/user/browse-packages">Browse Packages</Link></li>
      <li className="mb-2"><Link to="/user/booking-history">Booking History</Link></li>
    </ul>
  </nav>
);

export default UserSidebar;

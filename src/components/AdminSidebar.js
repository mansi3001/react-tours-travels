// src/components/AdminSidebar.js
import React from "react";
import { Link } from "react-router-dom";

const AdminSidebar = () => (
  <nav className="bg-gray-800 text-white w-48 min-h-screen p-4">
    <h2 className="text-xl mb-6 font-bold">Admin Panel</h2>
    <ul>
      <li className="mb-2"><Link to="/admin/dashboard">Dashboard</Link></li>
      <li className="mb-2"><Link to="/admin/users">Users</Link></li>
      <li className="mb-2"><Link to="/admin/guides">Guides</Link></li>
      <li className="mb-2"><Link to="/admin/packages">Packages</Link></li>
      <li className="mb-2"><Link to="/admin/bookings">Bookings</Link></li>
    </ul>
  </nav>
);

export default AdminSidebar;

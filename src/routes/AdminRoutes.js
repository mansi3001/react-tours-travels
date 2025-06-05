// src/routes/AdminRoutes.js
import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminDashboard from "../pages/admin/AdminDashboard";
import ManageUsers from "../pages/admin/ManageUsers";
import ManageGuides from "../pages/admin/ManageGuides";
import AdminLogin from "../pages/admin/Login";
import AdminRegister from "../pages/admin/Register";

export default function AdminRoutes() {
  return (
    <Routes>
      <Route path="dashboard" element={<AdminDashboard />} />
      <Route path="users" element={<ManageUsers />} />
      <Route path="guides" element={<ManageGuides />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/register" element={<AdminRegister />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
    </Routes>
  );
}

// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Public Pages
import Login from "./pages/user/Login";
import Register from "./pages/user/Register";
import Home from "./pages/Home";
import Header from "./components/Header";

// Admin Pages
import AdminSidebar from "./components/AdminSidebar";
import AdminDashboard from "./pages/admin/Dashboard";
import Users from "./pages/admin/Users";
import Packages from "./pages/admin/Packages";
import Guides from "./pages/admin/Guides";
import AdminLogin from "./pages/admin/Login";
import AdminRegister from "./pages/admin/Register";

// Guide Pages
import GuideSidebar from "./components/GuideSidebar";
import GuideDashboard from "./pages/guide/Dashboard";
import GuideBookings from "./pages/guide/Bookings";
import GuideLogin from "./pages/guide/Login";
import GuideRegister from "./pages/guide/Register";

// User Pages
import UserSidebar from "./components/UserSidebar";
// import UserDashboard from "./pages/user/Dashboard";
import BrowsePackages from "./pages/user/BrowsePackages";
import BookingHistory from "./pages/user/BookingHistory";
import UpdateBookingStatus from "./pages/guide/UpdateBookingStatus";
import Profile from "./pages/user/Profile";
import PackageDetails from "./pages/user/PackageDetails";

function App() {
  const userData = JSON.parse(localStorage.getItem("user"));
  const role = userData?.role;
  return (
    <Router>
      <Header />
      {!role ? (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/register" element={<AdminRegister />} />
          <Route path="/guide/login" element={<GuideLogin />} />
          <Route path="/guide/register" element={<GuideRegister />} />
          <Route path="/package/:id" element={<PackageDetails />} />
          <Route path="*" element={<Home />} />
        </Routes>
      ) : role === "admin" ? (
        <div className="flex">
          <AdminSidebar />
          <div className="p-4 flex-grow">
            <Routes>
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/users" element={<Users />} />
              <Route path="/admin/guides" element={<Guides />} />
              <Route path="/admin/packages" element={<Packages />} />
              <Route path="*" element={<AdminDashboard />} />
            </Routes>
          </div>
        </div>
      ) : role === "guide" ? (
        <div className="flex">
          <GuideSidebar />
          <div className="p-4 flex-grow">
            <Routes>
              <Route path="/guide/dashboard" element={<GuideDashboard />} />
              <Route path="/guide/bookings" element={<GuideBookings />} />
              <Route path="/guide/update-status" element={<UpdateBookingStatus />} />
              <Route path="*" element={<GuideDashboard />} />
            </Routes>
          </div>
        </div>
      ) : role === "user" ? (
        <div className="flex">
          {/* <UserSidebar /> */}
          <div className="p-4 flex-grow">
            <Routes>
              {/* <Route path="/user/dashboard" element={<UserDashboard />} /> */}
              <Route path="/user/profile" element={<Profile />} />
              <Route
                path="/user/browse-packages"
                element={<BrowsePackages />}
              />
              <Route
                path="/user/booking-history"
                element={<BookingHistory />}
              />
              <Route path="*" element={<Home />} />
              <Route path="/package/:id" element={<PackageDetails />} />
            </Routes>
          </div>
        </div>
      ) : (
        <Routes>
          <Route path="*" element={<Login />} />
        </Routes>
      )}
    </Router>
  );
}

export default App;

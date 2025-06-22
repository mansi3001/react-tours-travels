// src/pages/user/BrowsePackages.js
import React, { useEffect, useState } from "react";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { useNavigate } from "react-router-dom";

const BrowsePackages = () => {
  const [packages, setPackages] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      alert("Please login to book.");
      navigate("/login");
      return;
    }

    (async () => {
      const snapshot = await getDocs(collection(db, "packages"));
      const packagesList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPackages(packagesList);
    })()
  }, [navigate]);

  const bookPackage = async (pkg) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      alert("Please login to book.");
      navigate("/login");
      return;
    }

    await addDoc(collection(db, "bookings"), {
      userId: user.uid,
      userEmail: user.email,
      packageId: pkg.id,
      packageName: pkg.name,
      price: pkg.price,
      duration: pkg.duration,
      guideId: pkg.guideId || null,
      guideName: pkg.guideName || null,
      status: "pending",
      bookedAt: new Date(),
    });

    alert("Booking successful!");
    navigate("/user/booking-history");
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-center text-blue-800 mb-8">
        🌍 Browse Travel Packages
      </h2>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
        {packages.map((pkg) => (
          <div
            key={pkg.id}
            className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition"
          >
            <img
              src={pkg.image || "/fallback.jpg"}
              alt={pkg.name}
              onError={(e) => (e.target.src = "/fallback.jpg")}
              className="h-48 w-full object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold text-gray-800 mb-1">
                {pkg.name}
              </h3>
              <p className="text-gray-600 text-sm line-clamp-3 mb-2">
                {pkg.description}
              </p>
              <p className="text-green-700 font-bold text-lg mb-2">
                ₹{pkg.price}
              </p>
              <p className="text-gray-500 text-sm mb-3">
                Duration: {pkg.duration}
              </p>
              <button
                onClick={() => bookPackage(pkg)}
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
              >
                Book Now
              </button>
            </div>
          </div>
        ))}
      </div>

      {packages.length === 0 && (
        <p className="text-center text-gray-500 mt-10">
          No packages available.
        </p>
      )}
    </div>
  );
};

export default BrowsePackages;

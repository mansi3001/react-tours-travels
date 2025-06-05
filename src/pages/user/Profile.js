// src/pages/user/Profile.js
import React, { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import { Link } from "react-router-dom";

const Profile = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const q = query(
          collection(db, "bookings"),
          where("userId", "==", user.uid)
        );
        const snapshot = await getDocs(q);
        const bookingList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setBookings(bookingList);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    if (user?.uid) {
      fetchBookings();
    }
  }, [user?.uid]);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">👤 My Profile</h2>

      <div className="bg-gray-50 p-4 rounded-lg mb-8 border">
        <p className="text-lg text-gray-700 mb-2">
          <strong>Email:</strong> {user?.email}
        </p>
        <p className="text-lg text-gray-700">
          <strong>Role:</strong> {user?.role}
        </p>
      </div>

      <div className="mb-10">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">
          📚 Booking History
        </h3>
        {bookings.length > 0 ? (
          <ul className="space-y-4">
            {bookings.map((booking) => (
              <li
                key={booking.id}
                className="border p-4 rounded-lg shadow-sm bg-gray-100"
              >
                <p>
                  <strong>Package:</strong> {booking.packageName}
                </p>
                <p>
                  <strong>Date:</strong> {booking.date}
                </p>
                <p>
                  <strong>Status:</strong>{" "}
                  <span
                    className={`font-semibold ${
                      booking.status === "Confirmed"
                        ? "text-green-600"
                        : "text-gray-600"
                    }`}
                  >
                    {booking.status}
                  </span>
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No bookings found.</p>
        )}
      </div>

      <div className="text-center">
        <Link
          to="/user/browse-packages"
          className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-700 transition"
        >
          🌍 Browse More Packages
        </Link>
      </div>
    </div>
  );
};

export default Profile;

// src/pages/user/BookingHistory.js
import React, { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import { Link } from "react-router-dom";

const BookingHistory = () => {
  const [bookings, setBookings] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user) return;
    const fetchBookings = async () => {
      const q = query(
        collection(db, "bookings"),
        where("userId", "==", user.uid)
      );
      const snapshot = await getDocs(q);
      const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setBookings(list);
    };
    fetchBookings();
  }, []);

  const formatDate = (timestamp) => {
    if (!timestamp?.seconds) return "N/A";
    const date = new Date(timestamp.seconds * 1000);
    return date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white shadow-md rounded-lg mt-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">
        📖 Booking History
      </h2>

      {bookings.length > 0 ? (
        <div className="space-y-6">
          {bookings.map((booking) => (
            <div
              key={booking.id}
              className="border border-gray-200 rounded-lg p-5 shadow-sm bg-gray-50 hover:bg-white transition"
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-xl font-semibold text-blue-800">
                  {booking.packageTitle || "Untitled Package"}
                </h3>
                <span
                  className={`text-sm font-medium px-3 py-1 rounded-full ${
                    booking.status === "confirmed"
                      ? "bg-green-100 text-green-700"
                      : booking.status === "pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-gray-200 text-gray-700"
                  }`}
                >
                  {booking.status || "unknown"}
                </span>
              </div>

              <div className="text-gray-700 space-y-1 text-sm">
                <p>
                  <strong>Guide:</strong> {booking.guideName || "Not Assigned"}
                </p>
                <p>
                  <strong>Booking Date:</strong> {formatDate(booking.bookedAt)}
                </p>
                <p>
                  <strong>Booking ID:</strong> {booking.id}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No bookings found.</p>
      )}
      <div className="text-center mt-10">
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

export default BookingHistory;

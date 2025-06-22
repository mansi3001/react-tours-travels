import React, { useEffect, useState } from "react";
import { collection, query, where, getDocs, updateDoc, doc } from "firebase/firestore";
import { db } from "../../firebase";
import Header from "../../components/Header";

const GuideBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // Get logged-in guide's user ID from localStorage
  const guideId = JSON.parse(localStorage.getItem("user"))?.uid;

  useEffect(() => {
    const fetchBookings = async () => {
      if (!guideId) return;

      // Query bookings where guideId matches
      const q = query(collection(db, "bookings"), where("guideId", "==", guideId));
      const querySnapshot = await getDocs(q);

      const bookingsList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setBookings(bookingsList);
      setLoading(false);
    };

    fetchBookings();
  }, [guideId]);

  if (loading) return <p>Loading bookings...</p>;
  if (bookings.length === 0) return <p>No bookings assigned to you.</p>;

  return (
    <>
      <main className="p-6 bg-gray-100 min-h-screen">
        <h1 className="text-3xl font-bold mb-6">Assigned Bookings</h1>
        <table className="min-w-full bg-white rounded shadow-md">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Booking ID</th>
              <th className="py-2 px-4 border-b">User</th>
              <th className="py-2 px-4 border-b">Package</th>
              <th className="py-2 px-4 border-b">Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.id} className="hover:bg-gray-100">
                <td className="py-2 px-4 border-b">{booking.id}</td>
                <td className="py-2 px-4 border-b">{booking.userEmail || booking.userName || "N/A"}</td>
                <td className="py-2 px-4 border-b">{booking.packageTitle || "N/A"}</td>
                <td className="py-2 px-4 border-b">{booking.status || "Pending"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </>
  );
};

export default GuideBookings;

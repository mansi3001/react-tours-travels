import React, { useEffect, useState } from "react";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import { db } from "../../firebase";
import Header from "../../components/Header";

const UpdateBookingStatus = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const guideId = JSON.parse(localStorage.getItem("user"))?.uid;

  useEffect(() => {
    const fetchBookings = async () => {
      if (!guideId) return;
      const bookingsRef = collection(db, "bookings");
      const snapshot = await getDocs(bookingsRef);
      const guideBookings = snapshot.docs
        .map((doc) => ({ id: doc.id, ...doc.data() }))
        .filter((b) => b.guideId === guideId);
      setBookings(guideBookings);
      setLoading(false);
    };
    fetchBookings();
  }, [guideId]);

  const handleStatusChange = async (id, newStatus) => {
    try {
      const bookingRef = doc(db, "bookings", id);
      await updateDoc(bookingRef, { status: newStatus });
      setBookings((prev) =>
        prev.map((b) => (b.id === id ? { ...b, status: newStatus } : b))
      );
      alert("Status updated!");
    } catch (error) {
      alert("Failed to update status: " + error.message);
    }
  };

  if (loading) return <p>Loading bookings...</p>;
  if (bookings.length === 0) return <p>No bookings assigned to you.</p>;

  return (
    <>
      <Header />
      <main className="p-6 bg-gray-100 min-h-screen">
        <h1 className="text-3xl font-bold mb-6">Update Tour Status</h1>
        <table className="min-w-full bg-white rounded shadow-md">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Booking ID</th>
              <th className="py-2 px-4 border-b">Package</th>
              <th className="py-2 px-4 border-b">Current Status</th>
              <th className="py-2 px-4 border-b">Update Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.id} className="hover:bg-gray-100">
                <td className="py-2 px-4 border-b">{booking.id}</td>
                <td className="py-2 px-4 border-b">{booking.packageTitle || "N/A"}</td>
                <td className="py-2 px-4 border-b">{booking.status || "Pending"}</td>
                <td className="py-2 px-4 border-b">
                  <select
                    value={booking.status || "Pending"}
                    onChange={(e) => handleStatusChange(booking.id, e.target.value)}
                    className="border rounded px-2 py-1"
                  >
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </>
  );
};

export default UpdateBookingStatus;

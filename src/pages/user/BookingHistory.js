// src/pages/user/BookingHistory.js
import React, { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

const BookingHistory = () => {
  const [bookings, setBookings] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user) return;
    const fetchBookings = async () => {
      const q = query(collection(db, "bookings"), where("userId", "==", user.uid));
      const snapshot = await getDocs(q);
      const list = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setBookings(list);
    };
    fetchBookings();
  }, []);

  return (
    <div>
      <h2>Your Booking History</h2>
      <ul>
        {bookings.map(booking => (
          <li key={booking.id}>
            {booking.packageTitle} | Status: {booking.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookingHistory;

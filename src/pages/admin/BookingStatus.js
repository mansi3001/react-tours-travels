import React, { useEffect, useState } from 'react';
import { db } from '../../firebase';
import { collection, getDocs } from 'firebase/firestore';

const BookingStatus = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      const snapshot = await getDocs(collection(db, 'bookings'));
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setBookings(data);
    };
    fetchBookings();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">All Booking Details</h2>
      <table className="w-full border text-left">
        <thead>
          <tr>
            <th>User</th>
            <th>Package</th>
            <th>Guide</th>
            <th>Status</th>
            <th>Booking Date</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map(b => (
            <tr key={b.id}>
              <td>{b.userId}</td>
              <td>{b.packageId}</td>
              <td>{b.guideId}</td>
              <td>{b.status}</td>
              <td>{new Date(b.bookingDate).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookingStatus;

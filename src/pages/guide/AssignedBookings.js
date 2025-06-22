// pages/guide/AssignedBookings.js
import React, { useEffect, useState } from 'react';
import { db } from '../../firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';

const AssignedBookings = ({ guideId }) => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const q = query(collection(db, 'bookings'), where('guideId', '==', guideId));
      const snap = await getDocs(q);
      setBookings(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    fetch();
  }, [guideId]);

  return (
    <div>
      <h2>Assigned Bookings</h2>
      <ul>
        {bookings.map(b => (
          <li key={b.id}>
            Package: {b.packageId} | Status: {b.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AssignedBookings;

import React, { useEffect, useState } from "react";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";

const AllBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const formatDate = (timestamp) => {
    if (!timestamp?.seconds) return "N/A";
    return new Date(timestamp.seconds * 1000).toLocaleDateString("en-IN");
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const bookingSnap = await getDocs(collection(db, "bookings"));

      const bookingsWithDetails = await Promise.all(
        bookingSnap.docs.map(async (docSnap) => {
          const data = docSnap.data();
          const userRef = doc(db, "users", data.userId);
          const guideRef = doc(db, "guides", data.guideId);

          const [userDoc, guideDoc] = await Promise.all([
            getDoc(userRef),
            getDoc(guideRef),
          ]);

          return {
            id: docSnap.id,
            ...data,
            userName: userDoc.exists() ? userDoc.data().name : "N/A",
            userEmail: userDoc.exists() ? userDoc.data().email : "N/A",
            guideName: guideDoc.exists() ? guideDoc.data().name : "Not Assigned",
            guideEmail: guideDoc.exists() ? guideDoc.data().email : "N/A",
          };
        })
      );

      setBookings(bookingsWithDetails);
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">📋 All Bookings with User & Guide Info</h2>

      {loading ? (
        <p className="text-gray-600">Loading bookings...</p>
      ) : bookings.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border text-sm text-left shadow">
            <thead className="bg-gray-200 text-gray-700">
              <tr>
                <th className="p-3 border">Package</th>
                <th className="p-3 border">User Name</th>
                <th className="p-3 border">User Email</th>
                <th className="p-3 border">Guide Name</th>
                <th className="p-3 border">Guide Email</th>
                <th className="p-3 border">Date</th>
                <th className="p-3 border">Status</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking.id} className="bg-white hover:bg-gray-50">
                  <td className="p-3 border">{booking.packageTitle}</td>
                  <td className="p-3 border">{booking.userName}</td>
                  <td className="p-3 border">{booking.userEmail}</td>
                  <td className="p-3 border">{booking.guideName}</td>
                  <td className="p-3 border">{booking.guideEmail}</td>
                  <td className="p-3 border">{formatDate(booking.bookedAt)}</td>
                  <td className="p-3 border capitalize text-blue-700 font-medium">{booking.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-500">No bookings found.</p>
      )}
    </div>
  );
};

export default AllBookings;

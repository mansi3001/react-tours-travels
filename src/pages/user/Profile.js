// src/pages/user/Profile.js
import React, { useEffect, useState } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase";
import { Link } from "react-router-dom";

const Profile = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [bookings, setBookings] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({ name: "", email: "" });

  useEffect(() => {
    if (user?.uid) {
      (async () => {
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
      })();
      (async () => {
        try {
          const docRef = doc(db, "users", user.uid);
          const userSnap = await getDoc(docRef);
          if (userSnap.exists()) {
            const userData = userSnap.data();
            setEditData({
              name: userData.name || "",
              email: userData.email || "",
            });
          }
        } catch (err) {
          console.error("Error fetching user data:", err);
        }
      })();
    }
  }, [user?.uid]);
  const formatDate = (timestamp) => {
    if (!timestamp?.seconds) return "N/A";
    const date = new Date(timestamp.seconds * 1000);
    return date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };
  console.log({ bookings });
  const handleEditChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const saveChanges = async () => {
    try {
      const docRef = doc(db, "users", user.uid);
      await updateDoc(docRef, {
        name: editData.name,
        email: editData.email,
      });

      const updatedUser = { ...user, email: editData.email };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setUser(updatedUser);
      setIsEditing(false);
    } catch (err) {
      console.error("Error updating profile:", err);
    }
  };
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">👤 My Profile</h2>

      <div className="bg-gray-50 p-4 rounded-lg mb-8 border">
        {isEditing ? (
          <>
            <div className="mb-4">
              <label className="block text-gray-700 mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={editData.name}
                onChange={handleEditChange}
                className="w-full border px-3 py-2 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={editData.email}
                onChange={handleEditChange}
                className="w-full border px-3 py-2 rounded"
              />
            </div>
            <button
              className="bg-green-600 text-white px-4 py-2 rounded mr-2"
              onClick={saveChanges}
            >
              Save
            </button>
            <button
              className="bg-gray-300 px-4 py-2 rounded"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <p className="text-lg text-gray-700 mb-2">
              <strong>Name:</strong> {editData.name || "Not set"}
            </p>
            <p className="text-lg text-gray-700 mb-2">
              <strong>Email:</strong> {editData.email}
            </p>
            <p className="text-lg text-gray-700">
              <strong>Role:</strong> {user?.role}
            </p>
            <button
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              onClick={() => setIsEditing(true)}
            >
              ✏️ Edit Profile
            </button>
          </>
        )}
      </div>

    </div>
  );
};

export default Profile;

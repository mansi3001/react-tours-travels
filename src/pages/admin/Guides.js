// src/pages/admin/Guides.js
import React, { useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase";
import { useNavigate } from "react-router-dom";

const Guides = () => {
  const [guides, setGuides] = useState([]);
  const navigate = useNavigate();

  const fetchGuides = async () => {
    const guidesCollection = collection(db, "guides");
    const guidesSnapshot = await getDocs(guidesCollection);
    const guidesList = guidesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setGuides(guidesList);
  };

  useEffect(() => {
    fetchGuides();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this guide?")) {
      await deleteDoc(doc(db, "guides", id));
      fetchGuides();
    }
  };

  return (
    <div className="p-6 bg-white rounded shadow-md">
      <h2 className="text-2xl font-bold mb-6">Guides</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left py-3 px-4 border-b">Email</th>
              <th className="text-center py-3 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {guides.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center py-6 text-gray-500">
                  No guides found.
                </td>
              </tr>
            )}
            {guides.map((guide) => (
              <tr key={guide.id} className="hover:bg-gray-50">
                <td className="py-3 px-4 border-b">{guide.email || "N/A"}</td>
                <td className="py-3 px-4 border-b text-center space-x-2">
                  <button
                    onClick={() => handleDelete(guide.id)}
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Guides;

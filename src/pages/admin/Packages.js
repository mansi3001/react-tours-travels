import React, { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase";

const Packages = () => {
  const [packages, setPackages] = useState([]);
  const [editPackage, setEditPackage] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    description: "",
    duration: "",
    price: "",
  });

  const fetchPackages = async () => {
    const packagesCollection = collection(db, "packages");
    const packagesSnapshot = await getDocs(packagesCollection);
    const packagesList = packagesSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setPackages(packagesList);
  };

  useEffect(() => {
    fetchPackages();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this package?")) {
      await deleteDoc(doc(db, "packages", id));
      fetchPackages();
    }
  };

  const handleEdit = (pkg) => {
    setEditPackage(pkg);
    setFormData({
      name: pkg.name,
      image: pkg.image,
      description: pkg.description,
      duration: pkg.duration,
      price: pkg.price,
    });
    setShowModal(true);
  };

  const handleAdd = () => {
    setEditPackage(null);
    setFormData({
      name: "",
      image: "",
      description: "",
      duration: "",
      price: "",
    });
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, image, description, duration, price } = formData;
    if (!name || !image || !description || !duration || !price)
      return alert("All fields are required.");

    if (editPackage) {
      await updateDoc(doc(db, "packages", editPackage.id), formData);
    } else {
      await addDoc(collection(db, "packages"), formData);
    }

    setShowModal(false);
    setEditPackage(null);
    fetchPackages();
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Packages</h2>
      <button
        onClick={handleAdd}
        className="mb-4 bg-green-600 text-white px-4 py-2 rounded"
      >
        Add Package
      </button>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded shadow">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="py-2 px-4 border-b">Image</th>
              <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b">Description</th>
              <th className="py-2 px-4 border-b">Duration</th>
              <th className="py-2 px-4 border-b">Price</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {packages.map((pkg) => (
              <tr key={pkg.id}>
                <td className="py-2 px-4 border-b">
                  <img src={pkg.image} alt={pkg.name} className="w-20 h-14 object-cover rounded" />
                </td>
                <td className="py-2 px-4 border-b">{pkg.name}</td>
                <td className="py-2 px-4 border-b">{pkg.description}</td>
                <td className="py-2 px-4 border-b">{pkg.duration}</td>
                <td className="py-2 px-4 border-b">₹{pkg.price}</td>
                <td className="py-2 px-4 border-b space-x-2">
                  <button
                    onClick={() => handleEdit(pkg)}
                    className="bg-blue-600 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(pkg.id)}
                    className="bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-md w-full max-w-lg">
            <h3 className="text-lg font-bold mb-4">
              {editPackage ? "Edit Package" : "Add Package"}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="text"
                placeholder="Name"
                className="w-full px-4 py-2 border rounded"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
              <input
                type="text"
                placeholder="Image URL"
                className="w-full px-4 py-2 border rounded"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              />
              <textarea
                placeholder="Description"
                className="w-full px-4 py-2 border rounded"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
              <input
                type="text"
                placeholder="Duration (e.g., 3 Days / 2 Nights)"
                className="w-full px-4 py-2 border rounded"
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
              />
              <input
                type="number"
                placeholder="Price"
                className="w-full px-4 py-2 border rounded"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setEditPackage(null);
                  }}
                  className="bg-gray-500 text-white px-4 py-2 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-green-600 text-white px-4 py-2 rounded"
                >
                  {editPackage ? "Update" : "Add"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Packages;

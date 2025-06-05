import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "../../firebase";
import { collection, getDoc, getDocs, doc, addDoc } from "firebase/firestore";

const PackageDetails = () => {
  const { id } = useParams();
  const [pkg, setPkg] = useState(null);
  const [guides, setGuides] = useState([]);
  const [selectedGuide, setSelectedGuide] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPackage = async () => {
      const docSnap = await getDoc(doc(db, "packages", id));
      if (docSnap.exists()) setPkg({ id: docSnap.id, ...docSnap.data() });
    };

    const fetchGuides = async () => {
      const snapshot = await getDocs(collection(db, "guides"));
      const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setGuides(list);
    };

    fetchPackage();
    fetchGuides();
  }, [id]);

  const handleBooking = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      alert("Please login to book.");
      navigate("/login");
      return;
    }

    await addDoc(collection(db, "bookings"), {
      userId: user.uid,
      userEmail: user.email,
      packageId: pkg.id,
      packageTitle: pkg.name,
      guideId: selectedGuide ? selectedGuide.id : null,
      guideName: selectedGuide ? selectedGuide.name : null,
      status: "pending",
      bookedAt: new Date(),
    });

    alert("Booking successful!");
    navigate("/user/booking-history");
  };

  if (!pkg) return <p>Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <img src={pkg.image} alt={pkg.name} className="w-full h-64 object-cover rounded" />
      <h2 className="text-3xl font-bold mt-4">{pkg.name}</h2>
      <p className="text-gray-700 my-2">📅 {pkg.duration}</p>
      <p className="text-green-700 font-semibold text-xl">₹{pkg.price}</p>
      <p className="my-4">{pkg.description}</p>

      <div className="my-6">
        <h3 className="text-xl font-bold mb-2">Choose a Guide (optional):</h3>
        <select
          onChange={(e) =>
            setSelectedGuide(guides.find((g) => g.id === e.target.value) || null)
          }
          className="w-full border rounded px-3 py-2"
        >
          <option value="">-- Book Without Guide --</option>
          {guides.map((guide) => (
            <option key={guide.id} value={guide.id}>
              {guide.name} ({guide.experience})
            </option>
          ))}
        </select>
      </div>

      <button
        onClick={handleBooking}
        className="bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700"
      >
        Book Now
      </button>
    </div>
  );
};

export default PackageDetails;

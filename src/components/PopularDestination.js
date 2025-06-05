import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";

const PopularDestinations = () => {
  const [packages, setPackages] = useState([]);
  const navigate = useNavigate();

  const fetchPackages = async () => {
    try {
      const packagesCollection = collection(db, "packages");
      const snapshot = await getDocs(packagesCollection);
      const list = snapshot.docs.map((doc) => ({ 
        id: doc.id, 
        ...doc.data() 
      }));
      console.log("Fetched packages:", list);
      setPackages(list);
    } catch (error) {
      console.error("Error fetching packages:", error);
      setPackages([]);
    }
  };

  useEffect(() => {
    fetchPackages();
  }, []);

  const handleClick = (pkgId) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      navigate("/login");
    } else {
      navigate(`/package/${pkgId}`);
    }
  };

  return (
    <section className="py-12 px-4 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">
        🌍 Popular Packages
      </h2>
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
        {packages.map((pkg) => (
          <div
            key={pkg.id}
            onClick={() => handleClick(pkg.id)}
            className="cursor-pointer rounded-lg overflow-hidden shadow-md hover:shadow-xl transition transform hover:-translate-y-1 bg-white"
          >
            <img
              src={pkg.image}
              alt={pkg.name}
              onError={(e) => (e.target.src = "/fallback.jpg")}
              className="w-full h-52 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold text-gray-800">{pkg.name}</h3>
              <p className="text-gray-600 mt-1 line-clamp-2">{pkg.description}</p>
              <p className="mt-2 text-green-700 font-semibold">₹{pkg.price}</p>
              <p className="text-sm text-gray-500">{pkg.duration}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PopularDestinations;

// src/pages/admin/Dashboard.js
import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

const AdminDashboard = () => {
  const [counts, setCounts] = useState({
    users: 0,
    guides: 0,
    packages: 0,
  });

  useEffect(() => {
    const fetchCounts = async () => {
      const usersSnap = await getDocs(collection(db, "users"));
      const guidesSnap = await getDocs(collection(db, "guides"));
      const packagesSnap = await getDocs(collection(db, "packages"));

      setCounts({
        users: usersSnap.size,
        guides: guidesSnap.size,
        packages: packagesSnap.size,
      });
    };

    fetchCounts();
  }, []);

  return (
    <div className="flex">
      <main className="flex-1 p-8 bg-gray-100 min-h-screen">
        <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <DashboardCard title="Users" count={counts.users} />
          <DashboardCard title="Guides" count={counts.guides} />
          <DashboardCard title="Packages" count={counts.packages} />
        </div>
      </main>
    </div>
  );
};

const DashboardCard = ({ title, count }) => (
  <div className="bg-white rounded shadow p-6 text-center">
    <h2 className="text-xl font-semibold">{title}</h2>
    <p className="text-3xl font-bold mt-2">{count}</p>
  </div>
);

export default AdminDashboard;

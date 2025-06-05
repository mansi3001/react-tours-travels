import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

const Header = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    localStorage.clear();
    navigate("/");
  };

  return (
    <header className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold cursor-pointer" onClick={() => navigate("/")}>
        Tour & Travel Portal
      </h1>
      <div className="flex items-center gap-4">
        {user ? (
          <>
            <span>Welcome {user.role.charAt(0).toUpperCase() + user.role.slice(1)}</span>
            {user.role === "user" && (
              <>
                <button
                  className="bg-yellow-500 hover:bg-yellow-600 px-3 py-1 rounded"
                  onClick={() => navigate("/user/profile")}
                >
                  Profile
                </button>
                <button
                  className="bg-cyan-500 hover:bg-cyan-600 px-3 py-1 rounded"
                  onClick={() => navigate("/user/booking-history")}
                >
                  Bookings History
                </button>
              </>
            )}
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <button
              className="bg-green-500 hover:bg-green-600 px-3 py-1 rounded"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
            <button
              className="bg-white text-blue-600 hover:bg-gray-100 px-3 py-1 rounded"
              onClick={() => navigate("/register")}
            >
              Register
            </button>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;

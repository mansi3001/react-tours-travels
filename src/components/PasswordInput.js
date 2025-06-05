// src/components/PasswordInput.js
import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const PasswordInput = ({ value, onChange, placeholder = "Password", required = true }) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShow = () => setShowPassword((prev) => !prev);

  return (
    <div className="relative w-full mb-4">
      <input
        type={showPassword ? 'text' : 'password'}
        placeholder={placeholder}
        className="w-full px-4 py-2 border rounded pr-10"
        value={value}
        onChange={onChange}
        required={required}
      />
      <span
        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 cursor-pointer"
        onClick={toggleShow}
      >
        {showPassword ? <FaEyeSlash /> : <FaEye />}
      </span>
    </div>
  );
};

export default PasswordInput;

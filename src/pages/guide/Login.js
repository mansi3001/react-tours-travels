// src/pages/guide/GuideLogin.js
import React, { useState } from 'react';
import { auth, db } from '../../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import PasswordInput from '../../components/PasswordInput';
import { doc, getDoc } from 'firebase/firestore';

const GuideLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const userDocRef = doc(db, 'guides', userCredential.user.uid);
      const userSnap = await getDoc(userDocRef);

      if (!userSnap.exists()) {
        setError('Guide data not found.');
        return;
      }

      const userData = userSnap.data();
      if (userData.role === 'guide') {
        localStorage.setItem('user', JSON.stringify({
          ...userCredential.user,
          role: 'guide'
        }));
        navigate('/guide/dashboard');
      } else {
        setError('Access denied. Not a guide account.');
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6">Guide Login</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <input
          type="email"
          placeholder="Email"
          className="w-full mb-4 px-4 py-2 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <PasswordInput
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">Login</button>
      </form>
    </div>
  );
};

export default GuideLogin;

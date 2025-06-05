import React, { useState } from 'react';
import { auth, db } from '../../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import PasswordInput from '../../components/PasswordInput';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);

      // Check role in Firestore
      const userDocRef = doc(db, 'admin', userCredential.user.uid);
      const userSnap = await getDoc(userDocRef);

      if (!userSnap.exists()) {
        setError('User data not found.');
        return;
      }

      const userData = userSnap.data();

      if (userData.role !== 'admin') {
        setError('Access denied: not an admin.');
        return;
      }
      localStorage.setItem('user', JSON.stringify({
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        role: 'admin'
      }));      
      // Success - redirect to dashboard
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6">Admin Login</h2>
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
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">
          Login
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;

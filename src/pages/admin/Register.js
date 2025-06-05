import React, { useState } from 'react';
import { auth, db } from '../../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import PasswordInput from '../../components/PasswordInput';
import { doc, setDoc } from 'firebase/firestore';

const AdminRegister = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      // Set the document data
      await setDoc(doc(db, 'admin', userCredential.user.uid), {
        email,
        role: 'admin',
      });

      // Show success message
      setSuccess('Admin registered successfully!');
      localStorage.setItem('user', JSON.stringify({
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        role: 'admin'
      }));      
      navigate('/admin/login');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form onSubmit={handleRegister} className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6">Admin Register</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {success && <p className="text-green-500 mb-4">{success}</p>}
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
        <button type="submit" className="w-full bg-green-600 text-white py-2 rounded">Register</button>
      </form>
    </div>
  );
};

export default AdminRegister;

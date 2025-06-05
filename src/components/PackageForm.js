// src/components/PackageForm.js
import React, { useState, useEffect } from "react";

const PackageForm = ({ onSubmit, initialData, onCancel }) => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
  });

  useEffect(() => {
    if (initialData) {
      setForm({
        title: initialData.title,
        description: initialData.description,
        price: initialData.price,
      });
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title || !form.price) {
      alert("Please enter title and price");
      return;
    }
    onSubmit({ ...form, price: Number(form.price) });
    setForm({ title: "", description: "", price: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <input
        type="text"
        placeholder="Title"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
        required
      />
      <input
        type="number"
        placeholder="Price"
        value={form.price}
        onChange={(e) => setForm({ ...form, price: e.target.value })}
        required
      />
      <textarea
        placeholder="Description"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
      />
      <button type="submit">{initialData ? "Update" : "Add"} Package</button>
      {initialData && <button type="button" onClick={onCancel}>Cancel</button>}
    </form>
  );
};

export default PackageForm;

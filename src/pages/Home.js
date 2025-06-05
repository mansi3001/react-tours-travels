// src/pages/Home.js
import React from "react";
import PopularDestinations from "../components/PopularDestination";

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section
        className="bg-cover bg-center h-[80vh] flex items-center justify-center text-white"
        style={{ backgroundImage: `url(https://images.unsplash.com/photo-1507525428034-b723cf961d3e)` }}
      >
        <div className="text-center bg-black bg-opacity-50 p-8 rounded-lg">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Explore the World with Us</h1>
          <p className="text-lg mb-6">Discover top-rated tours, adventures, and travel packages</p>
          <button className="bg-yellow-400 text-black px-6 py-2 rounded hover:bg-yellow-500 transition">
            Book Your Journey
          </button>
        </div>
      </section>

      {/* Destinations */}
      <PopularDestinations />

      {/* Why Choose Us */}
      <section className="bg-gray-100 py-12 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Why Choose Us?</h2>
          <div className="grid md:grid-cols-3 gap-6 text-left">
            <div className="p-6 bg-white rounded shadow">
              <h4 className="text-xl font-semibold mb-2">Best Price Guarantee</h4>
              <p>We offer competitive pricing for all our packages and custom tours.</p>
            </div>
            <div className="p-6 bg-white rounded shadow">
              <h4 className="text-xl font-semibold mb-2">Customizable Plans</h4>
              <p>Build your own travel experience based on your preferences.</p>
            </div>
            <div className="p-6 bg-white rounded shadow">
              <h4 className="text-xl font-semibold mb-2">24/7 Support</h4>
              <p>We’re always available to help you, anytime and anywhere.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

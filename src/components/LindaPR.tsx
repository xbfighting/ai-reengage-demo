import React from 'react'
export default function HolidayGreetingEmail() {
  return (
    <div className="max-w-xl mx-auto bg-white p-8 rounded-2xl shadow-md text-gray-800 font-sans">
      <h2 className="text-rose-600 text-2xl font-bold text-center mb-4">
        🌿 Linda, Renew Your Natural Radiance
      </h2>
      <p className="mb-4">Dear Linda,</p>
      <p className="mb-4">
        We admire your dedication to staying vibrant and graceful while embracing a natural look. To support
        your anti-aging journey, we’re excited to introduce a new treatment designed to enhance skin vitality
        with subtle, lasting results.
      </p>
      <p className="mb-4">
        Our <strong>Advanced Collagen Boost Therapy</strong> gently revitalizes your skin’s texture and
        firmness—perfect for maintaining the youthful glow you value.
      </p>

      <div className="bg-rose-50 p-5 rounded-lg mb-4">
        <h3 className="text-rose-600 font-semibold mb-2">🎁 Exclusive Offer for You:</h3>
        <ul className="list-disc list-inside text-sm space-y-1">
          <li>
            <strong>15% off</strong> your first session
          </li>
          <li>Complimentary skin hydration assessment</li>
          <li>
            Special booking priority through <strong>July 20</strong>
          </li>
        </ul>
      </div>

      <p className="mb-4">
        Don’t miss this chance to nurture your skin with care that respects your natural beauty and
        competitive spirit.
      </p>

      <div className="text-center">
        <a
          href="#"
          className="inline-block mt-4 px-6 py-3 bg-rose-600 text-white rounded-md font-semibold hover:bg-rose-700 transition"
        >
          ✨ Reserve Your Session
        </a>
      </div>

      <p className="mt-6">
        Warmly,
        <br />
        <strong>[Your Clinic Name]</strong>
      </p>

      <footer className="text-center text-sm text-gray-400 mt-8">
        © 2025 [Your Clinic Name] · All rights reserved
      </footer>
    </div>
  )
}

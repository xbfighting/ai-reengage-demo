import React from 'react'
export default function HolidayGreetingEmail() {
  return (
    <div className="max-w-xl mx-auto bg-white p-8 rounded-2xl shadow-lg text-gray-800 font-sans">
      <h2 className="text-pink-600 text-2xl font-bold text-center mb-4">
        💋 Holiday Glow-Up Just for You, Anna
      </h2>
      <p className="mb-4">Dear Anna,</p>
      <p className="mb-4">
        Wishing you a sparkling holiday season filled with joy, laughter—and of course, beauty that turns
        heads. ✨
      </p>
      <p className="mb-4">
        You’ve always embraced what’s <span className="text-pink-500 font-semibold">new and bold</span>, and
        we adore your fearless style. As someone who values trends and makes every moment Insta-worthy, we
        curated something special just for you:
      </p>

      <div className="bg-pink-50 p-5 rounded-lg mb-4">
        <h3 className="font-semibold mb-2 text-pink-600">🎁 Holiday Luxe Offer</h3>
        <ul className="list-disc list-inside space-y-1">
          <li>
            <span className="font-bold text-pink-500">20% off</span> Lip Enhancements (your signature glow!)
          </li>
          <li>
            Complimentary <em>Trend Look</em> consultation
          </li>
          <li>
            Limited-edition beauty gift set with bookings before <strong>December 20</strong>
          </li>
        </ul>
      </div>

      <p className="mb-4">
        Your loyalty means the world to us—and as someone who knows the value of a great recommendation, we’re
        sure you’ll love what’s coming next.
      </p>
      <p className="mb-4">Let’s make this season your most stunning yet.</p>
      <p className="font-semibold mb-6">Spots are filling fast—click below to reserve your glow-up.</p>

      <div className="text-center">
        <a
          href="#"
          className="inline-block px-6 py-3 bg-pink-500 text-white font-bold rounded-md hover:bg-pink-600 transition"
        >
          ✨ Book Now ✨
        </a>
      </div>

      <p className="mt-6">
        With warmth and glam,
        <br />
        <strong>[Your Clinic Name]</strong> 💖
      </p>

      <footer className="text-center text-sm text-gray-400 mt-8">
        © 2025 [Your Clinic Name] · All rights reserved
      </footer>
    </div>
  )
}

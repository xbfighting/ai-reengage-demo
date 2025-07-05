import React from 'react'
export default function HolidayGreetingEmail() {
  return (
    <div className="max-w-xl mx-auto bg-white p-8 rounded-2xl shadow-md text-gray-800 font-sans">
      <h2 className="text-rose-600 text-2xl font-bold text-center mb-4">
        🌟 Linda, Here’s to Radiant Holidays
      </h2>
      <p className="mb-4">Dear Linda,</p>
      <p className="mb-4">
        This season, we’re celebrating strong, graceful beauty—just like you. Your commitment to looking and
        feeling your best is inspiring, and we’re honored to be part of that journey.
      </p>
      <p className="mb-4">
        To thank you for your loyalty, we’ve created a festive offer tailored to your skin-care goals:
      </p>

      <div className="bg-rose-50 p-5 rounded-lg mb-4">
        <h3 className="text-rose-600 font-semibold mb-2">🎁 Holiday Radiance Offer</h3>
        <ul className="list-disc list-inside text-sm space-y-1">
          <li>
            <strong>Buy 1 Get 1 Free</strong> on select anti-aging facials
          </li>
          <li>
            Exclusive <em>Natural Glow</em> Botox refresh at 15% off
          </li>
          <li>Free skin vitality check-up (value ¥298)</li>
        </ul>
      </div>

      <p className="mb-4">
        Book before <strong>December 22</strong> and start the new year with confidence—naturally. Spots are
        limited!
      </p>

      <div className="text-center">
        <a
          href="#"
          className="inline-block mt-4 px-6 py-3 bg-rose-600 text-white rounded-md font-semibold hover:bg-rose-700 transition"
        >
          ✨ Reserve My Gift
        </a>
      </div>

      <p className="mt-6">
        With warmth and care,
        <br />
        <strong>[Your Clinic Name]</strong>
      </p>

      <footer className="text-center text-sm text-gray-400 mt-8">
        © 2025 [Your Clinic Name] · All rights reserved
      </footer>
    </div>
  )
}

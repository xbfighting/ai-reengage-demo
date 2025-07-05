import React from 'react'
export default function HolidayGreetingEmail() {
  return (
    <div className="max-w-xl mx-auto bg-white p-8 rounded-2xl shadow-md text-gray-800 font-sans">
      <h2 className="text-pink-600 text-2xl font-bold text-center mb-4">
        ✨ Anna, Discover Your Next Beauty Obsession
      </h2>
      <p className="mb-4">Hi Anna,</p>
      <p className="mb-4">
        You love standing out and setting trends, so we thought you’d be excited to hear about our newest
        luxury aesthetic treatment designed to elevate your look and keep you ahead of the curve.
      </p>
      <p className="mb-4">
        Introducing our <strong>Radiant Glow Lip Rejuvenation</strong>—a cutting-edge treatment that enhances
        fullness, defines contours, and adds a natural, irresistible shine. Perfect for a bold, social
        butterfly like you!
      </p>

      <div className="bg-pink-50 p-5 rounded-lg mb-4">
        <h3 className="text-pink-600 font-semibold mb-2">💄 Exclusive Offer Just for You:</h3>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>
            <strong>25% off</strong> your first Radiant Glow session
          </li>
          <li>Personalized style consultation based on 2025 beauty trends</li>
          <li>Priority booking with weekend availability</li>
        </ul>
      </div>

      <p className="mb-4">
        Book before <strong>December 15</strong> to claim your spot and keep your look fresh and fabulous for
        the holidays and beyond.
      </p>

      <div className="text-center">
        <a
          href="#"
          className="inline-block mt-4 px-6 py-3 bg-pink-500 text-white rounded-md font-semibold hover:bg-pink-600 transition"
        >
          💋 Reserve Your Glow Now
        </a>
      </div>

      <p className="mt-6">
        With glam & love,
        <br />
        <strong>[Your Clinic Name]</strong>
      </p>

      <footer className="text-center text-sm text-gray-400 mt-8">
        © 2025 [Your Clinic Name] · All rights reserved
      </footer>
    </div>
  )
}

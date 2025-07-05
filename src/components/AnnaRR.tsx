import React from 'react'
export default function HolidayGreetingEmail() {
  return (
    <div className="max-w-xl mx-auto bg-white p-8 rounded-2xl shadow-md text-gray-800 font-sans">
      <h2 className="text-pink-600 text-2xl font-bold text-center mb-4">
        💋 Anna, It’s Time to Refresh Your Perfect Look
      </h2>
      <p className="mb-4">Hi Anna,</p>
      <p className="mb-4">
        It’s been a few months since your gorgeous lip filler session—how are you loving the glow so far? To
        keep your look flawless and photo-ready, now is the perfect time for a gentle refresh.
      </p>
      <p className="mb-4">
        As someone who’s always ahead of the trend and shines on social media, we’ve prepared something just
        for you:
      </p>

      <div className="bg-pink-50 p-5 rounded-lg mb-4">
        <h3 className="text-pink-600 font-semibold mb-2">💄 Lip Refresh Exclusive</h3>
        <ul className="list-disc list-inside text-sm space-y-1">
          <li>
            <strong>15% off</strong> touch-up session before <strong>August 10</strong>
          </li>
          <li>Complimentary “Next Look” mini-consult based on 2025 trend forecasts</li>
          <li>Priority booking for weekend spots</li>
        </ul>
      </div>

      <p className="mb-4">
        Let’s keep your look as bold and beautiful as you are. Appointments fill quickly—don’t miss your
        preferred time.
      </p>

      <div className="text-center">
        <a
          href="#"
          className="inline-block mt-4 px-6 py-3 bg-pink-500 text-white rounded-md font-semibold hover:bg-pink-600 transition"
        >
          💫 Book My Touch-Up
        </a>
      </div>

      <p className="mt-6">
        With love & glam,
        <br />
        <strong>[Your Clinic Name]</strong>
      </p>

      <footer className="text-center text-sm text-gray-400 mt-8">
        © 2025 [Your Clinic Name] · All rights reserved
      </footer>
    </div>
  )
}

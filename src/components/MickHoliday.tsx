import React from 'react'
export default function HolidayGreetingEmail() {
  return (
    <div className="max-w-xl mx-auto bg-white p-8 rounded-2xl shadow-md text-gray-800 font-sans">
      <h2 className="text-blue-600 text-2xl font-semibold text-center mb-4">🎄 Season’s Greetings, Mike</h2>
      <p className="mb-4">Hi Mike,</p>
      <p className="mb-4">
        As the year winds down, we wanted to take a quiet moment to thank you for being part of our journey.
        Your dedication to self-care—done smartly and efficiently—continues to inspire us.
      </p>
      <p className="mb-4">
        To support your long-term hair restoration goals, we’ve prepared a private offer tailored just for
        you:
      </p>

      <div className="bg-blue-50 p-5 rounded-lg mb-4">
        <h3 className="text-blue-600 font-semibold mb-2">🎁 Holiday Confidence Offer</h3>
        <ul className="list-disc list-inside text-sm space-y-1">
          <li>
            <strong>15% off</strong> advanced hair maintenance treatments
          </li>
          <li>Optional 1-on-1 scalp check-in—no obligation, no pressure</li>
          <li>
            Valid through <strong>December 28</strong>
          </li>
        </ul>
      </div>

      <p className="mb-4">
        No noise, no fuss—just results that speak for themselves. Your time is valuable, and we’ll respect it.
      </p>
      <p className="text-center">
        <a
          href="#"
          className="inline-block mt-4 px-6 py-3 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition"
        >
          Secure Your Offer
        </a>
      </p>

      <p className="mt-6">
        Warm regards,
        <br />
        <strong>[Your Clinic Name]</strong>
      </p>

      <footer className="text-center text-sm text-gray-400 mt-8">
        © 2025 [Your Clinic Name] · All rights reserved
      </footer>
    </div>
  )
}

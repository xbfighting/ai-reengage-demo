import React from 'react'
export default function HolidayGreetingEmail() {
  return (
    <div className="max-w-xl mx-auto bg-white p-8 rounded-2xl shadow text-gray-800 font-sans">
      <h2 className="text-blue-600 text-2xl font-semibold text-center mb-4">
        💼 Mike, Optimize Your Results—Quietly & Effectively
      </h2>
      <p className="mb-4">Hi Mike,</p>
      <p className="mb-4">
        It’s been some time since your hair transplant journey began. To ensure lasting, natural-looking
        results, a timely check-in and maintenance session can make all the difference.
      </p>
      <p className="mb-4">
        We know your time is valuable, so we’ve prepared a simple, discreet follow-up tailored for your
        goals—no pressure, no push.
      </p>

      <div className="bg-blue-50 p-5 rounded-lg mb-4">
        <h3 className="text-blue-600 font-semibold mb-2">🔧 Smart Maintenance Offer</h3>
        <ul className="list-disc list-inside text-sm space-y-1">
          <li>
            <strong>Complimentary scalp condition check</strong>
          </li>
          <li>
            10% off hair strengthening therapy (for bookings before <strong>July 25</strong>)
          </li>
          <li>Quiet, efficient appointments with full privacy</li>
        </ul>
      </div>

      <p className="mb-4">
        A small step now can protect the investment you’ve already made. Schedule on your terms—secure,
        direct, and convenient.
      </p>

      <div className="text-center">
        <a
          href="#"
          className="inline-block mt-4 px-6 py-3 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition"
        >
          📅 Book Maintenance Now
        </a>
      </div>

      <p className="mt-6">
        Discreetly yours,
        <br />
        <strong>[Your Clinic Name]</strong>
      </p>

      <footer className="text-center text-sm text-gray-400 mt-8">
        © 2025 [Your Clinic Name] · All rights reserved
      </footer>
    </div>
  )
}

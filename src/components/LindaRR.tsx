import React from 'react'
export default function HolidayGreetingEmail() {
  return (
    <div className="max-w-xl mx-auto bg-white p-8 rounded-2xl shadow-md text-gray-800 font-sans">
      <h2 className="text-rose-600 text-2xl font-bold text-center mb-4">
        ✨ Linda, Let’s Keep Your Glow Going Strong
      </h2>
      <p className="mb-4">Dear Linda,</p>
      <p className="mb-4">
        Your beauty journey is one of strength and grace—and we’re proud to be part of it. It’s been a few
        months since your last Botox treatment, and now is the perfect time to schedule your follow-up.
      </p>
      <p className="mb-4">
        Consistency is key when it comes to maintaining a naturally youthful look—especially for someone as
        active and radiant as you.
      </p>

      <div className="bg-rose-50 p-5 rounded-lg mb-4">
        <h3 className="text-rose-600 font-semibold mb-2">🎁 Stay Smooth, Stay You</h3>
        <ul className="list-disc list-inside text-sm space-y-1">
          <li>
            <strong>Limited-time 20% off</strong> Botox maintenance session
          </li>
          <li>Free skin firmness & hydration check-up</li>
          <li>
            Extra bonus for early birds—book before <strong>July 20</strong>
          </li>
        </ul>
      </div>

      <p className="mb-4">
        You’ve come this far—let’s keep your results long-lasting and elegant. Don’t wait, our most popular
        slots go fast!
      </p>

      <div className="text-center">
        <a
          href="#"
          className="inline-block mt-4 px-6 py-3 bg-rose-600 text-white rounded-md font-semibold hover:bg-rose-700 transition"
        >
          💫 Book My Follow-Up
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

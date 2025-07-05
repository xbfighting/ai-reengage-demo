import React from 'react'
export default function HolidayGreetingEmail() {
  return (
    <div className="max-w-xl mx-auto bg-white p-8 rounded-2xl shadow text-gray-800 font-sans">
      <h2 className="text-blue-600 text-2xl font-semibold text-center mb-4">
        🧴 Mike, A Smart Boost for Your Hair Routine
      </h2>
      <p className="mb-4">Hi Mike,</p>
      <p className="mb-4">
        We know you value long-term results with minimal fuss. That’s why we’re excited to introduce a new
        treatment designed for efficient, low-maintenance care—perfect for your lifestyle.
      </p>
      <p className="mb-4">
        Our new <strong>Advanced Scalp Recovery Therapy</strong> supports stronger follicles, better density,
        and scalp balance—all in a discreet 30-minute session.
      </p>

      <div className="bg-blue-50 p-5 rounded-lg mb-4">
        <h3 className="text-blue-600 font-semibold mb-2">🧠 Why It’s Right for You:</h3>
        <ul className="list-disc list-inside text-sm space-y-1">
          <li>Clinically backed for post-transplant care</li>
          <li>Non-invasive, no downtime</li>
          <li>
            Intro offer: <strong>12% off</strong> through <strong>July 31</strong>
          </li>
        </ul>
      </div>

      <p className="mb-4">
        No noise, no hassle—just a smart choice to stay ahead. Quietly effective, just like you prefer.
      </p>

      <div className="text-center">
        <a
          href="#"
          className="inline-block mt-4 px-6 py-3 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition"
        >
          🔍 Learn More & Book
        </a>
      </div>

      <p className="mt-6">
        To your continued confidence,
        <br />
        <strong>[Your Clinic Name]</strong>
      </p>

      <footer className="text-center text-sm text-gray-400 mt-8">
        © 2025 [Your Clinic Name] · All rights reserved
      </footer>
    </div>
  )
}

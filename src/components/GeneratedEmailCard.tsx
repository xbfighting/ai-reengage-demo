'use client'

import { useEffect, useState } from 'react'

export default function GeneratedEmailCard({ emailText }: { emailText: string }) {
  const [copied, setCopied] = useState(false)
  const [score, setScore] = useState<number | null>(null)

  useEffect(() => {
    // Simulate score generation, floating between 60 and 95
    const simulatedScore = Math.floor(60 + Math.random() * 35)
    setScore(simulatedScore)
  }, [emailText])

  const handleCopy = async () => {
    await navigator.clipboard.writeText(emailText)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="mt-6 p-4 bg-white rounded-xl shadow relative">
      <h2 className="text-xl font-bold mb-2">Generated Marketing Email:</h2>
      <pre className="whitespace-pre-wrap mb-4">{emailText}</pre>
      {score !== null && (
        <div className="mt-2 text-sm text-green-700 font-semibold">
          Simulated Repurchase Potential Score: {score} (The higher the score, the more likely to convert)
        </div>
      )}
      <button
        onClick={handleCopy}
        className="absolute top-4 right-4 bg-gray-200 hover:bg-gray-300 text-sm px-3 py-1 rounded"
      >
        {copied ? 'Copied!' : 'Copy'}
      </button>
    </div>
  )
}

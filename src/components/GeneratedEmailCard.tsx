'use client'

import { useEffect, useState } from 'react'
import AnanHoliday from '@/components/AnnaHoliday'
import MickHoliday from '@/components/MickHoliday'
import LindaHoliday from '@/components/LindaHoliday'
import { UserProfile } from '@/lib/types'
import AnnaPR from './AnnaPR'
import MickPR from './MickPR'
import LindaPR from './LindaPR'
import AnnaRR from './AnnaRR'
import MickRR from './MickRR'
import LindaRR from './LindaRR'

export default function GeneratedEmailCard(
  { currentUser, scene }: { currentUser: UserProfile | null; scene: string },
) {
  const [copied, setCopied] = useState(false)
  const [score, setScore] = useState<number | null>(null)

  useEffect(() => {
    // Simulate score generation, floating between 60 and 95
    const simulatedScore = Math.floor(60 + Math.random() * 35)
    setScore(simulatedScore)
  }, [currentUser?.name])

  const handleCopy = async () => {
    // await navigator.clipboard.writeText(emailText)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="p-4 bg-white rounded-xl shadow relative">
      <h2 className="text-xl font-bold mb-2">Generated Marketing Email:</h2>
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
      {(() => {
        switch (currentUser?.name + scene) {
          case 'AnnaHoliday Greeting':
            return <AnanHoliday />
          case 'MikeHoliday Greeting':
            return <MickHoliday />
          case 'LindaHoliday Greeting':
            return <LindaHoliday />
          case 'AnnaNew Product Recommendation':
            return <AnnaPR />
          case 'MikeNew Product Recommendation':
            return <MickPR />
          case 'LindaNew Product Recommendation':
            return <LindaPR />
          case 'AnnaRepurchase Reminder':
            return <AnnaRR />
          case 'MikeRepurchase Reminder':
            return <MickRR />
          case 'LindaRepurchase Reminder':
            return <LindaRR />
          default:
            return null
        }
      })()}
    </div>
  )
}

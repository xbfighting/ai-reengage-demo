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
    const emailContent = document.querySelector('.generated-email-content')?.innerHTML
    if (emailContent) {
      await navigator.clipboard.writeText(emailContent)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div className="p-4 bg-white rounded-xl shadow relative">
      <h2 className="mt-4 text-xl font-bold mb-2">Generated Marketing Email:</h2>
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
      <div className="generated-email-content">
        {(() => {
          switch (currentUser?.name + scene) {
            case 'Annaholiday_greeting':
              return <AnanHoliday />
            case 'Mikeholiday_greeting':
              return <MickHoliday />
            case 'Lindaholiday_greeting':
              return <LindaHoliday />
            case 'Annanew_product_recommendation':
              return <AnnaPR />
            case 'Mikenew_product_recommendation':
              return <MickPR />
            case 'Lindanew_product_recommendation':
              return <LindaPR />
            case 'Annarepurchase_reminder':
              return <AnnaRR />
            case 'Mikerepurchase_reminder':
              return <MickRR />
            case 'Lindarepurchase_reminder':
              return <LindaRR />
            default:
              return null
          }
        })()}
      </div>
    </div>
  )
}

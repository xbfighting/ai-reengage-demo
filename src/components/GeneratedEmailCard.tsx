'use client'

import { useState } from 'react'
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

  const handleCopy = async () => {
    const emailContent = document.querySelector('.generated-email-content')?.innerHTML
    if (emailContent) {
      await navigator.clipboard.writeText(emailContent)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg max-w-2xl mx-auto border border-gray-200 p-8 flex flex-col gap-8 items-start">
      <div>
        <div className="flex items-center justify-between w-full mb-4 gap-4">
          <h2 className="text-2xl font-bold text-blue-700">AI Powered Marketing Email:</h2>
          <button
            onClick={handleCopy}
            className="bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500 text-white text-sm px-4 py-1.5 rounded-xl font-bold shadow transition focus:outline-none focus:ring-2 focus:ring-blue-400"
            style={{ minWidth: 80 }}
          >
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>

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
    </div>
  )
}

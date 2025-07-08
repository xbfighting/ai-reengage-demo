'use client'

import { useState } from 'react'
import { UserProfile } from '@/lib/types'
import { copyToClipboard } from '@/lib/utils'

interface EmailScore {
  overall?: number
  personalization?: number
  engagement?: number
  actionability?: number
  brandAlignment?: number
  explanation?: string
  suggestions?: string[]
}

interface DynamicEmailCardProps {
  currentUser: UserProfile | null
  emailContent: string
  emailScore?: EmailScore
  prompt?: string
}

export default function DynamicEmailCard({
  currentUser,
  emailContent,
  emailScore,
  prompt
}: DynamicEmailCardProps) {
  const [copied, setCopied] = useState(false)
  const [copyError, setCopyError] = useState(false)
  const [showPrompt, setShowPrompt] = useState(false)
  const [showScore, setShowScore] = useState(false)

  const handleCopy = async () => {
    const emailElement = document.querySelector('.dynamic-email-content')
    if (!emailElement) {
      setCopyError(true)
      setTimeout(() => setCopyError(false), 2000)
      return
    }

    // 格式化邮件内容 - 直接使用文本内容
    const formattedContent = emailContent || emailElement.textContent || ''

    const success = await copyToClipboard(formattedContent)

    if (success) {
      setCopied(true)
      setCopyError(false)
      setTimeout(() => setCopied(false), 2000)
    } else {
      setCopyError(true)
      setTimeout(() => setCopyError(false), 2000)
    }
  }

  const getButtonText = () => {
    if (copied) return '✓ Copied!'
    if (copyError) return '✗ Failed'
    return 'Copy'
  }

  const getButtonStyle = () => {
    if (copied) return 'bg-green-500 hover:bg-green-600'
    if (copyError) return 'bg-red-500 hover:bg-red-600'
    return 'bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500'
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg max-w-2xl mx-auto border border-gray-200 p-8 flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between w-full">
        <h2 className="text-2xl font-bold text-blue-700">
          🤖 AI Generated Email for {currentUser?.name}
        </h2>
        <button
          onClick={handleCopy}
          className={`${getButtonStyle()} text-white text-sm px-4 py-1.5 rounded-xl font-bold shadow transition focus:outline-none focus:ring-2 focus:ring-blue-400`}
          style={{ minWidth: 80 }}
        >
          {getButtonText()}
        </button>
      </div>

      {/* Email Content */}
      <div className="dynamic-email-content bg-gray-50 rounded-lg p-6 border border-gray-200">
        <div className="prose prose-sm max-w-none">
          {emailContent ? (
            <div className="whitespace-pre-wrap font-sans text-gray-800 leading-relaxed">
              {emailContent}
            </div>
          ) : (
            <div className="text-gray-500 italic">No email content available</div>
          )}
        </div>
      </div>

      {/* Email Score Section */}
      {emailScore && (
        <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
          <div
            className="flex items-center justify-between cursor-pointer"
            onClick={() => setShowScore(!showScore)}
          >
            <h3 className="font-semibold text-blue-800 flex items-center gap-2">
              📊 Email Quality Score
            </h3>
            <div className="flex items-center gap-2">
              <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                {emailScore.overall || 'N/A'}/100
              </span>
              <span className="text-blue-600 text-sm">
                {showScore ? 'Hide' : 'Show'} Details
              </span>
            </div>
          </div>

          {showScore && (
            <div className="mt-4 space-y-3">
              {/* Score Breakdown */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { label: 'Personalization', value: emailScore.personalization },
                  { label: 'Engagement', value: emailScore.engagement },
                  { label: 'Actionability', value: emailScore.actionability },
                  { label: 'Brand Alignment', value: emailScore.brandAlignment }
                ].map((metric) => (
                  <div key={metric.label} className="text-center">
                    <div className="text-xs text-gray-600 mb-1">{metric.label}</div>
                    <div className="text-lg font-bold text-blue-700">{metric.value || 'N/A'}</div>
                  </div>
                ))}
              </div>

              {/* Explanation */}
              {emailScore.explanation && (
                <div className="mt-3">
                  <div className="text-sm font-medium text-gray-700 mb-1">Analysis:</div>
                  <div className="text-sm text-gray-600">{emailScore.explanation}</div>
                </div>
              )}

              {/* Suggestions */}
              {emailScore.suggestions && emailScore.suggestions.length > 0 && (
                <div className="mt-3">
                  <div className="text-sm font-medium text-gray-700 mb-2">Improvement Suggestions:</div>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {emailScore.suggestions.map((suggestion: string, index: number) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-blue-500 mt-0.5">•</span>
                        <span>{suggestion}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Prompt Debug Section */}
      {prompt && (
        <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
          <div
            className="flex items-center justify-between cursor-pointer"
            onClick={() => setShowPrompt(!showPrompt)}
          >
            <h3 className="font-semibold text-yellow-800">🔍 Prompt for Debugging</h3>
            <span className="text-yellow-600 text-sm">
              {showPrompt ? 'Hide' : 'Show'} Prompt
            </span>
          </div>

          {showPrompt && (
            <div className="mt-3">
              <pre className="whitespace-pre-wrap bg-yellow-100 p-3 rounded border text-xs text-gray-700 overflow-auto max-h-64">
                {prompt}
              </pre>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

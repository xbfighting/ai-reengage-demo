'use client'

import { useState, useEffect } from 'react'
import { UserProfile } from '@/lib/types'
import { copyToClipboard } from '@/lib/utils'
import { analytics } from '@/lib/analytics'

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
  onRegenerateEmail?: (customPrompt?: string, editedContent?: string) => Promise<void>
  templateId?: string
}

export default function DynamicEmailCard({
  currentUser,
  emailContent,
  emailScore,
  prompt,
  onRegenerateEmail,
  templateId
}: DynamicEmailCardProps) {
  const [copied, setCopied] = useState(false)
  const [copyError, setCopyError] = useState(false)
  const [showPrompt, setShowPrompt] = useState(false)
  const [showScore, setShowScore] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [editedContent, setEditedContent] = useState(emailContent)
  const [customPrompt, setCustomPrompt] = useState('')
  const [showCustomPrompt, setShowCustomPrompt] = useState(false)
  const [isRegenerating, setIsRegenerating] = useState(false)

  // 当 emailContent 改变时更新 editedContent
  useEffect(() => {
    setEditedContent(emailContent)
    setIsEditing(false)
    setCustomPrompt('')
    setShowCustomPrompt(false)
  }, [emailContent])

  const handleCopy = async () => {
    // 使用当前显示的内容（可能是编辑后的内容）
    const contentToCopy = editedContent || emailContent

    const success = await copyToClipboard(contentToCopy)

    if (success) {
      setCopied(true)
      setCopyError(false)
      setTimeout(() => setCopied(false), 2000)

      // 记录复制行为
      analytics.track('email_content_copied', {
        user: currentUser?.name,
        templateId,
        contentLength: contentToCopy.length,
        wasEdited: editedContent !== emailContent
      })
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
            <div className="space-y-4">
              {/* Edit Mode Toggle */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setIsEditing(!isEditing)
                      if (!isEditing) {
                        setEditedContent(emailContent)
                        analytics.track('email_edit_mode_toggle', {
                          user: currentUser?.name,
                          templateId,
                          action: 'enable_edit'
                        })
                      }
                    }}
                    className={`px-3 py-1 rounded-md text-sm font-medium transition ${
                      isEditing
                        ? 'bg-orange-100 text-orange-700 border border-orange-200'
                        : 'bg-blue-100 text-blue-700 border border-blue-200 hover:bg-blue-200'
                    }`}
                  >
                    {isEditing ? '📝 Editing' : '✏️ Edit'}
                  </button>

                  {isEditing && (
                    <button
                      onClick={() => {
                        setIsEditing(false)
                        setEditedContent(emailContent)
                        analytics.track('email_edit_cancelled', {
                          user: currentUser?.name,
                          templateId
                        })
                      }}
                      className="px-3 py-1 rounded-md text-sm font-medium bg-gray-100 text-gray-600 border border-gray-200 hover:bg-gray-200 transition"
                    >
                      Cancel
                    </button>
                  )}
                </div>

                {/* Custom Prompt Toggle */}
                <button
                  onClick={() => {
                    setShowCustomPrompt(!showCustomPrompt)
                    if (!showCustomPrompt) {
                      analytics.track('custom_prompt_toggle', {
                        user: currentUser?.name,
                        templateId,
                        action: 'show'
                      })
                    }
                  }}
                  className="px-3 py-1 rounded-md text-sm font-medium bg-purple-100 text-purple-700 border border-purple-200 hover:bg-purple-200 transition"
                >
                  {showCustomPrompt ? '🎯 Hide Prompt' : '🎯 Custom Prompt'}
                </button>
              </div>

              {/* Custom Prompt Input */}
              {showCustomPrompt && (
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Additional Instructions (optional):
                  </label>
                  <textarea
                    value={customPrompt}
                    onChange={(e) => setCustomPrompt(e.target.value)}
                    placeholder="e.g., Make it more formal, add urgency, mention specific benefits..."
                    className="w-full p-3 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    rows={3}
                  />
                </div>
              )}

              {/* Email Content Display/Edit */}
              {isEditing ? (
                <div className="space-y-3">
                  <textarea
                    value={editedContent}
                    onChange={(e) => setEditedContent(e.target.value)}
                    className="w-full p-4 border border-gray-300 rounded-md text-sm font-sans leading-relaxed focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    rows={12}
                    placeholder="Edit your email content here..."
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setIsEditing(false)
                        analytics.track('email_content_saved', {
                          user: currentUser?.name,
                          templateId,
                          contentLength: editedContent.length,
                          wasModified: editedContent !== emailContent
                        })
                      }}
                      className="px-4 py-2 bg-green-600 text-white rounded-md text-sm font-medium hover:bg-green-700 transition"
                    >
                      ✓ Save Changes
                    </button>
                    <button
                      onClick={async () => {
                        if (onRegenerateEmail) {
                          setIsRegenerating(true)
                          analytics.track('email_regenerate_with_edit', {
                            user: currentUser?.name,
                            templateId,
                            hasCustomPrompt: !!customPrompt.trim(),
                            hasEditedContent: editedContent !== emailContent
                          })
                          await onRegenerateEmail(customPrompt.trim() || undefined, editedContent)
                          setIsRegenerating(false)
                        }
                      }}
                      disabled={isRegenerating}
                      className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
                    >
                      {isRegenerating ? '🔄 Regenerating...' : '🔄 Regenerate'}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="whitespace-pre-wrap font-sans text-gray-800 leading-relaxed">
                  {editedContent}
                </div>
              )}
            </div>
          ) : (
            <div className="text-gray-500 italic">No email content available</div>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      {onRegenerateEmail && (
        <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-200">
          <button
            onClick={async () => {
              setIsRegenerating(true)
              analytics.track('email_regenerate_simple', {
                user: currentUser?.name,
                templateId
              })
              await onRegenerateEmail()
              setIsRegenerating(false)
            }}
            disabled={isRegenerating}
            className="px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500 text-white rounded-md text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed transition shadow"
          >
            {isRegenerating ? '🔄 Regenerating...' : '🔄 Regenerate Email'}
          </button>

          {customPrompt.trim() && (
            <button
              onClick={async () => {
                setIsRegenerating(true)
                analytics.track('email_regenerate_with_custom_prompt', {
                  user: currentUser?.name,
                  templateId,
                  promptLength: customPrompt.length
                })
                await onRegenerateEmail(customPrompt.trim())
                setIsRegenerating(false)
              }}
              disabled={isRegenerating}
              className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-400 hover:from-purple-600 hover:to-pink-500 text-white rounded-md text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed transition shadow"
            >
              {isRegenerating ? '🔄 Regenerating...' : '🎯 Regenerate with Custom Prompt'}
            </button>
          )}
        </div>
      )}

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

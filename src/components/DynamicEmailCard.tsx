'use client'

import { useState, useEffect } from 'react'
import { UserProfile } from '@/lib/types'
import { copyToClipboard } from '@/lib/utils'
import { analytics } from '@/lib/analytics'
import { Button } from '@/components/ui/Button'
import { Textarea } from '@/components/ui/Textarea'

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

  return (
    <div className="bg-white rounded-2xl shadow-xl max-w-2xl mx-auto border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-6 border-b border-gray-100">
        <div className="flex items-center justify-between w-full">
          <h2 className="text-xl font-bold text-blue-800 flex items-center gap-2">
            <span className="text-2xl">🤖</span>
            AI Generated Email for {currentUser?.name}
          </h2>
          <Button
            onClick={handleCopy}
            variant={copied ? 'success' : copyError ? 'danger' : 'primary'}
            size="sm"
            className="min-w-[80px]"
          >
            {getButtonText()}
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-6">
        {/* Email Content */}
        <div className="dynamic-email-content bg-gray-50 rounded-xl p-5 border border-gray-200">
          <div className="prose prose-sm max-w-none">
            {emailContent ? (
              <div className="space-y-4">
                {/* Edit Mode Toggle */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Button
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
                      variant={isEditing ? 'warning' : 'outline'}
                      size="sm"
                      icon={isEditing ? '📝' : '✏️'}
                    >
                      {isEditing ? 'Editing' : 'Edit'}
                    </Button>

                    {isEditing && (
                      <Button
                        onClick={() => {
                          setIsEditing(false)
                          setEditedContent(emailContent)
                          analytics.track('email_edit_cancelled', {
                            user: currentUser?.name,
                            templateId
                          })
                        }}
                        variant="ghost"
                        size="sm"
                      >
                        Cancel
                      </Button>
                    )}
                  </div>

                  {/* Custom Prompt Toggle */}
                  <Button
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
                    variant="gradient"
                    size="sm"
                    icon="🎯"
                  >
                    {showCustomPrompt ? 'Hide Prompt' : 'Custom Prompt'}
                  </Button>
                </div>

                {/* Custom Prompt Input */}
                {showCustomPrompt && (
                  <Textarea
                    label="Additional Instructions (optional)"
                    value={customPrompt}
                    onChange={(e) => setCustomPrompt(e.target.value)}
                    placeholder="e.g., Make it more formal, add urgency, mention specific benefits..."
                    rows={3}
                    helperText="These instructions will be used to customize the email generation."
                  />
                )}

                {/* Email Content Display/Edit */}
                {isEditing ? (
                  <div className="space-y-3">
                    <Textarea
                      label="Edit Email Content"
                      value={editedContent}
                      onChange={(e) => setEditedContent(e.target.value)}
                      placeholder="Edit your email content here..."
                      rows={12}
                      className="font-sans leading-relaxed"
                      helperText="Make your edits and click 'Save Changes' to apply them."
                    />
                    <div className="flex gap-2">
                      <Button
                        onClick={() => {
                          setIsEditing(false)
                          analytics.track('email_content_saved', {
                            user: currentUser?.name,
                            templateId,
                            contentLength: editedContent.length,
                            wasModified: editedContent !== emailContent
                          })
                        }}
                        variant="success"
                        size="sm"
                        icon="✓"
                      >
                        Save Changes
                      </Button>
                      <Button
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
                        variant="primary"
                        size="sm"
                        loading={isRegenerating}
                        icon={isRegenerating ? '🔄' : '🔄'}
                      >
                        {isRegenerating ? 'Regenerating...' : 'Regenerate'}
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="whitespace-pre-wrap font-sans text-gray-800 leading-relaxed bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
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
          <div className="flex flex-wrap gap-3 p-4 bg-gray-50 rounded-xl border border-gray-200">
            <Button
              onClick={async () => {
                setIsRegenerating(true)
                analytics.track('email_regenerate_simple', {
                  user: currentUser?.name,
                  templateId
                })
                await onRegenerateEmail()
                setIsRegenerating(false)
              }}
              variant="primary"
              size="md"
              loading={isRegenerating}
              icon="🔄"
            >
              {isRegenerating ? 'Regenerating...' : 'Regenerate Email'}
            </Button>

            {customPrompt.trim() && (
              <Button
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
                variant="gradient"
                size="md"
                loading={isRegenerating}
                icon="🎯"
              >
                {isRegenerating ? 'Regenerating...' : 'Regenerate with Custom Prompt'}
              </Button>
            )}
          </div>
        )}

        {/* Email Score Section */}
        {emailScore && (
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-5 border border-blue-200">
            <div
              className="flex items-center justify-between cursor-pointer hover:bg-blue-50 p-2 rounded-lg transition-colors"
              onClick={() => setShowScore(!showScore)}
            >
              <h3 className="font-semibold text-blue-800 flex items-center gap-2">
                <span className="text-lg">📊</span>
                Email Quality Score
              </h3>
              <div className="flex items-center gap-3">
                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-sm">
                  {emailScore.overall || 'N/A'}/100
                </span>
                <span className="text-blue-600 text-sm font-medium">
                  {showScore ? 'Hide' : 'Show'} Details
                </span>
              </div>
            </div>

            {showScore && (
              <div className="mt-4 space-y-4">
                {/* Score Breakdown */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { label: 'Personalization', value: emailScore.personalization, color: 'from-green-500 to-emerald-500' },
                    { label: 'Engagement', value: emailScore.engagement, color: 'from-purple-500 to-violet-500' },
                    { label: 'Actionability', value: emailScore.actionability, color: 'from-orange-500 to-amber-500' },
                    { label: 'Brand Alignment', value: emailScore.brandAlignment, color: 'from-pink-500 to-rose-500' }
                  ].map((metric) => (
                    <div key={metric.label} className="text-center bg-white rounded-lg p-3 shadow-sm border border-gray-200">
                      <div className="text-xs text-gray-600 mb-1 font-medium">{metric.label}</div>
                      <div className={`text-lg font-bold bg-gradient-to-r ${metric.color} bg-clip-text text-transparent`}>
                        {metric.value || 'N/A'}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Explanation */}
                {emailScore.explanation && (
                  <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
                    <div className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                      <span>💡</span>
                      Analysis
                    </div>
                    <div className="text-sm text-gray-600 leading-relaxed">{emailScore.explanation}</div>
                  </div>
                )}

                {/* Suggestions */}
                {emailScore.suggestions && emailScore.suggestions.length > 0 && (
                  <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
                    <div className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
                      <span>✨</span>
                      Improvement Suggestions
                    </div>
                    <ul className="text-sm text-gray-600 space-y-2">
                      {emailScore.suggestions.map((suggestion: string, index: number) => (
                        <li key={index} className="flex items-start gap-2 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                          <span className="text-blue-500 mt-0.5 font-bold">•</span>
                          <span className="leading-relaxed">{suggestion}</span>
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
          <div className="bg-gradient-to-r from-amber-50 to-yellow-50 rounded-xl p-5 border border-amber-200">
            <div
              className="flex items-center justify-between cursor-pointer hover:bg-amber-50 p-2 rounded-lg transition-colors"
              onClick={() => setShowPrompt(!showPrompt)}
            >
              <h3 className="font-semibold text-amber-800 flex items-center gap-2">
                <span className="text-lg">🔍</span>
                Prompt for Debugging
              </h3>
              <span className="text-amber-600 text-sm font-medium">
                {showPrompt ? 'Hide' : 'Show'} Prompt
              </span>
            </div>

            {showPrompt && (
              <div className="mt-4">
                <pre className="whitespace-pre-wrap bg-white p-4 rounded-lg border border-amber-200 text-xs text-gray-700 overflow-auto max-h-64 shadow-sm">
                  {prompt}
                </pre>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

'use client'

import { Suspense, useState, useEffect } from 'react'
import UserProfileSelector from '@/components/UserProfileCard'
import { UserProfile } from '@/lib/types'
import { useSearchParams } from 'next/navigation'
import userProfiles from '@/lib/userProfiles.json'
import { apiService, EmailScore } from '@/lib/api'
import { LoadingSpinner, ErrorState, EmptyState } from '@/components/ui/LoadingStates'
import DynamicEmailCard from '@/components/DynamicEmailCard'

function AiMarketingPreviewContent() {
  const searchParams = useSearchParams()
  const userParam = searchParams.get('user')
  const templateParam = searchParams.get('template')

  const [promptText, setPromptText] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null)
  const [scene, setScene] = useState<string>('holiday_greeting')
  const [showEmail, setShowEmail] = useState(false)
  const [emailContent, setEmailContent] = useState<string>('')
  const [emailScore, setEmailScore] = useState<EmailScore | null>(null)
  const [error, setError] = useState<string | null>(null)

  // 真正的API调用邮件生成
  const handleGenerate = async (userProfile: UserProfile, templateId: string) => {
    setLoading(true)
    setShowEmail(false)
    setError(null)

    try {
      // 根据templateId设置默认变量
      const getDefaultVariables = (templateId: string): Record<string, string | number> => {
        const baseVars: Record<string, string | number> = {}

        switch (templateId) {
          case 'holiday_greeting':
            return {
              holidayName: 'Holiday Season',
              discount: '20',
              primaryProcedure: userProfile.surgery_history?.[0]?.type || 'Botox',
              validUntil: '2025-12-31',
              location: userProfile.locationLevel || 'your area'
            }
          case 'repurchase_reminder':
            return {
              monthsSince: userProfile.monthsSince?.toString() || '12',
              lastProcedure: userProfile.surgery_history?.[userProfile.surgery_history.length - 1]?.type || 'last treatment',
              primaryProcedure: userProfile.surgery_history?.[0]?.type || 'Botox',
              discount: '15',
              location: userProfile.locationLevel || 'your area'
            }
          case 'new_product_recommendation':
            return {
              newProductName: 'Advanced Skin Rejuvenation',
              primaryProcedure: userProfile.surgery_history?.[0]?.type || 'aesthetic treatments',
              referralSource: userProfile.referralSource || 'valued customer',
              trialDiscount: '25'
            }
          default:
            return baseVars
        }
      }

      const variables = getDefaultVariables(templateId)

      // 调用API生成邮件
      const response = await apiService.generateEmail({
        userInfo: userProfile,
        templateId: templateId,
        variables: variables
      })

      setEmailContent(response.emailText)
      setEmailScore(response.emailScore || null)
      setPromptText(response.prompt)
      setCurrentUser(userProfile)
      setScene(templateId)
      setShowEmail(true)

    } catch (err: unknown) {
      console.error('Error generating email:', err)
      const errorMessage = err instanceof Error ? err.message : 'Failed to generate email'
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (userParam && templateParam) {
      const profiles: { label: string; profile: UserProfile }[] = userProfiles as {
        label: string
        profile: UserProfile
      }[]
      const user = profiles.find((p) => p.profile.name === userParam)?.profile
      if (user) {
        // scene为template id
        handleGenerate(user, templateParam)
      }
    }
    // eslint-disable-next-line
  }, [])

  return (
    <main className="min-h-screen bg-gray-100 p-6 relative">
      <button
        onClick={() => window.close()}
        className="fixed top-4 right-4 z-50 bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500 text-white font-bold px-4 py-2 rounded-full shadow transition focus:outline-none focus:ring-2 focus:ring-blue-400"
        title="Close this tab"
      >
        ✕ Close
      </button>
      <div className="flex flex-col md:flex-row gap-8 max-w-7xl mx-auto">
        {/* Left: User Information */}
        <div className="md:w-1/2 w-full">
          {userParam ? (
            <UserProfileSelector username={userParam} />
          ) : (
            <div className="text-gray-400">No user selected.</div>
          )}
        </div>
        {/* Right: Email Content and Debug Info */}
        <div className="md:w-1/2 w-full flex flex-col gap-6 justify-start">
          {/* Error State */}
          {error && (
            <ErrorState
              message={error}
              onRetry={() => currentUser && handleGenerate(currentUser, scene)}
            />
          )}

          {/* Empty State */}
          {!loading && !showEmail && !error && (
            <EmptyState message="Email content will appear here after generation" />
          )}

          {/* Loading State */}
          {loading && (
            <LoadingSpinner message="Generating personalized email..." />
          )}

          {/* Generated Email */}
          {showEmail && !loading && !error && emailContent && (
            <DynamicEmailCard
              currentUser={currentUser}
              emailContent={emailContent}
              emailScore={emailScore || undefined}
              prompt={promptText || undefined}
            />
          )}
        </div>
      </div>
    </main>
  )
}

export default function Home() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-blue-400 text-lg">Loading...</div>}>
      <AiMarketingPreviewContent />
    </Suspense>
  )
}

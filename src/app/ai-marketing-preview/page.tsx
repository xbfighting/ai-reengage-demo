'use client'

import { Suspense, useState, useEffect } from 'react'
import UserProfileSelector from '@/components/UserProfileCard'
import { UserProfile } from '@/lib/types'
import { generatePrompt } from '@/lib/prompts'
import GeneratedEmailCard from '@/components/GeneratedEmailCard'
import { useSearchParams } from 'next/navigation'
import userProfiles from '@/lib/userProfiles.json'

function AiMarketingPreviewContent() {
  const searchParams = useSearchParams()
  const userParam = searchParams.get('user')
  const templateParam = searchParams.get('template')

  const [promptText, setPromptText] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null)
  const [scene, setScene] = useState<string>('holiday')
  const [showEmail, setShowEmail] = useState(false)
  const [showPrompt, setShowPrompt] = useState(false) // New state for controlling prompt visibility

  // Mock email generation (searching JSON based on name and scene)
  const handleGenerate = async (userProfile: UserProfile, scene: string) => {
    setLoading(true)
    setShowEmail(false)
    const prompt = generatePrompt(userProfile, scene)
    setPromptText(JSON.stringify(prompt))
    setCurrentUser(userProfile)
    setScene(scene)
    setTimeout(() => {
      setLoading(false)
      setShowEmail(true)
    }, 2000)
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
        {/* Right: Prompt + Email in a vertical structure */}
        <div className="md:w-1/2 w-full flex flex-col gap-6 justify-start">
          {/* 邮件卡片站位元素 */}
          {!loading && !showEmail && (
            <div className="h-72 bg-white rounded-xl shadow flex items-center justify-center text-gray-300 text-lg border border-dashed border-gray-200">
              Email content will appear here
            </div>
          )}
          {loading && (
            <div className="flex items-center justify-center h-72 bg-white rounded-xl shadow text-blue-600 text-lg font-semibold animate-pulse">
              Generating email...
            </div>
          )}
          {showEmail && !loading && <GeneratedEmailCard currentUser={currentUser} scene={scene} />}
          {promptText && (
            <div className="bg-yellow-50 rounded shadow p-4 text-sm">
              <h3
                className="font-bold mb-2 cursor-pointer flex items-center justify-between"
                onClick={() => setShowPrompt((prev) => !prev)}
              >
                Prompt for Debugging:
                <span className="text-blue-500">{showPrompt ? 'Collapse' : 'Expand'}</span>
              </h3>
              {showPrompt && (
                <pre className="whitespace-pre-wrap bg-gray-100 p-2 rounded border border-gray-300 overflow-auto">
                  {JSON.stringify(JSON.parse(promptText), null, 2)}
                </pre>
              )}
            </div>
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

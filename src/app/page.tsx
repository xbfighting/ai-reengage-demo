"use client"

import { useState } from 'react'
import UserProfileSelector from '@/components/UserProfileCard'
import { UserProfile } from '@/lib/types'
import { generatePrompt } from '@/lib/prompts'
import GeneratedEmailCard from '@/components/GeneratedEmailCard'

export default function Home() {
  const [promptText, setPromptText] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null)
  const [scene, setScene] = useState<string>('holiday')
  const [showEmail, setShowEmail] = useState(false)

  // mock 邮件生成（根据姓名和场景从json查找）
  const handleGenerate = async (userProfile: UserProfile, scene: string) => {
    setLoading(true)
    setShowEmail(false)
    const prompt = generatePrompt(userProfile, scene)
    setPromptText(prompt)
    setCurrentUser(userProfile)
    setScene(scene)
    setTimeout(() => {
      setLoading(false)
      setShowEmail(true)
    }, 2000)
  }
  console.log('Generated Prompt:', promptText)

  return (
    <main className="min-h-screen bg-gray-100 p-6">

      <div className="flex flex-col md:flex-row gap-8 max-w-7xl mx-auto">
        {/* 左侧：用户信息 */}
        <div className="md:w-1/2 w-full">
          <UserProfileSelector onGenerate={handleGenerate} />
        </div>
        {/* 右侧：提示词+邮件上下结构 */}
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
          {showEmail && !loading && (
            <GeneratedEmailCard currentUser={currentUser} scene={scene} />
          )}
          {/* {promptText && (
            <div className="bg-yellow-50 rounded shadow p-4 text-sm">
              <h3 className="font-bold mb-2">Prompt for Debugging:</h3>
              <pre className="whitespace-pre-wrap">{promptText}</pre>
            </div>
          )} */}
        </div>
      </div>
    </main>
  )
}

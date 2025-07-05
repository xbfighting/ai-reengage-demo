"use client"

import { useState } from 'react'
import UserProfileSelector from '@/components/UserProfileCard'
import { UserProfile } from '@/lib/types'
import { generatePrompt } from '@/lib/prompts'
import mockEmails from '@/lib/mockEmails.json'

interface MockEmail {
  subject: string
  body: string
}

export default function Home() {
  const [result, setResult] = useState<MockEmail | null>(null)
  const [promptText, setPromptText] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  // mock 邮件生成（根据姓名和场景从json查找）
  const handleGenerate = async (userProfile: UserProfile, scene: string) => {
    setLoading(true)
    const prompt = generatePrompt(userProfile, scene)
    setPromptText(prompt)
    await new Promise((resolve) => setTimeout(resolve, 500))
    // @ts-ignore
    const userEmails = mockEmails[userProfile.name] || {}
    // @ts-ignore
    const email = userEmails[scene] || { subject: '[Mock Subject]', body: '[Mock Body]' }
    setResult(email)
    setLoading(false)
  }

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-4xl md:text-5xl font-extrabold text-blue-700 text-center mb-10 tracking-tight drop-shadow-sm">AI REENGAGE</h1>
      <div className="flex flex-col md:flex-row gap-8 max-w-7xl mx-auto">
        {/* 左侧：用户信息 */}
        <div className="md:w-1/2 w-full">
          <UserProfileSelector onGenerate={handleGenerate} />
        </div>
        {/* 右侧：提示词+邮件上下结构 */}
        <div className="md:w-1/2 w-full flex flex-col gap-6 justify-start">
          {loading && <p className="mt-4 text-gray-500">AI is generating the email, please wait...</p>}
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-xl font-bold mb-2 text-blue-700">{result?.subject || 'Subject'}</h2>
            <div className="whitespace-pre-wrap text-gray-800 text-base">{result?.body || 'Body'}</div>
          </div>
          {promptText && (
            <div className="bg-yellow-50 rounded shadow p-4 text-sm">
              <h3 className="font-bold mb-2">Prompt for Debugging:</h3>
              <pre className="whitespace-pre-wrap">{promptText}</pre>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}

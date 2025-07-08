'use client'

import { useState } from 'react'
import { UserProfile } from '@/lib/types'
import EmailTemplateMapper from './EmailTemplateMapper'
import { copyToClipboard, formatEmailForCopy } from '@/lib/utils'

export default function GeneratedEmailCard(
  { currentUser, scene }: { currentUser: UserProfile | null; scene: string },
) {
  const [copied, setCopied] = useState(false)
  const [copyError, setCopyError] = useState(false)

  const handleCopy = async () => {
    const emailElement = document.querySelector('.generated-email-content')
    if (!emailElement) {
      setCopyError(true)
      setTimeout(() => setCopyError(false), 2000)
      return
    }

    // 格式化邮件内容
    const formattedContent = formatEmailForCopy(emailElement.innerHTML)

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
    <div className="bg-white rounded-2xl shadow-lg max-w-2xl mx-auto border border-gray-200 p-8 flex flex-col gap-8 items-start">
      <div>
        <div className="flex items-center justify-between w-full mb-4 gap-4">
          <h2 className="text-2xl font-bold text-blue-700">AI Powered Marketing Email:</h2>
          <button
            onClick={handleCopy}
            className={`${getButtonStyle()} text-white text-sm px-4 py-1.5 rounded-xl font-bold shadow transition focus:outline-none focus:ring-2 focus:ring-blue-400`}
            style={{ minWidth: 80 }}
          >
            {getButtonText()}
          </button>
        </div>

        <div className="generated-email-content">
          <EmailTemplateMapper currentUser={currentUser} scene={scene} />
        </div>
      </div>
    </div>
  )
}

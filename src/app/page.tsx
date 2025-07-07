'use client'

import { useState, useEffect } from 'react'
import userProfiles from '@/lib/userProfiles.json'
import campaignTemplates from '@/agent/campaignTemplates.json'
import { UserProfile } from '@/lib/types'
import { useRouter } from 'next/navigation'

export default function LangchainWorkflow() {
  const [selectedTemplateId, setSelectedTemplateId] = useState(campaignTemplates[0].id)
  const [templateVars, setTemplateVars] = useState<Record<string, string | number>>({})
  const [userList, setUserList] = useState<UserProfile[] | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const selectedTemplate = campaignTemplates.find((t) => t.id === selectedTemplateId)

  function extractVars(template: string) {
    const matches = template.match(/\$\{(.*?)\}/g) || []
    return Array.from(new Set(matches.map((m) => m.slice(2, -1).trim())))
  }
  const variableNames = selectedTemplate ? extractVars(selectedTemplate.template) : []

  function getPlaceholder(varName: string): string {
    switch (varName) {
      case 'holidayName':
        return 'e.g. Christmas'
      case 'discount':
        return 'e.g. 20'
      case 'monthsSince':
        return 'e.g. 12'
      case 'lastProcedure':
        return 'e.g. Facelift'
      case 'primaryProcedure':
        return 'e.g. Botox'
      case 'validUntil':
        return 'e.g. 2025-12-31'
      case 'location':
        return 'e.g. Merritt Island'
      case 'newProductName':
        return 'e.g. Laser Resurfacing'
      case 'referralSource':
        return 'e.g. Friend'
      case 'trialDiscount':
        return 'e.g. 30'
      default:
        return `Enter ${varName}`
    }
  }

  function handleVarChange(key: string, value: string) {
    setTemplateVars((vars) => ({ ...vars, [key]: value }))
  }

  async function handleSubmit() {
    setLoading(true)
    // Simulate loading user list (mock, could be API call)
    setTimeout(() => {
      setUserList((userProfiles as { label: string; profile: UserProfile }[]).map((u) => u.profile))
      setLoading(false)
    }, 1000)
  }

  // Set default values for templateVars when template or variableNames change
  useEffect(() => {
    if (selectedTemplate && variableNames.length > 0) {
      const defaults: Record<string, string> = {}
      variableNames.forEach((v) => {
        switch (v) {
          case 'holidayName':
            defaults[v] = 'Christmas'; break;
          case 'discount':
            defaults[v] = '20'; break;
          case 'monthsSince':
            defaults[v] = '12'; break;
          case 'lastProcedure':
            defaults[v] = 'Facelift'; break;
          case 'primaryProcedure':
            defaults[v] = 'Botox'; break;
          case 'validUntil':
            defaults[v] = '2025-12-31'; break;
          case 'location':
            defaults[v] = 'Merritt Island'; break;
          case 'newProductName':
            defaults[v] = 'Laser Resurfacing'; break;
          case 'referralSource':
            defaults[v] = 'Friend'; break;
          case 'trialDiscount':
            defaults[v] = '30'; break;
          default:
            defaults[v] = ''
        }
      })
      setTemplateVars(defaults)
    }
  }, [selectedTemplateId])

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <div className="flex flex-col items-center max-w-4xl mx-auto gap-8">
        <div className="w-full bg-white border border-gray-200 rounded-xl shadow p-6 flex flex-col gap-4">
          <h3 className="font-bold text-blue-700 mb-2">Select Marketing Template</h3>
          <select
            value={selectedTemplateId}
            onChange={(e) => {
              setSelectedTemplateId(e.target.value)
              setTemplateVars({})
            }}
            className="border border-gray-300 rounded-lg px-3 py-2 bg-gray-50 focus:ring-2 focus:ring-blue-200 focus:outline-none min-w-[220px]"
          >
            {campaignTemplates.map((t) => (
              <option key={t.id} value={t.id}>
                {t.title}
              </option>
            ))}
          </select>
          {selectedTemplate && (
            <div className="text-gray-700 bg-blue-50 border border-blue-100 rounded p-3 mb-2">
              <span className="font-semibold">Description: </span>{selectedTemplate.description}
            </div>
          )}
          {variableNames.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-4">
              {variableNames
                .filter((v) => v !== 'name')
                .map((varName) => (
                  <div key={varName} className="flex flex-col">
                    <label className="text-sm font-semibold text-gray-700 mb-1">{varName}:</label>
                    <input
                      type="text"
                      value={templateVars[varName] ?? ''}
                      onChange={(e) => handleVarChange(varName, e.target.value)}
                      placeholder={getPlaceholder(varName)}
                      className="border border-gray-300 rounded px-2 py-1"
                    />
                  </div>
                ))}
            </div>
          )}
          <button
            onClick={handleSubmit}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl font-semibold shadow-lg transition text-lg mt-6 w-full"
            disabled={loading}
          >
            {loading ? 'Loading Users...' : 'Load User List'}
          </button>
        </div>
        {/* User List Table */}
        {userList && (
          <div className="w-full bg-white border border-gray-200 rounded-xl shadow p-6">
            <h3 className="font-bold text-blue-700 mb-4">User List</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm text-left">
                <thead>
                  <tr>
                    <th className="px-2 py-1">Name</th>
                    <th className="px-2 py-1">Age</th>
                    <th className="px-2 py-1">Gender</th>
                    <th className="px-2 py-1">Traits</th>
                    <th className="px-2 py-1">Lifestyle</th>
                    <th className="px-2 py-1">Beauty Goals</th>
                    <th className="px-2 py-1">Loyalty</th>
                    <th className="px-2 py-1">AI Preview</th>
                  </tr>
                </thead>
                <tbody>
                  {userList.map((u, idx) => (
                    <tr key={idx} className="border-t">
                      <td className="px-2 py-1">{u.name}</td>
                      <td className="px-2 py-1">{u.age}</td>
                      <td className="px-2 py-1">{u.gender}</td>
                      <td className="px-2 py-1">{u.traits.join(', ')}</td>
                      <td className="px-2 py-1">{u.lifestyle?.join(', ')}</td>
                      <td className="px-2 py-1">{u.beautyGoals?.join(', ')}</td>
                      <td className="px-2 py-1">{u.loyaltyScore ?? 'N/A'}</td>
                      <td className="px-2 py-1">
                        <button
                          className="bg-blue-500 hover:bg-blue-700 text-white px-3 py-1 rounded text-xs font-semibold"
                          onClick={() => {
                            const params = new URLSearchParams({ user: u.name, template: selectedTemplateId })
                            router.push('/ai-marketing-preview?' + params.toString())
                          }}
                        >
                          AI Preview
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}

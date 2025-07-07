'use client'

import { useState, useEffect } from 'react'
import userProfiles from '@/lib/userProfiles.json'
import campaignTemplates from '@/agent/campaignTemplates.json'
import { UserProfile } from '@/lib/types'
// import { useRouter } from 'next/navigation'

export default function LangchainWorkflow() {
  const [selectedTemplateId, setSelectedTemplateId] = useState(campaignTemplates[0].id)
  const [templateVars, setTemplateVars] = useState<Record<string, string | number>>({})
  const [userList, setUserList] = useState<UserProfile[] | null>(null)
  const [loading, setLoading] = useState(false)
  // const router = useRouter()

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
      const users = (userProfiles as { label: string; profile: UserProfile }[]).map((u) => u.profile)
      setUserList(users)
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTemplateId])

  // Pagination state
  const PAGE_SIZE = 10;
  const [page, setPage] = useState(1);
  const pagedUserList = userList ? userList.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE) : [];
  const totalPages = userList ? Math.ceil(userList.length / PAGE_SIZE) : 1;

  // Reset to page 1 when userList changes
  useEffect(() => {
    setPage(1);
  }, [userList]);

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#f8fafc] via-[#e0e7ef] to-[#f0f4ff] p-3">
      <div className="flex flex-col gap-10 max-w-[86vw] 2xl:max-w-[1600px] mx-auto">
        <div className="flex flex-col md:flex-row gap-8 items-start">
          {/* Left: Template Selection */}
          <div className="md:w-[420px] w-full flex-shrink-0 flex flex-col gap-8 sticky top-8 z-10">
            <div className="w-full bg-white/90 backdrop-blur border border-blue-200 rounded-2xl shadow-2xl p-8 flex flex-col gap-6 relative overflow-hidden">
              <div className="absolute -top-8 -right-8 opacity-10 pointer-events-none select-none">
                <svg
                  width="180"
                  height="180"
                  viewBox="0 0 180 180"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="90" cy="90" r="80" stroke="#2563eb" strokeWidth="8" fill="none" />
                  <circle cx="90" cy="90" r="60" stroke="#38bdf8" strokeWidth="4" fill="none" />
                </svg>
              </div>
              <h3 className="font-bold text-2xl text-blue-800 mb-2 tracking-wide flex items-center gap-2">
                Select Marketing Template
              </h3>
              <select
                value={selectedTemplateId}
                onChange={(e) => {
                  setSelectedTemplateId(e.target.value)
                  setTemplateVars({})
                }}
                className="border border-blue-300 rounded-lg px-4 py-2 bg-blue-50 focus:ring-2 focus:ring-blue-400 focus:outline-none min-w-[220px] text-blue-900 font-semibold shadow"
              >
                {campaignTemplates.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.title}
                  </option>
                ))}
              </select>
              {selectedTemplate && (
                <div className="text-blue-900 bg-blue-50 border border-blue-200 rounded-xl p-4 mb-2 shadow-sm">
                  <span className="font-semibold">Description: </span>
                  {selectedTemplate.description}
                </div>
              )}
              {variableNames.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-6">
                  {variableNames
                    .filter((v) => v !== 'name')
                    .map((varName) => (
                      <div key={varName} className="flex flex-col w-full">
                        <label className="text-sm font-semibold text-blue-700 mb-1 tracking-wide">
                          {varName}:
                        </label>
                        <input
                          type="text"
                          value={templateVars[varName] ?? ''}
                          onChange={(e) => handleVarChange(varName, e.target.value)}
                          placeholder={getPlaceholder(varName)}
                          className="border border-blue-200 rounded px-3 py-2 bg-white focus:ring-2 focus:ring-blue-300 focus:outline-none text-blue-900 font-medium shadow"
                        />
                      </div>
                    ))}
                </div>
              )}
              <button
                onClick={handleSubmit}
                className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white px-8 py-3 rounded-2xl font-bold shadow-xl transition text-lg mt-8 w-full tracking-wider flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="animate-spin inline-block mr-2">⚡</span>Loading Users...
                  </>
                ) : (
                  <>
                    <span className="inline-block">🚀</span>Load User List
                  </>
                )}
              </button>
            </div>
          </div>
          {/* Right: User List Table or Placeholder/Loading */}
          <div className="flex-1 w-full min-w-0 flex flex-col gap-8">
            {!userList && !loading && (
              <div className="w-full h-[420px] flex flex-col items-center justify-center bg-white/80 border border-blue-100 rounded-2xl shadow-xl">
                <div className="text-5xl mb-4 text-blue-200 flex items-center justify-center">
                  <span className="inline-block align-middle" style={{ lineHeight: 1 }}>
                    👥
                  </span>
                </div>
                <div className="text-lg text-blue-400 font-semibold mb-2">User List will appear here</div>
                <div className="text-blue-300">
                  Please select a template and load users to preview the list.
                </div>
              </div>
            )}
            {loading && (
              <div className="w-full h-[420px] flex flex-col items-center justify-center bg-white/80 border border-blue-100 rounded-2xl shadow-xl animate-pulse">
                <svg
                  className="animate-spin mb-6"
                  width="48"
                  height="48"
                  viewBox="0 0 48 48"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="24" cy="24" r="20" stroke="#60a5fa" strokeWidth="6" opacity="0.2" />
                  <path d="M44 24a20 20 0 0 0-20-20" stroke="#2563eb" strokeWidth="6" strokeLinecap="round" />
                </svg>
                <div className="text-lg text-blue-400 font-semibold">Loading user list...</div>
              </div>
            )}
            {userList && !loading && (
              <div className="w-full bg-white/90 backdrop-blur border border-blue-200 rounded-2xl shadow-2xl p-8 relative overflow-hidden">
                <div className="absolute -bottom-8 -left-8 opacity-10 pointer-events-none select-none">
                  <svg
                    width="180"
                    height="180"
                    viewBox="0 0 180 180"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="90" cy="90" r="80" stroke="#2563eb" strokeWidth="8" fill="none" />
                    <circle cx="90" cy="90" r="60" stroke="#38bdf8" strokeWidth="4" fill="none" />
                  </svg>
                </div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-bold text-2xl text-blue-800 tracking-wide flex items-center gap-2 m-0">
                    Audience (AI-Generated Profiles)
                  </h3>
                  <button
                    className="bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500 text-white px-5 py-2 rounded-xl font-bold shadow transition text-base"
                    onClick={() => {
                      alert(
                        '🦾 The AI agent is on it! All emails will be sent out within 15 minutes. Sit back and relax 😎'
                      )
                    }}
                    type="button"
                  >
                    Send All
                  </button>
                </div>
                <div className="overflow-x-auto rounded-xl">
                  <table className="min-w-full text-sm text-left bg-white rounded-xl overflow-hidden shadow">
                    <thead className="bg-blue-50 text-blue-700">
                      <tr>
                        <th className="px-4 py-2">Name</th>
                        <th className="px-4 py-2">Age</th>
                        <th className="px-4 py-2">Gender</th>
                        <th className="px-4 py-2">Traits</th>
                        <th className="px-4 py-2">Lifestyle</th>
                        <th className="px-4 py-2">Beauty Goals</th>
                        <th className="px-4 py-2">Loyalty</th>
                        <th className="px-4 py-2">AI Preview</th>
                      </tr>
                    </thead>
                    <tbody>
                      {pagedUserList.map((u, idx) => (
                        <tr
                          key={idx}
                          className={`border-t ${
                            idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                          } hover:bg-blue-50 transition`}
                        >
                          <td className="px-4 py-2 font-semibold text-gray-900">{u.name}</td>
                          <td className="px-4 py-2 text-gray-800">{u.age}</td>
                          <td className="px-4 py-2 text-gray-800">{u.gender}</td>
                          <td className="px-4 py-2">
                            <div className="flex flex-wrap gap-1">
                              {u.traits.map((t, i) => (
                                <span
                                  key={i}
                                  className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full text-xs font-medium"
                                >
                                  {t}
                                </span>
                              ))}
                            </div>
                          </td>
                          <td className="px-4 py-2">
                            <div className="flex flex-wrap gap-1">
                              {u.lifestyle?.map((l, i) => (
                                <span
                                  key={i}
                                  className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-xs font-medium"
                                >
                                  {l}
                                </span>
                              ))}
                            </div>
                          </td>
                          <td className="px-4 py-2">
                            <div className="flex flex-wrap gap-1">
                              {u.beautyGoals?.map((g, i) => (
                                <span
                                  key={i}
                                  className="bg-pink-100 text-pink-700 px-2 py-0.5 rounded-full text-xs font-medium"
                                >
                                  {g}
                                </span>
                              ))}
                            </div>
                          </td>
                          <td className="px-4 py-2 text-orange-700 font-bold">{u.loyaltyScore ?? 'N/A'}</td>
                          <td className="px-4 py-2">
                            <button
                              className="bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500 text-white px-4 py-1.5 rounded-xl text-xs font-bold shadow transition"
                              onClick={() => {
                                const params = new URLSearchParams({
                                  user: u.name,
                                  template: selectedTemplateId,
                                })
                                window.open('/ai-marketing-preview?' + params.toString(), '_blank')
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
                {/* Pagination Controls */}
                {totalPages > 1 && (
                  <div className="flex justify-center items-center gap-2 mt-6">
                    <button
                      className="px-3 py-1 rounded bg-blue-100 text-blue-700 font-semibold disabled:opacity-50"
                      onClick={() => setPage(page - 1)}
                      disabled={page === 1}
                    >
                      Prev
                    </button>
                    <span className="mx-2 text-blue-700 font-medium">
                      Page {page} of {totalPages}
                    </span>
                    <button
                      className="px-3 py-1 rounded bg-blue-100 text-blue-700 font-semibold disabled:opacity-50"
                      onClick={() => setPage(page + 1)}
                      disabled={page === totalPages}
                    >
                      Next
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}

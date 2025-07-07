"use client"

import { useState } from 'react';
import userProfiles from '@/lib/userProfiles.json';
import campaignTemplates from '@/agent/campaignTemplates.json';
import { UserProfile } from '@/lib/types';

export default function LangchainWorkflow() {
  const [selectedProfileIdx, setSelectedProfileIdx] = useState(0);
  const [selectedTemplateId, setSelectedTemplateId] = useState(campaignTemplates[0].id);
  const [templateVars, setTemplateVars] = useState<Record<string, string | number>>({});
  const [aiProfile, setAiProfile] = useState<{ summary: string; structured: Partial<UserProfile> } | null>(null);
  const [aiPrompt, setAiPrompt] = useState<string | null>(null);
  const [showProfileStruct, setShowProfileStruct] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);
  const [emailText, setEmailText] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Use correct typing for userProfiles
  const profiles: { label: string; profile: UserProfile }[] = userProfiles as { label: string; profile: UserProfile }[];
  const profile = profiles[selectedProfileIdx].profile as UserProfile;
  const selectedTemplate = campaignTemplates.find(t => t.id === selectedTemplateId);

  function extractVars(template: string) {
    const matches = template.match(/\$\{(.*?)\}/g) || [];
    return Array.from(new Set(matches.map(m => m.slice(2, -1).trim())));
  }
  const variableNames = selectedTemplate ? extractVars(selectedTemplate.template) : [];

  function getPlaceholder(varName: string): string {
    switch (varName) {
      case 'holidayName': return 'e.g. Christmas';
      case 'minSpend': return 'e.g. 500';
      case 'discount': return 'e.g. 20';
      case 'monthsSince': return 'e.g. 12';
      case 'lastProcedure': return 'e.g. Facelift';
      default: return `Enter ${varName}`;
    }
  }

  function handleVarChange(key: string, value: string) {
    setTemplateVars(vars => ({ ...vars, [key]: value }));
  }

  async function handleGenerate() {
    setLoading(true);
    setAiProfile(null);
    setAiPrompt(null);
    setEmailText(null);
    const res = await fetch('/api/agent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userInfo: profile,
        templateId: selectedTemplateId,
        variables: { ...templateVars, name: profile.name },
      })
    });
    const data = await res.json();
    setAiProfile(data.userProfile || null);
    setAiPrompt(data.prompt || null);
    setEmailText(data.emailText || null);
    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <div className="flex flex-row gap-8 max-w-7xl mx-auto">
        {/* 1. Left: User selection and profile */}
        <div className="w-1/3 bg-white rounded-2xl shadow-lg border border-gray-200 p-6 flex flex-col gap-4">
          <h2 className="text-xl font-bold mb-2 text-blue-700">Select User</h2>
          <select
            value={selectedProfileIdx}
            onChange={e => setSelectedProfileIdx(Number(e.target.value))}
            className="border border-gray-300 rounded-lg px-3 py-2 bg-gray-50 focus:ring-2 focus:ring-blue-200 focus:outline-none mb-4"
          >
            {profiles.map((t, idx) => (
              <option key={idx} value={idx}>{t.label}</option>
            ))}
          </select>
          <div className="mt-2">
            <h3 className="font-bold text-gray-700 mb-2">User Profile Fields</h3>
            <ul className="text-sm text-gray-800 space-y-1">
              <li><b>Name:</b> {profile.name}</li>
              <li><b>Age:</b> {profile.age}</li>
              <li><b>Gender:</b> {profile.gender}</li>
              <li><b>Traits:</b> {profile.traits.join(', ')}</li>
              <li><b>Lifestyle:</b> {profile.lifestyle?.join(', ')}</li>
              <li><b>Beauty Goals:</b> {profile.beautyGoals?.join(', ')}</li>
              <li><b>Surgery History:</b> {profile.surgery_history.map((s) => `${s.date} - ${s.type}`).join('; ')}</li>
              <li><b>Spending Level:</b> {profile.spendingLevel ?? 'N/A'}</li>
              <li><b>Risk Preference:</b> {profile.riskPreference ?? 'N/A'}</li>
              <li><b>Appointment Activity:</b> {profile.appointmentActivity ?? 'N/A'}</li>
              <li><b>Location Level:</b> {profile.locationLevel ?? 'N/A'}</li>
              <li><b>Loyalty Score:</b> {profile.loyaltyScore ?? 'N/A'}</li>
            </ul>
          </div>
        </div>
        {/* 2. Middle: Template selection, variable input, generate, AI summary/prompt */}
        <div className="w-1/3 flex flex-col gap-4">
          <div className="bg-white border border-gray-200 rounded-xl shadow p-4">
            <h3 className="font-bold text-blue-700 mb-2">Select Marketing Template</h3>
            <select
              value={selectedTemplateId}
              onChange={e => {
                setSelectedTemplateId(e.target.value);
                setTemplateVars({});
              }}
              className="border border-gray-300 rounded-lg px-3 py-2 bg-gray-50 focus:ring-2 focus:ring-blue-200 focus:outline-none min-w-[220px]"
            >
              {campaignTemplates.map(t => (
                <option key={t.id} value={t.id}>{t.title}</option>
              ))}
            </select>
            {variableNames.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-4">
                {variableNames.filter(v => v !== 'name').map(varName => (
                  <div key={varName} className="flex flex-col">
                    <label className="text-sm font-semibold text-gray-700 mb-1">{varName}:</label>
                    <input
                      type="text"
                      value={templateVars[varName] ?? ''}
                      onChange={e => handleVarChange(varName, e.target.value)}
                      placeholder={getPlaceholder(varName)}
                      className="border border-gray-300 rounded px-2 py-1"
                    />
                  </div>
                ))}
              </div>
            )}
            <button
              onClick={handleGenerate}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl font-semibold shadow-lg transition text-lg mt-6 w-full"
              disabled={loading}
            >
              {loading ? 'Generating...' : 'Generate Marketing Email'}
            </button>
          </div>
          {/* AI User Profile Summary and Structured (Collapsible) */}
          {aiProfile && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl shadow p-4 w-full">
              <h3 className="font-bold text-yellow-700 mb-2">AI Generated User Summary</h3>
              <div className="mb-2 text-gray-900">{aiProfile.summary}</div>
              <button
                className="text-blue-600 underline text-sm mb-2"
                onClick={() => setShowProfileStruct(v => !v)}
              >
                {showProfileStruct ? 'Hide Structured Data' : 'Show Structured Data'}
              </button>
              {showProfileStruct && (
                <pre className="whitespace-pre-wrap bg-gray-100 p-2 rounded border border-gray-300 overflow-auto text-xs">
                  {JSON.stringify(aiProfile.structured, null, 2)}
                </pre>
              )}
            </div>
          )}
          {/* AI Prompt (Collapsible) */}
          {aiPrompt && (
            <div className="bg-blue-50 border border-blue-200 rounded-xl shadow p-4 w-full">
              <h3 className="font-bold text-blue-700 mb-2">AI Generated Prompt</h3>
              <button
                className="text-blue-600 underline text-sm mb-2"
                onClick={() => setShowPrompt(v => !v)}
              >
                {showPrompt ? 'Hide Prompt' : 'Show Prompt'}
              </button>
              {showPrompt && (
                <pre className="whitespace-pre-wrap bg-gray-100 p-2 rounded border border-gray-300 overflow-auto text-xs">
                  {aiPrompt}
                </pre>
              )}
            </div>
          )}
        </div>
        {/* 3. Right: AI Generated Email and Prompt (Collapsible) */}
        <div className="w-1/3 flex flex-col gap-4">
          {emailText && (
            <div className="bg-white border border-blue-200 rounded-xl shadow p-4 w-full">
              <h3 className="font-bold text-blue-700 mb-2">Generated Email</h3>
              <pre className="whitespace-pre-wrap text-gray-900">{emailText}</pre>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

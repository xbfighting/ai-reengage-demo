import { useState } from 'react'
import { UserProfile } from '@/lib/types'
import userProfiles from '@/lib/userProfiles.json'
import { Radar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js'

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend)

const templates: { label: string; profile: UserProfile }[] = userProfiles as any

export default function UserProfileSelectorWithAction({
  onGenerate,
}: {
  onGenerate: (profile: UserProfile, scene: string) => void
}) {
  const [selectedProfile, setSelectedProfile] = useState<UserProfile>(templates[0].profile)
  const [scene, setScene] = useState<'Repurchase Reminder' | 'New Product Recommendation' | 'Holiday Greeting'>('Repurchase Reminder')

  // Radar chart for 6 selected dimensions
  const radarLabels = [
    'Spending Level',
    'Beauty Goals',
    'Risk Preference',
    'Appointment Activity',
    'Location Level',
    'Loyalty Score',
  ]
  const profile = selectedProfile
  const dataValues = [
    (profile.spendingLevel ?? 50) / 100,
    (profile.beautyGoals?.length ?? 0) / 6,
    profile.riskPreference === 'Adventurous' ? 1 : 0.5,
    (profile.appointmentActivity ?? 50) / 100,
    profile.locationLevel === 'Tier 1' ? 1 : profile.locationLevel === 'New Tier 1' ? 0.8 : profile.locationLevel === 'Tier 2' ? 0.6 : 0.4,
    (profile.loyaltyScore ?? 50) / 100,
  ]
  const radarData = {
    labels: radarLabels,
    datasets: [
      {
        label: 'Profile Radar',
        data: dataValues,
        backgroundColor: 'rgba(59,130,246,0.2)',
        borderColor: 'rgba(59,130,246,1)',
        borderWidth: 2,
        pointBackgroundColor: 'rgba(59,130,246,1)',
      },
    ],
  }
  const radarOptions = {
    scales: {
      r: {
        min: 0,
        max: 1,
        ticks: { display: false },
        pointLabels: { font: { size: 16 } },
      },
    },
    plugins: {
      legend: { display: false },
    },
    responsive: true,
    maintainAspectRatio: false,
  }

  // When user selects a profile, update state
  const handleSelectProfile = (profile: UserProfile) => {
    setSelectedProfile(profile)
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg max-w-2xl mx-auto border border-gray-200 p-8 flex flex-col md:flex-row gap-8 items-start">
      <div className="flex-1">
        <label className="font-semibold text-lg text-gray-700 mb-2 block">Select User:</label>
        <div className="flex flex-wrap gap-3 mb-6">
          {templates.map((t, idx) => (
            <button
              key={idx}
              className={`bg-gradient-to-r from-blue-100 to-blue-200 px-4 py-2 text-base rounded-lg hover:from-blue-200 hover:to-blue-300 transition font-medium text-blue-800 shadow-sm border border-blue-200 ${profile.name === t.profile.name ? 'ring-2 ring-blue-400' : ''}`}
              onClick={() => handleSelectProfile(t.profile)}
              type="button"
            >
              {t.label}
            </button>
          ))}
        </div>
        <label className="block font-semibold text-gray-700 mb-1">Mail Scene:</label>
        <select
          value={scene}
          onChange={e => setScene(e.target.value as typeof scene)}
          className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:ring-2 focus:ring-blue-200 focus:outline-none bg-gray-50"
        >
          <option value="Repurchase Reminder">Repurchase Reminder</option>
          <option value="New Product Recommendation">New Product Recommendation</option>
          <option value="Holiday Greeting">Holiday Greeting</option>
        </select>
        <button
          onClick={() => onGenerate(profile, scene)}
          className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg transition w-full mt-6 text-lg"
        >
          Generate Email
        </button>
      </div>
      <div className="flex-1 flex flex-col items-center">
        <h2 className="text-2xl font-bold mb-4 text-blue-700">User Profile</h2>
        <div className="w-full max-w-xs h-72 mb-6">
          <Radar data={radarData} options={radarOptions} />
        </div>
        <div className="grid grid-cols-2 gap-4 w-full max-w-md">
          <div><strong>Name:</strong> {profile.name}</div>
          <div><strong>Age:</strong> {profile.age} years</div>
          <div><strong>Gender:</strong> {profile.gender}</div>
          <div><strong>Traits:</strong> {profile.traits.join(', ')}</div>
          <div className="col-span-2"><strong>Lifestyle:</strong> {profile.lifestyle?.join(', ')}</div>
          <div className="col-span-2"><strong>Surgery History:</strong> {profile.surgery_history.map((s) => `${s.date} - ${s.type}`).join(', ')}</div>
          <div><strong>Spending Level:</strong> {profile.spendingLevel ?? 'N/A'}</div>
          <div><strong>Beauty Goals:</strong> {profile.beautyGoals?.join(', ') ?? 'N/A'}</div>
          <div><strong>Risk Preference:</strong> {profile.riskPreference ?? 'N/A'}</div>
          <div><strong>Appointment Activity:</strong> {profile.appointmentActivity ?? 'N/A'}</div>
          <div><strong>Location Level:</strong> {profile.locationLevel ?? 'N/A'}</div>
          <div><strong>Loyalty Score:</strong> {profile.loyaltyScore ?? 'N/A'}</div>
        </div>
      </div>
    </div>
  )
}

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

const templates: { label: string; profile: UserProfile }[] = userProfiles as never

export default function UserProfileSelectorWithAction({
  onGenerate,
}: {
  onGenerate: (profile: UserProfile, scene: string) => void
}) {
  const [selectedProfileIdx, setSelectedProfileIdx] = useState(0)
  const [scene, setScene] = useState<'Repurchase Reminder' | 'New Product Recommendation' | 'Holiday Greeting'>('Repurchase Reminder')
  const profile = templates[selectedProfileIdx].profile

  // Radar chart for 6 selected dimensions
  const radarLabels = [
    'Spending',
    'Goals',
    'Risk Preference',
    'Appointment Activity',
    'Location',
    'Loyalty',
  ]
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

  return (
    <div className="bg-white rounded-2xl shadow-lg max-w-2xl mx-auto border border-gray-200 p-8 flex flex-col gap-8 items-start">
      {/* Profile Display Area */}
      <div className="flex flex-col md:flex-row gap-8 w-full items-start">
        <div className="flex-1 flex flex-col items-center w-full">
          <h2 className="text-2xl font-bold mb-4 text-blue-700 w-full">User Profile</h2>
          {/* Card: Radar chart centered in one row, information list below */}
          <div className="w-full bg-white border-2 border-blue-100 rounded-2xl shadow-lg p-6 flex flex-col items-center">
            <div className="w-full flex justify-center mb-6">
              <div className="w-76 h-76 min-w-[30rem]">
                <Radar data={radarData} options={radarOptions} />
              </div>
            </div>
            <div className="w-full max-w-2xl mx-auto space-y-3">
              <div className="flex items-center mb-1">
                <span className="inline-block w-6 h-6 bg-blue-200 text-blue-700 rounded-full flex items-center justify-center mr-2 text-lg font-bold">👤</span>
                <span className="font-semibold text-gray-700">Name:</span> <span className="ml-2 text-gray-900">{profile.name}</span>
              </div>
              <div className="flex items-center mb-1">
                <span className="font-semibold text-gray-700">Age:</span> <span className="ml-2 text-gray-900">{profile.age} years</span>
              </div>
              <div className="flex items-center mb-1">
                <span className="font-semibold text-gray-700">Gender:</span> <span className="ml-2 text-gray-900">{profile.gender}</span>
              </div>
              <div className="flex flex-wrap items-center"><span className="font-semibold text-gray-700 mr-2">Traits:</span> {profile.traits.map((t, i) => <span key={i} className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs font-medium mr-2 mb-1">{t}</span>)}</div>
              <div className="flex flex-wrap items-center"><span className="font-semibold text-gray-700 mr-2">Lifestyle:</span> {profile.lifestyle?.map((l, i) => <span key={i} className="bg-green-100 text-green-700 px-2 py-0.5 rounded text-xs font-medium mr-2 mb-1">{l}</span>)}</div>
              <div className="flex flex-wrap items-center"><span className="font-semibold text-gray-700 mr-2">Beauty Goals:</span> {profile.beautyGoals?.map((g, i) => <span key={i} className="bg-pink-100 text-pink-700 px-2 py-0.5 rounded text-xs font-medium mr-2 mb-1">{g}</span>)}</div>
              <div className="flex flex-wrap items-center"><span className="font-semibold text-gray-700 mr-2">Surgery History:</span> {profile.surgery_history.map((s, i) => <span key={i} className="inline-block bg-gray-100 text-gray-700 px-2 py-0.5 rounded text-xs font-medium mr-2 mb-1">{s.date} - {s.type}</span>)}</div>
              <div><span className="font-semibold text-gray-700">Spending Level:</span> <span className="ml-2 text-gray-900">{profile.spendingLevel ?? 'N/A'}</span></div>
              <div><span className="font-semibold text-gray-700">Risk Preference:</span> <span className="ml-2 text-gray-900">{profile.riskPreference ?? 'N/A'}</span></div>
              <div><span className="font-semibold text-gray-700">Appointment Activity:</span> <span className="ml-2 text-gray-900">{profile.appointmentActivity ?? 'N/A'}</span></div>
              <div><span className="font-semibold text-gray-700">Location Level:</span> <span className="ml-2 text-gray-900">{profile.locationLevel ?? 'N/A'}</span></div>
              <div><span className="font-semibold text-gray-700">Loyalty Score:</span> <span className="ml-2 text-gray-900">{profile.loyaltyScore ?? 'N/A'}</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

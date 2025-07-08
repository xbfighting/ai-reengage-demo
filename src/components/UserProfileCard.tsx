import { UserProfile } from '@/lib/types'
import userProfiles from '@/lib/userProfiles.json'

export default function UserProfileCard({ username }: { username: string }) {
  // userProfiles is an array of { label, profile }, so we need to search in .profile
  const userObj = (userProfiles as { label: string; profile: UserProfile }[]).find(u => u.profile.name === username)
  const profile = userObj?.profile
  if (!profile) {
    return <div className="text-red-500">User profile not found.</div>
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg max-w-2xl mx-auto border border-gray-200 p-8 flex flex-col gap-8 items-start">
      {/* Profile Display Area */}
      <div className="flex flex-col md:flex-row gap-8 w-full items-start">
        <div className="flex-1 flex flex-col items-center w-full">
          <h2 className="text-2xl font-bold mb-4 text-blue-700 w-full">User Profile</h2>
          {/* Card: Radar chart centered in one row, information list below */}
          <div className="w-full bg-white border-2 border-blue-100 rounded-2xl shadow-lg p-6 flex flex-col items-center">
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
              <div className="flex flex-wrap items-center"><span className="font-semibold text-gray-700 mr-2">Traits:</span> {profile.traits.map((t: string, i: number) => <span key={i} className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs font-medium mr-2 mb-1">{t}</span>)}</div>
              <div className="flex flex-wrap items-center"><span className="font-semibold text-gray-700 mr-2">Lifestyle:</span> {profile.lifestyle?.map((l: string, i: number) => <span key={i} className="bg-green-100 text-green-700 px-2 py-0.5 rounded text-xs font-medium mr-2 mb-1">{l}</span>)}</div>
              <div className="flex flex-wrap items-center"><span className="font-semibold text-gray-700 mr-2">Beauty Goals:</span> {profile.beautyGoals?.map((g: string, i: number) => <span key={i} className="bg-pink-100 text-pink-700 px-2 py-0.5 rounded text-xs font-medium mr-2 mb-1">{g}</span>)}</div>
              <div className="flex flex-wrap items-center"><span className="font-semibold text-gray-700 mr-2">Surgery History:</span> {profile.surgery_history.map((s: { date: string; type: string }, i: number) => <span key={i} className="inline-block bg-gray-100 text-gray-700 px-2 py-0.5 rounded text-xs font-medium mr-2 mb-1">{s.date} - {s.type}</span>)}</div>
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

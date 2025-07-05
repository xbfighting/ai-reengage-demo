'use client'
import { useState } from 'react'
import { UserProfile } from '@/lib/types'
import userProfiles from '@/lib/userProfiles.json'

const templates: { label: string; profile: UserProfile }[] = userProfiles as never

const defaultData: UserProfile = templates[0].profile

export default function UserInputForm() {
	const [profile, setProfile] = useState<UserProfile>(defaultData)
	const [scene, setScene] = useState<
		'Repurchase Reminder' | 'New Product Recommendation' | 'Holiday Greeting'
	>('Repurchase Reminder')

	return (
		<div className="space-y-4 p-8 bg-white rounded-2xl shadow-lg max-w-xl mx-auto mt-8 border border-gray-200">
			<div className="space-y-2 mb-6">
				<label className="font-semibold text-lg text-gray-700">
					Select User:
				</label>
				<div className="flex flex-wrap gap-3">
					{templates.map((t, idx) => (
						<button
							key={idx}
							className={`bg-gradient-to-r from-blue-100 to-blue-200 px-4 py-2 text-base rounded-lg hover:from-blue-200 hover:to-blue-300 transition font-medium text-blue-800 shadow-sm border border-blue-200 ${
								profile.name === t.profile.name ? 'ring-2 ring-blue-400' : ''
							}`}
							onClick={() => setProfile(t.profile)}
							type="button"
						>
							{t.label}
						</button>
					))}
				</div>
			</div>
			<div className="mb-4">
				<label className="block font-semibold text-gray-700 mb-1">
					Mail Scene:
				</label>
				<select
					value={scene}
					onChange={(e) =>
						setScene(
							e.target.value as
								| 'Repurchase Reminder'
								| 'New Product Recommendation'
								| 'Holiday Greeting'
						)
					}
					className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:ring-2 focus:ring-blue-200 focus:outline-none bg-gray-50"
				>
					<option value="Repurchase Reminder">Repurchase Reminder</option>
					<option value="New Product Recommendation">
						New Product Recommendation
					</option>
					<option value="Holiday Greeting">Holiday Greeting</option>
				</select>
			</div>
		</div>
	)
}

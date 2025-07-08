import AnnaHoliday from '@/components/AnnaHoliday'
import MickHoliday from '@/components/MickHoliday'
import LindaHoliday from '@/components/LindaHoliday'
import AnnaPR from '@/components/AnnaPR'
import MickPR from '@/components/MickPR'
import LindaPR from '@/components/LindaPR'
import AnnaRR from '@/components/AnnaRR'
import MickRR from '@/components/MickRR'
import LindaRR from '@/components/LindaRR'
import { UserProfile } from '@/lib/types'

// 邮件模板映射配置
const EMAIL_TEMPLATE_MAP: Record<string, React.ComponentType> = {
  'Annaholiday_greeting': AnnaHoliday,
  'Mikeholiday_greeting': MickHoliday,
  'Lindaholiday_greeting': LindaHoliday,
  'Annanew_product_recommendation': AnnaPR,
  'Mikenew_product_recommendation': MickPR,
  'Lindanew_product_recommendation': LindaPR,
  'Annarepurchase_reminder': AnnaRR,
  'Mikerepurchase_reminder': MickRR,
  'Lindarepurchase_reminder': LindaRR,
}

interface EmailTemplateMapperProps {
  currentUser: UserProfile | null
  scene: string
}

export default function EmailTemplateMapper({ currentUser, scene }: EmailTemplateMapperProps) {
  const templateKey = `${currentUser?.name}${scene}`
  const TemplateComponent = EMAIL_TEMPLATE_MAP[templateKey]

  if (!TemplateComponent) {
    return (
      <div className="text-center text-gray-500 p-8">
        <p>No template found for {currentUser?.name} - {scene}</p>
        <p className="text-sm mt-2">Available templates: {Object.keys(EMAIL_TEMPLATE_MAP).join(', ')}</p>
      </div>
    )
  }

  return <TemplateComponent />
}

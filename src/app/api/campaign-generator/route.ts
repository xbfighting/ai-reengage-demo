import { NextRequest, NextResponse } from 'next/server'

export interface CampaignRequest {
  campaignName: string
  channel: 'email' | 'text'
  campaignBrief: string
  demographics: {
    ageRange: [number, number]
    gender: string[]
    location: { zipCode: string; radius: number }
    incomeLevel: string
  }
  behavioral: {
    procedureHistory: string[]
    procedureNotTried: string[]
    lifetimeValueRange: [number, number]
    lastVisitRange: string
    engagementLevel: string
  }
  psychologicalTriggers: {
    lifeEvents: string[]
    seasonal: string[]
    cultural: string[]
  }
  customFlair: string
}

export interface GeneratedMessage {
  id: string
  patientName: string
  channel: 'email' | 'text'
  subject?: string
  content: string
  personalizedElements: string[]
  matchingCriteria: string[]
  estimatedEngagement: number
}

export async function POST(request: NextRequest) {
  try {
    const campaignData: CampaignRequest = await request.json()
    
    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    const messages = generateChannelSpecificMessages(campaignData)
    
    return NextResponse.json({
      success: true,
      campaignId: `campaign_${Date.now()}`,
      messages,
      totalGenerated: messages.length,
      estimatedReach: calculateEstimatedReach(campaignData)
    })
    
  } catch (error) {
    console.error('Campaign generation error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to generate campaign' },
      { status: 500 }
    )
  }
}

function generateChannelSpecificMessages(campaignData: CampaignRequest): GeneratedMessage[] {
  const samplePatients = [
    { name: 'Jennifer', age: 52, procedures: ['Botox'], traits: ['Professional', 'Quality-focused'] },
    { name: 'Michelle', age: 48, procedures: ['Filler'], traits: ['Social', 'Trend-conscious'] },
    { name: 'Sarah', age: 35, procedures: ['Laser'], traits: ['Busy Mom', 'Practical'] },
    { name: 'Lisa', age: 42, procedures: ['Thread Lift'], traits: ['Elegant', 'Sophisticated'] },
    { name: 'Amanda', age: 38, procedures: ['Morpheus8'], traits: ['Active', 'Health-conscious'] }
  ]
  
  return samplePatients.map((patient, index) => {
    const personalizedElements = generatePersonalizedElements(patient, campaignData)
    const content = generateContent(patient, campaignData, personalizedElements)
    
    return {
      id: `msg_${index + 1}`,
      patientName: patient.name,
      channel: campaignData.channel,
      subject: campaignData.channel === 'email' ? generateEmailSubject(patient, campaignData) : undefined,
      content,
      personalizedElements,
      matchingCriteria: generateMatchingCriteria(patient, campaignData),
      estimatedEngagement: Math.floor(Math.random() * 40) + 60 // 60-100%
    }
  })
}

function generatePersonalizedElements(patient: any, campaignData: CampaignRequest): string[] {
  const elements = [`Age-specific (${patient.age})`]
  
  if (patient.procedures.length > 0) {
    elements.push(`Previous: ${patient.procedures.join(', ')}`)
  }
  
  if (campaignData.psychologicalTriggers.cultural.length > 0) {
    elements.push('Celebrity reference')
  }
  
  if (campaignData.psychologicalTriggers.seasonal.length > 0) {
    elements.push('Seasonal timing')
  }
  
  if (campaignData.customFlair) {
    elements.push('Custom messaging')
  }
  
  return elements
}

function generateEmailSubject(patient: any, campaignData: CampaignRequest): string {
  const templates = [
    `${patient.name}, Your ${patient.age}s Glow-Up Awaits`,
    `${patient.name}, Time for Your Beauty Refresh?`,
    `${patient.name}, Exclusive Offer Inside`,
    `${patient.name}, Look 10 Years Younger`,
    `${patient.name}, Your Transformation Journey Continues`
  ]
  
  return templates[Math.floor(Math.random() * templates.length)]
}

function generateContent(patient: any, campaignData: CampaignRequest, elements: string[]): string {
  if (campaignData.channel === 'email') {
    return generateEmailContent(patient, campaignData, elements)
  } else {
    return generateTextContent(patient, campaignData, elements)
  }
}

function generateEmailContent(patient: any, campaignData: CampaignRequest, elements: string[]): string {
  const celebrityRef = campaignData.psychologicalTriggers.cultural.includes('Celebrity news') 
    ? getCelebrityReference(patient.age) 
    : ''
  
  const seasonalHook = campaignData.psychologicalTriggers.seasonal.length > 0
    ? getSeasonalHook(campaignData.psychologicalTriggers.seasonal[0])
    : ''
  
  const procedureHistory = patient.procedures.length > 0 
    ? `We loved seeing your results from ${patient.procedures[0]}! ` 
    : ''
  
  const customMessage = campaignData.customFlair ? `\n\n${campaignData.customFlair}` : ''
  
  return `Hi ${patient.name},

${celebrityRef}${seasonalHook}

${procedureHistory}At ${patient.age}, you're at the perfect age for ${getRecommendedTreatment(patient, campaignData)}.

${campaignData.campaignBrief}

Here's what we're offering:
• Consultation with Dr. Clevens
• Personalized treatment plan
• Special pricing for this month
• Follow-up care included

Ready to book your consultation?${customMessage}

Best regards,
Dr. Clevens Team

[Book Now Button]`
}

function generateTextContent(patient: any, campaignData: CampaignRequest, elements: string[]): string {
  const celebrityRef = campaignData.psychologicalTriggers.cultural.includes('Celebrity news') 
    ? `${getCelebrityReference(patient.age, true)} ✨ ` 
    : ''
  
  const emoji = campaignData.psychologicalTriggers.seasonal.includes('Holiday parties') ? '🎉' : '💫'
  
  return `Hi ${patient.name}! ${celebrityRef}${campaignData.campaignBrief.slice(0, 80)}... Book your ${getRecommendedTreatment(patient, campaignData)} consultation? Text Y for times ${emoji}`
}

function getCelebrityReference(age: number, isText: boolean = false): string {
  const celebrities = [
    { name: 'Jennifer Aniston', age: 54, reference: 'Jennifer Aniston just revealed her beauty secret' },
    { name: 'Sandra Bullock', age: 59, reference: 'Sandra Bullock looks incredible at 59' },
    { name: 'Reese Witherspoon', age: 47, reference: 'Reese Witherspoon\'s glowing skin secret' },
    { name: 'Charlize Theron', age: 48, reference: 'Charlize Theron\'s ageless beauty' }
  ]
  
  const closestCelebrity = celebrities.reduce((prev, curr) => 
    Math.abs(curr.age - age) < Math.abs(prev.age - age) ? curr : prev
  )
  
  return isText 
    ? `${closestCelebrity.name} (${closestCelebrity.age}) secret:` 
    : `Did you see ${closestCelebrity.reference}? At ${closestCelebrity.age}, she's close to your age! `
}

function getSeasonalHook(trigger: string): string {
  const hooks = {
    'Holiday parties': 'With holiday parties approaching, now\'s the perfect time to refresh your look. ',
    'Beach season': 'Beach season is coming - time to get that confident glow! ',
    'New Year': 'New Year, new you! Start your transformation journey now. '
  }
  
  return hooks[trigger as keyof typeof hooks] || ''
}

function getRecommendedTreatment(patient: any, campaignData: CampaignRequest): string {
  const treatments = ['Botox refresh', 'dermal filler', 'skin rejuvenation', 'facial contouring', 'anti-aging treatment']
  return treatments[Math.floor(Math.random() * treatments.length)]
}

function generateMatchingCriteria(patient: any, campaignData: CampaignRequest): string[] {
  const criteria = []
  
  if (patient.age >= campaignData.demographics.ageRange[0] && 
      patient.age <= campaignData.demographics.ageRange[1]) {
    criteria.push('Age range match')
  }
  
  if (patient.procedures.some(proc => campaignData.behavioral.procedureHistory.includes(proc))) {
    criteria.push('Procedure history')
  }
  
  if (campaignData.psychologicalTriggers.cultural.length > 0) {
    criteria.push('Cultural triggers')
  }
  
  return criteria
}

function calculateEstimatedReach(campaignData: CampaignRequest): number {
  let baseReach = 1000
  
  // Adjust based on targeting specificity
  if (campaignData.demographics.ageRange[1] - campaignData.demographics.ageRange[0] < 20) {
    baseReach *= 0.7
  }
  
  if (campaignData.behavioral.procedureHistory.length > 0) {
    baseReach *= 0.6
  }
  
  if (campaignData.psychologicalTriggers.lifeEvents.length > 0) {
    baseReach *= 0.5
  }
  
  return Math.floor(baseReach)
}
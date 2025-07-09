import { NextRequest, NextResponse } from 'next/server'
import { AdvancedTargetingEngine, TargetingResults } from '@/lib/targeting-engine'
import { AIMessageScoringSystem, ABTestOptimizer } from '@/lib/ai-scoring-system'
import userProfiles from '@/lib/userProfiles.json'
import { UserProfile } from '@/lib/types'

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
    
    // 使用高级定位引擎
    const users = (userProfiles as { label: string; profile: UserProfile }[]).map(u => u.profile)
    const targetingEngine = new AdvancedTargetingEngine(users)
    const targetingResults = targetingEngine.analyzeTargeting(campaignData)
    
    const messages = generateChannelSpecificMessages(campaignData, targetingResults)
    
    // 使用AI评分系统
    const scoringSystem = new AIMessageScoringSystem(campaignData)
    const campaignScore = scoringSystem.scoreCampaign(messages)
    
    // 生成A/B测试变体（可选）
    const abOptimizer = new ABTestOptimizer()
    const abVariants = messages.length > 0 ? abOptimizer.generateABVariants(messages[0], campaignData) : []
    
    return NextResponse.json({
      success: true,
      campaignId: `campaign_${Date.now()}`,
      messages,
      totalGenerated: messages.length,
      estimatedReach: targetingResults.matchedUsers,
      targetingResults: {
        totalUsers: targetingResults.totalUsers,
        matchedUsers: targetingResults.matchedUsers,
        averageScore: Math.round(targetingResults.averageScore * 100),
        channelDistribution: targetingResults.channelDistribution,
        urgencyDistribution: targetingResults.urgencyDistribution
      },
      aiScoring: {
        overallScore: Math.round(campaignScore.averageScore * 100),
        messageScores: campaignScore.messageScores,
        campaignOptimizations: campaignScore.campaignOptimizations,
        predictedMetrics: campaignScore.predictedMetrics
      },
      abTestVariants: abVariants.slice(0, 3) // 只返回前3个变体
    })
    
  } catch (error) {
    console.error('Campaign generation error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to generate campaign' },
      { status: 500 }
    )
  }
}

function generateChannelSpecificMessages(campaignData: CampaignRequest, targetingResults: TargetingResults): GeneratedMessage[] {
  // 使用定位引擎的结果生成消息
  const topTargets = targetingResults.topTargets.slice(0, 5) // 取前5个最佳目标
  
  return topTargets.map((target, index) => {
    const personalizedElements = [
      `Targeting Score: ${Math.round(target.totalScore * 100)}%`,
      ...target.personalizedHooks,
      `Recommended Channel: ${target.recommendedChannel.toUpperCase()}`,
      `Urgency: ${target.urgencyLevel.toUpperCase()}`
    ]
    
    const content = generateAdvancedContent(target, campaignData)
    
    return {
      id: `msg_${index + 1}`,
      patientName: target.userName,
      channel: target.recommendedChannel,
      subject: target.recommendedChannel === 'email' ? generateAdvancedEmailSubject(target, campaignData) : undefined,
      content,
      personalizedElements,
      matchingCriteria: target.matchingReasons,
      estimatedEngagement: Math.floor(target.totalScore * 40) + 60 // 基于定位分数
    }
  })
}

function generateAdvancedContent(target: any, campaignData: CampaignRequest): string {
  if (target.recommendedChannel === 'email') {
    return generateAdvancedEmailContent(target, campaignData)
  } else {
    return generateAdvancedTextContent(target, campaignData)
  }
}

function generateAdvancedEmailContent(target: any, campaignData: CampaignRequest): string {
  const urgencyPrefix = target.urgencyLevel === 'high' ? 'URGENT: ' : ''
  const personalizedHooks = target.personalizedHooks.join('\n')
  
  return `${urgencyPrefix}Hi ${target.userName},

${personalizedHooks}

Based on your profile and interests, we've designed a special offer just for you.

${campaignData.campaignBrief}

Why this is perfect for you:
${target.matchingReasons.map((reason: string) => `• ${reason}`).join('\n')}

Our recommendation: Book within the next 48 hours for priority scheduling.

Your targeting score: ${Math.round(target.totalScore * 100)}%

Best regards,
Dr. Clevens Team

[Book Now - Priority Access]`
}

function generateAdvancedTextContent(target: any, campaignData: CampaignRequest): string {
  const urgencyEmoji = target.urgencyLevel === 'high' ? '🚨' : '✨'
  const hook = target.personalizedHooks[0] || 'Special offer for you'
  
  return `Hi ${target.userName}! ${urgencyEmoji} ${hook}. ${campaignData.campaignBrief.slice(0, 60)}... Priority booking available! Reply YES for times.`
}

function generateAdvancedEmailSubject(target: any, campaignData: CampaignRequest): string {
  const urgencyPrefix = target.urgencyLevel === 'high' ? 'URGENT: ' : ''
  const templates = [
    `${urgencyPrefix}${target.userName}, Your Perfect Treatment Awaits`,
    `${urgencyPrefix}${target.userName}, Exclusive Offer Based on Your Profile`,
    `${urgencyPrefix}${target.userName}, ${Math.round(target.totalScore * 100)}% Match - Don't Miss This`,
    `${urgencyPrefix}${target.userName}, Your Personalized Beauty Plan Is Ready`
  ]
  
  return templates[Math.floor(Math.random() * templates.length)]
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
import type { GeneratedMessage } from '@/app/api/campaign-generator/route'
import type { CampaignRequest } from '@/app/api/campaign-generator/route'

export interface MessageScore {
  messageId: string
  overallScore: number
  personalizationScore: number
  engagementScore: number
  actionabilityScore: number
  brandAlignmentScore: number
  detailedFeedback: {
    strengths: string[]
    improvements: string[]
    suggestions: string[]
  }
  optimizationRecommendations: {
    subjectLine?: string
    contentAdjustments?: string[]
    timingRecommendations?: string[]
    channelOptimization?: string
  }
}

export interface CampaignScore {
  campaignId: string
  averageScore: number
  messageScores: MessageScore[]
  campaignOptimizations: {
    bestPerformingPatterns: string[]
    underperformingElements: string[]
    globalRecommendations: string[]
  }
  predictedMetrics: {
    openRate: number
    clickThroughRate: number
    conversionRate: number
    responseRate: number
  }
}

export class AIMessageScoringSystem {
  private campaignData: CampaignRequest
  
  constructor(campaignData: CampaignRequest) {
    this.campaignData = campaignData
  }
  
  /**
   * 对整个营销活动进行AI评分
   */
  public scoreCampaign(messages: GeneratedMessage[]): CampaignScore {
    const messageScores = messages.map(message => this.scoreMessage(message))
    const averageScore = messageScores.reduce((sum, score) => sum + score.overallScore, 0) / messageScores.length
    
    return {
      campaignId: `campaign_${Date.now()}`,
      averageScore,
      messageScores,
      campaignOptimizations: this.generateCampaignOptimizations(messageScores),
      predictedMetrics: this.predictCampaignMetrics(messageScores)
    }
  }
  
  /**
   * 对单个消息进行AI评分
   */
  private scoreMessage(message: GeneratedMessage): MessageScore {
    const personalizationScore = this.scorePersonalization(message)
    const engagementScore = this.scoreEngagement(message)
    const actionabilityScore = this.scoreActionability(message)
    const brandAlignmentScore = this.scoreBrandAlignment(message)
    
    const overallScore = (personalizationScore + engagementScore + actionabilityScore + brandAlignmentScore) / 4
    
    return {
      messageId: message.id,
      overallScore,
      personalizationScore,
      engagementScore,
      actionabilityScore,
      brandAlignmentScore,
      detailedFeedback: this.generateDetailedFeedback(message, {
        personalizationScore,
        engagementScore,
        actionabilityScore,
        brandAlignmentScore
      }),
      optimizationRecommendations: this.generateOptimizationRecommendations(message, {
        personalizationScore,
        engagementScore,
        actionabilityScore,
        brandAlignmentScore
      })
    }
  }
  
  /**
   * 评分个性化程度
   */
  private scorePersonalization(message: GeneratedMessage): number {
    let score = 0
    const content = message.content.toLowerCase()
    const subject = message.subject?.toLowerCase() || ''
    
    // 检查个性化元素
    if (content.includes(message.patientName.toLowerCase())) {
      score += 0.2 // 包含患者姓名
    }
    
    // 检查年龄相关内容
    if (content.includes('age') || content.includes('years old') || /\d+/.test(content)) {
      score += 0.2 // 包含年龄相关内容
    }
    
    // 检查个性化钩子
    const personalizedElements = message.personalizedElements || []
    if (personalizedElements.length >= 3) {
      score += 0.3 // 多个个性化元素
    } else if (personalizedElements.length >= 2) {
      score += 0.2
    } else if (personalizedElements.length >= 1) {
      score += 0.1
    }
    
    // 检查匹配标准
    const matchingCriteria = message.matchingCriteria || []
    if (matchingCriteria.length >= 2) {
      score += 0.2 // 多个匹配标准
    } else if (matchingCriteria.length >= 1) {
      score += 0.1
    }
    
    // 检查主题行个性化（仅限邮件）
    if (message.channel === 'email' && subject.includes(message.patientName.toLowerCase())) {
      score += 0.1 // 主题行包含姓名
    }
    
    return Math.min(score, 1.0) // 最大值为1.0
  }
  
  /**
   * 评分参与度潜力
   */
  private scoreEngagement(message: GeneratedMessage): number {
    let score = 0
    const content = message.content.toLowerCase()
    const subject = message.subject?.toLowerCase() || ''
    
    // 检查紧急性元素
    if (content.includes('urgent') || content.includes('limited time') || content.includes('expires')) {
      score += 0.2
    }
    
    // 检查社交证明
    if (content.includes('other patients') || content.includes('popular') || content.includes('recommended')) {
      score += 0.15
    }
    
    // 检查明星参考
    if (content.includes('celebrity') || /[A-Z][a-z]+\s+[A-Z][a-z]+/.test(content)) {
      score += 0.2 // 可能包含明星姓名
    }
    
    // 检查情感触发
    const emotionalWords = ['amazing', 'beautiful', 'confidence', 'stunning', 'glow', 'radiant']
    const emotionalCount = emotionalWords.filter(word => content.includes(word)).length
    score += Math.min(emotionalCount * 0.05, 0.2)
    
    // 检查对话式语调
    if (content.includes('?') || content.includes('!')) {
      score += 0.1
    }
    
    // 检查主题行吸引力（仅限邮件）
    if (message.channel === 'email') {
      if (subject.includes('?') || subject.includes('!') || subject.includes('urgent')) {
        score += 0.1
      }
    }
    
    // 基于预估参与度
    const estimatedEngagement = message.estimatedEngagement || 60
    score += (estimatedEngagement - 60) / 40 * 0.2 // 将60-100%映射到0-0.2
    
    return Math.min(score, 1.0)
  }
  
  /**
   * 评分行动导向性
   */
  private scoreActionability(message: GeneratedMessage): number {
    let score = 0
    const content = message.content.toLowerCase()
    
    // 检查明确的CTA
    const ctaWords = ['book', 'call', 'schedule', 'reserve', 'click', 'reply', 'respond']
    const ctaCount = ctaWords.filter(word => content.includes(word)).length
    score += Math.min(ctaCount * 0.15, 0.3)
    
    // 检查行动的简易性
    if (content.includes('one click') || content.includes('simple') || content.includes('easy')) {
      score += 0.15
    }
    
    // 检查时间限制
    if (content.includes('today') || content.includes('this week') || content.includes('48 hours')) {
      score += 0.2
    }
    
    // 检查联系方式
    if (content.includes('phone') || content.includes('email') || content.includes('text')) {
      score += 0.1
    }
    
    // 检查优惠或激励
    if (content.includes('discount') || content.includes('special') || content.includes('offer')) {
      score += 0.15
    }
    
    // 短信特殊检查
    if (message.channel === 'text') {
      if (content.includes('y/n') || content.includes('yes/no') || content.includes('reply')) {
        score += 0.2 // 短信的简单回复机制
      }
    }
    
    return Math.min(score, 1.0)
  }
  
  /**
   * 评分品牌一致性
   */
  private scoreBrandAlignment(message: GeneratedMessage): number {
    let score = 0.5 // 基础分数
    const content = message.content.toLowerCase()
    
    // 检查专业性
    if (content.includes('dr.') || content.includes('doctor') || content.includes('medical')) {
      score += 0.2
    }
    
    // 检查医疗美容专业术语
    const medicalTerms = ['botox', 'filler', 'laser', 'treatment', 'procedure', 'consultation']
    const termCount = medicalTerms.filter(term => content.includes(term)).length
    score += Math.min(termCount * 0.05, 0.2)
    
    // 检查品牌温度
    if (content.includes('care') || content.includes('support') || content.includes('journey')) {
      score += 0.15
    }
    
    // 检查质量承诺
    if (content.includes('quality') || content.includes('excellence') || content.includes('results')) {
      score += 0.1
    }
    
    // 检查不当内容（减分）
    const inappropriateWords = ['cheap', 'discount', 'sale', 'deal']
    const inappropriateCount = inappropriateWords.filter(word => content.includes(word)).length
    score -= inappropriateCount * 0.1
    
    return Math.max(Math.min(score, 1.0), 0.0)
  }
  
  /**
   * 生成详细反馈
   */
  private generateDetailedFeedback(message: GeneratedMessage, scores: any): MessageScore['detailedFeedback'] {
    const strengths: string[] = []
    const improvements: string[] = []
    const suggestions: string[] = []
    
    // 个性化反馈
    if (scores.personalizationScore >= 0.8) {
      strengths.push('Excellent personalization with multiple targeted elements')
    } else if (scores.personalizationScore >= 0.6) {
      strengths.push('Good personalization level')
    } else {
      improvements.push('Increase personalization elements')
      suggestions.push('Add more patient-specific details like age, procedure history, or lifestyle factors')
    }
    
    // 参与度反馈
    if (scores.engagementScore >= 0.8) {
      strengths.push('High engagement potential with emotional hooks')
    } else if (scores.engagementScore < 0.5) {
      improvements.push('Enhance engagement elements')
      suggestions.push('Add celebrity references, social proof, or urgency elements')
    }
    
    // 行动导向性反馈
    if (scores.actionabilityScore >= 0.8) {
      strengths.push('Clear and compelling call-to-action')
    } else if (scores.actionabilityScore < 0.6) {
      improvements.push('Strengthen call-to-action')
      suggestions.push('Make the next steps clearer and add time-sensitive elements')
    }
    
    // 品牌一致性反馈
    if (scores.brandAlignmentScore >= 0.8) {
      strengths.push('Excellent brand alignment and professional tone')
    } else if (scores.brandAlignmentScore < 0.6) {
      improvements.push('Better brand alignment needed')
      suggestions.push('Ensure professional medical aesthetic tone and terminology')
    }
    
    return { strengths, improvements, suggestions }
  }
  
  /**
   * 生成优化建议
   */
  private generateOptimizationRecommendations(message: GeneratedMessage, scores: any): MessageScore['optimizationRecommendations'] {
    const recommendations: MessageScore['optimizationRecommendations'] = {}
    
    // 主题行优化
    if (message.channel === 'email' && scores.engagementScore < 0.7) {
      recommendations.subjectLine = `${message.patientName}, Your ${this.getAgeAppropriateReference()} Beauty Transformation Awaits`
    }
    
    // 内容调整
    const contentAdjustments: string[] = []
    if (scores.personalizationScore < 0.6) {
      contentAdjustments.push('Add more specific patient details and treatment history')
    }
    if (scores.engagementScore < 0.6) {
      contentAdjustments.push('Include celebrity age-matching references and social proof')
    }
    if (scores.actionabilityScore < 0.6) {
      contentAdjustments.push('Add clearer call-to-action with urgency elements')
    }
    
    if (contentAdjustments.length > 0) {
      recommendations.contentAdjustments = contentAdjustments
    }
    
    // 时机建议
    const timingRecommendations: string[] = []
    if (this.campaignData.psychologicalTriggers.seasonal.length > 0) {
      timingRecommendations.push('Send during optimal seasonal timing for maximum impact')
    }
    if (message.channel === 'email') {
      timingRecommendations.push('Best send times: Tuesday 10AM or Thursday 2PM')
    } else {
      timingRecommendations.push('Best send times: Weekdays 11AM-1PM or 5-7PM')
    }
    
    recommendations.timingRecommendations = timingRecommendations
    
    // 渠道优化
    if (scores.overallScore < 0.6) {
      recommendations.channelOptimization = message.channel === 'email' 
        ? 'Consider SMS for more immediate engagement'
        : 'Consider email for more detailed personalization'
    }
    
    return recommendations
  }
  
  /**
   * 生成营销活动优化建议
   */
  private generateCampaignOptimizations(messageScores: MessageScore[]): CampaignScore['campaignOptimizations'] {
    const bestPerformingPatterns: string[] = []
    const underperformingElements: string[] = []
    const globalRecommendations: string[] = []
    
    // 分析最佳表现模式
    const topScores = messageScores.filter(score => score.overallScore >= 0.8)
    if (topScores.length > 0) {
      bestPerformingPatterns.push('High personalization with celebrity references')
      bestPerformingPatterns.push('Clear urgency and time-sensitive offers')
      bestPerformingPatterns.push('Professional medical aesthetic tone')
    }
    
    // 识别表现不佳的元素
    const lowScores = messageScores.filter(score => score.overallScore < 0.6)
    if (lowScores.length > 0) {
      underperformingElements.push('Generic messaging without personalization')
      underperformingElements.push('Weak call-to-action elements')
      underperformingElements.push('Lack of urgency or time sensitivity')
    }
    
    // 全局建议
    const avgPersonalization = messageScores.reduce((sum, score) => sum + score.personalizationScore, 0) / messageScores.length
    if (avgPersonalization < 0.7) {
      globalRecommendations.push('Increase personalization across all messages')
    }
    
    const avgEngagement = messageScores.reduce((sum, score) => sum + score.engagementScore, 0) / messageScores.length
    if (avgEngagement < 0.7) {
      globalRecommendations.push('Add more engaging elements like celebrity references and social proof')
    }
    
    const avgActionability = messageScores.reduce((sum, score) => sum + score.actionabilityScore, 0) / messageScores.length
    if (avgActionability < 0.7) {
      globalRecommendations.push('Strengthen call-to-action elements with clearer next steps')
    }
    
    return {
      bestPerformingPatterns,
      underperformingElements,
      globalRecommendations
    }
  }
  
  /**
   * 预测营销活动指标
   */
  private predictCampaignMetrics(messageScores: MessageScore[]): CampaignScore['predictedMetrics'] {
    const avgScore = messageScores.reduce((sum, score) => sum + score.overallScore, 0) / messageScores.length
    const avgEngagement = messageScores.reduce((sum, score) => sum + score.engagementScore, 0) / messageScores.length
    const avgActionability = messageScores.reduce((sum, score) => sum + score.actionabilityScore, 0) / messageScores.length
    
    // 基于评分预测指标
    const openRate = Math.min(avgEngagement * 45 + 15, 60) // 15-60%
    const clickThroughRate = Math.min(avgActionability * 25 + 5, 30) // 5-30%
    const conversionRate = Math.min(avgScore * 15 + 2, 17) // 2-17%
    const responseRate = Math.min(avgScore * 50 + 10, 60) // 10-60% (for SMS)
    
    return {
      openRate: Math.round(openRate),
      clickThroughRate: Math.round(clickThroughRate),
      conversionRate: Math.round(conversionRate),
      responseRate: Math.round(responseRate)
    }
  }
  
  /**
   * 获取年龄适当的参考
   */
  private getAgeAppropriateReference(): string {
    const ageRange = this.campaignData.demographics.ageRange
    const avgAge = (ageRange[0] + ageRange[1]) / 2
    
    if (avgAge < 35) {
      return 'Millennial'
    } else if (avgAge < 50) {
      return 'Gen X'
    } else {
      return 'Baby Boomer'
    }
  }
}

/**
 * A/B测试优化系统
 */
export class ABTestOptimizer {
  /**
   * 生成A/B测试变体
   */
  public generateABVariants(originalMessage: GeneratedMessage, campaignData: CampaignRequest): GeneratedMessage[] {
    const variants: GeneratedMessage[] = [originalMessage]
    
    // 变体A: 更强的紧急性
    const urgentVariant = this.createUrgentVariant(originalMessage)
    variants.push(urgentVariant)
    
    // 变体B: 更多社交证明
    const socialProofVariant = this.createSocialProofVariant(originalMessage)
    variants.push(socialProofVariant)
    
    // 变体C: 不同的CTA
    const ctaVariant = this.createCTAVariant(originalMessage)
    variants.push(ctaVariant)
    
    return variants
  }
  
  private createUrgentVariant(original: GeneratedMessage): GeneratedMessage {
    return {
      ...original,
      id: `${original.id}_urgent`,
      subject: original.subject ? `URGENT: ${original.subject}` : undefined,
      content: `🚨 LIMITED TIME: ${original.content}`,
      personalizedElements: [...original.personalizedElements, 'High urgency variant']
    }
  }
  
  private createSocialProofVariant(original: GeneratedMessage): GeneratedMessage {
    return {
      ...original,
      id: `${original.id}_social`,
      content: `${original.content}\n\n✨ Join 500+ satisfied patients who chose this treatment this month!`,
      personalizedElements: [...original.personalizedElements, 'Social proof variant']
    }
  }
  
  private createCTAVariant(original: GeneratedMessage): GeneratedMessage {
    const newCTA = original.channel === 'email' 
      ? '[INSTANT BOOKING - Click Here]' 
      : 'Text BOOK for instant scheduling'
    
    return {
      ...original,
      id: `${original.id}_cta`,
      content: original.content.replace(/\[.*?\]/, newCTA),
      personalizedElements: [...original.personalizedElements, 'Enhanced CTA variant']
    }
  }
}
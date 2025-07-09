import { UserProfile } from '@/lib/types'
import type { CampaignRequest } from '@/app/api/campaign-generator/route'

export interface TargetingScore {
  userId: string
  userName: string
  totalScore: number
  demographicScore: number
  behavioralScore: number
  psychologicalScore: number
  matchingReasons: string[]
  recommendedChannel: 'email' | 'text'
  urgencyLevel: 'low' | 'medium' | 'high'
  personalizedHooks: string[]
}

export interface TargetingResults {
  totalUsers: number
  matchedUsers: number
  averageScore: number
  topTargets: TargetingScore[]
  channelDistribution: {
    email: number
    text: number
  }
  urgencyDistribution: {
    low: number
    medium: number
    high: number
  }
}

export class AdvancedTargetingEngine {
  private userProfiles: UserProfile[]
  
  constructor(userProfiles: UserProfile[]) {
    this.userProfiles = userProfiles
  }
  
  /**
   * 执行高级用户定位分析
   */
  public analyzeTargeting(campaignData: CampaignRequest): TargetingResults {
    const targetingScores: TargetingScore[] = []
    
    for (const user of this.userProfiles) {
      const score = this.calculateUserScore(user, campaignData)
      if (score.totalScore > 0.3) { // 只包含得分超过30%的用户
        targetingScores.push(score)
      }
    }
    
    // 按总分排序
    targetingScores.sort((a, b) => b.totalScore - a.totalScore)
    
    return this.generateTargetingResults(targetingScores)
  }
  
  /**
   * 为单个用户计算定位分数
   */
  private calculateUserScore(user: UserProfile, campaignData: CampaignRequest): TargetingScore {
    const demographicScore = this.calculateDemographicScore(user, campaignData.demographics)
    const behavioralScore = this.calculateBehavioralScore(user, campaignData.behavioral)
    const psychologicalScore = this.calculatePsychologicalScore(user, campaignData.psychologicalTriggers)
    
    const totalScore = (demographicScore + behavioralScore + psychologicalScore) / 3
    
    return {
      userId: user.id || user.name,
      userName: user.name,
      totalScore,
      demographicScore,
      behavioralScore,
      psychologicalScore,
      matchingReasons: this.generateMatchingReasons(user, campaignData),
      recommendedChannel: this.determineRecommendedChannel(user, campaignData),
      urgencyLevel: this.calculateUrgencyLevel(user, campaignData),
      personalizedHooks: this.generatePersonalizedHooks(user, campaignData)
    }
  }
  
  /**
   * 计算人口统计学得分
   */
  private calculateDemographicScore(user: UserProfile, demographics: CampaignRequest['demographics']): number {
    let score = 0
    let factors = 0
    
    // 年龄匹配
    if (user.age >= demographics.ageRange[0] && user.age <= demographics.ageRange[1]) {
      score += 1
      // 年龄越接近中位数，得分越高
      const midAge = (demographics.ageRange[0] + demographics.ageRange[1]) / 2
      const ageProximity = 1 - Math.abs(user.age - midAge) / (demographics.ageRange[1] - demographics.ageRange[0])
      score += ageProximity * 0.5
    }
    factors++
    
    // 性别匹配
    if (demographics.gender.includes('all') || demographics.gender.includes(user.gender.toLowerCase())) {
      score += 1
    }
    factors++
    
    // 地理位置匹配 (模拟)
    if (demographics.location.zipCode) {
      // 简化的地理匹配逻辑
      const locationMatch = this.simulateLocationMatch(user, demographics.location)
      score += locationMatch
    }
    factors++
    
    // 收入水平匹配
    if (demographics.incomeLevel) {
      const incomeMatch = this.calculateIncomeMatch(user, demographics.incomeLevel)
      score += incomeMatch
    }
    factors++
    
    return score / factors
  }
  
  /**
   * 计算行为得分
   */
  private calculateBehavioralScore(user: UserProfile, behavioral: CampaignRequest['behavioral']): number {
    let score = 0
    let factors = 0
    
    // 手术历史匹配
    if (behavioral.procedureHistory.length > 0) {
      const userProcedures = user.surgeryHistory || []
      const matchingProcedures = behavioral.procedureHistory.filter(proc => 
        userProcedures.some(userProc => userProc.procedure.toLowerCase().includes(proc.toLowerCase()))
      )
      score += matchingProcedures.length / behavioral.procedureHistory.length
      factors++
    }
    
    // 未尝试手术匹配
    if (behavioral.procedureNotTried.length > 0) {
      const userProcedures = user.surgeryHistory || []
      const notTriedMatch = behavioral.procedureNotTried.filter(proc => 
        !userProcedures.some(userProc => userProc.procedure.toLowerCase().includes(proc.toLowerCase()))
      )
      score += notTriedMatch.length / behavioral.procedureNotTried.length
      factors++
    }
    
    // 终身价值匹配
    if (user.lifetimeValue) {
      const [minValue, maxValue] = behavioral.lifetimeValueRange
      if (user.lifetimeValue >= minValue && user.lifetimeValue <= maxValue) {
        score += 1
        // 价值越高，得分越高
        score += (user.lifetimeValue - minValue) / (maxValue - minValue) * 0.5
      }
    }
    factors++
    
    // 最后访问时间匹配
    if (behavioral.lastVisitRange && user.lastVisit) {
      const visitMatch = this.calculateVisitRecency(user.lastVisit, behavioral.lastVisitRange)
      score += visitMatch
    }
    factors++
    
    // 参与度匹配
    if (behavioral.engagementLevel) {
      const engagementMatch = this.calculateEngagementMatch(user, behavioral.engagementLevel)
      score += engagementMatch
    }
    factors++
    
    return factors > 0 ? score / factors : 0
  }
  
  /**
   * 计算心理触发得分
   */
  private calculatePsychologicalScore(user: UserProfile, triggers: CampaignRequest['psychologicalTriggers']): number {
    let score = 0
    let factors = 0
    
    // 生活事件匹配
    if (triggers.lifeEvents.length > 0) {
      const userLifeEvents = user.lifeEvents || []
      const matchingEvents = triggers.lifeEvents.filter(event => 
        userLifeEvents.includes(event) || this.inferLifeEventFromProfile(user, event)
      )
      score += matchingEvents.length / triggers.lifeEvents.length
      factors++
    }
    
    // 季节性触发匹配
    if (triggers.seasonal.length > 0) {
      const seasonalMatch = this.calculateSeasonalMatch(user, triggers.seasonal)
      score += seasonalMatch
      factors++
    }
    
    // 文化触发匹配
    if (triggers.cultural.length > 0) {
      const culturalMatch = this.calculateCulturalMatch(user, triggers.cultural)
      score += culturalMatch
      factors++
    }
    
    return factors > 0 ? score / factors : 0
  }
  
  /**
   * 生成匹配原因
   */
  private generateMatchingReasons(user: UserProfile, campaignData: CampaignRequest): string[] {
    const reasons: string[] = []
    
    // 年龄匹配
    if (user.age >= campaignData.demographics.ageRange[0] && user.age <= campaignData.demographics.ageRange[1]) {
      reasons.push(`Perfect age match (${user.age})`)
    }
    
    // 手术历史
    if (campaignData.behavioral.procedureHistory.length > 0) {
      const userProcedures = user.surgeryHistory || []
      const matchingProcedures = campaignData.behavioral.procedureHistory.filter(proc => 
        userProcedures.some(userProc => userProc.procedure.toLowerCase().includes(proc.toLowerCase()))
      )
      if (matchingProcedures.length > 0) {
        reasons.push(`Has experience with ${matchingProcedures.join(', ')}`)
      }
    }
    
    // 高价值客户
    if (user.lifetimeValue && user.lifetimeValue > 5000) {
      reasons.push(`High-value patient ($${user.lifetimeValue.toLocaleString()})`)
    }
    
    // 个性特征
    if (user.traits) {
      const relevantTraits = user.traits.filter(trait => 
        ['Quality-focused', 'Trend-conscious', 'Social'].includes(trait)
      )
      if (relevantTraits.length > 0) {
        reasons.push(`Personality match: ${relevantTraits.join(', ')}`)
      }
    }
    
    return reasons
  }
  
  /**
   * 确定推荐渠道
   */
  private determineRecommendedChannel(user: UserProfile, campaignData: CampaignRequest): 'email' | 'text' {
    // 基于PRD的渠道选择逻辑
    const factors = {
      email: 0,
      text: 0
    }
    
    // 年龄因素
    if (user.age > 50) {
      factors.email += 1
    } else if (user.age < 35) {
      factors.text += 1
    }
    
    // 参与度历史
    if (user.emailEngagement === 'high') {
      factors.email += 2
    } else if (user.emailEngagement === 'low') {
      factors.text += 1
    }
    
    // 紧急性
    if (campaignData.psychologicalTriggers.seasonal.includes('Holiday parties')) {
      factors.text += 1 // 节日活动更紧急
    }
    
    // 高价值客户偏好邮件
    if (user.lifetimeValue && user.lifetimeValue > 10000) {
      factors.email += 1
    }
    
    return factors.email >= factors.text ? 'email' : 'text'
  }
  
  /**
   * 计算紧急程度
   */
  private calculateUrgencyLevel(user: UserProfile, campaignData: CampaignRequest): 'low' | 'medium' | 'high' {
    let urgencyScore = 0
    
    // 季节性紧急性
    if (campaignData.psychologicalTriggers.seasonal.includes('Holiday parties')) {
      urgencyScore += 2
    }
    
    // 最后访问时间
    if (user.lastVisit) {
      const daysSinceVisit = this.calculateDaysSinceLastVisit(user.lastVisit)
      if (daysSinceVisit > 180) {
        urgencyScore += 2 // 长时间未访问，需要重新激活
      } else if (daysSinceVisit > 90) {
        urgencyScore += 1
      }
    }
    
    // 生活事件紧急性
    if (campaignData.psychologicalTriggers.lifeEvents.includes('Wedding')) {
      urgencyScore += 3
    }
    
    if (urgencyScore >= 3) return 'high'
    if (urgencyScore >= 2) return 'medium'
    return 'low'
  }
  
  /**
   * 生成个性化钩子
   */
  private generatePersonalizedHooks(user: UserProfile, campaignData: CampaignRequest): string[] {
    const hooks: string[] = []
    
    // 年龄特定的明星参考
    const celebrityHook = this.generateCelebrityHook(user.age)
    if (celebrityHook) {
      hooks.push(celebrityHook)
    }
    
    // 手术历史钩子
    if (user.surgeryHistory && user.surgeryHistory.length > 0) {
      const lastProcedure = user.surgeryHistory[user.surgeryHistory.length - 1]
      hooks.push(`Your ${lastProcedure.procedure} results were amazing`)
    }
    
    // 个性特征钩子
    if (user.traits?.includes('Quality-focused')) {
      hooks.push('Premium results deserve premium care')
    }
    
    if (user.traits?.includes('Busy Mom')) {
      hooks.push('Quick treatments that fit your schedule')
    }
    
    return hooks
  }
  
  // 辅助方法
  private simulateLocationMatch(user: UserProfile, location: { zipCode: string; radius: number }): number {
    // 简化的地理匹配逻辑
    return Math.random() > 0.3 ? 1 : 0.5
  }
  
  private calculateIncomeMatch(user: UserProfile, incomeLevel: string): number {
    // 基于用户的终身价值推断收入匹配
    const lifetimeValue = user.lifetimeValue || 0
    
    switch (incomeLevel) {
      case '250k+':
        return lifetimeValue > 15000 ? 1 : 0.5
      case '150k-250k':
        return lifetimeValue > 10000 ? 1 : 0.7
      case '100k-150k':
        return lifetimeValue > 5000 ? 1 : 0.8
      default:
        return 0.6
    }
  }
  
  private calculateVisitRecency(lastVisit: string, range: string): number {
    const days = this.calculateDaysSinceLastVisit(lastVisit)
    
    switch (range) {
      case '0-30':
        return days <= 30 ? 1 : 0
      case '31-90':
        return days > 30 && days <= 90 ? 1 : 0.5
      case '91-180':
        return days > 90 && days <= 180 ? 1 : 0.3
      default:
        return days > 180 ? 1 : 0.2
    }
  }
  
  private calculateDaysSinceLastVisit(lastVisit: string): number {
    const visitDate = new Date(lastVisit)
    const today = new Date()
    return Math.floor((today.getTime() - visitDate.getTime()) / (1000 * 60 * 60 * 24))
  }
  
  private calculateEngagementMatch(user: UserProfile, level: string): number {
    const userEngagement = user.emailEngagement || 'medium'
    
    const engagementScores: { [key: string]: number } = {
      'high': 1,
      'medium': 0.7,
      'low': 0.4,
      'none': 0.1
    }
    
    return engagementScores[userEngagement] || 0.5
  }
  
  private inferLifeEventFromProfile(user: UserProfile, event: string): boolean {
    // 基于用户档案推断生活事件
    if (event === 'Wedding' && user.age >= 25 && user.age <= 35) {
      return Math.random() > 0.7
    }
    
    if (event === 'New Job' && user.traits?.includes('Professional')) {
      return Math.random() > 0.6
    }
    
    return false
  }
  
  private calculateSeasonalMatch(user: UserProfile, seasonal: string[]): number {
    // 所有用户都可能对季节性活动感兴趣
    return seasonal.length > 0 ? 0.8 : 0
  }
  
  private calculateCulturalMatch(user: UserProfile, cultural: string[]): number {
    // 基于年龄和特征计算文化匹配
    let match = 0
    
    if (cultural.includes('Celebrity news')) {
      if (user.age < 50) match += 0.8
      else match += 0.6
    }
    
    if (cultural.includes('Award shows')) {
      if (user.traits?.includes('Trend-conscious')) match += 0.9
      else match += 0.5
    }
    
    return Math.min(match, 1)
  }
  
  private generateCelebrityHook(age: number): string | null {
    const celebrities = [
      { name: 'Jennifer Aniston', age: 54 },
      { name: 'Sandra Bullock', age: 59 },
      { name: 'Reese Witherspoon', age: 47 },
      { name: 'Charlize Theron', age: 48 }
    ]
    
    const closest = celebrities.reduce((prev, curr) => 
      Math.abs(curr.age - age) < Math.abs(prev.age - age) ? curr : prev
    )
    
    return `${closest.name} (age ${closest.age}) secret revealed`
  }
  
  private generateTargetingResults(scores: TargetingScore[]): TargetingResults {
    const totalUsers = this.userProfiles.length
    const matchedUsers = scores.length
    const averageScore = scores.reduce((sum, score) => sum + score.totalScore, 0) / matchedUsers
    
    const channelDistribution = {
      email: scores.filter(s => s.recommendedChannel === 'email').length,
      text: scores.filter(s => s.recommendedChannel === 'text').length
    }
    
    const urgencyDistribution = {
      low: scores.filter(s => s.urgencyLevel === 'low').length,
      medium: scores.filter(s => s.urgencyLevel === 'medium').length,
      high: scores.filter(s => s.urgencyLevel === 'high').length
    }
    
    return {
      totalUsers,
      matchedUsers,
      averageScore,
      topTargets: scores.slice(0, 10), // 前10个最佳目标
      channelDistribution,
      urgencyDistribution
    }
  }
}
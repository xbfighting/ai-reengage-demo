import type { CampaignRequest, GeneratedMessage } from '@/app/api/campaign-generator/route'
import { AdvancedTargetingEngine } from './targeting-engine'
import { AIMessageScoringSystem } from './ai-scoring-system'
import { UserProfile } from './types'

export interface BatchGenerationOptions {
  maxMessages: number
  minQualityScore: number
  includeABVariants: boolean
  exportFormat: 'json' | 'csv' | 'excel'
  groupByChannel: boolean
  includeScoring: boolean
}

export interface BatchGenerationResult {
  campaignId: string
  totalGenerated: number
  generatedAt: Date
  messages: GeneratedMessage[]
  statistics: {
    byChannel: { email: number; text: number }
    byScore: { high: number; medium: number; low: number }
    averageScore: number
  }
  exportData?: {
    format: string
    data: string | ArrayBuffer
    filename: string
  }
}

export interface RealTimePreview {
  messageId: string
  patientName: string
  content: string
  subject?: string
  channel: 'email' | 'text'
  score: number
  lastUpdated: Date
  isOptimized: boolean
}

export class BatchMessageGenerator {
  private users: UserProfile[]
  private campaignData: CampaignRequest
  private targetingEngine: AdvancedTargetingEngine
  private scoringSystem: AIMessageScoringSystem
  
  constructor(users: UserProfile[], campaignData: CampaignRequest) {
    this.users = users
    this.campaignData = campaignData
    this.targetingEngine = new AdvancedTargetingEngine(users)
    this.scoringSystem = new AIMessageScoringSystem(campaignData)
  }
  
  /**
   * 批量生成营销消息
   */
  public async generateBatch(options: BatchGenerationOptions): Promise<BatchGenerationResult> {
    const campaignId = `batch_${Date.now()}`
    const startTime = Date.now()
    
    // 获取定位结果
    const targetingResults = this.targetingEngine.analyzeTargeting(this.campaignData)
    
    // 选择最佳目标用户
    const selectedTargets = targetingResults.topTargets
      .filter(target => target.totalScore >= options.minQualityScore / 100)
      .slice(0, options.maxMessages)
    
    // 生成消息
    const messages: GeneratedMessage[] = []
    
    for (const target of selectedTargets) {
      const message = this.generateTargetedMessage(target)
      
      // 根据选项应用优化
      const optimizedMessage = await this.optimizeMessage(message, options)
      messages.push(optimizedMessage)
      
      // 如果需要A/B变体
      if (options.includeABVariants) {
        const variants = this.generateABVariants(optimizedMessage)
        messages.push(...variants)
      }
    }
    
    // 计算统计信息
    const statistics = this.calculateStatistics(messages, options)
    
    // 生成导出数据
    const exportData = options.exportFormat ? 
      await this.generateExportData(messages, options) : 
      undefined
    
    const result: BatchGenerationResult = {
      campaignId,
      totalGenerated: messages.length,
      generatedAt: new Date(),
      messages,
      statistics,
      exportData
    }
    
    console.log(`Batch generation completed in ${Date.now() - startTime}ms`)
    return result
  }
  
  /**
   * 为特定目标生成消息
   */
  private generateTargetedMessage(target: any): GeneratedMessage {
    const content = this.generateAdvancedContent(target)
    const subject = target.recommendedChannel === 'email' ? 
      this.generateAdvancedSubject(target) : 
      undefined
    
    return {
      id: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      patientName: target.userName,
      channel: target.recommendedChannel,
      subject,
      content,
      personalizedElements: target.personalizedHooks,
      matchingCriteria: target.matchingReasons,
      estimatedEngagement: Math.floor(target.totalScore * 40) + 60
    }
  }
  
  /**
   * 优化消息质量
   */
  private async optimizeMessage(message: GeneratedMessage, options: BatchGenerationOptions): Promise<GeneratedMessage> {
    if (!options.includeScoring) {
      return message
    }
    
    const score = this.scoringSystem.scoreCampaign([message])
    const messageScore = score.messageScores[0]
    
    // 如果评分低于阈值，尝试优化
    if (messageScore.overallScore < options.minQualityScore / 100) {
      return this.applyOptimizations(message, messageScore)
    }
    
    return message
  }
  
  /**
   * 应用优化建议
   */
  private applyOptimizations(message: GeneratedMessage, messageScore: any): GeneratedMessage {
    let optimizedContent = message.content
    let optimizedSubject = message.subject
    
    // 应用内容优化
    if (messageScore.optimizationRecommendations.contentAdjustments) {
      for (const adjustment of messageScore.optimizationRecommendations.contentAdjustments) {
        if (adjustment.includes('personalization')) {
          optimizedContent = this.enhancePersonalization(optimizedContent, message.patientName)
        }
        if (adjustment.includes('engagement')) {
          optimizedContent = this.enhanceEngagement(optimizedContent)
        }
        if (adjustment.includes('call-to-action')) {
          optimizedContent = this.enhanceCallToAction(optimizedContent, message.channel)
        }
      }
    }
    
    // 应用主题行优化
    if (messageScore.optimizationRecommendations.subjectLine) {
      optimizedSubject = messageScore.optimizationRecommendations.subjectLine
    }
    
    return {
      ...message,
      content: optimizedContent,
      subject: optimizedSubject,
      personalizedElements: [...message.personalizedElements, 'AI Optimized']
    }
  }
  
  /**
   * 增强个性化
   */
  private enhancePersonalization(content: string, patientName: string): string {
    // 添加更多个性化元素
    const personalizedIntro = `${patientName}, based on your unique profile, `
    
    if (!content.toLowerCase().includes(patientName.toLowerCase())) {
      return personalizedIntro + content
    }
    
    return content
  }
  
  /**
   * 增强参与度
   */
  private enhanceEngagement(content: string): string {
    // 添加紧急性和社交证明
    const urgencyPhrase = "Limited time offer - "
    const socialProof = "\n\nJoin 500+ satisfied patients who chose us this month!"
    
    if (!content.toLowerCase().includes('limited') && !content.toLowerCase().includes('urgent')) {
      content = urgencyPhrase + content
    }
    
    if (!content.toLowerCase().includes('patients')) {
      content = content + socialProof
    }
    
    return content
  }
  
  /**
   * 增强行动召唤
   */
  private enhanceCallToAction(content: string, channel: 'email' | 'text'): string {
    const emailCTA = "\n\n[BOOK NOW - Secure Your Spot Today!]"
    const textCTA = " Reply BOOK now!"
    
    const cta = channel === 'email' ? emailCTA : textCTA
    
    if (!content.toLowerCase().includes('book') && !content.toLowerCase().includes('call')) {
      content = content + cta
    }
    
    return content
  }
  
  /**
   * 生成A/B变体
   */
  private generateABVariants(originalMessage: GeneratedMessage): GeneratedMessage[] {
    const variants: GeneratedMessage[] = []
    
    // 变体A: 更强紧急性
    variants.push({
      ...originalMessage,
      id: `${originalMessage.id}_urgent`,
      subject: originalMessage.subject ? `URGENT: ${originalMessage.subject}` : undefined,
      content: `🚨 URGENT: ${originalMessage.content}`,
      personalizedElements: [...originalMessage.personalizedElements, 'Urgent Variant']
    })
    
    // 变体B: 社交证明
    variants.push({
      ...originalMessage,
      id: `${originalMessage.id}_social`,
      content: `${originalMessage.content}\n\n⭐ Trusted by 1,000+ patients in your area!`,
      personalizedElements: [...originalMessage.personalizedElements, 'Social Proof Variant']
    })
    
    return variants
  }
  
  /**
   * 计算统计信息
   */
  private calculateStatistics(messages: GeneratedMessage[], options: BatchGenerationOptions): BatchGenerationResult['statistics'] {
    const byChannel = {
      email: messages.filter(m => m.channel === 'email').length,
      text: messages.filter(m => m.channel === 'text').length
    }
    
    let byScore = { high: 0, medium: 0, low: 0 }
    let totalScore = 0
    
    if (options.includeScoring) {
      const campaignScore = this.scoringSystem.scoreCampaign(messages)
      
      byScore = {
        high: campaignScore.messageScores.filter(s => s.overallScore >= 0.8).length,
        medium: campaignScore.messageScores.filter(s => s.overallScore >= 0.6 && s.overallScore < 0.8).length,
        low: campaignScore.messageScores.filter(s => s.overallScore < 0.6).length
      }
      
      totalScore = campaignScore.averageScore
    }
    
    return {
      byChannel,
      byScore,
      averageScore: totalScore
    }
  }
  
  /**
   * 生成导出数据
   */
  private async generateExportData(messages: GeneratedMessage[], options: BatchGenerationOptions): Promise<BatchGenerationResult['exportData']> {
    const timestamp = new Date().toISOString().slice(0, 10)
    const filename = `campaign_${timestamp}.${options.exportFormat}`
    
    switch (options.exportFormat) {
      case 'json':
        return {
          format: 'json',
          data: JSON.stringify(messages, null, 2),
          filename
        }
      
      case 'csv':
        return {
          format: 'csv',
          data: this.generateCSV(messages),
          filename
        }
      
      case 'excel':
        return {
          format: 'excel',
          data: await this.generateExcel(messages),
          filename: filename.replace('.excel', '.xlsx')
        }
      
      default:
        throw new Error(`Unsupported export format: ${options.exportFormat}`)
    }
  }
  
  /**
   * 生成CSV数据
   */
  private generateCSV(messages: GeneratedMessage[]): string {
    const headers = ['ID', 'Patient Name', 'Channel', 'Subject', 'Content', 'Estimated Engagement']
    const rows = messages.map(message => [
      message.id,
      message.patientName,
      message.channel,
      message.subject || '',
      message.content.replace(/\n/g, ' '),
      message.estimatedEngagement.toString()
    ])
    
    const csvContent = [headers, ...rows]
      .map(row => row.map(cell => `"${cell.replace(/"/g, '""')}"`).join(','))
      .join('\n')
    
    return csvContent
  }
  
  /**
   * 生成Excel数据
   */
  private async generateExcel(messages: GeneratedMessage[]): Promise<ArrayBuffer> {
    // 简化的Excel生成 - 在实际项目中会使用如SheetJS等库
    const csvData = this.generateCSV(messages)
    return new TextEncoder().encode(csvData).buffer
  }
  
  /**
   * 生成高级内容
   */
  private generateAdvancedContent(target: any): string {
    const personalizedHooks = target.personalizedHooks.join('\n')
    const urgencyPrefix = target.urgencyLevel === 'high' ? 'URGENT: ' : ''
    
    return `${urgencyPrefix}Hi ${target.userName},

${personalizedHooks}

Based on your profile and preferences, we have a special opportunity for you.

${this.campaignData.campaignBrief}

Why this is perfect for you:
${target.matchingReasons.map((reason: string) => `• ${reason}`).join('\n')}

Book your consultation today for priority access!

Best regards,
Dr. Clevens Team

[Book Now - Priority Access]`
  }
  
  /**
   * 生成高级主题行
   */
  private generateAdvancedSubject(target: any): string {
    const urgencyPrefix = target.urgencyLevel === 'high' ? 'URGENT: ' : ''
    return `${urgencyPrefix}${target.userName}, Your ${Math.round(target.totalScore * 100)}% Perfect Match Treatment`
  }
}

/**
 * 实时预览管理器
 */
export class RealTimePreviewManager {
  private previews: Map<string, RealTimePreview> = new Map()
  private updateCallbacks: Array<(preview: RealTimePreview) => void> = []
  
  /**
   * 创建实时预览
   */
  public createPreview(campaignData: CampaignRequest, patientName: string): RealTimePreview {
    const messageId = `preview_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    
    const preview: RealTimePreview = {
      messageId,
      patientName,
      content: this.generatePreviewContent(campaignData, patientName),
      subject: campaignData.channel === 'email' ? 
        this.generatePreviewSubject(campaignData, patientName) : 
        undefined,
      channel: campaignData.channel,
      score: Math.random() * 40 + 60, // 模拟评分
      lastUpdated: new Date(),
      isOptimized: false
    }
    
    this.previews.set(messageId, preview)
    this.notifyCallbacks(preview)
    
    return preview
  }
  
  /**
   * 更新预览
   */
  public updatePreview(messageId: string, updates: Partial<RealTimePreview>): RealTimePreview | null {
    const preview = this.previews.get(messageId)
    if (!preview) return null
    
    const updatedPreview = {
      ...preview,
      ...updates,
      lastUpdated: new Date()
    }
    
    this.previews.set(messageId, updatedPreview)
    this.notifyCallbacks(updatedPreview)
    
    return updatedPreview
  }
  
  /**
   * 优化预览
   */
  public optimizePreview(messageId: string): RealTimePreview | null {
    const preview = this.previews.get(messageId)
    if (!preview) return null
    
    const optimizedContent = this.applyOptimizations(preview.content, preview.patientName)
    const optimizedSubject = preview.subject ? 
      `OPTIMIZED: ${preview.subject}` : 
      undefined
    
    return this.updatePreview(messageId, {
      content: optimizedContent,
      subject: optimizedSubject,
      score: Math.min(preview.score + 15, 100),
      isOptimized: true
    })
  }
  
  /**
   * 订阅预览更新
   */
  public onPreviewUpdate(callback: (preview: RealTimePreview) => void): () => void {
    this.updateCallbacks.push(callback)
    
    // 返回取消订阅函数
    return () => {
      const index = this.updateCallbacks.indexOf(callback)
      if (index > -1) {
        this.updateCallbacks.splice(index, 1)
      }
    }
  }
  
  /**
   * 通知回调
   */
  private notifyCallbacks(preview: RealTimePreview): void {
    this.updateCallbacks.forEach(callback => callback(preview))
  }
  
  /**
   * 生成预览内容
   */
  private generatePreviewContent(campaignData: CampaignRequest, patientName: string): string {
    return `Hi ${patientName},

${campaignData.campaignBrief}

This is a personalized preview of your campaign message. 

The content will be dynamically generated based on your targeting criteria and AI optimization.

Best regards,
Dr. Clevens Team

[Book Now]`
  }
  
  /**
   * 生成预览主题行
   */
  private generatePreviewSubject(campaignData: CampaignRequest, patientName: string): string {
    return `${patientName}, Your Personalized Treatment Preview`
  }
  
  /**
   * 应用优化
   */
  private applyOptimizations(content: string, patientName: string): string {
    // 添加个性化和紧急性
    const optimizations = [
      `${patientName}, EXCLUSIVE OFFER: `,
      '\n\n🌟 LIMITED TIME: Book within 48 hours for special pricing!',
      '\n\n✨ Join 500+ satisfied patients who chose this treatment!'
    ]
    
    return optimizations[0] + content + optimizations[1] + optimizations[2]
  }
}
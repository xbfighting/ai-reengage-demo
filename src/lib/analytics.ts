/**
 * 简单的性能监控和用户行为分析工具
 */

interface AnalyticsEvent {
  name: string
  properties?: Record<string, unknown>
  timestamp: number
  sessionId: string
}

class Analytics {
  private events: AnalyticsEvent[] = []
  private sessionId: string
  private startTime: number

  constructor() {
    this.sessionId = this.generateSessionId()
    this.startTime = Date.now()
  }

  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }

  /**
   * 记录事件
   */
  track(eventName: string, properties?: Record<string, unknown>): void {
    const event: AnalyticsEvent = {
      name: eventName,
      properties: properties || {},
      timestamp: Date.now(),
      sessionId: this.sessionId,
    }

    this.events.push(event)

    // 在开发环境中打印事件
    if (process.env.NODE_ENV === 'development') {
      console.log('📊 Analytics Event:', event)
    }
  }

  /**
   * 记录页面访问
   */
  trackPageView(pageName: string, additionalData?: Record<string, unknown>): void {
    this.track('page_view', {
      page: pageName,
      ...additionalData,
    })
  }

  /**
   * 记录用户操作
   */
  trackUserAction(action: string, target?: string, additionalData?: Record<string, unknown>): void {
    this.track('user_action', {
      action,
      target,
      ...additionalData,
    })
  }

  /**
   * 记录邮件生成事件
   */
  trackEmailGeneration(
    userName: string,
    scene: string,
    success: boolean,
    duration?: number,
    errorMessage?: string
  ): void {
    this.track('email_generation', {
      user_name: userName,
      scene,
      success,
      duration,
      error_message: errorMessage,
    })
  }

  /**
   * 记录性能指标
   */
  trackPerformance(metricName: string, value: number, unit = 'ms'): void {
    this.track('performance', {
      metric: metricName,
      value,
      unit,
    })
  }

  /**
   * 获取会话摘要
   */
  getSessionSummary(): {
    sessionId: string
    duration: number
    eventCount: number
    events: AnalyticsEvent[]
  } {
    return {
      sessionId: this.sessionId,
      duration: Date.now() - this.startTime,
      eventCount: this.events.length,
      events: [...this.events],
    }
  }

  /**
   * 导出数据 (用于调试)
   */
  exportData(): string {
    return JSON.stringify(this.getSessionSummary(), null, 2)
  }

  /**
   * 清除数据
   */
  clear(): void {
    this.events = []
    this.sessionId = this.generateSessionId()
    this.startTime = Date.now()
  }
}

// 性能测量工具
export class PerformanceMonitor {
  private static measurements = new Map<string, number>()

  /**
   * 开始测量
   */
  static start(label: string): void {
    this.measurements.set(label, performance.now())
  }

  /**
   * 结束测量并返回耗时
   */
  static end(label: string): number {
    const startTime = this.measurements.get(label)
    if (!startTime) {
      console.warn(`No start time found for measurement: ${label}`)
      return 0
    }

    const duration = performance.now() - startTime
    this.measurements.delete(label)

    // 自动记录到分析系统
    analytics.trackPerformance(label, duration)

    return duration
  }

  /**
   * 测量函数执行时间
   */
  static async measure<T>(
    label: string,
    fn: () => Promise<T> | T
  ): Promise<{ result: T; duration: number }> {
    this.start(label)
    const result = await fn()
    const duration = this.end(label)

    return { result, duration }
  }
}

// 创建全局分析实例
export const analytics = new Analytics()

// 全局错误追踪
if (typeof window !== 'undefined') {
  window.addEventListener('error', (event) => {
    analytics.track('javascript_error', {
      message: event.message,
      filename: event.filename,
      lineno: event.lineno,
      colno: event.colno,
    })
  })

  window.addEventListener('unhandledrejection', (event) => {
    analytics.track('unhandled_promise_rejection', {
      reason: event.reason?.toString(),
    })
  })
}

export default analytics

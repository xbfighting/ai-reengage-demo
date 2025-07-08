/**
 * 项目配置文件
 */

export const CONFIG = {
  // 应用基本信息
  app: {
    name: 'AI ReEngage Demo',
    version: '0.2.0',
    description: 'AI驱动的个性化复购邮件营销系统',
    author: 'AI ReEngage Team',
  },

  // API配置
  api: {
    timeout: 30000, // 30秒超时
    retryAttempts: 3,
    baseUrl: process.env.NEXT_PUBLIC_API_URL || '',
  },

  // OpenAI配置
  openai: {
    model: 'gpt-4',
    temperature: 0.9,
    maxTokens: 600,
    fallbackModel: 'gpt-3.5-turbo',
  },

  // UI配置
  ui: {
    animations: {
      copyFeedbackDuration: 2000,
      loadingMinDuration: 1000,
    },
    pagination: {
      defaultPageSize: 10,
      maxPageSize: 50,
    },
    debounceDelay: 300,
  },

  // 邮件模板配置
  email: {
    maxContentLength: 2000,
    supportedScenes: [
      'holiday_greeting',
      'repurchase_reminder',
      'new_product_recommendation'
    ],
    supportedUsers: ['Anna', 'Mike', 'Linda'],
  },

  // 功能开关
  features: {
    enableOpenAI: true,
    enableMockData: process.env.NODE_ENV === 'development',
    enableAnalytics: false,
    enableDebugMode: process.env.NODE_ENV === 'development',
  },

  // 外部链接
  links: {
    github: 'https://github.com/xbfighting/ai-reengage-demo',
    vercel: 'https://ai-reengage-demo-an6t.vercel.app/',
    docs: 'https://github.com/xbfighting/ai-reengage-demo#readme',
  },
} as const

// 环境特定配置
export const ENV_CONFIG = {
  isDevelopment: process.env.NODE_ENV === 'development',
  isProduction: process.env.NODE_ENV === 'production',
  isTest: process.env.NODE_ENV === 'test',
} as const

// 类型定义
export type AppConfig = typeof CONFIG
export type EnvConfig = typeof ENV_CONFIG

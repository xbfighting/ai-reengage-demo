import { UserProfile } from '@/lib/types'

export interface EmailGenerationRequest {
  userInfo: UserProfile
  templateId: string
  variables: Record<string, string | number>
  customPrompt?: string
  editedContent?: string
}

export interface EmailScore {
  overall: number
  personalization: number
  engagement: number
  actionability: number
  brandAlignment: number
  explanation: string
  suggestions: string[]
}

export interface EmailGenerationResponse {
  userProfile: {
    summary: string
    structured: UserProfile
  }
  emailText: string
  emailScore?: EmailScore
  prompt: string
  error?: string
}

export interface ApiErrorData {
  message: string
  code?: string
  details?: string
}

class ApiService {
  private baseUrl: string

  constructor() {
    this.baseUrl = typeof window !== 'undefined' ? window.location.origin : ''
  }

  async generateEmail(request: EmailGenerationRequest): Promise<EmailGenerationResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/api/agent`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => null)
        throw new ApiError(
          errorData?.message || `Request failed with status ${response.status}`,
          response.status.toString(),
          errorData?.details
        )
      }

      return await response.json()
    } catch (error) {
      if (error instanceof ApiError) {
        throw error
      }

      throw new ApiError(
        'Failed to generate email. Please check your connection and try again.',
        'NETWORK_ERROR',
        error instanceof Error ? error.message : 'Unknown error'
      )
    }
  }
}

export class ApiError extends Error {
  constructor(
    message: string,
    public code?: string,
    public details?: string
  ) {
    super(message)
    this.name = 'ApiError'
  }
}

export const apiService = new ApiService()
export default apiService

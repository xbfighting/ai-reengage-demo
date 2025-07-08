import { useState } from 'react'

interface LoadingStateProps {
  message?: string
  progress?: number
}

export function LoadingSpinner({ message = "Loading...", progress }: LoadingStateProps) {
  return (
    <div className="flex flex-col items-center justify-center h-72 bg-white rounded-xl shadow-lg border border-gray-200">
      <div className="relative">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        {progress !== undefined && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xs font-semibold text-blue-600">{Math.round(progress)}%</span>
          </div>
        )}
      </div>
      <p className="mt-4 text-blue-600 text-lg font-semibold animate-pulse">{message}</p>
      {progress !== undefined && (
        <div className="w-48 bg-gray-200 rounded-full h-2 mt-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      )}
    </div>
  )
}

interface ErrorStateProps {
  message: string
  onRetry?: () => void
  details?: string
}

export function ErrorState({ message, onRetry, details }: ErrorStateProps) {
  const [showDetails, setShowDetails] = useState(false)

  return (
    <div className="flex flex-col items-center justify-center h-72 bg-white rounded-xl shadow-lg border border-red-200">
      <div className="text-red-500 mb-4">
        <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 16.5c-.77.833.192 2.5 1.732 2.5z" />
        </svg>
      </div>
      <h3 className="text-lg font-semibold text-red-700 mb-2">Generation Failed</h3>
      <p className="text-red-600 text-center mb-4 max-w-md">{message}</p>

      {details && (
        <div className="mb-4">
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="text-sm text-blue-600 hover:text-blue-800 underline"
          >
            {showDetails ? 'Hide Details' : 'Show Details'}
          </button>
          {showDetails && (
            <div className="mt-2 p-3 bg-gray-100 rounded-lg text-xs text-gray-700 max-w-md">
              {details}
            </div>
          )}
        </div>
      )}

      {onRetry && (
        <button
          onClick={onRetry}
          className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg font-medium transition"
        >
          Try Again
        </button>
      )}
    </div>
  )
}

export function EmptyState({ message = "No content available" }: { message?: string }) {
  return (
    <div className="h-72 bg-white rounded-xl shadow flex items-center justify-center text-gray-300 text-lg border border-dashed border-gray-200">
      <div className="text-center">
        <div className="text-gray-400 mb-2">
          <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-1l-4 4z" />
          </svg>
        </div>
        <p>{message}</p>
      </div>
    </div>
  )
}

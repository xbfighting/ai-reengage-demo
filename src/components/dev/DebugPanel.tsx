'use client'

import { useState, useEffect } from 'react'
import { analytics, PerformanceMonitor } from '@/lib/analytics'
import { CONFIG } from '@/lib/config'

interface DebugPanelProps {
  show?: boolean
}

export default function DebugPanel({ show = false }: DebugPanelProps) {
  const [isVisible, setIsVisible] = useState(show)
  const [activeTab, setActiveTab] = useState<'analytics' | 'config' | 'performance'>('analytics')
  const [sessionData, setSessionData] = useState<ReturnType<typeof analytics.getSessionSummary> | null>(null)

  useEffect(() => {
    // 只在开发环境显示
    if (process.env.NODE_ENV !== 'development') {
      setIsVisible(false)
      return
    }

    // 键盘快捷键：Ctrl+Shift+D 切换调试面板
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.shiftKey && event.key === 'D') {
        event.preventDefault()
        setIsVisible(prev => !prev)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  useEffect(() => {
    if (isVisible) {
      const interval = setInterval(() => {
        setSessionData(analytics.getSessionSummary())
      }, 1000)

      return () => clearInterval(interval)
    }
  }, [isVisible])

  if (!isVisible || process.env.NODE_ENV !== 'development') {
    return null
  }

  const downloadAnalyticsData = () => {
    const data = analytics.exportData()
    const blob = new Blob([data], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `analytics-${new Date().toISOString().split('T')[0]}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-md">
      <div className="bg-gray-900 text-white rounded-lg shadow-2xl border border-gray-700">
        {/* Header */}
        <div className="flex items-center justify-between p-3 border-b border-gray-700">
          <h3 className="text-sm font-semibold">🛠️ Debug Panel</h3>
          <button
            onClick={() => setIsVisible(false)}
            className="text-gray-400 hover:text-white text-lg"
          >
            ×
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-700">
          {(['analytics', 'config', 'performance'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-2 text-xs font-medium capitalize ${
                activeTab === tab
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-400 hover:text-white hover:bg-gray-800'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="p-3 max-h-96 overflow-y-auto">
          {activeTab === 'analytics' && (
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-400">Session</span>
                <button
                  onClick={downloadAnalyticsData}
                  className="text-xs bg-blue-600 px-2 py-1 rounded hover:bg-blue-700"
                >
                  Download
                </button>
              </div>
              {sessionData && (
                <div className="text-xs space-y-1">
                  <div>ID: {sessionData.sessionId.split('_')[1]}</div>
                  <div>Duration: {Math.round(sessionData.duration / 1000)}s</div>
                  <div>Events: {sessionData.eventCount}</div>

                  <div className="mt-2">
                    <div className="text-gray-400 mb-1">Recent Events:</div>
                    <div className="space-y-1 max-h-32 overflow-y-auto">
                      {sessionData.events.slice(-5).map((event, index) => (
                        <div key={index} className="text-xs bg-gray-800 p-1 rounded">
                          <div className="font-mono">{event.name}</div>
                          {event.properties && Object.keys(event.properties).length > 0 && (
                            <div className="text-gray-400 text-xs">
                              {JSON.stringify(event.properties, null, 0)}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'config' && (
            <div className="text-xs space-y-2">
              <div>
                <div className="text-gray-400 mb-1">Environment:</div>
                <div className="bg-gray-800 p-2 rounded font-mono">
                  {process.env.NODE_ENV}
                </div>
              </div>

              <div>
                <div className="text-gray-400 mb-1">Features:</div>
                <div className="bg-gray-800 p-2 rounded space-y-1">
                  {Object.entries(CONFIG.features).map(([key, value]) => (
                    <div key={key} className="flex justify-between">
                      <span>{key}:</span>
                      <span className={value ? 'text-green-400' : 'text-red-400'}>
                        {value ? 'ON' : 'OFF'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'performance' && (
            <div className="text-xs space-y-2">
              <div className="text-gray-400">Performance monitoring enabled</div>
              <div className="bg-gray-800 p-2 rounded">
                <div>Memory: {typeof (performance as unknown as { memory?: { usedJSHeapSize: number } }).memory !== 'undefined' ?
                  Math.round((performance as unknown as { memory: { usedJSHeapSize: number } }).memory.usedJSHeapSize / 1024 / 1024) + 'MB' :
                  'N/A'}
                </div>
                <div>Timing: {performance.now().toFixed(2)}ms</div>
              </div>

              <button
                onClick={() => {
                  PerformanceMonitor.start('test')
                  setTimeout(() => {
                    const duration = PerformanceMonitor.end('test')
                    alert(`Test measurement: ${duration.toFixed(2)}ms`)
                  }, 100)
                }}
                className="w-full bg-green-600 px-2 py-1 rounded hover:bg-green-700"
              >
                Test Performance Monitor
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-2 border-t border-gray-700 text-xs text-gray-400">
          Press <kbd className="bg-gray-800 px-1 rounded">Ctrl+Shift+D</kbd> to toggle
        </div>
      </div>
    </div>
  )
}

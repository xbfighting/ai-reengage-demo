/**
 * 复制文本到剪贴板的增强版本
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    // 优先使用现代 Clipboard API
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text)
      return true
    }

    // 回退方案：使用传统的 execCommand
    const textArea = document.createElement('textarea')
    textArea.value = text
    textArea.style.position = 'fixed'
    textArea.style.left = '-999999px'
    textArea.style.top = '-999999px'
    document.body.appendChild(textArea)
    textArea.focus()
    textArea.select()

    const successful = document.execCommand('copy')
    document.body.removeChild(textArea)

    return successful
  } catch (err) {
    console.error('Failed to copy text: ', err)
    return false
  }
}

/**
 * 格式化邮件内容，移除HTML标签但保留基本格式
 */
export function formatEmailForCopy(htmlContent: string): string {
  // 创建临时DOM元素来解析HTML
  const temp = document.createElement('div')
  temp.innerHTML = htmlContent

  // 将一些HTML元素转换为文本格式
  temp.querySelectorAll('br').forEach(br => br.replaceWith('\n'))
  temp.querySelectorAll('p').forEach(p => p.replaceWith(p.textContent + '\n\n'))
  temp.querySelectorAll('h1, h2, h3, h4, h5, h6').forEach(h => h.replaceWith(h.textContent + '\n'))
  temp.querySelectorAll('li').forEach(li => li.replaceWith('• ' + li.textContent + '\n'))

  return temp.textContent?.trim() || ''
}

/**
 * 防抖函数
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout
  return (...args: Parameters<T>) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

/**
 * 节流函数
 */
export function throttle<T extends (...args: unknown[]) => unknown>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => inThrottle = false, limit)
    }
  }
}

/**
 * 获取随机ID
 */
export function generateId(): string {
  return Math.random().toString(36).substr(2, 9)
}

/**
 * 安全的JSON解析
 */
export function safeJsonParse<T>(str: string, fallback: T): T {
  try {
    return JSON.parse(str)
  } catch {
    return fallback
  }
}

/**
 * 格式化文件大小
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes'

  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

/**
 * 验证邮箱地址
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * 截断文本
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength) + '...'
}

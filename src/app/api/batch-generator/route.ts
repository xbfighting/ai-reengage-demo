import { NextRequest, NextResponse } from 'next/server'
import { BatchMessageGenerator, BatchGenerationOptions, RealTimePreviewManager } from '@/lib/batch-generator'
import type { CampaignRequest } from '@/app/api/campaign-generator/route'
import userProfiles from '@/lib/userProfiles.json'
import { UserProfile } from '@/lib/types'

// 全局预览管理器实例
const previewManager = new RealTimePreviewManager()

export async function POST(request: NextRequest) {
  try {
    const { campaignData, options, action } = await request.json()
    
    if (action === 'generate') {
      return await handleBatchGeneration(campaignData, options)
    } else if (action === 'preview') {
      return await handleRealTimePreview(campaignData, options)
    } else if (action === 'optimize') {
      return await handlePreviewOptimization(options)
    }
    
    return NextResponse.json(
      { success: false, error: 'Invalid action' },
      { status: 400 }
    )
    
  } catch (error) {
    console.error('Batch generation error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to process batch request' },
      { status: 500 }
    )
  }
}

async function handleBatchGeneration(campaignData: CampaignRequest, options: BatchGenerationOptions) {
  // 加载用户数据
  const users = (userProfiles as { label: string; profile: UserProfile }[]).map(u => u.profile)
  
  // 创建批量生成器
  const batchGenerator = new BatchMessageGenerator(users, campaignData)
  
  // 生成批量消息
  const result = await batchGenerator.generateBatch(options)
  
  return NextResponse.json({
    success: true,
    result,
    timestamp: new Date().toISOString()
  })
}

async function handleRealTimePreview(campaignData: CampaignRequest, options: any) {
  const { patientName = 'Sample Patient' } = options
  
  // 创建实时预览
  const preview = previewManager.createPreview(campaignData, patientName)
  
  return NextResponse.json({
    success: true,
    preview,
    timestamp: new Date().toISOString()
  })
}

async function handlePreviewOptimization(options: any) {
  const { messageId } = options
  
  if (!messageId) {
    return NextResponse.json(
      { success: false, error: 'Message ID is required' },
      { status: 400 }
    )
  }
  
  // 优化预览
  const optimizedPreview = previewManager.optimizePreview(messageId)
  
  if (!optimizedPreview) {
    return NextResponse.json(
      { success: false, error: 'Preview not found' },
      { status: 404 }
    )
  }
  
  return NextResponse.json({
    success: true,
    preview: optimizedPreview,
    timestamp: new Date().toISOString()
  })
}

export async function GET(request: NextRequest) {
  const url = new URL(request.url)
  const action = url.searchParams.get('action')
  
  if (action === 'export') {
    return await handleExportRequest(request)
  }
  
  return NextResponse.json(
    { success: false, error: 'Invalid action' },
    { status: 400 }
  )
}

async function handleExportRequest(request: NextRequest) {
  const url = new URL(request.url)
  const format = url.searchParams.get('format') || 'json'
  const campaignId = url.searchParams.get('campaignId')
  
  if (!campaignId) {
    return NextResponse.json(
      { success: false, error: 'Campaign ID is required' },
      { status: 400 }
    )
  }
  
  // 在实际应用中，这里会从数据库获取数据
  const mockData = {
    campaignId,
    messages: [
      {
        id: 'msg_1',
        patientName: 'John Doe',
        channel: 'email',
        subject: 'Your Perfect Treatment Awaits',
        content: 'Hi John, based on your profile...',
        estimatedEngagement: 85
      }
    ]
  }
  
  let responseData: any
  let contentType: string
  let filename: string
  
  switch (format) {
    case 'csv':
      responseData = generateCSV(mockData.messages)
      contentType = 'text/csv'
      filename = `campaign_${campaignId}.csv`
      break
      
    case 'excel':
      responseData = generateExcel(mockData.messages)
      contentType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      filename = `campaign_${campaignId}.xlsx`
      break
      
    default:
      responseData = JSON.stringify(mockData, null, 2)
      contentType = 'application/json'
      filename = `campaign_${campaignId}.json`
  }
  
  return new Response(responseData, {
    headers: {
      'Content-Type': contentType,
      'Content-Disposition': `attachment; filename="${filename}"`,
      'Cache-Control': 'no-cache'
    }
  })
}

function generateCSV(messages: any[]): string {
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

function generateExcel(messages: any[]): ArrayBuffer {
  // 简化的Excel生成 - 在实际项目中会使用如SheetJS等库
  const csvData = generateCSV(messages)
  return new TextEncoder().encode(csvData).buffer
}
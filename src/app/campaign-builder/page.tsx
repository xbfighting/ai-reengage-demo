'use client'

import { useState } from 'react'
import type { CampaignRequest, GeneratedMessage } from '@/app/api/campaign-generator/route'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'
import { Checkbox } from '@/components/ui/checkbox'
import { Badge } from '@/components/ui/badge'

export default function CampaignBuilderPage() {
  const [campaignName, setCampaignName] = useState('')
  const [channel, setChannel] = useState<'email' | 'text'>('email')
  const [campaignBrief, setCampaignBrief] = useState('')
  const [ageRange, setAgeRange] = useState<[number, number]>([25, 65])
  const [selectedGenders, setSelectedGenders] = useState<string[]>(['all'])
  const [zipCode, setZipCode] = useState('')
  const [radius, setRadius] = useState(25)
  const [incomeLevel, setIncomeLevel] = useState('')
  const [procedureHistory, setProcedureHistory] = useState<string[]>([])
  const [procedureNotTried, setProcedureNotTried] = useState<string[]>([])
  const [lifetimeValueRange, setLifetimeValueRange] = useState<[number, number]>([0, 10000])
  const [lastVisitRange, setLastVisitRange] = useState('')
  const [engagementLevel, setEngagementLevel] = useState('')
  const [lifeEvents, setLifeEvents] = useState<string[]>([])
  const [seasonalTriggers, setSeasonalTriggers] = useState<string[]>([])
  const [culturalTriggers, setCulturalTriggers] = useState<string[]>([])
  const [customFlair, setCustomFlair] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [isBatchGenerating, setIsBatchGenerating] = useState(false)
  const [showBatchOptions, setShowBatchOptions] = useState(false)
  const [batchOptions, setBatchOptions] = useState({
    maxMessages: 20,
    minQualityScore: 70,
    includeABVariants: true,
    exportFormat: 'json' as 'json' | 'csv' | 'excel',
    groupByChannel: false,
    includeScoring: true
  })
  const [realTimePreview, setRealTimePreview] = useState<any>(null)
  const [isPreviewLoading, setIsPreviewLoading] = useState(false)
  const [generatedMessages, setGeneratedMessages] = useState<GeneratedMessage[]>([])
  const [campaignResults, setCampaignResults] = useState<{
    campaignId: string
    totalGenerated: number
    estimatedReach: number
    targetingResults?: {
      totalUsers: number
      matchedUsers: number
      averageScore: number
      channelDistribution: { email: number; text: number }
      urgencyDistribution: { low: number; medium: number; high: number }
    }
    aiScoring?: {
      overallScore: number
      messageScores: any[]
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
    abTestVariants?: GeneratedMessage[]
  } | null>(null)

  const procedures = [
    'Botox', 'Filler', 'Thread Lift', 'Morpheus8', 'Laser Resurfacing',
    'Chemical Peel', 'Microneedling', 'PRP', 'Sculptra', 'Kybella'
  ]

  const handleGeneratePreview = async () => {
    setIsGenerating(true)
    
    const campaignData: CampaignRequest = {
      campaignName,
      channel,
      campaignBrief,
      demographics: {
        ageRange,
        gender: selectedGenders,
        location: { zipCode, radius },
        incomeLevel
      },
      behavioral: {
        procedureHistory,
        procedureNotTried,
        lifetimeValueRange,
        lastVisitRange,
        engagementLevel
      },
      psychologicalTriggers: {
        lifeEvents,
        seasonal: seasonalTriggers,
        cultural: culturalTriggers
      },
      customFlair
    }
    
    try {
      const response = await fetch('/api/campaign-generator', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(campaignData)
      })
      
      const result = await response.json()
      
      if (result.success) {
        setGeneratedMessages(result.messages)
        setCampaignResults({
          campaignId: result.campaignId,
          totalGenerated: result.totalGenerated,
          estimatedReach: result.estimatedReach,
          targetingResults: result.targetingResults,
          aiScoring: result.aiScoring,
          abTestVariants: result.abTestVariants
        })
      } else {
        console.error('Campaign generation failed:', result.error)
      }
    } catch (error) {
      console.error('Error generating campaign:', error)
    } finally {
      setIsGenerating(false)
    }
  }

  const handleBatchGeneration = async () => {
    setIsBatchGenerating(true)
    
    const campaignData = {
      campaignName,
      channel,
      campaignBrief,
      demographics: {
        ageRange,
        gender: selectedGenders,
        location: { zipCode, radius },
        incomeLevel
      },
      behavioral: {
        procedureHistory,
        procedureNotTried,
        lifetimeValueRange,
        lastVisitRange,
        engagementLevel
      },
      psychologicalTriggers: {
        lifeEvents,
        seasonal: seasonalTriggers,
        cultural: culturalTriggers
      },
      customFlair
    }
    
    try {
      const response = await fetch('/api/batch-generator', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          campaignData,
          options: batchOptions,
          action: 'generate'
        })
      })
      
      const result = await response.json()
      
      if (result.success) {
        setGeneratedMessages(result.result.messages)
        setCampaignResults({
          campaignId: result.result.campaignId,
          totalGenerated: result.result.totalGenerated,
          estimatedReach: result.result.messages.length
        })
        alert(`Successfully generated ${result.result.totalGenerated} messages!`)
      } else {
        console.error('Batch generation failed:', result.error)
      }
    } catch (error) {
      console.error('Error in batch generation:', error)
    } finally {
      setIsBatchGenerating(false)
    }
  }

  const handleRealTimePreview = async () => {
    setIsPreviewLoading(true)
    
    const campaignData = {
      campaignName,
      channel,
      campaignBrief,
      demographics: {
        ageRange,
        gender: selectedGenders,
        location: { zipCode, radius },
        incomeLevel
      },
      behavioral: {
        procedureHistory,
        procedureNotTried,
        lifetimeValueRange,
        lastVisitRange,
        engagementLevel
      },
      psychologicalTriggers: {
        lifeEvents,
        seasonal: seasonalTriggers,
        cultural: culturalTriggers
      },
      customFlair
    }
    
    try {
      const response = await fetch('/api/batch-generator', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          campaignData,
          options: { patientName: 'Sample Patient' },
          action: 'preview'
        })
      })
      
      const result = await response.json()
      
      if (result.success) {
        setRealTimePreview(result.preview)
      } else {
        console.error('Preview generation failed:', result.error)
      }
    } catch (error) {
      console.error('Error in preview generation:', error)
    } finally {
      setIsPreviewLoading(false)
    }
  }

  const handleOptimizePreview = async () => {
    if (!realTimePreview) return
    
    try {
      const response = await fetch('/api/batch-generator', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          options: { messageId: realTimePreview.messageId },
          action: 'optimize'
        })
      })
      
      const result = await response.json()
      
      if (result.success) {
        setRealTimePreview(result.preview)
      } else {
        console.error('Preview optimization failed:', result.error)
      }
    } catch (error) {
      console.error('Error in preview optimization:', error)
    }
  }

  const handleExportCampaign = async (format: 'json' | 'csv' | 'excel') => {
    if (!campaignResults) return
    
    const url = `/api/batch-generator?action=export&format=${format}&campaignId=${campaignResults.campaignId}`
    
    try {
      const response = await fetch(url)
      const blob = await response.blob()
      
      const downloadUrl = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = downloadUrl
      a.download = `campaign_${campaignResults.campaignId}.${format}`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(downloadUrl)
      document.body.removeChild(a)
    } catch (error) {
      console.error('Export failed:', error)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle className="text-3xl font-bold">AI Campaign Builder</CardTitle>
            <CardDescription>Create hyper-targeted, personalized marketing campaigns</CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            {/* Campaign Configuration */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Campaign Configuration</h3>
              
              <div>
                <Label htmlFor="campaign-name">Campaign Name</Label>
                <Input
                  id="campaign-name"
                  value={campaignName}
                  onChange={(e) => setCampaignName(e.target.value)}
                  placeholder="e.g., Valentine's Day Botox Special"
                />
              </div>

              <div>
                <Label>Channel Selection</Label>
                <RadioGroup value={channel} onValueChange={(v) => setChannel(v as 'email' | 'text')}>
                  <div className="flex space-x-4 mt-2">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="email" id="email" />
                      <Label htmlFor="email">Email</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="text" id="text" />
                      <Label htmlFor="text">Text/SMS</Label>
                    </div>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label htmlFor="campaign-brief">Campaign Brief</Label>
                <Textarea
                  id="campaign-brief"
                  value={campaignBrief}
                  onChange={(e) => setCampaignBrief(e.target.value)}
                  placeholder="Describe your campaign idea or use the guided options below..."
                  className="min-h-32"
                />
              </div>
            </div>

            {/* Demographics Section */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Demographics</h3>
              
              <div>
                <Label>Age Range: {ageRange[0]} - {ageRange[1]}</Label>
                <Slider
                  value={ageRange}
                  onValueChange={(v) => setAgeRange(v as [number, number])}
                  min={18}
                  max={80}
                  step={1}
                  className="mt-2"
                />
              </div>

              <div>
                <Label>Gender</Label>
                <div className="flex space-x-4 mt-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="male"
                      checked={selectedGenders.includes('male')}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSelectedGenders([...selectedGenders.filter(g => g !== 'all'), 'male'])
                        } else {
                          setSelectedGenders(selectedGenders.filter(g => g !== 'male'))
                        }
                      }}
                    />
                    <Label htmlFor="male">Male</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="female"
                      checked={selectedGenders.includes('female')}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSelectedGenders([...selectedGenders.filter(g => g !== 'all'), 'female'])
                        } else {
                          setSelectedGenders(selectedGenders.filter(g => g !== 'female'))
                        }
                      }}
                    />
                    <Label htmlFor="female">Female</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="all"
                      checked={selectedGenders.includes('all')}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSelectedGenders(['all'])
                        } else {
                          setSelectedGenders([])
                        }
                      }}
                    />
                    <Label htmlFor="all">All</Label>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="zip-code">Zip Code</Label>
                  <Input
                    id="zip-code"
                    value={zipCode}
                    onChange={(e) => setZipCode(e.target.value)}
                    placeholder="32082"
                  />
                </div>
                <div>
                  <Label htmlFor="radius">Radius: {radius} miles</Label>
                  <Slider
                    value={[radius]}
                    onValueChange={(v) => setRadius(v[0])}
                    min={5}
                    max={100}
                    step={5}
                    className="mt-2"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="income-level">Income Level</Label>
                <Select value={incomeLevel} onValueChange={setIncomeLevel}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select income range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0-50k">$0 - $50,000</SelectItem>
                    <SelectItem value="50k-100k">$50,000 - $100,000</SelectItem>
                    <SelectItem value="100k-150k">$100,000 - $150,000</SelectItem>
                    <SelectItem value="150k-250k">$150,000 - $250,000</SelectItem>
                    <SelectItem value="250k+">$250,000+</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Behavioral Targeting */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Behavioral Targeting</h3>
              
              <div>
                <Label>Has Completed Procedures</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {procedures.map((procedure) => (
                    <Badge
                      key={procedure}
                      variant={procedureHistory.includes(procedure) ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => {
                        if (procedureHistory.includes(procedure)) {
                          setProcedureHistory(procedureHistory.filter(p => p !== procedure))
                        } else {
                          setProcedureHistory([...procedureHistory, procedure])
                        }
                      }}
                    >
                      {procedure}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <Label>Has NOT Tried</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {procedures.map((procedure) => (
                    <Badge
                      key={procedure}
                      variant={procedureNotTried.includes(procedure) ? "destructive" : "outline"}
                      className="cursor-pointer"
                      onClick={() => {
                        if (procedureNotTried.includes(procedure)) {
                          setProcedureNotTried(procedureNotTried.filter(p => p !== procedure))
                        } else {
                          setProcedureNotTried([...procedureNotTried, procedure])
                        }
                      }}
                    >
                      {procedure}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <Label>Lifetime Value: ${lifetimeValueRange[0]} - ${lifetimeValueRange[1]}</Label>
                <Slider
                  value={lifetimeValueRange}
                  onValueChange={(v) => setLifetimeValueRange(v as [number, number])}
                  min={0}
                  max={50000}
                  step={1000}
                  className="mt-2"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="last-visit">Last Visit</Label>
                  <Select value={lastVisitRange} onValueChange={setLastVisitRange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select time range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0-30">Within 30 days</SelectItem>
                      <SelectItem value="31-90">31-90 days</SelectItem>
                      <SelectItem value="91-180">91-180 days</SelectItem>
                      <SelectItem value="181-365">181-365 days</SelectItem>
                      <SelectItem value="365+">Over 1 year</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="engagement">Email/Text Activity</Label>
                  <Select value={engagementLevel} onValueChange={setEngagementLevel}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select engagement level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high">High (Opens most emails)</SelectItem>
                      <SelectItem value="medium">Medium (Opens some)</SelectItem>
                      <SelectItem value="low">Low (Rarely opens)</SelectItem>
                      <SelectItem value="none">None (Never opens)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Psychological Triggers */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Psychological Triggers</h3>
              
              <div>
                <Label>Life Events</Label>
                <div className="flex flex-wrap gap-3 mt-2">
                  {['Wedding', 'Reunion', 'Divorce', 'New Job'].map((event) => (
                    <div key={event} className="flex items-center space-x-2">
                      <Checkbox
                        id={event}
                        checked={lifeEvents.includes(event)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setLifeEvents([...lifeEvents, event])
                          } else {
                            setLifeEvents(lifeEvents.filter(e => e !== event))
                          }
                        }}
                      />
                      <Label htmlFor={event}>{event}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label>Seasonal</Label>
                <div className="flex flex-wrap gap-3 mt-2">
                  {['Holiday parties', 'Beach season', 'New Year'].map((trigger) => (
                    <div key={trigger} className="flex items-center space-x-2">
                      <Checkbox
                        id={trigger}
                        checked={seasonalTriggers.includes(trigger)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSeasonalTriggers([...seasonalTriggers, trigger])
                          } else {
                            setSeasonalTriggers(seasonalTriggers.filter(t => t !== trigger))
                          }
                        }}
                      />
                      <Label htmlFor={trigger}>{trigger}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label>Cultural</Label>
                <div className="flex flex-wrap gap-3 mt-2">
                  {['Award shows', 'Trending on social', 'Celebrity news'].map((trigger) => (
                    <div key={trigger} className="flex items-center space-x-2">
                      <Checkbox
                        id={trigger}
                        checked={culturalTriggers.includes(trigger)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setCulturalTriggers([...culturalTriggers, trigger])
                          } else {
                            setCulturalTriggers(culturalTriggers.filter(t => t !== trigger))
                          }
                        }}
                      />
                      <Label htmlFor={trigger}>{trigger}</Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Custom Flair */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Custom Flair</h3>
              <Textarea
                value={customFlair}
                onChange={(e) => setCustomFlair(e.target.value)}
                placeholder="Add your unique angle, specific celebrity references, or special instructions..."
                className="min-h-24"
              />
            </div>

            {/* Preview & Generate */}
            <div className="space-y-4">
              <div className="flex flex-wrap gap-3 justify-end">
                <Button 
                  onClick={handleRealTimePreview}
                  size="md"
                  variant="outline"
                  disabled={isPreviewLoading}
                  className="border-blue-500 text-blue-600 hover:bg-blue-50"
                >
                  {isPreviewLoading ? 'Loading...' : 'Real-Time Preview'}
                </Button>
                
                <Button 
                  onClick={handleGeneratePreview}
                  size="md"
                  className="bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                  disabled={isGenerating}
                >
                  {isGenerating ? 'Generating...' : 'Quick Generate'}
                </Button>
                
                <Button 
                  onClick={() => setShowBatchOptions(!showBatchOptions)}
                  size="md"
                  variant="outline"
                  className="border-green-500 text-green-600 hover:bg-green-50"
                >
                  Batch Options
                </Button>
              </div>
              
              {/* Batch Options Panel */}
              {showBatchOptions && (
                <div className="p-4 bg-gray-50 rounded-lg border">
                  <h5 className="font-medium mb-3">Batch Generation Options</h5>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <Label htmlFor="maxMessages">Max Messages</Label>
                      <Input
                        id="maxMessages"
                        type="number"
                        value={batchOptions.maxMessages}
                        onChange={(e) => setBatchOptions({...batchOptions, maxMessages: parseInt(e.target.value)})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="minQualityScore">Min Quality Score (%)</Label>
                      <Input
                        id="minQualityScore"
                        type="number"
                        value={batchOptions.minQualityScore}
                        onChange={(e) => setBatchOptions({...batchOptions, minQualityScore: parseInt(e.target.value)})}
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <Label htmlFor="exportFormat">Export Format</Label>
                      <Select value={batchOptions.exportFormat} onValueChange={(value: 'json' | 'csv' | 'excel') => setBatchOptions({...batchOptions, exportFormat: value})}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="json">JSON</SelectItem>
                          <SelectItem value="csv">CSV</SelectItem>
                          <SelectItem value="excel">Excel</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-center space-x-4 pt-6">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="includeABVariants"
                          checked={batchOptions.includeABVariants}
                          onCheckedChange={(checked) => setBatchOptions({...batchOptions, includeABVariants: checked})}
                        />
                        <Label htmlFor="includeABVariants">A/B Variants</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="includeScoring"
                          checked={batchOptions.includeScoring}
                          onCheckedChange={(checked) => setBatchOptions({...batchOptions, includeScoring: checked})}
                        />
                        <Label htmlFor="includeScoring">AI Scoring</Label>
                      </div>
                    </div>
                  </div>
                  
                  <Button 
                    onClick={handleBatchGeneration}
                    disabled={isBatchGenerating}
                    className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white"
                  >
                    {isBatchGenerating ? 'Generating Batch...' : 'Generate Batch'}
                  </Button>
                </div>
              )}
            </div>
            
            {/* Campaign Results */}
            {campaignResults && (
              <div className="mt-8 space-y-4">
                <div className="p-6 bg-green-50 border border-green-200 rounded-lg">
                  <h4 className="font-semibold text-green-800 mb-4">Campaign Generated Successfully!</h4>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="font-medium">Campaign ID:</span> {campaignResults.campaignId}
                    </div>
                    <div>
                      <span className="font-medium">Messages Generated:</span> {campaignResults.totalGenerated}
                    </div>
                    <div>
                      <span className="font-medium">Estimated Reach:</span> {campaignResults.estimatedReach.toLocaleString()} patients
                    </div>
                  </div>
                </div>
                
                {/* Advanced Targeting Results */}
                {campaignResults.targetingResults && (
                  <div className="p-6 bg-blue-50 border border-blue-200 rounded-lg">
                    <h4 className="font-semibold text-blue-800 mb-4">Advanced Targeting Analysis</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="font-medium">Total Users:</span> {campaignResults.targetingResults.totalUsers}
                      </div>
                      <div>
                        <span className="font-medium">Matched Users:</span> {campaignResults.targetingResults.matchedUsers}
                      </div>
                      <div>
                        <span className="font-medium">Average Score:</span> {campaignResults.targetingResults.averageScore}%
                      </div>
                      <div>
                        <span className="font-medium">Match Rate:</span> {Math.round((campaignResults.targetingResults.matchedUsers / campaignResults.targetingResults.totalUsers) * 100)}%
                      </div>
                    </div>
                    
                    <div className="mt-4 grid grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-medium text-blue-700 mb-2">Channel Distribution</h5>
                        <div className="space-y-1 text-sm">
                          <div className="flex justify-between">
                            <span>Email:</span>
                            <span>{campaignResults.targetingResults.channelDistribution.email}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Text:</span>
                            <span>{campaignResults.targetingResults.channelDistribution.text}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h5 className="font-medium text-blue-700 mb-2">Urgency Distribution</h5>
                        <div className="space-y-1 text-sm">
                          <div className="flex justify-between">
                            <span>High:</span>
                            <span className="text-red-600">{campaignResults.targetingResults.urgencyDistribution.high}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Medium:</span>
                            <span className="text-orange-600">{campaignResults.targetingResults.urgencyDistribution.medium}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Low:</span>
                            <span className="text-green-600">{campaignResults.targetingResults.urgencyDistribution.low}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* AI Scoring Results */}
                {campaignResults.aiScoring && (
                  <div className="p-6 bg-purple-50 border border-purple-200 rounded-lg">
                    <h4 className="font-semibold text-purple-800 mb-4">AI Quality Scoring & Optimization</h4>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-purple-600">{campaignResults.aiScoring.overallScore}%</div>
                        <div className="text-sm text-gray-600">Overall Score</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">{campaignResults.aiScoring.predictedMetrics.openRate}%</div>
                        <div className="text-sm text-gray-600">Predicted Open Rate</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">{campaignResults.aiScoring.predictedMetrics.clickThroughRate}%</div>
                        <div className="text-sm text-gray-600">Click-Through Rate</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-orange-600">{campaignResults.aiScoring.predictedMetrics.conversionRate}%</div>
                        <div className="text-sm text-gray-600">Conversion Rate</div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-medium text-purple-700 mb-2">Best Performing Patterns</h5>
                        <ul className="text-sm space-y-1">
                          {campaignResults.aiScoring.campaignOptimizations.bestPerformingPatterns.map((pattern, index) => (
                            <li key={index} className="flex items-center">
                              <span className="text-green-500 mr-2">✓</span>
                              {pattern}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h5 className="font-medium text-purple-700 mb-2">Optimization Recommendations</h5>
                        <ul className="text-sm space-y-1">
                          {campaignResults.aiScoring.campaignOptimizations.globalRecommendations.map((rec, index) => (
                            <li key={index} className="flex items-center">
                              <span className="text-blue-500 mr-2">→</span>
                              {rec}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Export Options */}
                {campaignResults && (
                  <div className="p-4 bg-gray-50 rounded-lg border">
                    <h5 className="font-medium mb-3">Export Campaign</h5>
                    <div className="flex gap-2">
                      <Button
                        onClick={() => handleExportCampaign('json')}
                        size="sm"
                        variant="outline"
                      >
                        Export JSON
                      </Button>
                      <Button
                        onClick={() => handleExportCampaign('csv')}
                        size="sm"
                        variant="outline"
                      >
                        Export CSV
                      </Button>
                      <Button
                        onClick={() => handleExportCampaign('excel')}
                        size="sm"
                        variant="outline"
                      >
                        Export Excel
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            )}
            
            {/* Real-Time Preview */}
            {realTimePreview && (
              <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="font-semibold text-blue-800">Real-Time Preview</h4>
                    <p className="text-sm text-blue-600">Last updated: {new Date(realTimePreview.lastUpdated).toLocaleTimeString()}</p>
                  </div>
                  <div className="flex gap-2">
                    <Badge variant={realTimePreview.isOptimized ? "default" : "secondary"}>
                      {realTimePreview.isOptimized ? "Optimized" : "Original"}
                    </Badge>
                    <Badge variant="outline">
                      Score: {realTimePreview.score}%
                    </Badge>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline">{realTimePreview.channel.toUpperCase()}</Badge>
                      <span className="font-medium">{realTimePreview.patientName}</span>
                    </div>
                    
                    {realTimePreview.subject && (
                      <div className="mb-3">
                        <span className="text-sm font-medium text-gray-600">Subject:</span>
                        <div className="text-sm text-gray-900 bg-white p-2 rounded border">
                          {realTimePreview.subject}
                        </div>
                      </div>
                    )}
                    
                    <div>
                      <span className="text-sm font-medium text-gray-600">Content:</span>
                      <div className="text-sm text-gray-900 whitespace-pre-wrap bg-white p-3 rounded border mt-1">
                        {realTimePreview.content}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button
                      onClick={handleOptimizePreview}
                      size="sm"
                      className="bg-blue-600 text-white"
                      disabled={realTimePreview.isOptimized}
                    >
                      {realTimePreview.isOptimized ? 'Already Optimized' : 'Optimize Preview'}
                    </Button>
                    <Button
                      onClick={handleRealTimePreview}
                      size="sm"
                      variant="outline"
                    >
                      Refresh Preview
                    </Button>
                  </div>
                </div>
              </div>
            )}
            
            {/* Generated Messages */}
            {generatedMessages.length > 0 && (
              <div className="mt-8 space-y-4">
                <h4 className="font-semibold text-lg">Generated Messages Preview</h4>
                {generatedMessages.map((message, index) => {
                  const messageScore = campaignResults?.aiScoring?.messageScores?.[index]
                  
                  return (
                    <Card key={message.id} className="p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h5 className="font-medium">{message.patientName}</h5>
                          <div className="flex gap-2 mt-1">
                            <Badge variant="outline">
                              {message.channel.toUpperCase()}
                            </Badge>
                            {messageScore && (
                              <Badge variant={messageScore.overallScore >= 0.8 ? "default" : messageScore.overallScore >= 0.6 ? "secondary" : "destructive"}>
                                AI Score: {Math.round(messageScore.overallScore * 100)}%
                              </Badge>
                            )}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-green-600 font-medium">
                            {message.estimatedEngagement}% engagement
                          </div>
                        </div>
                      </div>
                      
                      {message.subject && (
                        <div className="mb-2">
                          <span className="text-sm font-medium text-gray-600">Subject:</span>
                          <div className="text-sm text-gray-900">{message.subject}</div>
                        </div>
                      )}
                      
                      <div className="mb-3">
                        <span className="text-sm font-medium text-gray-600">Content:</span>
                        <div className="text-sm text-gray-900 whitespace-pre-wrap bg-gray-50 p-3 rounded mt-1">
                          {message.content}
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-2 mb-3">
                        <div className="text-xs text-gray-500">
                          <span className="font-medium">Personalized:</span> {message.personalizedElements.join(', ')}
                        </div>
                      </div>
                      
                      {/* AI Scoring Details */}
                      {messageScore && (
                        <div className="border-t pt-3 mt-3">
                          <h6 className="font-medium text-gray-800 mb-2">AI Analysis</h6>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs mb-2">
                            <div>
                              <span className="font-medium">Personalization:</span> {Math.round(messageScore.personalizationScore * 100)}%
                            </div>
                            <div>
                              <span className="font-medium">Engagement:</span> {Math.round(messageScore.engagementScore * 100)}%
                            </div>
                            <div>
                              <span className="font-medium">Actionability:</span> {Math.round(messageScore.actionabilityScore * 100)}%
                            </div>
                            <div>
                              <span className="font-medium">Brand Alignment:</span> {Math.round(messageScore.brandAlignmentScore * 100)}%
                            </div>
                          </div>
                          
                          {messageScore.detailedFeedback.strengths.length > 0 && (
                            <div className="mb-2">
                              <span className="text-xs font-medium text-green-600">Strengths:</span>
                              <ul className="text-xs text-green-600 ml-4">
                                {messageScore.detailedFeedback.strengths.map((strength, i) => (
                                  <li key={i}>• {strength}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                          
                          {messageScore.detailedFeedback.suggestions.length > 0 && (
                            <div>
                              <span className="text-xs font-medium text-blue-600">Suggestions:</span>
                              <ul className="text-xs text-blue-600 ml-4">
                                {messageScore.detailedFeedback.suggestions.map((suggestion, i) => (
                                  <li key={i}>• {suggestion}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      )}
                    </Card>
                  )
                })}
              </div>
            )}
            
            {/* A/B Test Variants */}
            {campaignResults?.abTestVariants && campaignResults.abTestVariants.length > 0 && (
              <div className="mt-8 space-y-4">
                <h4 className="font-semibold text-lg">A/B Test Variants</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {campaignResults.abTestVariants.map((variant, index) => (
                    <Card key={variant.id} className="p-4">
                      <div className="mb-3">
                        <h5 className="font-medium">{variant.patientName}</h5>
                        <Badge variant="outline" className="mt-1">
                          Variant {String.fromCharCode(65 + index)}
                        </Badge>
                      </div>
                      
                      {variant.subject && (
                        <div className="mb-2">
                          <span className="text-sm font-medium text-gray-600">Subject:</span>
                          <div className="text-sm text-gray-900">{variant.subject}</div>
                        </div>
                      )}
                      
                      <div className="mb-3">
                        <span className="text-sm font-medium text-gray-600">Content:</span>
                        <div className="text-sm text-gray-900 whitespace-pre-wrap bg-gray-50 p-3 rounded mt-1">
                          {variant.content}
                        </div>
                      </div>
                      
                      <div className="text-xs text-gray-500">
                        <span className="font-medium">Variant Type:</span> {variant.personalizedElements[variant.personalizedElements.length - 1]}
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
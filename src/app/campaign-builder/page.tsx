'use client'

import { useState } from 'react'
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

  const procedures = [
    'Botox', 'Filler', 'Thread Lift', 'Morpheus8', 'Laser Resurfacing',
    'Chemical Peel', 'Microneedling', 'PRP', 'Sculptra', 'Kybella'
  ]

  const handleGeneratePreview = () => {
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
    console.log('Campaign Data:', campaignData)
    // TODO: Navigate to preview page or show preview modal
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
            <div className="flex justify-end">
              <Button 
                onClick={handleGeneratePreview}
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white"
              >
                Preview & Generate
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
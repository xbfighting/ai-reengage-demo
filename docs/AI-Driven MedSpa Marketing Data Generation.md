# AI-Driven MedSpa Marketing Data Generation

## Project Overview

Generate high-quality synthetic data for an AI-driven personalized re-engagement email marketing system for a medical aesthetics (MedSpa) clinic. The data will be used for a demo application showcasing personalized marketing based on customer profiles, procedure history, and marketing scenarios.

## Repository Setup

1. Clone the repository: `https://github.com/xbfighting/ai-reengage-demo`
2. Create a new branch for this feature
3. Add two JSON files to the repository:
   - `customers.json` - Customer profiles and history (20-30 records)
   - `campaigns.json` - Marketing campaigns including emails and SMS (50-60 records)

## Data Requirements

### Geographic and Cultural Context

- All data should represent US-based customers (focus on major cities: Los Angeles, New York, Miami, San Francisco, Chicago)
- Names, writing style, and content should reflect American culture and language
- Use proper US phone format: (XXX) XXX-XXXX
- Dates in MM/DD/YYYY format
- Currency in USD

### Medical Aesthetics Context

Common procedures to include:

- **Non-invasive**: Botox, Dermal Fillers, Chemical Peels, Laser Hair Removal, IPL
- **Minimally invasive**: Microneedling, CoolSculpting, Ultherapy, Thread Lift
- **Surgical**: Rhinoplasty, Breast Augmentation, Liposuction, Facelift, Tummy Tuck

## Data Structure Specifications

### customers.json (20-30 records)

```json
{
  "id": "CUST001",
  "name": "Full Name",
  "email": "email@example.com",
  "phone": "(XXX) XXX-XXXX",
  "age": 25-65,
  "gender": "Male/Female",
  "location": {
    "city": "City Name",
    "state": "State Code"
  },
  "lifecycleStage": "New/Active/At-Risk/Dormant",
  "customerValue": 500-50000,
  "loyaltyTier": "Bronze/Silver/Gold/Platinum",
  "lastInteraction": "2024-XX-XX",
  "registrationDate": "2023-XX-XX",

  "lastProcedure": "Procedure Name",
  "lastProcedureDate": "2024-XX-XX",
  "nextMaintenanceDate": "2025-XX-XX",
  "procedureHistory": [
    {
      "date": "2024-XX-XX",
      "procedure": "Procedure Name",
      "amount": 200-5000,
      "doctor": "Dr. Smith",
      "satisfaction": "Very Satisfied/Satisfied/Neutral"
    }
  ],
  "totalSpent": 500-50000,
  "preferredDoctor": "Dr. Name",
  "skinType": "Normal/Dry/Oily/Combination/Sensitive",
  "concerns": ["anti-aging", "acne", "pigmentation", "body-contouring", "skin-texture"],

  "interactions": [
    {
      "date": "2024-XX-XX",
      "type": "email/sms/appointment/consultation",
      "campaignId": "CAMP001",
      "action": "opened/clicked/booked/completed"
    }
  ],

  "recommendedActions": [
    {
      "type": "maintenance/upsell/reactivation",
      "procedure": "Recommended Procedure",
      "reason": "Explanation",
      "suggestedDate": "2025-XX-XX",
      "priority": "high/medium/low"
    }
  ]
}
```

### campaigns.json (50-60 records: ~35 emails, ~25 SMS)

```json
{
  "id": "CAMP001",
  "name": "Campaign Name",
  "type": "Email/SMS",
  "status": "Completed/Active/Scheduled/Draft",
  "category": "Promotional/Follow-up/Re-engagement/Maintenance-Reminder/Seasonal/Birthday",
  "tone": "Professional/Friendly/Urgent/Caring",

  "createdDate": "2024-XX-XX",
  "scheduledDate": "2024-XX-XX",
  "sentDate": "2024-XX-XX",

  "subject": "Email Subject Line",
  "previewText": "Email preview text",
  "content": "Full content with HTML allowed for emails, plain text for SMS",
  "ctaText": "Book Now / Schedule Consultation / Claim Offer",
  "ctaUrl": "https://booking.medspa.com/...",

  "targetSegment": {
    "lifecycleStages": ["Active", "At-Risk"],
    "procedures": ["Botox", "Fillers"],
    "ageRange": {"min": 30, "max": 50},
    "lastVisitDays": {"min": 60, "max": 180}
  },
  "targetCustomerIds": ["CUST001", "CUST002"],

  "offer": {
    "type": "percentage/fixed/bogo/free-addon",
    "value": "20%/$100/Buy 2 Get 1 Free",
    "validUntil": "2025-XX-XX",
    "procedures": ["Applicable procedures"]
  },

  "performance": {
    "sent": 100-500,
    "delivered": 95-495,
    "opened": 20-200,
    "clicked": 5-50,
    "converted": 1-20,
    "revenue": 0-50000,
    "appointments": 0-20,

    "deliveryRate": "95-99%",
    "openRate": "15-40%",
    "clickRate": "2-15%",
    "conversionRate": "1-10%",
    "roi": 0.5-10.0
  }
}
```

## Content Guidelines

### Email Content Requirements

1. **Subject Lines**:
   - Keep under 50 characters
   - Use personalization: "Sarah, time for your Botox touch-up?"
   - Create urgency: "48 hours left: 20% off Fillers"

2. **Email Body**:
   - Professional tone: Medical terminology, benefit-focused
   - Friendly tone: Conversational, emoji-friendly, personal stories
   - Include personalization based on procedure history
   - Clear value proposition
   - Single, prominent CTA

3. **SMS Content**:
   - Under 160 characters
   - Direct and actionable
   - Include offer details
   - Clear CTA: "Reply YES" or shortened URL

### Marketing Scenarios by Category (Personalized Approach)

#### Re-engagement Campaigns (Priority) - Personalized by Customer History

- **For Botox regulars who missed appointment**: "Sarah, your beautiful results from Dr. Johnson are probably fading. Let's refresh your look with 15% off"
- **For high-value dormant customers**: "As a Platinum member, we've reserved our new Morpheus8 treatment exclusively for you"
- **For seasonal procedure customers**: "Last summer you loved your CoolSculpting results. Ready for this year's beach season?"
- **For customers who tried one service**: "You loved your Botox results. Did you know Fillers could enhance your cheekbones too?"
- **Life event triggers**: "Happy upcoming 40th birthday! Celebrate with our age-defying package"

#### Maintenance Reminders (Priority) - Personalized by Procedure Type & Timeline

- **Botox specific (3-4 months)**: "Your forehead lines are due for a touch-up. Dr. Smith has availability next week"
- **Filler specific (6-12 months)**: "Your lip filler from January is approaching the 6-month mark. Time to maintain that perfect pout!"
- **Post-procedure check-ins**:
  - Day 1: "How are you feeling after yesterday's treatment?"
  - Week 1: "Your Botox should be fully settled now. Send us a selfie!"
  - Month 1: "Loving your results? Share your experience for 10% off next visit"
- **Combination reminders**: "Your Botox is due next month, and your Juvederm in 2 months. Book both together and save $150"

#### Hyper-Personalized Campaigns by Customer Persona

- **The Busy Executive (45-55, high-value)**:
  - "Quick lunch-hour Botox with zero downtime. We'll have you back in the office looking refreshed"
  - SMS only, appointment links, emphasis on convenience and discretion

- **The Young Professional (28-35, prevention-focused)**:
  - "Start your preventative Botox journey. Small doses now = fewer wrinkles later"
  - Instagram-worthy before/afters, payment plans, "Baby Botox" options

- **The Bride-to-Be**:
  - "Your wedding is 6 months away. Let's create your personalized beauty timeline"
  - Package deals, timeline planning, day-of touch-ups

- **The Fitness Enthusiast**:
  - "You've built the muscle, let's sculpt the final details with CoolSculpting"
  - Body contouring focus, athletic performance benefits

- **The Empty Nester (50-65, rediscovering self)**:
  - "With the kids in college, it's your time to shine. Explore our transformation packages"
  - Comprehensive solutions, social proof from similar demographics

#### Behavioral Trigger Campaigns

- **Price-sensitive customers**: "We noticed you browsed our Botox page. Here's an exclusive 20% off for first-timers"
- **Research-heavy customers**: "You've read about Ultherapy 5 times. Dr. Anderson can answer all your questions in a free virtual consultation"
- **Impulse buyers**: "Flash sale: Next 24 hours only! Book any filler and get complimentary Botox for your crow's feet"
- **Social proof seekers**: "See why 127 customers chose Dr. Smith for their rhinoplasty this year"
- **Comparison shoppers**: "We know you have options. Here's why our board-certified team stands apart..."

#### Emotional & Lifestyle Triggers

- **Confidence boost**: "Feeling camera-shy on Zoom? Our subtle enhancements help you feel confident on and off screen"
- **Special events**: "Your high school reunion is coming up. Look as young as you feel"
- **Seasonal mood**: "Beat the winter blues with our Vitamin D injection + Botox combo"
- **Career milestone**: "Congratulations on your promotion! Celebrate with a leadership-ready look"
- **Dating again**: "New chapter, new you. Our dating-confidence package is designed for fresh starts"

## Data Generation Guidelines

### Customer Distribution (Enhanced for Personalization)

#### Demographics

- **Age Segments with Personas**:
  - 25-34 (25%): "Prevention-Focused Millennials" - First-time Botox, social media influenced
  - 35-44 (35%): "Maintenance Masters" - Regular customers, know what works
  - 45-54 (25%): "Transformation Seekers" - Ready for comprehensive solutions
  - 55-65 (15%): "Graceful Agers" - Natural-looking results, discretion important

- **Gender & Preferences**:
  - Women (75%): Even split between subtle enhancement vs dramatic results
  - Men (25%): Focus on Botox for wrinkles, body contouring, discretion crucial

- **Psychographic Segments**:
  - "The Perfectionist" (20%): Researches everything, needs multiple consultations
  - "The Socialite" (25%): Influenced by friends, loves package deals
  - "The Practical" (30%): ROI-focused, responds to value propositions
  - "The Trendsetter" (25%): Wants newest treatments, early adopter

#### Customer Journey Stages

- **New** (20%):
  - Sub-segments: Nervous first-timer, Switched from competitor, Referral from friend
  - Customize messaging based on entry point

- **Active** (35%):
  - Sub-segments: Loyal single-procedure, Multi-procedure enthusiast, Seasonal visitor
  - Engagement varies by frequency and spend patterns

- **At-Risk** (25%):
  - Sub-segments: Price shocked, Moved away, Bad experience, Just busy
  - Different win-back strategies for each

- **Dormant** (20%):
  - Sub-segments: Completed goal, Financial change, Found alternative
  - Requires investigation and targeted approach

### Enhanced Campaign Performance Metrics by Segment

#### By Customer Value Tier

- **Platinum** (>$15k spent):
  - Email open rate: 45-60% (they're highly engaged)
  - Click rate: 15-25%
  - Conversion: 20-35% (trust established)

- **Gold** ($5k-$15k):
  - Email open rate: 35-45%
  - Click rate: 10-18%
  - Conversion: 15-25%

- **Silver** ($1k-$5k):
  - Email open rate: 25-35%
  - Click rate: 5-12%
  - Conversion: 8-15%

- **Bronze** (<$1k):
  - Email open rate: 18-28%
  - Click rate: 3-8%
  - Conversion: 3-8%

#### By Campaign Type & Personalization Level

- **Hyper-personalized** (mentions specific procedure, doctor, dates):
  - 2.5x higher open rates
  - 3x higher click rates
  - 4x higher conversion

- **Segmented** (targeted to persona/lifecycle):
  - 1.5x higher open rates
  - 2x higher click rates
  - 2.5x higher conversion

- **Broadcast** (general offers):
  - Baseline metrics

### AI-Driven Personalization Variables

Each campaign should utilize multiple variables:

1. **Customer name** and **preferred title** (Dr., Ms., etc.)
2. **Last procedure** and **time since**
3. **Preferred doctor** and their **availability**
4. **Skin concerns** matched to **solution**
5. **Budget indicators** (payment plan mentions for lower tiers)
6. **Communication preferences** (formal vs casual)
7. **Result photos** permission (include testimonials if yes)
8. **Special dates** (birthday month, anniversary of first treatment)
9. **Geographic factors** (weather-related skin concerns)
10. **Lifestyle indicators** (mentions of events, career, etc.)

### Creative Content Examples by Personalization Level

#### Level 1: Basic Personalization (Name + Recent Procedure)

**Email**: "Hi Sarah, it's been 3 months since your Botox treatment. Time for a touch-up!"
**SMS**: "Sarah, your Botox touch-up is due! Book now: [link]"

#### Level 2: Behavioral Personalization (+ History + Preferences)

**Email**: "Sarah, Dr. Johnson noticed it's been 3 months since your forehead Botox. Since you prefer morning appointments, we've reserved Tuesday 9am slots just for you. Your usual 20 units are ready!"
**SMS**: "Hi Sarah! Dr. Johnson has your fave 9am slot open Tuesday for Botox. Reply YES to book your usual!"

#### Level 3: Contextual Personalization (+ Life Events + Skin Journey)

**Email**: "Sarah, with your daughter's wedding in 3 months, let's plan your beauty timeline. Based on your combination skin and preference for natural results, we suggest: Botox now (settles in 2 weeks), followed by Juvederm for subtle lip enhancement 6 weeks before the big day. As a Gold member, enjoy 20% off your mother-of-the-bride package!"

#### Level 4: Predictive Personalization (+ AI Recommendations)

**Email**: "Sarah, customers with your skin type who loved Botox often see amazing results with our new Morpheus8 treatment. Since you mentioned concerns about neck tightening during your last visit, this could be perfect. Based on your treatment history, we predict you'll see optimal results with 3 sessions. Dr. Johnson has availability next week - shall we discuss a personalized plan?"

### Campaign A/B Testing Variables

For each campaign, consider testing:

1. **Subject lines**: Urgency vs Benefit vs Personalization vs Curiosity
2. **Send times**: Based on customer's previous open patterns
3. **Content length**: Short vs detailed based on customer segment
4. **Imagery**: Before/after vs lifestyle vs doctor/clinic photos
5. **CTA style**: Button vs text link, color variations
6. **Offer presentation**: Percentage vs dollar amount vs value add
7. **Tone variations**: Professional medical vs girlfriend advice vs luxury spa

### Dynamic Content Blocks

Each email should potentially include:

- **Weather-based**: "With Miami's humidity affecting your skin..."
- **Loyalty status**: "As a Platinum member, you get first access..."
- **Appointment history**: "We miss seeing you! It's been 6 months..."
- **Product education**: "New to Sculptra? Here's why it's different..."
- **Social proof**: "247 Miami women chose this treatment last month..."
- **Urgency indicators**: "Only 3 appointment slots left this week..."
- **Payment options**: "Split your treatment into 4 easy payments..."

## Quality Checklist

- [ ] All customer emails are unique and realistic
- [ ] Phone numbers use proper US format
- [ ] Dates are logical (procedures before today, maintenance dates in future)
- [ ] Marketing content is compelling and error-free
- [ ] Performance metrics are realistic for the industry
- [ ] Each customer has 3-10 procedures in history
- [ ] Each customer has 5-15 interactions
- [ ] Campaigns target appropriate customer segments
- [ ] Offers are attractive but realistic (15-30% discounts)
- [ ] Content matches the specified tone
- [ ] All IDs are properly linked between files
- [ ] **Each campaign demonstrates different personalization levels**
- [ ] **Customer segments are properly represented across campaigns**
- [ ] **A/B testing variations are included for major campaigns**
- [ ] **Behavioral triggers align with customer journey stages**
- [ ] **Content reflects authentic American cultural nuances**
- [ ] **Performance metrics show clear correlation with personalization level**

## Personalization Success Metrics

Track these in your campaign performance data:

- Generic campaigns: Baseline performance
- Name personalization: +25% open rate
- Behavior-based: +50% open rate, +100% click rate
- Full contextual: +75% open rate, +200% click rate, +300% conversion
- AI-predictive: +100% open rate, +300% click rate, +400% conversion

## Key Value Propositions to Highlight

1. **"We remember your preferences"** - Doctor, time, treatment specifics
2. **"We understand your journey"** - Multi-treatment planning, lifecycle awareness
3. **"We respect your time"** - Smart scheduling, minimal downtime options
4. **"We celebrate your milestones"** - Life events, beauty goals
5. **"We protect your investment"** - Maintenance reminders, package deals

## Git Commands

```bash
# Clone and setup
git clone https://github.com/xbfighting/ai-reengage-demo.git
cd ai-reengage-demo
git checkout -b feature/marketing-demo-data

# After creating the JSON files
git add customers.json campaigns.json
git commit -m "Add synthetic marketing data for MedSpa demo"
git push origin feature/marketing-demo-data
```

## Final Notes

- Ensure all content is professional and appropriate for medical marketing
- Avoid making unrealistic medical claims
- Include subtle urgency without being pushy
- Make the data feel realistic with natural variations
- Test that JSON files are valid before committing

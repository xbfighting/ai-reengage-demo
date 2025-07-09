Product Requirements Document: AI-Powered Campaign Builder
Executive Summary
Build an AI-powered campaign builder that replaces generic email blasts with hyper-targeted, individualized messages across email and text channels that convert prospects to consultations and maximize lifetime value of existing patients through strategic upsells.
Business Context & Problem Statement
Current State: Generic Blasts Fail
One-Size-Fits-None: "Get 10% off Botox" sent to entire database
Result: 2-3% CTR, 0.5% conversion, patients feel spammed
Missed Revenue: No upsell strategy, no trending topic leverage
Future State: Intelligent 1:1 Marketing
Example Email: "Jennifer, at 52 you're the same age as Jennifer Aniston. Her secret? Strategic filler placement. Book by Friday for 20% off."
Example Text: "Hi Jennifer! JA (54) just revealed her secret: strategic filler 💉 You're the perfect age. Claim your Friday spot? Y/N"
Result: 15-20% CTR (email), 45% response rate (text), 5% conversion, patients feel understood
Revenue Impact: 40% increase in consultation bookings, 60% increase in patient lifetime value
Vision
Transform Dr. Clevens' marketing from batch-and-blast to an intelligent system that crafts individualized messages across email and text channels based on patient psychology, trending culture, and purchase patterns—achieving 10x better results.
Success Metrics
Lead Conversion: From 0.5% to 5% (10x improvement)
Text Response Rate: Target 45%+ for SMS campaigns
Upsell Rate: From 10% to 40% of existing patients
Campaign Creation: From 3 days to 15 minutes
Personalization Score: 100% of messages contain 3+ personalized elements
User Personas
Primary: Sarah, Marketing Manager
Background: 5 years in medical spa marketing, comfortable with email tools but not databases
Goal: Launch timely campaigns that drive bookings across channels
Frustration: "I know who I want to target, but getting the data and adapting for text vs email takes forever"
Secondary: Dr. Clevens (Approval Authority)
Background: Practice owner, needs visibility into all patient communications
Goal: Ensure all messaging maintains practice standards
Frustration: "I need to approve campaigns quickly without reading every variant"
Core Capabilities
1. Unified Campaign Builder Interface
Main Interface Design
Component
Description
Campaign Name
Text input field
Channel Selection
Toggle: Email / Text
Campaign Brief
Large text box with helper prompt: "Describe your campaign idea or use the guided options below..."
Demographics Section
<table><tr><td>Age Range</td><td>Slider (18-80) with insight bubbles</td></tr><tr><td>Gender</td><td>Checkbox: M/F/All</td></tr><tr><td>Location</td><td>Zip code + radius selector</td></tr><tr><td>Income Level</td><td>Dropdown with ranges</td></tr></table>
Behavioral Targeting
<table><tr><td>Procedure History</td><td>Has completed: [multi-select dropdown]<br>Has NOT tried: [multi-select dropdown]</td></tr><tr><td>Spending</td><td>Lifetime value: [range selector]</td></tr><tr><td>Engagement</td><td>Last visit: [time range dropdown]<br>Email/Text activity: [engagement level]</td></tr></table>
Psychological Triggers
<table><tr><td>Life Events</td><td>☐ Wedding ☐ Reunion ☐ Divorce ☐ New Job</td></tr><tr><td>Seasonal</td><td>☐ Holiday parties ☐ Beach season ☐ New Year</td></tr><tr><td>Cultural</td><td>☐ Award shows ☐ Trending on social ☐ Celebrity news</td></tr></table>
Custom Flair
Text area: "Add your unique angle, specific celebrity references, or special instructions..."
Preview & Generate
Button that shows sample messages before sending

2. Channel-Specific Message Generation
Email Template Prompt
Generate a personalized email for [PATIENT_NAME] with the following:
- Age-appropriate celebrity reference (patient is [AGE])
- Hook based on [SELECTED_TRIGGERS]
- Previous procedure acknowledgment if applicable: [PROCEDURE_HISTORY]
- Urgency element: [DEADLINE]
- Offer: [DISCOUNT/SPECIAL]
- Professional but friendly tone
- Subject line that gets opened
- Clear CTA button text

Text Message Template Prompt
Generate a personalized text for [PATIENT_NAME] with:
- Max 160 characters
- Casual, conversational tone
- Celebrity/trend reference if space allows
- Clear Y/N response option OR link
- Emoji usage: conservative (1-2 max)
- Urgency in compact form
- Personalization without being creepy
Format: Greeting + Hook + Offer + CTA

3. AI Processing Engine
Natural Language Interpretation
When a user inputs a campaign brief, the system:
Extracts targeting criteria → maps to database fields
Identifies channel preference → optimizes message format
Detects cultural hooks → validates celebrity age/relevance
Generates variants → creates both email and text versions
Example Processing
Input: "Target women 45-60 who had Botox 4-6 months ago. Remind them Nicole Kidman looked amazing at the Oscars. She's 56. Time for their refresh. 25% off if they book this week."
System Output:
Email Version: Full narrative with images, detailed benefits
Text Version: "Hi [NAME]! Time for your Botox refresh? Nicole Kidman (56) stunned at Oscars 🌟 Book this week = 25% off. Reserve now? Y/N"
Conversion Optimization Features
Dynamic Message Timing
Email: Tuesdays 10am or Thursdays 2pm (highest open rates)
Text: Weekdays 11am-1pm or 5-7pm (highest response rates)
Smart Delay: Space messages to avoid fatigue
Channel Selection Logic
Scenario
Recommended Channel
Urgent offers (24-48hr)
Text
Educational content
Email
High-value patients
Both (text follow-up)
Dormant reactivation
Email first, text if no response
Appointment reminders
Text
Procedure packages
Email with text nudge


Appendix: Comprehensive Campaign Strategies
Category: Celebrity & Pop Culture
Subcategory: Award Season Glamour
Target: Women 40-65 who value prestige
Email Generation Prompt:
Generate a personalized email for [PATIENT_NAME], age [AGE], who has had [PREVIOUS_PROCEDURES].

Subject Line: Create urgency using "[PATIENT_NAME], [AWARD_SHOW] Beauty Secrets Revealed"

Email Structure:
1. Opening: Personal greeting mentioning their last visit/procedure
2. Hook: "[CELEBRITY_NAME] at [AGE] stunned at [AWARD_SHOW] with [SPECIFIC_LOOK]. Did you notice [SPECIFIC_FEATURE]?"
3. Secret Reveal: "Her makeup artist revealed the secret: [TREATMENT] done 3 weeks before events"
4. Personal Connection: "At [PATIENT_AGE], you're the perfect candidate for this same red-carpet treatment"
5. Offer: "Red Carpet Ready Package: [TREATMENT_COMBO] - Save 25% when booked by [DATE]"
6. Urgency: "Only [X] appointment slots before [NEXT_BIG_EVENT]"
7. CTA: "Reserve Your Red Carpet Transformation"

Include: Elegant imagery, before/after subtle improvements
Tone: Aspirational yet approachable
Word Count: 150-200 words

Text Generation Prompt:
Create text for [PATIENT_NAME]:
"Hi [NAME]! Saw [CELEBRITY] at [AWARD_SHOW]? 😍 Her secret: [TREATMENT] 3 wks before. You'd look amazing! Book your red carpet slot? Text Y for times"
Keep under 160 chars. Use 1 emoji max.

Example Output:
Email: "Michelle, Cate Blanchett's Luminous Oscars Glow at 54"
Text: "Hi Michelle! Saw Cate at Oscars? 😍 Her secret: Morpheus8 3 wks before. You'd look amazing! Book now? Y/N"
Subcategory: Reality TV Influence
Target: Women 25-45 who follow pop culture
Email Generation Prompt:
Generate a relatable email for [PATIENT_NAME], age [AGE], interested in [TREATMENT_INTEREST].

Subject Line: "OMG, Did You See What [REALITY_STAR] Just Posted?"

Email Structure:
1. Opening: "Hey [NAME]! Had to share this with you..."
2. Gossip Hook: "[REALITY_STAR] just went public about her [PROCEDURE] on [SHOW/INSTAGRAM]"
3. Relatability: "She said [RELATABLE_QUOTE about confidence/dating/feeling good]"
4. Demystify: "Here's the real scoop - it's actually [quick/painless/affordable]"
5. Social Proof: "[NUMBER] of our patients have done this since her reveal"
6. Offer: "Want the [REALITY_STAR] special? Book this week for her exact treatment package at 20% off"
7. Fun CTA: "Get Your Glow Up"

Include: Screenshots of social posts, casual language
Tone: Girlfriend gossip session
Word Count: 125-175 words

Text Generation Prompt:
Create gossipy text for [NAME]:
"Girl! [REALITY_STAR] just admitted to [PROCEDURE] on IG 👀 Want the deets? We do her exact treatment! Chat? Y/N"
Keep conversational, 1-2 emojis.

Example Outputs:
Real Housewives: "Teresa's Liquid Facelift confession"
Bachelor: "Cassie's pre-paradise Botox prep"
Kardashian: "Khloé's Morpheus8 body treatment"
Subcategory: Age-Defying Icons
Target: Patients within 3 years of celebrity age
Email Generation Prompt:
Generate age-matched celebrity email for [PATIENT_NAME], age [AGE], with [SKIN_CONCERNS].

Subject Line: "[PATIENT_NAME], [CELEBRITY] is [CELEBRITY_AGE]. You're [PATIENT_AGE]. See the Difference?"

Email Structure:
1. Age Connection: "Hi [NAME], Quick question - would you believe [CELEBRITY] is [AGE]?"
2. Shared Journey: "At [PATIENT_AGE], you're at the exact same life stage"
3. Specific Observation: "Notice how [SPECIFIC_FEATURE - jawline/eyes/skin texture] stays defined?"
4. Attainable Secret: "It's not genetics - it's strategic [TREATMENT_TYPE]"
5. Personalized Plan: "Based on your [PREVIOUS_TREATMENT/CONCERN], here's your [CELEBRITY] protocol:"
6. Treatment Details: List 3-step approach with timeline
7. Investment: "Complete [CELEBRITY] Protocol: $[PRICE] (payment plans available)"
8. Motivational CTA: "Start Your [CELEBRITY] Journey"

Include: Side-by-side age comparisons, treatment timeline
Tone: Empowering and educational
Word Count: 200-250 words

Text Generation Prompt:
Create age-matched text for [NAME], age [AGE]:
"[NAME], you and [CELEBRITY] are both [AGE]! 🤯 Her secret? Strategic [TREATMENT]. Ready for your glow? Y for details"
Focus on age surprise factor.

Example Outputs:
"The JLo Protocol" for 50s: Focus on skin tightening + glow
"The Paul Rudd Effect" for men: Subtle Botox + skincare
"Christie Brinkley's Secret" for 60s: Full face rejuvenation
Category: Life Events & Milestones
Subcategory: Relationship Changes
Target: Recently divorced/separated patients
Email Generation Prompt:
Generate empowering email for [PATIENT_NAME], [AGE], recently [divorced/separated], last procedure [TIME_AGO].

Subject Line: "[PATIENT_NAME], This is Your Chapter 2 ✨"

Email Structure:
1. Acknowledgment: "Hi [NAME], We know life changes can be challenging and exciting..."
2. Empowerment Hook: "Like [CELEBRITY] after her divorce at [AGE], this is your time to shine"
3. Transformation Story: "Did you see how [SPECIFIC_CELEB] glowed up? That confidence is real"
4. Permission to Invest: "You've spent years taking care of everyone else. Now it's YOUR turn"
5. Specific Package: "Our 'New Chapter' Transformation includes:
   - Consultation with champagne
   - Custom treatment plan
   - Professional photoshoot for your new profile
   - 6-month support journey"
6. Financial Understanding: "Flexible payment plans because we know divorce is expensive"
7. Community: "Join our private support group of amazing women writing their next chapter"
8. CTA: "Book Your Transformation Consultation"

Include: Before/after transformations, empowering quotes
Tone: Supportive sister/best friend
Word Count: 200-250 words

Text Generation Prompt:
Create supportive text for [NAME]:
"Hi [NAME]! New chapter = new you? 💪 Like JLo post-divorce, it's glow up time! Free consultation + payment plans. Ready? Y/N"
Empowering but not pushy.

Example Outputs:
Divorce: Focus on self-investment and confidence
Empty Nest: "Kids gone, time for you"
Post-breakup: "Best revenge is your glow"
Subcategory: Career Milestones
Target: Professional advancement, job changes
Email Generation Prompt:
Generate professional email for [PATIENT_NAME], [AGE], [JOB_TITLE/CHANGE], interested in [CONCERNS].

Subject Line: "Congrats on [POSITION], [PATIENT_NAME]! Ready to Look the Part?"

Email Structure:
1. Congratulations: "Hi [NAME], We heard about your [promotion/new role] - amazing!"
2. Professional Reality: "Studies show executives who invest in appearance earn 12% more"
3. Subtle Enhancement: "Like [EXEC_CELEBRITY] at [AGE], the best work is undetectable"
4. Executive Package: "Our 'C-Suite Confidence' protocol:
   - Subtle Botox for approachability
   - Under-eye refresh for long days
   - Jawline definition for Zoom calls
   - Hand rejuvenation for handshakes"
5. Discretion: "Early morning and private entrance appointments available"
6. ROI Mindset: "Consider it professional development (many executives do 😉)"
7. Booking: "Private consultation link: [CALENDAR]"
8. CTA: "Elevate Your Executive Presence"

Include: Professional headshot examples, subtle improvements
Tone: Professional peer-to-peer
Word Count: 175-225 words

Text Generation Prompt:
Create exec-focused text for [NAME]:
"Congrats on [ROLE]! 🎉 Executive presence matters. Discrete appointments available. Let's chat? Y for private booking link"
Professional but warm.

Example Outputs:
New C-Suite: "Boardroom ready" package
LinkedIn updates: Professional photo prep
Speaking engagements: "Stage ready" treatments
Subcategory: Special Occasions
Target: Upcoming events in patient timeline
Email Generation Prompt:
Generate event-focused email for [PATIENT_NAME], [AGE], with [EVENT] in [TIMEFRAME].

Subject Line: "[TIMEFRAME] Until Your [EVENT], [PATIENT_NAME] - Let's Plan!"

Email Structure:
1. Countdown Opening: "Hi [NAME]! Can you believe your [EVENT] is only [TIME] away?"
2. Timeline Urgency: "Here's the insider timeline for looking incredible:
   - [8 weeks out]: Major treatments (lifts, resurfacing)
   - [4 weeks out]: Injectables settle perfectly
   - [2 weeks out]: Final touches and glow treatments"
3. Personal Story: "Remember [PAST_PATIENT]? She did our [EVENT] prep and [SPECIFIC_RESULT]"
4. Custom Package: "Your Personalized [EVENT] Timeline:
   - Week 1: Consultation and planning
   - Week 2-4: [TREATMENT_1]
   - Week 5-6: [TREATMENT_2]
   - Final week: [GLOW_TREATMENT]"
5. Photos That Last: "You'll be in photos forever - make them amazing"
6. Urgency: "We need to start by [DATE] for optimal results"
7. Special Pricing: "[EVENT] Package: Save $[AMOUNT] when booked this week"
8. CTA: "Start Your [EVENT] Transformation"

Include: Timeline calendar, event-specific before/afters
Tone: Excited friend planning together
Word Count: 200-250 words

Text Generation Prompt:
Create urgent event text for [NAME]:
"[NAME]! [EVENT] in [TIME]! 😍 We need to start treatments NOW for best results. Free timeline consultation? Y/N"
Urgency without panic.

Example Outputs:
Wedding: 12-week bridal bootcamp
Reunion: "Wow them" 6-week plan
Vacation: "Bikini ready" protocol
Category: Treatment Journeys
Subcategory: The Completionist
Target: Patients with 2/3 of common treatment trios
Email Generation Prompt:
Generate completion-focused email for [PATIENT_NAME], who has had [TREATMENT_1] and [TREATMENT_2] but not [TREATMENT_3].

Subject Line: "[PATIENT_NAME], Your Transformation is 67% Complete..."

Email Structure:
1. Recognition: "Hi [NAME], We've been admiring your results from [TREATMENT_1] and [TREATMENT_2]!"
2. Visual Progress: "You've come so far:
   ✅ [TREATMENT_1] - Beautiful [SPECIFIC_RESULT]
   ✅ [TREATMENT_2] - Stunning [SPECIFIC_RESULT]
   ⭕ [TREATMENT_3] - The missing piece"
3. Expert Insight: "Dr. Clevens calls this the '[CATCHY_NAME] Trinity' - each enhances the others"
4. The Missing Link: "Here's what [TREATMENT_3] would complete:
   - [SPECIFIC_BENEFIT_1]
   - [SPECIFIC_BENEFIT_2]
   - Harmonizes your previous work"
5. Patient Example: "[SIMILAR_PATIENT] finished her trinity last month: [QUOTE_TESTIMONIAL]"
6. Bundle Value: "Complete Your Trinity Package:
   - [TREATMENT_3] at 30% off
   - Free touch-up on previous treatments
   - Complimentary [BONUS]"
7. Psychological Push: "You're so close to your full potential"
8. CTA: "Complete Your Masterpiece"

Include: Before/middle/after progression photos
Tone: Encouraging coach
Word Count: 175-225 words

Text Generation Prompt:
Create completion text for [NAME]:
"[NAME]! Your [TREATMENT_1] + [TREATMENT_2] look amazing! Ready to complete with [TREATMENT_3]? 30% off this week! Y/N"
Focus on almost-there momentum.

Example Outputs:
Botox + Filler → Threadlift completion
Upper + Mid face → Lower face completion
Face treatments → Neck/décolletage
Subcategory: The Maintainer
Target: Regular patients due for touch-ups
Email Generation Prompt:
Generate maintenance reminder for [PATIENT_NAME], last [TREATMENT] was [TIME_AGO], typically needs refresh every [INTERVAL].

Subject Line: "[PATIENT_NAME], Your Gorgeous [TREATMENT] Results are [AGE_OF_RESULTS] Old"

Email Structure:
1. Compliment Opening: "Hi [NAME], You've been glowing since your [TREATMENT] in [MONTH]!"
2. Gentle Reminder: "Fun fact: Your beautiful results are now [TIME_OLD]"
3. Visual Reminder: "Remember this? [Include their actual before/after if available]"
4. Science Education: "Here's what's happening at [TIME_PERIOD]:
   - [TREATMENT] naturally metabolizes
   - [SPECIFIC_SIGNS] may start appearing
   - Perfect time to refresh"
5. Maintenance Benefits: "Regular maintenance means:
   - Less product needed
   - More natural results
   - Better long-term outcomes"
6. VIP Perks: "As a maintenance member:
   - Priority booking
   - 15% loyalty discount
   - Free touch-up if needed within 2 weeks"
7. Easy Booking: "Your favorite time slot [PREFERRED_TIME] is available [DATES]"
8. CTA: "Keep Your Glow Going"

Include: Their actual before/after, treatment timeline
Tone: Caring aesthetician friend
Word Count: 150-200 words

Text Generation Prompt:
Create friendly maintenance text for [NAME]:
"Hi [NAME]! Your beautiful [TREATMENT] is [TIME] old 📅 Time to refresh! Your usual [DAY/TIME] available. Book? Y/N"
Personal and convenient.

Example Outputs:
Botox: 4-month refresh cycle
Filler: 8-12 month timeline
Laser: Seasonal maintenance
Subcategory: The Upgrader
Target: Non-surgical patients ready for more
Email Generation Prompt:
Generate upgrade email for [PATIENT_NAME], currently doing [CURRENT_TREATMENTS], good candidate for [UPGRADE_OPTION].

Subject Line: "[PATIENT_NAME], Ready for Results That Last Years, Not Months?"

Email Structure:
1. Acknowledge Success: "Hi [NAME], You've been loving your [CURRENT_TREATMENT] results!"
2. Plant the Seed: "What if you could wake up with those results... without appointments every few months?"
3. Evolution Story: "Many patients like you start with [CURRENT] and naturally evolve to [UPGRADE]"
4. Comparison Chart:
   "[CURRENT_TREATMENT]:
   - Lasts [DURATION]
   - Requires [FREQUENCY]
   - Cost over 5 years: $[TOTAL]
   
   [UPGRADE_TREATMENT]:
   - Lasts [DURATION]
   - One-time procedure
   - Cost: $[PRICE] (less than 2 years of [CURRENT]!)"
5. Real Patient: "[NAME] made this switch at [AGE]: [TESTIMONIAL]"
6. Education Offer: "Free consultation includes:
   - 3D imaging of potential results
   - Honest assessment
   - No pressure - only if you're ready"
7. Comfort Address: "Modern techniques = minimal downtime"
8. CTA: "Explore Your Long-Term Options"

Include: Natural progression chart, financing options
Tone: Educational consultant
Word Count: 200-250 words

Text Generation Prompt:
Create upgrade text for [NAME]:
"[NAME], love your [CURRENT] results? 🌟 Imagine waking up with them daily! Chat about longer-lasting options? Y/N"
Plant curiosity gently.

Example Outputs:
Botox → Brow lift
Filler → Fat transfer
Non-surgical → Mini procedures
Category: Psychological Triggers
Subcategory: Social Proof
Target: Socially influenced decision makers
Email Generation Prompt:
Generate social proof email for [PATIENT_NAME] in [NEIGHBORHOOD/SOCIAL_GROUP], interested in [TREATMENT_CATEGORY].

Subject Line: "17 [NEIGHBORHOOD] Women Booked This Week, [PATIENT_NAME]"

Email Structure:
1. Attention Grabber: "Hi [NAME], Something interesting is happening in [NEIGHBORHOOD]..."
2. Specific Numbers: "In the past month:
   - [NUMBER] of your neighbors have discovered [TREATMENT]
   - [NUMBER] from [COUNTRY_CLUB/GYM/GROUP]
   - [NUMBER] referred by friends like you"
3. Social Phenomenon: "The [NEIGHBORHOOD] glow is real - have you noticed?"
4. Name Drops (tasteful): "Without naming names... that gorgeous woman from [LOCATION_HINT]? She just finished her [TREATMENT]"
5. FOMO Creation: "Here's why everyone's booking:
   - New technique with zero downtime
   - Results that look natural
   - Special group rate this month"
6. Exclusivity: "We're actually limiting appointments to maintain quality"
7. Community Angle: "Join the [NEIGHBORHOOD] beauty collective"
8. CTA: "Claim Your Spot"

Include: Appointment availability calendar showing limited slots
Tone: Insider information sharing
Word Count: 175-225 words

Text Generation Prompt:
Create FOMO text for [NAME]:
"[NAME]! 17 [NEIGHBORHOOD] neighbors booked [TREATMENT] this week! 👀 Only 3 spots left. Want one? Y/N"
Create urgency through social proof.

Example Outputs:
Country club crowd: "Ponte Vedra Tennis Club transformation"
Professional women: "C-suite executives' secret"
Mom groups: "School pickup line glow-up"
Subcategory: Exclusive Access
Target: VIP and high-value patients
Email Generation Prompt:
Generate VIP exclusive email for [PATIENT_NAME], lifetime value $[AMOUNT], member since [YEAR].

Subject Line: "Private Invitation: [PATIENT_NAME], You've Earned Elite Access"

Email Structure:
1. VIP Recognition: "Dear [NAME], As one of our most valued patients since [YEAR]..."
2. Exclusive Reveal: "You're among the first 20 patients to preview our [NEW_TREATMENT/TECHNOLOGY]"
3. Why Them: "With $[AMOUNT] invested in your appearance journey, you deserve first access"
4. The Exclusive Offer:
   "🥂 VIP Preview Event:
   - Private consultation with Dr. Clevens
   - First access to [NEW_TREATMENT]
   - Champagne and hors d'oeuvres
   - 40% VIP discount (others will pay full price)
   - Invitation for one guest"
5. Celebrity Connection: "[CELEBRITY] just had this done in [CITY] for $[HIGH_PRICE]"
6. Scarcity: "Only 20 VIP spots. 14 already claimed."
7. Privacy: "Discrete entrance, after-hours appointment available"
8. CTA: "RSVP to Your VIP Preview"

Include: Elegant invitation design, VIP badge
Tone: Luxury concierge service
Word Count: 150-200 words

Text Generation Prompt:
Create VIP text for [NAME]:
"[NAME], VIP early access to our new [TREATMENT] 🥂 You + guest invited. 40% off. Interested? Reply VIP"
Exclusive but warm.

Example Outputs:
New technology launch: First access privileges
Celebrity provider visit: Private appointments
Holiday VIP events: Exclusive pricing
Subcategory: Smart Savings
Target: Price-conscious but quality-focused
Email Generation Prompt:
Generate value-focused email for [PATIENT_NAME], previous interest in [TREATMENT], price-sensitive behavior noted.

Subject Line: "[PATIENT_NAME], The Smart Money Approach to [TREATMENT]"

Email Structure:
1. Acknowledge Intelligence: "Hi [NAME], Smart women know: quality matters, but so does value"
2. Investment Mindset: "Think of [TREATMENT] like designer handbags - buy quality once vs. cheap repeatedly"
3. Real Math:
   "Let's break it down:
   Option A: Cheaper alternatives
   - $[LOW_PRICE] every 3 months
   - 5-year cost: $[HIGH_TOTAL]
   - Mixed results, multiple providers
   
   Option B: Our [TREATMENT]
   - $[PRICE] lasting [DURATION]
   - 5-year cost: $[LOWER_TOTAL]
   - Consistent, beautiful results"
4. Payment Intelligence: "Smart payment options:
   - 0% interest for 12 months
   - Break it down to $[MONTHLY] per month
   - Less than your [RELATABLE_EXPENSE]"
5. Value Adds: "This month only:
   - Free consultation ($300 value)
   - Complimentary [ADD-ON] ($500 value)
   - Lifetime touch-up discount"
6. Quality Assurance: "Dr. Clevens' 25 years = getting it right the first time"
7. Limited Time: "Smart savings end [DATE]"
8. CTA: "Calculate Your Smart Investment"

Include: Payment calculator, value comparison chart
Tone: Financial advisor meeting aesthetics
Word Count: 200-250 words

Text Generation Prompt:
Create value text for [NAME]:
"[NAME], smart [TREATMENT] deal: $[MONTHLY]/mo with 0% interest. Less than monthly [EXPENSE]! Details? Y/N"
Focus on affordability.

Example Outputs:
Package deals: "Buy 2, get 1 free"
Seasonal savings: "Spring renewal special"
Loyalty rewards: "Your 5th treatment free"
Master Prompt Templates
Email Campaign Master Prompt
Create a personalized email campaign for [SEGMENT] with:
1. Subject line using [PSYCHOLOGICAL_TRIGGER]
2. Opening with [PERSONALIZATION_POINT]
3. Body including:
   - Celebrity/cultural reference: [REFERENCE]
   - Past procedure acknowledgment: [HISTORY]
   - Social proof element: [PROOF]
   - Urgency creator: [DEADLINE]
4. CTA focused on [DESIRED_ACTION]
5. PS line with [SECONDARY_OFFER]

Tone: [Professional/Friendly/Exclusive/Empowering]
Length: [Short 100 words/Medium 200 words/Long 300 words]

Text Campaign Master Prompt
Create a text sequence for [SEGMENT]:
Message 1 (Initial):
- Greeting + name
- Hook with [TRIGGER/REFERENCE]
- Offer/question
- Response mechanism (Y/N or link)

Message 2 (Follow-up if no response):
- Softer approach
- Different angle
- Easy out option

Keep under 160 characters per message
Emoji use: [None/Minimal/Moderate]




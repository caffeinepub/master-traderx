# Master TraderX

## Current State

A full landing page for MasterTraderX in App.tsx with:
- Sticky header with nav links and "Begin Training" CTA
- Hero section: badge "India's Free Signature Trading Education Initiative", large MasterTraderX heading, subheadline about 8-hour program, embedded YouTube video, single CTA button "Begin the Master TraderX Training"
- Stats bar (white background): 15+ Years, 1 Lakh+ Target, ₹5 Cr+ Trading Profits, 8 Hours
- "Why Master TraderX Exists" section (white bg)
- About Kirti Agrawal section (deep blue bg) - currently placed after Why MTX Exists
- What You Will Learn section (white bg)
- Three Pillars section (deep blue bg)
- PAT Framework section (white bg)
- Program Structure section (deep blue bg) with Module 1 free, Modules 2-5 locked
- Is This For You section (white bg)
- Testimonials section (deep blue bg)
- Final CTA section (deep blue bg)
- Footer with disclaimer
- Floating WhatsApp button (wa.me/919827140374) — circular icon only, no label
- TrainingModal: FYERS popup with "Get Started" button and link

## Requested Changes (Diff)

### Add

1. **Top banner** — above sticky header: "🚀 Mission: Train 1 Lakh Disciplined Traders in India by 2026"

2. **Hero trust indicators** — below the headline/subheadline, before buttons:
   - ✔ 15+ Years Trading Experience
   - ✔ ₹5 Cr Trading Profits
   - ✔ Mission: Train 1 Lakh Traders by 2026

3. **Hero buttons** — replace single CTA with two buttons:
   - Primary: "▶ Start Free Lesson" (opens video popup)
   - Secondary: "Open FREE FYERS Account & Unlock Full Program" (opens FYERS signup)

4. **Free Lesson section** — new section immediately after hero:
   - Title: "Start Learning Instantly — Free First Lesson"
   - Module 1 card: "Trading Mindset & Market Reality"
   - Bullet list: Why most traders lose money / Psychology traps beginners face / The mindset required for consistency
   - Button: "▶ Start Free Lesson" → opens video popup (same YouTube video in modal, NOT page redirect)

5. **Trader Problem section** — new section after Free Lesson section:
   - Title: "Why Most Traders Struggle"
   - Intro: "Most traders start with excitement but quickly face confusion."
   - Bullet list: Random strategies from YouTube / Emotional trading decisions / Poor risk management / Overtrading after losses / Following tips without understanding
   - Closing line: "MasterTraderX was designed to solve these exact problems."

6. **How MasterTraderX Works section** — new step-by-step process section (after Program Structure):
   - Title: "How MasterTraderX Works"
   - Step 1: Watch the Free Lesson
   - Step 2: Open your FREE FYERS Trading Account
   - Step 3: Unlock the MasterTraderX Inner Circle
   - Step 4: Access all 5 modules instantly

7. **Account Opening Benefits section** — new section after How It Works:
   - Title: "Why Open a FREE FYERS Account Through MasterTraderX"
   - Checklist: Access to MTX Inner Circle Training / Complete 8-Hour Trading Program / Learn the PAT Framework / Structured Risk Management Training / Professional trading platform
   - Line: "Opening your account takes less than 5 minutes using Aadhaar OTP."

8. **Video popup for "Start Free Lesson"** — clicking any "Start Free Lesson" button opens a modal with the embedded YouTube video (https://youtu.be/2_rFKK7zGOQ), not a redirect.

### Modify

1. **Hero headline** — change from "India's Free Signature Trading Education Initiative" badge + "MasterTraderX" large heading to:
   - Main headline: "FREE MasterTraderX Trading Program"
   - Subheadline: "Learn how professional traders understand markets using price action, risk management, and discipline. Start with the first lesson completely FREE."

2. **Kirti Agrawal section** — move earlier in page (right after Trader Problem section, before Featured On). Update bio content to match the "From Losses to Consistency" narrative:
   - Began trading at 19
   - Lost nearly ₹20 lakhs over several years
   - Studied trading psychology, price behavior, structured trading systems
   - Developed the PAT Framework
   - Full-time trader and mentor with 15+ years market experience

3. **Featured Logos section** — consolidate both "Featured on" and "Also worked with" into ONE section titled "Featured On". Include all 8 logos:
   - Existing uploads: TV18, ET Now, Zee Business, CNBC, Alliance India, FYERS, eLearnMarkets
   - Generate new logos for: Moneycontrol, Alice Blue, Angel One (or use text placeholders with consistent styling)

4. **What You Will Learn** — update bullet points to:
   - How professional traders understand market structure
   - How to read price objectively using price action
   - Risk management before focusing on profits
   - Emotional discipline in trading
   - Why most traders lose money

5. **Three Pillars** — update descriptions:
   - Trading Psychology: Discipline, patience, emotional control
   - Risk Management: Capital protection and position sizing
   - Structured Trading System: Logical framework to understand price behavior

6. **PAT Framework** — add note below items: "This framework is taught for educational understanding only."

7. **Program Structure** — update module labels to match:
   - Module 1: ✔ Free – Start Now
   - Module 2: 🔒 Market Structure & Price Reading
   - Module 3: 🔒 Risk Management & Trade Planning
   - Module 4: 🔒 Price Action Setups & PAT Framework
   - Module 5: 🔒 Discipline & Trader Maturity
   - Message below modules: "To unlock Modules 2–5, open a FREE FYERS Trading & Demat Account."

8. **Final CTA section** — update content:
   - Headline: "Ready to Build a Real Trading Foundation?"
   - Body: "Start your journey with the free MasterTraderX lesson today. Unlock the full program by opening your FREE FYERS trading account."
   - Primary button: "▶ Start Free Lesson" (opens video popup)
   - Secondary button: "Open FYERS Account" (opens FYERS link)

9. **WhatsApp button** — change to pill-shaped floating widget with label:
   - Number: wa.me/919171166445
   - Label: "💬 Chat With Us on WhatsApp"
   - Position: bottom-right

10. **Name references** — change all "MasterTraderX Training" occurrences to "FREE MasterTraderX Trading Program"

11. **Header CTA button** — change "Begin Training" to "Start Free Lesson"

### Remove

1. Remove the standalone "Also worked with" section — merge its logos into the unified "Featured On" section.
2. Remove "Scroll to Explore" indicator if still present.
3. Remove "No profit guarantees" disclaimer section if still present.

## Implementation Plan

1. Add top announcement banner component above the header.
2. Rewrite hero section: new headline, subheadline, trust indicators (3 checkmarks), two CTA buttons.
3. Add VideoModal component for "Start Free Lesson" button (YouTube embed in Dialog).
4. Add FreeLessonSection immediately after hero.
5. Add TraderProblemSection after FreeLessonSection.
6. Move AboutKirti section to appear after TraderProblemSection; update bio text.
7. Consolidate Featured On / Also Worked With into one unified "Featured On" section. Generate placeholder logos for Moneycontrol, Alice Blue, Angel One using generate_image tool.
8. Update What You Will Learn bullet points.
9. Update Three Pillars descriptions.
10. Update PAT Framework note.
11. Update Program Structure module titles and unlock message.
12. Add HowItWorksSection after Program Structure.
13. Add AccountBenefitsSection after HowItWorksSection.
14. Update Final CTA content and buttons.
15. Update WhatsApp button: new number, pill shape with label.
16. Replace all "MasterTraderX Training" text with "FREE MasterTraderX Trading Program".
17. Update header CTA button text.

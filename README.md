# MediCore AI – Siri-Style Intelligent Healthcare Voice Assistant Platform

**MediCore AI** is a production-grade, full-stack, AI-powered healthcare platform featuring an advanced **Siri-style conversational voice assistant** designed for hospitals, clinical practitioners, and patients. It seamlessly combines clinical triage intelligence, hands-free voice conversations, physiological vitals monitoring, tele-health video consultations, OCR medical document parsing, and an evidence-based medical knowledge base.

---

## 🎙️ Siri-Style Healthcare Voice Assistant

The upgraded MediCore AI Voice Assistant brings natural, human-like voice conversations to healthcare management:

### 1. Visual Voice Interface
- **Dynamic Siri-Style Voice Orb:** Large pulsating circular visualization reactive to real-time audio volume levels using the Web Audio API (`AudioContext` & `AnalyserNode`).
- **5 Assistant States:**
  1. `Idle` (Ready to listen)
  2. `Listening` (Active microphone, live audio wave animation, real-time speech transcription)
  3. `Processing` (Clinical reasoning engine evaluating symptoms and differential)
  4. `Speaking` (Natural speech synthesis output with pause/resume controls)
  5. `Error` (Graceful handling of permission denials, microphone timeouts, and network drops)
- **Continuous Conversation Mode (Hands-Free):** Seamless conversational turn-taking. Once the assistant finishes speaking, it automatically reactivates the microphone to listen for the patient's reply.
- **Dual View Modes:** 1-click toggle between **Voice Orb Mode** (Siri experience) and **Full Stream Mode** (message transcript, citations, and interactive cards).

### 2. Intelligent Multi-Turn Clinical Triage Workflow
Instead of dumping textbook articles, MediCore AI converses like a seasoned clinician:
- **Step 1:** Empathy and acknowledging the patient's concern (*"I'm sorry you're experiencing a headache. I'm here to help."*).
- **Step 2:** Onset Inquiry (*"When did this start? Has it been a few hours or several days?"*).
- **Step 3:** Severity & Characteristics (*"Is it mild, moderate, or severe? Is it throbbing or on one side?"*).
- **Step 4:** Associated Symptoms & Red Flags (*"Do you also have a fever, stiff neck, nausea, or visual changes?"*).
- **Step 5-6:** Contextual Clinical Guidance (*Explains possible causes such as tension headache or migraine without claiming a definitive diagnosis*).
- **Step 7-8:** Actionable Next Steps (*Offers evidence-based self-care and connects directly to specialists or nearby facilities*).

### 3. High-Priority Emergency Detection (Safety Layer)
- Instant heuristic detection for acute emergencies: **Chest pain / heart attack**, **BE-FAST stroke signs**, **Severe dyspnea / cyanosis**, **Anaphylaxis**, **Unconsciousness**, and **Severe bleeding**.
- Halts ordinary conversation immediately.
- Displays prominent **RED Emergency Alert Banner**.
- 1-click direct emergency phone triggers: **112 (National Unified Emergency)** and **108 (National Ambulance)**.
- First-aid instructions and 1-click navigation to the nearest 24/7 emergency trauma centers.

### 4. Interactive Embedded Action Cards in Voice Stream
- **Doctor Consultation Cards:** Patient asks *"Find a cardiologist"* → AI returns verified specialists with qualifications, fees, ratings, and a 1-click *"Book Video Slot"* button.
- **Nearby Facility Cards:** Patient asks *"Find hospitals near me"* or *"24/7 pharmacy"* → AI returns verified facilities with distance, 24/7 badges, and 1-click *"Call"* and *"Directions"* links.
- **Vitals Snapshot Cards:** Patient asks *"Check my vitals"* → AI inspects patient readings (BP, HR, Glucose, SpO2, Temp, BMI) and provides tailored clinical feedback.
- **OCR Lab Report Analysis:** Drag-and-drop or upload blood reports (PDF/images) to get instant biomarker breakdowns and conversational follow-up explanations.

### 5. Multilingual Capabilities
- **English**
- **Kannada (ಕನ್ನಡ)**: Converses naturally with localized clinical empathy (*"ನಮಸ್ಕಾರ! ನಿಮ್ಮ ಲಕ್ಷಣಗಳನ್ನು ಅರ್ಥಮಾಡಿಕೊಂಡಿದ್ದೇನೆ..."*)
- **Hindi (हिन्दी)**: Converses naturally with localized clinical guidance (*"नमस्ते! आपके लक्षणों के अनुसार..."*)
- Extensible to **Tamil (தமிழ்)**, **Telugu (తెలుగు)**, and **Spanish (Español)**.

---

## 🏛️ Complete Platform Modules

1. **Dashboard:** Physiological vitals summary, 7-day trend area charts (Recharts), upcoming visits, today's pills with adherence %, and nearby ER preview.
2. **AI Health Assistant:** Siri-style voice assistant, continuous mode, RAG medical search, and in-chat booking.
3. **Doctor Consultation:** 14 specialties, verified doctor profiles, slot selection wizard, and an embedded Telehealth Video Consultation Room with patient webcam preview and digital Rx generation.
4. **Health Parameters:** 12 monitored biomarkers, interactive physiological reference zones (Green, Amber, Red), manual log modal, and downloadable text reports.
5. **Nearby Medical Facilities:** Interactive OpenStreetMap/canvas with custom facility pins, distance in km, operating hours, and driving directions.
6. **Medical Knowledge Center:** 20 clinical categories with comprehensive disease monographs, diagnostic methods, prevention, and WHO/CDC citations.
7. **Medical Report Analyzer (OCR):** Upload CBC, lipid panels, thyroid tests, or glucose reports for instant biomarker parsing, status indicators, and side-by-side comparison.
8. **Medicine Information:** Pharmaceutical drug monographs with generic/brand names, indications, side effects, precautions, and an interactive Drug-Drug Interaction Checker.
9. **Appointments Manager:** Manage confirmed, completed, and cancelled visits with refund tracking.
10. **Personal Health Records (PHR) Locker:** Encrypted digital storage for prescriptions, lab results, discharge summaries, and insurance policies.
11. **Notifications & Reminders:** Daily pill adherence tracking with 1-click *"Mark Taken"* checkbox, appointment reminders, and health alerts.
12. **Patient Profile & Security Governance:** Demographics, allergies, chronic conditions, emergency contact, AES-256 encryption status, real-time audit logs, and demo profile switcher (John Doe / Priya Sharma).

---

## 🛠️ Technology Stack

- **Frontend:** React 18, TypeScript, Vite, Tailwind CSS, Lucide Icons, Recharts
- **Audio & Voice:** Web Speech API (`SpeechRecognition` & `SpeechSynthesis`), Web Audio API (`AudioContext`, `AnalyserNode`)
- **Backend:** Python 3.14, FastAPI, WebSocket streaming (`/api/ws/voice`), Pydantic, SQLAlchemy, SQLite
- **Security:** AES-256 Storage, TLS 1.3 Transport, Role-based Access, Audit Trail

---

## 🚀 Running the Application

### 1. Start the React Frontend:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 2. Verify Production Build:
```bash
npm run build
```

### 3. Start the FastAPI Python Backend:
```bash
cd backend
pip install -r requirements.txt
python main.py
```
Interactive API docs available at [http://localhost:8000/docs](http://localhost:8000/docs).
WebSocket voice streaming available at `ws://localhost:8000/api/ws/voice`.

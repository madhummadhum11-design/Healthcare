import React, { useState, useRef, useEffect } from 'react';
import {
  Send,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Pause,
  Play,
  RotateCcw,
  Sparkles,
  Phone,
  ShieldAlert,
  FileText,
  CheckCircle,
  HelpCircle,
  Stethoscope,
  MapPin,
  Clock,
  Star,
  ExternalLink,
  ChevronRight,
  Activity,
  User,
  Radio,
  Layers,
  Sparkle
} from 'lucide-react';
import { ChatMessage, AssistantVoiceState, ClinicalTriageState, Doctor, Facility } from '../../types';
import { aiChatService } from '../../services/aiChatService';
import { voiceService } from '../../services/voiceService';
import { reportParserService } from '../../services/reportParserService';
import { useHealthcare } from '../../context/HealthcareContext';

interface AIChatbotProps {
  currentLanguage: string;
  onLanguageChange: (lang: string) => void;
  onNavigateToSection?: (section: string) => void;
}

export const AIChatbot: React.FC<AIChatbotProps> = ({
  currentLanguage,
  onLanguageChange,
  onNavigateToSection
}) => {
  const { setEmergencyModalOpen, bookAppointment, startVideoConsultation } = useHealthcare();

  // Assistant Voice State: 'idle' | 'listening' | 'processing' | 'speaking' | 'error'
  const [assistantState, setAssistantState] = useState<AssistantVoiceState>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Audio level for Siri-style Waveform (0.0 to 1.0)
  const [audioLevel, setAudioLevel] = useState<number>(0);

  // Continuous Conversation Mode (Hands-free conversational turn-taking)
  const [continuousMode, setContinuousMode] = useState<boolean>(false);

  // Live real-time speech transcription
  const [liveTranscript, setLiveTranscript] = useState<string>('');

  // Mode View: 'voice-orb' vs 'chat-stream'
  const [viewMode, setViewMode] = useState<'voice-orb' | 'chat-stream'>('voice-orb');

  // Multi-turn clinical triage state
  const [triageState, setTriageState] = useState<ClinicalTriageState>({ step: 'none' });

  // Conversation history
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-1',
      sender: 'assistant',
      text: `Hello! I am **MediCore AI**, your Siri-style voice healthcare assistant.

I'm ready to listen. Tap the microphone orb or speak to:
• Describe your symptoms and get intelligent clinical guidance
• Ask questions about diseases, medications, and side effects
• Understand uploaded blood tests and medical reports
• Find accredited doctors or nearby 24/7 hospitals

*⚠️ Medical Notice: I provide educational health information and clinical triage guidance, not a definitive diagnosis. In a critical medical emergency, please call 112 or 108 immediately.*`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      suggestedActions: [
        'I have a headache',
        'Check my symptoms',
        'Find a doctor',
        'Nearby hospitals',
        'Explain Metformin',
        'ನನಗೆ ತಲೆನೋವು ಇದೆ (Kannada)'
      ]
    }
  ]);

  const [input, setInput] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, assistantState]);

  // Clean up voice upon unmount
  useEffect(() => {
    return () => {
      voiceService.stopListening();
      voiceService.stopSpeaking();
    };
  }, []);

  // Map language to BCP-47 tag
  const getLanguageCode = (lang: string) => {
    if (lang.includes('Kannada')) return 'kn-IN';
    if (lang.includes('Hindi')) return 'hi-IN';
    if (lang.includes('Tamil')) return 'ta-IN';
    if (lang.includes('Telugu')) return 'te-IN';
    if (lang.includes('Spanish')) return 'es-ES';
    return 'en-US';
  };

  // Start Voice Listening (Speech-to-Text)
  const handleStartListening = async () => {
    voiceService.stopSpeaking();
    setErrorMessage(null);
    setLiveTranscript('');
    setAssistantState('listening');

    const langCode = getLanguageCode(currentLanguage);

    const success = await voiceService.startListening(langCode, {
      onResult: (transcript, isFinal) => {
        setLiveTranscript(transcript);
        setInput(transcript);
        if (isFinal && transcript.trim().length > 1) {
          voiceService.stopListening();
          handleSendMessage(transcript);
        }
      },
      onError: (err) => {
        setAssistantState('error');
        setErrorMessage(err);
      },
      onEnd: () => {
        // If not transitioned to processing, return to idle
        setAssistantState((prev) => (prev === 'listening' ? 'idle' : prev));
        setAudioLevel(0);
      },
      onAudioLevel: (level) => {
        setAudioLevel(level);
      }
    });

    if (!success) {
      setAssistantState('error');
    }
  };

  // Stop Listening
  const handleStopListening = () => {
    voiceService.stopListening();
    setAssistantState('idle');
    setAudioLevel(0);
  };

  // Pause & Resume Speech Output
  const handlePauseResumeSpeaking = () => {
    if (voiceService.isCurrentlyPaused()) {
      voiceService.resumeSpeaking();
      setAssistantState('speaking');
    } else if (voiceService.isCurrentlySpeaking()) {
      voiceService.pauseSpeaking();
      setAssistantState('idle');
    }
  };

  // Process & Send Message
  const handleSendMessage = async (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim() && !selectedFile) return;

    voiceService.stopListening();
    setAssistantState('processing');
    setLiveTranscript('');

    const userMsgId = `msg-${Date.now()}`;
    const userMsg: ChatMessage = {
      id: userMsgId,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      attachment: selectedFile
        ? {
            name: selectedFile.name,
            type: selectedFile.type.includes('pdf') ? 'pdf' : 'image',
            url: URL.createObjectURL(selectedFile)
          }
        : undefined
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    const uploadedDoc = selectedFile;
    setSelectedFile(null);

    // If an image or PDF was attached, analyze via OCR service
    if (uploadedDoc) {
      try {
        const parsedResult = await reportParserService.parseUploadedFile(uploadedDoc);
        const aiSummary = parsedResult.report.aiSummary;
        const outOfRange = parsedResult.report.biomarkers.filter(
          (b) => b.status === 'high' || b.status === 'low' || b.status === 'critical'
        );

        const replyMsg: ChatMessage = {
          id: `msg-${Date.now() + 1}`,
          sender: 'assistant',
          text: `### 📄 Medical Report Analysis: **${parsedResult.report.title}**

I have parsed your report (*${uploadedDoc.name}*):

**Clinical Summary:**
${aiSummary}

**Biomarkers Requiring Clinical Attention:**
${
  outOfRange.length > 0
    ? outOfRange
        .map(
          (b) =>
            `- **${b.name}:** ${b.value} ${b.unit} (*Status: ${b.status.toUpperCase()}*, Ref: ${b.referenceRange})\n  *Significance:* ${b.explanation}`
        )
        .join('\n')
    : '- All identified biomarkers fall within normal physiological reference ranges.'
}

**Physician Discussion Points:**
${parsedResult.report.doctorDiscussionPoints.map((d) => `- ${d}`).join('\n')}`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          cardType: 'report',
          cardData: parsedResult.report,
          suggestedActions: [
            'What dietary adjustments help these results?',
            'Find a cardiologist',
            'Explain total cholesterol vs LDL'
          ]
        };

        setMessages((prev) => [...prev, replyMsg]);
        speakAssistantResponse(replyMsg.text);
        return;
      } catch (err) {
        console.error(err);
      }
    }

    // Call Intelligent Conversational Clinical Reasoning Engine
    try {
      const response = await aiChatService.generateResponse(
        query,
        messages,
        currentLanguage,
        triageState
      );

      if (response.updatedTriageState) {
        setTriageState(response.updatedTriageState);
      }

      const aiMsg: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        sender: 'assistant',
        text: response.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isEmergency: response.isEmergency,
        emergencyType: response.emergencyType,
        suggestedActions: response.suggestedActions || response.suggestedQuestions,
        medicalReferences: response.medicalReferences,
        cardType: response.cardType,
        cardData: response.cardData
      };

      setMessages((prev) => [...prev, aiMsg]);
      speakAssistantResponse(aiMsg.text);
    } catch (err) {
      setAssistantState('error');
      setErrorMessage('Failed to generate clinical guidance. Please try again.');
    }
  };

  // Speak assistant response with continuous mode callback
  const speakAssistantResponse = (text: string) => {
    setAssistantState('speaking');
    const langCode = getLanguageCode(currentLanguage);

    voiceService.speak(
      text,
      langCode,
      () => {
        setAssistantState('speaking');
      },
      () => {
        setAssistantState('idle');
        // If continuous conversation mode is active, automatically listen for the patient's next turn!
        if (continuousMode) {
          setTimeout(() => {
            handleStartListening();
          }, 800);
        }
      }
    );
  };

  const handleClearHistory = () => {
    voiceService.stopSpeaking();
    voiceService.stopListening();
    setAssistantState('idle');
    setTriageState({ step: 'none' });
    setMessages([
      {
        id: `msg-${Date.now()}`,
        sender: 'assistant',
        text: `Conversation memory reset. I'm listening. How can I help you today?`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestedActions: [
          'I have a headache',
          'Find a doctor near me',
          'Check my vitals',
          'Explain a medicine'
        ]
      }
    ]);
  };

  // Shortcut triggers
  const handleShortcutClick = (actionText: string) => {
    handleSendMessage(actionText);
  };

  const languages = ['English', 'Kannada (ಕನ್ನಡ)', 'Hindi (हिन्दी)', 'Tamil (தமிழ்)', 'Telugu (తెలుగు)', 'Spanish (Español)'];

  // Quick Action Shortcuts (Section 8)
  const quickActionShortcuts = [
    { label: 'Check my symptoms', query: 'I want to check my symptoms' },
    { label: 'I have a headache', query: 'I have a headache' },
    { label: 'Find a doctor', query: 'Find a doctor' },
    { label: 'Nearby hospital', query: 'Find hospitals near me' },
    { label: 'Check my vitals', query: 'Check my vitals' },
    { label: 'Explain a medicine', query: 'Explain Metformin' },
    { label: 'Emergency (112)', query: 'Emergency medical assistance 112' }
  ];

  return (
    <div className="flex flex-col h-[calc(100vh-5.5rem)] bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden animate-fadeIn">
      {/* Siri-Style Assistant Header Bar */}
      <div className="px-6 py-3.5 bg-gradient-to-r from-[#12304A] via-[#163a59] to-[#0D9488] text-white flex items-center justify-between border-b border-slate-700/60">
        <div className="flex items-center space-x-3.5">
          <div className="relative">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-500 to-teal-400 flex items-center justify-center text-white shadow-lg shadow-teal-500/20">
              <Sparkles className="w-5 h-5" />
            </div>
            <span
              className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-[#12304A] ${
                assistantState === 'listening'
                  ? 'bg-red-500 animate-ping'
                  : assistantState === 'speaking'
                  ? 'bg-teal-400 animate-pulse'
                  : 'bg-emerald-400'
              }`}
            />
          </div>

          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-sm font-extrabold tracking-tight">MediCore Voice AI</h2>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/10 text-teal-200 border border-white/20">
                Siri Healthcare Engine
              </span>
            </div>
            <p className="text-[11px] text-slate-200 flex items-center space-x-2">
              <span>Language: <strong className="text-teal-300">{currentLanguage.split(' ')[0]}</strong></span>
              <span>•</span>
              <span className="capitalize">
                {assistantState === 'listening' && '🎙️ Listening to you...'}
                {assistantState === 'speaking' && '🔊 Speaking response...'}
                {assistantState === 'processing' && '🧠 Analyzing symptoms...'}
                {assistantState === 'idle' && 'Ready to assist'}
                {assistantState === 'error' && '⚠️ Attention required'}
              </span>
            </p>
          </div>
        </div>

        {/* Top Controls: Mode Switcher, Continuous Mode & Language */}
        <div className="flex items-center space-x-2.5">
          {/* Continuous Conversation Mode Switch */}
          <button
            onClick={() => setContinuousMode(!continuousMode)}
            className={`hidden sm:flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition ${
              continuousMode
                ? 'bg-teal-500/30 border-teal-400/50 text-teal-100 shadow-sm'
                : 'bg-slate-800/60 border-slate-700 text-slate-300 hover:text-white'
            }`}
            title="Hands-free auto turn-taking"
          >
            <Radio className={`w-3.5 h-3.5 ${continuousMode ? 'text-teal-300 animate-pulse' : 'text-slate-400'}`} />
            <span>Continuous: {continuousMode ? 'ON' : 'OFF'}</span>
          </button>

          {/* View Mode Toggle */}
          <div className="p-0.5 bg-slate-800/80 rounded-xl flex items-center border border-slate-700">
            <button
              onClick={() => setViewMode('voice-orb')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition ${
                viewMode === 'voice-orb'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              Voice Orb
            </button>
            <button
              onClick={() => setViewMode('chat-stream')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition ${
                viewMode === 'chat-stream'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              Full Stream
            </button>
          </div>

          {/* Language Selector */}
          <select
            value={currentLanguage}
            onChange={(e) => onLanguageChange(e.target.value)}
            className="text-xs bg-slate-800/90 text-white font-semibold px-2.5 py-1.5 rounded-xl border border-slate-700 focus:outline-none"
          >
            {languages.map((l) => (
              <option key={l} value={l} className="bg-slate-900 text-white">
                {l}
              </option>
            ))}
          </select>

          <button
            onClick={handleClearHistory}
            title="Reset Conversation"
            className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Body: Voice Orb Mode OR Stream Mode */}
      <div className="flex-1 overflow-y-auto flex flex-col bg-[#F8FAFC] custom-scrollbar">
        {viewMode === 'voice-orb' ? (
          /* ========================================================= */
          /* SIRI-STYLE VOICE ORB INTERACTION INTERFACE                */
          /* ========================================================= */
          <div className="flex-1 flex flex-col items-center justify-between p-6 sm:p-8 space-y-6">
            {/* Top Status & Context Pill */}
            <div className="text-center space-y-1">
              <span className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 text-xs font-bold text-slate-700 shadow-2xs">
                {assistantState === 'listening' ? (
                  <>
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                    <span className="text-red-600">Listening to your voice... Speak now</span>
                  </>
                ) : assistantState === 'speaking' ? (
                  <>
                    <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse" />
                    <span className="text-teal-700">MediCore is speaking</span>
                  </>
                ) : assistantState === 'processing' ? (
                  <>
                    <span className="w-2 h-2 rounded-full bg-blue-500 animate-bounce" />
                    <span className="text-blue-700">Processing medical context...</span>
                  </>
                ) : (
                  <>
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span>Tap microphone to start voice conversation</span>
                  </>
                )}
              </span>

              {errorMessage && (
                <div className="text-xs text-rose-600 font-semibold mt-1">
                  {errorMessage}
                </div>
              )}
            </div>

            {/* Central Animated Siri Voice Orb Visualizer */}
            <div className="relative flex items-center justify-center my-auto">
              {/* Pulsating Outer Ripple Rings */}
              <div
                style={{
                  transform: `scale(${1 + audioLevel * 0.45})`,
                  opacity: assistantState === 'listening' || assistantState === 'speaking' ? 0.35 : 0.1
                }}
                className="absolute w-72 h-72 rounded-full bg-gradient-to-tr from-blue-500 to-teal-400 blur-2xl transition-transform duration-100 ease-out pointer-events-none"
              />

              <div
                style={{
                  transform: `scale(${1 + audioLevel * 0.3})`,
                  opacity: assistantState === 'listening' || assistantState === 'speaking' ? 0.6 : 0.2
                }}
                className="absolute w-56 h-56 rounded-full bg-gradient-to-tr from-teal-400 to-indigo-600 blur-xl transition-transform duration-100 ease-out pointer-events-none"
              />

              {/* Central Glowing Mic Orb Button */}
              <button
                onClick={
                  assistantState === 'listening'
                    ? handleStopListening
                    : assistantState === 'speaking'
                    ? handlePauseResumeSpeaking
                    : handleStartListening
                }
                className={`relative z-10 w-36 h-36 sm:w-44 sm:h-44 rounded-full flex flex-col items-center justify-center text-white shadow-2xl transition transform active:scale-95 cursor-pointer ${
                  assistantState === 'listening'
                    ? 'bg-gradient-to-tr from-rose-600 to-red-500 ring-8 ring-red-400/30'
                    : assistantState === 'speaking'
                    ? 'bg-gradient-to-tr from-teal-500 to-blue-600 ring-8 ring-teal-400/30'
                    : 'bg-gradient-to-tr from-[#12304A] via-[#1E4E79] to-[#0D9488] ring-8 ring-blue-500/20 hover:scale-105'
                }`}
              >
                {/* Visualizer Waveform Bars Inside Orb */}
                {(assistantState === 'listening' || assistantState === 'speaking') && (
                  <div className="flex items-center space-x-1.5 mb-2">
                    <span
                      style={{ height: `${12 + audioLevel * 28}px` }}
                      className="w-1.5 bg-white rounded-full transition-all duration-75"
                    />
                    <span
                      style={{ height: `${20 + audioLevel * 45}px` }}
                      className="w-1.5 bg-white rounded-full transition-all duration-75"
                    />
                    <span
                      style={{ height: `${28 + audioLevel * 50}px` }}
                      className="w-1.5 bg-white rounded-full transition-all duration-75"
                    />
                    <span
                      style={{ height: `${20 + audioLevel * 45}px` }}
                      className="w-1.5 bg-white rounded-full transition-all duration-75"
                    />
                    <span
                      style={{ height: `${12 + audioLevel * 28}px` }}
                      className="w-1.5 bg-white rounded-full transition-all duration-75"
                    />
                  </div>
                )}

                {assistantState === 'listening' ? (
                  <MicOff className="w-8 h-8" />
                ) : assistantState === 'speaking' ? (
                  <Pause className="w-8 h-8" />
                ) : (
                  <Mic className="w-10 h-10 mb-1" />
                )}

                <span className="text-[11px] font-extrabold uppercase tracking-wider mt-1">
                  {assistantState === 'listening'
                    ? 'Tap to Stop'
                    : assistantState === 'speaking'
                    ? 'Pause Voice'
                    : 'Tap to Speak'}
                </span>
              </button>
            </div>

            {/* Live Real-Time Speech Transcription Banner */}
            <div className="w-full max-w-xl text-center space-y-3">
              {liveTranscript ? (
                <div className="p-4 bg-white rounded-2xl border-2 border-blue-400 shadow-md text-sm font-semibold text-slate-800 animate-fadeIn">
                  <span className="text-xs text-blue-600 block uppercase font-bold tracking-wider mb-1">
                    Live Transcription
                  </span>
                  "{liveTranscript}"
                </div>
              ) : (
                /* Latest Assistant Conversational Excerpt */
                messages.length > 0 && (
                  <div className="p-4 bg-white/80 backdrop-blur-md rounded-2xl border border-slate-200 text-xs sm:text-sm text-slate-700 shadow-2xs text-left max-h-40 overflow-y-auto custom-scrollbar">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-teal-700 mb-1 flex items-center justify-between">
                      <span>Latest Response from MediCore</span>
                      <button
                        onClick={() => setViewMode('chat-stream')}
                        className="text-blue-600 hover:underline capitalize"
                      >
                        Open full history →
                      </button>
                    </div>
                    <div className="line-clamp-3 italic">
                      "{messages[messages.length - 1].text.slice(0, 180)}..."
                    </div>
                  </div>
                )
              )}

              {/* Quick Action Chips (Section 8) */}
              <div className="pt-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                  Common Patient Shortcuts
                </span>
                <div className="flex flex-wrap items-center justify-center gap-1.5">
                  {quickActionShortcuts.map((sc, sIdx) => (
                    <button
                      key={sIdx}
                      onClick={() => handleShortcutClick(sc.query)}
                      className="px-3 py-1.5 bg-white hover:bg-blue-50 border border-slate-200 hover:border-blue-300 text-slate-700 hover:text-blue-700 rounded-full text-xs font-semibold transition shadow-2xs"
                    >
                      {sc.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* ========================================================= */
          /* FULL CONVERSATION STREAM MODE                            */
          /* ========================================================= */
          <div className="flex-1 p-4 sm:p-6 space-y-5">
            {messages.map((msg) => {
              const isUser = msg.sender === 'user';
              const isEmergency = msg.isEmergency;

              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} max-w-3xl ${
                    isUser ? 'ml-auto' : 'mr-auto'
                  }`}
                >
                  <div className="flex items-start space-x-2.5">
                    {!isUser && (
                      <div
                        className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                          isEmergency ? 'bg-red-600 text-white animate-pulse' : 'bg-blue-600 text-white shadow-xs'
                        }`}
                      >
                        {isEmergency ? <ShieldAlert className="w-4 h-4" /> : <Sparkles className="w-4 h-4" />}
                      </div>
                    )}

                    <div className="space-y-2 max-w-2xl">
                      {/* Message Bubble */}
                      <div
                        className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-xs ${
                          isUser
                            ? 'bg-blue-600 text-white rounded-tr-none'
                            : isEmergency
                            ? 'bg-red-50 border-2 border-red-500 text-slate-900 rounded-tl-none'
                            : 'bg-white border border-slate-200 text-slate-800 rounded-tl-none'
                        }`}
                      >
                        {/* Attachment preview if user uploaded */}
                        {msg.attachment && (
                          <div className="mb-2.5 p-2 rounded-lg bg-white/20 border border-white/30 flex items-center space-x-2 text-xs">
                            <FileText className="w-4 h-4" />
                            <span className="truncate font-semibold">{msg.attachment.name}</span>
                          </div>
                        )}

                        {/* Markdown-style content renderer */}
                        <div className="space-y-2 whitespace-pre-wrap">
                          {msg.text.split('\n').map((line, idx) => {
                            if (line.startsWith('### ')) {
                              return (
                                <h3 key={idx} className="font-extrabold text-sm sm:text-base text-slate-900 mt-1 mb-1">
                                  {line.replace('### ', '')}
                                </h3>
                              );
                            }
                            if (line.startsWith('#### ')) {
                              return (
                                <h4 key={idx} className="font-bold text-xs sm:text-sm text-blue-900 mt-2 mb-0.5">
                                  {line.replace('#### ', '')}
                                </h4>
                              );
                            }
                            if (line.startsWith('🚨 CRITICAL EMERGENCY')) {
                              return (
                                <div key={idx} className="p-3 bg-red-600 text-white rounded-xl font-bold text-xs sm:text-sm tracking-wide">
                                  {line}
                                </div>
                              );
                            }
                            return <p key={idx}>{line}</p>;
                          })}
                        </div>

                        {/* Interactive Doctor Booking Cards in chat */}
                        {msg.cardType === 'doctors' && msg.cardData && Array.isArray(msg.cardData) && (
                          <div className="mt-4 pt-3 border-t border-slate-100 space-y-2.5">
                            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
                              Available Specialists
                            </span>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                              {msg.cardData.map((doc: Doctor) => (
                                <div
                                  key={doc.id}
                                  className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex flex-col justify-between"
                                >
                                  <div className="flex items-start space-x-2.5">
                                    <img
                                      src={doc.avatar}
                                      alt={doc.name}
                                      className="w-10 h-10 rounded-xl object-cover ring-2 ring-blue-100 shrink-0"
                                    />
                                    <div>
                                      <h5 className="font-bold text-xs text-slate-900">{doc.name}</h5>
                                      <div className="text-[11px] font-semibold text-blue-600">{doc.specialty}</div>
                                      <div className="text-[10px] text-slate-500 mt-0.5">
                                        ⭐ {doc.rating} • ₹{doc.consultationFee}
                                      </div>
                                    </div>
                                  </div>

                                  <button
                                    onClick={() => {
                                      bookAppointment({
                                        doctorId: doc.id,
                                        doctorName: doc.name,
                                        doctorSpecialty: doc.specialty,
                                        doctorAvatar: doc.avatar,
                                        hospital: doc.hospitalAffiliation,
                                        patientName: 'John Doe',
                                        date: '2026-11-26',
                                        timeSlot: doc.slots[0] || '10:00 AM',
                                        type: 'video',
                                        fee: doc.consultationFee,
                                        symptoms: 'Consultation arranged via MediCore Voice AI'
                                      });
                                      alert(`Appointment booked with ${doc.name} for Nov 26 at ${doc.slots[0] || '10:00 AM'}!`);
                                    }}
                                    className="mt-2 w-full py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-lg transition"
                                  >
                                    Book Video Slot
                                  </button>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Interactive Nearby Facilities Cards in chat */}
                        {msg.cardType === 'facilities' && msg.cardData && Array.isArray(msg.cardData) && (
                          <div className="mt-4 pt-3 border-t border-slate-100 space-y-2.5">
                            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
                              Verified Healthcare Facilities
                            </span>
                            <div className="space-y-2">
                              {msg.cardData.map((fac: Facility) => (
                                <div
                                  key={fac.id}
                                  className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between"
                                >
                                  <div>
                                    <div className="flex items-center space-x-2">
                                      <span className="font-bold text-xs text-slate-900">{fac.name}</span>
                                      {fac.emergencyServices && (
                                        <span className="text-[9px] bg-red-100 text-red-700 font-bold px-1.5 py-0.2 rounded">
                                          24/7 ER
                                        </span>
                                      )}
                                    </div>
                                    <p className="text-[11px] text-slate-500 mt-0.5">{fac.address}</p>
                                    <p className="text-[10px] text-teal-700 font-semibold mt-0.5">
                                      📍 {fac.distanceKm} km away • {fac.openHours}
                                    </p>
                                  </div>

                                  <a
                                    href={`tel:${fac.phone}`}
                                    className="px-3 py-1.5 bg-slate-900 hover:bg-black text-white text-xs font-bold rounded-lg shrink-0 ml-2"
                                  >
                                    Call
                                  </a>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* If Emergency detected: Display Instant SOS Action Panel */}
                        {isEmergency && (
                          <div className="mt-4 pt-3 border-t border-red-200 space-y-3">
                            <div className="flex flex-wrap gap-2">
                              <a
                                href="tel:112"
                                className="flex items-center space-x-1.5 px-4 py-2 bg-slate-900 hover:bg-black text-white font-bold rounded-xl shadow-md text-xs transition"
                              >
                                <Phone className="w-4 h-4" />
                                <span>CALL 112 UNIFIED EMERGENCY</span>
                              </a>

                              <a
                                href="tel:108"
                                className="flex items-center space-x-1.5 px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl shadow-md text-xs transition"
                              >
                                <Phone className="w-4 h-4" />
                                <span>CALL 108 AMBULANCE</span>
                              </a>

                              <button
                                onClick={() => setEmergencyModalOpen(true)}
                                className="flex items-center space-x-1.5 px-3 py-2 bg-white border border-red-300 text-red-700 hover:bg-red-50 font-bold rounded-xl text-xs transition"
                              >
                                <ShieldAlert className="w-4 h-4" />
                                <span>Open Emergency Hub</span>
                              </button>
                            </div>
                          </div>
                        )}

                        {/* References citation footer */}
                        {msg.medicalReferences && msg.medicalReferences.length > 0 && (
                          <div className="mt-3 pt-2.5 border-t border-slate-100 text-[11px] text-slate-500">
                            <span className="font-semibold text-slate-700">Verified Clinical References: </span>
                            {msg.medicalReferences.join(' • ')}
                          </div>
                        )}
                      </div>

                      {/* Speech Controls & Timestamp under assistant message */}
                      {!isUser && (
                        <div className="flex items-center space-x-3 px-1 text-[11px] text-slate-400">
                          <span>{msg.timestamp}</span>
                          <button
                            onClick={() => speakAssistantResponse(msg.text)}
                            className="flex items-center space-x-1 hover:text-blue-600 transition"
                          >
                            <Volume2 className="w-3.5 h-3.5" />
                            <span>Read Aloud</span>
                          </button>
                        </div>
                      )}

                      {/* Suggested Quick Prompt Chips */}
                      {msg.suggestedActions && msg.suggestedActions.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {msg.suggestedActions.map((action, aIdx) => (
                            <button
                              key={aIdx}
                              onClick={() => handleSendMessage(action)}
                              className="px-3 py-1.5 rounded-full bg-white hover:bg-blue-50 border border-slate-200 hover:border-blue-300 text-slate-700 hover:text-blue-700 text-xs font-medium transition shadow-2xs"
                            >
                              {action}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    {isUser && (
                      <div className="w-8 h-8 rounded-xl bg-slate-800 text-white flex items-center justify-center shrink-0">
                        <User className="w-4 h-4" />
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            {/* Processing Indicator */}
            {assistantState === 'processing' && (
              <div className="flex items-center space-x-2 text-slate-400 text-xs pl-10">
                <div className="flex space-x-1">
                  <span className="w-2 h-2 rounded-full bg-blue-600 animate-bounce" />
                  <span className="w-2 h-2 rounded-full bg-blue-600 animate-bounce [animation-delay:0.2s]" />
                  <span className="w-2 h-2 rounded-full bg-blue-600 animate-bounce [animation-delay:0.4s]" />
                </div>
                <span>MediCore Siri Healthcare Engine reasoning...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Selected File Attachment Tag */}
      {selectedFile && (
        <div className="px-4 py-2 bg-blue-50 border-t border-blue-100 flex items-center justify-between text-xs text-blue-900">
          <div className="flex items-center space-x-2">
            <FileText className="w-4 h-4 text-blue-600" />
            <span className="font-semibold">Attached for analysis:</span>
            <span>{selectedFile.name} ({(selectedFile.size / 1024).toFixed(1)} KB)</span>
          </div>
          <button
            onClick={() => setSelectedFile(null)}
            className="text-slate-500 hover:text-red-600 font-bold"
          >
            ✕ Remove
          </button>
        </div>
      )}

      {/* Bottom Text & Voice Bar */}
      <div className="p-3 sm:p-4 bg-white border-t border-slate-200">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center space-x-2"
        >
          {/* File Upload Button */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                setSelectedFile(e.target.files[0]);
              }
            }}
            accept="image/*,.pdf"
            className="hidden"
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            title="Attach Medical Report (PDF/Image)"
            className="p-2.5 rounded-xl border border-slate-200 text-slate-500 hover:text-blue-600 hover:bg-slate-50 transition shrink-0"
          >
            <FileText className="w-4 h-4" />
          </button>

          {/* Voice Input Button */}
          <button
            type="button"
            onClick={
              assistantState === 'listening'
                ? handleStopListening
                : handleStartListening
            }
            title={assistantState === 'listening' ? 'Stop Listening' : 'Speak into Microphone'}
            className={`p-2.5 rounded-xl border transition shrink-0 ${
              assistantState === 'listening'
                ? 'bg-red-500 border-red-500 text-white animate-pulse'
                : 'border-slate-200 text-slate-500 hover:text-blue-600 hover:bg-slate-50'
            }`}
          >
            {assistantState === 'listening' ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
          </button>

          {/* Text Input Field */}
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={
              assistantState === 'listening'
                ? 'Listening to your speech...'
                : `Type or speak in ${currentLanguage}... (e.g. "I have a headache")`
            }
            className="flex-1 text-xs sm:text-sm px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition"
          />

          {/* Send Button */}
          <button
            type="submit"
            disabled={!input.trim() && !selectedFile}
            className="p-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold text-xs shadow-md shadow-blue-500/20 transition flex items-center space-x-1.5 shrink-0"
          >
            <span>Send</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>

        <p className="text-[10px] text-slate-400 text-center mt-2">
          MediCore Siri-Style Assistant v3.0 • Voice Activity Detection & Context Memory Active • Dial 112 for Emergencies
        </p>
      </div>
    </div>
  );
};

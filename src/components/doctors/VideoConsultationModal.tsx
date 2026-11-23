import React, { useState, useEffect, useRef } from 'react';
import {
  Video,
  VideoOff,
  Mic,
  MicOff,
  PhoneOff,
  Share2,
  MessageSquare,
  FileText,
  User,
  Shield,
  Send,
  X,
  Clock,
  Sparkles
} from 'lucide-react';
import { Appointment } from '../../types';
import { useHealthcare } from '../../context/HealthcareContext';

interface VideoConsultationModalProps {
  appointment: Appointment | null;
  onClose: () => void;
}

export const VideoConsultationModal: React.FC<VideoConsultationModalProps> = ({
  appointment,
  onClose
}) => {
  const { endVideoConsultation } = useHealthcare();

  const [micEnabled, setMicEnabled] = useState(true);
  const [videoEnabled, setVideoEnabled] = useState(true);
  const [screenSharing, setScreenSharing] = useState(false);
  const [activeTab, setActiveTab] = useState<'chat' | 'notes'>('chat');
  const [callDuration, setCallDuration] = useState(0);

  // In-call chat
  const [chatMessages, setChatMessages] = useState<
    { sender: 'doctor' | 'patient'; text: string; time: string }[]
  >([
    {
      sender: 'doctor',
      text: 'Good day! I have reviewed your morning blood pressure readings (124/82 mmHg) and fasting glucose. How are you feeling today?',
      time: '00:02'
    }
  ]);
  const [chatInput, setChatInput] = useState('');

  // Patient local video stream
  const patientVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!appointment) return;

    const timer = setInterval(() => {
      setCallDuration((prev) => prev + 1);
    }, 1000);

    // Request patient webcam stream
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then((stream) => {
          if (patientVideoRef.current) {
            patientVideoRef.current.srcObject = stream;
          }
        })
        .catch(() => {
          // Camera permission denied or not available; fallback gracefully
        });
    }

    return () => {
      clearInterval(timer);
      if (patientVideoRef.current && patientVideoRef.current.srcObject) {
        const stream = patientVideoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [appointment]);

  if (!appointment) return null;

  const formatCallTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSendInCallMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const newMsg = {
      sender: 'patient' as const,
      text: chatInput,
      time: formatCallTime(callDuration)
    };
    setChatMessages((prev) => [...prev, newMsg]);
    setChatInput('');

    // Doctor automated response
    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        {
          sender: 'doctor',
          text: 'Understood. I will include this in the consultation summary and prescribe a mild adjustment to support your metabolic goals.',
          time: formatCallTime(callDuration + 3)
        }
      ]);
    }, 1500);
  };

  const handleEndCall = () => {
    endVideoConsultation();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-6xl h-[92vh] bg-slate-900 rounded-3xl shadow-2xl border border-slate-700 flex flex-col overflow-hidden text-white">
        {/* Call Top Header */}
        <div className="px-6 py-3.5 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-bold text-sm text-white">
                  Telehealth Session: {appointment.doctorName}
                </span>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-semibold px-2 py-0.5 rounded-full border border-emerald-500/30 flex items-center space-x-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Encrypted Peer-to-Peer</span>
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                {appointment.doctorSpecialty} • {appointment.hospital}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-1.5 px-3 py-1 bg-slate-800 rounded-full text-xs font-mono text-slate-200">
              <Clock className="w-3.5 h-3.5 text-blue-400" />
              <span>{formatCallTime(callDuration)}</span>
            </div>

            <button
              onClick={handleEndCall}
              className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Video Stage & Side Panel */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 overflow-hidden">
          {/* Main Video Feeds (2 Cols) */}
          <div className="lg:col-span-2 relative bg-slate-950 flex items-center justify-center p-4">
            {/* Primary Doctor Feed (Simulated Feed with Realistic Motion & Audio Waveform) */}
            <div className="relative w-full h-full rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 flex items-center justify-center">
              <img
                src={appointment.doctorAvatar}
                alt={appointment.doctorName}
                className="w-full h-full object-cover filter brightness-95"
              />

              {/* Doctor Status Badge */}
              <div className="absolute top-4 left-4 flex items-center space-x-2 bg-slate-950/70 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-700/60">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                <span className="text-xs font-semibold">{appointment.doctorName} (Physician)</span>
              </div>

              {/* Active Audio Waveform Indicator */}
              <div className="absolute top-4 right-4 flex items-center space-x-1 bg-slate-950/70 backdrop-blur-md px-2.5 py-1.5 rounded-xl border border-slate-700/60">
                <span className="w-1 h-3 bg-emerald-400 rounded-full animate-pulse" />
                <span className="w-1 h-5 bg-emerald-400 rounded-full animate-pulse [animation-delay:0.2s]" />
                <span className="w-1 h-4 bg-emerald-400 rounded-full animate-pulse [animation-delay:0.4s]" />
                <span className="text-[10px] text-slate-300 ml-1 font-mono">HD Audio</span>
              </div>

              {/* Patient PiP (Picture in Picture) Video */}
              <div className="absolute bottom-4 right-4 w-40 sm:w-52 h-28 sm:h-36 rounded-xl overflow-hidden bg-slate-800 border-2 border-slate-600 shadow-2xl">
                {videoEnabled ? (
                  <video
                    ref={patientVideoRef}
                    autoPlay
                    playsInline
                    muted
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center bg-slate-900 text-slate-400">
                    <VideoOff className="w-6 h-6 mb-1" />
                    <span className="text-[10px]">Camera Off</span>
                  </div>
                )}
                <div className="absolute bottom-2 left-2 text-[10px] bg-black/60 px-2 py-0.5 rounded backdrop-blur-xs">
                  You (Patient)
                </div>
              </div>
            </div>
          </div>

          {/* Right Side Panel: Live Chat & Digital Prescription */}
          <div className="bg-slate-900 border-l border-slate-800 flex flex-col h-full overflow-hidden">
            {/* Tab Controls */}
            <div className="flex border-b border-slate-800 bg-slate-950/40">
              <button
                onClick={() => setActiveTab('chat')}
                className={`flex-1 py-3 text-xs font-semibold flex items-center justify-center space-x-2 border-b-2 transition ${
                  activeTab === 'chat'
                    ? 'border-blue-500 text-blue-400 bg-slate-800/40'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <MessageSquare className="w-4 h-4" />
                <span>Consultation Chat</span>
              </button>

              <button
                onClick={() => setActiveTab('notes')}
                className={`flex-1 py-3 text-xs font-semibold flex items-center justify-center space-x-2 border-b-2 transition ${
                  activeTab === 'notes'
                    ? 'border-teal-500 text-teal-400 bg-slate-800/40'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <FileText className="w-4 h-4" />
                <span>Doctor Notes & Rx</span>
              </button>
            </div>

            {/* Tab Content */}
            {activeTab === 'chat' ? (
              <div className="flex-1 flex flex-col justify-between overflow-hidden p-4">
                {/* Chat Stream */}
                <div className="flex-1 overflow-y-auto space-y-3 custom-scrollbar pr-1">
                  {chatMessages.map((msg, idx) => (
                    <div
                      key={idx}
                      className={`flex flex-col ${
                        msg.sender === 'patient' ? 'items-end' : 'items-start'
                      }`}
                    >
                      <div className="text-[10px] text-slate-400 mb-0.5">
                        {msg.sender === 'doctor' ? appointment.doctorName : 'You'} • {msg.time}
                      </div>
                      <div
                        className={`p-3 rounded-2xl text-xs max-w-[85%] leading-relaxed ${
                          msg.sender === 'patient'
                            ? 'bg-blue-600 text-white rounded-tr-none'
                            : 'bg-slate-800 text-slate-200 rounded-tl-none border border-slate-700'
                        }`}
                      >
                        {msg.text}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Chat Input */}
                <form onSubmit={handleSendInCallMessage} className="mt-3 flex items-center space-x-2">
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    placeholder="Type message to doctor..."
                    className="flex-1 text-xs bg-slate-800 border border-slate-700 text-white px-3.5 py-2.5 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                  <button
                    type="submit"
                    className="p-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              </div>
            ) : (
              /* Doctor Clinical Notes & Digital Prescription Preview */
              <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar text-xs">
                <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700 space-y-2">
                  <div className="font-bold text-teal-300 text-sm flex items-center space-x-1.5">
                    <Sparkles className="w-4 h-4" />
                    <span>Real-Time Clinical Impression</span>
                  </div>
                  <p className="text-slate-300 leading-relaxed text-[11px]">
                    Patient presents for routine cardiovascular and metabolic follow-up. Blood pressure has improved (124/82 mmHg). Fasting blood sugar indicates prediabetes (104–112 mg/dL). No peripheral edema or shortness of breath.
                  </p>
                </div>

                <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700 space-y-3">
                  <div className="font-bold text-blue-300 text-xs uppercase tracking-wider">
                    Digital Prescription Preview
                  </div>

                  <div className="space-y-2 text-slate-200">
                    <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-700">
                      <div className="font-bold text-white">1. Losartan Potassium 50 mg</div>
                      <div className="text-[11px] text-slate-400">1 tablet once daily in the morning after breakfast for 90 days.</div>
                    </div>

                    <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-700">
                      <div className="font-bold text-white">2. Metformin HCl 500 mg (Extended Release)</div>
                      <div className="text-[11px] text-slate-400">1 tablet twice daily with breakfast and dinner.</div>
                    </div>
                  </div>

                  <div className="text-[11px] text-slate-400 border-t border-slate-700 pt-2">
                    Follow-up: 3 months with repeat fasting lipid panel and HbA1c.
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Call Control Dock */}
        <div className="px-6 py-4 bg-slate-950 border-t border-slate-800 flex items-center justify-center space-x-4">
          <button
            onClick={() => setMicEnabled(!micEnabled)}
            className={`p-3.5 rounded-full transition shadow-md ${
              micEnabled
                ? 'bg-slate-800 hover:bg-slate-700 text-white'
                : 'bg-red-600 hover:bg-red-700 text-white'
            }`}
            title={micEnabled ? 'Mute Mic' : 'Unmute Mic'}
          >
            {micEnabled ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
          </button>

          <button
            onClick={() => setVideoEnabled(!videoEnabled)}
            className={`p-3.5 rounded-full transition shadow-md ${
              videoEnabled
                ? 'bg-slate-800 hover:bg-slate-700 text-white'
                : 'bg-red-600 hover:bg-red-700 text-white'
            }`}
            title={videoEnabled ? 'Stop Video' : 'Start Video'}
          >
            {videoEnabled ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
          </button>

          <button
            onClick={() => setScreenSharing(!screenSharing)}
            className={`p-3.5 rounded-full transition shadow-md ${
              screenSharing
                ? 'bg-blue-600 text-white'
                : 'bg-slate-800 hover:bg-slate-700 text-white'
            }`}
            title="Share Screen / Report"
          >
            <Share2 className="w-5 h-5" />
          </button>

          <button
            onClick={handleEndCall}
            className="px-6 py-3.5 rounded-full bg-red-600 hover:bg-red-700 text-white font-bold text-xs flex items-center space-x-2 shadow-lg shadow-red-900/40 transition transform active:scale-95"
          >
            <PhoneOff className="w-4 h-4" />
            <span>End Consultation</span>
          </button>
        </div>
      </div>
    </div>
  );
};

// MediCore AI - Advanced Siri-Style Voice Engine & Web Audio Analyser

export interface VoiceServiceListener {
  onResult: (transcript: string, isFinal: boolean) => void;
  onError: (error: string) => void;
  onEnd: () => void;
  onAudioLevel?: (level: number) => void; // 0.0 to 1.0 reactive volume
}

class VoiceService {
  private recognition: any = null;
  private isListening: boolean = false;
  private synth: SpeechSynthesis | null = null;
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private audioContext: AudioContext | null = null;
  private analyser: AnalyserNode | null = null;
  private mediaStream: MediaStream | null = null;
  private animFrameId: number | null = null;
  private activeListener: VoiceServiceListener | null = null;
  private isPaused: boolean = false;

  constructor() {
    if (typeof window !== 'undefined') {
      const SpeechRecognition =
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        this.recognition = new SpeechRecognition();
        this.recognition.continuous = false;
        this.recognition.interimResults = true;
      }
      if ('speechSynthesis' in window) {
        this.synth = window.speechSynthesis;
      }
    }
  }

  public isSpeechSupported(): boolean {
    return !!this.recognition;
  }

  public isTtsSupported(): boolean {
    return !!this.synth;
  }

  public async startListening(
    lang: string = 'en-US',
    listener: VoiceServiceListener
  ): Promise<boolean> {
    if (!this.recognition) {
      listener.onError('Speech recognition is not supported in this browser. Please use Chrome or Edge.');
      return false;
    }

    if (this.isListening) {
      this.stopListening();
    }

    this.activeListener = listener;

    // Initialize AudioContext & AnalyserNode for Siri-style Waveform Visualization
    try {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
        this.mediaStream = stream;
        const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
        if (AudioCtx) {
          this.audioContext = new AudioCtx();
          const source = this.audioContext.createMediaStreamSource(stream);
          this.analyser = this.audioContext.createAnalyser();
          this.analyser.fftSize = 64;
          source.connect(this.analyser);
          this.startAudioLevelTracking(listener);
        }
      }
    } catch (micErr: any) {
      console.warn('Microphone stream for audio visualizer not accessible:', micErr.message);
      // Fallback synthetic wave simulation
      this.startSyntheticAudioLevelTracking(listener);
    }

    try {
      this.recognition.lang = lang;
      this.recognition.onresult = (event: any) => {
        let transcript = '';
        let isFinal = false;
        for (let i = event.resultIndex; i < event.results.length; i++) {
          transcript += event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            isFinal = true;
          }
        }
        listener.onResult(transcript, isFinal);
      };

      this.recognition.onerror = (event: any) => {
        this.stopListening();
        let message = 'Speech recognition error';
        if (event.error === 'not-allowed') {
          message = 'Microphone permission denied. Please allow microphone access in your browser settings.';
        } else if (event.error === 'no-speech') {
          message = 'No speech was detected. Please try speaking again.';
        } else if (event.error === 'network') {
          message = 'Network error during speech recognition.';
        }
        listener.onError(message);
      };

      this.recognition.onend = () => {
        this.stopListening();
        listener.onEnd();
      };

      this.recognition.start();
      this.isListening = true;
      return true;
    } catch (e: any) {
      this.stopListening();
      listener.onError(e.message || 'Failed to start microphone');
      return false;
    }
  }

  private startAudioLevelTracking(listener: VoiceServiceListener) {
    if (!this.analyser) return;
    const dataArray = new Uint8Array(this.analyser.frequencyBinCount);

    const track = () => {
      if (!this.isListening) return;
      this.analyser!.getByteFrequencyData(dataArray);
      let sum = 0;
      for (let i = 0; i < dataArray.length; i++) {
        sum += dataArray[i];
      }
      const avg = sum / dataArray.length;
      const normalized = Math.min(1.0, avg / 128); // 0.0 to 1.0
      if (listener.onAudioLevel) {
        listener.onAudioLevel(normalized);
      }
      this.animFrameId = requestAnimationFrame(track);
    };

    track();
  }

  private startSyntheticAudioLevelTracking(listener: VoiceServiceListener) {
    let t = 0;
    const track = () => {
      if (!this.isListening) return;
      t += 0.15;
      const level = 0.3 + 0.4 * Math.abs(Math.sin(t));
      if (listener.onAudioLevel) {
        listener.onAudioLevel(level);
      }
      this.animFrameId = requestAnimationFrame(track);
    };
    track();
  }

  public stopListening(): void {
    if (this.recognition && this.isListening) {
      try {
        this.recognition.stop();
      } catch (e) {
        // ignore
      }
      this.isListening = false;
    }

    if (this.animFrameId) {
      cancelAnimationFrame(this.animFrameId);
      this.animFrameId = null;
    }

    if (this.mediaStream) {
      this.mediaStream.getTracks().forEach((track) => track.stop());
      this.mediaStream = null;
    }

    if (this.audioContext && this.audioContext.state !== 'closed') {
      try {
        this.audioContext.close();
      } catch (e) {}
      this.audioContext = null;
    }

    if (this.activeListener && this.activeListener.onAudioLevel) {
      this.activeListener.onAudioLevel(0);
    }
  }

  public getIsListening(): boolean {
    return this.isListening;
  }

  // Text-To-Speech with Natural Cadence & Regional Voice Selection
  public speak(
    text: string,
    langCode: string = 'en-US',
    onStart?: () => void,
    onComplete?: () => void
  ): void {
    if (!this.synth) return;

    this.stopSpeaking();

    // Clean markdown syntax, asterisk headers, tables, etc. for smooth speech
    const cleanText = text
      .replace(/\*\*/g, '')
      .replace(/\*/g, '')
      .replace(/###/g, '')
      .replace(/##/g, '')
      .replace(/#/g, '')
      .replace(/`+/g, '')
      .replace(/\[.*?\]\(.*?\)/g, '')
      .replace(/🚨|🩺|⚠️|💊|📋|📦|🛑|🔄|💡|👨‍⚕️|🔍|🧬|🧪|🥗|✓|•/g, '')
      .slice(0, 1200);

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = langCode;
    utterance.rate = 1.0;
    utterance.pitch = 1.0;

    // Pick best available voice for language
    const voices = this.synth.getVoices();
    if (voices && voices.length > 0) {
      let matchedVoice = voices.find(
        (v) => v.lang === langCode || v.lang.startsWith(langCode.split('-')[0])
      );
      if (matchedVoice) {
        utterance.voice = matchedVoice;
      }
    }

    utterance.onstart = () => {
      this.isPaused = false;
      if (onStart) onStart();
    };

    utterance.onend = () => {
      this.currentUtterance = null;
      this.isPaused = false;
      if (onComplete) onComplete();
    };

    utterance.onerror = (e) => {
      this.currentUtterance = null;
      this.isPaused = false;
      if (onComplete) onComplete();
    };

    this.currentUtterance = utterance;
    this.synth.speak(utterance);
  }

  public pauseSpeaking(): void {
    if (this.synth && this.synth.speaking && !this.isPaused) {
      this.synth.pause();
      this.isPaused = true;
    }
  }

  public resumeSpeaking(): void {
    if (this.synth && this.isPaused) {
      this.synth.resume();
      this.isPaused = false;
    }
  }

  public stopSpeaking(): void {
    if (this.synth) {
      this.synth.cancel();
      this.currentUtterance = null;
      this.isPaused = false;
    }
  }

  public isCurrentlySpeaking(): boolean {
    return !!this.synth && this.synth.speaking;
  }

  public isCurrentlyPaused(): boolean {
    return this.isPaused;
  }
}

export const voiceService = new VoiceService();

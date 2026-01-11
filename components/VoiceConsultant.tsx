
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { GoogleGenAI, Modality, LiveServerMessage } from '@google/genai';
import { createBlob, decode, decodeAudioData } from '../services/audioUtils';

const VoiceConsultant: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const [status, setStatus] = useState<string>('Talk with AI Consultant');
  
  const audioContextRef = useRef<AudioContext | null>(null);
  const outputAudioContextRef = useRef<AudioContext | null>(null);
  const sessionRef = useRef<any>(null);
  const nextStartTimeRef = useRef<number>(0);
  const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());

  const stopSession = useCallback(() => {
    if (sessionRef.current) {
      sessionRef.current.close();
      sessionRef.current = null;
    }
    setIsActive(false);
    setStatus('AI Consultant Offline');
    sourcesRef.current.forEach(source => { try { source.stop(); } catch (e) {} });
    sourcesRef.current.clear();
    if (audioContextRef.current) audioContextRef.current.close();
    if (outputAudioContextRef.current) outputAudioContextRef.current.close();
    nextStartTimeRef.current = 0;
  }, []);

  const startSession = async () => {
    try {
      setIsActive(true);
      setStatus('Connecting...');
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const inputCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
      const outputCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      audioContextRef.current = inputCtx;
      outputAudioContextRef.current = outputCtx;
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      const currentLang = document.documentElement.lang || 'ar';
      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-12-2025',
        callbacks: {
          onopen: () => {
            setStatus(currentLang === 'ar' ? 'المستشار يستمع...' : 'Consultant is listening...');
            const source = inputCtx.createMediaStreamSource(stream);
            const scriptProcessor = inputCtx.createScriptProcessor(4096, 1, 1);
            scriptProcessor.onaudioprocess = (e) => {
              const pcmBlob = createBlob(e.inputBuffer.getChannelData(0));
              sessionPromise.then(session => session.sendRealtimeInput({ media: pcmBlob }));
            };
            source.connect(scriptProcessor);
            scriptProcessor.connect(inputCtx.destination);
          },
          onmessage: async (message: LiveServerMessage) => {
            const base64Audio = message.serverContent?.modelTurn?.parts?.[0]?.inlineData?.data;
            if (base64Audio && outputAudioContextRef.current) {
              const ctx = outputAudioContextRef.current;
              nextStartTimeRef.current = Math.max(nextStartTimeRef.current, ctx.currentTime);
              const audioBuffer = await decodeAudioData(decode(base64Audio), ctx, 24000, 1);
              const source = ctx.createBufferSource();
              source.buffer = audioBuffer;
              source.connect(ctx.destination);
              source.onended = () => sourcesRef.current.delete(source);
              source.start(nextStartTimeRef.current);
              nextStartTimeRef.current += audioBuffer.duration;
              sourcesRef.current.add(source);
            }
          },
          onerror: () => stopSession(),
          onclose: () => stopSession()
        },
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Kore' } } },
          systemInstruction: `You are an expert UX and Web Dev consultant for TechVision Pro.
          Current user language is ${currentLang === 'ar' ? 'Arabic' : 'English'}.
          If the site is in Arabic, speak Arabic. If English, speak English.
          Be professional, concise, and helpful about visual identity, coding, and user experience.`,
        },
      });
      sessionRef.current = await sessionPromise;
    } catch (err) { stopSession(); }
  };

  return (
    <div className="fixed bottom-8 left-8 z-50">
      <div className={`flex flex-col items-center gap-4 transition-all duration-500 ${isActive ? 'mb-4' : ''}`}>
        {isActive && <div className="glass-effect p-3 rounded-xl shadow-2xl animate-pulse text-xs font-bold text-sky-400">{status}</div>}
        <button
          onClick={isActive ? stopSession : startSession}
          className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all ${isActive ? 'bg-red-500' : 'bg-sky-500'}`}
        >
          {isActive ? (
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
          ) : (
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" /></svg>
          )}
        </button>
      </div>
    </div>
  );
};

export default VoiceConsultant;

export const pronunciationService = {
  isSupported(): boolean {
    return typeof window !== 'undefined' && 'speechSynthesis' in window;
  },

  speak(text: string, rate: number = 0.9, onStart?: () => void, onEnd?: () => void, onError?: () => void): void {
    if (!this.isSupported() || !text.trim()) {
      if (onError) onError();
      return;
    }

    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text.trim());
      utterance.rate = rate;
      utterance.lang = 'en-IN';

      if (onStart) utterance.onstart = onStart;
      if (onEnd) utterance.onend = onEnd;
      utterance.onerror = () => {
        if (onEnd) onEnd();
        if (onError) onError();
      };

      window.speechSynthesis.speak(utterance);
    } catch {
      if (onError) onError();
    }
  },

  stop(): void {
    if (this.isSupported()) {
      window.speechSynthesis.cancel();
    }
  },
};

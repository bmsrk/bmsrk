/**
 * Sims-like Speech Audio Generator
 * Creates procedural audio that mimics The Sims "Simlish" speech pattern
 */

export class SimsAudioGenerator {
  private audioContext: AudioContext | null = null;
  private currentOscillators: OscillatorNode[] = [];
  private isPlaying = false;

  constructor() {
    // Initialize AudioContext on demand
    if (typeof window !== 'undefined') {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
  }

  /**
   * Generate Sims-like speech sounds for a given text
   * Creates varying pitch oscillations that sound like gibberish speech
   */
  speak(text: string, speed: number = 1): void {
    if (!this.audioContext || this.isPlaying) return;

    this.isPlaying = true;
    this.currentOscillators = [];

    const baseFrequencies = [
      200, 220, 180, 240, 190, 210, 230, 195, 205, 215, // Varied base frequencies
    ];

    const syllableCount = Math.ceil(text.length / 4); // Approximate syllables
    const syllableDuration = (0.15 / speed) * 1000; // Duration per syllable in ms

    for (let i = 0; i < syllableCount; i++) {
      const startTime = this.audioContext.currentTime + i * (syllableDuration / 1000);
      const duration = (syllableDuration / 1000) * (0.8 + Math.random() * 0.4); // Vary duration

      // Randomly select base frequency
      const baseFreq =
        baseFrequencies[Math.floor(Math.random() * baseFrequencies.length)] ?? 200;

      // Create oscillator
      const oscillator = this.audioContext.createOscillator();
      const gainNode = this.audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(this.audioContext.destination);

      // Use square or sawtooth for more "voice-like" quality
      oscillator.type = Math.random() > 0.5 ? 'square' : 'sawtooth';

      // Add pitch variation for natural speech-like quality
      const pitchVariation = 1 + (Math.random() - 0.5) * 0.3; // ±15% pitch variation
      oscillator.frequency.value = baseFreq * pitchVariation;

      // Envelope: Quick attack, sustain, quick release
      gainNode.gain.setValueAtTime(0, startTime);
      gainNode.gain.linearRampToValueAtTime(0.08, startTime + 0.02); // Attack
      gainNode.gain.linearRampToValueAtTime(0.06, startTime + duration * 0.7); // Sustain
      gainNode.gain.linearRampToValueAtTime(0, startTime + duration); // Release

      oscillator.start(startTime);
      oscillator.stop(startTime + duration);

      this.currentOscillators.push(oscillator);
    }

    // Reset playing state after all sounds complete
    setTimeout(() => {
      this.isPlaying = false;
      this.currentOscillators = [];
    }, syllableCount * syllableDuration + 200);
  }

  /**
   * Stop all currently playing sounds
   */
  stop(): void {
    if (!this.audioContext) return;

    this.currentOscillators.forEach((osc) => {
      try {
        osc.stop();
      } catch {
        // Oscillator might already be stopped
      }
    });

    this.currentOscillators = [];
    this.isPlaying = false;
  }

  /**
   * Cleanup resources
   */
  dispose(): void {
    this.stop();
    if (this.audioContext && this.audioContext.state !== 'closed') {
      this.audioContext.close();
    }
    this.audioContext = null;
  }
}

// Singleton instance
let simsAudioInstance: SimsAudioGenerator | null = null;

export const getSimsAudio = (): SimsAudioGenerator => {
  if (!simsAudioInstance) {
    simsAudioInstance = new SimsAudioGenerator();
  }
  return simsAudioInstance;
};

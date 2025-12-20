/**
 * Sims-like Speech Audio Generator
 * Creates procedural audio that mimics The Sims "Simlish" speech pattern
 */

export class SimsAudioGenerator {
  private audioContext: AudioContext | null = null;
  private currentOscillators: OscillatorNode[] = [];
  private isPlaying = false;
  private isSupported = false;

  constructor() {
    // Initialize AudioContext on demand with error handling
    try {
      if (typeof window !== 'undefined') {
        this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        this.isSupported = true;
      }
    } catch (error) {
      console.warn('Web Audio API not supported:', error);
      this.isSupported = false;
      this.audioContext = null;
    }
  }

  /**
   * Generate Sims-like speech sounds for a given text
   * Creates varying pitch oscillations that sound like gibberish speech
   * @param text - The text to speak
   * @param speed - Speed multiplier (default 1)
   * @param isClippy - Whether to use Clippy's higher-pitched voice (default false)
   */
  speak(text: string, speed: number = 1, isClippy: boolean = false): void {
    // Silently fail if audio not supported - it's an enhancement, not critical
    if (!this.isSupported || !this.audioContext || this.isPlaying) return;

    try {
      // Resume audio context if suspended (required by browsers)
      if (this.audioContext.state === 'suspended') {
        this.audioContext.resume().catch((err) => {
          console.warn('Failed to resume audio context:', err);
        });
      }

      this.isPlaying = true;
      this.currentOscillators = [];

      const baseFrequencies = isClippy
        ? [
            260, 286, 234, 312, 247, 273, 299, 254, 267, 280, // Higher-pitched for Clippy
          ]
        : [
            200, 220, 180, 240, 190, 210, 230, 195, 205, 215, // Normal Bruno voice
          ];

      const syllableCount = Math.ceil(text.length / 4); // Approximate syllables
      const syllableDuration = (0.15 / speed) * 1000; // Duration per syllable in ms
      const actualSpeed = isClippy ? speed * 1.15 : speed; // Clippy speaks slightly faster

      for (let i = 0; i < syllableCount; i++) {
        const startTime =
          this.audioContext.currentTime + i * (syllableDuration / 1000 / actualSpeed);
        const duration = (syllableDuration / 1000 / actualSpeed) * (0.8 + Math.random() * 0.4); // Vary duration

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
        // Clippy has more playful oscillation
        const pitchVariation = isClippy
          ? 1 + (Math.random() - 0.5) * 0.4 // ±20% pitch variation for Clippy
          : 1 + (Math.random() - 0.5) * 0.3; // ±15% pitch variation for Bruno
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
      }, (syllableCount * syllableDuration) / actualSpeed + 200);
    } catch (error) {
      console.warn('Failed to play audio:', error);
      // Don't crash - just log and continue
      this.isPlaying = false;
      this.currentOscillators = [];
    }
  }

  /**
   * Check if audio context is initialized and ready
   */
  isReady(): boolean {
    return this.audioContext !== null && this.audioContext.state !== 'closed';
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

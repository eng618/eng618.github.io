/**
 * Retro WebAudio synth for Linter Invaders. Lazily creates an AudioContext on first user gesture so autoplay policies
 * don't throw, and no-ops when audio is unavailable.
 */
export class SoundSynth {
  private ctx: AudioContext | null = null;

  init() {
    if (typeof window === 'undefined') {
      return;
    }
    if (!this.ctx) {
      const AudioContextClass =
        window.AudioContext ||
        (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (AudioContextClass) {
        this.ctx = new AudioContextClass();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      void this.ctx.resume();
    }
  }

  private get ready(): boolean {
    return !!this.ctx && this.ctx.state !== 'suspended';
  }

  private playTone(type: OscillatorType, frequency: number, startAt: number, duration: number, volume: number) {
    if (!this.ready || !this.ctx) {
      return;
    }
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.type = type;
    osc.frequency.setValueAtTime(frequency, startAt);

    gain.gain.setValueAtTime(volume, startAt);
    gain.gain.exponentialRampToValueAtTime(0.001, startAt + duration - 0.01);

    osc.start(startAt);
    osc.stop(startAt + duration);
  }

  playShoot() {
    if (!this.ready || !this.ctx) {
      return;
    }
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.exponentialRampToValueAtTime(1000, now + 0.1);

      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);

      osc.start();
      osc.stop(now + 0.1);
    } catch (e) {
      console.warn('Audio error:', e);
    }
  }

  playExplosion() {
    if (!this.ready || !this.ctx) {
      return;
    }
    try {
      const bufferSize = this.ctx.sampleRate * 0.15;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(250, this.ctx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(10, this.ctx.currentTime + 0.15);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.15);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      noise.start();
      noise.stop(this.ctx.currentTime + 0.15);
    } catch (e) {
      console.warn('Audio error:', e);
    }
  }

  playGameOver() {
    if (!this.ready || !this.ctx) {
      return;
    }
    try {
      const now = this.ctx.currentTime;
      const tones = [500, 380, 290, 190];
      const duration = 0.15;
      tones.forEach((freq, idx) => {
        this.playTone('sawtooth', freq, now + idx * duration, duration, 0.08);
      });
    } catch (e) {
      console.warn('Audio error:', e);
    }
  }

  playReboot() {
    if (!this.ready || !this.ctx) {
      return;
    }
    try {
      const now = this.ctx.currentTime;
      const tones = [261.63, 329.63, 392.0, 523.25]; // C4, E4, G4, C5
      const duration = 0.08;
      tones.forEach((freq, idx) => {
        this.playTone('sine', freq, now + idx * duration, duration, 0.05);
      });
    } catch (e) {
      console.warn('Audio error:', e);
    }
  }

  playPowerUp() {
    if (!this.ready || !this.ctx) {
      return;
    }
    try {
      const now = this.ctx.currentTime;
      const tones = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
      const duration = 0.07;
      tones.forEach((freq, idx) => {
        this.playTone('triangle', freq, now + idx * duration, duration, 0.07);
      });
    } catch (e) {
      console.warn('Audio error:', e);
    }
  }

  playLevelClear() {
    if (!this.ready || !this.ctx) {
      return;
    }
    try {
      const now = this.ctx.currentTime;
      const tones = [392.0, 523.25, 659.25, 783.99]; // G4, C5, E5, G5
      const duration = 0.12;
      tones.forEach((freq, idx) => {
        this.playTone('sine', freq, now + idx * duration, duration, 0.07);
      });
    } catch (e) {
      console.warn('Audio error:', e);
    }
  }

  playLifeLost() {
    if (!this.ready || !this.ctx) {
      return;
    }
    try {
      const now = this.ctx.currentTime;
      const tones = [400, 300, 200];
      const duration = 0.12;
      tones.forEach((freq, idx) => {
        this.playTone('sawtooth', freq, now + idx * duration, duration, 0.07);
      });
    } catch (e) {
      console.warn('Audio error:', e);
    }
  }
}

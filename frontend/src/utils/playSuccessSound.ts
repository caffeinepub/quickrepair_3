/**
 * Plays a Google Pay-style success chime using the Web Audio API.
 * Generates a pleasant ascending C-E-G major chord sequence.
 */
export function playSuccessSound(): void {
  try {
    const AudioContextClass =
      window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;

    const ctx = new AudioContextClass();

    // Notes: C5 → E5 → G5 (major chord arpeggio)
    const notes = [
      { freq: 523.25, start: 0.0, duration: 0.18 },
      { freq: 659.25, start: 0.12, duration: 0.18 },
      { freq: 783.99, start: 0.24, duration: 0.35 },
    ];

    notes.forEach(({ freq, start, duration }) => {
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);

      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(freq, ctx.currentTime + start);

      // Smooth attack and exponential decay
      gainNode.gain.setValueAtTime(0, ctx.currentTime + start);
      gainNode.gain.linearRampToValueAtTime(0.35, ctx.currentTime + start + 0.02);
      gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + start + duration);

      oscillator.start(ctx.currentTime + start);
      oscillator.stop(ctx.currentTime + start + duration + 0.05);
    });

    // Close context after all notes finish
    setTimeout(() => {
      ctx.close().catch(() => {});
    }, 1000);
  } catch {
    // Silently fail if Web Audio API is not supported
  }
}

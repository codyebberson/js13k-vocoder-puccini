/**
 * Returns the ADSR envelope amplitude for the current time t.
 *
 * ADSR envelope has four stages:
 *   1) Attack is the time taken for initial run-up of level from nil to peak, beginning when the key is pressed.
 *   2) Decay is the time taken for the subsequent run down from the attack level to the designated sustain level.
 *   3) Sustain is the level during the main sequence of the sound's duration, until the key is released.
 *   4) Release is the time taken for the level to decay from the sustain level to zero after the key is released.
 *
 *          Attack    Decay Sustain    Release
 *          [--------][----][---------][-----]
 *     max |-----------\
 *   A     |            \
 *   m     |             \
 *   p     |              \
 *   l     |               \-----------\
 *   i     |                            \
 *   t     |                             \
 *   u     |                              \
 *   d     |                               \
 *   e   0 +----------------------------------> time
 *
 * While attack, decay, and release refer to time, sustain refers to level.
 *
 * Since we are operating on predetermined notes, we use "duration" rather than key press and key release.
 *
 * From t=0 to t=a (attack period), the volume increases from 0.0 to 1.0.
 * From t=a to t=d (decay period), the volume decreases from 1.0 to s (sustain).
 * From t=d to t=du (sustain period), the volume stays constant at s (sustain).
 * From t=du to t=du+r (release period), the volume decreases from s (sustain) to 0.0.
 * After that, the volume is 0.0.
 *
 * See more: https://en.wikipedia.org/wiki/Envelope_(music)
 *
 * @param a Attack
 * @param d Decay
 * @param s Sustain
 * @param r Release
 * @param du Duration
 * @param t Current time
 */
export const envelope = (a: number, d: number, s: number, r: number, du: number, t: number): number =>
  t < a // From t=0 to t=a (attack period)
    ? t / a // the volume increases from 0.0 to 1.0
    : t < a + d // From t=a to t=d (decay period)
    ? 1.0 - ((t - a) / d) * (1 - s) // the volume decreases from 1.0 to s (sustain)
    : t < du // From t=d to t=du (sustain period)
    ? s // the volume stays constant at s (sustain)
    : t < du + r // From t=du to t=du+r (release period)
    ? (1.0 - (t - du) / r) * s // release
    : 0.0; // After that, the volume is 0.0.

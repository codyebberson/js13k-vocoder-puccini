export function clamp01(t: number): number {
  return Math.min(1, Math.max(0, t));
}

export function midi_to_hz(midi: number): number {
  return 440 * 2 ** ((midi - 69) / 12);
}

export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

// Midi to Frequency
// https://gist.github.com/dimitre/439f5ab75a0c2e66c8c63fc9e8f7ea77
export const a0 = 21;
export const as0 = 22;
export const b0 = 23;
export const c1 = 24;
export const cs1 = 25;
export const d1 = 26;
export const ds1 = 27;
export const e1 = 28;
export const f1 = 29;
export const fs1 = 30;
export const g1 = 31;
export const gs1 = 32;
export const a1 = 33;
export const as1 = 34;
export const b1 = 35;
export const c2 = 36;
export const cs2 = 37;
export const d2 = 38;
export const ds2 = 39;
export const e2 = 40;
export const f2 = 41;
export const fs2 = 42;
export const g2 = 43;
export const gs2 = 44;
export const a2 = 45;
export const as2 = 46;
export const b2 = 47;
export const c3 = 48;
export const cs3 = 49;
export const d3 = 50;
export const ds3 = 51;
export const e3 = 52;
export const f3 = 53;
export const fs3 = 54;
export const g3 = 55;
export const gs3 = 56;
export const a3 = 57;
export const as3 = 58;
export const b3 = 59;
export const c4 = 60;
export const cs4 = 61;
export const d4 = 62;
export const ds4 = 63;
export const e4 = 64;
export const f4 = 65;
export const fs4 = 66;
export const g4 = 67;
export const gs4 = 68;
export const a4 = 69;
export const as4 = 70;
export const b4 = 71;
export const c5 = 72;
export const cs5 = 73;
export const d5 = 74;
export const ds5 = 75;
export const e5 = 76;
export const f5 = 77;
export const fs5 = 78;
export const g5 = 79;
export const gs5 = 80;
export const a5 = 81;
export const as5 = 82;
export const b5 = 83;
export const c6 = 84;
export const cs6 = 85;
export const d6 = 86;
export const ds6 = 87;
export const e6 = 88;
export const f6 = 89;
export const fs6 = 90;
export const g6 = 91;
export const gs6 = 92;
export const a6 = 93;
export const as6 = 94;
export const b6 = 95;
export const c7 = 96;
export const cs7 = 97;
export const d7 = 98;
export const ds7 = 99;
export const e7 = 100;
export const f7 = 101;
export const fs7 = 102;
export const g7 = 103;
export const gs7 = 104;
export const a7 = 105;
export const as7 = 106;
export const b7 = 107;
export const c8 = 108;
export const cs8 = 109;
export const d8 = 110;
export const ds8 = 111;
export const e8 = 112;
export const f8 = 113;
export const fs8 = 114;
export const g8 = 115;
export const gs8 = 116;
export const a8 = 117;
export const as8 = 118;
export const b8 = 119;

/* eslint-disable prettier/prettier */

import { a1, a2, a3, a4, a5, a6, b1, b2, b3, b4, b5, cs2, cs3, cs4, cs5, cs6, d1, d2, d3, d4, d5, d6, e1, e2, e3, e4, e5, e6, fs1, fs2, fs3, fs4, fs5, fs6, g1, g2, g3, g4, g5, g6 } from "./ditty";

// Formant values taken from
// https://www.classes.cs.uchicago.edu/archive/1999/spring/CS295/Computing_Resources/Csound/CsManual3.48b1.HTML/Appendices/table3.html
export const table = {
  'a': {
      freq: [650, 1080, 2650, 2900, 3250],
      amp:  [0, -6, -7, -8, -22],
      bw:   [80, 90, 120, 130, 140]
  },
  'e': {
      freq: [400, 1700, 2600, 3200, 3580],
      amp:  [0, -14, -12, -14, -20],
      bw:   [70, 80, 100, 120, 120]
  },
  'i': {
      freq: [290, 1870, 2800, 3250, 3540],
      amp:  [0, -15, -18, -20, -30],
      bw:   [40, 90, 100, 120, 120]
  },
  'o': {
      freq: [400, 800, 2600, 2800, 3000],
      amp:  [0, -10, -12, -12, -26],
      bw:   [40, 80, 100, 120, 120]
  },
  'u': {
      freq: [350, 600, 2700, 2900, 3300],
      amp:  [0, -20, -17, -14, -26],
      bw:   [40, 60, 100, 120, 120]
  },
  'r': {
      freq: [400, 1700, 2600, 3200, 3580],
      amp:  [-60, -60, -60, -60, -60],
      bw:   [70, 80, 100, 120, 120]
  }
};

type Vowel = keyof typeof table;

// Play formant synths
// Adapted from the famous aria "Nessun Dorma" from Act III of the opera "Turandot" by Giacomo Puccini

export const nn = [ 
  d4,   d4,   d4,  e4,  e4, fs4,  e4,  d4,  d4,  e4,  e4,  e4, cs4,  b3,  b3,  e4, 
  e4,  fs4,  g4, fs4, fs4,  e4, fs4,  d4, cs4, cs4,  d4,  e4,  e4,  e4,  fs4, fs4,  g4,  g4,
  a4,   a4,  a4,  a4,  a4, fs4, fs4, fs4, fs4, fs4, fs4, fs4,  d4,  a3,  a3,  a3,
  a3,   a3,  a3,  e4, cs4,  d4, 
  b3,   b3,  d4,  g4, d4,d4,b4,a4,a4
];

export const vowels: Vowel[] = [ 
  "r", "a", "i", "i", "o", "i", "e", "o", "e", "i", "u", "o", "i", "e", "r", "r",
  "i", "o", "e", "i", "o", "e", "u", "a", "a", "r", "o", "o", "r", "i", "e", "u", "a", "o",
  "o", "e", "a", "o", "a", "e", "e", "e", "r", "a", "o", "a", "e", "e", "e", "r",
  "a", "a", "a", "i", "e", "o",
  "r", "i", "e", "o", "r", "i", "e", "e", "o"
];

export const durs = [
  0.5,  .3,  .2,  .1,  .4, 0.5, 0.5,  .1,  .4,  .1, .55,  .1, .25,   2, 0.25, 0.25,
  0.5, 0.5, 0.4, 0.2, 0.4, 0.5, .75, .25, 0.8, 0.2, 1.0, 0.2, 0.3, 0.5, 0.3, 0.2, 0.25, 0.25,
  1.0, 1.0, 0.5, 0.5, .75, .25, 1.0, 0.8, 0.2, 0.5, 0.5, .75, .25, 1.0, 0.2, 0.3,
  0.5, 0.5, 0.5, 1.7, 0.3, 2.5,
  0.5,0.75,0.25,2.5,0.5,1,2.7,0.3,3.5];

export const totaldur = durs.reduce( (a,b) => a+b, 0);

export const bsnn =  [ d2, fs2,  g2, fs2,  e2,  g2,  a2,  b2, cs3,  a1,  g1, fs1,  e1,  a1,   0,  g1,
              g1, d2, fs2, g2, fs2, e2, g2, a1, b1, cs2, a1, g1, d1];

export const bsdur = [3.0, 1.0, 1.0, 1.0, 3.0, 1.0, 1.0, 1.0, 1.0, 0.5, 0.5, 4.0, 4.0, 3.5, 1.5, 4.0,
             4+3,3.0, 1.0, 1., 1.0, 3., 1., 1., 1., 1.0, .7, .7, 4];

export const clnn  = [ a2,  d3,  g3,  d3,  e3,  e3,  e3,  a2,  g2, fs2,  e2,  a2,  a2,  d3,
             g2, d3, d3, d3, d3, d3, d3, a2, b2, cs3, a2, g2, d2];

export const cldur = [3.0, 4.0, 2.0, 1.0, 1.0, 1.0, 1.0, 0.5, 0.5, 4.0, 4.0, 2.0, 3.0, 4.0,
             4+3, 3,   1, 1,  1,  3, 1,  1,  1,  1,   .7, .7, 4];

export const rhnn  = [[a3,fs4,a4], [a3,a4], [b3,d4,b4], [b3,fs4,b4],[cs4,cs5], [a3,d4,a4], [a3,e4,a4],
             [a3,e4,a4], [fs4,cs4,fs5],[g4,cs5,g5],[a4,e5,a5],[a4,e5,a5],[fs4,cs5,fs5], [fs4,cs5,fs5],
             [fs4,b4,fs5], [fs4,d5,fs5],[d4,b4,d5],[a3,d4,fs4,a4],
             [d4,fs4,b4,d5],[cs4,e4,a4,cs5],[b3,d4,g4,b4],[a3,cs4,fs4,a4],[b3,cs4,e4], [],
             [d4,g4,b4,d5],
             [d5],[g4],[b4],[d5],[g5],[d5],[g5],[b5],
             [],[d5,d6],[e5,e6],[fs5,fs6],[e5,e6],[d5,d6],[e5,e6],[cs5,cs6],
             [b4,b5],[e5,e6],[fs5,fs6],[g5,g6],[fs5,fs6],[e5,e6],[fs5,fs6],[d5,d6],
             [cs5,e5,a5,cs6],[d5,a5,d6],[e5,a5,e6],[fs5,a5,fs6],[g5,b5,g6],[a5,d6,a6]];

export const rhdur = [3.0,             1.0,        5.0,         1.0,      1.0,        1.0,      0.5,
                  0.5,           0.5,       0.5,      3.0,       0.75,       0.25,          2.5,
                  0.5,           0.75,        0.25,    1.0,
                  0.5,            0.5,            0.5,             0.5,         0.5,    1.5,
                  4.0,
                  0.5,0.5,0.5,0.5,0.5,0.5,1,3,
                  0.5,0.5,0.5,0.5,0.5,0.5,0.75,0.25,
                  2.5,0.5,0.5,.5,.5,.5,.75,.25,1,1,1,0.7,0.7,4];

export const innn = [[], [fs3,a3], [], [g3,b3], [], [fs3], [g3], [],
              [],[d3,g3,b3],[g3,b3,d4],[b3,d4,g4],[d4,g4,b4],[g3,b3,d4],[b3,d4,g4],[d4,g4,b4],
              [g4,b4,d5],[b3,d4,g4],[d4,g4,b4],[g4,b4,d5],[g4,b4,d5,g5],[d4,g4,b4,d5],[g4,b4,d5,g5],
              [fs3,a3,d4,fs4,a4],[d3,a3,d4,fs4],
              [a3,d4,g4], [g3,d4,fs4], [e3,g3,b3,e4,g4], [b3,d4,g4],
              [e3,a3,cs4,e4,a4],[fs3,b3,d4,a4,b4],[e3,a3,cs4,e4,a4],[a3,d4,fs4,a4,d5],[g3,b3,d4,g4,b4,d5],
              [a2,d3,fs3,a3,fs4,a4]];

export const indur = [14.5, 3.5, 0.5,  3.5,   0.5,   2.5,  0.5,  1.5,
             0.5,    0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5,
             0.5,0.5,0.5,0.5,0.5,0.5,1+3,
             3, 1,
             1, 1, 3, 1,
             1, 1, 1, 0.7, 0.7,
             4
             ];


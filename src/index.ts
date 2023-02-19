import { c3, clamp01, midi_to_hz } from './ditty';
import { envelope } from './env';
import { bsdur, bsnn, cldur, clnn, durs, indur, innn, nn, rhdur, rhnn, table, totaldur, vowels } from './formant';

(document.getElementById('b') as HTMLButtonElement).addEventListener('click', init);

const ctx = new AudioContext();

const sampleRate = ctx.sampleRate;

const length = sampleRate * 0.75;
const impulse = ctx.createBuffer(2, length, sampleRate);
const impulseL = impulse.getChannelData(0);
const impulseR = impulse.getChannelData(1);
const decay = 1.1;
for (let i = 0; i < length; i++) {
  impulseL[i] = 0.5 * (Math.random() * 2 - 1) * Math.pow(1 - i / length, decay);
  impulseR[i] = 0.5 * (Math.random() * 2 - 1) * Math.pow(1 - i / length, decay);
}

const convolver = ctx.createConvolver();
convolver.buffer = impulse;
convolver.connect(ctx.destination);

const dt = 1 / sampleRate;

const totalLengthInSeconds = 60;

const totalLengthInSamples = totalLengthInSeconds * sampleRate;

const audioBuffer = ctx.createBuffer(2, totalLengthInSamples, sampleRate);

const data = [audioBuffer.getChannelData(0), audioBuffer.getChannelData(1)];

function init(): void {
  const source = ctx.createBufferSource();
  source.buffer = audioBuffer;
  source.connect(convolver);
  source.start();
}

function dbamp(dB: number): number {
  return 10 ** (dB / 20);
}

const TWOPI = 2 * Math.PI;

class Smoother {
  v: number;
  a0: number;

  // We feed values to this object, and it smoothes them out
  constructor(v: number, dur = 0.07) {
    this.v = v;
    this.a0 = clamp01(dt / dur);
  }

  update(target: number): number {
    // should be called once per sample
    return (this.v += this.a0 * (target - this.v));
  }
}

function playFormant(ns: number): void {
  const attack = 0.1;
  const decay = 0;
  const sustain = 1;
  const duration = totaldur;
  const release = 0.1;

  let nn2 = nn[0];
  let ffreq = table[vowels[0]].freq[ns];
  let bw = table[vowels[0]].bw[ns];
  let ampdb = -60;
  let lastnote = 0;

  let phase = 0;
  const freq = midi_to_hz(nn2);
  const freqsmoo = new Smoother(freq);
  const ffreqsmoo = new Smoother(ffreq);
  const ampsmoo = new Smoother(dbamp(ampdb));
  const bwsmoo = new Smoother(bw);
  const smoo_note = new Smoother(c3, 0.1);
  const formratio = ffreq / freq;
  let k = Math.floor(formratio);
  let q = formratio - k;
  let s = 0;

  for (let i = 0; i < nn.length; i++) {
    nn2 = nn[i];
    if (vowels[i] !== 'r') {
      ffreq = table[vowels[i]].freq[ns];
      bw = table[vowels[i]].bw[ns];
    }
    ampdb = table[vowels[i]].amp[ns];
    if (i > 0) {
      lastnote += durs[i - 1];
    }

    const end = ((lastnote + durs[i]) * sampleRate) | 0;
    while (s < end) {
      const t = Math.max(0, s / sampleRate);
      const note = smoo_note.update(nn2) + clamp01(t - lastnote - 0.5) * (0.5 * Math.sin(4.7 * TWOPI * t));

      // Movable ring modulation as explained here:
      // http://msp.ucsd.edu/techniques/latest/book-html/node95.html
      const freq2 = freqsmoo.update(midi_to_hz(note));
      const ffreq2 = ffreqsmoo.update(ffreq);
      const dphase = TWOPI * freq2 * dt;
      phase += dphase;
      if (phase > TWOPI) {
        phase -= TWOPI;
        // End of one period
        // We can change the formant ratio now!
        const formratio = ffreq2 / freq2;
        k = Math.floor(formratio);
        q = formratio - k;
      }
      const carrier = (1 - q) * Math.cos(k * phase) + q * Math.cos((k + 1) * phase);

      const bw2 = bwsmoo.update(bw);
      const b = bw2 / freq2;
      const a = 0.5 * b * b;
      const modulator = 1 / (1 + a * (1 - Math.cos(phase)));
      const amp = ampsmoo.update(dbamp(ampdb));
      const env = envelope(attack, decay, sustain, release, duration, t);
      const value = 0.3 * carrier * modulator * amp * env;
      data[0][s] += value;
      data[1][s] += value;
      s++;
    }
  }
}

// Tenor part

for (let ns = 0; ns < 5; ns++) {
  playFormant(ns);
}

// Bass part

function tri(t: number): number {
  return -1 + 4 * Math.abs((t % 1) - 0.5);
}

function playVarsaw(start: number, decay: number, duration: number, note: number, pan: number): void {
  const attack = 0.2;
  const sustain = 0.8;
  const release = 1.0;
  const amp = 2 ** ((48 - note) / 24);
  const freq = midi_to_hz(note);
  const end = ((start + duration + release) * sampleRate) | 0;
  let i = (start * sampleRate) | 0;
  let phase = 0;

  while (i < end) {
    const t = Math.max(0, i / sampleRate - start);
    phase += freq / sampleRate;
    const x = phase % 1;
    const env = envelope(attack, decay, sustain, release, duration, t);
    const value = 0.3 * (x - 0.5) * clamp01(15 * x * (1 - x) * (1 + 0.1 * tri(phase))) * env * amp;
    data[0][i] += (0.7 - 0.5 * pan) * value;
    data[1][i] += (0.7 + 0.5 * pan) * value;
    i++;
  }
}

function playVarsawNotes(notes: number[], durations: number[], pan: number): void {
  let t = 0;
  for (let i = 0; t < totalLengthInSeconds; i++) {
    if (i < notes.length) {
      if (notes[i]) {
        playVarsaw(t, Math.min(1, durations[i] - 0.2), durations[i], notes[i], pan);
      }
      t += durations[i];
    } else {
      t++;
    }
  }
}

function playVarsawChords(chords: number[][], durations: number[], pan: number): void {
  let t = 0;
  for (let i = 0; t < totalLengthInSeconds; i++) {
    if (i < chords.length) {
      for (let j = 0; j < chords[i].length; j++) {
        playVarsaw(t, Math.min(1, durations[i] - 0.2), durations[i], chords[i][j], pan);
      }
      t += durations[i];
    } else {
      t++;
    }
  }
}

// Bass
playVarsawNotes(bsnn, bsdur, 0.6);

// Cello
playVarsawNotes(clnn, cldur, 0.4);

// Violins
playVarsawChords(rhnn, rhdur, -0.3);

// Viola
playVarsawChords(innn, indur, -0.2);

import { writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const root = join(process.cwd(), "public");

function svg(bg, emoji) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400">
  <rect width="400" height="400" rx="40" fill="${bg}"/>
  <text x="200" y="230" font-size="180" text-anchor="middle" dominant-baseline="middle">${emoji}</text>
</svg>`;
}

const images = [
  ["images/placeholder/animal-cat.svg", "#FFD6D6", "🐱"],
  ["images/placeholder/animal-dog.svg", "#D6E4FF", "🐶"],
  ["images/placeholder/animal-fish.svg", "#D6FFF6", "🐟"],
  ["images/placeholder/fruit-apple.svg", "#FFD6D6", "🍎"],
  ["images/placeholder/fruit-banana.svg", "#FFF6D6", "🍌"],
  ["images/placeholder/fruit-grapes.svg", "#E7D6FF", "🍇"],
  ["images/placeholder/color-red.svg", "#FF6B6B", "🔴"],
  ["images/placeholder/color-blue.svg", "#4D96FF", "🔵"],
  ["images/placeholder/color-yellow.svg", "#F9C74F", "🟡"],
  ["images/placeholder/book-cover-a.svg", "#FFE1D6", "📕"],
  ["images/placeholder/book-cover-b.svg", "#D6F0FF", "📘"],
  ["images/placeholder/math-star.svg", "#FFF6D6", "⭐"],
  ["images/placeholder/math-balloon.svg", "#FFD6EC", "🎈"],
  ["images/placeholder/math-ball.svg", "#D6FFE1", "⚽"],
  ["images/placeholder/science-animals.svg", "#D6FFE1", "🦁"],
  ["images/placeholder/science-weather.svg", "#D6EFFF", "⛅"],
  ["images/placeholder/science-space.svg", "#E1D6FF", "🚀"],
  ["images/placeholder/science-plant.svg", "#E1FFD6", "🌱"],
  ["images/placeholder/science-rainbow.svg", "#FFF0D6", "🌈"],
  ["images/placeholder/science-planet.svg", "#D6D6FF", "🪐"],
];

for (const [path, bg, emoji] of images) {
  const full = join(root, path);
  mkdirSync(join(full, ".."), { recursive: true });
  writeFileSync(full, svg(bg, emoji));
}

// Minimal valid silent WAV (0.3s, 8kHz, mono, 8-bit) for placeholder audio.
function silentWav(seconds = 0.3, sampleRate = 8000) {
  const numSamples = Math.floor(seconds * sampleRate);
  const dataSize = numSamples; // 8-bit mono = 1 byte/sample
  const buffer = Buffer.alloc(44 + dataSize);
  buffer.write("RIFF", 0);
  buffer.writeUInt32LE(36 + dataSize, 4);
  buffer.write("WAVE", 8);
  buffer.write("fmt ", 12);
  buffer.writeUInt32LE(16, 16);
  buffer.writeUInt16LE(1, 20); // PCM
  buffer.writeUInt16LE(1, 22); // mono
  buffer.writeUInt32LE(sampleRate, 24);
  buffer.writeUInt32LE(sampleRate, 28); // byte rate
  buffer.writeUInt16LE(1, 32); // block align
  buffer.writeUInt16LE(8, 34); // bits per sample
  buffer.write("data", 36);
  buffer.writeUInt32LE(dataSize, 40);
  buffer.fill(128, 44); // silence = midpoint for 8-bit unsigned PCM
  return buffer;
}

const audioPath = join(root, "audio/placeholder/silence.wav");
mkdirSync(join(audioPath, ".."), { recursive: true });
writeFileSync(audioPath, silentWav());

console.log("Generated", images.length, "placeholder images + 1 placeholder audio file.");

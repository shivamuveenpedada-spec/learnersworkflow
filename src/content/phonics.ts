import type { PhonicsLetter } from "./types";

const silence = { src: "/audio/placeholder/silence.wav" };

export const phonicsLetters: PhonicsLetter[] = [
  {
    letter: "A",
    sound: silence,
    exampleWords: [
      { word: "Apple", image: { src: "/images/generated/fruit-apple.png", alt: "Apple" }, audio: silence },
    ],
    tiers: ["preschool", "earlyElementary"],
    free: true,
  },
  {
    letter: "B",
    sound: silence,
    exampleWords: [
      { word: "Banana", image: { src: "/images/placeholder/fruit-banana.svg", alt: "Banana" }, audio: silence },
      { word: "Ball", image: { src: "/images/placeholder/math-ball.svg", alt: "Ball" }, audio: silence },
    ],
    tiers: ["preschool", "earlyElementary"],
  },
  {
    letter: "C",
    sound: silence,
    exampleWords: [
      { word: "Cat", image: { src: "/images/generated/animal-cat.png", alt: "Cat" }, audio: silence },
    ],
    tiers: ["preschool", "earlyElementary"],
  },
  {
    letter: "D",
    sound: silence,
    exampleWords: [
      { word: "Dog", image: { src: "/images/placeholder/animal-dog.svg", alt: "Dog" }, audio: silence },
    ],
    tiers: ["preschool", "earlyElementary"],
  },
];

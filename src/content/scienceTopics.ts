import type { ScienceTopic } from "./types";

const silence = { src: "/audio/placeholder/silence.wav" };

export const scienceTopics: ScienceTopic[] = [
  {
    id: "animals",
    title: "Amazing Animals",
    heroImage: { src: "/images/placeholder/science-animals.svg", alt: "Amazing animals" },
    previewImages: [
      { src: "/images/placeholder/animal-cat.svg", alt: "Cat" },
      { src: "/images/placeholder/animal-dog.svg", alt: "Dog" },
      { src: "/images/placeholder/animal-fish.svg", alt: "Fish" },
    ],
    tier: "preschool",
    free: true,
    facts: [
      {
        text: "Cats sleep for about 13-16 hours a day!",
        image: { src: "/images/placeholder/animal-cat.svg", alt: "A sleepy cat" },
        audio: silence,
      },
      {
        text: "Fish breathe underwater using gills instead of lungs.",
        image: { src: "/images/placeholder/animal-fish.svg", alt: "A fish" },
        audio: silence,
      },
      {
        text: "A dog's sense of smell is about 40 times better than yours!",
        image: { src: "/images/placeholder/animal-dog.svg", alt: "A dog sniffing" },
        audio: silence,
      },
    ],
    quiz: {
      prompt: "Which animal breathes with gills?",
      choices: [
        { id: "a", label: "Fish", isCorrect: true },
        { id: "b", label: "Dog", isCorrect: false },
        { id: "c", label: "Cat", isCorrect: false },
      ],
    },
  },
  {
    id: "weather",
    title: "Wild Weather",
    heroImage: { src: "/images/placeholder/science-weather.svg", alt: "Wild weather" },
    previewImages: [
      { src: "/images/placeholder/science-weather.svg", alt: "Clouds" },
      { src: "/images/placeholder/science-rainbow.svg", alt: "Rainbow" },
    ],
    tier: "earlyElementary",
    facts: [
      {
        text: "Rainbows appear when sunlight passes through raindrops.",
        image: { src: "/images/placeholder/science-rainbow.svg", alt: "A rainbow" },
        audio: silence,
      },
      {
        text: "Clouds are made of tiny water droplets floating in the sky.",
        image: { src: "/images/placeholder/science-weather.svg", alt: "Clouds" },
        audio: silence,
      },
    ],
    quiz: {
      prompt: "What makes a rainbow appear?",
      choices: [
        { id: "a", label: "Sunlight + rain", isCorrect: true },
        { id: "b", label: "Wind", isCorrect: false },
        { id: "c", label: "Snow", isCorrect: false },
      ],
    },
  },
  {
    id: "space",
    title: "Out in Space",
    heroImage: { src: "/images/placeholder/science-space.svg", alt: "Out in space" },
    previewImages: [
      { src: "/images/placeholder/science-space.svg", alt: "Rocket" },
      { src: "/images/placeholder/science-planet.svg", alt: "Planet" },
    ],
    tier: "elementary",
    facts: [
      {
        text: "The Sun is a giant star at the center of our solar system.",
        image: { src: "/images/placeholder/science-planet.svg", alt: "The sun and planets" },
        audio: silence,
      },
      {
        text: "A rocket needs incredible speed to escape Earth's gravity!",
        image: { src: "/images/placeholder/science-space.svg", alt: "A rocket launching" },
        audio: silence,
      },
    ],
    quiz: {
      prompt: "What is at the center of our solar system?",
      choices: [
        { id: "a", label: "The Moon", isCorrect: false },
        { id: "b", label: "The Sun", isCorrect: true },
        { id: "c", label: "Earth", isCorrect: false },
      ],
    },
  },
];

import type { Ebook } from "./types";

const silence = { src: "/audio/placeholder/silence.wav" };

export const ebooks: Ebook[] = [
  {
    id: "the-hungry-cat",
    title: "The Hungry Cat",
    coverImage: { src: "/images/generated/ebook-hungry-cat-cover.png", alt: "The Hungry Cat cover" },
    tier: "preschool",
    free: true,
    pages: [
      {
        pageNumber: 1,
        text: "Once there was a hungry cat.",
        illustration: { src: "/images/generated/animal-cat.png", alt: "A hungry cat" },
        audio: silence,
      },
      {
        pageNumber: 2,
        text: "The cat looked for food everywhere.",
        illustration: { src: "/images/generated/animal-cat.png", alt: "The cat searching" },
        audio: silence,
      },
      {
        pageNumber: 3,
        text: "She found a red apple on the table.",
        illustration: { src: "/images/generated/fruit-apple.png", alt: "A red apple" },
        audio: silence,
      },
      {
        pageNumber: 4,
        text: "The cat ate the apple and felt happy.",
        illustration: { src: "/images/generated/animal-cat.png", alt: "A happy cat" },
        audio: silence,
      },
    ],
  },
  {
    id: "a-day-with-friends",
    title: "A Day With Friends",
    coverImage: { src: "/images/placeholder/book-cover-b.svg", alt: "A Day With Friends cover" },
    tier: "earlyElementary",
    pages: [
      {
        pageNumber: 1,
        text: "The dog and the fish were best friends.",
        illustration: { src: "/images/placeholder/animal-dog.svg", alt: "A dog and a fish" },
        audio: silence,
      },
      {
        pageNumber: 2,
        text: "They played together every single day.",
        illustration: { src: "/images/placeholder/animal-fish.svg", alt: "Playing together" },
        audio: silence,
      },
      {
        pageNumber: 3,
        text: "One day they shared a bunch of grapes.",
        illustration: { src: "/images/placeholder/fruit-grapes.svg", alt: "A bunch of grapes" },
        audio: silence,
      },
    ],
  },
];

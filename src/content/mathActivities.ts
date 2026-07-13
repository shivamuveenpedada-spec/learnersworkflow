import type { MathActivitySet } from "./types";

const star = { src: "/images/placeholder/math-star.svg", alt: "A star" };
const balloon = { src: "/images/placeholder/math-balloon.svg", alt: "A balloon" };
const ball = { src: "/images/placeholder/math-ball.svg", alt: "A ball" };

export const mathActivitySets: MathActivitySet[] = [
  {
    id: "counting-to-5",
    title: "Counting to 5",
    tier: "preschool",
    type: "counting",
    free: true,
    problems: [
      {
        id: "c1",
        prompt: "How many stars do you see?",
        promptImage: star,
        promptItemCount: 3,
        choices: [
          { id: "a", label: "2", isCorrect: false },
          { id: "b", label: "3", isCorrect: true },
          { id: "c", label: "4", isCorrect: false },
        ],
      },
      {
        id: "c2",
        prompt: "How many balloons do you see?",
        promptImage: balloon,
        promptItemCount: 5,
        choices: [
          { id: "a", label: "4", isCorrect: false },
          { id: "b", label: "5", isCorrect: true },
          { id: "c", label: "6", isCorrect: false },
        ],
      },
    ],
  },
  {
    id: "simple-addition",
    title: "Simple Addition",
    tier: "earlyElementary",
    type: "addition",
    problems: [
      {
        id: "a1",
        prompt: "2 balls + 1 ball = ?",
        promptImage: ball,
        choices: [
          { id: "a", label: "2", isCorrect: false },
          { id: "b", label: "3", isCorrect: true },
          { id: "c", label: "4", isCorrect: false },
        ],
      },
      {
        id: "a2",
        prompt: "3 stars + 2 stars = ?",
        promptImage: star,
        choices: [
          { id: "a", label: "5", isCorrect: true },
          { id: "b", label: "6", isCorrect: false },
          { id: "c", label: "4", isCorrect: false },
        ],
      },
    ],
  },
];

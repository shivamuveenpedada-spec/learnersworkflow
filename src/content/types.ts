export type DifficultyTier = "preschool" | "earlyElementary" | "elementary";

export interface ImageAsset {
  src: string;
  alt: string;
}

export interface AudioAsset {
  src: string;
}

export interface PhonicsExampleWord {
  word: string;
  image: ImageAsset;
  audio: AudioAsset;
}

export interface PhonicsLetter {
  letter: string;
  sound: AudioAsset;
  exampleWords: PhonicsExampleWord[];
  tiers: DifficultyTier[];
  free?: boolean;
}

export type CategoryId = "animals" | "fruits" | "colors";

export interface Category {
  id: CategoryId;
  label: string;
  icon: string;
}

export interface CategoryItem {
  id: string;
  name: string;
  letter: string;
  category: CategoryId;
  image: ImageAsset;
  audio: AudioAsset;
  tiers: DifficultyTier[];
  free?: boolean;
}

export interface EbookPage {
  pageNumber: number;
  text: string;
  illustration: ImageAsset;
  audio?: AudioAsset;
}

export interface Ebook {
  id: string;
  title: string;
  coverImage: ImageAsset;
  tier: DifficultyTier;
  pages: EbookPage[];
  free?: boolean;
}

export type MathActivityType = "counting" | "addition" | "subtraction";

export interface MathChoice {
  id: string;
  label?: string;
  image?: ImageAsset;
  isCorrect: boolean;
}

export interface MathProblem {
  id: string;
  prompt: string;
  promptImage?: ImageAsset;
  promptItemCount?: number;
  choices: MathChoice[];
}

export interface MathActivitySet {
  id: string;
  title: string;
  tier: DifficultyTier;
  type: MathActivityType;
  problems: MathProblem[];
  free?: boolean;
}

export interface TraceItem {
  id: string;
  type: "letter" | "word";
  value: string;
  tier: DifficultyTier;
  free?: boolean;
}

export interface ScienceFact {
  text: string;
  image: ImageAsset;
  audio?: AudioAsset;
}

export interface ScienceQuizQuestion {
  prompt: string;
  choices: MathChoice[];
}

export interface ScienceTopic {
  id: string;
  title: string;
  heroImage: ImageAsset;
  previewImages: ImageAsset[];
  tier: DifficultyTier;
  facts: ScienceFact[];
  quiz?: ScienceQuizQuestion;
  free?: boolean;
}

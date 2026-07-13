import { alphabetItems } from "./alphabetItems";
import { categories } from "./categories";
import { ebooks } from "./ebooks";
import { mathActivitySets } from "./mathActivities";
import { phonicsLetters } from "./phonics";
import { scienceTopics } from "./scienceTopics";
import { tierLabels } from "./tiers";
import { traceItems } from "./traceItems";
import type { CategoryId, CategoryItem } from "./types";

export * from "./types";
export {
  categories,
  ebooks,
  phonicsLetters,
  mathActivitySets,
  traceItems,
  alphabetItems,
  scienceTopics,
  tierLabels,
};

export function getLettersWithItems(): string[] {
  const letters = new Set(alphabetItems.map((item) => item.letter));
  return Array.from(letters).sort();
}

export function getItemsByLetter(letter: string): Record<CategoryId, CategoryItem[]> {
  const upper = letter.toUpperCase();
  const grouped: Record<CategoryId, CategoryItem[]> = {
    animals: [],
    fruits: [],
    colors: [],
  };
  for (const item of alphabetItems) {
    if (item.letter.toUpperCase() === upper) {
      grouped[item.category].push(item);
    }
  }
  return grouped;
}

export function getEbookById(id: string) {
  return ebooks.find((book) => book.id === id);
}

export function getPhonicsLetter(letter: string) {
  return phonicsLetters.find((entry) => entry.letter.toUpperCase() === letter.toUpperCase());
}

export function getMathActivitySetById(id: string) {
  return mathActivitySets.find((set) => set.id === id);
}

export function getTraceItemById(id: string) {
  return traceItems.find((item) => item.id === id);
}

export function getScienceTopicById(id: string) {
  return scienceTopics.find((topic) => topic.id === id);
}

export const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

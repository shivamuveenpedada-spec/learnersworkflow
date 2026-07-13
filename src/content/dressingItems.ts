export type ClothingSlot = "head" | "top" | "bottom" | "feet";

export interface DressingItem {
  id: string;
  slot: ClothingSlot;
  label: string;
  emoji: string;
}

export const dressingItems: DressingItem[] = [
  { id: "hat", slot: "head", label: "Hat", emoji: "🧢" },
  { id: "shirt", slot: "top", label: "Shirt", emoji: "👕" },
  { id: "shorts", slot: "bottom", label: "Shorts", emoji: "🩳" },
  { id: "shoes", slot: "feet", label: "Shoes", emoji: "👟" },
];

export const slotLabels: Record<ClothingSlot, string> = {
  head: "Head",
  top: "Top",
  bottom: "Bottom",
  feet: "Feet",
};

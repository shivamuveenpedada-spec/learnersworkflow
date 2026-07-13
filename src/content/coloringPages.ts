export interface ColoringRegion {
  id: string;
  d: string;
}

export interface ColoringPage {
  id: string;
  title: string;
  viewBox: string;
  regions: ColoringRegion[];
  outline: string; // drawn on top, un-fillable line art
}

export const coloringPages: ColoringPage[] = [
  {
    id: "happy-sun",
    title: "Happy Sun",
    viewBox: "0 0 200 200",
    regions: [
      { id: "sun-face", d: "M100,60 a40,40 0 1,0 0.1,0 Z" },
      { id: "ray-1", d: "M100,10 L108,35 L92,35 Z" },
      { id: "ray-2", d: "M155,30 L138,50 L128,36 Z" },
      { id: "ray-3", d: "M190,100 L165,108 L165,92 Z" },
      { id: "ray-4", d: "M155,170 L138,150 L152,140 Z" },
      { id: "ray-5", d: "M100,190 L108,165 L92,165 Z" },
      { id: "ray-6", d: "M45,170 L62,150 L48,140 Z" },
      { id: "ray-7", d: "M10,100 L35,108 L35,92 Z" },
      { id: "ray-8", d: "M45,30 L62,50 L72,36 Z" },
    ],
    outline:
      "M100,60 a40,40 0 1,0 0.1,0 Z M85,90 a5,5 0 1,0 0.1,0 Z M115,90 a5,5 0 1,0 0.1,0 Z M85,105 q15,15 30,0",
  },
  {
    id: "flower",
    title: "Flower",
    viewBox: "0 0 200 200",
    regions: [
      { id: "petal-1", d: "M100,100 C80,60 80,20 100,20 C120,20 120,60 100,100 Z" },
      { id: "petal-2", d: "M100,100 C140,80 180,80 180,100 C180,120 140,120 100,100 Z" },
      { id: "petal-3", d: "M100,100 C120,140 120,180 100,180 C80,180 80,140 100,100 Z" },
      { id: "petal-4", d: "M100,100 C60,120 20,120 20,100 C20,80 60,80 100,100 Z" },
      { id: "center", d: "M100,100 a18,18 0 1,0 0.1,0 Z" },
      { id: "stem", d: "M96,118 L104,118 L104,180 L96,180 Z" },
      { id: "leaf", d: "M96,150 C70,150 60,170 60,180 C85,180 96,165 96,150 Z" },
    ],
    outline: "M96,118 L104,118 L104,180 L96,180 Z",
  },
  {
    id: "fish",
    title: "Fish",
    viewBox: "0 0 200 200",
    regions: [
      { id: "body", d: "M40,100 C40,60 150,50 170,100 C150,150 40,140 40,100 Z" },
      { id: "tail", d: "M40,100 L10,70 L10,130 Z" },
      { id: "fin", d: "M90,90 L110,60 L120,90 Z" },
      { id: "eye", d: "M145,90 a7,7 0 1,0 0.1,0 Z" },
    ],
    outline: "M145,90 a7,7 0 1,0 0.1,0 Z",
  },
];

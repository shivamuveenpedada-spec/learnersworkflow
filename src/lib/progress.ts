export interface ProgressState {
  ebooks: Record<string, { lastPage: number; completed: boolean }>;
  phonics: Record<string, { visited: boolean }>;
  alphabet: Record<string, { visited: boolean }>;
  math: Record<string, { bestStars: number; completed: boolean }>;
  writing: Record<string, { practiced: boolean }>;
}

export const emptyProgress: ProgressState = {
  ebooks: {},
  phonics: {},
  alphabet: {},
  math: {},
  writing: {},
};

const STORAGE_KEY = "kidedu:progress:v1";

export function loadProgress(): ProgressState {
  if (typeof window === "undefined") return emptyProgress;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return emptyProgress;
    return { ...emptyProgress, ...JSON.parse(raw) };
  } catch {
    return emptyProgress;
  }
}

export function saveProgress(state: ProgressState) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

"use client";

import { useCallback, useEffect, useState } from "react";
import { emptyProgress, loadProgress, saveProgress, type ProgressState } from "./progress";

export function useProgress() {
  const [progress, setProgress] = useState<ProgressState>(emptyProgress);

  useEffect(() => {
    setProgress(loadProgress());
  }, []);

  const update = useCallback((updater: (prev: ProgressState) => ProgressState) => {
    setProgress((prev) => {
      const next = updater(prev);
      saveProgress(next);
      return next;
    });
  }, []);

  return { progress, update };
}

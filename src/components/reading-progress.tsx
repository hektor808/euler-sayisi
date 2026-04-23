"use client";

import { useEffect, useState } from "react";

export function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const height =
        document.documentElement.scrollHeight - window.innerHeight || 1;
      setProgress(Math.min(1, Math.max(0, window.scrollY / height)));
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div
      className="fixed left-0 top-0 z-[80] h-1 bg-[linear-gradient(90deg,var(--accent),var(--accent-2),var(--accent-3))]"
      style={{ width: `${progress * 100}%` }}
      aria-hidden="true"
    />
  );
}

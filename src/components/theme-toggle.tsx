"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      aria-label={isDark ? "Açık temaya geç" : "Koyu temaya geç"}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[color:var(--line)] bg-[color:var(--surface)] text-[color:var(--text)] shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-[color:var(--accent)] hover:text-[color:var(--accent)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[color:var(--accent)]"
    >
      {isDark ? <Sun aria-hidden size={18} /> : <Moon aria-hidden size={18} />}
    </button>
  );
}

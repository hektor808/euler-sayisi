"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      aria-label={isDark ? "Açık temaya geç" : "Koyu temaya geç"}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={cn(
        "inline-flex h-10 w-10 items-center justify-center rounded-[14px] border border-[color:var(--header-border-strong)] bg-[color:var(--utility-bg)] text-[color:var(--nav-text)] shadow-[0_6px_16px_rgba(0,0,0,0.22)] transition duration-200 hover:-translate-y-0.5 hover:border-[color:var(--header-border-highlight)] hover:text-[color:var(--nav-text-active)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[color:var(--accent)] active:translate-y-0",
        className,
      )}
    >
      {isDark ? <Sun aria-hidden size={18} /> : <Moon aria-hidden size={18} />}
    </button>
  );
}

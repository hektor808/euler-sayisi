"use client";

import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { navItems } from "@/lib/content";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./theme-toggle";

export function SiteNavigation() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(navItems[0]?.id ?? "");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target.id) setActive(visible.target.id);
      },
      { rootMargin: "-20% 0px -65% 0px", threshold: [0.1, 0.25, 0.5] },
    );

    navItems.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-[color:var(--line)] bg-[color:var(--nav-bg)] backdrop-blur-xl">
      <a
        href="#icerik"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[90] focus:rounded-[8px] focus:bg-[color:var(--accent)] focus:px-4 focus:py-3 focus:text-white"
      >
        Ana içeriğe geç
      </a>
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <a
          href="#ust"
          className="group inline-flex items-center gap-3 rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[color:var(--accent)]"
          aria-label="Sayfanın başına dön"
        >
          <span className="grid h-11 w-11 place-items-center rounded-full border border-[color:var(--line)] bg-[color:var(--surface)] font-display text-2xl text-[color:var(--accent)] shadow-sm">
            e
          </span>
          <span className="hidden sm:block">
            <span className="block font-display text-lg text-[color:var(--text)]">
              Euler Sayısı
            </span>
            <span className="block text-xs font-semibold uppercase text-[color:var(--muted)]">
              Doğal Sabit
            </span>
          </span>
        </a>

        <div className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-semibold text-[color:var(--muted)] transition duration-200 hover:bg-[color:var(--surface-strong)] hover:text-[color:var(--text)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--accent)]",
                active === item.id &&
                  "bg-[color:var(--accent-soft)] text-[color:var(--accent-strong)]",
              )}
            >
              {item.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[color:var(--line)] bg-[color:var(--surface)] text-[color:var(--text)] transition duration-200 hover:border-[color:var(--accent)] lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-navigation"
            aria-label={open ? "Menüyü kapat" : "Menüyü aç"}
          >
            {open ? <X aria-hidden size={20} /> : <Menu aria-hidden size={20} />}
          </button>
        </div>
      </nav>

      <div
        id="mobile-navigation"
        className={cn(
          "grid border-t border-[color:var(--line)] transition-[grid-template-rows] duration-300 lg:hidden",
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        )}
      >
        <div className="overflow-hidden">
          <div className="mx-auto grid max-w-7xl gap-2 px-4 py-4 sm:px-6">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={() => setOpen(false)}
                className={cn(
                  "rounded-[8px] px-4 py-3 text-sm font-semibold text-[color:var(--muted)] transition duration-200 hover:bg-[color:var(--surface-strong)] hover:text-[color:var(--text)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--accent)]",
                  active === item.id &&
                    "bg-[color:var(--accent-soft)] text-[color:var(--accent-strong)]",
                )}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}

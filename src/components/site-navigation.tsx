"use client";

import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { navItems } from "@/lib/content";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./theme-toggle";

export function SiteNavigation() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(navItems[0]?.id ?? "");
  const [isCompact, setIsCompact] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target.id) setActive(visible.target.id);
      },
      { rootMargin: "-20% 0px -62% 0px", threshold: [0.1, 0.22, 0.45] },
    );

    navItems.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onScroll = () => setIsCompact(window.scrollY > 18);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;

    const onEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    window.addEventListener("keydown", onEscape);
    return () => window.removeEventListener("keydown", onEscape);
  }, [open]);

  return (
    <header className="pointer-events-none sticky top-0 z-50 pt-4 sm:pt-5">
      <a
        href="#icerik"
        className="sr-only pointer-events-auto focus:not-sr-only focus:absolute focus:left-4 focus:top-5 focus:z-[90] focus:rounded-[10px] focus:bg-[color:var(--accent)] focus:px-4 focus:py-3 focus:text-white"
      >
        Ana içeriğe geç
      </a>

      <div className="mx-auto w-[min(var(--header-max-width),calc(100vw-1.5rem))] sm:w-[min(var(--header-max-width),calc(100vw-3rem))]">
        <nav
          aria-label="Ana gezinme"
          className={cn(
            "pointer-events-auto relative isolate rounded-[var(--header-radius)] border border-[color:var(--header-border)] bg-[color:var(--header-bg)] px-4 py-2.5 shadow-[var(--header-shadow-1),var(--header-shadow-2),var(--header-shadow-3)] backdrop-blur-[var(--header-blur)] transition-[padding,transform,border-color,box-shadow,background-color] duration-300 ease-[cubic-bezier(0.2,0.75,0.25,1)] before:pointer-events-none before:absolute before:inset-[1px] before:rounded-[calc(var(--header-radius)-1px)] before:border before:border-t-[color:var(--header-border-highlight)] before:border-x-transparent before:border-b-transparent before:content-[''] lg:px-6",
            "header-island",
            isCompact &&
              "translate-y-[-2px] border-[color:var(--header-border-strong)] py-2 shadow-[var(--header-shadow-1),var(--header-shadow-2)]",
          )}
        >
          <div className="pointer-events-none absolute inset-x-14 inset-y-[34%] -z-10 h-8 rounded-full bg-[radial-gradient(closest-side,var(--header-glow),transparent_76%)]" />

          <div className="grid min-h-[var(--header-height)] grid-cols-[1fr_auto] items-center gap-2 md:grid-cols-[auto_1fr_auto] md:gap-4">
            <a
              href="#ust"
              className="group pointer-events-auto inline-flex min-w-0 items-center gap-3 rounded-[15px] px-1 py-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[color:var(--accent)]"
              aria-label="Sayfanın başına dön"
            >
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-[13px] border border-[color:var(--header-border-strong)] bg-[linear-gradient(155deg,var(--surface)_0%,var(--surface-strong)_100%)] font-display text-[1.5rem] leading-none text-[color:var(--accent)] shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_8px_18px_rgba(0,0,0,0.22)] transition-transform duration-200 group-hover:-translate-y-0.5">
                e
              </span>
              <span className="min-w-0">
                <span className="block truncate font-display text-[0.98rem] leading-tight text-[color:var(--brand-title)] sm:text-[1.02rem]">
                  Euler Sayısı
                </span>
                <span className="block truncate text-[10px] font-semibold uppercase tracking-[0.22em] text-[color:var(--brand-subtitle)] sm:text-[11px]">
                  Doğal Sabit
                </span>
              </span>
            </a>

            <ul className="hidden items-center justify-center gap-[var(--nav-gap)] md:flex" role="list">
              {navItems.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    aria-current={active === item.id ? "page" : undefined}
                    className={cn(
                      "pointer-events-auto inline-flex min-h-10 items-center rounded-[var(--nav-item-radius)] border border-transparent px-3.5 py-2 text-[0.88rem] font-semibold text-[color:var(--nav-text)] transition-[color,background-color,border-color,transform] duration-200 ease-[cubic-bezier(0.2,0.72,0.2,1)] hover:bg-[color:var(--nav-item-hover-bg)] hover:text-[color:var(--nav-text-active)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--accent)] active:translate-y-px lg:px-4",
                      active === item.id &&
                        "border-[color:var(--header-border-strong)] bg-[color:var(--nav-item-active-bg)] text-[color:var(--nav-text-active)] shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]",
                    )}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>

            <div className="ml-auto flex items-center gap-2">
              <ThemeToggle className="h-10 w-10 rounded-[13px]" />
              <button
                type="button"
                onClick={() => setOpen((value) => !value)}
                className="pointer-events-auto inline-flex h-10 w-10 items-center justify-center rounded-[13px] border border-[color:var(--header-border-strong)] bg-[color:var(--utility-bg)] text-[color:var(--nav-text)] shadow-[0_6px_16px_rgba(0,0,0,0.24)] transition duration-200 hover:text-[color:var(--nav-text-active)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[color:var(--accent)] md:hidden"
                aria-expanded={open}
                aria-controls="mobile-navigation"
                aria-label={open ? "Menüyü kapat" : "Menüyü aç"}
              >
                {open ? <X aria-hidden size={19} /> : <Menu aria-hidden size={19} />}
              </button>
            </div>
          </div>

          <div
            id="mobile-navigation"
            className={cn(
              "grid transition-[grid-template-rows,opacity,margin] duration-300 ease-[cubic-bezier(0.2,0.75,0.2,1)] md:hidden",
              open
                ? "mt-2 grid-rows-[1fr] opacity-100"
                : "mt-0 grid-rows-[0fr] opacity-0",
            )}
          >
            <div className="overflow-hidden">
              <div className="rounded-[18px] border border-[color:var(--header-border)] bg-[color:var(--mobile-sheet-bg)] p-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]">
                <ul className="grid gap-1" role="list">
                  {navItems.map((item) => (
                    <li key={item.id}>
                      <a
                        href={`#${item.id}`}
                        onClick={() => setOpen(false)}
                        aria-current={active === item.id ? "page" : undefined}
                        className={cn(
                          "pointer-events-auto flex min-h-11 items-center rounded-[12px] px-3.5 py-2.5 text-sm font-semibold text-[color:var(--nav-text)] transition duration-200 hover:bg-[color:var(--nav-item-hover-bg)] hover:text-[color:var(--nav-text-active)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--accent)]",
                          active === item.id &&
                            "border border-[color:var(--header-border-strong)] bg-[color:var(--nav-item-active-bg)] text-[color:var(--nav-text-active)]",
                        )}
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}

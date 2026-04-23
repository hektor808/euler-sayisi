"use client";

import {
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "framer-motion";
import { ArrowDown, Beaker, BookOpen, MoveRight } from "lucide-react";
import { useEffect } from "react";
import { MathInline } from "@/components/math-render";
import { projectMeta } from "@/lib/content";
import { EULER_NUMBER } from "@/lib/math";

function AnimatedEValue() {
  const reduceMotion = useReducedMotion();
  const value = useMotionValue(reduceMotion ? EULER_NUMBER : 2.2);
  const rounded = useTransform(value, (latest) => latest.toFixed(12));

  useEffect(() => {
    if (reduceMotion) return;
    const controls = animate(value, EULER_NUMBER, {
      duration: 1.8,
      ease: [0.22, 1, 0.36, 1],
    });
    return controls.stop;
  }, [reduceMotion, value]);

  return (
    <motion.span className="font-mono text-[clamp(2.6rem,8vw,7.5rem)] leading-none text-[color:var(--text)]">
      {rounded}
    </motion.span>
  );
}

function HeroConstellation() {
  const formulas = [
    "e^x",
    "\\ln x",
    "\\sum 1/k!",
    "\\lim",
    "y'=y",
    "e^{i\\pi}+1=0",
  ];

  return (
    <div className="relative min-h-[430px] overflow-hidden rounded-[8px] border border-[color:var(--line)] bg-[color:var(--hero-panel)] p-5 shadow-[var(--shadow-deep)]">
      <div className="absolute inset-0 hero-grid opacity-70" aria-hidden="true" />
      <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[color:var(--line-strong)]" />
      <div className="absolute left-1/2 top-1/2 h-44 w-44 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[color:var(--line)]" />
      <motion.div
        className="absolute left-1/2 top-1/2 grid h-36 w-36 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-[color:var(--accent)] bg-[color:var(--surface)] shadow-[0_0_80px_rgba(13,138,106,0.24)]"
        animate={{ rotate: 360 }}
        transition={{ duration: 38, repeat: Infinity, ease: "linear" }}
      >
        <span className="font-display text-7xl text-[color:var(--accent)]">
          e
        </span>
      </motion.div>
      {formulas.map((formula, index) => {
        const angle = (index / formulas.length) * Math.PI * 2;
        const radius = index % 2 === 0 ? 150 : 105;
        const x = Number((Math.cos(angle) * radius).toFixed(3));
        const y = Number((Math.sin(angle) * radius).toFixed(3));

        return (
          <motion.div
            key={formula}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[color:var(--line)] bg-[color:var(--surface-glass)] px-3 py-2 text-sm text-[color:var(--text)] shadow-sm backdrop-blur"
            style={{
              marginLeft: x,
              marginTop: y,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15 + index * 0.08, duration: 0.5 }}
          >
            <MathInline math={formula} />
          </motion.div>
        );
      })}
      <svg
        className="absolute inset-x-6 bottom-8 h-24 w-[calc(100%-3rem)] text-[color:var(--accent-2)]"
        viewBox="0 0 500 120"
        role="img"
        aria-label="Üstel büyüme eğrisini gösteren çizgi"
      >
        <path
          d="M10 104 C 110 100, 180 86, 260 58 S 405 8, 490 12"
          fill="none"
          stroke="currentColor"
          strokeWidth="5"
          strokeLinecap="round"
        />
        <path
          d="M10 104 C 110 100, 180 86, 260 58 S 405 8, 490 12"
          fill="none"
          stroke="white"
          strokeOpacity="0.35"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}

export function Hero() {
  return (
    <section
      id="ust"
      className="relative isolate overflow-hidden px-4 pb-24 pt-16 sm:px-6 sm:pb-28 lg:px-8 lg:pt-24"
    >
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_15%_15%,var(--hero-glow),transparent_34%),radial-gradient(circle_at_88%_10%,var(--hero-glow-2),transparent_30%)]" />
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="min-w-0"
        >
          <div className="mb-7 inline-flex rounded-full border border-[color:var(--line)] bg-[color:var(--surface)] px-4 py-2 text-sm font-semibold text-[color:var(--accent-strong)] shadow-sm">
            11. sınıf matematik projesi için premium etkileşimli anlatım
          </div>
          <h1 className="max-w-4xl break-words font-display text-[clamp(2.85rem,8vw,8.4rem)] leading-[0.95] text-[color:var(--text)]">
            Euler Sayısı: Matematiğin Doğal Sabiti
          </h1>
          <p className="mt-8 max-w-2xl text-xl leading-9 text-[color:var(--muted)]">
            e&apos;nin hikâyesi; sürekli büyüme, doğal logaritma, türevler,
            sonsuz seriler ve gerçek hayat modelleri arasında sessizce kurulan
            güçlü bir köprüdür.
          </p>

          <div className="mt-9 flex max-w-full flex-col gap-3 sm:flex-row">
            <a
              href="#laboratuvar"
              className="inline-flex min-h-12 w-full max-w-full items-center justify-center gap-2 rounded-full bg-[color:var(--accent)] px-6 py-3 font-bold text-white shadow-[var(--shadow-accent)] transition duration-200 hover:-translate-y-0.5 hover:bg-[color:var(--accent-hover)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[color:var(--accent)] sm:w-auto"
            >
              <Beaker aria-hidden size={18} />
              Deneyleri Aç
              <ArrowDown aria-hidden size={18} />
            </a>
            <a
              href="#matematik"
              className="inline-flex min-h-12 w-full max-w-full items-center justify-center gap-2 rounded-full border border-[color:var(--line)] bg-[color:var(--surface)] px-6 py-3 font-bold text-[color:var(--text)] shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-[color:var(--accent)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[color:var(--accent)] sm:w-auto"
            >
              <BookOpen aria-hidden size={18} />
              Formülleri İncele
              <MoveRight aria-hidden size={18} />
            </a>
          </div>

          <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:max-w-2xl">
            {projectMeta.map(([label, value]) => (
              <div
                key={label}
                className="rounded-[8px] border border-[color:var(--line)] bg-[color:var(--surface-glass)] p-4 backdrop-blur"
              >
                <p className="text-xs font-bold uppercase text-[color:var(--muted)]">
                  {label}
                </p>
                <p className="mt-1 font-semibold text-[color:var(--text)]">
                  {value}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="min-w-0 space-y-5"
        >
          <div className="rounded-[8px] border border-[color:var(--line)] bg-[color:var(--surface)] p-5 shadow-[var(--shadow-soft)]">
            <p className="mb-3 text-sm font-bold uppercase text-[color:var(--muted)]">
              Yaklaşık değer
            </p>
            <AnimatedEValue />
            <p className="mt-3 leading-7 text-[color:var(--muted)]">
              Ondalık açılım sonsuza kadar sürer ve tekrar eden bir düzen
              oluşturmaz.
            </p>
          </div>
          <HeroConstellation />
        </motion.div>
      </div>
    </section>
  );
}

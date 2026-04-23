"use client";

import { Check, Clipboard } from "lucide-react";
import { useState } from "react";
import { MathBlock } from "@/components/math-render";
import { cn } from "@/lib/utils";

type FormulaCardProps = {
  title: string;
  tag: string;
  formula: string;
  body: string;
  insight: string;
  className?: string;
};

export function FormulaCard({
  title,
  tag,
  formula,
  body,
  insight,
  className,
}: FormulaCardProps) {
  const [copied, setCopied] = useState(false);

  async function copyFormula() {
    await navigator.clipboard.writeText(formula);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  }

  return (
    <article
      className={cn(
        "group flex h-full flex-col rounded-[8px] border border-[color:var(--line)] bg-[color:var(--surface)] p-5 shadow-[var(--shadow-soft)] transition duration-300 hover:-translate-y-1 hover:border-[color:var(--accent)]",
        className,
      )}
    >
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <p className="mb-2 text-xs font-bold uppercase text-[color:var(--accent)]">
            {tag}
          </p>
          <h3 className="font-display text-2xl text-[color:var(--text)]">
            {title}
          </h3>
        </div>
        <button
          type="button"
          onClick={copyFormula}
          className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[color:var(--line)] text-[color:var(--muted)] transition duration-200 hover:border-[color:var(--accent)] hover:text-[color:var(--accent)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[color:var(--accent)]"
          aria-label={`${title} formülünü kopyala`}
        >
          {copied ? (
            <Check aria-hidden size={18} />
          ) : (
            <Clipboard aria-hidden size={18} />
          )}
        </button>
      </div>
      <div className="mb-5 overflow-x-auto rounded-[8px] border border-[color:var(--line)] bg-[color:var(--formula-bg)] px-4 py-5 text-[color:var(--text)]">
        <MathBlock math={formula} />
      </div>
      <p className="leading-7 text-[color:var(--muted)]">{body}</p>
      <p className="mt-4 rounded-[8px] border border-[color:var(--line)] bg-[color:var(--surface-strong)] p-4 text-sm leading-6 text-[color:var(--text)]">
        {insight}
      </p>
    </article>
  );
}

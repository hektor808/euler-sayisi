import katex from "katex";

type MathRenderProps = {
  math: string;
  label?: string;
};

function render(math: string, displayMode: boolean) {
  return katex.renderToString(math, {
    displayMode,
    strict: "ignore",
    throwOnError: false,
  });
}

export function MathInline({ math, label }: MathRenderProps) {
  return (
    <span
      aria-label={label ?? math}
      dangerouslySetInnerHTML={{ __html: render(math, false) }}
    />
  );
}

export function MathBlock({ math, label }: MathRenderProps) {
  return (
    <div
      aria-label={label ?? math}
      dangerouslySetInnerHTML={{ __html: render(math, true) }}
    />
  );
}

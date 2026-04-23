export const EULER_NUMBER = Math.E;

export function limitApproximation(n: number) {
  const safeN = Math.max(1, Math.round(n));
  return (1 + 1 / safeN) ** safeN;
}

export function compoundAmount(
  principal: number,
  annualRatePercent: number,
  years: number,
  compoundsPerYear: number,
) {
  const rate = annualRatePercent / 100;
  return principal * (1 + rate / compoundsPerYear) ** (compoundsPerYear * years);
}

export function continuousAmount(
  principal: number,
  annualRatePercent: number,
  years: number,
) {
  const rate = annualRatePercent / 100;
  return principal * Math.exp(rate * years);
}

export function factorial(n: number): number {
  if (n <= 1) return 1;
  let value = 1;
  for (let i = 2; i <= n; i += 1) value *= i;
  return value;
}

export function expTaylorPartial(x: number, terms: number) {
  const count = Math.max(1, Math.round(terms));
  let sum = 0;
  const rows = [];

  for (let k = 0; k < count; k += 1) {
    const term = x ** k / factorial(k);
    sum += term;
    rows.push({
      k,
      term,
      partial: sum,
    });
  }

  return { sum, rows };
}

export function formatDecimal(value: number, digits = 6) {
  return new Intl.NumberFormat("tr-TR", {
    maximumFractionDigits: digits,
    minimumFractionDigits: Math.min(2, digits),
  }).format(value);
}

export function formatCurrency(value: number) {
  return new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency: "TRY",
    maximumFractionDigits: 0,
  }).format(value);
}

export function makeExpLnGraphData() {
  const data = [];
  for (let x = -3; x <= 4.0001; x += 0.25) {
    const positiveX = x > 0 ? x : null;
    data.push({
      x: Number(x.toFixed(2)),
      exp: Number(Math.exp(x).toFixed(4)),
      ln: positiveX ? Number(Math.log(positiveX).toFixed(4)) : null,
      inverseLine: Number(x.toFixed(4)),
    });
  }
  return data;
}

export function makeGrowthData(
  initial: number,
  annualRatePercent: number,
  years: number,
  mode: "growth" | "decay",
) {
  const rate = annualRatePercent / 100;
  const sign = mode === "growth" ? 1 : -1;
  const points = [];
  const steps = 32;

  for (let i = 0; i <= steps; i += 1) {
    const t = (years * i) / steps;
    points.push({
      t: Number(t.toFixed(2)),
      value: Number((initial * Math.exp(sign * rate * t)).toFixed(3)),
    });
  }

  return points;
}

"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ReferenceLine,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { CheckCircle2, Circle, RotateCcw } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { MathInline } from "@/components/math-render";
import { quizQuestions } from "@/lib/content";
import {
  compoundAmount,
  continuousAmount,
  EULER_NUMBER,
  expTaylorPartial,
  formatCurrency,
  formatDecimal,
  limitApproximation,
  makeExpLnGraphData,
  makeGrowthData,
} from "@/lib/math";
import { cn } from "@/lib/utils";

const expLnGraphData = makeExpLnGraphData();

type RangeControlProps = {
  id: string;
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  suffix?: string;
  onChange: (value: number) => void;
};

function RangeControl({
  id,
  label,
  value,
  min,
  max,
  step = 1,
  suffix,
  onChange,
}: RangeControlProps) {
  return (
    <label className="grid gap-2" htmlFor={id}>
      <span className="flex items-center justify-between gap-4 text-sm font-bold text-[color:var(--text)]">
        {label}
        <span className="font-mono text-[color:var(--accent-strong)]">
          {formatDecimal(value, step < 1 ? 2 : 0)}
          {suffix}
        </span>
      </span>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="h-11 w-full accent-[color:var(--accent)]"
      />
    </label>
  );
}

function LabCard({
  title,
  eyebrow,
  children,
  className,
}: {
  title: string;
  eyebrow: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <article
      className={cn(
        "rounded-[8px] border border-[color:var(--line)] bg-[color:var(--surface)] p-5 shadow-[var(--shadow-soft)] sm:p-6",
        className,
      )}
    >
      <p className="mb-2 text-xs font-bold uppercase text-[color:var(--accent)]">
        {eyebrow}
      </p>
      <h3 className="font-display text-2xl text-[color:var(--text)] sm:text-3xl">
        {title}
      </h3>
      {children}
    </article>
  );
}

function ChartFrame({
  children,
  label,
}: {
  children: (size: { width: number; height: number }) => React.ReactNode;
  label: string;
}) {
  const frameRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const element = frameRef.current;
    if (!element) return undefined;

    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setSize({
        width: Math.max(1, Math.floor(width)),
        height: Math.max(1, Math.floor(height)),
      });
    });

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      role="img"
      aria-label={label}
      className="mt-5 h-72 rounded-[8px] border border-[color:var(--line)] bg-[color:var(--chart-bg)] p-3"
    >
      <div ref={frameRef} className="h-full w-full">
        {size.width > 0 && size.height > 0 ? (
          children(size)
        ) : (
          <div className="grid h-full place-items-center text-sm font-semibold text-[color:var(--muted)]">
            Grafik hazırlanıyor
          </div>
        )}
      </div>
    </div>
  );
}

function tooltipStyle() {
  return {
    background: "var(--surface)",
    border: "1px solid var(--line)",
    borderRadius: 8,
    color: "var(--text)",
    boxShadow: "var(--shadow-soft)",
  };
}

function decimalTooltip(digits: number) {
  return (value: unknown) =>
    typeof value === "number" ? formatDecimal(value, digits) : String(value ?? "");
}

function currencyTooltip(value: unknown) {
  return typeof value === "number" ? formatCurrency(value) : String(value ?? "");
}

function LimitExperiment() {
  const [n, setN] = useState(250);
  const value = limitApproximation(n);
  const error = Math.abs(EULER_NUMBER - value);
  const points = [1, 2, 3, 5, 10, 20, 50, 100, 250, 500, 1000, n]
    .filter((item, index, array) => array.indexOf(item) === index)
    .sort((a, b) => a - b);
  const data = points.map((item) => ({
    n: item,
    yaklasim: Number(limitApproximation(item).toFixed(7)),
    e: Number(EULER_NUMBER.toFixed(7)),
  }));

  return (
    <LabCard title="Limit Yakınsaması" eyebrow="Deney 01">
      <p className="mt-4 leading-7 text-[color:var(--muted)]">
        <MathInline math="(1+1/n)^n" /> ifadesinde n arttıkça kesikli
        bileşikleşme sürekli büyümeye yaklaşır.
      </p>
      <div className="mt-5 grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="space-y-5 rounded-[8px] border border-[color:var(--line)] bg-[color:var(--surface-strong)] p-4">
          <RangeControl
            id="limit-n"
            label="n değeri"
            min={1}
            max={5000}
            value={n}
            onChange={setN}
          />
          <div className="grid gap-3">
            <div>
              <p className="text-sm font-bold text-[color:var(--muted)]">
                Yaklaşım
              </p>
              <p className="font-mono text-3xl text-[color:var(--text)]">
                {formatDecimal(value, 9)}
              </p>
            </div>
            <div>
              <p className="text-sm font-bold text-[color:var(--muted)]">
                e&apos;ye uzaklık
              </p>
              <p className="font-mono text-xl text-[color:var(--accent-strong)]">
                {formatDecimal(error, 9)}
              </p>
            </div>
          </div>
        </div>
        <ChartFrame label="n arttıkça limit ifadesinin e'ye yaklaşım grafiği">
          {({ width, height }) => (
            <LineChart
              width={width}
              height={height}
              data={data}
              margin={{ left: 0, right: 10, top: 10 }}
            >
              <CartesianGrid stroke="var(--grid)" strokeDasharray="4 4" />
              <XAxis dataKey="n" stroke="var(--muted)" />
              <YAxis
                domain={[2, 2.8]}
                stroke="var(--muted)"
                tickFormatter={(tick) => tick.toFixed(2)}
              />
              <Tooltip
                contentStyle={tooltipStyle()}
                formatter={decimalTooltip(7)}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="yaklasim"
                name="(1+1/n)^n"
                stroke="var(--accent)"
                strokeWidth={3}
                dot={{ r: 4 }}
              />
              <Line
                type="monotone"
                dataKey="e"
                name="e"
                stroke="var(--accent-2)"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          )}
        </ChartFrame>
      </div>
    </LabCard>
  );
}

function CompoundExperiment() {
  const [principal, setPrincipal] = useState(10000);
  const [rate, setRate] = useState(12);
  const [years, setYears] = useState(5);

  const data = [
    {
      name: "Yıllık",
      tutar: Math.round(compoundAmount(principal, rate, years, 1)),
    },
    {
      name: "Aylık",
      tutar: Math.round(compoundAmount(principal, rate, years, 12)),
    },
    {
      name: "Günlük",
      tutar: Math.round(compoundAmount(principal, rate, years, 365)),
    },
    {
      name: "Sürekli",
      tutar: Math.round(continuousAmount(principal, rate, years)),
    },
  ];

  return (
    <LabCard title="Bileşik Faiz Simülatörü" eyebrow="Deney 02">
      <p className="mt-4 leading-7 text-[color:var(--muted)]">
        Aynı başlangıç, aynı oran ve aynı süre için bileşikleşme sıklığı
        arttıkça sonuç sürekli bileşikleşme değerine yaklaşır:
        {" "}
        <MathInline math="A=Pe^{rt}" />.
      </p>
      <div className="mt-5 grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="space-y-4 rounded-[8px] border border-[color:var(--line)] bg-[color:var(--surface-strong)] p-4">
          <RangeControl
            id="principal"
            label="Başlangıç tutarı"
            min={1000}
            max={100000}
            step={1000}
            suffix=" TL"
            value={principal}
            onChange={setPrincipal}
          />
          <RangeControl
            id="rate"
            label="Yıllık oran"
            min={1}
            max={30}
            step={0.5}
            suffix="%"
            value={rate}
            onChange={setRate}
          />
          <RangeControl
            id="years"
            label="Süre"
            min={1}
            max={30}
            suffix=" yıl"
            value={years}
            onChange={setYears}
          />
          <div className="rounded-[8px] bg-[color:var(--surface)] p-4">
            <p className="text-sm font-bold text-[color:var(--muted)]">
              Sürekli bileşikleşme sonucu
            </p>
            <p className="font-mono text-3xl text-[color:var(--text)]">
              {formatCurrency(data[data.length - 1].tutar)}
            </p>
          </div>
        </div>
        <ChartFrame label="Bileşikleşme sıklığına göre final tutar karşılaştırması">
          {({ width, height }) => (
            <BarChart
              width={width}
              height={height}
              data={data}
              margin={{ left: 0, right: 10, top: 10 }}
            >
              <CartesianGrid stroke="var(--grid)" strokeDasharray="4 4" />
              <XAxis dataKey="name" stroke="var(--muted)" />
              <YAxis
                stroke="var(--muted)"
                tickFormatter={(tick) => `${Math.round(tick / 1000)} bin`}
              />
              <Tooltip
                contentStyle={tooltipStyle()}
                formatter={currencyTooltip}
              />
              <Bar
                dataKey="tutar"
                name="Final tutar"
                fill="var(--accent)"
                radius={[6, 6, 0, 0]}
              />
            </BarChart>
          )}
        </ChartFrame>
      </div>
    </LabCard>
  );
}

function TaylorExperiment() {
  const [x, setX] = useState(1);
  const [terms, setTerms] = useState(6);
  const taylor = expTaylorPartial(x, terms);
  const exact = Math.exp(x);
  const error = Math.abs(exact - taylor.sum);
  const data = taylor.rows.map((row) => ({
    k: row.k,
    toplam: Number(row.partial.toFixed(6)),
    gercek: Number(exact.toFixed(6)),
  }));

  return (
    <LabCard title="Taylor Serisi Keşfi" eyebrow="Deney 03">
      <p className="mt-4 leading-7 text-[color:var(--muted)]">
        <MathInline math="e^x=1+x+x^2/2!+x^3/3!+\cdots" /> serisinde daha
        fazla terim eklemek gerçek değere yaklaşımı güçlendirir.
      </p>
      <div className="mt-5 grid gap-5 lg:grid-cols-[0.88fr_1.12fr]">
        <div className="space-y-4 rounded-[8px] border border-[color:var(--line)] bg-[color:var(--surface-strong)] p-4">
          <RangeControl
            id="taylor-x"
            label="x değeri"
            min={-2}
            max={3}
            step={0.25}
            value={x}
            onChange={setX}
          />
          <RangeControl
            id="taylor-terms"
            label="Terim sayısı"
            min={1}
            max={14}
            value={terms}
            onChange={setTerms}
          />
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-[8px] bg-[color:var(--surface)] p-4">
              <p className="text-sm font-bold text-[color:var(--muted)]">
                Seri toplamı
              </p>
              <p className="break-all font-mono text-xl text-[color:var(--text)]">
                {formatDecimal(taylor.sum, 4)}
              </p>
            </div>
            <div className="rounded-[8px] bg-[color:var(--surface)] p-4">
              <p className="text-sm font-bold text-[color:var(--muted)]">
                Hata
              </p>
              <p className="break-all font-mono text-xl text-[color:var(--accent-strong)]">
                {formatDecimal(error, 5)}
              </p>
            </div>
          </div>
        </div>
        <ChartFrame label="Taylor kısmi toplamlarının e üzerindeki gerçek değere yaklaşımı">
          {({ width, height }) => (
            <LineChart
              width={width}
              height={height}
              data={data}
              margin={{ left: 0, right: 10, top: 10 }}
            >
              <CartesianGrid stroke="var(--grid)" strokeDasharray="4 4" />
              <XAxis dataKey="k" stroke="var(--muted)" />
              <YAxis stroke="var(--muted)" />
              <Tooltip
                contentStyle={tooltipStyle()}
                formatter={decimalTooltip(6)}
              />
              <Legend />
              <Line
                dataKey="toplam"
                name="Kısmi toplam"
                stroke="var(--accent)"
                strokeWidth={3}
                dot={{ r: 3 }}
              />
              <Line
                dataKey="gercek"
                name="Gerçek e^x"
                stroke="var(--accent-3)"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          )}
        </ChartFrame>
      </div>
    </LabCard>
  );
}

function GraphExperiment() {
  const [showExp, setShowExp] = useState(true);
  const [showLn, setShowLn] = useState(true);
  const [showInverse, setShowInverse] = useState(false);
  const data = expLnGraphData;

  return (
    <LabCard title="Grafik Gezgini" eyebrow="Deney 04">
      <p className="mt-4 leading-7 text-[color:var(--muted)]">
        e^x ve ln(x) birbirinin tersidir. y = x doğrusu açıldığında simetriyi
        daha net okuyabilirsin.
      </p>
      <div className="mt-5 flex flex-wrap gap-3">
        {[
          ["e^x", showExp, setShowExp],
          ["ln(x)", showLn, setShowLn],
          ["y = x", showInverse, setShowInverse],
        ].map(([label, checked, setter]) => (
          <button
            key={label as string}
            type="button"
            onClick={() => (setter as (value: boolean) => void)(!(checked as boolean))}
            className={cn(
              "inline-flex min-h-11 items-center gap-2 rounded-full border px-4 py-2 text-sm font-bold transition duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[color:var(--accent)]",
              checked
                ? "border-[color:var(--accent)] bg-[color:var(--accent-soft)] text-[color:var(--accent-strong)]"
                : "border-[color:var(--line)] bg-[color:var(--surface-strong)] text-[color:var(--muted)]",
            )}
            aria-pressed={checked as boolean}
          >
            {(checked as boolean) ? (
              <CheckCircle2 aria-hidden size={17} />
            ) : (
              <Circle aria-hidden size={17} />
            )}
            {label as string}
          </button>
        ))}
      </div>
      <ChartFrame label="e üzeri x, doğal logaritma ve y eşittir x grafikleri">
        {({ width, height }) => (
          <LineChart
            width={width}
            height={height}
            data={data}
            margin={{ left: 20, right: 10, top: 10 }}
          >
            <CartesianGrid stroke="var(--grid)" strokeDasharray="4 4" />
            <XAxis dataKey="x" stroke="var(--muted)" />
            <YAxis domain={[-3, 8]} stroke="var(--muted)" />
            <Tooltip
              contentStyle={tooltipStyle()}
              formatter={decimalTooltip(4)}
            />
            <Legend />
            {showExp && (
              <Line
                dataKey="exp"
                name="y = e^x"
                stroke="var(--accent)"
                strokeWidth={3}
                dot={false}
              />
            )}
            {showLn && (
              <Line
                dataKey="ln"
                name="y = ln(x)"
                stroke="var(--accent-2)"
                strokeWidth={3}
                dot={false}
                connectNulls={false}
              />
            )}
            {showInverse && (
              <Line
                dataKey="inverseLine"
                name="y = x"
                stroke="var(--accent-3)"
                strokeDasharray="6 6"
                strokeWidth={2}
                dot={false}
              />
            )}
          </LineChart>
        )}
      </ChartFrame>
    </LabCard>
  );
}

function GrowthExperiment() {
  const [initial, setInitial] = useState(100);
  const [rate, setRate] = useState(18);
  const [years, setYears] = useState(8);
  const [mode, setMode] = useState<"growth" | "decay">("growth");
  const data = makeGrowthData(initial, rate, years, mode);
  const finalValue = data[data.length - 1]?.value ?? initial;

  return (
    <LabCard title="Büyüme ve Bozunma Modeli" eyebrow="Deney 05">
      <p className="mt-4 leading-7 text-[color:var(--muted)]">
        Değişim hızı mevcut miktarla orantılıysa model
        {" "}
        <MathInline math="N(t)=N_0e^{kt}" /> ya da
        {" "}
        <MathInline math="N(t)=N_0e^{-kt}" /> biçimini alır.
      </p>
      <div className="mt-5 grid gap-5 lg:grid-cols-[0.88fr_1.12fr]">
        <div className="space-y-4 rounded-[8px] border border-[color:var(--line)] bg-[color:var(--surface-strong)] p-4">
          <div className="grid grid-cols-2 gap-2 rounded-[8px] bg-[color:var(--surface)] p-1">
            {[
              ["growth", "Büyüme"],
              ["decay", "Bozunma"],
            ].map(([value, label]) => (
              <button
                key={value}
                type="button"
                onClick={() => setMode(value as "growth" | "decay")}
                className={cn(
                  "min-h-11 rounded-[7px] px-4 py-2 text-sm font-bold transition duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--accent)]",
                  mode === value
                    ? "bg-[color:var(--accent)] text-white"
                    : "text-[color:var(--muted)] hover:bg-[color:var(--surface-strong)]",
                )}
              >
                {label}
              </button>
            ))}
          </div>
          <RangeControl
            id="growth-initial"
            label="Başlangıç miktarı"
            min={10}
            max={500}
            step={10}
            value={initial}
            onChange={setInitial}
          />
          <RangeControl
            id="growth-rate"
            label="Oran"
            min={1}
            max={60}
            suffix="%"
            value={rate}
            onChange={setRate}
          />
          <RangeControl
            id="growth-years"
            label="Zaman"
            min={1}
            max={20}
            suffix=" birim"
            value={years}
            onChange={setYears}
          />
          <div className="rounded-[8px] bg-[color:var(--surface)] p-4">
            <p className="text-sm font-bold text-[color:var(--muted)]">
              Model son değeri
            </p>
            <p className="font-mono text-3xl text-[color:var(--text)]">
              {formatDecimal(finalValue, 2)}
            </p>
          </div>
        </div>
        <ChartFrame label="Üstel büyüme veya bozunma modeli grafiği">
          {({ width, height }) => (
            <LineChart
              width={width}
              height={height}
              data={data}
              margin={{ left: 0, right: 10, top: 10 }}
            >
              <CartesianGrid stroke="var(--grid)" strokeDasharray="4 4" />
              <XAxis
                dataKey="t"
                stroke="var(--muted)"
                tickFormatter={(tick) => `${tick}`}
              />
              <YAxis stroke="var(--muted)" />
              <Tooltip
                contentStyle={tooltipStyle()}
                formatter={decimalTooltip(3)}
              />
              <ReferenceLine
                y={initial}
                stroke="var(--accent-3)"
                strokeDasharray="6 6"
              />
              <Line
                dataKey="value"
                name={mode === "growth" ? "Büyüme" : "Bozunma"}
                stroke="var(--accent)"
                strokeWidth={3}
                dot={false}
              />
            </LineChart>
          )}
        </ChartFrame>
      </div>
    </LabCard>
  );
}

function QuizExperiment() {
  const [answers, setAnswers] = useState<Record<number, string>>({});

  return (
    <LabCard title="Mini Kontrol Noktası" eyebrow="Deney 06" className="lg:col-span-2">
      <div className="mt-5 grid gap-4 md:grid-cols-3">
        {quizQuestions.map((question, index) => {
          const selected = answers[index];
          const isCorrect = selected === question.correct;

          return (
            <div
              key={question.prompt}
              className="flex min-h-[260px] flex-col rounded-[8px] border border-[color:var(--line)] bg-[color:var(--surface-strong)] p-4"
            >
              <p className="font-semibold leading-6 text-[color:var(--text)]">
                {question.prompt}
              </p>
              <div className="mt-4 grid gap-2">
                {question.choices.map((choice) => (
                  <button
                    key={choice}
                    type="button"
                    onClick={() =>
                      setAnswers((current) => ({ ...current, [index]: choice }))
                    }
                    className={cn(
                      "min-h-11 rounded-[8px] border px-3 py-2 text-left text-sm font-bold transition duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--accent)]",
                      selected === choice
                        ? choice === question.correct
                          ? "border-[color:var(--success)] bg-[color:var(--success-soft)] text-[color:var(--success)]"
                          : "border-[color:var(--danger)] bg-[color:var(--danger-soft)] text-[color:var(--danger)]"
                        : "border-[color:var(--line)] bg-[color:var(--surface)] text-[color:var(--muted)] hover:border-[color:var(--accent)] hover:text-[color:var(--text)]",
                    )}
                  >
                    {choice}
                  </button>
                ))}
              </div>
              <div className="mt-auto pt-4 text-sm leading-6">
                {selected ? (
                  <p
                    className={cn(
                      "rounded-[8px] p-3",
                      isCorrect
                        ? "bg-[color:var(--success-soft)] text-[color:var(--success)]"
                        : "bg-[color:var(--danger-soft)] text-[color:var(--danger)]",
                    )}
                    aria-live="polite"
                  >
                    {isCorrect ? "Doğru. " : "Tekrar düşün. "}
                    {question.explanation}
                  </p>
                ) : (
                  <p className="text-[color:var(--muted)]">
                    Bir seçenek seçerek kendini yokla.
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
      <button
        type="button"
        onClick={() => setAnswers({})}
        className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-full border border-[color:var(--line)] bg-[color:var(--surface-strong)] px-4 py-2 text-sm font-bold text-[color:var(--text)] transition duration-200 hover:border-[color:var(--accent)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[color:var(--accent)]"
      >
        <RotateCcw aria-hidden size={16} />
        Yanıtları sıfırla
      </button>
    </LabCard>
  );
}

export function InteractiveLab() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <LimitExperiment />
      <CompoundExperiment />
      <TaylorExperiment />
      <GraphExperiment />
      <GrowthExperiment />
      <QuizExperiment />
    </div>
  );
}

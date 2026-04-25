"use client";

export function PrintControls() {
  return (
    <aside className="screen-only fixed bottom-4 right-4 z-50 max-w-xs rounded-[8px] border border-[color:var(--line)] bg-[color:var(--surface)] p-4 shadow-[var(--shadow-deep)]">
      <p className="text-sm font-bold text-[color:var(--text)]">Baskı Paketi</p>
      <p className="mt-2 text-xs leading-5 text-[color:var(--muted)]">
        Siteyi A4 formatında çıktı almak için bu butonu kullan. Yazdırma
        görünümünde navigasyon ve etkileşimli kontroller otomatik gizlenir.
      </p>
      <button
        type="button"
        onClick={() => window.print()}
        className="mt-3 inline-flex w-full items-center justify-center rounded-[8px] bg-[color:var(--accent)] px-3 py-2 text-sm font-semibold text-white transition hover:bg-[color:var(--accent-hover)]"
      >
        Yazdır / PDF Olarak Kaydet
      </button>
    </aside>
  );
}

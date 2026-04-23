# Euler Sayisi: Matematiğin Doğal Sabiti

Bekir Ozan Demir icin hazirlanmis, TED Konya Koleji 11. sinif matematik projesi kapsaminda Euler sayisi `e` uzerine kurulu etkilesimli egitim sitesi.

## Calistirma

```bash
npm install
npm run dev
```

Tarayicida `http://localhost:3000` adresini acin.

## Uretim Derlemesi

```bash
npm run build
npm run start
```

## GitHub Pages ile Yayinlama

Bu repo GitHub Actions ile statik olarak yayinlanacak sekilde ayarlandi.

- Site adresi: `https://hektor808.github.io/euler-sayisi/`
- Deploy workflow dosyasi: [`.github/workflows/deploy.yml`](./.github/workflows/deploy.yml)
- Next config dosyasi: [`next.config.ts`](./next.config.ts)

GitHub tarafinda su ayari kontrol et:

1. Repo `Settings` sayfasina gir.
2. Sol menuden `Pages` bolumunu ac.
3. `Build and deployment` altinda `Source` olarak `GitHub Actions` secili olsun.

## Secilen Mimari

- Next.js App Router + TypeScript
- Tailwind CSS v4 ile token tabanli tema sistemi
- Framer Motion ile olculu giris animasyonlari ve azaltilmis hareket destegi
- Recharts ile etkilesimli matematik gorsellestirmeleri
- KaTeX ile temiz matematik gosterimi
- Lucide React ile tutarli ikon dili
- `src/lib/content.ts` icinde duzenli Turkce icerik ve kaynakca
- `src/lib/math.ts` icinde simulasyon hesaplari

## Proje Guclu Yonleri

- e sayisini yalnizca tanitmiyor; limit, seri, turev, integral, dogal logaritma, bileşik faiz ve uygulamalar arasinda anlamli bir hikaye kuruyor.
- "Euler sayisi", "Euler formulu", `ln`, `pi` ve Euler-Mascheroni sabiti arasindaki farklari acikca ayiriyor.
- Etkilesimli laboratuvar bolumu; limit yakinamsasi, bileşik faiz, Taylor serisi, grafik karsilastirmasi, buyume/bozunma ve mini quiz iceriyor.
- Kaynakca bolumu guvenilir kaynaklarin ne icin kullanildigini ve neden guvenilir olduklarini acikliyor.
- Mobil, tablet ve masaustu icin duyarlı tasarim; klavye erisilebilirligi, odak durumlari, renk kontrasti ve azaltilmis hareket destegi gozetildi.

## Etkilesimlerin Ogrenmeye Katkisi

- Limit araci, `(1 + 1/n)^n` ifadesinin e'ye yaklasmasini sayisal ve gorsel olarak gosterir.
- Bileşik faiz simulatoru, kesikli bileşiklesmeden surekli bileşiklesmeye gecisi karsilastirir.
- Taylor serisi kesfi, sonsuz serilerin birkac terimle nasil guclu yaklasim verdigini sezdirir.
- Grafik gezgini, `e^x` ve `ln(x)` fonksiyonlarinin ters iliskisini gosterir.
- Buyume/bozunma modeli, `N(t)=N_0e^{kt}` fikrinin gercek sureclerde neden kullanildigini anlatir.
- Mini quiz, temel kavramlari hizlica pekistirir.

import { ExternalLink } from "lucide-react";
import { FormulaCard } from "@/components/formula-card";
import { Hero } from "@/components/hero";
import { InteractiveLab } from "@/components/interactive-lab";
import { MathBlock, MathInline } from "@/components/math-render";
import { ReadingProgress } from "@/components/reading-progress";
import { Reveal } from "@/components/reveal";
import { SiteNavigation } from "@/components/site-navigation";
import {
  advancedNotes,
  applications,
  confusionCards,
  faq,
  formulaCards,
  originLenses,
  quickFacts,
  sourceList,
  strengthNotes,
  timeline,
} from "@/lib/content";

function SectionIntro({
  eyebrow,
  title,
  body,
}: {
  eyebrow: string;
  title: string;
  body: string;
}) {
  return (
    <Reveal className="mx-auto mb-10 max-w-3xl text-center">
      <p className="mb-3 text-sm font-bold uppercase text-[color:var(--accent)]">
        {eyebrow}
      </p>
      <h2 className="font-display text-4xl leading-[1.08] text-[color:var(--text)] sm:text-5xl">
        {title}
      </h2>
      <p className="mt-5 text-lg leading-8 text-[color:var(--muted)]">
        {body}
      </p>
    </Reveal>
  );
}

function PageSection({
  id,
  children,
  tone = "plain",
}: {
  id: string;
  children: React.ReactNode;
  tone?: "plain" | "band";
}) {
  return (
    <section
      id={id}
      className={
        tone === "band"
          ? "scroll-mt-24 border-y border-[color:var(--line)] bg-[color:var(--band)] px-4 py-20 sm:px-6 lg:px-8"
          : "scroll-mt-24 px-4 py-20 sm:px-6 lg:px-8"
      }
    >
      <div className="mx-auto max-w-7xl">{children}</div>
    </section>
  );
}

function IconGrid({ items }: { items: typeof quickFacts }) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {items.map((item, index) => {
        const Icon = item.icon;
        return (
          <Reveal
            as="article"
            delay={index * 0.06}
            key={item.title}
            className="rounded-[8px] border border-[color:var(--line)] bg-[color:var(--surface)] p-5 shadow-[var(--shadow-soft)]"
          >
            <div className="mb-5 grid h-12 w-12 place-items-center rounded-full bg-[color:var(--accent-soft)] text-[color:var(--accent-strong)]">
              <Icon aria-hidden size={22} />
            </div>
            <h3 className="font-display text-2xl text-[color:var(--text)]">
              {item.title}
            </h3>
            <p className="mt-3 leading-7 text-[color:var(--muted)]">
              {item.body}
            </p>
          </Reveal>
        );
      })}
    </div>
  );
}

function Timeline() {
  return (
    <div className="relative mx-auto max-w-5xl">
      <div
        className="absolute bottom-0 left-5 top-0 w-px bg-[color:var(--line)] md:left-1/2"
        aria-hidden="true"
      />
      <div className="grid gap-6">
        {timeline.map((item, index) => (
          <Reveal
            key={item.year}
            className={`relative grid gap-4 md:grid-cols-2 ${
              index % 2 === 0 ? "" : "md:[&>*:first-child]:col-start-2"
            }`}
          >
            <article className="ml-12 rounded-[8px] border border-[color:var(--line)] bg-[color:var(--surface)] p-5 shadow-[var(--shadow-soft)] md:ml-0">
              <div className="absolute left-0 top-6 grid h-10 w-10 place-items-center rounded-full border border-[color:var(--accent)] bg-[color:var(--surface)] font-mono text-sm font-bold text-[color:var(--accent)] md:left-1/2 md:-translate-x-1/2">
                {index + 1}
              </div>
              <p className="font-mono text-sm font-bold text-[color:var(--accent)]">
                {item.year}
              </p>
              <h3 className="mt-2 font-display text-2xl text-[color:var(--text)]">
                {item.title}
              </h3>
              <p className="mt-3 leading-7 text-[color:var(--muted)]">
                {item.body}
              </p>
            </article>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

function SourceList() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {sourceList.map((source) => (
        <Reveal
          as="article"
          key={source.url}
          className="rounded-[8px] border border-[color:var(--line)] bg-[color:var(--surface)] p-5 shadow-[var(--shadow-soft)]"
        >
          <a
            href={source.url}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-start gap-2 font-display text-2xl text-[color:var(--text)] transition hover:text-[color:var(--accent)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[color:var(--accent)]"
          >
            {source.title}
            <ExternalLink aria-hidden className="mt-1 shrink-0" size={17} />
          </a>
          <p className="mt-4 text-sm font-bold uppercase text-[color:var(--accent)]">
            Kullanım
          </p>
          <p className="mt-2 leading-7 text-[color:var(--muted)]">
            {source.use}
          </p>
          <p className="mt-4 text-sm font-bold uppercase text-[color:var(--accent)]">
            Güvenilirlik
          </p>
          <p className="mt-2 leading-7 text-[color:var(--muted)]">
            {source.quality}
          </p>
        </Reveal>
      ))}
    </div>
  );
}

export default function Home() {
  return (
    <>
      <ReadingProgress />
      <SiteNavigation />
      <main id="icerik">
        <Hero />

        <PageSection id="e-nedir">
          <SectionIntro
            eyebrow="Temel fikir"
            title="e nedir ve neden bu kadar doğal görünür?"
            body="Euler sayısı e, yaklaşık 2,718281828... değerine sahip bir sabittir. Onu özel yapan şey yalnızca değeri değil; sürekli büyüme, logaritma, türev ve olasılık gibi farklı alanlarda aynı anda ortaya çıkmasıdır."
          />
          <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
            <Reveal className="rounded-[8px] border border-[color:var(--line)] bg-[color:var(--surface)] p-6 shadow-[var(--shadow-soft)]">
              <p className="text-sm font-bold uppercase text-[color:var(--accent)]">
                Öğrenci dostu sezgi
              </p>
              <h3 className="mt-3 font-display text-3xl text-[color:var(--text)]">
                e, sürekli değişimin ölçü birimi gibidir.
              </h3>
              <div className="mt-5 space-y-4 text-lg leading-8 text-[color:var(--muted)]">
                <p>
                  Bir büyüklük kendi miktarıyla orantılı hızda artıyor ya da
                  azalıyorsa, bu hareketi en sade biçimde e tabanlı üstel
                  fonksiyonlar anlatır.
                </p>
                <p>
                  Bu yüzden e, bir formül ezberi değil; “değişim kendi
                  büyüklüğüne bağlıysa ne olur?” sorusuna verilen doğal cevaptır.
                </p>
              </div>
            </Reveal>
            <IconGrid items={quickFacts} />
          </div>
        </PageSection>

        <PageSection id="ortaya-cikis" tone="band">
          <SectionIntro
            eyebrow="Dört bakış açısı"
            title="e nasıl ortaya çıkar?"
            body="Aynı sabit; faiz problemlerinde, limitlerde, büyüme modellerinde ve doğal logaritmada farklı yüzleriyle görünür. Bu tekrar, e'nin matematiğin içinde gerçekten doğal olduğunu gösterir."
          />
          <IconGrid items={originLenses} />
          <Reveal className="mx-auto mt-10 max-w-4xl rounded-[8px] border border-[color:var(--line)] bg-[color:var(--surface)] p-6 text-center shadow-[var(--shadow-soft)]">
            <p className="text-sm font-bold uppercase text-[color:var(--accent)]">
              Ana düşünce
            </p>
            <div className="mt-4 overflow-x-auto">
              <MathBlock math="\\left(1+\\frac{1}{n}\\right)^n \\longrightarrow e" />
            </div>
            <p className="mx-auto mt-4 max-w-2xl leading-7 text-[color:var(--muted)]">
              n büyürken her büyüme adımı küçülür, fakat adımların sayısı
              artar. Bu denge, sürekli büyümenin sabitini doğurur.
            </p>
          </Reveal>
        </PageSection>

        <PageSection id="tarihce">
          <SectionIntro
            eyebrow="Tarihsel bağlam"
            title="Euler'den önce başladı, Euler ile adı yerleşti."
            body="e'nin hikâyesi tek bir kişinin ani keşfinden ibaret değildir. Logaritmalar, bileşik faiz ve sonsuz seriler yavaş yavaş aynı sabite işaret etmiş; Euler bu dili sistemleştirmiştir."
          />
          <Timeline />
        </PageSection>

        <PageSection id="matematik" tone="band">
          <SectionIntro
            eyebrow="Çekirdek matematik"
            title="Formüller ezber değil, anlam taşıyan kapılardır."
            body="Bu bölümde e'nin temel tanımlarını ve fonksiyonlarla bağlantılarını tek tek okuyabilir, her formülün ne anlattığını görebilirsin."
          />
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {formulaCards.map((card) => (
              <Reveal as="article" key={card.title}>
                <FormulaCard {...card} />
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-8 rounded-[8px] border border-[color:var(--line)] bg-[color:var(--surface)] p-6 shadow-[var(--shadow-soft)]">
            <p className="text-sm font-bold uppercase text-[color:var(--accent)]">
              İleri Seviye Not
            </p>
            <h3 className="mt-3 font-display text-3xl text-[color:var(--text)]">
              Diferansiyel denklemlerin kısa yolu
            </h3>
            <p className="mt-4 max-w-4xl leading-8 text-[color:var(--muted)]">
              Bir modelde değişim hızı mevcut miktarla orantılıysa
              {" "}
              <MathInline math="y'=ky" /> elde edilir. Bu denklemin çözümü
              {" "}
              <MathInline math="y=Ce^{kx}" /> biçimindedir. Bu sonuç 11.
              sınıfın ötesinde bir kalkülüs fikridir; ancak e&apos;nin neden
              fizik, biyoloji ve mühendislikte bu kadar sık görüldüğünü
              açıklar.
            </p>
          </Reveal>
        </PageSection>

        <PageSection id="onem">
          <SectionIntro
            eyebrow="Uygulamalar"
            title="e, soyut bir sembolden çok daha fazlasıdır."
            body="Bir şeyin değişim hızı kendi miktarına bağlıysa, e genellikle sahnededir. Bu nedenle e, finansal modellerden doğa bilimlerine kadar geniş bir uygulama alanına sahiptir."
          />
          <IconGrid items={applications} />
        </PageSection>

        <PageSection id="laboratuvar" tone="band">
          <SectionIntro
            eyebrow="Etkileşimli laboratuvar"
            title="Formülleri hareket ettir, anlamı gör."
            body="Aşağıdaki araçlar e'yi yalnızca okumak için değil, denemek ve karşılaştırmak için tasarlandı. Her kontrol, bir matematik fikrini görünür hale getirir."
          />
          <InteractiveLab />
        </PageSection>

        <PageSection id="ileri-seviye">
          <SectionIntro
            eyebrow="İleri Seviye"
            title="Euler formülü: e'nin karmaşık düzlemdeki zarif yüzü"
            body="Bu bölüm ana 11. sınıf kapsamının ilerisine geçer. Ama e'nin neden matematiğin en güzel sabitlerinden biri sayıldığını göstermek için güçlü bir pencere açar."
          />
          <Reveal className="overflow-hidden rounded-[8px] border border-[color:var(--line)] bg-[color:var(--surface)] shadow-[var(--shadow-deep)]">
            <div className="grid gap-0 lg:grid-cols-[0.95fr_1.05fr]">
              <div className="p-6 sm:p-8">
                <p className="text-sm font-bold uppercase text-[color:var(--accent)]">
                  Euler Formülü
                </p>
                <div className="my-6 overflow-x-auto rounded-[8px] border border-[color:var(--line)] bg-[color:var(--formula-bg)] p-5">
                  <MathBlock math="e^{ix}=\\cos x+i\\sin x" />
                </div>
                <p className="text-lg leading-8 text-[color:var(--muted)]">
                  Gerçek sayılarda e^x büyümeyi anlatır. Karmaşık sayılarda
                  <MathInline math="e^{ix}" /> ise birim çember üzerindeki
                  dönüşü anlatır. Bu formül, üstel fonksiyon ile trigonometri
                  arasında beklenmedik ama çok derin bir bağ kurar.
                </p>
              </div>
              <div className="grid place-items-center bg-[color:var(--surface-strong)] p-8">
                <div className="relative h-72 w-72 rounded-full border border-[color:var(--line-strong)]">
                  <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-[color:var(--line)]" />
                  <div className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-[color:var(--line)]" />
                  <div className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[color:var(--text)]" />
                  <div className="absolute left-[50%] top-[50%] h-1 w-[43%] origin-left rotate-[-38deg] rounded-full bg-[color:var(--accent)]" />
                  <div className="absolute right-10 top-20 rounded-full border border-[color:var(--accent)] bg-[color:var(--surface)] px-3 py-2 font-mono text-sm text-[color:var(--accent-strong)]">
                    e^{`{ix}`}
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
          <div className="mt-6">
            <IconGrid items={advancedNotes} />
          </div>
        </PageSection>

        <PageSection id="karisikliklar" tone="band">
          <SectionIntro
            eyebrow="Sık yapılan karışıklıklar"
            title="Benzer isimler, farklı matematiksel fikirler."
            body="e hakkında güçlü bir proje hazırlamanın önemli parçası, neyin e olmadığını da açıkça söylemektir."
          />
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {confusionCards.map((card, index) => (
              <Reveal
                as="article"
                delay={index * 0.04}
                key={card.title}
                className="rounded-[8px] border border-[color:var(--line)] bg-[color:var(--surface)] p-5 shadow-[var(--shadow-soft)]"
              >
                <h3 className="font-display text-2xl text-[color:var(--text)]">
                  {card.title}
                </h3>
                <p className="mt-3 leading-7 text-[color:var(--muted)]">
                  {card.body}
                </p>
              </Reveal>
            ))}
          </div>
        </PageSection>

        <PageSection id="faq">
          <SectionIntro
            eyebrow="SSS"
            title="Kısa, doğru ve öğretmen dostu cevaplar"
            body="Bu sorular proje sunumunda gelebilecek temel noktaları hızlıca toparlar."
          />
          <div className="mx-auto grid max-w-4xl gap-3">
            {faq.map((item) => (
              <Reveal key={item.question}>
                <details className="group rounded-[8px] border border-[color:var(--line)] bg-[color:var(--surface)] p-5 shadow-[var(--shadow-soft)]">
                  <summary className="cursor-pointer list-none font-display text-xl text-[color:var(--text)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[color:var(--accent)]">
                    {item.question}
                    <span className="float-right ml-4 text-[color:var(--accent)] group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="mt-4 leading-7 text-[color:var(--muted)]">
                    {item.answer}
                  </p>
                </details>
              </Reveal>
            ))}
          </div>
        </PageSection>

        <PageSection id="kaynakca" tone="band">
          <SectionIntro
            eyebrow="Kaynakça ve güvenilirlik"
            title="Matematiksel iddialar kaynaklarla desteklendi."
            body="Bu proje; ansiklopedi, açık ders kitabı ve matematik referansı türündeki kaynaklarla çapraz kontrol edilerek hazırlandı. Özellikle e, Euler formülü ve Euler-Mascheroni sabiti birbirinden ayrı tutuldu."
          />
          <SourceList />
        </PageSection>

        <PageSection id="sonuc">
          <SectionIntro
            eyebrow="Kapanış"
            title="e, değişimin kendi dilini bulduğu sayıdır."
            body="Euler sayısı; faiz problemlerinden türevlere, doğal logaritmadan olasılık modellerine kadar aynı fikri tekrar tekrar gösterir: bazı süreçlerde büyüme ya da azalma, var olan miktarın kendisinden doğar."
          />
          <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
            <Reveal className="rounded-[8px] border border-[color:var(--line)] bg-[color:var(--surface)] p-6 shadow-[var(--shadow-soft)]">
              <p className="text-sm font-bold uppercase text-[color:var(--accent)]">
                Son mesaj
              </p>
              <p className="mt-4 font-display text-3xl leading-[1.2] text-[color:var(--text)]">
                e&apos;yi anlamak, matematikte yalnızca sonucu değil, değişimin
                mantığını da anlamaktır.
              </p>
              <p className="mt-5 leading-8 text-[color:var(--muted)]">
                Bu site, sabiti ezberletmek yerine onu farklı pencerelerden
                görünür kılmayı amaçlar: limit, seri, grafik, model, tarih ve
                uygulama.
              </p>
            </Reveal>
            <div className="grid gap-4 sm:grid-cols-2">
              {strengthNotes.map((note, index) => {
                const Icon = note.icon;
                return (
                  <Reveal
                    as="article"
                    delay={index * 0.05}
                    key={note.title}
                    className="rounded-[8px] border border-[color:var(--line)] bg-[color:var(--surface)] p-5 shadow-[var(--shadow-soft)]"
                  >
                    <div className="mb-4 grid h-11 w-11 place-items-center rounded-full bg-[color:var(--accent-soft)] text-[color:var(--accent-strong)]">
                      <Icon aria-hidden size={20} />
                    </div>
                    <h3 className="font-display text-xl text-[color:var(--text)]">
                      {note.title}
                    </h3>
                    <p className="mt-3 text-sm leading-6 text-[color:var(--muted)]">
                      {note.body}
                    </p>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </PageSection>
      </main>

      <footer className="border-t border-[color:var(--line)] bg-[color:var(--footer)] px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 text-sm text-[color:var(--muted)] md:flex-row md:items-center md:justify-between">
          <p>
            Euler Sayısı: Matematiğin Doğal Sabiti · Bekir Ozan Demir · TED
            Konya Koleji
          </p>
          <p>Matematik projesi için hazırlanmış etkileşimli eğitim sitesi.</p>
        </div>
      </footer>
    </>
  );
}

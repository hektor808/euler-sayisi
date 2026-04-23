import {
  Atom,
  Banknote,
  BookOpen,
  BrainCircuit,
  ChartNoAxesCombined,
  CircleHelp,
  Compass,
  FlaskConical,
  FunctionSquare,
  Landmark,
  LineChart,
  Microscope,
  Orbit,
  Sigma,
  Sparkles,
  SquareRadical,
  Waves,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type NavItem = {
  id: string;
  label: string;
};

export type IconContent = {
  icon: LucideIcon;
  title: string;
  body: string;
};

export type FormulaCard = {
  title: string;
  tag: string;
  formula: string;
  body: string;
  insight: string;
};

export const projectMeta = [
  ["Hazırlayan", "Bekir Ozan Demir"],
  ["Okul", "TED Konya Koleji"],
  ["Ders", "Matematik"],
  ["Öğretmen", "Ali Kayhan"],
  ["Düzey", "11. Sınıf Eşit Ağırlık"],
] as const;

export const navItems: NavItem[] = [
  { id: "e-nedir", label: "e Nedir?" },
  { id: "ortaya-cikis", label: "Ortaya Çıkış" },
  { id: "matematik", label: "Matematik" },
  { id: "laboratuvar", label: "Laboratuvar" },
  { id: "ileri-seviye", label: "İleri Seviye" },
  { id: "kaynakca", label: "Kaynakça" },
];

export const quickFacts: IconContent[] = [
  {
    icon: Sigma,
    title: "Bir sayıdan fazlası",
    body: "e, sürekli değişen büyüklükleri sade ve doğal biçimde anlatan özel bir matematik sabitidir.",
  },
  {
    icon: FunctionSquare,
    title: "Kendi türevi",
    body: "e^x fonksiyonunun değişim hızı yine e^x olur. Bu özellik onu kalkülüsün doğal dili yapar.",
  },
  {
    icon: Banknote,
    title: "Sürekli bileşik faiz",
    body: "Faiz sonsuz sıklıkta bileşikleşirse büyümenin ulaştığı sınır e ile ifade edilir.",
  },
];

export const originLenses: IconContent[] = [
  {
    icon: Landmark,
    title: "Bileşik faiz merceği",
    body: "1 TL, yılda %100 faizle yılda bir kez bileşikleşirse 2 TL olur. Aynı faiz daha sık işletildikçe sonuç 2,25; 2,37; 2,70... diye artar ama sınırsız büyümez: e'ye yaklaşır.",
  },
  {
    icon: ChartNoAxesCombined,
    title: "Limit merceği",
    body: "(1 + 1/n)^n ifadesinde n büyüdükçe küçük artışlar çok sık tekrarlanır. Bu süreç, sürekli büyümenin temel sabitini verir.",
  },
  {
    icon: Waves,
    title: "Doğal büyüme merceği",
    body: "Bir miktarın artış hızı miktarın kendisiyle orantılıysa modelin kalbinde e^x vardır. Bu yüzden e, nüfus, soğuma, radyoaktif bozunma ve olasılıkta tekrar tekrar karşımıza çıkar.",
  },
  {
    icon: SquareRadical,
    title: "Doğal logaritma merceği",
    body: "ln(x), e tabanlı logaritmadır. e^x bir büyüme miktarını verirken ln(x), o sonuca ulaşmak için gereken doğal büyüme süresini söyler.",
  },
];

export const formulaCards: FormulaCard[] = [
  {
    title: "Limit Tanımı",
    tag: "Sürekli bileşikleşme",
    formula: "e=\\lim_{n\\to\\infty}\\left(1+\\frac{1}{n}\\right)^n",
    body: "n, bir yıldaki bileşikleşme sayısı gibi düşünülebilir. n arttıkça her adım küçülür ama adım sayısı çoğalır; sonuç e'ye yaklaşır.",
    insight: "Bu formül e'nin bir rastgele sayı değil, doğal bir sınır olduğunu gösterir.",
  },
  {
    title: "Sonsuz Seri",
    tag: "Hızlı yaklaşım",
    formula: "e=\\sum_{k=0}^{\\infty}\\frac{1}{k!}=1+1+\\frac{1}{2!}+\\frac{1}{3!}+\\cdots",
    body: "Faktöriyel paydalar çok hızlı büyür. Bu nedenle birkaç terim bile e'ye oldukça iyi yaklaşır.",
    insight: "Seri tanımı, e'nin hesaplanabilir ve analiz edilebilir olduğunu hissettirir.",
  },
  {
    title: "Kendi Türevi",
    tag: "Kalkülüsün kalbi",
    formula: "\\frac{d}{dx}e^x=e^x",
    body: "Bir fonksiyonun değeri ile değişim hızı aynıysa, büyüme miktarı arttıkça büyüme hızı da aynı oranda artar.",
    insight: "Bu yüzden e^x, doğal büyüme ve bozunma modellerinin en sade dilidir.",
  },
  {
    title: "İntegral Bağlantısı",
    tag: "Alan ve birikim",
    formula: "\\int e^x\\,dx=e^x+C",
    body: "e^x'in türevi yine kendisi olduğu için, belirsiz integrali de yalnızca sabit farkıyla yine kendisidir.",
    insight: "Değişim ve birikim aynı yapıda buluşur.",
  },
  {
    title: "Doğal Logaritma",
    tag: "Ters fonksiyon",
    formula: "\\ln(e)=1,\\qquad e^{\\ln x}=x\\quad(x>0)",
    body: "ln(x), e tabanına göre 'hangi kuvvet?' sorusunun cevabıdır. Bu yüzden e^x ve ln(x) birbirinin tersidir.",
    insight: "Grafikte bu ilişki y = x doğrusuna göre simetri olarak görülür.",
  },
];

export const timeline = [
  {
    year: "1618",
    title: "Logaritma tablolarında e'nin izi",
    body: "Napier'in logaritmalarına eklenen bir tabloda e ile ilişkili doğal logaritmik değerler görülür; ancak o dönemde e henüz açıkça bir taban olarak adlandırılmamıştı.",
  },
  {
    year: "1683",
    title: "Bernoulli ve bileşik faiz problemi",
    body: "Jakob Bernoulli, faizin giderek daha sık bileşikleşmesiyle ortaya çıkan sınırı inceledi. Bu sınır, bugün e'nin en sezgisel kapılarından biridir.",
  },
  {
    year: "1731",
    title: "Euler'in gösterimi standartlaştırması",
    body: "Leonhard Euler, Christian Goldbach'a yazdığı mektupta bu sabit için e harfini kullandı. Bugünkü gösterimin yaygınlaşmasında Euler'in etkisi büyüktür.",
  },
  {
    year: "1748",
    title: "Üstel ve logaritmik fonksiyonların düzenlenmesi",
    body: "Euler, analiz çalışmalarında üstel fonksiyonlar, logaritmalar ve sonsuz seriler arasındaki bağları sistemli biçimde geliştirdi.",
  },
  {
    year: "1873",
    title: "Aşkınlık sonucu",
    body: "Charles Hermite, e'nin aşkın sayı olduğunu kanıtladı. Yani e, rasyonel katsayılı sıfır olmayan hiçbir polinomun kökü değildir.",
  },
];

export const applications: IconContent[] = [
  {
    icon: Banknote,
    title: "Finans",
    body: "Sürekli bileşik faiz formülü A = Pe^{rt}, paranın sürekli oranda büyüdüğü ideal modeli anlatır.",
  },
  {
    icon: Microscope,
    title: "Nüfus ve biyoloji",
    body: "Kaynaklar sınırsız varsayıldığında bakterilerin veya popülasyonların kısa süreli büyümesi e^{rt} yapısıyla modellenebilir.",
  },
  {
    icon: Atom,
    title: "Radyoaktif bozunma",
    body: "Bozunma süreçlerinde miktar zamanla N(t)=N_0e^{-kt} biçiminde azalır; hız, kalan miktarla orantılıdır.",
  },
  {
    icon: FlaskConical,
    title: "Fizik ve mühendislik",
    body: "Kapasitör boşalması, Newton soğuma yasası ve sönümlü sistemler gibi süreçler üstel azalma içerir.",
  },
  {
    icon: BrainCircuit,
    title: "Olasılık ve veri bilimi",
    body: "Normal dağılım, Poisson dağılımı, lojistik fonksiyon ve softmax gibi modellerde e doğal biçimde yer alır.",
  },
  {
    icon: Compass,
    title: "Kalkülüs ve diferansiyel denklemler",
    body: "y'=ky biçimindeki birçok denklem e^{kx} ile çözülür. Bu, e'nin uygulamalardaki gücünün temel nedenidir.",
  },
];

export const confusionCards = [
  {
    title: "e ve π aynı türden değildir",
    body: "π geometri ve dairelerle doğar; e ise sürekli büyüme, logaritma ve değişim hızıyla doğar. İkisi de irrasyonel ve aşkındır, ama anlamları farklıdır.",
  },
  {
    title: "ln bir sayı değil, fonksiyondur",
    body: "ln(x), e tabanlı logaritma fonksiyonudur. e ise bu fonksiyonun tabanındaki sabittir.",
  },
  {
    title: "Euler formülü ana konu değil, ileri uzantıdır",
    body: "e^{ix}=cos(x)+i sin(x), e'yi karmaşık sayılar ve trigonometriyle bağlar. Bu proje e sayısını merkeze alır; formül ayrı bir ileri seviye güzelliktir.",
  },
  {
    title: "Euler-Mascheroni sabiti farklıdır",
    body: "Euler-Mascheroni sabiti γ yaklaşık 0,57721'dir ve harmonik seri ile ln(n) arasındaki farkın limitinden gelir. e ≈ 2,71828 ile karıştırılmamalıdır.",
  },
  {
    title: "Her üstel ifade e değildir",
    body: "2^x, 10^x ve x^e gibi ifadeler üstel ya da kuvvetli ifadeler olabilir; e'nin özel rolü doğal büyüme ve kalkülüs bağlantısından gelir.",
  },
];

export const faq = [
  {
    question: "e irrasyonel midir?",
    answer:
      "Evet. e iki tam sayının oranı olarak yazılamaz. Ayrıca e aşkındır; rasyonel katsayılı sıfır olmayan hiçbir polinomun kökü değildir. Bu bilgi 11. sınıf düzeyinin üstünde bir sonuçtur, ama sabitin ne kadar özel olduğunu gösterir.",
  },
  {
    question: "e neden yaklaşık 2,718'dir?",
    answer:
      "(1 + 1/n)^n ifadesinde n çok büyütüldüğünde değer 2,718281828... sayısına yaklaşır. Sonsuz seri 1 + 1 + 1/2! + 1/3! + ... de aynı sayıyı verir.",
  },
  {
    question: "ln neden e tabanlıdır?",
    answer:
      "Çünkü e tabanı, türev ve integral kurallarını en sade hale getirir. ln(x)'in türevi 1/x olur; e^x'in türevi ise yine e^x olur.",
  },
  {
    question: "e ile π arasında hangisi daha önemlidir?",
    answer:
      "Bu, bağlama bağlıdır. Geometride π, sürekli büyüme ve değişim problemlerinde e doğal olarak öne çıkar. Matematikte ikisi de temel sabitlerdir.",
  },
  {
    question: "e günlük hayatta nerede kullanılır?",
    answer:
      "Faiz, nüfus modelleri, ilaçların vücutta azalması, radyoaktif bozunma, soğuma, olasılık dağılımları ve veri bilimi modellerinde e tabanlı üstel ifadeler kullanılır.",
  },
  {
    question: "Euler formülü neden ünlüdür?",
    answer:
      "Çünkü e, i, π, 1 ve 0 gibi temel nesneleri tek bir ilişkide birleştirir. Ancak bu formül karmaşık sayılarla ilgilidir ve e sayısının temel tanımından daha ileri bir konudur.",
  },
];

export const quizQuestions = [
  {
    prompt: "n büyüdükçe (1 + 1/n)^n hangi sayıya yaklaşır?",
    choices: ["e", "π", "γ"],
    correct: "e",
    explanation: "Bu limit, Euler sayısının en yaygın tanımlarından biridir.",
  },
  {
    prompt: "e^x fonksiyonunun türevi nedir?",
    choices: ["e^x", "x e^{x-1}", "ln(x)"],
    correct: "e^x",
    explanation: "e tabanını özel yapan en güçlü özellik budur.",
  },
  {
    prompt: "ln(x), hangi fonksiyonun tersidir?",
    choices: ["e^x", "x^2", "sin(x)"],
    correct: "e^x",
    explanation: "x > 0 için e^{ln x}=x ve ln(e^x)=x ilişkileri geçerlidir.",
  },
];

export const sourceList = [
  {
    title: "Encyclopaedia Britannica - e (mathematical constant)",
    url: "https://www.britannica.com/science/e-mathematics",
    use: "Tanım, tarihsel bağlam, Bernoulli bileşik faiz problemi ve uygulama örnekleri.",
    quality: "Editör denetimli ansiklopedi kaynağı.",
  },
  {
    title: "Wolfram MathWorld - e",
    url: "https://mathworld.wolfram.com/e.html",
    use: "e'nin basamakları, limit ve seri tanımları, irrasyonellik/aşkınlık bilgisi ve Euler formülü bağlantısı.",
    quality: "Matematik odaklı, referans niteliğinde kaynak.",
  },
  {
    title: "OpenStax Calculus Volume 2 - Integrals, Exponential Functions, and Logarithms",
    url: "https://openstax.org/books/calculus-volume-2/pages/2-7-integrals-exponential-functions-and-logarithms",
    use: "ln(x), türev, integral ve doğal üstel fonksiyon ilişkileri.",
    quality: "Açık erişimli üniversite ders kitabı.",
  },
  {
    title: "Wolfram MathWorld - Natural Logarithm",
    url: "https://mathworld.wolfram.com/NaturalLogarithm.html",
    use: "Doğal logaritmanın türev avantajı ve e tabanıyla ilişkisi.",
    quality: "Matematik referansı.",
  },
  {
    title: "Wolfram MathWorld - Euler Formula",
    url: "https://mathworld.wolfram.com/EulerFormula.html",
    use: "İleri seviye Euler formülü bölümünde kullanılan karmaşık sayı bağlantısı.",
    quality: "Matematik referansı.",
  },
  {
    title: "Wolfram MathWorld - Euler-Mascheroni Constant",
    url: "https://mathworld.wolfram.com/Euler-MascheroniConstant.html",
    use: "Euler-Mascheroni sabitinin e'den ayrı olduğunu doğrulamak için.",
    quality: "Matematik referansı.",
  },
];

export const strengthNotes = [
  {
    icon: BookOpen,
    title: "Kademeli anlatım",
    body: "Önce sezgi, sonra formül, ardından ileri seviye notlar geliyor; bu yapı 11. sınıf öğrencisi için erişilebilir kalırken öğretmene derinlik gösterir.",
  },
  {
    icon: FlaskConical,
    title: "Etkileşimli öğrenme",
    body: "Limit, faiz, Taylor serisi, grafik ve büyüme/bozunma araçları formülleri canlı hale getirir.",
  },
  {
    icon: CircleHelp,
    title: "Yanlış anlamaları önleme",
    body: "e, ln, π, Euler formülü ve Euler-Mascheroni sabiti açıkça ayrıştırılır.",
  },
  {
    icon: Sparkles,
    title: "Akademik güven",
    body: "Kaynakça bölümü, hangi bilginin hangi tür kaynaktan doğrulandığını açıkça gösterir.",
  },
];

export const advancedNotes: IconContent[] = [
  {
    icon: Orbit,
    title: "Karmaşık düzlemde dönüş",
    body: "e^{ix}, büyüme yerine dönmeyi temsil eder. x açısı değiştikçe nokta birim çember üzerinde hareket eder.",
  },
  {
    icon: LineChart,
    title: "Serilerin birleşmesi",
    body: "e^x, sin(x) ve cos(x) serileri karşılaştırıldığında Euler formülünün neden doğal olduğu görülür.",
  },
  {
    icon: Sparkles,
    title: "Euler özdeşliği",
    body: "x = π alınırsa e^{iπ}+1=0 elde edilir. Bu, matematiğin en ünlü ve zarif eşitliklerinden biridir.",
  },
];

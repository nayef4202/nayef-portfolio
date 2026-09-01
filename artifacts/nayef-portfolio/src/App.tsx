import { type ReactNode, useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ArrowDown, ArrowUpRight, BrainCircuit, BriefcaseBusiness, Check, ChevronDown, Code2, Coffee, Cpu, Github, GraduationCap, Instagram, Linkedin, Mail, Menu, Moon, Play, ShieldCheck, Sparkles, Sun, Target, Users, X } from 'lucide-react';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { Route, Switch, Router as WouterRouter } from 'wouter';

const queryClient = new QueryClient();
const instagramUrl = 'https://www.instagram.com/nayef42002?igsi=ano0OTFq&utmsource=qr';
const email = 'nayef4202@gmail.com';
const profileImage = `${import.meta.env.BASE_URL}profile.jpg`;
const uulaLogo = `${import.meta.env.BASE_URL}uula-logo.png`;
const aumCampusImage = `${import.meta.env.BASE_URL}aum-campus.webp`;
const cyberCertificate = `${import.meta.env.BASE_URL}cybersecurity-certificate.jpg`;
const poetryEventImage = `${import.meta.env.BASE_URL}poetry-event.jpg`;
const uulaVideoFile = `${import.meta.env.BASE_URL}uula-ambassador-video-03.mp4`;
const uulaVideoUrl = 'https://www.instagram.com/reel/DRM9TDkk1FT/?igsi=N3QyMm9yZjdraTRj';
const uulaVideoEmbedUrl = 'https://www.instagram.com/reel/DRM9TDkk1FT/embed';

const navItems = [
  { id: 'about', label: 'عني' },
  { id: 'skills', label: 'المهارات' },
  { id: 'journey', label: 'المسيرة' },
  { id: 'projects', label: 'المشاريع' },
  { id: 'contact', label: 'تواصل' },
];

const skills = [
  { label: 'أساسيات البرمجة', note: 'منطق واضح، خطوة بخطوة', icon: Code2 },
  { label: 'أساسيات هندسة الكمبيوتر', note: 'فهم الأنظمة من الداخل', icon: Cpu },
  { label: 'أساسيات الأمن السيبراني', note: 'وعي وحماية للأنظمة والبيانات', icon: ShieldCheck },
  { label: 'حل المشكلات', note: 'أحوّل التعقيد إلى مسار', icon: Target },
  { label: 'التفكير المنطقي', note: 'أسأل قبل أن أبني', icon: BrainCircuit },
  { label: 'التعلم الذاتي', note: 'فضول لا يتوقف', icon: Sparkles },
  { label: 'إدارة الوقت', note: 'أحضر لما هو قادم', icon: Check },
  { label: 'التواصل والعمل الجماعي', note: 'أفضل الأفكار تُبنى معًا', icon: Users },
  { label: 'اللغة الإنجليزية', note: 'نافذة على المعرفة', icon: ArrowUpRight },
];

const interests = [
  { label: 'هندسة الكمبيوتر', icon: Cpu },
  { label: 'البرمجة', icon: Code2 },
  { label: 'الذكاء الاصطناعي', icon: BrainCircuit },
  { label: 'التقنيات الحديثة', icon: Sparkles },
  { label: 'القهوة المختصة', icon: Coffee },
];

function useRevealObserver() {
  useEffect(() => {
    const items = document.querySelectorAll<HTMLElement>('.reveal');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);
}

function SocialLinks({ dark = false, footer = false }: { dark?: boolean; footer?: boolean }) {
  return (
    <div className={`flex flex-nowrap items-center gap-3 ${dark ? 'text-[#edf0de]' : 'text-[#20364c]'}`} aria-label="حسابات نايف الاجتماعية">
      <a data-testid={footer ? 'link-footer-linkedin' : 'link-social-linkedin'} href="https://www.linkedin.com/" target="_blank" rel="noreferrer" className="social-icon" aria-label="حساب نايف خالد العتيبي على لينكدإن">
        <Linkedin size={19} aria-hidden="true" />
      </a>
      <a data-testid={footer ? 'link-footer-github' : 'link-social-github'} href="https://github.com/" target="_blank" rel="noreferrer" className="social-icon" aria-label="حساب نايف خالد العتيبي على GitHub">
        <Github size={19} aria-hidden="true" />
      </a>
      <a data-testid={footer ? 'link-footer-instagram' : 'link-social-instagram'} href={instagramUrl} target="_blank" rel="noreferrer" className="social-icon" aria-label="حساب نايف خالد العتيبي على إنستغرام">
        <Instagram size={19} aria-hidden="true" />
      </a>
    </div>
  );
}

function SectionIntro({ number, eyebrow, title, children }: { number: string; eyebrow: string; title: string; children?: ReactNode }) {
  return (
    <div className="reveal mb-12 grid gap-4 md:grid-cols-[150px_1fr] md:gap-10">
      <div className="flex items-start gap-3 pt-1">
        <span className="section-number">{number}</span>
        <span className="mt-2 h-px w-10 bg-[#bdd944]" />
      </div>
      <div>
        <p className="mb-3 text-sm font-semibold tracking-[.12em] text-[#ef7f64]">{eyebrow}</p>
        <h2 className="section-heading max-w-2xl text-4xl font-bold text-[#20364c] md:text-6xl">{title}</h2>
        {children}
      </div>
    </div>
  );
}

function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('about');
  const [copied, setCopied] = useState(false);
  const [showTop, setShowTop] = useState(false);
  const [isDark, setIsDark] = useState(() => {
    if (typeof window === 'undefined') return false;
    const savedTheme = window.localStorage.getItem('nayef-theme');
    return savedTheme ? savedTheme === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
  });
  useRevealObserver();

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
    window.localStorage.setItem('nayef-theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  useEffect(() => {
    const sections = navItems.map((item) => document.getElementById(item.id)).filter(Boolean) as HTMLElement[];
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible?.target.id) setActiveSection(visible.target.id);
    }, { rootMargin: '-20% 0px -65% 0px', threshold: [0, .2, .5] });
    sections.forEach((section) => observer.observe(section));
    const onScroll = () => setShowTop(window.scrollY > 600);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => { observer.disconnect(); window.removeEventListener('scroll', onScroll); };
  }, []);

  const goTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };
  const copyEmail = async () => {
    await navigator.clipboard?.writeText(email);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2200);
  };

  return (
    <div className="portfolio-shell min-h-[100dvh]">
      <header className="site-header fixed inset-x-0 top-0 z-20">
        <div className="section-wrap flex h-[74px] items-center justify-between">
          <button data-testid="button-logo-home" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="group flex items-center gap-3 text-right" aria-label="العودة إلى أعلى الصفحة">
            <span className="flex h-10 w-10 items-center justify-center rounded-[13px] bg-[#20364c] font-mono-custom text-sm font-bold text-[#bdd944] transition-transform group-hover:-rotate-6">ن</span>
            <span className="hidden text-sm font-bold text-[#20364c] sm:block">نايف خالد العتيبي</span>
          </button>
          <nav className="hidden items-center gap-7 md:flex" aria-label="التنقل الرئيسي">
            {navItems.map((item) => (
              <button data-testid={`button-nav-${item.id}`} key={item.id} onClick={() => goTo(item.id)} className={`nav-link text-sm font-semibold ${activeSection === item.id ? 'is-active' : ''}`}>{item.label}</button>
            ))}
          </nav>
          <div className="flex items-center gap-4">
            <button data-testid="button-theme-toggle" onClick={() => setIsDark((current) => !current)} className="theme-toggle inline-flex items-center gap-2 rounded-full border border-[#20364c]/20 px-3 py-2 text-xs font-semibold text-[#20364c] transition-colors hover:border-[#bdd944] hover:text-[#ef7f64]" aria-label={isDark ? 'تفعيل الوضع النهاري' : 'تفعيل الوضع الليلي'} title={isDark ? 'الوضع النهاري' : 'الوضع الليلي'}>
              {isDark ? <Sun size={16} aria-hidden="true" /> : <Moon size={16} aria-hidden="true" />}
              <span className="hidden sm:inline">{isDark ? 'نهاري' : 'ليلي'}</span>
            </button>
            <a data-testid="link-header-email" href={`mailto:${email}`} className="hidden items-center gap-2 text-sm font-semibold text-[#20364c] transition-colors hover:text-[#ef7f64] sm:flex">
              <span>لنتحدث</span><ArrowUpRight size={16} aria-hidden="true" />
            </a>
            <button data-testid="button-open-menu" onClick={() => setMenuOpen(true)} className="rounded-full p-2 text-[#20364c] md:hidden" aria-label="فتح قائمة التنقل"><Menu size={22} /></button>
          </div>
        </div>
        {menuOpen && (
          <div className="absolute inset-x-0 top-[74px] border-b border-[#20364c]/10 bg-[#f1efdf] p-5 shadow-lg md:hidden">
            <div className="mb-5 flex items-center justify-between">
              <span className="text-xs font-semibold tracking-[.16em] text-[#ef7f64]">القائمة</span>
              <button data-testid="button-close-menu" onClick={() => setMenuOpen(false)} className="rounded-full p-2 text-[#20364c]" aria-label="إغلاق قائمة التنقل"><X size={20} /></button>
            </div>
            <nav className="grid gap-4" aria-label="التنقل للجوال">
              {navItems.map((item) => <button data-testid={`button-mobile-nav-${item.id}`} key={item.id} onClick={() => goTo(item.id)} className="border-b border-[#20364c]/10 pb-3 text-right text-lg font-semibold text-[#20364c]">{item.label}</button>)}
            </nav>
          </div>
        )}
      </header>

      <main>
        <section className="relative flex min-h-[760px] items-center overflow-hidden pb-20 pt-32 md:min-h-[850px]">
          <div className="hero-grid absolute inset-0 -z-10" />
          <div className="hero-orbit hero-orbit--one -z-10" /><div className="hero-orbit hero-orbit--two -z-10" />
          <div className="section-wrap grid items-center gap-16 lg:grid-cols-[1.15fr_.85fr]">
            <div className="reveal">
              <div className="mb-7 flex items-center gap-3 text-sm font-semibold text-[#ef7f64]"><span className="h-2 w-2 rounded-full bg-[#bdd944]" /> متاح للتعلم، البناء، والتعاون</div>
                 <h1 data-testid="text-hero-name" className="max-w-4xl text-[clamp(3.6rem,10vw,8.8rem)] font-bold leading-[.92] tracking-[-.09em] text-[#20364c]">نايف خالد<br /><span className="mr-[.15em] text-[#ef7f64]">العتيبي</span></h1>
              <div className="mt-9 flex flex-col gap-6 border-r-2 border-[#bdd944] pr-5 sm:flex-row sm:items-start sm:gap-10">
                <p data-testid="text-hero-title" className="max-w-md text-lg font-medium leading-9 text-[#3d5368]">طالب هندسة كمبيوتر<br /><span className="font-mono-custom text-xs tracking-normal text-[#ef7f64]">Computer Engineering Student</span></p>
                <p data-testid="text-hero-intro" className="max-w-md leading-8 text-[#536577]">شغوف بالتقنية والتعلم والابتكار، وأسعى إلى تطوير مهاراتي وبناء مستقبل مهني مميز في مجال هندسة الكمبيوتر.</p>
              </div>
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <button data-testid="button-hero-contact" onClick={() => goTo('contact')} className="accent-button inline-flex items-center gap-3 rounded-full bg-[#bdd944] px-6 py-3.5 text-sm font-bold text-[#20364c]">تواصل معي <ArrowDown size={17} aria-hidden="true" /></button>
                <button data-testid="button-hero-about" onClick={() => goTo('about')} className="outline-button inline-flex items-center gap-3 rounded-full border border-[#20364c]/30 px-6 py-3.5 text-sm font-bold text-[#20364c]">اكتشف قصتي <ArrowUpRight size={17} aria-hidden="true" /></button>
              </div>
            </div>
            <div className="reveal reveal-delay-2 relative mx-auto w-full max-w-[420px]">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-[#20364c]/20 bg-[#20364c] p-6 shadow-[18px_20px_0_rgba(189,217,68,.55)]">
                 <img src={profileImage} alt="صورة نايف خالد العتيبي الشخصية" className="absolute inset-0 h-full w-full object-cover object-top" />
                 <div className="absolute inset-0 bg-gradient-to-t from-[#20364c] via-[#20364c]/15 to-transparent" />
                 <div className="absolute inset-0 opacity-25" style={{ backgroundImage: 'linear-gradient(rgba(189,217,68,.18) 1px, transparent 1px), linear-gradient(90deg, rgba(189,217,68,.18) 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
                 <div className="relative z-[1] flex h-full flex-col justify-between">
                  <div className="flex items-center justify-between text-[#bdd944]"><span className="font-mono-custom text-xs">NAYEF / 01</span><span className="h-3 w-3 rounded-full bg-[#ef7f64]" /></div>
                  <div><p className="font-mono-custom text-[10px] uppercase tracking-[.22em] text-[#bdd944]">curiosity in progress</p><p className="mt-3 max-w-xs text-2xl font-bold leading-9 text-[#edf0de]">أتعلم اليوم<br />لأبني غدًا.</p></div>
                </div>
              </div>
              <div className="absolute -bottom-6 -left-7 hidden rounded-2xl border border-[#20364c]/20 bg-[#f1efdf] p-4 shadow-[8px_9px_0_rgba(32,54,76,.14)] sm:block"><p className="font-mono-custom text-[10px] text-[#ef7f64]">STATUS</p><p className="mt-1 text-sm font-bold text-[#20364c]">في طور التطور</p></div>
            </div>
          </div>
        </section>

        <div className="section-wrap border-y border-[#20364c]/15 py-5">
          <div className="flex items-center justify-between gap-5 overflow-hidden whitespace-nowrap text-xs font-semibold text-[#667484]"><span className="font-mono-custom text-[#ef7f64]">01 — INTRODUCTION</span><span className="hidden sm:block">الكويت</span><span className="hidden sm:block">AUM / COMPUTER ENGINEERING</span><span className="font-mono-custom">2026—</span></div>
        </div>

        <section id="about" className="scroll-mt-24 py-28 md:py-40">
          <div className="section-wrap">
            <SectionIntro number="01" eyebrow="عن نايف" title="أحب أن أفهم كيف تعمل الأشياء، ثم أجد طريقة أفضل لبنائها.">
              <p data-testid="text-about" className="mt-6 max-w-2xl text-lg leading-9 text-[#536577]">أدرس هندسة الكمبيوتر في الجامعة الأمريكية في الشرق الأوسط، وأبني معرفتي على فضول حقيقي تجاه التكنولوجيا والبرمجة وأنظمة الكمبيوتر. أؤمن أن التعلم المستمر، وحل المشكلات، والمنطق، والابتكار ليست مواد دراسية فقط؛ بل طريقة أتعامل بها مع كل تحدٍ جديد.</p>
            </SectionIntro>
            <div className="grid gap-5 md:grid-cols-3">
              <div className="reveal reveal-delay-1 rounded-[1.5rem] border border-[#20364c]/15 bg-[#e6ebc8]/55 p-7 md:col-span-2"><p className="font-mono-custom text-xs text-[#ef7f64]">01 / MINDSET</p><p className="mt-12 max-w-xl text-3xl font-bold leading-[1.35] tracking-tight text-[#20364c]">كل سطر كود هو سؤال جديد، وكل سؤال فرصة لفهم أعمق.</p></div>
              <div className="reveal reveal-delay-2 rounded-[1.5rem] bg-[#ef7f64] p-7 text-[#20364c]"><Sparkles size={28} aria-hidden="true" /><p className="mt-20 text-xl font-bold leading-8">فضول عملي.<br />طموح هادئ.</p></div>
            </div>
          </div>
        </section>

        <section id="skills" className="scroll-mt-24 bg-[#e5e7d4]/65 py-28 md:py-36">
          <div className="section-wrap">
            <SectionIntro number="02" eyebrow="العدة التي أبني بها" title="أساس متين، وعقل مستعد للمجهول." />
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {skills.map((skill, index) => { const Icon = skill.icon; return <div data-testid={`card-skill-${index}`} key={skill.label} className={`skill-card reveal reveal-delay-${(index % 3) + 1} rounded-2xl border border-[#20364c]/15 bg-[#f1efdf]/75 p-5`}><Icon size={22} className="text-[#ef7f64]" aria-hidden="true" /><h3 className="mt-8 font-bold text-[#20364c]">{skill.label}</h3><p className="mt-2 text-sm leading-7 text-[#667484]">{skill.note}</p></div>; })}
            </div>
            <div className="reveal mt-10 flex flex-col justify-between gap-5 border-t border-[#20364c]/15 pt-5 text-sm text-[#667484] sm:flex-row"><span>أهتم أيضًا بالذكاء الاصطناعي والتقنيات الحديثة</span><span className="font-mono-custom text-xs text-[#ef7f64]">BUILD / LEARN / REPEAT</span></div>
          </div>
        </section>

        <section id="journey" className="scroll-mt-24 py-28 md:py-40">
          <div className="section-wrap">
            <SectionIntro number="03" eyebrow="المسيرة حتى الآن" title="الخطوة الأولى ليست صغيرة عندما تعرف إلى أين تتجه." />
            <div className="grid gap-5 lg:grid-cols-2">
              <div className="reveal timeline-card rounded-[1.5rem] border border-[#20364c]/15 bg-[#f1efdf]/60 p-7">
                <div className="flex items-start justify-between"><GraduationCap size={28} className="text-[#ef7f64]" /><span className="font-mono-custom text-xs text-[#ef7f64]">2026—</span></div>
                <div className="mb-6 overflow-hidden rounded-2xl border border-[#20364c]/15"><img src={aumCampusImage} alt="مبنى الجامعة الأمريكية في الشرق الأوسط AUM" className="block aspect-[815/371] h-auto w-full object-cover" /></div><p className="mt-8 text-xs font-bold tracking-[.12em] text-[#667484]">التعليم</p><h3 data-testid="text-education" className="mt-3 text-2xl font-bold leading-9 text-[#20364c]">الجامعة الأمريكية<br />في الشرق الأوسط (AUM)</h3><p className="mt-4 text-[#536577]">هندسة الكمبيوتر · الكويت</p>
              </div>
              <div className="reveal reveal-delay-1 timeline-card rounded-[1.5rem] border border-[#20364c]/15 bg-[#20364c] p-7 text-[#edf0de]">
                <div className="flex items-start justify-between gap-4"><div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl bg-[#0d111b] ring-1 ring-[#bdd944]/30"><img src={uulaLogo} alt="شعار منصة علا" className="h-full w-full object-cover" /></div><span className="pt-2 font-mono-custom text-xs text-[#bdd944]">EXPERIENCE / 01</span></div>
                <p className="mt-10 text-xs font-bold tracking-[.12em] text-[#bdd944]">خبرات واهتمامات تطبيقية</p><h3 data-testid="text-experience" className="mt-3 text-3xl font-bold">سفير منصة علا<br /><span className="text-[#bdd944]">(UULA Ambassador)</span></h3><p className="mt-5 max-w-lg leading-8 text-[#c6d0c5]">المساهمة في تمثيل منصة علا والتعريف بها، والتواصل مع الطلبة، وبناء حضور إيجابي يعكس قيمة التجربة التعليمية الرقمية.</p><div className="mt-7 flex flex-wrap gap-2" aria-label="خبرات نايف الإضافية"><span className="rounded-full border border-[#bdd944]/40 px-3 py-2 text-xs text-[#edf0de]">تعلم التسويق</span><span className="rounded-full border border-[#bdd944]/40 px-3 py-2 text-xs text-[#edf0de]">إدارة المشاريع الصغيرة</span><span className="rounded-full border border-[#bdd944]/40 px-3 py-2 text-xs text-[#edf0de]">تصميم الشعارات</span><span className="rounded-full border border-[#bdd944]/40 px-3 py-2 text-xs text-[#edf0de]">تصميم البوستات</span></div><div className="mt-8 grid gap-5 md:grid-cols-2" aria-label="فيديوهات سفير منصة علا"><a href={uulaVideoUrl} target="_blank" rel="noreferrer" className="group block" aria-label="مشاهدة فيديو سفير منصة علا على إنستغرام — يفتح في تبويب جديد"><div className="relative aspect-video overflow-hidden rounded-2xl border border-[#bdd944]/30 bg-[#0d111b]"><iframe src={uulaVideoEmbedUrl} title="فيديو سفير منصة علا على إنستغرام" loading="lazy" className="pointer-events-none absolute inset-0 h-full w-full border-0" /><div className="absolute inset-0 flex items-center justify-center bg-[#20364c]/20 transition-colors group-hover:bg-[#20364c]/5"><span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#bdd944] text-[#20364c] shadow-lg transition-transform group-hover:scale-110"><Play size={22} fill="currentColor" aria-hidden="true" /></span></div></div><span className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-[#bdd944]">فيديو Instagram <ArrowUpRight size={15} aria-hidden="true" /></span></a><a href={uulaVideoFile} target="_blank" rel="noreferrer" className="group block" aria-label="فتح الفيديو المرفق لسفير منصة علا — يفتح في علامة تبويب جديدة"><div className="relative aspect-video overflow-hidden rounded-2xl border border-[#bdd944]/30 bg-[#0d111b]"><video src={uulaVideoFile} autoPlay muted loop playsInline preload="metadata" title="فيديو سفير منصة علا المرفق" className="pointer-events-none absolute inset-0 h-full w-full object-cover" /><div className="absolute inset-0 flex items-center justify-center bg-[#20364c]/20 transition-colors group-hover:bg-[#20364c]/5"><span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#bdd944] text-[#20364c] shadow-lg transition-transform group-hover:scale-110"><Play size={22} fill="currentColor" aria-hidden="true" /></span></div></div><span className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-[#bdd944]">فتح الفيديو المرفق <ArrowUpRight size={15} aria-hidden="true" /></span></a></div>
              </div>
              <div className="reveal reveal-delay-2 timeline-card overflow-hidden rounded-[1.5rem] border border-[#20364c]/15 bg-[#f1efdf]/60 p-5 text-[#20364c] lg:col-span-2 lg:p-7">
                <div className="grid items-center gap-7 lg:grid-cols-[1.05fr_.95fr]">
                  <div className="order-2 lg:order-1">
                    <div className="flex items-start justify-between gap-4"><div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#20364c] text-[#bdd944]"><ShieldCheck size={23} aria-hidden="true" /></div><span className="pt-2 font-mono-custom text-xs text-[#ef7f64]">CERTIFICATE / 01</span></div>
                    <p className="mt-8 text-xs font-bold tracking-[.12em] text-[#ef7f64]">شهادة وتدريب</p><h3 className="mt-3 text-3xl font-bold leading-10">إتمام تدريب في الأمن السيبراني</h3><p className="mt-4 max-w-xl leading-8 text-[#536577]">إتمام 12 ساعة تدريبية في الأمن السيبراني، والمشاركة في هاكاثون كودد المقدّم من أكاديمية CODED.</p><p className="mt-5 font-mono-custom text-xs text-[#667484]">JULY 2024 · KUWAIT CODES</p>
                  </div>
                  <div className="order-1 overflow-hidden rounded-2xl border border-[#20364c]/15 bg-white lg:order-2"><img src={cyberCertificate} alt="شهادة إتمام تدريب الأمن السيبراني من أكاديمية CODED" className="block aspect-[1320/910] h-auto w-full object-cover" /></div>
                </div>
              </div>
              <div className="reveal reveal-delay-3 timeline-card overflow-hidden rounded-[1.5rem] border border-[#ef7f64]/35 bg-[#20364c] p-5 text-[#edf0de] lg:col-span-2 lg:p-7">
                <div className="grid items-center gap-7 lg:grid-cols-[.9fr_1.1fr]">
                  <div className="order-2 lg:order-1">
                    <div className="flex items-start justify-between gap-4"><div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#ef7f64] text-[#20364c]"><Sparkles size={23} aria-hidden="true" /></div><span className="pt-2 font-mono-custom text-xs text-[#bdd944]">COMMUNITY / 01</span></div>
                    <p className="mt-8 text-xs font-bold tracking-[.12em] text-[#bdd944]">مشاركة مجتمعية وثقافية</p><h3 className="mt-3 text-3xl font-bold leading-10">مشاركة في حفل شعري</h3><p className="mt-4 max-w-xl leading-8 text-[#c6d0c5]">المشاركة في حفل بحضور معالي محافظ مبارك الكبير بالتكليف الشيخ صباح بدر الصباح، في تجربة عززت الثقة بالنفس والقدرة على الحضور والتعبير أمام الجمهور.</p><p className="mt-5 font-mono-custom text-xs text-[#c6d0c5]">POETRY EVENT · KUWAIT</p>
                  </div>
                  <div className="order-1 flex justify-center overflow-hidden rounded-2xl lg:order-2"><img src={poetryEventImage} alt="نايف يشارك في حفل شعري على المسرح" className="block h-auto max-h-[320px] w-auto max-w-full rounded-2xl object-contain object-center" /></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="projects" className="scroll-mt-24 bg-[#20364c] py-28 text-[#edf0de] md:py-36">
          <div className="section-wrap">
            <SectionIntro number="04" eyebrow="مساحة العمل القادمة" title="المشاريع قادمة قريبًا." />
            <div className="grid items-end gap-12 lg:grid-cols-[1.1fr_.9fr]">
              <div className="reveal project-placeholder relative min-h-[320px] rounded-[1.7rem] border border-[#bdd944]/25 p-7">
                <div className="relative z-[1] flex h-full min-h-[266px] flex-col justify-between"><div className="flex items-center justify-between"><span className="font-mono-custom text-xs text-[#bdd944]">COMING SOON</span><span className="rounded-full border border-[#bdd944]/50 px-3 py-1 text-xs text-[#bdd944]">قيد البناء</span></div><p className="max-w-md text-3xl font-bold leading-[1.4]">أعمل حاليًا على تطوير مشاريع تقنية جديدة واكتساب المزيد من الخبرات.</p></div>
              </div>
              <div className="reveal reveal-delay-1"><p className="max-w-md text-lg leading-9 text-[#c6d0c5]">هذه المساحة ستتغير مع كل تجربة جديدة. أريد أن تكون المشاريع القادمة دليلًا حيًا على ما أتعلمه، لا مجرد قائمة بما أعرفه.</p><button data-testid="button-project-notify" onClick={() => goTo('contact')} className="mt-8 inline-flex items-center gap-3 text-sm font-bold text-[#bdd944] transition-colors hover:text-[#edf0de]">أخبرني بما تبنيه <ArrowUpRight size={17} aria-hidden="true" /></button></div>
            </div>
          </div>
        </section>

        <section className="py-28 md:py-36">
          <div className="section-wrap">
            <SectionIntro number="05" eyebrow="خارج الشاشة" title="أشياء تغذي فضولي." />
            <div className="flex flex-wrap gap-3">
              {interests.map((interest, index) => { const Icon = interest.icon; return <div data-testid={`card-interest-${index}`} key={interest.label} className="interest-card reveal inline-flex items-center gap-3 rounded-full border border-[#20364c]/15 bg-[#f1efdf]/70 px-5 py-3.5 text-[#20364c]"><Icon size={18} className="text-[#ef7f64]" aria-hidden="true" /><span className="font-semibold">{interest.label}</span></div>; })}
            </div>
          </div>
        </section>

        <section className="pb-28 md:pb-36">
          <div className="section-wrap">
            <div className="goal-panel reveal relative overflow-hidden rounded-[1.7rem] border border-[#ef7f64]/40 bg-[#ef7f64] p-8 md:p-14">
              <div className="relative z-[1] max-w-3xl"><p className="font-mono-custom text-xs tracking-[.16em] text-[#20364c]">THE DIRECTION</p><h2 className="section-heading mt-6 text-4xl font-bold text-[#20364c] md:text-6xl">هدفي؟ أن أحوّل المعرفة إلى أثر.</h2><p className="mt-7 max-w-2xl text-lg leading-9 text-[#3f4f57]">أطمح إلى تطوير نفسي في مجال هندسة الكمبيوتر، واكتساب خبرات عملية حقيقية، والمساهمة مستقبلًا في بناء حلول تقنية مبتكرة وذات قيمة. الرحلة طويلة، وهذا ما يجعلها ممتعة.</p></div>
              <div className="absolute -left-8 -top-16 h-64 w-64 rounded-full border border-[#20364c]/20" /><div className="absolute -left-2 -top-10 h-52 w-52 rounded-full border border-[#20364c]/15" />
            </div>
          </div>
        </section>

        <section id="contact" className="scroll-mt-24 pb-20 md:pb-28">
          <div className="section-wrap">
            <div className="contact-panel reveal rounded-[1.7rem] p-8 md:p-14">
              <div className="relative z-[1] grid gap-12 lg:grid-cols-[1fr_auto] lg:items-end">
                <div><p className="font-mono-custom text-xs tracking-[.16em] text-[#bdd944]">06 / SAY HELLO</p><h2 className="section-heading mt-5 max-w-2xl text-4xl font-bold md:text-7xl">لنبنِ شيئًا<br /><span className="text-[#bdd944]">يستحق التجربة.</span></h2><p className="mt-7 max-w-xl leading-8 text-[#c6d0c5]">فكرة، فرصة تعلم، أو مجرد حديث عن التقنية — يسعدني أن أسمع منك.</p></div>
                <div className="flex flex-col items-start gap-5 lg:items-end">
                  <a data-testid="link-contact-email" href={`mailto:${email}`} className="accent-button inline-flex items-center gap-3 rounded-full bg-[#bdd944] px-6 py-4 text-sm font-bold text-[#20364c]"><Mail size={18} aria-hidden="true" /> {email}</a>
                  <button data-testid="button-copy-email" onClick={copyEmail} className="inline-flex items-center gap-2 text-xs text-[#c6d0c5] transition-colors hover:text-[#bdd944]" aria-live="polite">{copied ? <Check size={14} /> : <span className="h-2 w-2 rounded-full bg-[#ef7f64]" />} {copied ? 'تم نسخ البريد' : 'نسخ البريد الإلكتروني'}</button>
                </div>
              </div>
              <div className="relative z-[1] mt-14 flex flex-col gap-5 border-t border-[#edf0de]/20 pt-6 sm:flex-row sm:items-center sm:justify-between"><span className="text-sm text-[#c6d0c5]">حساباتي المهنية والشخصية</span><SocialLinks dark /></div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-[#20364c]/15 py-8">
        <div className="section-wrap flex flex-col gap-7 sm:flex-row sm:items-center sm:justify-between">
          <div><p className="font-bold text-[#20364c]">نايف خالد العتيبي</p><p className="mt-1 text-xs text-[#667484]">طالب هندسة كمبيوتر · الكويت</p></div>
          <SocialLinks footer />
          <div className="text-left text-xs text-[#667484]"><a data-testid="link-footer-instagram" href={instagramUrl} target="_blank" rel="noreferrer" className="font-semibold text-[#20364c] underline decoration-[#ef7f64] underline-offset-4 transition-colors hover:text-[#ef7f64]" aria-label="إنستغرام نايف خالد العتيبي — يفتح في تبويب جديد">إنستغرام</a><p className="mt-2 font-mono-custom">© 2024 NAYEF</p></div>
        </div>
      </footer>

      <button data-testid="button-back-to-top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className={`back-top fixed bottom-6 left-6 z-20 flex h-12 w-12 items-center justify-center rounded-full border border-[#20364c]/20 bg-[#f1efdf] text-[#20364c] shadow-lg ${showTop ? 'opacity-100' : 'pointer-events-none opacity-0'}`} aria-label="العودة إلى أعلى الصفحة"><ChevronDown className="rotate-180" size={19} /></button>
    </div>
  );
}

function Router() {
  return <ErrorBoundary><Switch><Route path="/" component={Home} /><Route component={NotFound} /></Switch></ErrorBoundary>;
}

function App() {
  return <QueryClientProvider client={queryClient}><TooltipProvider><WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}><Router /></WouterRouter><Toaster /></TooltipProvider></QueryClientProvider>;
}

export default App;

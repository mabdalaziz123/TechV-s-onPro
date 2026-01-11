
import React, { useState, useEffect } from 'react';
import { ServiceCardProps, PortfolioItemProps } from './types';

type Page = 'home' | 'services' | 'portfolio' | 'blog' | 'contact';
type Language = 'ar' | 'en';

// Icons Components
const WebIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
    <polyline points="16 18 22 12 16 6"></polyline>
    <polyline points="8 6 2 12 8 18"></polyline>
  </svg>
);

const DesignIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
    <path d="M12 19l7-7 3 3-7 7-3-3z"></path>
    <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"></path>
    <path d="M2 2l7.586 7.586"></path>
    <circle cx="11" cy="11" r="2"></circle>
  </svg>
);

const MobileIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
    <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
    <line x1="12" y1="18" x2="12.01" y2="18"></line>
  </svg>
);

const AIIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
    <path d="M12 2a10 10 0 1 0 10 10H12V2z"></path>
    <path d="M12 12L2.21 12"></path>
    <path d="M12 12l5.44-5.44"></path>
    <path d="M12 12l5.44 5.44"></path>
    <path d="M12 12l-5.44 5.44"></path>
    <path d="M12 12l-5.44-5.44"></path>
    <circle cx="12" cy="12" r="3"></circle>
  </svg>
);

const SecurityIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
  </svg>
);

const CartIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
    <circle cx="9" cy="21" r="1"></circle>
    <circle cx="20" cy="21" r="1"></circle>
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
  </svg>
);

const LogoIcon = () => (
  <div className="w-10 h-10 bg-sky-500 rounded-xl flex items-center justify-center shadow-lg shadow-sky-500/30 group-hover:scale-110 transition-transform duration-300">
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white">
      <path d="M16 18L22 12L16 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M8 6L2 12L8 18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M13 4L11 20" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  </div>
);

const translations = {
  ar: {
    nav: {
      home: 'الرئيسية',
      services: 'خدماتنا',
      portfolio: 'أعمالنا',
      blog: 'المدونة',
      contact: 'اتصل بنا',
      start: 'ابدأ مشروعك'
    },
    hero: {
      badge: 'شريكك الرقمي الموثوق للنمو والابتكار',
      title1: 'نحن لا نبني أكواداً،',
      title2: 'نحن نصنع مستقبلاً رقمياً.',
      desc: 'وكالة متخصصة في هندسة الواجهات والبرمجيات المعقدة. نحول أفكارك الكبيرة إلى منتجات رقمية قابلة للتوسع ومذهلة بصرياً.',
      cta1: 'اطلب استشارة مجانية',
      cta2: 'تصفح قصص النجاح'
    },
    tech: {
      title: 'نحن نستخدم',
      span: 'أحدث التقنيات'
    },
    vision: {
      badge: 'رؤيتنا الاستراتيجية',
      title1: 'حوّل رؤيتك إلى',
      title2: 'واقع رقمي ملموس',
      desc: 'نحن لا نكتفي بتقديم خدمات برمجية، بل نقدم حلولاً استراتيجية تهدف لتعزيز حضور شركتك في السوق الرقمي المزدحم. من خلال دمج الذكاء الاصطناعي مع أفضل ممارسات تجربة المستخدم، نصنع تجارب تدوم طويلاً.',
      items: ['تصاميم تركز على الإنسان', 'أكواد برمجية نظيفة وقابلة للتوسع', 'تحليلات مدعومة بالذكاء الاصطناعي'],
      cta: 'اكتشف منهجيتنا في العمل',
      statLabel: 'إحصائية سريعة',
      statValue: '+95% من عملائنا يوصون بخدماتنا'
    },
    partners: 'موثوقون من قبل الشركات الرائدة',
    services: {
      title1: 'حلولنا',
      title2: 'المبتكرة',
      desc: 'نقدم مجموعة متكاملة من الخدمات التقنية المصممة خصيصاً لتلبية احتياجات أعمالك في العصر الرقمي.',
      items: [
        { t: 'تطوير الويب', d: 'بناء مواقع فائقة السرعة باستخدام أحدث التقنيات لضمان أفضل تجربة مستخدم.' },
        { t: 'تجربة المستخدم (UX/UI)', d: 'تصميم واجهات بديهية وجذابة تركز على تحويل الزوار إلى عملاء دائمين.' },
        { t: 'تطبيقات الجوال', d: 'تطوير تطبيقات Native و Cross-Platform توفر أداءً استثنائياً.' },
        { t: 'الذكاء الاصطناعي', d: 'دمج حلول Gemini و LLMs في عملياتك التشغيلية لزيادة الكفاءة.' },
        { t: 'الأمن السيبراني', d: 'حماية بياناتك وتطبيقاتك من التهديدات الخارجية باستخدام أفضل معايير التشفير والأمان.' },
        { t: 'التجارة الإلكترونية', d: 'تطوير منصات بيع متكاملة تدعم طرق الدفع المختلفة وتوفر رحلة شراء سلسة.' }
      ]
    },
    portfolio: {
      title1: 'قصص',
      title2: 'النجاح',
      desc: 'نستعرض هنا بعضاً من المشاريع التي ساعدنا عملاءنا من خلالها على الوصول إلى القمة.',
      viewDetails: 'عرض التفاصيل'
    },
    blog: {
      title1: 'مدونة',
      title2: 'التكنولوجيا',
      desc: 'تابع آخر المستجدات في عالم التقنية، تجربة المستخدم، والذكاء الاصطناعي.',
      readMore: 'اقرأ المزيد',
      posts: [
        { t: 'مستقبل الويب في 2025', d: 'كيف سيغير الذكاء الاصطناعي طريقة بناء المواقع الإلكترونية؟', date: '15 أكتوبر 2024', img: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=800' },
        { t: 'تحسين تجربة المستخدم', d: 'أسرار التصميم التي تجعل العميل يثق في موقعك.', date: '10 أكتوبر 2024', img: 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=800' },
        { t: 'الحوسبة السحابية', d: 'فوائد الأمان والسرعة التي ستحصل عليها شركتك.', date: '05 أكتوبر 2024', img: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80&w=800' }
      ]
    },
    contact: {
      badge: 'تحدث إلينا',
      title1: 'لنبني شيئاً',
      title2: 'مذهلاً معاً',
      desc: 'نحن متحمسون لسماع فكرتك القادمة. سواء كنت تبحث عن استشارة بسيطة أو ترغب في بدء مشروع ضخم، فريقنا هنا لدعمك.',
      email: 'البريد الإلكتروني',
      location: 'الموقع',
      locValue: 'دمشق ، قدسيا',
      namePlac: 'الاسم',
      emailPlac: 'البريد',
      msgPlac: 'تفاصيل المشروع...',
      send: 'أرسل الطلب الآن',
      options: ['تطوير ويب', 'تطبيقات جوال', 'تصميم UX/UI'],
      whatsapp: 'تواصل معنا واتساب'
    },
    footer: {
      desc: 'نحن هنا لنبني الجيل القادم من التجارب الرقمية. هل أنت مستعد للبدء؟',
      quickLinks: 'الروابط السريعة',
      contact: 'تواصل معنا',
      rights: 'جميع الحقوق محفوظة.'
    }
  },
  en: {
    nav: {
      home: 'Home',
      services: 'Services',
      portfolio: 'Portfolio',
      blog: 'Blog',
      contact: 'Contact',
      start: 'Start Project'
    },
    hero: {
      badge: 'Your Trusted Digital Partner for Growth',
      title1: 'We don’t just build code,',
      title2: 'We craft digital futures.',
      desc: 'A specialized agency in interface engineering and complex software. We transform your big ideas into scalable and visually stunning digital products.',
      cta1: 'Get Free Consultation',
      cta2: 'Browse Success Stories'
    },
    tech: {
      title: 'We Use',
      span: 'Latest Technologies'
    },
    vision: {
      badge: 'Strategic Vision',
      title1: 'Turn your vision into',
      title2: 'Tangible Digital Reality',
      desc: 'We don’t just provide software services; we offer strategic solutions aimed at enhancing your company’s presence in a crowded digital market. By merging AI with UX best practices, we create lasting experiences.',
      items: ['Human-centric designs', 'Clean, scalable code', 'AI-powered analytics'],
      cta: 'Discover our workflow',
      statLabel: 'Quick Stat',
      statValue: '+95% of our clients recommend us'
    },
    partners: 'Trusted by Leading Companies',
    services: {
      title1: 'Our Innovative',
      title2: 'Solutions',
      desc: 'We offer a comprehensive range of technical services tailored to meet your business needs in the digital age.',
      items: [
        { t: 'Web Development', d: 'Building ultra-fast websites using latest techs like React and Next.js.' },
        { t: 'UX/UI Design', d: 'Designing intuitive and attractive interfaces focused on conversion.' },
        { t: 'Mobile Apps', d: 'Developing Native and Cross-Platform apps with exceptional performance.' },
        { t: 'Artificial Intelligence', d: 'Integrating Gemini and LLMs into your operations for efficiency.' },
        { t: 'Cyber Security', d: 'Protecting your data and apps from external threats with top standards.' },
        { t: 'E-Commerce', d: 'Developing integrated sales platforms that support various payments.' }
      ]
    },
    portfolio: {
      title1: 'Success',
      title2: 'Stories',
      desc: 'Explore some of the projects where we helped our clients reach the top.',
      viewDetails: 'View Details'
    },
    blog: {
      title1: 'Tech',
      title2: 'Blog',
      desc: 'Follow the latest developments in tech, UX, and Artificial Intelligence.',
      readMore: 'Read More',
      posts: [
        { t: 'Future of Web in 2025', d: 'How AI will change the way we build websites?', date: 'Oct 15, 2024', img: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=800' },
        { t: 'Improving UX', d: 'Design secrets that build trust with your customers.', date: 'Oct 10, 2024', img: 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=800' },
        { t: 'Cloud Computing', d: 'Security and speed benefits for your business.', date: 'Oct 05, 2024', img: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80&w=800' }
      ]
    },
    contact: {
      badge: 'Talk to Us',
      title1: 'Let’s Build',
      title2: 'Something Amazing',
      desc: 'We are excited to hear your next idea. Whether for a simple consultation or a huge project, our team is here to support you.',
      email: 'Email',
      location: 'Location',
      locValue: 'Damascus, Qudsaya',
      namePlac: 'Name',
      emailPlac: 'Email',
      msgPlac: 'Project details...',
      send: 'Send Request',
      options: ['Web Development', 'Mobile Apps', 'UX/UI Design'],
      whatsapp: 'Chat on WhatsApp'
    },
    footer: {
      desc: 'Web are here to build the next generation of digital experiences. Ready to start?',
      quickLinks: 'Quick Links',
      contact: 'Contact Us',
      rights: 'All rights reserved.'
    }
  }
};

const Header: React.FC<{ activePage: Page, setActivePage: (p: Page) => void, lang: Language, setLang: (l: Language) => void }> = ({ activePage, setActivePage, lang, setLang }) => {
  const t = translations[lang].nav;
  return (
    <header className="fixed top-0 left-0 right-0 z-40 glass-effect border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between transition-all duration-300">
        <div className="flex items-center gap-3 cursor-pointer group" onClick={() => setActivePage('home')}>
          <LogoIcon />
          <span className="text-xl font-bold tracking-tight">TechVision <span className="text-sky-400">Pro</span></span>
        </div>
        <nav className="hidden md:flex items-center gap-8 font-bold text-base">
          {[
            { id: 'home', label: t.home },
            { id: 'services', label: t.services },
            { id: 'portfolio', label: t.portfolio },
            { id: 'blog', label: t.blog },
            { id: 'contact', label: t.contact }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActivePage(item.id as Page)}
              className={`transition-all relative py-1 ${activePage === item.id ? 'text-sky-400' : 'hover:text-sky-400 text-slate-300'}`}
            >
              {item.label}
              {activePage === item.id && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-sky-400 rounded-full shadow-[0_0_8px_rgba(56,189,248,0.5)]"></span>
              )}
            </button>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')}
            className="px-3 py-1.5 rounded-lg glass-effect hover:bg-white/10 transition-all font-bold text-xs uppercase"
          >
            {lang === 'ar' ? 'English' : 'العربية'}
          </button>
          <button 
            onClick={() => setActivePage('contact')}
            className="bg-sky-500 hover:bg-sky-600 px-6 py-2.5 rounded-full font-black text-base transition-all shadow-xl shadow-sky-500/25 text-white hover:scale-105 active:scale-95"
          >
            {t.start}
          </button>
        </div>
      </div>
    </header>
  );
};

const Hero: React.FC<{ onCtaClick: () => void, lang: Language }> = ({ onCtaClick, lang }) => {
  const t = translations[lang].hero;
  return (
    <section className="relative pt-48 pb-32 overflow-hidden">
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-sky-500/10 rounded-full blur-[120px] -z-10 animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-[120px] -z-10 animate-pulse delay-1000"></div>
      
      <div className={`max-w-7xl mx-auto px-6 text-center ${lang === 'en' ? 'text-left md:text-center' : 'text-right md:text-center'}`}>
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-effect border border-white/5 mb-8">
          <span className="w-2 h-2 rounded-full bg-sky-400 animate-ping"></span>
          <span className="text-xs font-black uppercase tracking-wider text-sky-400">{t.badge}</span>
        </div>
        
        <h1 className="text-5xl md:text-8xl lg:text-9xl font-black mb-8 leading-[0.9] tracking-tighter">
          {t.title1} <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-indigo-400 to-sky-400 bg-[length:200%_auto] animate-gradient">
            {t.title2}
          </span>
        </h1>
        
        <p className="text-lg md:text-2xl text-slate-400 max-w-3xl mx-auto mb-12 leading-relaxed font-medium">
          {t.desc}
        </p>
        
        <div className="flex flex-col md:flex-row items-center justify-center gap-6">
          <button 
            onClick={onCtaClick}
            className="w-full md:w-auto px-10 py-5 bg-sky-500 hover:bg-sky-600 rounded-2xl font-black text-xl transition-all shadow-2xl shadow-sky-500/40 hover:scale-105 active:scale-95 text-white"
          >
            {t.cta1}
          </button>
          <button className="w-full md:w-auto px-10 py-5 glass-effect hover:bg-white/10 rounded-2xl font-black text-xl transition-all border border-white/10 hover:scale-105 active:scale-95">
            {t.cta2}
          </button>
        </div>
      </div>
    </section>
  );
};

const WhatsAppButton: React.FC<{ lang: Language }> = ({ lang }) => {
  const t = translations[lang].contact;
  return (
    <div className="fixed bottom-8 right-8 z-50 group flex items-center gap-4">
      <div className={`opacity-0 group-hover:opacity-100 transition-opacity glass-effect px-4 py-2 rounded-xl text-xs font-bold text-white shadow-2xl whitespace-nowrap pointer-events-none ${lang === 'ar' ? 'order-2' : 'order-1'}`}>
        {t.whatsapp}
      </div>
      <a
        href="https://wa.me/963992073150"
        target="_blank"
        rel="noopener noreferrer"
        className={`w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-xl shadow-[#25D366]/30 hover:scale-110 active:scale-95 transition-all animate-bounce-slow ${lang === 'ar' ? 'order-1' : 'order-2'}`}
      >
        <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.94 3.659 1.437 5.634 1.437h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>
    </div>
  );
};

const ServiceCard: React.FC<ServiceCardProps> = ({ title, description, icon }) => (
  <div className="glass-effect p-8 rounded-3xl group hover:border-sky-500/50 transition-all duration-300 text-start">
    <div className="w-12 h-12 bg-sky-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-sky-500 group-hover:text-white text-sky-400 transition-all">
      {icon}
    </div>
    <h3 className="text-xl font-bold mb-4">{title}</h3>
    <p className="text-slate-400 leading-relaxed text-sm">{description}</p>
  </div>
);

const PortfolioItem: React.FC<PortfolioItemProps & { lang: Language }> = ({ title, category, imageUrl, lang }) => (
  <div className="group relative rounded-3xl overflow-hidden aspect-[16/10] text-start bg-slate-800 shadow-xl">
    <img src={imageUrl} alt={title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" onError={(e) => {
        (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=800";
    }} />
    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-90"></div>
    <div className="absolute bottom-6 right-6 left-6">
      <span className="text-sky-400 text-xs font-bold uppercase tracking-widest">{category}</span>
      <h3 className="text-xl font-bold mt-1">{title}</h3>
      <div className={`mt-3 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2 text-xs font-bold ${lang === 'en' ? 'flex-row' : 'flex-row-reverse'}`}>
        {translations[lang].portfolio.viewDetails}
        <svg className={`w-3.5 h-3.5 ${lang === 'ar' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
      </div>
    </div>
  </div>
);

const Footer: React.FC<{ setActivePage: (p: Page) => void, lang: Language }> = ({ setActivePage, lang }) => {
  const t = translations[lang].footer;
  const nt = translations[lang].nav;

  const socialIcons: Record<string, React.ReactNode> = {
    LinkedIn: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
      </svg>
    ),
    Facebook: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    ),
    Instagram: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
      </svg>
    ),
    GitHub: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
      </svg>
    )
  };

  return (
    <footer className="pt-20 pb-10 px-6 border-t border-white/5 bg-slate-950/50 text-start">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-6 group cursor-pointer" onClick={() => setActivePage('home')}>
              <LogoIcon />
              <span className="text-2xl font-bold">TechVision <span className="text-sky-400">Pro</span></span>
            </div>
            <p className="text-slate-400 text-lg mb-8 max-w-md">
              {t.desc}
            </p>
            <div className="flex gap-4">
              {['LinkedIn', 'Facebook', 'Instagram', 'GitHub'].map((social) => (
                <a key={social} href="#" className="w-11 h-11 glass-effect rounded-xl flex items-center justify-center hover:bg-sky-500 hover:text-white text-slate-400 transition-all duration-300" title={social}>
                  <span className="sr-only">{social}</span>
                  {socialIcons[social]}
                </a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-6">{t.quickLinks}</h4>
            <ul className="space-y-4 text-slate-400 text-sm">
              <li><button onClick={() => setActivePage('home')} className="hover:text-white transition-colors">{nt.home}</button></li>
              <li><button onClick={() => setActivePage('portfolio')} className="hover:text-white transition-colors">{nt.portfolio}</button></li>
              <li><button onClick={() => setActivePage('services')} className="hover:text-white transition-colors">{nt.services}</button></li>
              <li><button onClick={() => setActivePage('blog')} className="hover:text-white transition-colors">{nt.blog}</button></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-6">{t.contact}</h4>
            <p className="text-slate-400 mb-2 text-sm font-medium">techvisionpro6@gmail.com</p>
            <p className="text-slate-400 mb-2 text-sm font-medium">+963 992 073 150</p>
            <p className="text-slate-400 mt-4 text-sm">{translations[lang].contact.locValue}</p>
          </div>
        </div>
        <div className="text-center text-slate-500 text-sm border-t border-white/5 pt-8">
          &copy; {new Date().getFullYear()} TechVision Pro. {t.rights}
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [lang, setLang] = useState<Language>('ar');

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }, [lang]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const name = (document.getElementById('name') as HTMLInputElement).value;
    const email = (document.getElementById('email') as HTMLInputElement).value;
    const service = (document.getElementById('service') as HTMLSelectElement).value;
    const message = (document.getElementById('message') as HTMLTextAreaElement).value;
    
    const subject = encodeURIComponent(`Project Request from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nService: ${service}\nDetails: ${message}`);
    window.location.href = `mailto:techvisionpro6@gmail.com?subject=${subject}&body=${body}`;
  };

  const renderPage = () => {
    const t = translations[lang];
    // Define icons map for services
    const serviceIcons = [
      <WebIcon />,
      <DesignIcon />,
      <MobileIcon />,
      <AIIcon />,
      <SecurityIcon />,
      <CartIcon />
    ];

    switch (currentPage) {
      case 'home':
        return (
          <>
            <Hero onCtaClick={() => setCurrentPage('contact')} lang={lang} />
            
            {/* Tech Stack */}
            <section className="py-20 bg-slate-900/30 border-y border-white/5">
              <div className="max-w-7xl mx-auto px-6 text-center">
                <h2 className="text-3xl md:text-5xl font-black mb-12">
                  {t.tech.title} <span className="text-sky-400">{t.tech.span}</span>
                </h2>
                <div className="flex flex-wrap justify-center gap-12 md:gap-20 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-700">
                  {['React', 'Next.js', 'Tailwind', 'Node.js', 'TypeScript', 'Gemini AI'].map(tech => (
                    <span key={tech} className="text-2xl md:text-4xl font-black tracking-tighter">{tech}</span>
                  ))}
                </div>
              </div>
            </section>

            {/* Vision Section */}
            <section className="py-32">
              <div className={`max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center gap-20 ${lang === 'en' ? 'text-left' : 'text-right'}`}>
                <div className="flex-1">
                  <span className="text-sky-400 font-black text-lg mb-4 block uppercase tracking-widest">{t.vision.badge}</span>
                  <h2 className="text-4xl md:text-6xl lg:text-7xl font-black mb-8 leading-[1.1]">
                    {t.vision.title1} <br />
                    <span className="text-sky-400">{t.vision.title2}</span>
                  </h2>
                  <p className="text-lg md:text-xl text-slate-400 leading-relaxed mb-10 font-medium">
                    {t.vision.desc}
                  </p>
                  <ul className="space-y-5 mb-12">
                    {t.vision.items.map((item, i) => (
                      <li key={i} className={`flex items-center gap-4 text-lg md:text-xl font-black ${lang === 'ar' ? 'flex-row' : 'flex-row-reverse justify-end'}`}>
                        {item}
                        <div className="w-8 h-8 rounded-xl bg-sky-500/20 flex items-center justify-center text-sky-400 shrink-0 shadow-lg shadow-sky-500/5">✓</div>
                      </li>
                    ))}
                  </ul>
                  <button onClick={() => setCurrentPage('services')} className={`text-sky-400 font-black text-xl flex items-center gap-3 group ${lang === 'en' ? 'flex-row' : 'flex-row-reverse'}`}>
                    {t.vision.cta}
                    <svg className={`w-6 h-6 transition-transform duration-300 ${lang === 'ar' ? 'rotate-180 group-hover:translate-x-[-8px]' : 'group-hover:translate-x-[8px]'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                  </button>
                </div>
                <div className="flex-1 w-full h-[550px] glass-effect rounded-[48px] overflow-hidden relative group shadow-2xl border border-white/5 bg-slate-800">
                  <div className="absolute inset-0 bg-gradient-to-br from-sky-500/20 to-indigo-500/20 z-10 group-hover:opacity-40 transition-opacity duration-700"></div>
                  <img src="https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&q=80&w=1200&h=1600" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" alt="Full Stack Code" />
                  <div className="absolute bottom-10 left-10 right-10 bg-slate-900/90 backdrop-blur-xl p-6 rounded-2xl z-20 border border-white/10 shadow-2xl">
                     <p className="text-sm font-black text-sky-400 mb-1 uppercase tracking-widest">{t.vision.statLabel}</p>
                     <p className="text-2xl font-black">{t.vision.statValue}</p>
                  </div>
                </div>
              </div>
            </section>
          </>
        );
      case 'services':
        return (
          <section className="pt-48 pb-20 px-6">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-20">
                <h2 className="text-4xl md:text-5xl font-black mb-4">{t.services.title1} <span className="text-sky-400">{t.services.title2}</span></h2>
                <p className="text-slate-400 max-w-2xl mx-auto">{t.services.desc}</p>
              </div>
              <div className="grid md:grid-cols-3 gap-8">
                {t.services.items.map((s, idx) => (
                  <ServiceCard 
                    key={idx}
                    title={s.t} 
                    description={s.d} 
                    icon={serviceIcons[idx]}
                  />
                ))}
              </div>
            </div>
          </section>
        );
      case 'portfolio':
        return (
          <section className="pt-48 pb-20 px-6">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-black mb-4">{t.portfolio.title1} <span className="text-sky-400">{t.portfolio.title2}</span></h2>
                <p className="text-slate-400 max-w-2xl mx-auto">{t.portfolio.desc}</p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <PortfolioItem title="RealEstate Hub" category="Web App" imageUrl="https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=800" lang={lang} />
                <PortfolioItem title="PayQuick Wallet" category="Mobile App" imageUrl="https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=800" lang={lang} />
                <PortfolioItem title="EduSmart Portal" category="E-Learning" imageUrl="https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&q=80&w=800" lang={lang} />
                <PortfolioItem title="ERP Pro" category="Enterprise" imageUrl="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800" lang={lang} />
                <PortfolioItem title="HealthMate" category="Health & Fitness" imageUrl="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800" lang={lang} />
                <PortfolioItem title="Fashion Store" category="E-Commerce" imageUrl="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=800" lang={lang} />
              </div>
            </div>
          </section>
        );
      case 'blog':
        return (
          <section className="pt-48 pb-20 px-6">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-black mb-4">{t.blog.title1} <span className="text-sky-400">{t.blog.title2}</span></h2>
                <p className="text-slate-400 max-w-2xl mx-auto">{t.blog.desc}</p>
              </div>
              <div className="grid md:grid-cols-3 gap-8">
                {t.blog.posts.map((post, idx) => (
                  <div key={idx} className="glass-effect rounded-3xl overflow-hidden group hover:border-sky-500/30 transition-all text-start">
                    <div className="h-48 w-full overflow-hidden bg-gradient-to-br from-slate-800 to-slate-900 relative">
                      <img 
                        src={post.img} 
                        className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500" 
                        alt={post.t} 
                        loading="lazy"
                        onError={(e) => {
                          // Fallback to a solid reliable tech pattern or another image if this fails
                          (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800";
                        }}
                      />
                    </div>
                    <div className="p-6">
                      <span className="text-xs text-sky-400 font-bold mb-2 block">{post.date}</span>
                      <h3 className="text-xl font-bold mb-4">{post.t}</h3>
                      <p className="text-slate-400 text-sm mb-6">{post.d}</p>
                      <button className={`text-white font-bold text-sm flex items-center gap-2 ${lang === 'en' ? 'flex-row' : 'flex-row-reverse'}`}>
                        {t.blog.readMore} 
                        <svg className={`w-4 h-4 ${lang === 'ar' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        );
      case 'contact':
        return (
          <section className="pt-48 pb-20 px-6">
            <div className={`max-w-7xl mx-auto grid md:grid-cols-2 gap-16 ${lang === 'en' ? 'text-left' : 'text-right'}`}>
              <div>
                <span className="text-sky-400 font-bold mb-4 block">{t.contact.badge}</span>
                <h2 className="text-5xl font-black mb-6 leading-tight">{t.contact.title1} <span className="text-sky-400">{t.contact.title2}</span></h2>
                <p className="text-slate-400 text-lg mb-10 leading-relaxed">
                  {t.contact.desc}
                </p>
                <div className="space-y-6">
                  <div className={`flex items-center gap-4 ${lang === 'en' ? 'flex-row' : 'flex-row-reverse'}`}>
                    <div className="w-12 h-12 bg-sky-500/10 rounded-xl flex items-center justify-center text-sky-400 font-bold text-xl">@</div>
                    <div>
                      <p className="text-xs text-slate-500 font-bold">{t.contact.email}</p>
                      <p className="text-white font-bold">techvisionpro6@gmail.com</p>
                    </div>
                  </div>
                  <div className={`flex items-center gap-4 ${lang === 'en' ? 'flex-row' : 'flex-row-reverse'}`}>
                    <div className="w-12 h-12 bg-sky-500/10 rounded-xl flex items-center justify-center text-sky-400">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 font-bold">{t.contact.location}</p>
                      <p className="text-white font-bold">{t.contact.locValue}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="glass-effect p-8 rounded-[40px] shadow-2xl">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <input id="name" required className="w-full bg-slate-900/50 border border-white/10 rounded-xl p-4 focus:border-sky-500 outline-none transition-colors" placeholder={t.contact.namePlac} />
                    <input id="email" type="email" required className="w-full bg-slate-900/50 border border-white/10 rounded-xl p-4 focus:border-sky-500 outline-none transition-colors" placeholder={t.contact.emailPlac} />
                  </div>
                  <select id="service" className="w-full bg-slate-900/50 border border-white/10 rounded-xl p-4 focus:border-sky-500 outline-none appearance-none">
                    {t.contact.options.map(opt => <option key={opt}>{opt}</option>)}
                  </select>
                  <textarea id="message" required className="w-full bg-slate-900/50 border border-white/10 rounded-xl p-4 h-32 focus:border-sky-500 outline-none transition-colors" placeholder={t.contact.msgPlac}></textarea>
                  <button type="submit" className="w-full bg-sky-500 py-4 rounded-xl font-black text-white hover:bg-sky-600 transition-all shadow-lg shadow-sky-500/20">{t.contact.send}</button>
                </form>
              </div>
            </div>
          </section>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen selection:bg-sky-500 selection:text-white overflow-x-hidden">
      <Header activePage={currentPage} setActivePage={setCurrentPage} lang={lang} setLang={setLang} />
      <main className="transition-all duration-500">{renderPage()}</main>
      <Footer setActivePage={setCurrentPage} lang={lang} />
      <WhatsAppButton lang={lang} />
    </div>
  );
}

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronDown, 
  ArrowRight, 
  GraduationCap, 
  TrendingUp, 
  Quote, 
  Instagram, 
  Send, 
  Mail,
  Menu,
  X
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import PrivacyPolicy from './pages/PrivacyPolicy';
import PublicOffer from './pages/PublicOffer';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Components ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Об эксперте', href: '#about' },
    { name: 'Программы', href: '#programs' },
    { name: 'Отзывы', href: '#reviews' },
    { name: 'FAQ', href: '#faq' },
  ];

  return (
    <nav className={cn(
      "fixed top-0 w-full z-50 transition-all duration-500 px-6 md:px-12 py-6 flex justify-between items-center",
      isScrolled ? "bg-bg/80 backdrop-blur-xl py-4 shadow-xl" : "bg-transparent"
    )}>
      <div className="font-serif text-xl md:text-2xl font-bold tracking-tighter text-text">
        LIANA GETMAN
      </div>
      
      <div className="hidden md:flex gap-10">
        {navLinks.map((link) => (
          <a 
            key={link.name}
            href={link.href} 
            className="text-text/80 hover:text-primary transition-colors font-medium text-xs uppercase tracking-widest"
          >
            {link.name}
          </a>
        ))}
      </div>

      <div className="flex items-center gap-4">
        <button className="hidden sm:block bg-primary-dark/20 border border-primary-dark/30 text-primary px-6 py-2 rounded-full font-bold hover:bg-primary-dark/40 transition-all text-[10px] uppercase tracking-widest">
          Купить
        </button>
        <button 
          className="md:hidden text-text"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-bg border-b border-white/5 p-6 flex flex-col gap-4 md:hidden"
          >
            {navLinks.map((link) => (
              <a 
                key={link.name}
                href={link.href} 
                className="text-text text-lg font-serif"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <button className="w-full bg-primary-dark text-white py-4 rounded-xl font-bold uppercase tracking-widest text-xs">
              Купить
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center px-6 pt-24 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div 
          className="w-full h-full bg-cover bg-center opacity-40 scale-105 transition-opacity duration-1000" 
          style={{ backgroundImage: "url('/hero/hero-bg.jpg')" }}
        />
        {/* Fallback for Hero BG */}
        <div 
          className="absolute inset-0 w-full h-full bg-cover bg-center opacity-40 scale-105 pointer-events-none -z-10"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&q=80&w=1920')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-transparent to-bg/50" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative z-10 max-w-5xl text-center space-y-8"
      >
        <h1 className="font-serif text-5xl md:text-8xl lg:text-9xl leading-[0.9] font-normal tracking-tight text-text">
          Стань <span className="italic-accent text-primary">востребованным</span> мастером маникюра
        </h1>
        <p className="text-lg md:text-xl font-light text-text-muted max-w-2xl mx-auto leading-relaxed tracking-wide">
          Авторские методики от Лианы Гетман: <span className="italic-accent">ваш путь</span> от новичка до топового эксперта индустрии.
        </p>
        <div className="pt-8">
          <button className="bg-gradient-to-r from-primary to-primary-dark px-14 py-5 rounded-full text-white font-bold tracking-[0.2em] text-[10px] uppercase transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(153,15,15,0.4)] active:scale-95">
            Выбрать курс
          </button>
        </div>
      </motion.div>

      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-primary/60"
      >
        <span className="text-[10px] uppercase tracking-[0.4em] font-bold">Листайте</span>
        <ChevronDown size={20} />
      </motion.div>
    </section>
  );
};

const About = () => {
  return (
    <section id="about" className="py-32 px-6 bg-bg">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 md:gap-24 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-surface shadow-2xl">
            <img 
              alt="Liana Getman" 
              className="w-full h-full object-cover"
              src="/about/liana.jpg"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?auto=format&fit=crop&q=80&w=800";
              }}
            />
          </div>
          <div className="absolute -bottom-6 -left-6 w-32 h-32 border border-primary/20 rounded-2xl -z-10" />
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          <div>
            <span className="text-primary font-bold tracking-[0.4em] uppercase text-[10px] mb-4 block">Эксперт</span>
            <h2 className="font-serif text-5xl md:text-7xl font-normal leading-tight">Лиана <span className="italic-accent">Гетман</span></h2>
          </div>
          <div className="space-y-6 text-text-muted text-lg font-light leading-relaxed">
            <p>Мой путь в индустрии начался с мечты о создании <span className="italic-accent">идеального сервиса</span> и безупречного качества. Сегодня я делюсь опытом, который помог сотням учениц выйти на доход от 150.000₽.</p>
            <p>Я создала систему обучения, которая исключает ошибки новичков и дает твердые навыки для работы в <span className="italic-accent">премиум-сегменте</span>.</p>
          </div>
          <div className="grid grid-cols-2 gap-12 pt-8 border-t border-white/5">
            <div>
              <div className="text-4xl font-serif italic text-primary">8+</div>
              <div className="text-[10px] uppercase tracking-widest font-bold opacity-50 mt-2">Лет в индустрии</div>
            </div>
            <div>
              <div className="text-4xl font-serif italic text-primary">1500+</div>
              <div className="text-[10px] uppercase tracking-widest font-bold opacity-50 mt-2">Учениц</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const Audience = () => {
  const cards = [
    {
      title: "Для новичков",
      icon: <GraduationCap size={40} />,
      desc: "Освойте профессию с нуля. Я дам вам фундаментальную базу, уверенность в движениях и первых клиентов уже во время курса.",
      list: ["Постановка руки", "Техника чистого маникюра", "Психология работы"]
    },
    {
      title: "Действующим мастерам",
      icon: <TrendingUp size={40} />,
      desc: "Повысьте чек, сократите время работы и научитесь сложным техникам моделирования, которые выделят вас на рынке.",
      list: ["Скоростные техники", "Архитектура ногтей", "Личный бренд"]
    }
  ];

  return (
    <section className="py-32 px-6">
      <div className="max-w-6xl mx-auto space-y-20">
        <div className="text-center space-y-4">
          <span className="text-primary font-bold tracking-[0.4em] uppercase text-[10px]">Возможности</span>
          <h2 className="font-serif text-4xl md:text-6xl font-normal">Для <span className="italic-accent">кого</span> обучение?</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          {cards.map((card, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="group bg-surface rounded-3xl p-10 md:p-12 hover:bg-surface-bright transition-all duration-500 border border-white/5 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity text-text">
                {card.icon}
              </div>
              <h3 className="font-serif text-3xl font-normal mb-6 text-text">Для <span className="italic-accent">{card.title.split(' ').pop()}</span></h3>
              <p className="text-text-muted leading-relaxed mb-8 font-light">{card.desc}</p>
              <ul className="space-y-4">
                {card.list.map((item, j) => (
                  <li key={j} className="flex items-center gap-4 text-sm font-medium tracking-wide">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" /> {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Programs = () => {
  const courses = [
    {
      title: "Base: Погружение",
      level: "Базовый уровень",
      desc: "Интенсивный курс для быстрого старта. 4 дня плотной практики на моделях под моим контролем.",
      price: "35.000 ₽",
      img: "/programs/course1.jpg",
      fallback: "https://images.unsplash.com/photo-1632345031435-8727f6897d53?auto=format&fit=crop&q=80&w=800"
    },
    {
      title: "Pro: Совершенство",
      level: "Pro уровень",
      desc: "Повышение квалификации для профи. Сложные формы, безупречная архитектура и чистая эстетика.",
      price: "48.000 ₽",
      img: "/programs/course2.jpg",
      fallback: "https://images.unsplash.com/photo-1607779097040-26e80aa78e66?auto=format&fit=crop&q=80&w=800"
    }
  ];

  return (
    <section id="programs" className="py-32 px-6 bg-bg">
      <div className="max-w-7xl mx-auto space-y-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="max-w-xl">
            <span className="text-primary font-bold tracking-[0.4em] uppercase text-[10px] mb-4 block">Образовательные программы</span>
            <h2 className="font-serif text-5xl md:text-7xl font-normal leading-[1.1]">Выберите свой <span className="italic-accent">новый</span> уровень</h2>
          </div>
          <div className="text-text-muted text-[10px] uppercase tracking-[0.3em] font-bold border-l-2 border-primary pl-8 h-fit py-2">
            Ближайшие потоки: <br/><span className="text-text">15 Октября / 2 Ноября</span>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {courses.map((course, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="group flex flex-col"
            >
              <div className="h-[400px] md:h-[450px] relative rounded-3xl overflow-hidden mb-8">
                <img 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" 
                  src={course.img} 
                  alt={course.title} 
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = course.fallback;
                  }}
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
                <div className="absolute bottom-8 left-8 bg-white/10 backdrop-blur-md text-white px-5 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest border border-white/20">
                  {course.level}
                </div>
              </div>
              <div className="space-y-6">
                <h3 className="font-serif text-4xl font-normal">{course.title.split(':')[0]}: <span className="italic-accent">{course.title.split(':')[1]}</span></h3>
                <p className="text-text-muted font-light text-lg">{course.desc}</p>
                <div className="flex items-center justify-between pt-6 border-t border-white/5">
                  <div className="text-3xl font-serif italic text-primary">{course.price}</div>
                  <button className="bg-primary-dark text-white px-10 py-4 rounded-full font-bold text-[10px] uppercase tracking-widest hover:bg-primary transition-all active:scale-95">
                    Купить
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Gallery = () => {
  const images = [
    "/static-gallery/work1.jpg",
    "/static-gallery/work2.jpg",
    "/static-gallery/work3.jpg",
    "/static-gallery/work4.jpg"
  ];

  const fallbacks = [
    "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1632345031435-8727f6897d53?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1607779097040-26e80aa78e66?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1519014816548-bf5fe059798b?auto=format&fit=crop&q=80&w=800"
  ];

  return (
    <section className="py-32 px-6">
      <div className="max-w-7xl mx-auto space-y-20">
        <div className="text-center space-y-6">
          <span className="text-primary font-bold tracking-[0.4em] uppercase text-[10px]">Галерея работ</span>
          <h2 className="font-serif text-4xl md:text-6xl font-normal">Эстетика <span className="italic-accent">Ваших</span> работ</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {images.map((img, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={cn(
                "aspect-[3/4] rounded-2xl overflow-hidden group",
                i % 2 !== 0 && "md:mt-20"
              )}
            >
              <img 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" 
                src={img} 
                alt="Work aesthetic" 
                onError={(e) => {
                  (e.target as HTMLImageElement).src = fallbacks[i];
                }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ScrollingGallery = () => {
  // These images should be placed in the /public/gallery/ folder
  const images = Array.from({ length: 21 }, (_, i) => `/gallery/work${i + 1}.jpg`);

  // Duplicate images for seamless loop
  const duplicatedImages = [...images, ...images];

  return (
    <section className="py-20 overflow-hidden bg-surface/30">
      <div className="flex whitespace-nowrap">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            duration: 30,
            ease: "linear",
            repeat: Infinity,
          }}
          className="flex gap-6 px-3"
        >
          {duplicatedImages.map((img, i) => (
            <div 
              key={i} 
              className="w-[300px] md:w-[450px] aspect-video rounded-2xl overflow-hidden flex-shrink-0 border border-white/5 shadow-2xl"
            >
              <img 
                src={img} 
                alt={`Work ${i}`} 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = `https://picsum.photos/seed/${i}/800/450`;
                }}
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const Testimonials = () => {
  const reviews = [
    {
      name: "Анна М.",
      role: "Мастер, Москва",
      text: "После курса База мой доход вырос в 2 раза уже через месяц. Лиана дала не только технику, но и веру в себя!",
      img: "/testimonials/student1.jpg",
      fallback: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200"
    },
    {
      name: "Екатерина К.",
      role: "Топ-мастер",
      text: "Курс Pro — это другой уровень. Теперь я работаю только с премиум клиентами. Архитектура ногтей стала идеальной.",
      img: "/testimonials/student2.jpg",
      fallback: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200"
    },
    {
      name: "Мария С.",
      role: "Выпускница",
      text: "Лиана объясняет всё до мельчайших деталей. Жалею только, что не пришла к ней раньше.",
      img: "/testimonials/student3.jpg",
      fallback: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200"
    }
  ];

  return (
    <section id="reviews" className="py-32 px-6 bg-surface">
      <div className="max-w-6xl mx-auto space-y-20">
        <div className="text-center">
          <span className="text-primary font-bold tracking-[0.4em] uppercase text-[10px] block mb-4">Отзывы</span>
          <h2 className="font-serif text-4xl md:text-6xl font-normal">Истории <span className="italic-accent">успеха</span></h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map((review, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className={cn(
                "bg-surface-bright rounded-3xl p-10 space-y-8 border border-white/5 relative",
                i === 1 && "md:translate-y-10"
              )}
            >
              <Quote className="text-primary/20 absolute top-8 right-8" size={48} />
              <p className="italic text-text-muted font-light text-lg leading-relaxed pt-4">"{review.text}"</p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-primary/20 ring-offset-4 ring-offset-surface-bright">
                  <img 
                    className="w-full h-full object-cover" 
                    src={review.img} 
                    alt={review.name} 
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = review.fallback;
                    }}
                  />
                </div>
                <div>
                  <div className="font-bold text-[10px] uppercase tracking-widest text-text">{review.name}</div>
                  <div className="text-[10px] uppercase tracking-widest opacity-40 mt-1">{review.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const questions = [
    {
      q: "Нужно ли покупать материалы заранее?",
      a: "На время обучения в студии предоставляются все необходимые материалы премиум-класса и оборудование. После курса я дам вам полный список проверенных магазинов и базовый набор для старта."
    },
    {
      q: "Выдаете ли вы сертификат?",
      a: "Да, по окончании любого курса выдается именной авторский сертификат Лианы Гетман, подтверждающий вашу квалификацию."
    }
  ];

  return (
    <section id="faq" className="py-32 px-6">
      <div className="max-w-3xl mx-auto space-y-16">
        <div className="text-center space-y-4">
          <span className="text-primary font-bold tracking-[0.4em] uppercase text-[10px]">Информация</span>
          <h2 className="font-serif text-4xl md:text-5xl font-normal">Частые <span className="italic-accent">вопросы</span></h2>
        </div>
        <div className="space-y-4">
          {questions.map((item, i) => (
            <div key={i} className="bg-surface rounded-2xl border border-white/5 overflow-hidden">
              <button 
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex justify-between items-center p-8 text-left"
              >
                <span className="font-medium text-sm uppercase tracking-widest">{item.q}</span>
                <ChevronDown className={cn("text-primary transition-transform duration-300", openIndex === i && "rotate-180")} size={20} />
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="px-8 pb-8 text-text-muted font-light text-base leading-relaxed">
                      {item.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-bg border-t border-white/5 py-20 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
        <div className="space-y-6 text-center md:text-left">
          <div className="font-serif text-2xl uppercase tracking-[0.3em] text-text">LIANA GETMAN</div>
          <div className="flex justify-center md:justify-start gap-6">
            <a href="#" className="text-text-muted hover:text-primary transition-colors text-[10px] font-bold uppercase tracking-widest">ВК</a>
            <a href="https://t.me/lianagetmann" target="_blank" rel="noopener noreferrer" className="text-text-muted hover:text-primary transition-colors text-[10px] font-bold uppercase tracking-widest">Телеграм</a>
            <a href="https://www.instagram.com/liana.getman?igsh=b3M4OGZlZTNrbm95" target="_blank" rel="noopener noreferrer" className="text-text-muted hover:text-primary transition-colors text-[10px] font-bold uppercase tracking-widest">Инстаграм</a>
          </div>
        </div>
        
        <div className="flex flex-wrap justify-center gap-x-12 gap-y-6">
          <Link to="/privacy" className="text-text-muted hover:text-text transition-colors text-[10px] uppercase tracking-widest font-bold">Политика</Link>
          <Link to="/offer" className="text-text-muted hover:text-text transition-colors text-[10px] uppercase tracking-widest font-bold">Оферта</Link>
          <a href="#" className="text-text-muted hover:text-text transition-colors text-[10px] uppercase tracking-widest font-bold">Контакты</a>
        </div>

        <div className="text-text-muted/30 text-[10px] uppercase tracking-widest font-bold text-center md:text-right">
          © 2026 LIANA GETMAN. Designed for Excellence.
        </div>
      </div>
    </footer>
  );
};

const LandingPage = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Audience />
      <Programs />
      <Gallery />
      <ScrollingGallery />
      <Testimonials />
      <FAQ />
      <Footer />
    </>
  );
};

export default function App() {
  return (
    <BrowserRouter>
      <div className="bg-bg text-text selection:bg-primary selection:text-white">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/offer" element={<PublicOffer />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

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
          className="w-full h-full bg-cover bg-center opacity-40 scale-105" 
          style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida/ADBb0ugbpUj5ME-F4d3jMU-m1toEHVH_Jrg1nzficM1VyQjZAe9evkmekHm74NFYA0jgavUbEygZw7Nr2CW_4VU5saSVxnJeRF1DbQS1CMgRGgWW0QqnomhaRPZFDd9P-2JYdGyrqlv-h_EhvaPms9bh50ira-7hZt-Be92ZybIMmA1qsdJolbmw6HbkLRSkhyg0qp0yA8gfMMn5JC9-035hqidSdwZmb_0sPi_il-YIDe9aL33jvZPtnHg3azj7iGCvnCIOqMkvBKOjfg')" }}
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
              src="https://lh3.googleusercontent.com/aida/ADBb0uiewwot9uanmXEGF1ZIA5R0oq1cvZxrCr1Zup7MIQnx_Xwf9L2v9nNbjUV-qhyuP6_Sq3vToYVp75zGSBHuvP2oRwmr6bk3TNNC04ykaXkRundzc3WDJAoawS1nqlvMy9OysAsAk0oBSCl6yr88oQ1sAiDpcLnlZbFsoyG1qYflHn48SOpdyYFya0_h127JsCa_buEvRV_Apl2uVLBBbWesLDnAB351WqdJDgZCw6JJ6Gmu7L0mXJmlkdc5xqmO-WWGVfqnvzK1WA"
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
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDIK_fz8kPfXNSQZ9EIGfjA1d7J_EeenpGhzrBvVbPR57JPtMmCQMg9y6EC2zXN3fkyiRaclr6wtpXkMQErOWpw4GU3c6ozrVIbno9IzliCBssU4g8WHaTvOAgVu8as36bxtqFjS9KvXkpln6Snz8KPG_8kqc3KwS1Xjf9Ohmb2rJU0O0yE8Eg1GTlvq4QbUvde2C-MHYCWGk_de4e6-xrJ6I_FPk_sqZm_DBXjD05ukRe7H7ogcK3Aa1DZJcRvqJP2xre4ibb-U6A"
    },
    {
      title: "Pro: Совершенство",
      level: "Pro уровень",
      desc: "Повышение квалификации для профи. Сложные формы, безупречная архитектура и чистая эстетика.",
      price: "48.000 ₽",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBKnSwTywEA0CZn2DRGv-Dwi2HXCVfuZYsfL5Ro7eGJ993buBT1IGKIT_BdcvTQgl55pd4lGjYUQ-4CckeycBKn0DSECKfxgILiRST7gy3V5bdcA39L3dO36aGd9CLrw0CQeYLZFeUb_rSherghAcnyNc4TOgTNX_RaqZRViTBmXmSHC4KplhBmpXmIujey5hj_AjJ0JLKpJcUSRCT-HgrwB_73frGiMYiQ1NXCh6u6OZt6EEq7QJLVpXQ2ty1iosqrZA17jNTf1d8"
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
                <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" src={course.img} alt={course.title} />
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
    "https://lh3.googleusercontent.com/aida-public/AB6AXuD4UOzx54cpi5N9qQGdZLHUdX-AUftub16DTDnCK2eBoEZpNgBEQ48jVfr5l-KwZwjZF86boG3MdDQZld7hBeIEXCZH06qRk5jPO8kZvcoeVqNZlDzK65u_ou7K1sWuONGIlPOykGAbWOahUL-NGFOVby0gEThAJ24RxptP2lxVBlvMPnMjGfeXiqsYKJ9Wz4_zVvfD4nKpQud-feLwSQ8JWeQ7EiiJBVVLQ5Xp5foXqREOzN4qxXAJF-7ZBsU4-JmNG-28YGAg_u0",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuA6eiM3WfiCdKdA4HIKfE7B5S1hV991KRKKVtL8SQmUWVSpdviEX0Bp-VDhZP7jWQU8cq7zJg2K1MWMSf7QeK7fMlreKG73q9cfpGWSoMYMb-CaHrnYyHSf9a23O6hwal7tjHBLAP0qUlDhJPDBnmtwNcdWz6XkUto9LZofEotCsOLwLCcd_cbwHASRePlXz8mFS-2B6rrBuxXB1bq8gIkXSFyMolvHGEZDG91Gk8L9ppdwRqikhX3DHihkMaUS33h4SvnbtF5L81o",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCVyzgOAosC0taI1y83pMwqGLqhRz9xfv2i5ZeTYTtwcTeYP7zIi6vEMS7uBMTlQxO3UplgAE6d7j6PkryZS-SIx69WmV-clJe7tzzIqciv7tpcygjL4rpCsKTpNPXyB63dCNcXzjakPV-7KQSmRiz2KwSrSdAwSyoWG-lo8fh2LI3x_8oxXlaCoC1MN2vGP9odal9hg8vt75kTBhCbWr1SO9kc3b2NwyZ575NR1MndryXZ4yU4ZKvTATeFx20QSdoxzpA-Mut9m5Q",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCY24ipw8E39yfT440ARzg-ABJp2tywuqfMy5FrHk-DW4_qbDTe2ccBxQi7sIxb80WUMSrmGsHxxPeomNkZOqETDtLFPg7M82wpOKMkCZAp17EVotlDQXJWFhGtNGKPZoF12CIDVExziwrEjoVLjCD6vIHoONkl6ayxZr2WqcAKy2RR5fhhNjWLCcawb6mhDuQ2R-Aik2O4sCVFyhzMO0pTmD3Ar-A7x3Zvw_V8JbMcwnqTZq8Q-QHWHGauvqS0qKsfxE2TY9Swoxo"
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
              <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" src={img} alt="Work aesthetic" />
            </motion.div>
          ))}
        </div>
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
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDsX7D5F3YAFLhxVNLggI9CuzHh0zMm1ETLMNmfueUjtaGhqC8reQzzflLLFAKY6cPzG_KUoctVWWAM2fMZ2IsX0gmWsamrF6FNWeEIq548zoKN_-UbeAxqWJBVza5OBoR17y8ZUqVtTWy-ba88p5-RYxqxDxcjp4_5xVnJBYvtYy-Ji6uZwXEfLGSvWcISdW3u3KqyZbXCkk5ssDKuMHg9wy9KLpSNF4RKVZLbcSfk2ZWT0u8RRP4U_sS6aUkde0RKQBMJhf92x64"
    },
    {
      name: "Екатерина К.",
      role: "Топ-мастер",
      text: "Курс Pro — это другой уровень. Теперь я работаю только с премиум клиентами. Архитектура ногтей стала идеальной.",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCFFJT9QQvYkOMmozK_B6b4G21bslmyGSpdY9K5g2IJzXVJZaR1OIYk_yeIsyo8brqeWtax0la8KvVcN0uC86uD1-g5th_zielALKlZqfDeXdCTKR7qumaNaXj-SSm3R0fZQh3CEjgfzxnlexgX-AKE917OyNKie0kho9Ng7rNTo_5T99r89h6q7_hH5IzZzH8yJ_LXJn-0UM_408WWazSJkSNBHIhfPbqGQq3nHtbVxJCnXrH9ZtSuSmT6k1v39pSCDdM0HMOZT8Q"
    },
    {
      name: "Мария С.",
      role: "Выпускница",
      text: "Лиана объясняет всё до мельчайших деталей. Жалею только, что не пришла к ней раньше.",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDYzZgTxEYoedIwBGoQJ-wSrTqvbcUBb1IT8jVMm1XZn_LMzq_pPI0nuo792OGd1vEr7fAXemVZzquDb6TYk-FcctMUBvi6oOBqLf48gusKH-By2Y7wCHXvehCgfWEkMqCY76DhcHc7wMvIhmIPA0XJCd6ExKXf4i2GdpZgljn8LFrsUqnOrvjrrdABMFR4vmdTQsvkmeQfnfy_p7pfs8FLct08-lN_8iHMMFZJy0lMJ60R4_ThNW2eefZK0LZ66bu7MWiCevB692w"
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
                  <img className="w-full h-full object-cover" src={review.img} alt={review.name} />
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

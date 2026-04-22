import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Play, ArrowRight, Instagram, ChevronRight, CheckCircle2 } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

interface Course {
  id: number;
  title: string;
  goal: string;
  price: number;
  details: string;
}

export default function Landing() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [legalModal, setLegalModal] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/courses')
      .then(res => res.json())
      .then(data => setCourses(data))
      .catch(err => console.error(err));
  }, []);

  const scrollToCourses = () => {
    document.getElementById('courses')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="w-full overflow-x-hidden">
      
      {/* Navigation */}
      <nav className="flex justify-between items-center px-6 md:px-12 py-8 z-20 w-full mx-auto absolute top-0 left-0 right-0">
        <div className="text-xl font-semibold tracking-tighter uppercase font-sans">Лиана Гетман</div>
        <div className="hidden md:flex gap-8 text-[11px] uppercase tracking-widest font-semibold opacity-50">
          <span onClick={() => window.scrollTo({ top: 800, behavior: 'smooth' })} className="cursor-pointer hover:opacity-100 transition-opacity">Обо мне</span>
          <span onClick={scrollToCourses} className="cursor-pointer hover:opacity-100 transition-opacity">Курсы</span>
          <span className="font-bold opacity-100 text-accent">Коллекция 2026</span>
        </div>
      </nav>
    
      {/* Hero Section */}
      <section className="relative w-full min-h-[100vh] pt-24 flex flex-col justify-center items-center text-center px-4 overflow-hidden">
        <div className="absolute inset-0 bg-white -z-20"></div>
        {/* Abstract elegant shapes in background */}
        <div className="absolute -right-20 -bottom-20 w-96 h-96 border-[0.5px] border-accent opacity-20 rounded-full -z-10 pointer-events-none"></div>
        <div className="absolute -right-10 -bottom-10 w-80 h-80 border-[0.5px] border-accent opacity-10 rounded-full -z-10 pointer-events-none"></div>
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-3xl mx-auto flex flex-col items-center z-10"
        >
          <div className="w-32 h-32 md:w-48 md:h-48 rounded-none overflow-hidden mb-8 border-4 border-white shadow-none relative mt-16 md:mt-0">
            <img 
              src="/images/hero/liana-main.jpg" 
              alt="Liana Getman" 
              className="w-full h-full object-cover"
              onError={(e) => { e.currentTarget.src = "https://images.unsplash.com/photo-1522337660859-02fbefca4702?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"; }}
            />
          </div>
          
          <span className="text-[10px] uppercase tracking-[0.5em] font-bold opacity-40 text-[#1a1a1a] mb-4">Мастер & Инструктор</span>
          <h1 className="text-6xl md:text-[110px] font-display font-bold italic border-b mb-6 text-[#1a1a1a] leading-tight">
            Лиана Гетман
          </h1>
          <p className="font-display text-3xl md:text-5xl text-accent mb-10 italic">
            Искусство идеального маникюра
          </p>
          
          <button 
            onClick={scrollToCourses}
            className="group flex items-center gap-2 bg-[#1a1a1a] text-white px-8 py-4 rounded-none text-sm font-medium tracking-wide uppercase hover:bg-accent transition-all duration-300"
          >
            Выбрать курс
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </section>

      {/* About Section */}
      <section className="py-24 px-4 md:px-12 bg-white relative">
        <div className="w-full">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="grid md:grid-cols-2 gap-16 items-center"
          >
            <div className="space-y-6">
              <h2 className="font-display text-4xl text-[#1a1a1a] mb-8">О преподавателе</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed font-light text-base md:text-lg">
                <p>
                  Я — инструктор международного уровня по маникюру и моделированию ногтей. Провожу обучение за границей (Грузия, Армения, Франция, Испания, Дубай и Абу-Даби) и в России — крупные мастер-классы и семинары на 150–180 человек. 
                </p>
                <p>
                  <strong className="font-medium text-[#1a1a1a]">Чемпионка России и Греции</strong> по маникюру и моделированию. Обучаю более 3000 учениц по всему миру. Веду полные программы — от базовых курсов до креативного моделирования и курсов повышения квалификации.
                </p>
                <p>
                  По моей методике многие мастера открывают свои студии и салоны, переходят в обучение и успешно развивают бизнес. Если хотите поднять уровень техники, начать собственный бизнес или стать преподавателем — присоединяйтесь к моим программам!
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/5] rounded-none rounded-none overflow-hidden shadow-none">
                <img 
                  src="/images/about/liana-about.jpg" 
                  alt="Manicure process" 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  onError={(e) => { e.currentTarget.src = "https://images.unsplash.com/photo-1519014816548-bf5fe059e98b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"; }}
                />
              </div>
              <div className="absolute -bottom-8 -left-8 bg-white p-6 rounded-none shadow-none">
                <p className="font-display text-5xl text-accent mb-1">3000+</p>
                <p className="text-sm text-gray-500 font-medium tracking-wide uppercase">Успешных учениц</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="w-full px-4 md:px-12 mb-12">
          <h2 className="text-[40px] md:text-[60px] font-display italic text-accent font-bold text-center">Работы учениц</h2>
        </div>
        
        <div className="w-full px-4 md:px-12">
          <Swiper
            spaceBetween={24}
            slidesPerView={1.2}
            breakpoints={{
              640: { slidesPerView: 2.2 },
              1024: { slidesPerView: 3.5 },
              1280: { slidesPerView: 4.5 },
            }}
            className="w-full pb-12"
          >
            {[
              "/images/gallery/work1.jpg",
              "/images/gallery/work2.jpg",
              "/images/gallery/work3.jpg",
              "/images/gallery/work4.jpg",
              "/images/gallery/work5.jpg",
            ].map((url, i) => (
              <SwiperSlide key={i}>
                <div className="relative aspect-[3/4] rounded-none overflow-hidden group cursor-grab">
                  <img 
                    src={url} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                    alt={`Work ${i+1}`}
                    onError={(e) => { 
                      const backups = [
                        "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=600&q=80",
                        "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80",
                        "https://images.unsplash.com/photo-1519014816548-bf5fe059e98b?auto=format&fit=crop&w=600&q=80",
                        "https://images.unsplash.com/photo-1594916327388-3e5f2061dafc?auto=format&fit=crop&w=600&q=80",
                        "https://images.unsplash.com/photo-1516975080661-4638a16dbd7c?auto=format&fit=crop&w=600&q=80"
                      ];
                      e.currentTarget.src = backups[i]; 
                    }}
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* Courses Section */}
      <section id="courses" className="py-24 px-4 md:px-12 bg-white">
        <div className="w-full">
          <div className="text-center mb-16">
            <span className="text-[10px] uppercase tracking-[0.5em] font-bold opacity-40 text-[#1a1a1a] mb-4 block">Обучающие программы</span>
            <h2 className="text-[40px] md:text-[60px] font-display italic text-accent font-bold text-[#1a1a1a] mb-6">Выберите свой курс</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course) => (
              <motion.div 
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="group flex flex-col bg-white border border-gray-100 p-8 rounded-none shadow-none hover:shadow-none transition-all duration-300"
              >
                <div className="flex-grow">
                  <h3 className="text-xl font-medium text-[#1a1a1a] mb-4 leading-snug group-hover:text-accent transition-colors">{course.title}</h3>
                  <div className="h-px w-12 bg-gray-200 mb-6 group-hover:bg-accent transition-colors"></div>
                  <p className="text-gray-500 font-light text-sm mb-8">
                    {course.goal}
                  </p>
                </div>
                
                <div className="mt-auto">
                  <div className="text-3xl font-display text-[#1a1a1a] mb-6">
                    {course.price.toLocaleString('ru-RU')} <span className="text-xl">₽</span>
                  </div>
                  
                  <div className="flex flex-col gap-3">
                    <button 
                      onClick={() => setSelectedCourse(course)}
                      className="w-full bg-[#1a1a1a] text-white py-3.5 rounded-none text-sm font-medium hover:bg-accent transition-colors"
                    >
                      Приобрести курс
                    </button>
                    <button 
                      onClick={() => setSelectedCourse(course)}
                      className="w-full border border-gray-200 text-gray-500 py-4 text-xs font-bold tracking-widest uppercase hover:border-[#1a1a1a] hover:text-[#1a1a1a] transition-colors"
                    >
                      Программа курса
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-24 bg-soft-gray px-4 md:px-12">
        <div className="w-full">
          <div className="text-center mb-16">
            <h2 className="text-[40px] md:text-[60px] font-display italic text-accent font-bold">Что говорят ученицы</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { text: "Спасибо за базовый курс! Раньше боялась аппарата, а теперь кутикула идеальная. Клиенты в восторге от стойкости.", author: "Мария С.", tag: "@mary_nails" },
              { text: "Верхние формы — это просто магия! Сократила время на наращивание в 2 раза, и теперь могу брать больше клиенток. Лиана лучший преподаватель!", author: "Алена Ж.", tag: "@aly_studio" },
              { text: "Выкладной френч всегда был моей слабой стороной. После курса Лианы делаю его на раз-два. Очень четко, без воды, все по делу.", author: "Карина В.", tag: "@nails.karina" },
            ].map((review, idx) => (
               <div key={idx} className="bg-white p-8 rounded-none shadow-none relative">
                  <div className="text-accent mb-4">
                    <Instagram className="w-6 h-6" />
                  </div>
                  <p className="text-gray-600 font-light italic mb-6 leading-relaxed">"{review.text}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-200 rounded-none flex items-center justify-center text-gray-500 font-medium">
                      {review.author[0]}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-[#1a1a1a]">{review.author}</p>
                      <p className="text-xs text-gray-400">{review.tag}</p>
                    </div>
                  </div>
               </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1a1a1a] text-white py-16 px-4 md:px-12">
        <div className="w-full flex flex-col md:flex-row justify-between items-center gap-8">
          <div>
            <h4 className="font-display text-2xl italic tracking-wide mb-2 hidden md:block text-gray-300">Лиана Гетман</h4>
            <p className="text-gray-400 text-sm">© 2026. ФЛ Усубова Лиана.</p>
          </div>
          <div className="flex flex-col md:flex-row gap-4 md:gap-8 text-sm text-center md:text-left text-gray-400">
             <button onClick={() => setLegalModal('oferta')} className="hover:text-white transition-colors">Договор оферты</button>
             <button onClick={() => setLegalModal('privacy')} className="hover:text-white transition-colors">Политика конфиденциальности</button>
             <button onClick={() => setLegalModal('consent')} className="hover:text-white transition-colors">Согласие на обработку ПД</button>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <CourseModal course={selectedCourse} onClose={() => setSelectedCourse(null)} />
      <LegalModal type={legalModal} onClose={() => setLegalModal(null)} />

    </div>
  );
}

// Separate components for Modals to keep code clean
function CourseModal({ course, onClose }: { course: Course | null, onClose: () => void }) {
  const [buying, setBuying] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'yookassa' | 'cash'>('yookassa');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    if (!course) {
      setBuying(false);
      setSuccess(false);
      setName('');
      setPhone('');
      setPaymentMethod('yookassa');
    }
  }, [course]);

  if (!course) return null;

  const handleBuy = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/pay', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ courseId: course.id, customerName: name, customerContact: phone, paymentMethod })
      });
      const data = await res.json();
      if (data.success) {
        setSuccessMsg(data.message);
        setSuccess(true);
        // In real life, redirect to YooKassa:
        // window.location.href = data.paymentUrl;
      }
    } catch(err) {
      alert("Ошибка при оформлении заказа");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      >
        <motion.div 
          initial={{ scale: 0.95, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.95, y: 20 }}
          className="bg-white w-full max-w-2xl rounded-none overflow-hidden shadow-none flex flex-col max-h-[90vh]"
        >
          <div className="relative bg-white p-8 border-b border-gray-100">
            <button onClick={onClose} className="absolute top-6 right-6 text-gray-400 hover:text-[#1a1a1a] transition-colors">
               <X className="w-6 h-6" />
            </button>
            <span className="uppercase tracking-widest text-[10px] font-semibold text-accent mb-2 block">Программа обучения</span>
            <h3 className="font-display text-2xl md:text-3xl text-[#1a1a1a] pr-8">{course.title}</h3>
          </div>
          
          <div className="p-8 overflow-y-auto custom-scrollbar">
            {!buying ? (
              <div className="space-y-8 animate-in fade-in zoom-in duration-300">
                <div>
                  <h4 className="text-sm uppercase tracking-wide text-gray-400 font-medium mb-3">Детали курса</h4>
                  <p className="text-gray-700 font-light leading-relaxed">{course.details || course.goal}</p>
                </div>
                
                <div className="bg-soft-gray p-6 rounded-none flex justify-between items-center">
                  <div>
                    <span className="block text-xs uppercase tracking-wide text-gray-500 mb-1">Стоимость</span>
                    <span className="font-display text-3xl text-[#1a1a1a]">{course.price.toLocaleString('ru-RU')} ₽</span>
                  </div>
                  <button 
                    onClick={() => setBuying(true)}
                    className="bg-[#1a1a1a] text-white px-8 py-3.5 rounded-none text-sm font-medium hover:bg-accent transition-colors"
                  >
                    Оформить заказ
                  </button>
                </div>
              </div>
            ) : !success ? (
              <form onSubmit={handleBuy} className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                <div>
                   <h4 className="font-medium text-[#1a1a1a] mb-1">Оформление покупки</h4>
                   <p className="text-sm text-gray-500 mb-6">Введите ваши данные для доступа к курсу.</p>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 uppercase tracking-wide mb-2">Имя и Фамилия</label>
                  <input 
                    required 
                    type="text" 
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className="w-full border-b border-gray-200 py-3 bg-transparent text-[#1a1a1a] placeholder-gray-300 focus:outline-none focus:border-accent transition-colors" 
                    placeholder="Например: Анна Иванова"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 uppercase tracking-wide mb-2">Телефон / Instagram</label>
                  <input 
                    required 
                    type="text" 
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    className="w-full border-b border-gray-200 py-3 bg-transparent text-[#1a1a1a] placeholder-gray-300 focus:outline-none focus:border-accent transition-colors" 
                    placeholder="+7 (999) 000-00-00"
                  />
                </div>
                
                <div>
                  <label className="block text-xs font-medium text-gray-700 uppercase tracking-wide mb-4">Способ оплаты</label>
                  <div className="grid grid-cols-2 gap-4">
                    <div 
                      onClick={() => setPaymentMethod('yookassa')}
                      className={`border p-4 cursor-pointer transition-all ${paymentMethod === 'yookassa' ? 'border-accent bg-rose-50 text-accent' : 'border-gray-200 text-gray-500 hover:border-gray-300'}`}
                    >
                      <div className="font-semibold text-sm mb-1">Онлайн</div>
                      <div className="text-xs opacity-70">Картой или СБП (ЮKassa)</div>
                    </div>
                    <div 
                      onClick={() => setPaymentMethod('cash')}
                      className={`border p-4 cursor-pointer transition-all ${paymentMethod === 'cash' ? 'border-accent bg-rose-50 text-accent' : 'border-gray-200 text-gray-500 hover:border-gray-300'}`}
                    >
                      <div className="font-semibold text-sm mb-1">Наличными</div>
                      <div className="text-xs opacity-70">При встрече в день курса</div>
                    </div>
                  </div>
                </div>

                <div className="pt-4 flex gap-4">
                  <button 
                    type="button" 
                    onClick={() => setBuying(false)}
                    className="px-6 py-3.5 rounded-none text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors"
                  >
                    Назад
                  </button>
                  <button 
                    type="submit" 
                    disabled={loading}
                    className="flex-grow bg-accent text-white py-3.5 rounded-none text-sm font-medium hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2"
                  >
                    {loading ? "Обработка..." : paymentMethod === 'cash' ? 'Забронировать место' : `Оплатить ${course.price.toLocaleString('ru-RU')} ₽`}
                  </button>
                </div>
              </form>
            ) : (
                <div className="text-center py-12 animate-in fade-in zoom-in duration-300">
                  <div className="w-20 h-20 bg-green-50 rounded-none flex items-center justify-center mx-auto mb-6 text-green-500">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="font-display text-3xl text-[#1a1a1a] mb-4">Успешно!</h3>
                  <p className="text-gray-500 font-light max-w-sm mx-auto mb-8">
                    {successMsg}
                  </p>
                  <button 
                    onClick={onClose}
                    className="bg-[#1a1a1a] text-white px-8 py-3 rounded-none text-sm font-medium hover:bg-gray-800 transition-colors"
                  >
                    Закрыть
                  </button>
                </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function LegalModal({ type, onClose }: { type: string | null, onClose: () => void }) {
  if (!type) return null;

  const content: Record<string, { title: string; text: React.ReactNode }> = {
    oferta: { 
      title: "Публичная оферта", 
      text: (
        <div className="space-y-4 text-sm font-light leading-relaxed">
          <p className="font-medium text-[#1a1a1a]">ПУБЛИЧНАЯ ОФЕРТА НА ОКАЗАНИЕ ИНФОРМАЦИОННО-КОНСУЛЬТАЦИОННЫХ УСЛУГ (ОБУЧЕНИЯ)</p>
          <p>Настоящая публичная оферта является официальным предложением ФЛ Усубовой Лианы (далее — Исполнитель) заключить договор на оказание информационно-консультационных услуг (проведение курсов по маникюру) с любым физическим или юридическим лицом (далее — Заказчик).</p>
          
          <h4 className="font-semibold text-[#1a1a1a] mt-4">1. Предмет договора</h4>
          <p>1.1. Исполнитель обязуется оказать Заказчику услуги по обучению на выбранном курсе, а Заказчик обязуется оплатить эти услуги в соответствии с условиями настоящей оферты.</p>
          
          <h4 className="font-semibold text-[#1a1a1a] mt-4">2. Порядок заключения договора (Акцепт)</h4>
          <p>2.1. Акцептом настоящей оферты признается оплата Заказчиком стоимости услуг (частичная или полная онлайн оплата), либо бронирование места на курсе посредством отправки формы с выбором оплаты наличными на месте проведения обучения.</p>
          <p>2.2. С момента акцепта оферты договор считается заключенным на условиях, предусмотренных настоящим документом, в соответствии со ст. 438 ГК РФ.</p>
          
          <h4 className="font-semibold text-[#1a1a1a] mt-4">3. Права и обязанности сторон</h4>
          <p>3.1. Исполнитель обязуется своевременно и качественно оказать образовательные услуги, предоставить Заказчику всю необходимую информацию, методические и расходные материалы для прохождения курса.</p>
          <p>3.2. Заказчик обязуется своевременно оплатить услуги Исполнителя, а также соблюдать дисциплину в ходе обучения.</p>

          <h4 className="font-semibold text-[#1a1a1a] mt-4">4. Стоимость и порядок расчетов</h4>
          <p>4.1. Стоимость образовательных услуг указана на соответствующей странице сайта для каждого конкретного курса.</p>
          <p>4.2. Оплата производится безналичным путем (с помощью сервиса ЮKassa) или наличными денежными средствами в день старта программы.</p>

          <h4 className="font-semibold text-[#1a1a1a] mt-4">5. Возврат денежных средств</h4>
          <p>5.1. Возврат оплаты осуществляется в соответствии со ст. 32 Закона РФ «О защите прав потребителей». Заказчик вправе отказаться от прохождения обучения в любое время при условии оплаты Исполнителю фактически понесенных им расходов.</p>

          <h4 className="font-semibold text-[#1a1a1a] mt-4">6. Реквизиты Исполнителя</h4>
          <p>ФЛ Усубова Лиана<br/>Email: liana.getman.nails@example.com</p>
        </div>
      )
    },
    privacy: { 
      title: "Политика конфиденциальности", 
      text: (
        <div className="space-y-4 text-sm font-light leading-relaxed">
          <p className="font-medium text-[#1a1a1a]">ПОЛИТИКА В ОТНОШЕНИИ ОБРАБОТКИ ПЕРСОНАЛЬНЫХ ДАННЫХ</p>
          <p>Настоящая Политика составлена в соответствии с требованиями Федерального закона от 27.07.2006 № 152-ФЗ «О персональных данных» и определяет порядок обработки персональных данных и меры по обеспечению безопасности.</p>
          
          <h4 className="font-semibold text-[#1a1a1a] mt-4">1. Собираемые данные</h4>
          <p>Мы собираем следующие данные пользователей: Имя, Фамилия, номер телефона, данные об аккаунте в социальной сети (Instagram, при указании).</p>

          <h4 className="font-semibold text-[#1a1a1a] mt-4">2. Цели сбора данных</h4>
          <p>2.1. Персональные данные Пользователя обрабатываются в целях осуществления записи на образовательные курсы, идентификации участника.</p>
          <p>2.2. Установление с Пользователем обратной связи, включая направление уведомлений, напоминаний, запросов, касающихся оказания услуг, обработки заявок и платежей.</p>

          <h4 className="font-semibold text-[#1a1a1a] mt-4">3. Передача данных третьим лицам</h4>
          <p>3.1. Оператор не передает персональные данные третьим лицам, за исключением случаев, предусмотренных законодательством РФ, а также поставщикам платежных систем (ООО НКО «ЮМани») исключительно для защищенной обработки транзакций.</p>

          <h4 className="font-semibold text-[#1a1a1a] mt-4">4. Безопасность</h4>
          <p>4.1. С целью защиты информации Оператор принимает все необходимые правовые, организационные и технические меры от неправомерного доступа, уничтожения, изменения, блокирования, копирования и распространения данных.</p>

          <h4 className="font-semibold text-[#1a1a1a] mt-4">5. Права пользователя</h4>
          <p>5.1. Пользователь имеет право на получение информации, касающейся обработки его персональных данных, а также на их отзыв путем направления соответствующего запроса.</p>
        </div>
      )
    },
    consent: { 
      title: "Согласие на обработку ПД", 
      text: (
        <div className="space-y-4 text-sm font-light leading-relaxed">
          <p className="font-medium text-[#1a1a1a]">СОГЛАСИЕ НА ОБРАБОТКУ ПЕРСОНАЛЬНЫХ ДАННЫХ</p>
          <p>В соответствии с требованиями статьи 9 Федерального закона от 27.07.2006 № 152-ФЗ «О персональных данных», свободно, своей волей и в своем интересе я даю свое согласие ФЛ Усубовой Лиане (далее — Оператор) на обработку моих персональных данных при оформлении заявки / покупки курса на данном сайте.</p>
          
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Перечень персональных данных:</strong> фамилия, имя, контактный номер мобильного телефона, персональный аккаунт в социальной сети (Instagram/Telegram).</li>
            <li><strong>Цель обработки:</strong> бронирование места на курсах обучения, осуществление клиентской поддержки, отправка информационных сообщений.</li>
            <li><strong>Способы обработки:</strong> сбор, запись, систематизация, накопление, хранение, уточнение (обновление, изменение), извлечение, использование, передача (доступ), блокирование, удаление, уничтожение ПД.</li>
          </ul>

          <p>Я проинформирован(а), что Оператор гарантирует правомерную обработку моих персональных данных и защиту информации.</p>
          <p>Настоящее согласие вступает в силу с момента отправки формы заказа и действует бессрочно. Согласие может быть отозвано мною в любой момент путем направления письменного уведомления Оператору в свободной форме.</p>
        </div>
      )
    }
  };

  const selected = content[type];
  if (!selected) return null;

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
      >
          <motion.div 
            initial={{ scale: 0.95, y: 10 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 10 }}
            className="bg-white w-full max-w-2xl rounded-none relative shadow-none flex flex-col max-h-[90vh]"
          >
             <div className="p-8 border-b border-gray-100 flex justify-between items-center bg-white z-10 top-0 sticky">
               <h3 className="font-display text-2xl text-[#1a1a1a]">{selected.title}</h3>
               <button onClick={onClose} className="text-gray-400 hover:text-[#1a1a1a] transition-colors ml-4">
                 <X className="w-6 h-6"/>
               </button>
             </div>
             <div className="p-8 overflow-y-auto custom-scrollbar text-gray-600 bg-white">
               {selected.text}
             </div>
          </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

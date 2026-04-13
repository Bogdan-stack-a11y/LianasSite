import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, CreditCard, Wallet, CheckCircle2, Loader2 } from 'lucide-react';
import { Link, useLocation, useNavigate, Navigate } from 'react-router-dom';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const formatPhoneNumber = (value: string) => {
  const digits = value.replace(/\D/g, '');
  if (!digits) return '';
  
  let core = digits;
  if (digits[0] === '7' || digits[0] === '8') {
     core = digits.slice(1);
  }
  
  let formatted = '+7';
  if (core.length > 0) formatted += ` (${core.substring(0, 3)}`;
  if (core.length >= 4) formatted += `) ${core.substring(3, 6)}`;
  if (core.length >= 7) formatted += ` ${core.substring(6, 8)}`;
  if (core.length >= 9) formatted += `-${core.substring(8, 10)}`;
  
  return formatted;
};

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const course = location.state?.course;

  const [name, setName] = useState('');
  const [nameError, setNameError] = useState('');
  const [phone, setPhone] = useState('');
  const [telegram, setTelegram] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'sbp' | 'cash'>('sbp');
  const [isProcessing, setIsProcessing] = useState(false);

  // Redirect to home if accessed directly without a selected course
  if (!course) {
    return <Navigate to="/" replace />;
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(formatPhoneNumber(e.target.value));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setNameError('');
    
    // Validate Name (at least 2 words)
    const words = name.trim().split(/\s+/);
    if (words.length < 2) {
      setNameError('Пожалуйста, введите полное ФИО (минимум 2 слова)');
      return;
    }

    setIsProcessing(true);

    try {
      await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          phone,
          telegram,
          paymentMethod,
          courseId: course.id,
          courseTitle: course.title,
          price: course.price
        })
      });

      // Simulate payment processing / API call delay for UX
      setTimeout(() => {
        setIsProcessing(false);
        navigate('/success');
      }, 1000);
    } catch (err) {
      console.error(err);
      setIsProcessing(false);
      alert('Произошла ошибка при оформлении заказа. Попробуйте еще раз.');
    }
  };

  return (
    <div className="min-h-screen bg-bg text-text selection:bg-primary selection:text-white pb-20">
      {/* Header */}
      <header className="border-b border-white/5 bg-bg/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-text-muted hover:text-primary transition-colors group">
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            <span className="text-[10px] uppercase tracking-widest font-bold">Вернуться назад</span>
          </Link>
          <div className="font-serif text-xl uppercase tracking-[0.3em]">Оформление</div>
          <div className="w-24" /> {/* Spacer for centering */}
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 pt-16">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
          
          {/* Form Section */}
          <div className="lg:col-span-7 space-y-12">
            <div>
              <h1 className="font-serif text-4xl md:text-5xl font-normal mb-4">Детали <span className="italic-accent text-primary">заказа</span></h1>
              <p className="text-text-muted font-light">Заполните данные для доступа к курсу и связи с вами.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-10">
              {/* Personal Info */}
              <div className="space-y-6">
                <h2 className="text-sm font-bold uppercase tracking-widest text-white border-b border-white/10 pb-4">Контактные данные</h2>
                
                <div className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-xs uppercase tracking-widest text-text-muted mb-2">ФИО *</label>
                    <input 
                      type="text" 
                      id="name"
                      required
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                        if (nameError) setNameError('');
                      }}
                      className={cn(
                        "w-full bg-surface border rounded-xl px-5 py-4 text-white focus:outline-none transition-colors font-light",
                        nameError ? "border-red-500 focus:border-red-500" : "border-white/10 focus:border-primary"
                      )}
                      placeholder="Иванова Анна Ивановна"
                    />
                    {nameError && <p className="text-red-500 text-xs mt-2">{nameError}</p>}
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-xs uppercase tracking-widest text-text-muted mb-2">Номер телефона *</label>
                    <input 
                      type="tel" 
                      id="phone"
                      required
                      value={phone}
                      onChange={handlePhoneChange}
                      className="w-full bg-surface border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-primary transition-colors font-light"
                      placeholder="+7 (999) 000-00-00"
                    />
                  </div>

                  <div>
                    <label htmlFor="telegram" className="block text-xs uppercase tracking-widest text-text-muted mb-2">Telegram Username</label>
                    <input 
                      type="text" 
                      id="telegram"
                      value={telegram}
                      onChange={(e) => setTelegram(e.target.value)}
                      className="w-full bg-surface border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-primary transition-colors font-light"
                      placeholder="@username"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="space-y-6">
                <h2 className="text-sm font-bold uppercase tracking-widest text-white border-b border-white/10 pb-4">Способ оплаты</h2>
                
                <div className="grid sm:grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('sbp')}
                    className={cn(
                      "flex flex-col items-start p-6 rounded-2xl border transition-all text-left",
                      paymentMethod === 'sbp' 
                        ? "bg-primary/10 border-primary" 
                        : "bg-surface border-white/5 hover:border-white/20"
                    )}
                  >
                    <div className="flex items-center justify-between w-full mb-4">
                      <CreditCard className={paymentMethod === 'sbp' ? "text-primary" : "text-text-muted"} size={28} />
                      {paymentMethod === 'sbp' && <CheckCircle2 className="text-primary" size={20} />}
                    </div>
                    <div className="font-bold text-sm uppercase tracking-widest mb-1">СБП / Карта</div>
                    <div className="text-xs text-text-muted font-light">Оплата онлайн через ЮKassa</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('cash')}
                    className={cn(
                      "flex flex-col items-start p-6 rounded-2xl border transition-all text-left",
                      paymentMethod === 'cash' 
                        ? "bg-primary/10 border-primary" 
                        : "bg-surface border-white/5 hover:border-white/20"
                    )}
                  >
                    <div className="flex items-center justify-between w-full mb-4">
                      <Wallet className={paymentMethod === 'cash' ? "text-primary" : "text-text-muted"} size={28} />
                      {paymentMethod === 'cash' && <CheckCircle2 className="text-primary" size={20} />}
                    </div>
                    <div className="font-bold text-sm uppercase tracking-widest mb-1">Наличные</div>
                    <div className="text-xs text-text-muted font-light">Оплата в студии</div>
                  </button>
                </div>
              </div>

              <button 
                type="submit"
                disabled={isProcessing}
                className="w-full bg-gradient-to-r from-primary to-primary-dark text-white py-5 rounded-xl font-bold text-[10px] uppercase tracking-[0.2em] hover:scale-[1.02] transition-all active:scale-[0.98] shadow-[0_0_20px_rgba(153,15,15,0.2)] flex items-center justify-center gap-2 disabled:opacity-70 disabled:hover:scale-100"
              >
                {isProcessing ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Обработка...
                  </>
                ) : (
                  paymentMethod === 'sbp' ? 'Перейти к оплате' : 'Забронировать место'
                )}
              </button>
              
              <p className="text-center text-xs text-text-muted font-light">
                Нажимая на кнопку, вы соглашаетесь с <Link to="/privacy" className="underline hover:text-primary">политикой конфиденциальности</Link> и <Link to="/offer" className="underline hover:text-primary">публичной офертой</Link>.
              </p>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-5">
            <div className="bg-surface border border-white/5 rounded-3xl p-8 sticky top-32">
              <h2 className="text-sm font-bold uppercase tracking-widest text-white border-b border-white/10 pb-4 mb-6">Ваш заказ</h2>
              
              <div className="flex gap-4 mb-8">
                <div className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0">
                  <img 
                    src={course.img} 
                    alt={course.title} 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = course.fallback;
                    }}
                  />
                </div>
                <div className="flex flex-col justify-center">
                  <span className="text-[10px] text-primary uppercase tracking-widest font-bold mb-1">{course.level}</span>
                  <h3 className="font-serif text-xl leading-tight">{course.title}</h3>
                </div>
              </div>

              <div className="space-y-4 border-t border-white/10 pt-6">
                <div className="flex justify-between text-sm font-light text-text-muted">
                  <span>Стоимость курса</span>
                  <span>{course.price}</span>
                </div>
                <div className="flex justify-between text-sm font-light text-text-muted">
                  <span>Скидка</span>
                  <span>0 ₽</span>
                </div>
                <div className="flex justify-between items-center pt-4 border-t border-white/10">
                  <span className="text-sm font-bold uppercase tracking-widest">Итого</span>
                  <span className="text-3xl font-serif italic text-primary">{course.price}</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default Checkout;

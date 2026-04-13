import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Success = () => {
  return (
    <div className="min-h-screen bg-bg text-text flex flex-col items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full bg-surface border border-white/10 rounded-3xl p-10 text-center space-y-8 shadow-2xl relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-dark via-primary to-primary-dark" />
        
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center mx-auto"
        >
          <CheckCircle className="text-primary w-12 h-12" />
        </motion.div>
        
        <div className="space-y-4">
          <h1 className="font-serif text-4xl font-normal">Спасибо за <span className="italic-accent text-primary">покупку!</span></h1>
          <p className="text-text-muted font-light leading-relaxed">
            Ваш заказ успешно оформлен. Мы отправили все детали на ваши контактные данные и скоро свяжемся с вами.
          </p>
        </div>

        <Link 
          to="/" 
          className="inline-flex items-center justify-center gap-2 w-full bg-gradient-to-r from-primary to-primary-dark text-white py-5 rounded-xl font-bold text-[10px] uppercase tracking-[0.2em] hover:scale-[1.02] transition-all active:scale-[0.98]"
        >
          Вернуться на главную
          <ArrowRight size={16} />
        </Link>
      </motion.div>
    </div>
  );
};

export default Success;

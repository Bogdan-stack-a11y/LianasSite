import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const PublicOffer = () => {
  return (
    <div className="min-h-screen bg-background text-text py-20 px-6">
      <div className="max-w-4xl mx-auto space-y-12">
        <Link to="/" className="inline-flex items-center gap-2 text-primary hover:text-primary-dark transition-colors mb-8">
          <ArrowLeft size={20} />
          <span className="uppercase tracking-widest text-xs font-bold">Назад на главную</span>
        </Link>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          <h1 className="font-serif text-4xl md:text-6xl">Публичная <span className="italic-accent">оферта</span></h1>
          
          <div className="prose prose-invert max-w-none space-y-6 text-text-muted font-light leading-relaxed">
            <p>Настоящий документ является официальным предложением (Публичной офертой) ИП Гетман Лиана (далее — «Исполнитель») и содержит все существенные условия по оказанию образовательных услуг в сфере маникюрного искусства.</p>
            
            <h3 className="text-text font-serif text-2xl mt-8">1. ОБЩИЕ ПОЛОЖЕНИЯ</h3>
            <p>1.1. В соответствии с пунктом 2 статьи 437 Гражданского кодекса Российской Федерации (ГК РФ) данный документ является публичной офертой, и в случае принятия изложенных ниже условий и оплаты услуг Исполнителя, лицо, произведшее акцепт этой оферты, становится Заказчиком.</p>
            <p>1.2. Акцептом оферты является полная оплата выбранного курса на Сайте.</p>

            <h3 className="text-text font-serif text-2xl mt-8">2. ПРЕДМЕТ ДОГОВОРА</h3>
            <p>2.1. Исполнитель обязуется оказать Заказчику образовательные услуги в формате онлайн или офлайн курсов (в зависимости от выбранной программы), а Заказчик обязуется оплатить эти услуги в соответствии с тарифами, указанными на Сайте.</p>
            <p>2.2. Описание программ, сроки и стоимость указаны в соответствующих разделах Сайта.</p>

            <h3 className="text-text font-serif text-2xl mt-8">3. ПРАВА И ОБЯЗАННОСТИ СТОРОН</h3>
            <p>3.1. Исполнитель обязуется:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Организовать и обеспечить надлежащее оказание услуг.</li>
              <li>Предоставить доступ к учебным материалам после подтверждения оплаты.</li>
            </ul>
            <p>3.2. Заказчик обязуется:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Своевременно и полностью оплатить услуги.</li>
              <li>Соблюдать правила внутреннего распорядка и авторские права Исполнителя.</li>
            </ul>

            <h3 className="text-text font-serif text-2xl mt-8">4. СТОИМОСТЬ УСЛУГ И ПОРЯДОК РАСЧЕТОВ</h3>
            <p>4.1. Стоимость услуг указывается на Сайте и может быть изменена Исполнителем в одностороннем порядке до момента оплаты.</p>
            <p>4.2. Оплата производится в рублях РФ через платежные системы, интегрированные на Сайте.</p>

            <h3 className="text-text font-serif text-2xl mt-8">5. ИНТЕЛЛЕКТУАЛЬНАЯ СОБСТВЕННОСТЬ</h3>
            <p>5.1. Все обучающие материалы являются интеллектуальной собственностью Исполнителя. Запрещается копирование, распространение или передача доступа третьим лицам без письменного согласия Исполнителя.</p>

            <h3 className="text-text font-serif text-2xl mt-8">6. ПРОЧИЕ УСЛОВИЯ</h3>
            <p>6.1. Исполнитель оставляет за собой право изменять условия данной оферты в любое время без предварительного уведомления.</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PublicOffer;

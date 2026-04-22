import React, { useState, useEffect } from 'react';
import { LogOut, BookOpen, ShoppingBag, LayoutDashboard } from 'lucide-react';

interface Course {
  id: number;
  title: string;
  goal: string;
  price: number;
  details: string;
}

interface Order {
  id: number;
  customer_name: string;
  customer_contact: string;
  course_id: number;
  course_title: string;
  amount: number;
  status: string;
  yookassa_payment_id: string;
  created_at: string;
}

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  
  const [activeTab, setActiveTab] = useState<'orders' | 'courses'>('orders');
  const [courses, setCourses] = useState<Course[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchData();
    }
  }, [isAuthenticated]);

  const fetchData = async () => {
    try {
      const cRes = await fetch('/api/courses');
      setCourses(await cRes.json());
      const oRes = await fetch('/api/orders');
      setOrders(await oRes.json());
    } catch (e) {
      console.error(e);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin2026') {
      setIsAuthenticated(true);
    } else {
      alert('Неверный пароль (Подсказка: admin2026)');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white px-4">
        <form onSubmit={handleLogin} className="bg-white p-8 rounded-none shadow-none border border-gray-100 max-w-sm w-full">
          <div className="text-center mb-8">
            <h2 className="font-display text-3xl text-[#1a1a1a] mb-2">Входа в панель</h2>
            <p className="text-sm text-gray-500">Административный доступ</p>
          </div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Пароль"
            className="w-full border border-gray-200 rounded-none px-4 py-3 mb-6 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
          />
          <button type="submit" className="w-full bg-[#1a1a1a] text-white rounded-none py-3 font-medium hover:bg-accent transition-colors">
            Войти
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-100 flex flex-col hidden md:flex">
        <div className="p-6 border-b border-gray-100">
          <h2 className="font-display text-xl text-[#1a1a1a] font-semibold tracking-wide">Admin.</h2>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <button 
            onClick={() => setActiveTab('orders')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-none text-sm font-medium transition-colors ${activeTab === 'orders' ? 'bg-soft-gray text-accent' : 'text-gray-600 hover:bg-gray-50'}`}
          >
            <ShoppingBag className="w-5 h-5" /> Заказы
          </button>
          <button 
            onClick={() => setActiveTab('courses')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-none text-sm font-medium transition-colors ${activeTab === 'courses' ? 'bg-soft-gray text-accent' : 'text-gray-600 hover:bg-gray-50'}`}
          >
            <BookOpen className="w-5 h-5" /> Курсы
          </button>
        </nav>
        <div className="p-4 border-t border-gray-100">
          <button 
            onClick={() => setIsAuthenticated(false)}
            className="w-full flex items-center gap-3 px-4 py-3 top-0 rounded-none text-sm font-medium text-gray-500 hover:text-[#1a1a1a] transition-colors"
          >
            <LogOut className="w-5 h-5" /> Выйти
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="p-8 max-w-5xl mx-auto">
           <header className="flex justify-between items-center mb-8">
             <div>
               <h1 className="text-2xl font-semibold text-[#1a1a1a] mb-1">
                 {activeTab === 'orders' ? 'Управление заказами' : 'Управление курсами'}
               </h1>
               <p className="text-sm text-gray-500">
                 {activeTab === 'orders' ? 'История транзакций ЮKassa' : 'Редактирование программ обучения'}
               </p>
             </div>
             <a href="#/" className="flex items-center gap-2 text-sm text-accent font-medium hover:underline">
                <LayoutDashboard className="w-4 h-4" /> На сайт
             </a>
           </header>

           {activeTab === 'orders' ? (
             <div className="bg-white rounded-none shadow-none border border-gray-100 overflow-hidden">
               <div className="overflow-x-auto">
                 <table className="w-full text-sm text-left">
                   <thead className="bg-gray-50 text-gray-500 font-medium">
                     <tr>
                       <th className="px-6 py-4">ID</th>
                       <th className="px-6 py-4">Клиент</th>
                       <th className="px-6 py-4">Курс</th>
                       <th className="px-6 py-4 whitespace-nowrap">Сумма (₽)</th>
                       <th className="px-6 py-4">Статус</th>
                       <th className="px-6 py-4 text-right">Дата</th>
                     </tr>
                   </thead>
                   <tbody className="divide-y divide-gray-100">
                     {orders.length === 0 ? (
                       <tr><td colSpan={6} className="px-6 py-8 text-center text-gray-400">Нет заказов</td></tr>
                     ) : orders.map(o => (
                       <tr key={o.id} className="hover:bg-gray-50 transition-colors">
                         <td className="px-6 py-4 font-mono text-gray-500">#{o.id}</td>
                         <td className="px-6 py-4">
                           <div className="font-medium text-[#1a1a1a]">{o.customer_name}</div>
                           <div className="text-xs text-gray-500">{o.customer_contact}</div>
                         </td>
                         <td className="px-6 py-4 max-w-[200px] truncate" title={o.course_title}>{o.course_title}</td>
                         <td className="px-6 py-4 font-medium">{o.amount.toLocaleString()}</td>
                         <td className="px-6 py-4">
                           <span className={`inline-flex px-2.5 py-1 rounded-none text-xs font-medium ${o.status === 'Paid' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
                             {o.status === 'Paid' ? 'Оплачено' : 'Ожидает'}
                           </span>
                         </td>
                         <td className="px-6 py-4 text-right text-gray-500 whitespace-nowrap">
                           {new Date(o.created_at + 'Z').toLocaleString('ru-RU')}
                         </td>
                       </tr>
                     ))}
                   </tbody>
                 </table>
               </div>
             </div>
           ) : (
             <div className="space-y-6">
                {courses.map(course => (
                  <div key={course.id} className="bg-white rounded-none shadow-none border border-gray-100 p-6 flex flex-col md:flex-row gap-6">
                     <div className="flex-1">
                        <div className="flex justify-between items-start mb-4">
                           <h3 className="font-semibold text-lg text-[#1a1a1a]">{course.title}</h3>
                           <span className="bg-gray-100 text-gray-700 font-medium px-3 py-1 rounded-none text-sm whitespace-nowrap">{course.price.toLocaleString()} ₽</span>
                        </div>
                        <p className="text-sm text-gray-600 mb-4">{course.goal}</p>
                        <div className="bg-gray-50 rounded-none p-4">
                           <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest block mb-2">Полное описание</span>
                           <p className="text-sm text-gray-700 line-clamp-3">{course.details}</p>
                        </div>
                     </div>
                     <div className="md:w-32 flex flex-col justify-center">
                        <button className="w-full bg-accent text-white py-2.5 rounded-none text-sm font-medium opacity-50 cursor-not-allowed" title="Демонстрационный режим">
                          Редактировать
                        </button>
                     </div>
                  </div>
                ))}
             </div>
           )}
        </div>
      </main>
    </div>
  );
}

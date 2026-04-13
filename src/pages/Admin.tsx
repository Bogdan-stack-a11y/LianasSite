import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Lock, LogOut, Users, BookOpen, Save, Edit2, CheckCircle2 } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const Admin = () => {
  const [token, setToken] = useState(localStorage.getItem('adminToken'));
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const [activeTab, setActiveTab] = useState<'purchases' | 'courses'>('purchases');
  const [purchases, setPurchases] = useState<any[]>([]);
  const [courses, setCourses] = useState<any[]>([]);
  
  const [editingCourse, setEditingCourse] = useState<any>(null);

  useEffect(() => {
    if (token) {
      fetchData();
    }
  }, [token]);

  const fetchData = async () => {
    try {
      const [purchasesRes, coursesRes] = await Promise.all([
        fetch('/api/admin/purchases', { headers: { Authorization: `Bearer ${token}` } }),
        fetch('/api/courses')
      ]);

      if (purchasesRes.status === 401) {
        handleLogout();
        return;
      }

      setPurchases(await purchasesRes.json());
      setCourses(await coursesRes.json());
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      });
      const data = await res.json();
      
      if (res.ok && data.token) {
        localStorage.setItem('adminToken', data.token);
        setToken(data.token);
      } else {
        setError(data.error || 'Неверный пароль');
      }
    } catch (err) {
      setError('Ошибка соединения');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setToken(null);
  };

  const handleSaveCourse = async () => {
    try {
      const res = await fetch(`/api/admin/courses/${editingCourse.id}`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(editingCourse)
      });

      if (res.ok) {
        setEditingCourse(null);
        fetchData();
      } else {
        alert('Ошибка при сохранении курса');
      }
    } catch (err) {
      console.error(err);
      alert('Ошибка при сохранении курса');
    }
  };

  if (!token) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center p-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full bg-surface border border-white/10 rounded-3xl p-10 shadow-2xl"
        >
          <div className="flex justify-center mb-8">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
              <Lock className="text-primary w-8 h-8" />
            </div>
          </div>
          <h1 className="font-serif text-3xl text-center mb-8">Вход в <span className="italic-accent text-primary">панель</span></h1>
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Секретный пароль"
                className="w-full bg-bg border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-primary transition-colors text-center tracking-widest"
              />
            </div>
            {error && <p className="text-red-500 text-xs text-center">{error}</p>}
            <button 
              type="submit"
              className="w-full bg-primary text-white py-4 rounded-xl font-bold text-[10px] uppercase tracking-[0.2em] hover:bg-primary-dark transition-colors"
            >
              Войти
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg text-text selection:bg-primary selection:text-white">
      {/* Admin Header */}
      <header className="border-b border-white/5 bg-surface sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="font-serif text-xl uppercase tracking-[0.3em] text-primary">Admin Panel</div>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 text-text-muted hover:text-white transition-colors text-[10px] uppercase tracking-widest font-bold"
          >
            <LogOut size={16} />
            Выйти
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Tabs */}
        <div className="flex gap-4 mb-12 border-b border-white/10 pb-4 overflow-x-auto">
          <button 
            onClick={() => setActiveTab('purchases')}
            className={cn(
              "flex items-center gap-2 px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest transition-colors whitespace-nowrap",
              activeTab === 'purchases' ? "bg-primary text-white" : "bg-surface text-text-muted hover:text-white"
            )}
          >
            <Users size={16} />
            Заявки и оплаты
          </button>
          <button 
            onClick={() => setActiveTab('courses')}
            className={cn(
              "flex items-center gap-2 px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest transition-colors whitespace-nowrap",
              activeTab === 'courses' ? "bg-primary text-white" : "bg-surface text-text-muted hover:text-white"
            )}
          >
            <BookOpen size={16} />
            Редактирование курсов
          </button>
        </div>

        {/* Content */}
        {activeTab === 'purchases' && (
          <div className="space-y-6">
            <h2 className="font-serif text-3xl mb-8">Список заявок</h2>
            {purchases.length === 0 ? (
              <div className="text-center py-20 text-text-muted font-light border border-white/5 rounded-3xl bg-surface/50">
                Пока нет ни одной заявки
              </div>
            ) : (
              <div className="grid gap-4">
                {purchases.map((p, i) => (
                  <div key={i} className="bg-surface border border-white/5 rounded-2xl p-6 flex flex-col md:flex-row gap-6 justify-between items-start md:items-center">
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <span className="font-bold text-lg">{p.name}</span>
                        <span className={cn(
                          "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest",
                          p.paymentMethod === 'sbp' ? "bg-green-500/20 text-green-400" : "bg-yellow-500/20 text-yellow-400"
                        )}>
                          {p.status}
                        </span>
                      </div>
                      <div className="text-sm text-text-muted font-light flex flex-wrap gap-x-6 gap-y-2">
                        <span>📱 {p.phone}</span>
                        {p.telegram && <span>✈️ {p.telegram}</span>}
                        <span>📅 {new Date(p.date).toLocaleString('ru-RU')}</span>
                      </div>
                    </div>
                    <div className="text-right md:min-w-[200px]">
                      <div className="text-xs text-primary uppercase tracking-widest font-bold mb-1">{p.courseTitle}</div>
                      <div className="font-serif italic text-xl">{p.price}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'courses' && (
          <div className="space-y-6">
            <h2 className="font-serif text-3xl mb-8">Управление курсами</h2>
            <div className="grid lg:grid-cols-2 gap-6">
              {courses.map((course) => (
                <div key={course.id} className="bg-surface border border-white/5 rounded-3xl p-8 relative group">
                  {editingCourse?.id === course.id ? (
                    <div className="space-y-6">
                      <div>
                        <label className="block text-xs uppercase tracking-widest text-text-muted mb-2">Название курса</label>
                        <input 
                          value={editingCourse.title}
                          onChange={(e) => setEditingCourse({...editingCourse, title: e.target.value})}
                          className="w-full bg-bg border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs uppercase tracking-widest text-text-muted mb-2">Краткое описание</label>
                        <textarea 
                          value={editingCourse.desc}
                          onChange={(e) => setEditingCourse({...editingCourse, desc: e.target.value})}
                          className="w-full bg-bg border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary outline-none h-24 resize-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs uppercase tracking-widest text-text-muted mb-2">Цена</label>
                        <input 
                          value={editingCourse.price}
                          onChange={(e) => setEditingCourse({...editingCourse, price: e.target.value})}
                          className="w-full bg-bg border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary outline-none"
                        />
                      </div>
                      <div className="flex gap-4 pt-4">
                        <button 
                          onClick={handleSaveCourse}
                          className="flex-1 bg-primary text-white py-3 rounded-xl font-bold text-[10px] uppercase tracking-widest flex items-center justify-center gap-2"
                        >
                          <Save size={16} /> Сохранить
                        </button>
                        <button 
                          onClick={() => setEditingCourse(null)}
                          className="flex-1 bg-white/5 text-white py-3 rounded-xl font-bold text-[10px] uppercase tracking-widest"
                        >
                          Отмена
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <button 
                        onClick={() => setEditingCourse(course)}
                        className="absolute top-6 right-6 w-10 h-10 bg-white/5 hover:bg-primary rounded-full flex items-center justify-center transition-colors"
                      >
                        <Edit2 size={16} />
                      </button>
                      <span className="text-[10px] text-primary uppercase tracking-widest font-bold mb-2 block">{course.level}</span>
                      <h3 className="font-serif text-2xl mb-4 pr-12">{course.title}</h3>
                      <p className="text-text-muted font-light mb-6 line-clamp-3">{course.desc}</p>
                      <div className="text-2xl font-serif italic text-primary">{course.price}</div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Admin;

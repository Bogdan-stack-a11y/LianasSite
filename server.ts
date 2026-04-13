import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// In-memory database
let courses = [
  {
    id: "course-1",
    title: "Специалист по маникюру",
    level: "Базовый уровень",
    desc: "Фундаментальный курс для начинающих. Постановка руки, чистый комбинированный маникюр, идеальное покрытие гель-лаком под кутикулу.",
    fullDescription: "Полный базовый курс для тех, кто хочет освоить профессию мастера маникюра с нуля. Мы разберем все этапы: от дезинфекции и стерилизации до идеального покрытия под кутикулу и создания портфолио.",
    whatYouGet: [
      "Теоретическая база (строение ногтя, заболевания, стерилизация)",
      "Постановка руки на безопасный комбинированный маникюр",
      "Выравнивание ногтевой пластины и создание идеальных бликов",
      "Покрытие гель-лаком максимально близко к кутикуле",
      "Основы фотографии работ для портфолио",
      "Сертификат о прохождении курса"
    ],
    price: "25.000 ₽",
    img: "/programs/course1.jpg",
    fallback: "https://images.unsplash.com/photo-1632345031435-8727f6897d53?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "course-2",
    title: "Маникюр + Педикюр + Наращивание",
    level: "Полное погружение",
    desc: "Комплексное обучение профессии с нуля. Освойте все востребованные услуги салона красоты и станьте универсальным мастером.",
    fullDescription: "Самый объемный курс, который сделает вас универсальным топ-мастером. Вы научитесь не только делать идеальный маникюр, но и работать со сложными стопами в педикюре, а также моделировать ногти любой длины.",
    whatYouGet: [
      "Все навыки базового курса по маникюру",
      "Эстетический и смарт-педикюр, работа с трещинами и мозолями",
      "Моделирование ногтей на нижние формы (гель/полигель)",
      "Ремонт и донаращивание сломанных ногтей",
      "Психология общения с клиентами и ценообразование",
      "Диплом универсального мастера"
    ],
    price: "65.000 ₽",
    img: "/programs/course2.jpg",
    fallback: "https://images.unsplash.com/photo-1607779097040-26e80aa78e66?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "course-3",
    title: "Маникюр + Наращивание (Верхние формы)",
    level: "Интенсив",
    desc: "Скоростное салонное моделирование. Идеальная архитектура, работа с полигелем, тонкое и прочное наращивание без лишнего опила.",
    fullDescription: "Интенсив для тех, кто хочет освоить самую трендовую и скоростную технику моделирования ногтей. Верхние формы позволяют создавать идеальную архитектуру с минимальным опилом.",
    whatYouGet: [
      "Правильный подбор верхних форм под разные типы ногтей",
      "Работа с полигелем и акригелем",
      "Скоростное моделирование без поверхностного опила",
      "Выкладной френч на верхних формах",
      "Коррекция наращенных ногтей",
      "Сертификат мастера моделирования"
    ],
    price: "40.000 ₽",
    img: "/programs/course3.jpg",
    fallback: "https://images.unsplash.com/photo-1519014816548-bf5fe059798b?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "course-4",
    title: "Маникюр: Топ-мастер",
    level: "Повышение квалификации",
    desc: "Для действующих мастеров. Сложные случаи, исправление архитектуры, скоростные техники и секреты работы в премиум-сегменте.",
    fullDescription: "Курс повышения квалификации для действующих мастеров. Мы разберем ваши ошибки, ускорим время работы и научимся справляться с самыми сложными случаями (клюющие, скрученные, трамплинообразные ногти).",
    whatYouGet: [
      "Глубокий анализ и исправление ошибок в работе",
      "Скоростной опил форм (квадрат, миндаль, овал)",
      "Работа со сложными ногтями (восстановление архитектуры)",
      "Тонкое и прочное укрепление гелем",
      "Секреты создания продающего визуала и Reels",
      "Сертификат топ-мастера"
    ],
    price: "55.000 ₽",
    img: "/programs/course4.jpg",
    fallback: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=800"
  }
];

let purchases: any[] = [];

// Simple auth middleware
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";
const ADMIN_TOKEN = "secret-admin-token-xyz";

const requireAuth = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const authHeader = req.headers.authorization;
  if (authHeader === `Bearer ${ADMIN_TOKEN}`) {
    next();
  } else {
    res.status(401).json({ error: "Unauthorized" });
  }
};

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // --- API Routes ---

  // Get all courses
  app.get("/api/courses", (req, res) => {
    res.json(courses);
  });

  // Admin login
  app.post("/api/admin/login", (req, res) => {
    const { password } = req.body;
    if (password === ADMIN_PASSWORD) {
      res.json({ token: ADMIN_TOKEN });
    } else {
      res.status(401).json({ error: "Invalid password" });
    }
  });

  // Get all purchases (Admin only)
  app.get("/api/admin/purchases", requireAuth, (req, res) => {
    res.json(purchases);
  });

  // Update a course (Admin only)
  app.put("/api/admin/courses/:id", requireAuth, (req, res) => {
    const { id } = req.params;
    const { title, desc, price } = req.body;
    
    const courseIndex = courses.findIndex(c => c.id === id);
    if (courseIndex !== -1) {
      courses[courseIndex] = { ...courses[courseIndex], title, desc, price };
      res.json(courses[courseIndex]);
    } else {
      res.status(404).json({ error: "Course not found" });
    }
  });

  // Create a purchase
  app.post("/api/checkout", (req, res) => {
    const { name, phone, telegram, paymentMethod, courseId, courseTitle, price } = req.body;
    
    const newPurchase = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      name,
      phone,
      telegram,
      paymentMethod,
      courseId,
      courseTitle,
      price,
      status: paymentMethod === 'sbp' ? 'Ожидает оплаты' : 'Заявка (Наличные)'
    };
    
    purchases.unshift(newPurchase); // Add to beginning
    res.json({ success: true, purchase: newPurchase });
  });

  // --- Vite Middleware ---
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();

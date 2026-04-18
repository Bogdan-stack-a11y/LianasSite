import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// In-memory database
let courses = [
  {
    id: "course-1",
    title: "Аппаратный маникюр + достраивание углов квадрата, френч",
    level: "Онлайн, базовый",
    desc: "Цель: качественная подготовка натуральной пластины под любые техники (аппаратная безопасная обработка кутикулы, отработка фрезами и пилками).",
    fullDescription: "Качественная подготовка натуральной пластины под любые техники. Включает аппаратную безопасную обработку кутикулы, отработку фрезами и пилками, а также достраивание углов квадрата и френч.",
    whatYouGet: [
      "Аппаратная безопасная обработка кутикулы",
      "Отработка фрезами и пилками",
      "Достраивание углов квадрата",
      "Техника создания идеального френча"
    ],
    price: "2.400 ₽",
    img: "/programs/course1.jpg",
    fallback: "https://images.unsplash.com/photo-1632345031435-8727f6897d53?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "course-2",
    title: "Моделирование на верхних формах (квадрат френч, миндаль дизайн)",
    level: "На готовность",
    desc: "Цель: моделирование прочной и эстетичной длины «на готовность».",
    fullDescription: "Курс направлен на создание прочной и эстетичной длины «на готовность» с использованием верхних форм. Разбираем формы квадрат (френч) и миндаль (дизайн).",
    whatYouGet: [
      "Моделирование прочной и эстетичной длины",
      "Работа с формой квадрат (френч)",
      "Работа с формой миндаль (дизайн)",
      "Техника работы «на готовность» без лишнего опила"
    ],
    price: "4.900 ₽",
    img: "/programs/course2.jpg",
    fallback: "https://images.unsplash.com/photo-1607779097040-26e80aa78e66?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "course-3",
    title: "Верхние формы: выкладной френч",
    level: "Быстрая лёгкая техника",
    desc: "Цель: быстрая техника выкладного френча на верхних формах — аккуратно, устойчиво, на готовность; работа с полигелем и моделирующими гелями.",
    fullDescription: "Освойте быструю технику выкладного френча на верхних формах. Учимся делать аккуратно, устойчиво и «на готовность», работая с полигелем и моделирующими гелями.",
    whatYouGet: [
      "Быстрая техника выкладного френча",
      "Работа с верхними формами",
      "Использование полигеля и моделирующих гелей",
      "Создание аккуратного и устойчивого результата"
    ],
    price: "4.500 ₽",
    img: "/programs/course3.jpg",
    fallback: "https://images.unsplash.com/photo-1519014816548-bf5fe059798b?auto=format&fit=crop&q=80&w=800"
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

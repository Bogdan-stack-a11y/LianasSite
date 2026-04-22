import Database from "better-sqlite3";
import fs from "fs";
import path from "path";

// Initialize database
const dbDir = path.join(process.cwd(), "data");
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir);
}
const dbPath = path.join(dbDir, "app.db");
const db = new Database(dbPath);

db.pragma("journal_mode = WAL");

// Setup tables
db.exec(`
  CREATE TABLE IF NOT EXISTS courses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    goal TEXT NOT NULL,
    price REAL NOT NULL,
    details TEXT
  );

  CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    customer_name TEXT,
    customer_contact TEXT,
    course_id INTEGER,
    amount REAL,
    status TEXT,
    yookassa_payment_id TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(course_id) REFERENCES courses(id)
  );
`);

// Insert default courses if empty
const courseCount = db.prepare("SELECT COUNT(*) as count FROM courses").get() as { count: number };
if (courseCount.count === 0) {
  const insert = db.prepare("INSERT INTO courses (title, goal, price, details) VALUES (?, ?, ?, ?)");
  const insertMany = db.transaction((courses) => {
    for (const course of courses) {
      insert.run(course.title, course.goal, course.price, course.details);
    }
  });

  insertMany([
    {
      title: "Аппаратный маникюр + достраивание углов квадрата, френч (онлайн, базовый)",
      goal: "качественная подготовка натуральной пластины под любые техники",
      price: 2400,
      details: "Детальная программа: аппаратная безопасная обработка кутикулы, отработка фрезами и пилками. Полное руководство с домашними заданиями и разбором от преподавателя."
    },
    {
      title: "Моделирование на верхних формах (квадрат френч, миндаль дизайн)",
      goal: "моделирование прочной и эстетичной длины «на готовность»",
      price: 4900,
      details: "Идеально подходит для мастеров с базой. Вы научитесь делать квадратный френч и миндальный дизайн. Результат: прочные, тонкие и изящные ногти без лишнего опила."
    },
    {
      title: "Верхние формы: выкладной френч (быстрая лёгкая техника)",
      goal: "быстрая техника выкладного френча на верхних формах — аккуратно, устойчиво, на готовность",
      price: 4500,
      details: "Выкладной френч на готовность с помощью верхних форм. Работа с полигелем и моделирующими гелями. Секреты быстрой выкладки и ровной линии улыбки."
    }
  ]);
}

export default db;

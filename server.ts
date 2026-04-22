import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import db from './db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.get("/api/courses", (req, res) => {
    try {
      const courses = db.prepare("SELECT * FROM courses").all();
      res.json(courses);
    } catch (e) {
      res.status(500).json({ error: "Failed to load courses" });
    }
  });

  app.post("/api/pay", async (req, res) => {
    const { courseId, customerName, customerContact, paymentMethod } = req.body;
    
    try {
      const course = db.prepare("SELECT * FROM courses WHERE id = ?").get(courseId) as any;
      if (!course) {
        return res.status(404).json({ error: "Course not found" });
      }

      // Record order
      const insertOrder = db.prepare(`
        INSERT INTO orders (customer_name, customer_contact, course_id, amount, status)
        VALUES (?, ?, ?, ?, ?)
      `);
      
      if (paymentMethod === 'cash') {
         // Create order as Cash Pending
         const info = insertOrder.run(customerName, customerContact, course.id, course.price, 'Cash Pending');
         res.json({ 
           success: true, 
           message: "Ваша бронь подтверждена. Оплата наличными при встрече.",
           orderId: info.lastInsertRowid
         });
         return;
      }

      // Default (YooKassa logic)
      const info = insertOrder.run(customerName, customerContact, course.id, course.price, 'Pending');
      const orderId = info.lastInsertRowid;

      // Mock YooKassa integration
      const updateOrder = db.prepare("UPDATE orders SET status = 'Paid', yookassa_payment_id = ? WHERE id = ?");
      updateOrder.run("mock_txn_" + Math.random().toString(36).substring(7), orderId);

      res.json({ 
        success: true, 
        message: "Оплата успешно прошла (Test Mode).",
        orderId 
      });

    } catch (e) {
      console.error(e);
      res.status(500).json({ error: "Payment initiation failed" });
    }
  });

  // Vite Integration
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    // The express 'get' signature change workaround
    app.use((req, res, next) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();

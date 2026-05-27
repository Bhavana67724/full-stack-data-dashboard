const express = require("express");
const cors = require("cors");
const sqlite3 = require("sqlite3").verbose();

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const db = new sqlite3.Database("./dashboard.db");

app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

app.get("/api/summary", (req, res) => {
  const query = `
    SELECT
      ROUND(SUM(sales), 2) AS total_revenue,
      COUNT(*) AS total_orders,
      ROUND(AVG(sales), 2) AS avg_order_value,
      ROUND(SUM(profit), 2) AS total_profit
    FROM orders
  `;

  db.get(query, [], (err, row) => {
    if (err) {
      console.error("Summary API error:", err.message);
      res.status(500).json({ error: err.message });
    } else {
      res.json(row);
    }
  });
});

app.get("/api/category-sales", (req, res) => {
  const query = `
    SELECT
      category,
      ROUND(SUM(sales), 2) AS revenue
    FROM orders
    GROUP BY category
    ORDER BY revenue DESC
  `;

  db.all(query, [], (err, rows) => {
    if (err) {
      console.error("Category API error:", err.message);
      res.status(500).json({ error: err.message });
    } else {
      res.json(rows);
    }
  });
});

app.get("/api/region-sales", (req, res) => {
  const query = `
    SELECT
      region,
      ROUND(SUM(sales), 2) AS revenue
    FROM orders
    GROUP BY region
    ORDER BY revenue DESC
  `;

  db.all(query, [], (err, rows) => {
    if (err) {
      console.error("Region API error:", err.message);
      res.status(500).json({ error: err.message });
    } else {
      res.json(rows);
    }
  });
});

app.get("/api/monthly-sales", (req, res) => {
  const query = `
    SELECT
      substr(order_date, 1, 7) AS month,
      ROUND(SUM(sales), 2) AS revenue
    FROM orders
    GROUP BY month
    ORDER BY month
  `;

  db.all(query, [], (err, rows) => {
    if (err) {
      console.error("Monthly API error:", err.message);
      res.status(500).json({ error: err.message });
    } else {
      res.json(rows);
    }
  });
});

app.get("/api/orders", (req, res) => {
  const query = `
    SELECT
      order_id,
      customer_name,
      category,
      region,
      sales,
      profit,
      order_date
    FROM orders
    ORDER BY order_date DESC
  `;

  db.all(query, [], (err, rows) => {
    if (err) {
      console.error("Orders API error:", err.message);
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
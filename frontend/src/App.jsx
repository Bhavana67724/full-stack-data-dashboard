import { useEffect, useMemo, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell
} from "recharts";

const COLORS = ["#2563eb", "#16a34a", "#f59e0b", "#ef4444"];

const thStyle = {
  padding: "12px",
  textAlign: "left",
  borderBottom: "1px solid #cbd5e1",
  whiteSpace: "nowrap"
};

const tdStyle = {
  padding: "10px 12px",
  borderBottom: "1px solid #e2e8f0",
  whiteSpace: "nowrap"
};

function Card({ title, value }) {
  return (
    <div
      style={{
        background: "#0f172a",
        color: "white",
        padding: "20px",
        borderRadius: "16px",
        minWidth: "180px",
        flex: "1"
      }}
    >
      <p style={{ margin: 0, opacity: 0.85 }}>{title}</p>

      <h2
        style={{
          margin: "8px 0 0 0",
          color: "white",
          fontSize: "28px",
          fontWeight: "bold"
        }}
      >
        {value}
      </h2>
    </div>
  );
}

export default function App() {
  const [summary, setSummary] = useState({});
  const [categories, setCategories] = useState([]);
  const [regions, setRegions] = useState([]);
  const [monthlySales, setMonthlySales] = useState([]);
  const [allOrders, setAllOrders] = useState([]);

  const [selectedRegion, setSelectedRegion] = useState("All");
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    fetch("http://localhost:5000/api/summary")
      .then((res) => res.json())
      .then(setSummary);

    fetch("http://localhost:5000/api/category-sales")
      .then((res) => res.json())
      .then(setCategories);

    fetch("http://localhost:5000/api/region-sales")
      .then((res) => res.json())
      .then(setRegions);

    fetch("http://localhost:5000/api/monthly-sales")
      .then((res) => res.json())
      .then(setMonthlySales);

    fetch("http://localhost:5000/api/orders")
      .then((res) => res.json())
      .then(setAllOrders);
  }, []);

  const filteredOrders = useMemo(() => {
    return allOrders
      .filter((order) =>
        selectedRegion === "All"
          ? true
          : String(order.region).toLowerCase() ===
            selectedRegion.toLowerCase()
      )
      .filter((order) =>
        selectedCategory === "All"
          ? true
          : String(order.category).toLowerCase() ===
            selectedCategory.toLowerCase()
      )
      .slice(0, 5);
  }, [allOrders, selectedRegion, selectedCategory]);

  return (
    <div
      style={{
        padding: "24px",
        fontFamily: "Arial, sans-serif",
        background: "#f8fafc",
        minHeight: "100vh"
      }}
    >
      <h1 style={{ marginBottom: "8px" }}>Full-Stack Data Dashboard</h1>

      <p style={{ marginTop: 0, color: "#475569" }}>
        Operational insights using React + Node.js + SQLite
      </p>

      <div
        style={{
          display: "flex",
          gap: "16px",
          flexWrap: "wrap",
          marginBottom: "32px"
        }}
      >
        <Card title="Total Revenue" value={`$${summary.total_revenue || 0}`} />

        <Card title="Total Orders" value={summary.total_orders || 0} />

        <Card
          title="Average Order Value"
          value={`$${summary.avg_order_value || 0}`}
        />

        <Card title="Total Profit" value={`$${summary.total_profit || 0}`} />
      </div>

      <div
        style={{
          display: "flex",
          gap: "12px",
          marginBottom: "20px",
          flexWrap: "wrap"
        }}
      >
        <select
          value={selectedRegion}
          onChange={(e) => setSelectedRegion(e.target.value)}
          style={{
            padding: "10px",
            borderRadius: "10px",
            border: "1px solid #cbd5e1",
            background: "white"
          }}
        >
          <option value="All">All Regions</option>
          <option value="East">East</option>
          <option value="West">West</option>
          <option value="Central">Central</option>
          <option value="South">South</option>
        </select>

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          style={{
            padding: "10px",
            borderRadius: "10px",
            border: "1px solid #cbd5e1",
            background: "white"
          }}
        >
          <option value="All">All Categories</option>
          <option value="Furniture">Furniture</option>
          <option value="Office Supplies">Office Supplies</option>
          <option value="Technology">Technology</option>
        </select>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "24px"
        }}
      >
        <div
          style={{
            background: "white",
            padding: "20px",
            borderRadius: "16px"
          }}
        >
          <h3>Monthly Revenue Trend</h3>

          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlySales}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />

              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#2563eb"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div
          style={{
            background: "white",
            padding: "20px",
            borderRadius: "16px"
          }}
        >
          <h3>Revenue by Category</h3>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={categories}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" />
              <YAxis />
              <Tooltip />

              <Bar dataKey="revenue" fill="#16a34a" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div
          style={{
            background: "white",
            padding: "20px",
            borderRadius: "16px"
          }}
        >
          <h3>Revenue by Region</h3>

          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={regions}
                dataKey="revenue"
                nameKey="region"
                outerRadius={100}
                label
              >
                {regions.map((entry, index) => (
                  <Cell
                    key={index}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>

              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div
          style={{
            background: "white",
            padding: "20px",
            borderRadius: "16px",
            overflowX: "auto"
          }}
        >
          <h3>Latest Orders</h3>

          <p style={{ marginBottom: "12px", color: "#475569" }}>
            Showing <strong>{filteredOrders.length}</strong> matching orders for{" "}
            <strong>{selectedRegion}</strong> /{" "}
            <strong>{selectedCategory}</strong>
          </p>

          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              fontSize: "14px"
            }}
          >
            <thead>
              <tr style={{ background: "#f1f5f9" }}>
                <th style={thStyle}>Order ID</th>
                <th style={thStyle}>Customer</th>
                <th style={thStyle}>Category</th>
                <th style={thStyle}>Region</th>
                <th style={thStyle}>Sales</th>
                <th style={thStyle}>Profit</th>
                <th style={thStyle}>Order Date</th>
              </tr>
            </thead>

            <tbody>
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order, index) => (
                  <tr key={index}>
                    <td style={tdStyle}>{order.order_id}</td>
                    <td style={tdStyle}>{order.customer_name}</td>
                    <td style={tdStyle}>{order.category}</td>
                    <td style={tdStyle}>{order.region}</td>
                    <td style={tdStyle}>${order.sales}</td>
                    <td style={tdStyle}>${order.profit}</td>
                    <td style={tdStyle}>{order.order_date}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td style={tdStyle} colSpan="7">
                    No orders found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
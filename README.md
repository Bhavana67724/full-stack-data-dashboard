# Full-Stack Data Dashboard

A full-stack operational analytics dashboard built using React, Node.js, Express, SQLite, and Python preprocessing workflows.

The project visualizes sales and operational insights from a real-world retail dataset using interactive charts, KPI cards, filtering, and tabular analytics.

---

## Features

- KPI Summary Cards
  - Total Revenue
  - Total Orders
  - Average Order Value
  - Total Profit

- Interactive Visualizations
  - Monthly Revenue Trend
  - Revenue by Category
  - Revenue by Region

- Dynamic Filtering
  - Region Filter
  - Category Filter

- Orders Analytics Table
  - Customer-level order insights
  - Sales and profit tracking
  - Order-level operational visibility

- Backend REST APIs
- SQLite Database Integration
- Python-based preprocessing pipeline

---

## Tech Stack

### Frontend
- React
- Recharts
- JavaScript
- HTML/CSS

### Backend
- Node.js
- Express.js
- SQLite

### Data Processing
- Python
- Pandas

### Version Control
- Git
- GitHub

---

## Project Structure

```text
full-stack-data-dashboard/
├── backend/
├── data/
├── frontend/
├── screenshots/
└── .gitignore
```

---

## Architecture Overview

```text
Retail Dataset
      ↓
Python Preprocessing
      ↓
SQLite Database
      ↓
Express REST APIs
      ↓
React Dashboard
      ↓
Charts + KPI Cards + Filters
```

---

## Screenshots

### Dashboard Overview
![Dashboard Overview](screenshots/dashboard%20overview.png)

### Dashboard Details
![Dashboard Details](screenshots/dashboard%20details.png)

---

## API Endpoints

| Endpoint | Description |
|---|---|
| `/api/summary` | KPI summary metrics |
| `/api/category-sales` | Revenue by category |
| `/api/region-sales` | Revenue by region |
| `/api/monthly-sales` | Monthly revenue trends |
| `/api/orders` | Orders dataset |

---

## How to Run Locally

### 1. Clone Repository

```bash
git clone https://github.com/Bhavana67724/full-stack-data-dashboard.git
```

---

### 2. Backend Setup

```bash
cd backend
npm install
node server.js
```

Backend runs on:

```text
http://localhost:5000
```

---

### 3. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

---

## Dataset

- Superstore retail dataset
- Cleaned and preprocessed using Python and Pandas

---

## Key Learnings

- Building REST APIs using Express
- Integrating React frontend with backend APIs
- Working with SQLite databases
- Data preprocessing workflows using Python
- Dynamic filtering and dashboard state management
- Visual storytelling using charts and KPIs

---

## Future Improvements

- Authentication & role-based access
- Cloud deployment
- Advanced filtering and search
- Export to CSV/PDF
- Dark mode support
- Docker containerization
- PostgreSQL migration

---

## Author

Bhavana Reddy Kanthala

- LinkedIn: https://linkedin.com/in/bhavana-reddy-kanthala
- GitHub: https://github.com/Bhavana67724

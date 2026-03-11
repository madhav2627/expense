# 💰 Expense.io — Personal Finance Manager

A full-featured expense tracking web app built with React + Recharts.

## Features

- **Dashboard** — Overview with stats cards, spending line chart, recent transactions
- **Transactions** — Add, delete, filter, search & sort all transactions
- **Bills & Payments** — Track recurring bills, mark as paid
- **Expenses** — Category breakdown with pie chart & budget tracker
- **Reports** — Print/save as PDF, export as CSV
- **Settings** — Profile, currency, budget, notifications
- **Animations** — Page transitions, staggered reveals, hover effects

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build
```

Then open `http://localhost:5173` in your browser.

## Printing / PDF Export

Go to **Reports** page → click **"Print / Save as PDF"**
- A print-ready report opens in a new tab
- Use browser's print dialog → choose "Save as PDF"
- For physical copy: select your printer and print!

## Tech Stack

- **React 18** + Vite
- **Recharts** (LineChart, BarChart, PieChart)
- **localStorage** for data persistence
- CSS-in-JS animations

## Project Structure

```
src/
├── App.jsx              # Root component with state management
├── components/
│   ├── Sidebar.jsx
│   ├── Header.jsx
│   └── AddTransactionModal.jsx
├── pages/
│   ├── Dashboard.jsx
│   ├── Transactions.jsx
│   ├── Bills.jsx
│   ├── Expenses.jsx
│   ├── Reports.jsx
│   └── Settings.jsx
├── utils/
│   └── storage.js       # localStorage + PDF/CSV export
└── data/
    └── sampleData.js    # Default data & chart datasets
```

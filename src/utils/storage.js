import { sampleTransactions, bills as sampleBills } from '../data/sampleData.js';

// Storage helpers
export const getTransactions = () => {
  try {
    const stored = localStorage.getItem('expensio_transactions');
    return stored ? JSON.parse(stored) : sampleTransactions;
  } catch { return sampleTransactions; }
};

export const saveTransactions = (transactions) => {
  try { localStorage.setItem('expensio_transactions', JSON.stringify(transactions)); } catch {}
};

export const getBills = () => {
  try {
    const stored = localStorage.getItem('expensio_bills');
    return stored ? JSON.parse(stored) : sampleBills;
  } catch { return sampleBills; }
};

export const saveBills = (bills) => {
  try { localStorage.setItem('expensio_bills', JSON.stringify(bills)); } catch {}
};

export const getSettings = () => {
  try {
    const stored = localStorage.getItem('expensio_settings');
    return stored ? JSON.parse(stored) : {
      name: 'Akhil Krishnan',
      email: 'akhil@example.com',
      currency: '₹',
      theme: 'light',
      notifications: true,
      monthlyBudget: 50000,
    };
  } catch {
    return { name: 'Akhil Krishnan', email: 'akhil@example.com', currency: '₹', theme: 'light', notifications: true, monthlyBudget: 50000 };
  }
};

export const saveSettings = (settings) => {
  try { localStorage.setItem('expensio_settings', JSON.stringify(settings)); } catch {}
};

// PDF Export
export const exportToPDF = (transactions, settings) => {
  const currency = settings?.currency || '₹';
  const totalIncome = transactions.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0);
  const totalExpense = transactions.filter(t => t.type === 'expense').reduce((s, t) => s + Math.abs(t.amount), 0);
  const balance = totalIncome - totalExpense;

  const rows = transactions.map(t => `
    <tr class="${t.type}">
      <td>${t.icon} ${t.name}</td>
      <td>${t.category}</td>
      <td>${new Date(t.date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</td>
      <td class="amount ${t.type === 'income' ? 'positive' : 'negative'}">
        ${t.type === 'income' ? '+' : '-'}${currency}${Math.abs(t.amount).toLocaleString('en-IN')}
      </td>
      <td><span class="badge ${t.status}">${t.status}</span></td>
    </tr>
  `).join('');

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>Expense Report - Expense.io</title>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Plus Jakarta Sans', sans-serif; background: #f8fafc; color: #1e293b; padding: 40px; }
        .header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 32px; padding-bottom: 20px; border-bottom: 2px solid #e2e8f0; }
        .logo { display: flex; align-items: center; gap: 10px; }
        .logo-icon { width: 40px; height: 40px; background: linear-gradient(135deg, #0ea5e9, #0284c7); border-radius: 10px; display: flex; align-items: center; justify-content: center; color: white; font-size: 18px; }
        .logo-text { font-size: 22px; font-weight: 800; color: #0f172a; }
        .logo-text span { color: #0ea5e9; }
        .report-meta { text-align: right; color: #64748b; font-size: 13px; }
        .report-meta .date { font-size: 14px; font-weight: 600; color: #1e293b; }
        .summary { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-bottom: 32px; }
        .summary-card { background: white; border-radius: 12px; padding: 20px; box-shadow: 0 1px 8px rgba(0,0,0,0.08); }
        .summary-card h3 { font-size: 12px; color: #64748b; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 8px; }
        .summary-card .value { font-size: 24px; font-weight: 800; }
        .summary-card.income .value { color: #10b981; }
        .summary-card.expense .value { color: #f43f5e; }
        .summary-card.balance .value { color: #0ea5e9; }
        .section-title { font-size: 16px; font-weight: 700; margin-bottom: 16px; color: #0f172a; }
        table { width: 100%; border-collapse: collapse; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 1px 8px rgba(0,0,0,0.08); }
        th { background: #f1f5f9; padding: 12px 16px; text-align: left; font-size: 11px; text-transform: uppercase; letter-spacing: 0.08em; color: #64748b; font-weight: 600; }
        td { padding: 12px 16px; border-bottom: 1px solid #f1f5f9; font-size: 13px; }
        tr:last-child td { border-bottom: none; }
        .amount.positive { color: #10b981; font-weight: 700; }
        .amount.negative { color: #f43f5e; font-weight: 700; }
        .badge { padding: 2px 10px; border-radius: 999px; font-size: 11px; font-weight: 600; }
        .badge.completed { background: #dcfce7; color: #16a34a; }
        .badge.pending { background: #fef9c3; color: #ca8a04; }
        .footer { margin-top: 32px; text-align: center; color: #94a3b8; font-size: 12px; }
        @media print { body { padding: 20px; } }
      </style>
    </head>
    <body>
      <div class="header">
        <div class="logo">
          <div class="logo-icon">💰</div>
          <div class="logo-text">Expense<span>.io</span></div>
        </div>
        <div class="report-meta">
          <div class="date">Transaction Report</div>
          <div>Generated: ${new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' })}</div>
          <div>Account: ${settings?.name || 'User'}</div>
        </div>
      </div>
      <div class="summary">
        <div class="summary-card income">
          <h3>Total Income</h3>
          <div class="value">+${currency}${totalIncome.toLocaleString('en-IN')}</div>
        </div>
        <div class="summary-card expense">
          <h3>Total Expenses</h3>
          <div class="value">-${currency}${totalExpense.toLocaleString('en-IN')}</div>
        </div>
        <div class="summary-card balance">
          <h3>Net Balance</h3>
          <div class="value">${currency}${balance.toLocaleString('en-IN')}</div>
        </div>
      </div>
      <div class="section-title">All Transactions (${transactions.length})</div>
      <table>
        <thead>
          <tr><th>Description</th><th>Category</th><th>Date</th><th>Amount</th><th>Status</th></tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
      <div class="footer">Expense.io — Your Personal Finance Manager • ${new Date().getFullYear()}</div>
    </body>
    </html>
  `;

  const win = window.open('', '_blank');
  win.document.write(html);
  win.document.close();
  setTimeout(() => win.print(), 500);
};

export const exportToCSV = (transactions, settings) => {
  const currency = settings?.currency || '₹';
  const headers = ['Date', 'Description', 'Category', 'Type', 'Amount', 'Status'];
  const rows = transactions.map(t => [
    t.date,
    `"${t.name}"`,
    t.category,
    t.type,
    `${t.type === 'income' ? '+' : '-'}${Math.abs(t.amount)}`,
    t.status
  ]);
  const csv = [headers, ...rows].map(r => r.join(',')).join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `expense-report-${new Date().toISOString().split('T')[0]}.csv`;
  a.click();
  URL.revokeObjectURL(url);
};

import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { exportToPDF, exportToCSV } from '../utils/storage.js';

export default function Reports({ transactions, currency, settings }) {
  const [visible, setVisible] = useState(false);
  const [exporting, setExporting] = useState(false);
  useEffect(() => { const t = setTimeout(() => setVisible(true), 50); return () => clearTimeout(t); }, []);

  const income = transactions.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0);
  const expenses = transactions.filter(t => t.type === 'expense').reduce((s, t) => s + Math.abs(t.amount), 0);
  const balance = income - expenses;
  const savings = income > 0 ? Math.round((balance / income) * 100) : 0;

  // Monthly breakdown
  const monthlyData = transactions.reduce((acc, t) => {
    const month = new Date(t.date).toLocaleDateString('en-US', { month: 'short' });
    if (!acc[month]) acc[month] = { month, income: 0, expenses: 0 };
    if (t.type === 'income') acc[month].income += t.amount;
    else acc[month].expenses += Math.abs(t.amount);
    return acc;
  }, {});
  const chartData = Object.values(monthlyData);

  const handleExportPDF = () => {
    setExporting(true);
    setTimeout(() => { exportToPDF(transactions, settings); setExporting(false); }, 300);
  };
  const handleExportCSV = () => { exportToCSV(transactions, settings); };

  return (
    <div style={{ padding: '24px 28px', flex: 1, overflowY: 'auto' }}>
      <div style={{ opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(-10px)', transition: 'all 0.3s ease', marginBottom: 22 }}>
        <h1 style={{ fontSize: 22, fontWeight: 800, color: '#0f172a', margin: '0 0 4px', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Reports</h1>
        <p style={{ fontSize: 13, color: '#94a3b8', margin: 0, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Download your financial reports</p>
      </div>

      {/* Summary cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24, opacity: visible ? 1 : 0, transition: 'all 0.35s ease 0.08s' }}>
        {[
          { label: 'Total Income', value: `+${currency}${income.toLocaleString('en-IN')}`, color: '#10b981', bg: '#ecfdf5', icon: '📈' },
          { label: 'Total Expenses', value: `-${currency}${expenses.toLocaleString('en-IN')}`, color: '#f43f5e', bg: '#fff1f2', icon: '📉' },
          { label: 'Net Balance', value: `${currency}${balance.toLocaleString('en-IN')}`, color: '#0ea5e9', bg: '#f0f9ff', icon: '💰' },
          { label: 'Savings Rate', value: `${savings}%`, color: '#8b5cf6', bg: '#faf5ff', icon: '🎯' },
        ].map(({ label, value, color, bg, icon }) => (
          <div key={label} style={{ background: bg, borderRadius: 14, padding: '18px', border: `1px solid ${color}22` }}>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 8 }}>
              <span style={{ fontSize: 18 }}>{icon}</span>
              <span style={{ fontSize: 11, fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.06em', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{label}</span>
            </div>
            <p style={{ fontSize: 22, fontWeight: 800, color, margin: 0, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{value}</p>
          </div>
        ))}
      </div>

      {/* Export buttons */}
      <div style={{ background: 'white', borderRadius: 16, padding: '24px', border: '1px solid #f1f5f9', boxShadow: '0 2px 12px rgba(14,165,233,0.07)', marginBottom: 22, opacity: visible ? 1 : 0, transition: 'all 0.35s ease 0.15s' }}>
        <h3 style={{ fontSize: 15, fontWeight: 800, color: '#0f172a', margin: '0 0 8px', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>📥 Download Your Report</h3>
        <p style={{ fontSize: 13, color: '#94a3b8', margin: '0 0 20px', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Export your complete transaction history as a printable PDF or CSV file</p>
        <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
          <button onClick={handleExportPDF} disabled={exporting} style={{
            display: 'flex', alignItems: 'center', gap: 10,
            background: exporting ? '#94a3b8' : 'linear-gradient(90deg, #f43f5e, #e11d48)',
            color: 'white', border: 'none', borderRadius: 12,
            padding: '14px 28px', fontWeight: 700, fontSize: 14,
            cursor: exporting ? 'not-allowed' : 'pointer',
            boxShadow: '0 4px 14px rgba(244,63,94,0.3)',
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            transition: 'all 0.2s',
          }}
            onMouseEnter={e => { if (!exporting) e.currentTarget.style.transform = 'translateY(-2px)'; }}
            onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
          >
            {exporting ? '⏳ Opening...' : '🖨️ Print / Save as PDF'}
          </button>
          <button onClick={handleExportCSV} style={{
            display: 'flex', alignItems: 'center', gap: 10,
            background: 'linear-gradient(90deg, #10b981, #059669)',
            color: 'white', border: 'none', borderRadius: 12,
            padding: '14px 28px', fontWeight: 700, fontSize: 14,
            cursor: 'pointer', boxShadow: '0 4px 14px rgba(16,185,129,0.3)',
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            transition: 'all 0.2s',
          }}
            onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
          >
            📊 Export as CSV
          </button>
          <button onClick={() => { const el = document.getElementById('print-section'); if (el) window.print(); }} style={{
            display: 'flex', alignItems: 'center', gap: 10,
            background: 'linear-gradient(90deg, #0ea5e9, #0284c7)',
            color: 'white', border: 'none', borderRadius: 12,
            padding: '14px 28px', fontWeight: 700, fontSize: 14,
            cursor: 'pointer', boxShadow: '0 4px 14px rgba(14,165,233,0.3)',
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            transition: 'all 0.2s',
          }}
            onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
          >
            📃 Quick Print
          </button>
        </div>
        <p style={{ fontSize: 12, color: '#94a3b8', marginTop: 12, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
          💡 PDF opens in a new tab — use your browser's print dialog to save as PDF or print a physical copy
        </p>
      </div>

      {/* Bar chart */}
      <div style={{ background: 'white', borderRadius: 16, padding: '22px', border: '1px solid #f1f5f9', boxShadow: '0 2px 12px rgba(14,165,233,0.07)', opacity: visible ? 1 : 0, transition: 'all 0.35s ease 0.22s' }}>
        <h3 style={{ fontSize: 15, fontWeight: 800, color: '#0f172a', margin: '0 0 18px', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Income vs Expenses</h3>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={chartData} barSize={18} barGap={4}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="month" tick={{ fill: '#94a3b8', fontSize: 11, fontFamily: 'Plus Jakarta Sans' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: '#94a3b8', fontSize: 11, fontFamily: 'Plus Jakarta Sans' }} axisLine={false} tickLine={false} tickFormatter={v => `${v >= 1000 ? Math.round(v / 1000) + 'k' : v}`} />
            <Tooltip contentStyle={{ fontFamily: "'Plus Jakarta Sans', sans-serif", borderRadius: 8, border: '1px solid #e2e8f0' }} formatter={(v) => [`${currency}${v.toLocaleString('en-IN')}`, '']} />
            <Bar dataKey="income" name="Income" radius={[4, 4, 0, 0]} fill="#10b981" />
            <Bar dataKey="expenses" name="Expenses" radius={[4, 4, 0, 0]} fill="#f43f5e" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

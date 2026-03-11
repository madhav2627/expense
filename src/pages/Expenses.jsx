import { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const COLORS = ['#f59e0b', '#0ea5e9', '#8b5cf6', '#f43f5e', '#10b981', '#06b6d4', '#ec4899', '#84cc16', '#f97316'];

export default function Expenses({ transactions, currency, settings }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => { const t = setTimeout(() => setVisible(true), 50); return () => clearTimeout(t); }, []);

  const expenseOnly = transactions.filter(t => t.type === 'expense');
  const byCategory = expenseOnly.reduce((acc, t) => {
    acc[t.category] = (acc[t.category] || 0) + Math.abs(t.amount);
    return acc;
  }, {});
  const pieData = Object.entries(byCategory).map(([name, value]) => ({ name, value })).sort((a, b) => b.value - a.value);
  const totalExpenses = Object.values(byCategory).reduce((s, v) => s + v, 0);
  const monthlyBudget = settings?.monthlyBudget || 50000;
  const budgetUsed = Math.min(100, (totalExpenses / monthlyBudget) * 100);

  return (
    <div style={{ padding: '24px 28px', flex: 1, overflowY: 'auto' }}>
      <div style={{ opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(-10px)', transition: 'all 0.3s ease', marginBottom: 22 }}>
        <h1 style={{ fontSize: 22, fontWeight: 800, color: '#0f172a', margin: '0 0 4px', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Expenses</h1>
        <p style={{ fontSize: 13, color: '#94a3b8', margin: 0, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Your spending breakdown and budget</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 22 }}>
        {/* Budget Gauge */}
        <div style={{ background: 'white', borderRadius: 16, padding: '22px', border: '1px solid #f1f5f9', boxShadow: '0 2px 12px rgba(14,165,233,0.07)', opacity: visible ? 1 : 0, transition: 'all 0.35s ease 0.1s' }}>
          <h3 style={{ fontSize: 15, fontWeight: 800, color: '#0f172a', margin: '0 0 18px', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Monthly Budget</h3>
          <div style={{ marginBottom: 12 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <span style={{ fontSize: 13, color: '#64748b', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Spent</span>
              <span style={{ fontSize: 13, fontWeight: 700, color: budgetUsed > 80 ? '#f43f5e' : '#1e293b', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{currency}{totalExpenses.toLocaleString('en-IN')} / {currency}{monthlyBudget.toLocaleString('en-IN')}</span>
            </div>
            <div style={{ height: 10, background: '#f1f5f9', borderRadius: 5 }}>
              <div style={{ height: '100%', width: `${budgetUsed}%`, background: budgetUsed > 80 ? 'linear-gradient(90deg, #f59e0b, #f43f5e)' : 'linear-gradient(90deg, #0ea5e9, #10b981)', borderRadius: 5, transition: 'width 1.2s ease' }} />
            </div>
            <p style={{ fontSize: 12, color: budgetUsed > 80 ? '#f43f5e' : '#94a3b8', marginTop: 6, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              {budgetUsed > 80 ? `⚠️ You've used ${Math.round(budgetUsed)}% of your budget!` : `${Math.round(100 - budgetUsed)}% remaining (${currency}${(monthlyBudget - totalExpenses).toLocaleString('en-IN')})`}
            </p>
          </div>
          {/* Category budgets */}
          {pieData.slice(0, 4).map(({ name, value }, i) => {
            const pct = Math.round((value / totalExpenses) * 100);
            return (
              <div key={name} style={{ marginBottom: 12 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <span style={{ fontSize: 12, fontWeight: 600, color: '#475569', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{name}</span>
                  <span style={{ fontSize: 12, fontWeight: 700, color: COLORS[i], fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{currency}{value.toLocaleString('en-IN')} ({pct}%)</span>
                </div>
                <div style={{ height: 5, background: '#f1f5f9', borderRadius: 3 }}>
                  <div style={{ height: '100%', width: `${pct}%`, background: COLORS[i], borderRadius: 3, transition: 'width 1s ease' }} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Pie Chart */}
        <div style={{ background: 'white', borderRadius: 16, padding: '22px', border: '1px solid #f1f5f9', boxShadow: '0 2px 12px rgba(14,165,233,0.07)', opacity: visible ? 1 : 0, transition: 'all 0.35s ease 0.18s' }}>
          <h3 style={{ fontSize: 15, fontWeight: 800, color: '#0f172a', margin: '0 0 4px', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Category Breakdown</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={pieData} cx="50%" cy="50%" innerRadius={55} outerRadius={90} paddingAngle={3} dataKey="value">
                {pieData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              </Pie>
              <Tooltip formatter={(val) => [`${currency}${val.toLocaleString('en-IN')}`, '']} contentStyle={{ fontFamily: "'Plus Jakarta Sans', sans-serif", borderRadius: 8, border: '1px solid #e2e8f0' }} />
              <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 11, fontFamily: "'Plus Jakarta Sans', sans-serif" }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Category table */}
      <div style={{ background: 'white', borderRadius: 16, border: '1px solid #f1f5f9', overflow: 'hidden', boxShadow: '0 2px 12px rgba(14,165,233,0.07)', opacity: visible ? 1 : 0, transition: 'all 0.35s ease 0.25s' }}>
        <div style={{ padding: '18px 20px', borderBottom: '1px solid #f1f5f9' }}>
          <h3 style={{ fontSize: 15, fontWeight: 800, color: '#0f172a', margin: 0, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Spending by Category</h3>
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#f8fafc' }}>
              {['Category', 'Transactions', 'Amount', 'Share'].map(h => (
                <th key={h} style={{ padding: '11px 18px', textAlign: 'left', fontSize: 11, color: '#94a3b8', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {pieData.map(({ name, value }, i) => {
              const count = expenseOnly.filter(t => t.category === name).length;
              const pct = Math.round((value / totalExpenses) * 100);
              return (
                <tr key={name} style={{ borderBottom: '1px solid #f8fafc' }}
                  onMouseEnter={e => e.currentTarget.style.background = '#f8fbff'}
                  onMouseLeave={e => e.currentTarget.style.background = 'white'}>
                  <td style={{ padding: '13px 18px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{ width: 10, height: 10, borderRadius: '50%', background: COLORS[i % COLORS.length] }} />
                      <span style={{ fontSize: 13.5, fontWeight: 700, color: '#1e293b', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{name}</span>
                    </div>
                  </td>
                  <td style={{ padding: '13px 18px', fontSize: 13, color: '#64748b', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{count} txns</td>
                  <td style={{ padding: '13px 18px', fontSize: 14, fontWeight: 800, color: '#1e293b', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{currency}{value.toLocaleString('en-IN')}</td>
                  <td style={{ padding: '13px 18px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{ flex: 1, height: 6, background: '#f1f5f9', borderRadius: 3, maxWidth: 100 }}>
                        <div style={{ height: '100%', width: `${pct}%`, background: COLORS[i % COLORS.length], borderRadius: 3 }} />
                      </div>
                      <span style={{ fontSize: 12, fontWeight: 700, color: COLORS[i % COLORS.length], fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{pct}%</span>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

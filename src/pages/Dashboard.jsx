import { useState, useEffect } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend
} from 'recharts';
import { chartData } from '../data/sampleData.js';

const timeFilters = ['1 Month', '3 Month', '6 Month', '1 Year'];
const dataMap = { '1 Month': chartData.monthly, '3 Month': chartData.threeMonth, '6 Month': chartData.threeMonth, '1 Year': chartData.year };

const CustomTooltip = ({ active, payload, label, currency }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background: 'white', border: '1px solid #e2e8f0', borderRadius: 10,
      padding: '10px 14px', boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
      fontFamily: "'Plus Jakarta Sans', sans-serif",
    }}>
      <p style={{ fontWeight: 700, color: '#1e293b', marginBottom: 6, fontSize: 12 }}>{label}</p>
      {payload.map(p => (
        <p key={p.dataKey} style={{ color: p.color, fontSize: 12, margin: '2px 0' }}>
          {p.name}: {currency}{p.value.toLocaleString('en-IN')}
        </p>
      ))}
    </div>
  );
};

export default function Dashboard({ transactions, onAddTransaction, onNavigate, currency, settings }) {
  const [timeFilter, setTimeFilter] = useState('1 Month');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 50);
    return () => clearTimeout(t);
  }, []);

  const income = transactions.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0);
  const expenses = transactions.filter(t => t.type === 'expense').reduce((s, t) => s + Math.abs(t.amount), 0);
  const balance = income - expenses;
  const subscriptions = transactions.filter(t => t.category === 'Subscriptions').reduce((s, t) => s + Math.abs(t.amount), 0);
  const pending = transactions.filter(t => t.status === 'pending');

  const recentTx = [...transactions].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 6);

  const statCards = [
    { label: 'Direct Debit', value: expenses, icon: '💳', color: '#f43f5e', bg: '#fff1f2', change: '+2.4%' },
    { label: 'Bills & Payments', value: income, icon: '📊', color: '#0ea5e9', bg: '#f0f9ff', change: '+12.1%' },
    { label: 'Subscriptions', value: subscriptions, icon: '🔄', color: '#8b5cf6', bg: '#faf5ff', change: '-1.2%' },
  ];

  return (
    <div style={{ padding: '24px 28px', overflowY: 'auto', flex: 1 }}>
      {/* Stat Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 18, marginBottom: 24 }}>
        {statCards.map(({ label, value, icon, color, bg, change }, i) => (
          <div key={label} style={{
            background: 'white', borderRadius: 16, padding: '20px 22px',
            border: '1px solid #f1f5f9',
            boxShadow: '0 2px 12px rgba(14,165,233,0.07)',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(16px)',
            transition: `all 0.4s ease ${i * 0.08}s`,
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <p style={{ fontSize: 12, color: '#94a3b8', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{label}</p>
                <p style={{ fontSize: 26, fontWeight: 800, color: '#0f172a', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                  {currency}{value.toLocaleString('en-IN')}
                </p>
                <p style={{ fontSize: 12, color: change.startsWith('+') ? '#10b981' : '#f43f5e', fontWeight: 600, marginTop: 6, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                  {change} this month
                </p>
              </div>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>{icon}</div>
            </div>
            <div style={{ marginTop: 14, height: 4, background: '#f1f5f9', borderRadius: 2 }}>
              <div style={{ height: '100%', width: `${Math.min(100, (value / (income || 1)) * 100)}%`, background: color, borderRadius: 2, transition: 'width 1s ease' }} />
            </div>
          </div>
        ))}
      </div>

      {/* Chart + Transactions Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.55fr 1fr', gap: 20 }}>
        {/* Chart */}
        <div style={{
          background: 'white', borderRadius: 18, padding: '22px 20px',
          border: '1px solid #f1f5f9', boxShadow: '0 2px 12px rgba(14,165,233,0.07)',
          opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(16px)',
          transition: 'all 0.4s ease 0.25s',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
            <h3 style={{ fontSize: 15, fontWeight: 800, color: '#0f172a', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Spending Overview</h3>
            <div style={{ display: 'flex', gap: 6, background: '#f8fafc', borderRadius: 10, padding: 4 }}>
              {timeFilters.map(f => (
                <button key={f} onClick={() => setTimeFilter(f)} style={{
                  padding: '5px 10px', borderRadius: 7, border: 'none',
                  background: timeFilter === f ? '#0ea5e9' : 'transparent',
                  color: timeFilter === f ? 'white' : '#64748b',
                  fontSize: 11, fontWeight: 700, cursor: 'pointer',
                  transition: 'all 0.18s', fontFamily: "'Plus Jakarta Sans', sans-serif",
                }}>{f}</button>
              ))}
            </div>
          </div>
          <div style={{ display: 'flex', gap: 16, marginBottom: 12 }}>
            {[{ label: 'Food & Drinks', color: '#f59e0b' }, { label: 'Shopping', color: '#0ea5e9' }].map(({ label, color }) => (
              <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <div style={{ width: 24, height: 3, background: color, borderRadius: 2 }} />
                <span style={{ fontSize: 11, color: '#94a3b8', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{label}</span>
              </div>
            ))}
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={dataMap[timeFilter]} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="label" tick={{ fill: '#94a3b8', fontSize: 10, fontFamily: 'Plus Jakarta Sans' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#94a3b8', fontSize: 10, fontFamily: 'Plus Jakarta Sans' }} axisLine={false} tickLine={false} tickFormatter={v => `${v >= 1000 ? Math.round(v / 1000) + 'k' : v}`} />
              <Tooltip content={<CustomTooltip currency={currency} />} />
              <Line type="monotone" dataKey="foodDrinks" name="Food & Drinks" stroke="#f59e0b" strokeWidth={2.5} dot={{ r: 3, fill: '#f59e0b' }} activeDot={{ r: 5 }} />
              <Line type="monotone" dataKey="shopping" name="Shopping" stroke="#0ea5e9" strokeWidth={2.5} dot={{ r: 3, fill: '#0ea5e9' }} activeDot={{ r: 5 }} />
              <Line type="monotone" dataKey="bills" name="Bills" stroke="#8b5cf6" strokeWidth={2} strokeDasharray="5 3" dot={false} />
              <Line type="monotone" dataKey="income" name="Income" stroke="#10b981" strokeWidth={2} strokeDasharray="5 3" dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Transaction History */}
        <div style={{
          background: 'white', borderRadius: 18, padding: '22px 20px',
          border: '1px solid #f1f5f9', boxShadow: '0 2px 12px rgba(14,165,233,0.07)',
          opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(16px)',
          transition: 'all 0.4s ease 0.32s',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
            <h3 style={{ fontSize: 15, fontWeight: 800, color: '#0f172a', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Your Transaction History</h3>
            <button onClick={() => onNavigate('transactions')} style={{
              background: 'none', border: 'none', color: '#0ea5e9',
              fontSize: 12, fontWeight: 600, cursor: 'pointer',
              fontFamily: "'Plus Jakarta Sans', sans-serif",
            }}>See all →</button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {recentTx.map((t, i) => (
              <div key={t.id} style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '10px 0', borderBottom: i < recentTx.length - 1 ? '1px solid #f8fafc' : 'none',
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateX(0)' : 'translateX(16px)',
                transition: `all 0.35s ease ${0.35 + i * 0.06}s`,
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: 10,
                    background: t.type === 'income' ? '#ecfdf5' : '#fff7ed',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 16,
                  }}>{t.icon}</div>
                  <div>
                    <p style={{ fontSize: 13, fontWeight: 700, color: '#1e293b', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{t.name}</p>
                    <p style={{ fontSize: 11, color: '#94a3b8', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{new Date(t.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</p>
                  </div>
                </div>
                <div style={{ textAlign: 'right', display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{
                    fontSize: 13, fontWeight: 800,
                    color: t.type === 'income' ? '#10b981' : '#f43f5e',
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                  }}>
                    {t.type === 'income' ? '+' : ''}{currency}{Math.abs(t.amount).toLocaleString('en-IN')}
                  </span>
                  <button style={{ background: 'none', border: 'none', color: '#cbd5e1', cursor: 'pointer', fontSize: 14 }}>⋮</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Missing Transaction Banner */}
      <div style={{
        marginTop: 20, background: 'white', borderRadius: 14, padding: '14px 20px',
        border: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        boxShadow: '0 2px 8px rgba(14,165,233,0.05)',
        opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(10px)',
        transition: 'all 0.4s ease 0.5s',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: 20 }}>🔍</span>
          <span style={{ fontSize: 13.5, fontWeight: 600, color: '#475569', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            Missing a transaction? You can add it manually.
          </span>
        </div>
        <button onClick={onAddTransaction} style={{
          background: 'linear-gradient(90deg, #0ea5e9, #0284c7)',
          color: 'white', border: 'none', borderRadius: 9,
          padding: '9px 20px', fontWeight: 700, fontSize: 13,
          cursor: 'pointer', boxShadow: '0 4px 12px rgba(14,165,233,0.3)',
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          transition: 'transform 0.15s',
        }}
          onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.04)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
        >+ ADD NEW</button>
      </div>
    </div>
  );
}

import { useState, useEffect } from 'react';
import { categories } from '../data/sampleData.js';

export default function Transactions({ transactions, onAdd, onDelete, currency }) {
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterCat, setFilterCat] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [visible, setVisible] = useState(false);

  useEffect(() => { const t = setTimeout(() => setVisible(true), 50); return () => clearTimeout(t); }, []);

  let filtered = transactions
    .filter(t => filterType === 'all' || t.type === filterType)
    .filter(t => filterCat === 'all' || t.category === filterCat)
    .filter(t => t.name.toLowerCase().includes(search.toLowerCase()) || t.category.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === 'date') return new Date(b.date) - new Date(a.date);
      if (sortBy === 'amount') return Math.abs(b.amount) - Math.abs(a.amount);
      return a.name.localeCompare(b.name);
    });

  const totalIncome = filtered.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0);
  const totalExp = filtered.filter(t => t.type === 'expense').reduce((s, t) => s + Math.abs(t.amount), 0);

  return (
    <div style={{ padding: '24px 28px', flex: 1, overflowY: 'auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 22, opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(-10px)', transition: 'all 0.3s ease' }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 800, color: '#0f172a', margin: 0, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Transactions</h1>
          <p style={{ fontSize: 13, color: '#94a3b8', margin: '4px 0 0', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{filtered.length} transactions found</p>
        </div>
        <button onClick={onAdd} style={{
          background: 'linear-gradient(90deg, #0ea5e9, #0284c7)', color: 'white',
          border: 'none', borderRadius: 10, padding: '10px 20px',
          fontWeight: 700, fontSize: 13, cursor: 'pointer',
          boxShadow: '0 4px 12px rgba(14,165,233,0.3)',
          fontFamily: "'Plus Jakarta Sans', sans-serif",
        }}>+ Add Transaction</button>
      </div>

      {/* Summary bar */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 14, marginBottom: 20, opacity: visible ? 1 : 0, transition: 'all 0.3s ease 0.1s' }}>
        {[
          { label: 'Total Income', value: `+${currency}${totalIncome.toLocaleString('en-IN')}`, color: '#10b981', bg: '#ecfdf5' },
          { label: 'Total Expenses', value: `-${currency}${totalExp.toLocaleString('en-IN')}`, color: '#f43f5e', bg: '#fff1f2' },
          { label: 'Net Balance', value: `${currency}${(totalIncome - totalExp).toLocaleString('en-IN')}`, color: '#0ea5e9', bg: '#f0f9ff' },
        ].map(({ label, value, color, bg }) => (
          <div key={label} style={{ background: bg, borderRadius: 12, padding: '14px 18px', border: `1px solid ${color}22` }}>
            <p style={{ fontSize: 11, color: '#64748b', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 6px', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{label}</p>
            <p style={{ fontSize: 20, fontWeight: 800, color, margin: 0, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{value}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 18, flexWrap: 'wrap', opacity: visible ? 1 : 0, transition: 'all 0.3s ease 0.15s' }}>
        <input
          placeholder="🔍  Search transactions..."
          value={search} onChange={e => setSearch(e.target.value)}
          style={{ flex: 1, minWidth: 200, padding: '9px 14px', borderRadius: 10, border: '1.5px solid #e2e8f0', fontSize: 13, outline: 'none', fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          onFocus={e => e.target.style.borderColor = '#0ea5e9'}
          onBlur={e => e.target.style.borderColor = '#e2e8f0'}
        />
        {[
          { key: 'filterType', val: filterType, set: setFilterType, options: [['all', 'All Types'], ['income', 'Income'], ['expense', 'Expenses']] },
          { key: 'filterCat', val: filterCat, set: setFilterCat, options: [['all', 'All Categories'], ...categories.map(c => [c, c])] },
          { key: 'sortBy', val: sortBy, set: setSortBy, options: [['date', 'Sort: Date'], ['amount', 'Sort: Amount'], ['name', 'Sort: Name']] },
        ].map(({ key, val, set, options }) => (
          <select key={key} value={val} onChange={e => set(e.target.value)} style={{ padding: '9px 12px', borderRadius: 10, border: '1.5px solid #e2e8f0', fontSize: 13, background: 'white', cursor: 'pointer', fontFamily: "'Plus Jakarta Sans', sans-serif", outline: 'none' }}>
            {options.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
          </select>
        ))}
      </div>

      {/* Table */}
      <div style={{ background: 'white', borderRadius: 16, border: '1px solid #f1f5f9', overflow: 'hidden', boxShadow: '0 2px 12px rgba(14,165,233,0.07)', opacity: visible ? 1 : 0, transition: 'all 0.35s ease 0.2s' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#f8fafc', borderBottom: '1px solid #f1f5f9' }}>
              {['Transaction', 'Category', 'Date', 'Status', 'Amount', ''].map(h => (
                <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontSize: 11, color: '#94a3b8', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr><td colSpan={6} style={{ textAlign: 'center', padding: '40px', color: '#94a3b8', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>No transactions found</td></tr>
            ) : filtered.map((t, i) => (
              <tr key={t.id} style={{ borderBottom: '1px solid #f8fafc', transition: 'background 0.15s' }}
                onMouseEnter={e => e.currentTarget.style.background = '#f8fbff'}
                onMouseLeave={e => e.currentTarget.style.background = 'white'}>
                <td style={{ padding: '13px 16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ width: 36, height: 36, borderRadius: 10, background: t.type === 'income' ? '#ecfdf5' : '#fff7ed', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>{t.icon}</div>
                    <span style={{ fontSize: 13.5, fontWeight: 700, color: '#1e293b', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{t.name}</span>
                  </div>
                </td>
                <td style={{ padding: '13px 16px' }}>
                  <span style={{ fontSize: 12, color: '#64748b', background: '#f8fafc', borderRadius: 6, padding: '3px 10px', fontWeight: 600, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{t.category}</span>
                </td>
                <td style={{ padding: '13px 16px', fontSize: 13, color: '#64748b', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                  {new Date(t.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                </td>
                <td style={{ padding: '13px 16px' }}>
                  <span style={{ fontSize: 12, fontWeight: 700, padding: '3px 10px', borderRadius: 999, background: t.status === 'completed' ? '#dcfce7' : '#fef9c3', color: t.status === 'completed' ? '#16a34a' : '#ca8a04', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{t.status}</span>
                </td>
                <td style={{ padding: '13px 16px', fontSize: 14, fontWeight: 800, color: t.type === 'income' ? '#10b981' : '#f43f5e', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                  {t.type === 'income' ? '+' : '-'}{currency}{Math.abs(t.amount).toLocaleString('en-IN')}
                </td>
                <td style={{ padding: '13px 16px' }}>
                  <button onClick={() => onDelete(t.id)} style={{ background: '#fff1f2', border: 'none', color: '#f43f5e', borderRadius: 7, padding: '5px 10px', cursor: 'pointer', fontSize: 12, fontWeight: 600, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

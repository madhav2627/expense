import { useState } from 'react';
import { categories } from '../data/sampleData.js';

const iconMap = {
  'Food & Drinks': '🍔', 'Shopping': '🛍️', 'Transport': '🚕',
  'Bills': '📋', 'Subscriptions': '📺', 'Health': '🏥',
  'Income': '💰', 'Transfer': '💸', 'Other': '📌',
};

export default function AddTransactionModal({ onClose, onAdd, currency }) {
  const [form, setForm] = useState({
    name: '', category: 'Food & Drinks', type: 'expense',
    amount: '', date: new Date().toISOString().split('T')[0], status: 'completed',
  });
  const [error, setError] = useState('');

  const handleSubmit = () => {
    if (!form.name.trim()) return setError('Description is required');
    if (!form.amount || isNaN(+form.amount) || +form.amount <= 0) return setError('Enter a valid amount');
    setError('');
    onAdd({
      ...form,
      id: Date.now(),
      amount: form.type === 'expense' ? -Math.abs(+form.amount) : +form.amount,
      icon: iconMap[form.category] || '📌',
    });
    onClose();
  };

  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(15,23,42,0.45)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      zIndex: 1000, backdropFilter: 'blur(4px)',
      animation: 'fadeIn 0.2s ease',
    }}>
      <div style={{
        background: 'white', borderRadius: 20, padding: '32px',
        width: 440, maxWidth: '95vw',
        boxShadow: '0 20px 60px rgba(14,165,233,0.15)',
        animation: 'slideUp 0.25s ease',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
          <h2 style={{ fontSize: 20, fontWeight: 800, color: '#0f172a', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            Add New Transaction
          </h2>
          <button onClick={onClose} style={{
            background: '#f1f5f9', border: 'none', borderRadius: 8,
            width: 32, height: 32, cursor: 'pointer', fontSize: 16, color: '#64748b',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>✕</button>
        </div>

        {/* Type toggle */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 20, background: '#f1f5f9', borderRadius: 12, padding: 4 }}>
          {['expense', 'income'].map(t => (
            <button key={t} onClick={() => setForm(f => ({ ...f, type: t }))} style={{
              flex: 1, padding: '8px', borderRadius: 9, border: 'none',
              background: form.type === t ? (t === 'expense' ? '#f43f5e' : '#10b981') : 'transparent',
              color: form.type === t ? 'white' : '#64748b',
              fontWeight: 700, fontSize: 13, cursor: 'pointer',
              textTransform: 'capitalize', transition: 'all 0.18s',
              fontFamily: "'Plus Jakarta Sans', sans-serif",
            }}>{t}</button>
          ))}
        </div>

        {/* Fields */}
        {[
          { label: 'Description', key: 'name', type: 'text', placeholder: 'e.g. Burger King' },
          { label: `Amount (${currency})`, key: 'amount', type: 'number', placeholder: '0.00' },
          { label: 'Date', key: 'date', type: 'date', placeholder: '' },
        ].map(({ label, key, type, placeholder }) => (
          <div key={key} style={{ marginBottom: 16 }}>
            <label style={{ fontSize: 12, fontWeight: 600, color: '#64748b', display: 'block', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.06em', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{label}</label>
            <input
              type={type}
              value={form[key]}
              onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
              placeholder={placeholder}
              style={{
                width: '100%', padding: '10px 14px', borderRadius: 10,
                border: '1.5px solid #e2e8f0', fontSize: 14, outline: 'none',
                boxSizing: 'border-box', fontFamily: "'Plus Jakarta Sans', sans-serif",
                transition: 'border-color 0.15s',
              }}
              onFocus={e => e.target.style.borderColor = '#0ea5e9'}
              onBlur={e => e.target.style.borderColor = '#e2e8f0'}
            />
          </div>
        ))}

        <div style={{ marginBottom: 16 }}>
          <label style={{ fontSize: 12, fontWeight: 600, color: '#64748b', display: 'block', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.06em', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Category</label>
          <select
            value={form.category}
            onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
            style={{
              width: '100%', padding: '10px 14px', borderRadius: 10,
              border: '1.5px solid #e2e8f0', fontSize: 14, outline: 'none',
              boxSizing: 'border-box', background: 'white', cursor: 'pointer',
              fontFamily: "'Plus Jakarta Sans', sans-serif",
            }}
          >
            {categories.map(c => <option key={c}>{c}</option>)}
          </select>
        </div>

        <div style={{ marginBottom: 20 }}>
          <label style={{ fontSize: 12, fontWeight: 600, color: '#64748b', display: 'block', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.06em', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Status</label>
          <select
            value={form.status}
            onChange={e => setForm(f => ({ ...f, status: e.target.value }))}
            style={{
              width: '100%', padding: '10px 14px', borderRadius: 10,
              border: '1.5px solid #e2e8f0', fontSize: 14, outline: 'none',
              boxSizing: 'border-box', background: 'white',
              fontFamily: "'Plus Jakarta Sans', sans-serif",
            }}
          >
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
          </select>
        </div>

        {error && <p style={{ color: '#f43f5e', fontSize: 13, marginBottom: 12, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{error}</p>}

        <div style={{ display: 'flex', gap: 10 }}>
          <button onClick={onClose} style={{
            flex: 1, padding: '12px', borderRadius: 10, border: '1.5px solid #e2e8f0',
            background: 'white', color: '#64748b', fontWeight: 600, fontSize: 14,
            cursor: 'pointer', fontFamily: "'Plus Jakarta Sans', sans-serif",
          }}>Cancel</button>
          <button onClick={handleSubmit} style={{
            flex: 2, padding: '12px', borderRadius: 10, border: 'none',
            background: 'linear-gradient(90deg, #0ea5e9, #0284c7)',
            color: 'white', fontWeight: 700, fontSize: 14,
            cursor: 'pointer', boxShadow: '0 4px 12px rgba(14,165,233,0.35)',
            fontFamily: "'Plus Jakarta Sans', sans-serif",
          }}>Add Transaction</button>
        </div>
      </div>
    </div>
  );
}

import { useState, useEffect } from 'react';

export default function Settings({ settings, onSave }) {
  const [form, setForm] = useState(settings);
  const [saved, setSaved] = useState(false);
  const [visible, setVisible] = useState(false);
  useEffect(() => { const t = setTimeout(() => setVisible(true), 50); return () => clearTimeout(t); }, []);

  const handleSave = () => {
    onSave(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div style={{ padding: '24px 28px', flex: 1, overflowY: 'auto' }}>
      <div style={{ opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(-10px)', transition: 'all 0.3s ease', marginBottom: 24 }}>
        <h1 style={{ fontSize: 22, fontWeight: 800, color: '#0f172a', margin: '0 0 4px', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Settings</h1>
        <p style={{ fontSize: 13, color: '#94a3b8', margin: 0, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Manage your account preferences</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        {/* Profile */}
        <div style={{ background: 'white', borderRadius: 16, padding: '24px', border: '1px solid #f1f5f9', boxShadow: '0 2px 12px rgba(14,165,233,0.07)', opacity: visible ? 1 : 0, transition: 'all 0.35s ease 0.08s' }}>
          <h3 style={{ fontSize: 15, fontWeight: 800, color: '#0f172a', margin: '0 0 20px', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>👤 Profile</h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 24, padding: '16px', background: '#f0f9ff', borderRadius: 12 }}>
            <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'linear-gradient(135deg, #0ea5e9, #7c3aed)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 22, fontWeight: 800, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              {form.name?.charAt(0)}
            </div>
            <div>
              <p style={{ fontSize: 15, fontWeight: 800, color: '#0f172a', margin: '0 0 3px', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{form.name}</p>
              <p style={{ fontSize: 12, color: '#64748b', margin: 0, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{form.email}</p>
            </div>
          </div>
          {[{ label: 'Full Name', key: 'name', type: 'text' }, { label: 'Email Address', key: 'email', type: 'email' }].map(({ label, key, type }) => (
            <div key={key} style={{ marginBottom: 16 }}>
              <label style={{ fontSize: 12, fontWeight: 600, color: '#64748b', display: 'block', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.06em', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{label}</label>
              <input type={type} value={form[key]} onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                style={{ width: '100%', padding: '10px 14px', borderRadius: 10, border: '1.5px solid #e2e8f0', fontSize: 14, outline: 'none', boxSizing: 'border-box', fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                onFocus={e => e.target.style.borderColor = '#0ea5e9'}
                onBlur={e => e.target.style.borderColor = '#e2e8f0'} />
            </div>
          ))}
        </div>

        {/* Preferences */}
        <div style={{ background: 'white', borderRadius: 16, padding: '24px', border: '1px solid #f1f5f9', boxShadow: '0 2px 12px rgba(14,165,233,0.07)', opacity: visible ? 1 : 0, transition: 'all 0.35s ease 0.15s' }}>
          <h3 style={{ fontSize: 15, fontWeight: 800, color: '#0f172a', margin: '0 0 20px', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>⚙️ Preferences</h3>
          <div style={{ marginBottom: 16 }}>
            <label style={{ fontSize: 12, fontWeight: 600, color: '#64748b', display: 'block', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.06em', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Currency Symbol</label>
            <select value={form.currency} onChange={e => setForm(f => ({ ...f, currency: e.target.value }))}
              style={{ width: '100%', padding: '10px 14px', borderRadius: 10, border: '1.5px solid #e2e8f0', fontSize: 14, background: 'white', fontFamily: "'Plus Jakarta Sans', sans-serif", outline: 'none' }}>
              {[['₹', '₹ Indian Rupee'], ['$', '$ US Dollar'], ['€', '€ Euro'], ['£', '£ British Pound'], ['¥', '¥ Japanese Yen']].map(([v, l]) => <option key={v} value={v}>{l}</option>)}
            </select>
          </div>
          <div style={{ marginBottom: 20 }}>
            <label style={{ fontSize: 12, fontWeight: 600, color: '#64748b', display: 'block', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.06em', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Monthly Budget ({form.currency})</label>
            <input type="number" value={form.monthlyBudget}
              onChange={e => setForm(f => ({ ...f, monthlyBudget: +e.target.value }))}
              style={{ width: '100%', padding: '10px 14px', borderRadius: 10, border: '1.5px solid #e2e8f0', fontSize: 14, outline: 'none', boxSizing: 'border-box', fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              onFocus={e => e.target.style.borderColor = '#0ea5e9'}
              onBlur={e => e.target.style.borderColor = '#e2e8f0'} />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px', background: '#f8fafc', borderRadius: 12, marginBottom: 10 }}>
            <div>
              <p style={{ fontSize: 13.5, fontWeight: 700, color: '#1e293b', margin: '0 0 2px', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>🔔 Notifications</p>
              <p style={{ fontSize: 12, color: '#94a3b8', margin: 0, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Get reminders for upcoming bills</p>
            </div>
            <div onClick={() => setForm(f => ({ ...f, notifications: !f.notifications }))} style={{
              width: 44, height: 24, borderRadius: 12, cursor: 'pointer', position: 'relative',
              background: form.notifications ? '#0ea5e9' : '#cbd5e1', transition: 'background 0.3s',
            }}>
              <div style={{ width: 18, height: 18, borderRadius: '50%', background: 'white', position: 'absolute', top: 3, left: form.notifications ? 23 : 3, transition: 'left 0.3s', boxShadow: '0 1px 4px rgba(0,0,0,0.2)' }} />
            </div>
          </div>
        </div>
      </div>

      <div style={{ marginTop: 20, display: 'flex', gap: 12, opacity: visible ? 1 : 0, transition: 'all 0.35s ease 0.25s' }}>
        <button onClick={handleSave} style={{
          background: saved ? 'linear-gradient(90deg,#10b981,#059669)' : 'linear-gradient(90deg, #0ea5e9, #0284c7)',
          color: 'white', border: 'none', borderRadius: 12, padding: '13px 32px',
          fontWeight: 700, fontSize: 14, cursor: 'pointer',
          boxShadow: '0 4px 14px rgba(14,165,233,0.3)',
          fontFamily: "'Plus Jakarta Sans', sans-serif", transition: 'all 0.3s',
        }}>
          {saved ? '✅ Saved!' : '💾 Save Changes'}
        </button>
      </div>
    </div>
  );
}

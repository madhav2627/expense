import { useState, useEffect } from 'react';

export default function Bills({ bills, onMarkPaid, currency }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => { const t = setTimeout(() => setVisible(true), 50); return () => clearTimeout(t); }, []);

  const pending = bills.filter(b => b.status === 'pending');
  const paid = bills.filter(b => b.status === 'paid');
  const totalPending = pending.reduce((s, b) => s + b.amount, 0);
  const totalPaid = paid.reduce((s, b) => s + b.amount, 0);

  return (
    <div style={{ padding: '24px 28px', flex: 1, overflowY: 'auto' }}>
      <div style={{ opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(-10px)', transition: 'all 0.3s ease', marginBottom: 22 }}>
        <h1 style={{ fontSize: 22, fontWeight: 800, color: '#0f172a', margin: '0 0 4px', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Bills & Payments</h1>
        <p style={{ fontSize: 13, color: '#94a3b8', margin: 0, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Track and manage your recurring bills</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16, marginBottom: 24, opacity: visible ? 1 : 0, transition: 'all 0.35s ease 0.08s' }}>
        {[
          { label: 'Total Bills', value: bills.length, suffix: 'bills', color: '#0ea5e9', bg: '#f0f9ff', icon: '📋' },
          { label: 'Pending Amount', value: `${currency}${totalPending.toLocaleString('en-IN')}`, suffix: `${pending.length} pending`, color: '#f59e0b', bg: '#fffbeb', icon: '⏳' },
          { label: 'Paid This Month', value: `${currency}${totalPaid.toLocaleString('en-IN')}`, suffix: `${paid.length} paid`, color: '#10b981', bg: '#ecfdf5', icon: '✅' },
        ].map(({ label, value, suffix, color, bg, icon }) => (
          <div key={label} style={{ background: bg, borderRadius: 14, padding: '18px 20px', border: `1px solid ${color}22` }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
              <span style={{ fontSize: 22 }}>{icon}</span>
              <span style={{ fontSize: 12, fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.06em', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{label}</span>
            </div>
            <p style={{ fontSize: 26, fontWeight: 800, color, margin: '0 0 4px', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{value}</p>
            <p style={{ fontSize: 12, color: '#94a3b8', margin: 0, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{suffix}</p>
          </div>
        ))}
      </div>

      {/* Pending Bills */}
      {pending.length > 0 && (
        <div style={{ background: 'white', borderRadius: 16, border: '1px solid #f1f5f9', padding: '20px', marginBottom: 20, boxShadow: '0 2px 12px rgba(14,165,233,0.07)', opacity: visible ? 1 : 0, transition: 'all 0.35s ease 0.15s' }}>
          <h3 style={{ fontSize: 15, fontWeight: 800, color: '#0f172a', margin: '0 0 16px', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>⏳ Upcoming & Pending</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {pending.map((bill, i) => {
              const daysLeft = Math.ceil((new Date(bill.dueDate) - new Date()) / (1000 * 60 * 60 * 24));
              return (
                <div key={bill.id} style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '14px 16px', borderRadius: 12, background: '#fffbeb',
                  border: '1px solid #fef3c7',
                  opacity: visible ? 1 : 0, transform: visible ? 'translateX(0)' : 'translateX(-12px)',
                  transition: `all 0.3s ease ${0.2 + i * 0.07}s`,
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ width: 42, height: 42, borderRadius: 12, background: '#fef9c3', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>{bill.icon}</div>
                    <div>
                      <p style={{ fontSize: 14, fontWeight: 700, color: '#1e293b', margin: '0 0 3px', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{bill.name}</p>
                      <p style={{ fontSize: 12, color: '#94a3b8', margin: 0, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{bill.provider} • Due {new Date(bill.dueDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</p>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                    <div style={{ textAlign: 'right' }}>
                      <p style={{ fontSize: 16, fontWeight: 800, color: '#f59e0b', margin: '0 0 2px', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{currency}{bill.amount.toLocaleString('en-IN')}</p>
                      <p style={{ fontSize: 11, color: daysLeft <= 3 ? '#f43f5e' : '#94a3b8', fontWeight: 600, margin: 0, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{daysLeft <= 0 ? 'Overdue!' : `${daysLeft} days left`}</p>
                    </div>
                    <button onClick={() => onMarkPaid(bill.id)} style={{
                      background: 'linear-gradient(90deg, #0ea5e9, #0284c7)', color: 'white',
                      border: 'none', borderRadius: 8, padding: '7px 14px',
                      fontWeight: 700, fontSize: 12, cursor: 'pointer',
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                    }}>Pay Now</button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Paid Bills */}
      {paid.length > 0 && (
        <div style={{ background: 'white', borderRadius: 16, border: '1px solid #f1f5f9', padding: '20px', boxShadow: '0 2px 12px rgba(14,165,233,0.07)', opacity: visible ? 1 : 0, transition: 'all 0.35s ease 0.3s' }}>
          <h3 style={{ fontSize: 15, fontWeight: 800, color: '#0f172a', margin: '0 0 16px', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>✅ Paid Bills</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {paid.map((bill, i) => (
              <div key={bill.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', borderRadius: 12, background: '#f8fafc', opacity: 0.8 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 38, height: 38, borderRadius: 10, background: '#ecfdf5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>{bill.icon}</div>
                  <div>
                    <p style={{ fontSize: 13.5, fontWeight: 700, color: '#475569', margin: '0 0 2px', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{bill.name}</p>
                    <p style={{ fontSize: 11, color: '#94a3b8', margin: 0, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{bill.provider}</p>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 14, fontWeight: 700, color: '#10b981', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{currency}{bill.amount.toLocaleString('en-IN')}</span>
                  <span style={{ background: '#dcfce7', color: '#16a34a', fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 999, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Paid ✓</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

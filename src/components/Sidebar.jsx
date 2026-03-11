import { useState } from 'react';

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: '⊞' },
  { id: 'transactions', label: 'Transactions', icon: '↕' },
  { id: 'bills', label: 'Bills & Payments', icon: '📋' },
  { id: 'expenses', label: 'Expenses', icon: '📊' },
  { id: 'reports', label: 'Reports', icon: '📈' },
  { id: 'settings', label: 'Settings', icon: '⚙' },
];

const bottomItems = [
  { id: 'help', label: 'Get Help', icon: '❓' },
];

export default function Sidebar({ activePage, onNavigate }) {
  return (
    <aside style={{
      width: 220, minWidth: 220,
      background: 'white',
      borderRight: '1px solid #e8f0f7',
      display: 'flex', flexDirection: 'column',
      padding: '0',
      boxShadow: '2px 0 12px rgba(14,165,233,0.06)',
      zIndex: 10,
    }}>
      {/* Logo */}
      <div style={{ padding: '24px 20px 16px', borderBottom: '1px solid #f0f7fe' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 36, height: 36, borderRadius: 10,
            background: 'linear-gradient(135deg, #0ea5e9, #0284c7)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'white', fontSize: 18,
            boxShadow: '0 4px 12px rgba(14,165,233,0.35)',
          }}>💰</div>
          <span style={{ fontSize: 18, fontWeight: 800, color: '#0f172a', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            Expense<span style={{ color: '#0ea5e9' }}>.io</span>
          </span>
        </div>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: '12px 10px', display: 'flex', flexDirection: 'column', gap: 2 }}>
        {navItems.map(({ id, label, icon }) => {
          const isActive = activePage === id;
          return (
            <button
              key={id}
              onClick={() => onNavigate(id)}
              style={{
                display: 'flex', alignItems: 'center', gap: 12,
                padding: '10px 14px', borderRadius: 10, border: 'none',
                background: isActive
                  ? 'linear-gradient(90deg, #e0f2fe, #f0f9ff)'
                  : 'transparent',
                color: isActive ? '#0284c7' : '#64748b',
                fontSize: 13.5, fontWeight: isActive ? 700 : 500,
                cursor: 'pointer', textAlign: 'left', width: '100%',
                transition: 'all 0.18s ease',
                borderLeft: isActive ? '3px solid #0ea5e9' : '3px solid transparent',
                position: 'relative',
                fontFamily: "'Plus Jakarta Sans', sans-serif",
              }}
              onMouseEnter={e => { if (!isActive) { e.currentTarget.style.background = '#f8fafc'; e.currentTarget.style.color = '#334155'; } }}
              onMouseLeave={e => { if (!isActive) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#64748b'; } }}
            >
              <span style={{ fontSize: 16 }}>{icon}</span>
              {label}
              {id === 'expenses' && (
                <span style={{
                  marginLeft: 'auto', background: '#f43f5e', color: 'white',
                  borderRadius: 999, fontSize: 10, fontWeight: 700,
                  padding: '1px 7px', minWidth: 20, textAlign: 'center',
                }}>3</span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Bottom */}
      <div style={{ padding: '8px 10px 20px', borderTop: '1px solid #f0f7fe' }}>
        {bottomItems.map(({ id, label, icon }) => (
          <button
            key={id}
            onClick={() => onNavigate(id)}
            style={{
              display: 'flex', alignItems: 'center', gap: 12,
              padding: '10px 14px', borderRadius: 10, border: 'none',
              background: 'transparent', color: '#64748b',
              fontSize: 13.5, fontWeight: 500, cursor: 'pointer',
              width: '100%', textAlign: 'left',
              fontFamily: "'Plus Jakarta Sans', sans-serif",
            }}
          >
            <span style={{ fontSize: 16 }}>{icon}</span>
            {label}
          </button>
        ))}
      </div>
    </aside>
  );
}

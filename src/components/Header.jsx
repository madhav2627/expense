export default function Header({ settings, onNavigate }) {
  return (
    <header style={{
      background: 'white',
      borderBottom: '1px solid #e8f0f7',
      padding: '14px 28px',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      boxShadow: '0 2px 8px rgba(14,165,233,0.05)',
      zIndex: 9,
    }}>
      <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
        <button style={linkBtn} onClick={() => onNavigate('help')}>Need Help?</button>
        <button style={linkBtn} onClick={() => window.open('https://example.com', '_blank')}>Read Our Blog</button>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <div style={{
          width: 38, height: 38, borderRadius: '50%',
          background: 'linear-gradient(135deg, #0ea5e9, #7c3aed)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: 'white', fontSize: 15, fontWeight: 700,
          cursor: 'pointer', boxShadow: '0 2px 8px rgba(14,165,233,0.3)',
          fontFamily: "'Plus Jakarta Sans', sans-serif",
        }} onClick={() => onNavigate('settings')}>
          {settings?.name?.charAt(0) || 'A'}
        </div>
        <div style={{ cursor: 'pointer' }} onClick={() => onNavigate('settings')}>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#1e293b', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            Hi, {settings?.name?.split(' ')[0] || 'User'}
          </div>
          <div style={{ fontSize: 11, color: '#94a3b8' }}>{settings?.email}</div>
        </div>
        <button style={{
          background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8',
          fontSize: 20, padding: '0 4px',
        }}>≡</button>
      </div>
    </header>
  );
}

const linkBtn = {
  background: 'none', border: 'none', cursor: 'pointer',
  color: '#64748b', fontSize: 13.5, fontWeight: 500,
  fontFamily: "'Plus Jakarta Sans', sans-serif",
  padding: '4px 0', borderBottom: '1px solid transparent',
  transition: 'all 0.15s',
};

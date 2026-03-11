import { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar.jsx';
import Header from './components/Header.jsx';
import AddTransactionModal from './components/AddTransactionModal.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Transactions from './pages/Transactions.jsx';
import Bills from './pages/Bills.jsx';
import Expenses from './pages/Expenses.jsx';
import Reports from './pages/Reports.jsx';
import Settings from './pages/Settings.jsx';
import { getTransactions, saveTransactions, getBills, saveBills, getSettings, saveSettings } from './utils/storage.js';

export default function App() {
  const [page, setPage] = useState('dashboard');
  const [transactions, setTransactions] = useState([]);
  const [bills, setBills] = useState([]);
  const [settings, setSettingsState] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    setTransactions(getTransactions());
    setBills(getBills());
    setSettingsState(getSettings());
  }, []);

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 2800);
  };

  const handleAddTransaction = (tx) => {
    const updated = [tx, ...transactions];
    setTransactions(updated);
    saveTransactions(updated);
    showToast('Transaction added successfully!');
  };

  const handleDeleteTransaction = (id) => {
    const updated = transactions.filter(t => t.id !== id);
    setTransactions(updated);
    saveTransactions(updated);
    showToast('Transaction deleted', 'info');
  };

  const handleMarkBillPaid = (id) => {
    const updated = bills.map(b => b.id === id ? { ...b, status: 'paid' } : b);
    setBills(updated);
    saveBills(updated);
    showToast('Bill marked as paid! ✓');
  };

  const handleSaveSettings = (s) => {
    setSettingsState(s);
    saveSettings(s);
    showToast('Settings saved!');
  };

  const currency = settings?.currency || '₹';

  const pageProps = { transactions, currency, settings, onNavigate: setPage };

  return (
    <div style={{ display: 'flex', height: '100vh', width: '100%', background: '#f0f7fe', fontFamily: "'Plus Jakarta Sans', sans-serif", overflow: 'hidden' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(20px) } to { opacity: 1; transform: translateY(0) } }
        @keyframes slideRight { from { opacity: 0; transform: translateX(20px) } to { opacity: 1; transform: translateX(0) } }
        @keyframes toastIn { from { opacity: 0; transform: translateY(10px) } to { opacity: 1; transform: translateY(0) } }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Plus Jakarta Sans', sans-serif; }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 99px; }
        @media print {
          .no-print { display: none !important; }
          body { background: white; }
        }
      `}</style>

      <div className="no-print">
        <Sidebar activePage={page} onNavigate={setPage} />
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <div className="no-print">
          <Header settings={settings} onNavigate={setPage} />
        </div>

        <main style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          {page === 'dashboard' && (
            <Dashboard {...pageProps} onAddTransaction={() => setShowModal(true)} />
          )}
          {page === 'transactions' && (
            <Transactions {...pageProps} onAdd={() => setShowModal(true)} onDelete={handleDeleteTransaction} />
          )}
          {page === 'bills' && (
            <Bills {...pageProps} bills={bills} onMarkPaid={handleMarkBillPaid} />
          )}
          {page === 'expenses' && (
            <Expenses {...pageProps} />
          )}
          {page === 'reports' && (
            <Reports {...pageProps} />
          )}
          {page === 'settings' && (
            <Settings settings={settings} onSave={handleSaveSettings} />
          )}
          {page === 'help' && (
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 14 }}>
              <span style={{ fontSize: 60 }}>🤝</span>
              <h2 style={{ fontSize: 22, fontWeight: 800, color: '#0f172a', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>How can we help?</h2>
              <p style={{ color: '#64748b', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Contact support at <a href="mailto:support@expense.io" style={{ color: '#0ea5e9' }}>support@expense.io</a></p>
              <button onClick={() => setPage('dashboard')} style={{ background: '#0ea5e9', color: 'white', border: 'none', borderRadius: 10, padding: '10px 24px', fontWeight: 700, cursor: 'pointer', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>← Back to Dashboard</button>
            </div>
          )}
        </main>
      </div>

      {showModal && (
        <AddTransactionModal onClose={() => setShowModal(false)} onAdd={handleAddTransaction} currency={currency} />
      )}

      {toast && (
        <div className="no-print" style={{
          position: 'fixed', bottom: 24, right: 24,
          background: toast.type === 'info' ? '#1e293b' : 'white',
          color: toast.type === 'info' ? 'white' : '#1e293b',
          border: `1px solid ${toast.type === 'info' ? '#334155' : '#e2e8f0'}`,
          borderLeft: `4px solid ${toast.type === 'info' ? '#0ea5e9' : '#10b981'}`,
          borderRadius: 12, padding: '14px 20px',
          boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
          fontWeight: 600, fontSize: 14,
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          animation: 'toastIn 0.3s ease',
          zIndex: 9999,
        }}>
          {toast.type === 'info' ? 'ℹ️' : '✅'} {toast.msg}
        </div>
      )}
    </div>
  );
}

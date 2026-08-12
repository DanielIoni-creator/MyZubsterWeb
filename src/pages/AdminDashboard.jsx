import { useState } from 'react';
import AdminStats from '../components/Admin/AdminStats.jsx';
import UsersManagement from '../components/Admin/UsersManagement.jsx';
import TransactionMonitor from '../components/Admin/TransactionMonitor.jsx';
import AuditLog from '../components/Admin/AuditLog.jsx';
import './AdminDashboard.css';

const TABS = [
  { id: 'overview', label: '📊 Panoramica', Component: AdminStats },
  { id: 'users',    label: '👥 Utenti',     Component: UsersManagement },
  { id: 'txns',     label: '💰 Transazioni', Component: TransactionMonitor },
  { id: 'audit',    label: '📋 Audit Log',   Component: AuditLog },
];

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  const ActiveComponent = TABS.find((t) => t.id === activeTab)?.Component;

  return (
    <div className="admin-dashboard">
      <h1>🔧 Pannello di amministrazione</h1>
      <p className="admin-subtitle">
        Gestisci utenti, monitora transazioni XMR e controlla l'attività del sistema.
      </p>

      <nav className="admin-tabs" role="tablist" aria-label="Sezioni amministrazione">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            role="tab"
            className={`admin-tab ${activeTab === tab.id ? 'admin-tab-active' : ''}`}
            aria-selected={activeTab === tab.id}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      <div className="admin-tab-content" role="tabpanel">
        {ActiveComponent && <ActiveComponent />}
      </div>
    </div>
  );
}

export default AdminDashboard;
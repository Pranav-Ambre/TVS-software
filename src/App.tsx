import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppShell } from './components/layout/AppShell';
import { DashboardPage } from './pages/DashboardPage';
import { ApplicationsPage } from './pages/ApplicationsPage';
import { EcosystemPage } from './pages/EcosystemPage';
import { InvestigationPage } from './pages/InvestigationPage';

export function App() {
  return (
    <Router>
      <AppShell>
        <Routes>
          <Route path="/" element={<Navigate to="/applications" replace />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/applications" element={<ApplicationsPage />} />
          <Route path="/ecosystem" element={<EcosystemPage />} />
          <Route path="/investigations" element={<InvestigationPage />} />
          <Route path="/investigations/:id" element={<InvestigationPage />} />
          <Route path="*" element={<Navigate to="/applications" replace />} />
        </Routes>
      </AppShell>
    </Router>
  );
}

export default App;

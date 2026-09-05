import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppShell } from './components/layout/AppShell';
import { DashboardPage } from './pages/DashboardPage';
import { ApplicationsPage } from './pages/ApplicationsPage';
import { ApplicationDetailPage } from './pages/ApplicationDetailPage';
import { EcosystemPage } from './pages/EcosystemPage';
import { EcosystemEvolutionPage } from './pages/EcosystemEvolutionPage';
import { RiskAnalysisPage } from './pages/RiskAnalysisPage';
import { AlertsPage } from './pages/AlertsPage';
import { InterventionCenterPage } from './pages/InterventionCenterPage';
import { InvestigationPage } from './pages/InvestigationPage';
import { DealersPage } from './pages/DealersPage';
import { ModelInsightsPage } from './pages/ModelInsightsPage';
import { DataManagementPage } from './pages/DataManagementPage';
import { SimulationControlPage } from './pages/SimulationControlPage';

export function App() {
  return (
    <Router>
      <AppShell>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/applications" element={<ApplicationsPage />} />
          <Route path="/applications/:id" element={<ApplicationDetailPage />} />
          <Route path="/ecosystem" element={<EcosystemPage />} />
          <Route path="/evolution" element={<EcosystemEvolutionPage />} />
          <Route path="/risk-analysis" element={<RiskAnalysisPage />} />
          <Route path="/alerts" element={<AlertsPage />} />
          <Route path="/interventions" element={<InterventionCenterPage />} />
          <Route path="/investigations" element={<InvestigationPage />} />
          <Route path="/investigations/:id" element={<InvestigationPage />} />
          <Route path="/dealers" element={<DealersPage />} />
          <Route path="/model-insights" element={<ModelInsightsPage />} />
          <Route path="/data-management" element={<DataManagementPage />} />
          <Route path="/simulation-control" element={<SimulationControlPage />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </AppShell>
    </Router>
  );
}

export default App;

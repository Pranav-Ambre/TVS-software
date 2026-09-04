import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  CheckSquare,
  Square,
  PlayCircle,
  UserCheck,
  Network,
  ShieldCheck,
  UserPlus,
  FileCheck2,
  CheckCircle2
} from 'lucide-react';
import { MiniEcosystemGraph } from '../components/graph/MiniEcosystemGraph';
import { ResponsibleAiFooter } from '../components/common/ResponsibleAiFooter';
import { riskService } from '../services/riskService';

export const InvestigationPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const appId = id || 'APP-78287';
  const application = riskService.getApplicationById(appId) || riskService.getApplications()[0];

  // Tasks state
  const [tasks, setTasks] = useState(riskService.getVerificationTasks());
  
  // Simulation state
  const [isSimulated, setIsSimulated] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const toggleTask = (taskId: string) => {
    setTasks(riskService.toggleVerificationTask(taskId));
  };

  const completedCount = tasks.filter(t => t.completed).length;

  const runSimulation = () => {
    setIsSimulated(true);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 4000);
  };

  const currentEcosystemRisk = isSimulated ? 56 : application.ecosystemRisk;

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-xl flex items-center gap-3 animate-bounce">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          <div>
            <div className="font-bold text-xs">Pipeline Simulation Complete</div>
            <div className="text-[11px] text-slate-300">
              Ecosystem risk score reduced by 28 pts (84 → 56).
            </div>
          </div>
        </div>
      )}

      {/* Breadcrumb & Case Status */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 text-slate-500 font-medium">
          <Link to="/investigations/APP-78287" className="hover:text-slate-900">
            Investigations
          </Link>
          <span>/</span>
          <Link to="/ecosystem" className="hover:text-blue-600 font-semibold">
            {application.ecosystem}
          </Link>
          <span>/</span>
          <span className="font-bold text-slate-900">Application {application.id}</span>
        </div>

        <div className="flex items-center gap-3">
          <span className="bg-red-50 text-red-700 px-2.5 py-1 rounded-md text-[11px] font-semibold flex items-center gap-1 border border-red-200">
            <span className="w-1.5 h-1.5 rounded-full bg-red-600"></span>
            Priority: High
          </span>
          <span className="bg-blue-50 text-blue-700 px-2.5 py-1 rounded-md text-[11px] font-semibold flex items-center gap-1 border border-blue-200">
            <span>🔒 Open • Assigned to Arjun Mehta</span>
          </span>
        </div>
      </div>

      {/* Case Header Card */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              Investigation: {application.id}
            </h1>
            <span className="bg-slate-100 text-slate-600 px-2.5 py-0.5 rounded text-xs font-mono font-semibold">
              ID: {application.caseId}
            </span>
          </div>
          <p className="text-xs text-slate-500 font-medium mt-1">
            Individual Applicant: <strong className="text-slate-800">{application.applicantName}</strong> • Submitted {application.submittedTime} • Applied Amount: <strong className="text-slate-800">{application.appliedAmount}</strong>
          </p>
        </div>

        {/* Divergence Anomaly Metric Cards */}
        <div className="flex items-center gap-4">
          {/* Individual Risk */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 min-w-[170px] text-left">
            <div className="flex items-center justify-between text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              <span>INDIVIDUAL RISK</span>
              <span className="text-emerald-600 font-bold">• LOW RISK</span>
            </div>
            <div className="text-2xl font-black text-slate-900 mt-1">
              {application.individualRisk} <span className="text-xs font-semibold text-slate-400">/ 100</span>
            </div>
            <div className="text-[10px] text-slate-500 font-medium mt-0.5">
              Applicant profile looks clean
            </div>
          </div>

          {/* Ecosystem Risk */}
          <div className="bg-red-50/70 border border-red-200 rounded-xl p-3.5 min-w-[180px] text-left">
            <div className="flex items-center justify-between text-[11px] font-bold text-red-700 uppercase tracking-wider">
              <span>ECOSYSTEM RISK</span>
              <span className="text-red-600 font-bold">• HIGH RISK</span>
            </div>
            <div className="text-2xl font-black text-red-600 mt-1">
              {currentEcosystemRisk} <span className="text-xs font-semibold text-red-400">/ 100</span>
            </div>
            <div className="text-[10px] text-red-600 font-bold mt-0.5">
              Δ +53 divergence anomaly
            </div>
          </div>
        </div>
      </div>

      {/* Main 3-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT COLUMN: Explainable Drivers (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-2xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <UserCheck className="w-4 h-4 text-blue-600" />
                <h3 className="font-bold text-slate-900 text-sm">Explainable Drivers</h3>
              </div>
              <span className="text-[10px] text-slate-400 font-semibold uppercase">SHAP Attribution</span>
            </div>

            <div className="bg-slate-50 border border-slate-200/60 rounded-xl p-3 text-xs text-slate-600">
              Model detected non-obvious entity reuse across recent synthetic credit applications.
            </div>

            {/* Drivers List */}
            <div className="space-y-4 pt-1">
              {application.topDrivers.map((driver) => (
                <div key={driver.id} className="bg-slate-50/50 border border-slate-200/80 rounded-xl p-3.5 space-y-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-bold text-xs text-slate-900">{driver.title}</h4>
                    </div>
                    <span className="bg-red-100 text-red-700 text-[10px] font-bold px-2 py-0.5 rounded-full">
                      +{driver.contributionPercent}% Risk Contribution
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">{driver.details}</p>

                  <div className="flex items-center gap-2 flex-wrap text-[10px]">
                    {driver.tags.map((tag) => (
                      <span key={tag} className="bg-white border border-slate-200 text-slate-700 px-2 py-0.5 rounded font-medium shadow-2xs">
                        {tag}
                      </span>
                    ))}
                    {driver.metaKey && (
                      <span className="bg-slate-200/70 text-slate-700 px-2 py-0.5 rounded font-mono font-semibold">
                        {driver.metaKey} {driver.metaValue}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CENTER COLUMN: Ecosystem Sub-Graph & Verification Checklist (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Connected Ecosystem Sub-Graph Card */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Network className="w-4 h-4 text-blue-600" />
                <h3 className="font-bold text-slate-900 text-sm">Connected Ecosystem Sub-Graph</h3>
              </div>
              <span className="bg-blue-50 text-blue-700 text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                1-Hop Immediate
              </span>
            </div>

            <MiniEcosystemGraph variant="investigation" />
          </div>

          {/* Verification Checklist Card */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-2xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <FileCheck2 className="w-4 h-4 text-blue-600" />
                <h3 className="font-bold text-slate-900 text-sm">Verification Checklist</h3>
              </div>
              <span className="bg-slate-100 text-slate-700 text-xs font-bold px-2.5 py-1 rounded-lg">
                {completedCount} / {tasks.length} Complete
              </span>
            </div>

            <div className="space-y-3">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  onClick={() => toggleTask(task.id)}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-start gap-3 ${
                    task.completed
                      ? 'bg-emerald-50/60 border-emerald-200 text-emerald-950'
                      : 'bg-slate-50/70 border-slate-200 hover:bg-slate-100/60'
                  }`}
                >
                  <button className="mt-0.5 text-blue-600 shrink-0 cursor-pointer">
                    {task.completed ? (
                      <CheckSquare className="w-4 h-4 text-emerald-600" />
                    ) : (
                      <Square className="w-4 h-4 text-slate-400" />
                    )}
                  </button>
                  <div>
                    <h4 className={`font-bold text-xs ${task.completed ? 'line-through text-emerald-800' : 'text-slate-900'}`}>
                      {task.title}
                    </h4>
                    <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">{task.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Recommended Action & Simulation (3 cols) */}
        <div className="lg:col-span-3 space-y-6">
          {/* Protocol Guidance / Recommended Action Card */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-2xs space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                PROTOCOL GUIDANCE
              </span>
              <span className="bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                TARGETED VERIFICATION
              </span>
            </div>

            <div>
              <h3 className="font-bold text-slate-900 text-sm">Recommended Action</h3>
              <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                Initiate physical device verification &amp; verify guarantor relationship before loan sanction.
              </p>
            </div>

            <div className="space-y-2 pt-1">
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs py-2.5 rounded-xl shadow-xs flex items-center justify-center gap-2 transition-colors cursor-pointer">
                <UserPlus className="w-4 h-4" />
                <span>Assign Investigation</span>
              </button>
              <button className="w-full bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 font-semibold text-xs py-2.5 rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-2xs">
                <span>Request Field Verification</span>
              </button>
            </div>
          </div>

          {/* Simulation / Counterfactual Card */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-2xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <h3 className="font-bold text-slate-900 text-sm">Simulation</h3>
              <span className="text-[10px] text-slate-400 font-semibold uppercase">What-If Analysis</span>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              What happens to the ecosystem risk score if individual key anomalies are confirmed valid?
            </p>

            {/* Scenario Box */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 space-y-3">
              <div className="flex items-center justify-between text-xs font-bold text-slate-900">
                <span>Scenario: Verify Shared Device</span>
                <CheckCircle2 className="w-4 h-4 text-blue-600" />
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between text-slate-600">
                  <span>Current Ecosystem Risk:</span>
                  <span className="font-bold text-red-600">{application.ecosystemRisk} / 100</span>
                </div>
                <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                  <div className="h-full bg-red-500 rounded-full" style={{ width: `${application.ecosystemRisk}%` }}></div>
                </div>

                <div className="flex items-center justify-between text-slate-600 pt-1">
                  <span>Simulated if Device Cleared:</span>
                  <span className="font-bold text-emerald-600">56 / 100</span>
                </div>
                <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: '56%' }}></div>
                </div>

                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-2 flex items-center justify-between text-[11px] font-bold text-emerald-700 mt-2">
                  <span>Projected Risk Reduction:</span>
                  <span>-28 pts (Elevated → Moderate)</span>
                </div>
              </div>
            </div>

            <button
              onClick={runSimulation}
              className="w-full bg-blue-50 border border-blue-200 text-blue-700 hover:bg-blue-100 font-semibold text-xs py-2.5 rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <PlayCircle className="w-4 h-4" />
              <span>Test Scenario in Pipeline</span>
            </button>

            <p className="text-[10px] text-slate-400 italic leading-tight">
              * Modeled synthetic result, not a guaranteed outcome. Association is not causation.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Full-Width Responsible AI Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs text-slate-600">
        <div className="flex items-center gap-3">
          <ShieldCheck className="w-5 h-5 text-blue-600 shrink-0" />
          <div>
            <h5 className="font-bold text-slate-900">Responsible Lending &amp; Human-in-the-Loop Oversight</h5>
            <p className="text-slate-500 mt-0.5">
              EERIS supports fair lending compliance. Ecosystem metrics serve as explainable signals for human analyst review. Decisions are never automated.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-[11px] font-semibold text-slate-500 shrink-0">
          <span className="bg-slate-100 border border-slate-200 px-2.5 py-1 rounded-lg">
            Model Card v2.4 (Audited)
          </span>
          <span className="bg-slate-100 border border-slate-200 px-2.5 py-1 rounded-lg">
            FCRA Aligned
          </span>
        </div>
      </div>

      <ResponsibleAiFooter />
    </div>
  );
};

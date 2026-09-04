import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FileText,
  ShieldAlert,
  ArrowRight,
  TrendingUp,
  AlertOctagon,
  Users,
  Smartphone
} from 'lucide-react';
import { ResponsibleAiFooter } from '../components/common/ResponsibleAiFooter';
import { riskService } from '../services/riskService';

export const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const applications = riskService.getApplications();
  const cluster = riskService.getEcosystemCluster('ECO-1024');

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 text-white rounded-2xl p-6 shadow-md relative overflow-hidden">
        <div className="relative z-10 max-w-2xl space-y-2">
          <div className="inline-flex items-center gap-2 bg-blue-500/30 text-blue-200 text-xs font-semibold px-3 py-1 rounded-full border border-blue-400/30">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            Institutional Production Rail Operational
          </div>
          <h1 className="text-2xl font-black tracking-tight">Evolving Ecosystem Risk Intelligence System</h1>
          <p className="text-blue-100/80 text-xs leading-relaxed">
            Decision-support platform for evaluating borrower application risk in multi-dimensional ecosystem context: telemetric devices, shared guarantors, dealer velocity, and payment topologies.
          </p>
        </div>
      </div>

      {/* 4 Summary Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Stat 1 */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-2xs">
          <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
            <span>Ingestion Volume (Today)</span>
            <FileText className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-2xl font-black text-slate-900 mt-2">1,248</div>
          <div className="text-[11px] text-emerald-600 font-bold mt-1 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            <span>+14.2% vs baseline</span>
          </div>
        </div>

        {/* Stat 2 */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-2xs">
          <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
            <span>High Ecosystem Risk</span>
            <AlertOctagon className="w-4 h-4 text-red-600" />
          </div>
          <div className="text-2xl font-black text-red-600 mt-2">3 Clusters</div>
          <div className="text-[11px] text-red-600 font-bold mt-1">ECO-1024, ECO-1033 active</div>
        </div>

        {/* Stat 3 */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-2xs">
          <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
            <span>Shared Device Collisions</span>
            <Smartphone className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-2xl font-black text-slate-900 mt-2">18 Devices</div>
          <div className="text-[11px] text-amber-600 font-bold mt-1">Multi-application IMEI clash</div>
        </div>

        {/* Stat 4 */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-2xs">
          <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
            <span>Average Individual Risk</span>
            <Users className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-black text-slate-900 mt-2">32 / 100</div>
          <div className="text-[11px] text-emerald-600 font-bold mt-1">Clean bureau profiles</div>
        </div>
      </div>

      {/* Main Highlights Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Active Application Ingestion Preview (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200/80 p-5 shadow-2xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Active Loan Ingestion Stream</h3>
              <p className="text-xs text-slate-400">Applications flagged with ecosystem divergence</p>
            </div>
            <button
              onClick={() => navigate('/applications')}
              className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer"
            >
              <span>View All Applications</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {applications.slice(0, 3).map((app) => (
              <div
                key={app.id}
                onClick={() => navigate('/applications')}
                className="p-3.5 rounded-xl border border-slate-200/80 hover:bg-blue-50/50 transition-colors cursor-pointer flex items-center justify-between"
              >
                <div>
                  <div className="font-bold text-xs text-slate-900">{app.applicantName} ({app.id})</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">{app.rail}</div>
                </div>

                <div className="flex items-center gap-4 text-xs font-medium">
                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 block">Ind. Risk</span>
                    <span className="font-bold text-emerald-600">{app.individualRisk} (Low)</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 block">Eco. Risk</span>
                    <span className="font-bold text-red-600">{app.ecosystemRisk} (High)</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Active Ring Focus (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200/80 p-5 shadow-2xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Top Suspicious Ecosystem</h3>
              <p className="text-xs text-slate-400">Cluster {cluster.id}</p>
            </div>
            <button
              onClick={() => navigate('/ecosystem')}
              className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer"
            >
              <span>Explore Graph</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="bg-red-50/70 border border-red-200 rounded-xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-xs text-red-950">{cluster.name}</span>
              <span className="bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                {cluster.status}
              </span>
            </div>
            <p className="text-xs text-red-700 leading-relaxed font-medium">
              {cluster.detectedPattern}
            </p>

            <div className="grid grid-cols-2 gap-2 text-xs font-semibold text-slate-700 pt-1">
              <div className="bg-white/80 p-2 rounded-lg border border-red-100">
                <span className="text-[10px] text-slate-400 block">Risk Score</span>
                <span className="text-base font-black text-red-600">{cluster.riskScore} / 100</span>
              </div>
              <div className="bg-white/80 p-2 rounded-lg border border-red-100">
                <span className="text-[10px] text-slate-400 block">Connected Nodes</span>
                <span className="text-base font-black text-slate-900">{cluster.nodesCount} Nodes</span>
              </div>
            </div>

            <button
              onClick={() => navigate('/investigations/APP-78287')}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs py-2.5 rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-xs"
            >
              <ShieldAlert className="w-4 h-4" />
              <span>Investigate APP-78287</span>
            </button>
          </div>
        </div>
      </div>

      <ResponsibleAiFooter />
    </div>
  );
};

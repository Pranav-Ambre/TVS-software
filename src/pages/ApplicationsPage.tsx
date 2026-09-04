import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Scale,
  Download,
  Search,
  Calendar,
  Activity,
  UserCheck,
  Network,
  Target,
  TrendingUp,
  ArrowRight
} from 'lucide-react';
import { RiskBadge } from '../components/common/RiskBadge';
import { MiniEcosystemGraph } from '../components/graph/MiniEcosystemGraph';
import { ResponsibleAiFooter } from '../components/common/ResponsibleAiFooter';
import { riskService } from '../services/riskService';
import type { Application } from '../types/eeris';

export const ApplicationsPage: React.FC = () => {
  const navigate = useNavigate();
  const applications = riskService.getApplications();
  const [selectedApp, setSelectedApp] = useState<Application>(applications[0]);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredApps = applications.filter(app =>
    app.applicantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    app.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    app.ecosystem.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Applications</h1>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold border border-blue-200">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse"></span>
              Live Ingestion Rail
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">Review applications with ecosystem context.</p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5">
          <button className="inline-flex items-center gap-2 bg-white border border-slate-200 text-slate-700 px-3.5 py-2 rounded-xl text-xs font-semibold hover:bg-slate-50 transition-colors shadow-2xs">
            <Scale className="w-3.5 h-3.5 text-blue-600" />
            <span>Individual Risk vs Ecosystem Risk Context</span>
          </button>
          <button className="inline-flex items-center gap-2 bg-white border border-slate-200 text-slate-700 px-3.5 py-2 rounded-xl text-xs font-semibold hover:bg-slate-50 transition-colors shadow-2xs">
            <Download className="w-3.5 h-3.5 text-slate-500" />
            <span>Export CSV / Report</span>
          </button>
        </div>
      </div>

      {/* Filter Container */}
      <div className="bg-white rounded-2xl p-3.5 border border-slate-200/80 shadow-2xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex-1 min-w-[280px]">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Application ID, Applicant Name, PAN, or Phone..."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
            />
          </div>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          {/* Risk Filter */}
          <div className="flex items-center gap-1.5 bg-slate-100/80 px-3 py-1.5 rounded-xl text-xs">
            <span className="text-slate-500 font-semibold text-[11px] uppercase tracking-wider">RISK:</span>
            <select className="bg-transparent font-medium text-slate-800 focus:outline-none cursor-pointer">
              <option>All Profiles</option>
              <option>High Risk Divergence</option>
              <option>Low Risk Base</option>
            </select>
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-1.5 bg-slate-100/80 px-3 py-1.5 rounded-xl text-xs">
            <span className="text-slate-500 font-semibold text-[11px] uppercase tracking-wider">STATUS:</span>
            <select className="bg-transparent font-medium text-slate-800 focus:outline-none cursor-pointer">
              <option>All Stages</option>
              <option>Stage 3 Coordinated</option>
              <option>Pending Verification</option>
            </select>
          </div>

          {/* Date Filter */}
          <div className="flex items-center gap-1.5 bg-slate-100/80 px-3 py-1.5 rounded-xl text-xs">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-500 font-semibold text-[11px] uppercase tracking-wider">DATE:</span>
            <span className="font-medium text-slate-800">Today</span>
          </div>
        </div>
      </div>

      {/* Main 2-Column Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Application Ingestion Stream (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200/80 shadow-2xs overflow-hidden flex flex-col justify-between">
          <div>
            {/* Stream Header */}
            <div className="p-4 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-slate-900 text-sm">Application Ingestion Stream</h3>
              </div>
              <div className="flex items-center gap-3 text-xs">
                <span className="bg-slate-100 text-slate-600 px-2.5 py-1 rounded-lg font-semibold text-[11px]">
                  5 Active Rows
                </span>
                <span className="flex items-center gap-1.5 text-emerald-600 font-semibold text-[11px]">
                  <Activity className="w-3.5 h-3.5" />
                  Dynamic Drift Scoring Enabled
                </span>
              </div>
            </div>

            {/* Applications Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/70 border-b border-slate-200/60 text-[10px] uppercase font-bold tracking-wider text-slate-500">
                    <th className="py-3 px-4">APPLICANT / ID</th>
                    <th className="py-3 px-3">INDIVIDUAL RISK</th>
                    <th className="py-3 px-3">ECOSYSTEM RISK</th>
                    <th className="py-3 px-3">NOVELTY</th>
                    <th className="py-3 px-4">ECOSYSTEM</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs">
                  {filteredApps.map((app) => {
                    const isSelected = selectedApp.id === app.id;
                    return (
                      <tr
                        key={app.id}
                        onClick={() => setSelectedApp(app)}
                        className={`cursor-pointer transition-colors ${
                          isSelected
                            ? 'bg-blue-50/80 font-medium'
                            : 'hover:bg-slate-50/60 text-slate-700'
                        }`}
                      >
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-2">
                            {isSelected && <span className="w-1.5 h-6 rounded-r bg-blue-600 -ml-4"></span>}
                            <div>
                              <div className="font-bold text-slate-900">{app.applicantName}</div>
                              <div className="text-[11px] text-slate-400 font-mono">{app.id}</div>
                            </div>
                          </div>
                        </td>
                        <td className="py-3.5 px-3">
                          <RiskBadge score={app.individualRisk} level={app.individualRiskLevel} />
                        </td>
                        <td className="py-3.5 px-3">
                          <RiskBadge score={app.ecosystemRisk} level={app.ecosystemRiskLevel} />
                        </td>
                        <td className="py-3.5 px-3 font-mono font-semibold text-slate-700">
                          {app.novelty.toFixed(2)}
                        </td>
                        <td className="py-3.5 px-4 font-mono text-[11px] text-slate-500">
                          <span className="bg-slate-100 px-2 py-0.5 rounded font-semibold text-slate-700">
                            {app.ecosystem}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Table Footer */}
          <div className="p-3.5 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between text-[11px] text-slate-500">
            <span>Showing 5 synthetic loan applications evaluated on multi-dimensional clustering</span>
            <span className="font-semibold text-slate-700">Page 1 of 1</span>
          </div>
        </div>

        {/* Right Column: Application Detail Panel (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-2xs space-y-5">
            {/* Header */}
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-bold text-slate-900 text-base">
                  Application Detail: {selectedApp.id} ({selectedApp.applicantName})
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">{selectedApp.rail}</p>
              </div>
              <span className="inline-flex items-center gap-1 bg-blue-100 text-blue-700 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse"></span>
                Live Focus
              </span>
            </div>

            {/* 4 Key Metric Cards */}
            <div className="grid grid-cols-2 gap-3">
              {/* Individual Risk */}
              <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3 text-left">
                <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
                  <span>Individual Risk</span>
                  <UserCheck className="w-4 h-4 text-emerald-600" />
                </div>
                <div className="text-2xl font-black text-slate-900 mt-1">
                  {selectedApp.individualRisk} <span className="text-xs font-semibold text-slate-400">/ 100</span>
                </div>
                <div className="text-[11px] font-bold text-emerald-600 mt-0.5">Low Base Risk</div>
              </div>

              {/* Ecosystem Risk */}
              <div className="bg-red-50/60 border border-red-200 rounded-xl p-3 text-left">
                <div className="flex items-center justify-between text-xs text-red-700 font-medium">
                  <span>Ecosystem Risk</span>
                  <Network className="w-4 h-4 text-red-600" />
                </div>
                <div className="text-2xl font-black text-red-600 mt-1">
                  {selectedApp.ecosystemRisk} <span className="text-xs font-semibold text-red-400">/ 100</span>
                </div>
                <div className="text-[11px] font-bold text-red-600 mt-0.5">High Cluster Contagion</div>
              </div>

              {/* Novelty Metric */}
              <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3 text-left">
                <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
                  <span>Novelty Metric</span>
                  <Target className="w-4 h-4 text-blue-600" />
                </div>
                <div className="text-2xl font-black text-slate-900 mt-1">
                  {selectedApp.novelty.toFixed(2)}
                </div>
                <div className="text-[11px] font-bold text-slate-600 mt-0.5">Unusual Topology</div>
              </div>

              {/* Maturity State */}
              <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3 text-left">
                <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
                  <span>Maturity State</span>
                  <TrendingUp className="w-4 h-4 text-amber-600" />
                </div>
                <div className="text-xl font-black text-slate-900 mt-1">
                  {selectedApp.maturityState}
                </div>
                <div className="text-[11px] font-bold text-amber-600 mt-0.5">{selectedApp.coordinatedPattern}</div>
              </div>
            </div>

            {/* Why? Top Risk Drivers (SHAP) */}
            <div className="bg-slate-50/80 border border-slate-200/60 rounded-xl p-4 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-xs text-slate-900">Why? Top Risk Drivers</h4>
                <span className="text-[10px] text-slate-400 font-medium">Synthesized SHAP Analysis</span>
              </div>

              <div className="space-y-2.5">
                {selectedApp.topDrivers.length > 0 ? (
                  selectedApp.topDrivers.map((driver) => (
                    <div key={driver.id} className="space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-slate-800">{driver.title}</span>
                        <span className={`font-bold ${driver.riskLevel === 'High' ? 'text-red-600' : 'text-amber-600'}`}>
                          {driver.riskLevel} ({driver.contributionPercent}%)
                        </span>
                      </div>
                      {/* Bar */}
                      <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            driver.riskLevel === 'High' ? 'bg-red-500' : 'bg-amber-500'
                          }`}
                          style={{ width: `${driver.contributionPercent * 3.5}%` }}
                        />
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-slate-400 italic">No significant risk drivers identified.</p>
                )}
              </div>
            </div>

            {/* Connected Ecosystem Preview */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-xs text-slate-900">Connected Ecosystem</h4>
                <span className="font-mono text-xs font-semibold text-blue-600">{selectedApp.ecosystem}</span>
              </div>
              <MiniEcosystemGraph variant="preview" />
            </div>

            {/* Recommended Action Card */}
            <div className="bg-blue-50/60 border border-blue-200 rounded-xl p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                  RECOMMENDED ACTION
                </span>
                <span className="bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                  {selectedApp.recommendedAction.badge}
                </span>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed font-medium">
                "{selectedApp.recommendedAction.text}"
              </p>

              <button
                onClick={() => navigate(`/investigations/${selectedApp.id}`)}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs py-2.5 rounded-xl shadow-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <span>Open Investigation</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Responsible AI Footer */}
      <ResponsibleAiFooter />
    </div>
  );
};

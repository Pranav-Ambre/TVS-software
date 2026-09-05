import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FileText,
  ShieldAlert,
  ArrowRight,
  AlertOctagon,
  Network,
  Cpu,
  Zap,
  Sparkles,
  Radio,
  CheckCircle2
} from 'lucide-react';
import { ResponsibleAiFooter } from '../components/common/ResponsibleAiFooter';
import { riskService } from '../services/riskService';
import { RiskBadge } from '../components/common/RiskBadge';
import type { LiveEcosystemEvent } from '../types/eeris';

export const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const metrics = riskService.getDashboardMetrics();
  const allApps = riskService.getApplications();
  const [liveEvents, setLiveEvents] = useState<LiveEcosystemEvent[]>(riskService.getLiveEvents());

  const topHighRiskApps = allApps
    .filter(app => app.ecosystemRisk >= 70)
    .sort((a, b) => (b.ecosystemRisk - b.individualRisk) - (a.ecosystemRisk - a.individualRisk))
    .slice(0, 5);

  const heroCluster = riskService.getEcosystemCluster('ECO-1024');

  useEffect(() => {
    const interval = setInterval(() => {
      setLiveEvents([...riskService.getLiveEvents()]);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 text-white rounded-2xl p-6 shadow-md relative overflow-hidden">
        <div className="relative z-10 max-w-4xl space-y-3">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="inline-flex items-center gap-1.5 bg-blue-500/30 text-blue-200 text-xs font-semibold px-3 py-1 rounded-full border border-blue-400/30">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              FastAPI + SQLite Backend Active
            </span>
            <span className="inline-flex items-center gap-1 bg-amber-400/20 text-amber-200 text-xs font-semibold px-2.5 py-0.5 rounded-full border border-amber-300/30">
              <Sparkles className="w-3 h-3 text-amber-300" />
              Synthetic Demo Data Mode (100 Applications)
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
            Evolving Ecosystem Risk Intelligence System
          </h1>

          <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/15 flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs">
            <div className="space-y-1">
              <span className="text-blue-300 font-bold uppercase tracking-wider text-[10px]">CORE EERIS INSIGHT</span>
              <p className="text-slate-100 font-medium leading-relaxed">
                Traditional lending asks: <em>"Is this applicant risky?"</em> <br/>
                <strong>EERIS asks: <em>"Is something risky happening around this applicant?"</em></strong>
              </p>
            </div>

            <div className="bg-white text-slate-900 px-4 py-2.5 rounded-xl flex items-center gap-4 shrink-0 shadow-xs">
              <div className="text-center">
                <span className="text-[10px] text-slate-500 block uppercase font-bold">INDIVIDUAL</span>
                <span className="font-black text-emerald-600 text-base">31 / 100</span>
              </div>
              <span className="text-slate-300 font-bold text-lg">+</span>
              <div className="text-center">
                <span className="text-[10px] text-slate-500 block uppercase font-bold">ECOSYSTEM</span>
                <span className="font-black text-red-600 text-base">84 / 100</span>
              </div>
              <button
                onClick={() => navigate('/applications/APP-78287')}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-3 py-1.5 rounded-lg transition-colors cursor-pointer ml-1"
              >
                Inspect
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 5 Dynamic Portfolio Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-2xs space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
            <span>Evaluated Apps</span>
            <FileText className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-2xl font-black text-slate-900">{metrics.totalApplications}</div>
          <div className="text-[10px] text-slate-500 font-bold">100 Synthetic Dataset</div>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-2xs space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
            <span>Fast Tracked</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-black text-emerald-600">{metrics.fastTrackedCount || 54} Apps</div>
          <div className="text-[10px] text-emerald-600 font-bold">Path A • Low Friction</div>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-2xs space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
            <span>High Ecosystem Risk</span>
            <AlertOctagon className="w-4 h-4 text-red-600" />
          </div>
          <div className="text-2xl font-black text-red-600">{metrics.highEcosystemRiskApps} Apps</div>
          <div className="text-[10px] text-red-600 font-bold">Path C • Investigation</div>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-2xs space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
            <span>Emerging Ecosystems</span>
            <Network className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-2xl font-black text-slate-900">{metrics.emergingEcosystemsCount} Clusters</div>
          <div className="text-[10px] text-amber-600 font-bold">Stage 1/2 Growth</div>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-2xs space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
            <span>Targeted Verification</span>
            <ShieldAlert className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-2xl font-black text-slate-900">{metrics.underInvestigationCount} Flagged</div>
          <div className="text-[10px] text-blue-600 font-bold">Path B • Targeted Check</div>
        </div>
      </div>

      {/* LIVE EVENT STREAM (Requirement #19) */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-2xs space-y-3">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <Radio className="w-4 h-4 text-red-500 animate-pulse" />
            <h2 className="font-bold text-slate-900 text-sm">LIVE ECOSYSTEM EVENT STREAM</h2>
          </div>
          <span className="text-[10px] font-bold bg-red-50 text-red-700 px-2.5 py-0.5 rounded-full border border-red-200">
            REAL-TIME WEBSOCKET FEED
          </span>
        </div>

        <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
          {liveEvents.slice(0, 6).map((evt) => (
            <div key={evt.id} className="bg-slate-50 border border-slate-200/70 rounded-xl p-2.5 flex items-center justify-between text-xs">
              <div className="flex items-center gap-3">
                <span className="font-mono text-[11px] font-bold text-slate-400">{evt.timestamp}</span>
                <span className="bg-blue-100 text-blue-800 text-[10px] font-bold px-2 py-0.5 rounded uppercase font-mono">
                  {evt.eventType}
                </span>
                <span className="text-slate-700 font-medium">{evt.description}</span>
              </div>
              {evt.appId && (
                <button
                  onClick={() => navigate(`/applications/${evt.appId}`)}
                  className="text-blue-600 hover:underline font-bold text-[11px] shrink-0"
                >
                  Inspect {evt.appId} →
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* HOW EERIS WORKS VISUAL */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-2xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h2 className="font-bold text-slate-900 text-sm tracking-tight">How EERIS Works</h2>
            <p className="text-xs text-slate-500">4-step ecosystem relationship scoring process</p>
          </div>
          <span className="bg-blue-50 text-blue-700 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase border border-blue-200">
            Methodology
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2 relative">
            <div className="flex items-center justify-between">
              <span className="w-7 h-7 rounded-lg bg-blue-600 text-white font-bold text-xs flex items-center justify-center">1</span>
              <span className="text-[10px] font-bold text-slate-400 uppercase">INGESTION</span>
            </div>
            <h3 className="font-bold text-xs text-slate-900">1. Connect</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Borrowers + Devices + Dealers + Accounts + Guarantors
            </p>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2 relative">
            <div className="flex items-center justify-between">
              <span className="w-7 h-7 rounded-lg bg-blue-600 text-white font-bold text-xs flex items-center justify-center">2</span>
              <span className="text-[10px] font-bold text-slate-400 uppercase">ANALYSIS</span>
            </div>
            <h3 className="font-bold text-xs text-slate-900">2. Detect</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Find unusual entity relationships and device collisions
            </p>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2 relative">
            <div className="flex items-center justify-between">
              <span className="w-7 h-7 rounded-lg bg-blue-600 text-white font-bold text-xs flex items-center justify-center">3</span>
              <span className="text-[10px] font-bold text-slate-400 uppercase">SCORING</span>
            </div>
            <h3 className="font-bold text-xs text-slate-900">3. Score</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Calculate Individual Risk + Ecosystem Risk divergence
            </p>
          </div>

          <div className="bg-blue-50/70 border border-blue-200 rounded-xl p-4 space-y-2 relative">
            <div className="flex items-center justify-between">
              <span className="w-7 h-7 rounded-lg bg-blue-700 text-white font-bold text-xs flex items-center justify-center">4</span>
              <span className="text-[10px] font-bold text-blue-600 uppercase">ACTION</span>
            </div>
            <h3 className="font-bold text-xs text-blue-950">4. Investigate</h3>
            <p className="text-xs text-blue-800 font-medium leading-relaxed">
              Targeted human verification (Device &amp; Guarantor audit)
            </p>
          </div>
        </div>
      </div>

      {/* SWARM INTELLIGENCE & RISK DISTRIBUTION GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200/80 p-5 shadow-2xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <Cpu className="w-4 h-4 text-blue-600" />
              <h2 className="font-bold text-slate-900 text-sm">SWARM INTELLIGENCE</h2>
            </div>
            <span className="text-[11px] text-slate-500 font-medium">Multiple specialized signals work together</span>
          </div>

          <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-4 space-y-4">
            <div className="grid grid-cols-5 gap-2 text-center text-[10px] font-bold text-slate-700">
              <div className="bg-white p-2 rounded-lg border border-slate-200 shadow-2xs">Application</div>
              <div className="bg-white p-2 rounded-lg border border-slate-200 shadow-2xs">Device</div>
              <div className="bg-white p-2 rounded-lg border border-slate-200 shadow-2xs">Dealer</div>
              <div className="bg-white p-2 rounded-lg border border-slate-200 shadow-2xs">Payment</div>
              <div className="bg-white p-2 rounded-lg border border-slate-200 shadow-2xs">Identity</div>
            </div>

            <div className="flex items-center justify-center gap-2 text-xs font-bold text-blue-600 py-1">
              <Zap className="w-3.5 h-3.5 animate-pulse" />
              <span>Evidence Fusion Layer</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>

            <div className="bg-blue-600 text-white rounded-xl p-3 text-center space-y-1">
              <div className="text-[10px] font-bold uppercase tracking-wider text-blue-200">INTEGRATED OUTPUT</div>
              <div className="font-black text-sm">Ecosystem Risk Score &amp; Decision Routing Action Engine</div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200/80 p-5 shadow-2xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h2 className="font-bold text-slate-900 text-sm">RISK DISTRIBUTION</h2>
            <span className="text-[11px] text-slate-400 font-semibold">100 Synthetic Applications</span>
          </div>

          <div className="space-y-3">
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-emerald-700">Low Risk (Score &lt; 45)</span>
                <span className="text-slate-900 font-bold">{metrics.riskDistribution.low} Apps ({metrics.riskDistribution.low}%)</span>
              </div>
              <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${metrics.riskDistribution.low}%` }}></div>
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-amber-700">Medium Risk (Score 45-69)</span>
                <span className="text-slate-900 font-bold">{metrics.riskDistribution.medium} Apps ({metrics.riskDistribution.medium}%)</span>
              </div>
              <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-amber-500 rounded-full" style={{ width: `${metrics.riskDistribution.medium}%` }}></div>
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-red-700">High Ecosystem Risk (Score 70+)</span>
                <span className="text-slate-900 font-bold">{metrics.riskDistribution.high} Apps ({metrics.riskDistribution.high}%)</span>
              </div>
              <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-red-500 rounded-full" style={{ width: `${metrics.riskDistribution.high}%` }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* RECENT HIGH RISK & ACTIVE ECOSYSTEMS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200/80 p-5 shadow-2xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Recent High-Risk Applications</h3>
              <p className="text-xs text-slate-400">Applications flagged with high ecosystem divergence</p>
            </div>
            <button
              onClick={() => navigate('/applications')}
              className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer"
            >
              <span>View All 100</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-[10px] uppercase font-bold tracking-wider text-slate-500">
                  <th className="py-2.5 px-3">Applicant / ID</th>
                  <th className="py-2.5 px-2 text-center">Individual</th>
                  <th className="py-2.5 px-2 text-center">Ecosystem</th>
                  <th className="py-2.5 px-3">Decision Path</th>
                  <th className="py-2.5 px-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {topHighRiskApps.map((app) => (
                  <tr
                    key={app.id}
                    onClick={() => navigate(`/applications/${app.id}`)}
                    className="hover:bg-blue-50/50 cursor-pointer transition-colors"
                  >
                    <td className="py-3 px-3">
                      <div className="font-bold text-slate-900">{app.applicantName}</div>
                      <div className="text-[11px] text-slate-400 font-mono">{app.id}</div>
                    </td>
                    <td className="py-3 px-2 text-center">
                      <RiskBadge score={app.individualRisk} level={app.individualRiskLevel} />
                    </td>
                    <td className="py-3 px-2 text-center">
                      <RiskBadge score={app.ecosystemRisk} level={app.ecosystemRiskLevel} />
                    </td>
                    <td className="py-3 px-3 font-mono text-[10px]">
                      <span className="bg-red-100 text-red-700 px-2 py-0.5 rounded font-bold uppercase">
                        PATH C (HOLD)
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right">
                      <span className="text-xs font-bold text-blue-600 hover:underline">
                        Inspect →
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200/80 p-5 shadow-2xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Active Ecosystem Clusters</h3>
              <p className="text-xs text-slate-400">Cluster {heroCluster.id}</p>
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
              <span className="font-bold text-xs text-red-950">{heroCluster.name}</span>
              <span className="bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                {heroCluster.status}
              </span>
            </div>
            <p className="text-xs text-red-700 leading-relaxed font-medium">
              {heroCluster.detectedPattern}
            </p>

            <div className="grid grid-cols-2 gap-2 text-xs font-semibold text-slate-700 pt-1">
              <div className="bg-white/90 p-2.5 rounded-lg border border-red-100">
                <span className="text-[10px] text-slate-400 block font-bold">Ecosystem Risk</span>
                <span className="text-base font-black text-red-600">{heroCluster.riskScore} / 100</span>
              </div>
              <div className="bg-white/90 p-2.5 rounded-lg border border-red-100">
                <span className="text-[10px] text-slate-400 block font-bold">Connected Entities</span>
                <span className="text-base font-black text-slate-900">{heroCluster.nodesCount} Nodes</span>
              </div>
            </div>

            <button
              onClick={() => navigate('/applications/APP-78287')}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs py-2.5 rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-xs"
            >
              <ShieldAlert className="w-4 h-4" />
              <span>Decision Routing for APP-78287</span>
            </button>
          </div>
        </div>
      </div>

      <ResponsibleAiFooter />
    </div>
  );
};

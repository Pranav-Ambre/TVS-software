import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Download,
  Search,
  Filter,
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  AlertTriangle
} from 'lucide-react';
import { EcosystemGraph } from '../components/graph/EcosystemGraph';
import { ResponsibleAiFooter } from '../components/common/ResponsibleAiFooter';
import { riskService } from '../services/riskService';
import type { TimelinePhase } from '../types/eeris';

export const EcosystemPage: React.FC = () => {
  const navigate = useNavigate();
  const cluster = riskService.getEcosystemCluster('ECO-1024');
  const [selectedTimeline, setSelectedTimeline] = useState<TimelinePhase>('Current (Active)');
  const [searchEntity, setSearchEntity] = useState('');

  return (
    <div className="space-y-6">
      {/* Small Breadcrumb & Header */}
      <div>
        <div className="flex items-center gap-2 text-[10px] uppercase font-bold tracking-widest text-slate-400 mb-1">
          <span>RELATIONAL INTELLIGENCE</span>
          <span>•</span>
          <span className="text-blue-600">NETWORK TOPOLOGY</span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Ecosystem Explorer</h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Interactive entity relationship mapping and network propagation analysis
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-blue-50 border border-blue-200 text-blue-800 text-xs font-semibold px-3 py-1.5 rounded-xl flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-600"></span>
              <span>Active Cluster: {cluster.id} ({cluster.riskScore} Risk)</span>
            </div>
            <button className="inline-flex items-center gap-2 bg-white border border-slate-200 text-slate-700 px-3.5 py-2 rounded-xl text-xs font-semibold hover:bg-slate-50 transition-colors shadow-2xs">
              <Download className="w-3.5 h-3.5 text-slate-500" />
              <span>Export Graph</span>
            </button>
          </div>
        </div>
      </div>

      {/* Filter & Timeline Area */}
      <div className="bg-white rounded-2xl p-3.5 border border-slate-200/80 shadow-2xs flex flex-wrap items-center justify-between gap-4">
        {/* Search */}
        <div className="flex-1 min-w-[280px]">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchEntity}
              onChange={(e) => setSearchEntity(e.target.value)}
              placeholder="Search Entity by PAN, Application ID, Device ID, or Dealer..."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
            />
          </div>
        </div>

        {/* Filter Pill */}
        <div className="flex items-center gap-2 bg-red-50/70 border border-red-200 text-red-700 px-3 py-1.5 rounded-xl text-xs font-semibold">
          <Filter className="w-3.5 h-3.5 text-red-500" />
          <span>Filter: High & Medium Risk (Score &gt; 60)</span>
        </div>

        {/* Timeline Tabs */}
        <div className="bg-slate-100 p-1 rounded-xl flex items-center gap-1 text-xs font-semibold">
          {(['Before Alert', 'Alert (Day 0)', 'Current (Active)'] as TimelinePhase[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setSelectedTimeline(tab)}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                selectedTimeline === tab
                  ? 'bg-white text-blue-700 shadow-2xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Main React Flow Graph Canvas */}
      <EcosystemGraph
        timelinePhase={selectedTimeline}
        onNodeClick={(id) => {
          if (id.includes('app') || id.includes('78287')) {
            navigate('/investigations/APP-78287');
          }
        }}
      />

      {/* Cluster Telemetry Card */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-2xs space-y-6">
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center border border-red-100">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-slate-900 text-base">
                  Cluster Telemetry · {cluster.id}
                </h3>
                <span className="bg-red-100 text-red-700 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                  ● HIGH RISK
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">{cluster.detectedPattern}</p>
            </div>
          </div>

          <button
            onClick={() => navigate('/investigations/APP-78287')}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs px-4 py-2.5 rounded-xl shadow-xs flex items-center gap-2 transition-colors cursor-pointer shrink-0"
          >
            <span>Open Investigation for APP-78287</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* 5 Compact Metric Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {/* Metric 1 */}
          <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3.5 text-left">
            <div className="text-xs text-slate-500 font-medium">Risk Score</div>
            <div className="text-2xl font-black text-red-600 mt-1">
              {cluster.riskScore} <span className="text-xs font-semibold text-slate-400">/ 100</span>
            </div>
            <div className="text-[10px] font-bold text-red-600 mt-1 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              <span>↑ +18pts vs avg</span>
            </div>
          </div>

          {/* Metric 2 */}
          <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3.5 text-left">
            <div className="text-xs text-slate-500 font-medium">Novelty</div>
            <div className="text-2xl font-black text-slate-900 mt-1">{cluster.novelty.toFixed(2)}</div>
            <div className="text-[10px] font-bold text-slate-500 mt-1">High novelty topology</div>
          </div>

          {/* Metric 3 */}
          <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3.5 text-left">
            <div className="text-xs text-slate-500 font-medium">Maturity</div>
            <div className="text-2xl font-black text-slate-900 mt-1">{cluster.maturity}</div>
            <div className="text-[10px] font-bold text-amber-600 mt-1">Propagation active</div>
          </div>

          {/* Metric 4 */}
          <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3.5 text-left">
            <div className="text-xs text-slate-500 font-medium">Growth</div>
            <div className="text-2xl font-black text-red-600 mt-1">{cluster.growth}</div>
            <div className="text-[10px] font-bold text-slate-500 mt-1">Week-on-week expansion</div>
          </div>

          {/* Metric 5 */}
          <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3.5 text-left">
            <div className="text-xs text-slate-500 font-medium">Entities Connected</div>
            <div className="text-2xl font-black text-blue-600 mt-1">{cluster.nodesCount} Nodes</div>
            <div className="text-[10px] font-bold text-slate-500 mt-1">{cluster.edgesCount} structural edges</div>
          </div>
        </div>

        {/* Cluster Expansion Vector (Timeline) */}
        <div className="pt-2 space-y-3">
          <div className="flex items-center justify-between text-xs font-bold text-slate-400 uppercase tracking-wider">
            <span>CLUSTER EXPANSION VECTOR (TIMELINE)</span>
            <span className="text-slate-400 font-normal">T-minus 72h window</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Phase 1 */}
            <div className="bg-slate-50/80 border border-slate-200 rounded-xl p-3.5 flex items-start gap-3">
              <div className="w-7 h-7 rounded-full bg-blue-100 text-blue-700 font-bold text-xs flex items-center justify-center shrink-0">
                1
              </div>
              <div>
                <h4 className="font-bold text-xs text-slate-900">Before Alert</h4>
                <p className="text-xs text-slate-500 mt-0.5">3 initial nodes registered</p>
              </div>
            </div>

            {/* Phase 2 */}
            <div className="bg-slate-50/80 border border-slate-200 rounded-xl p-3.5 flex items-start gap-3">
              <div className="w-7 h-7 rounded-full bg-blue-100 text-blue-700 font-bold text-xs flex items-center justify-center shrink-0">
                2
              </div>
              <div>
                <h4 className="font-bold text-xs text-slate-900">Alert Trigger (Day 0)</h4>
                <p className="text-xs text-red-600 font-medium mt-0.5">8 nodes · Hardware ID clash</p>
              </div>
            </div>

            {/* Phase 3 */}
            <div className="bg-red-50/70 border border-red-200 rounded-xl p-3.5 flex items-start gap-3">
              <div className="w-7 h-7 rounded-full bg-red-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
                3
              </div>
              <div>
                <h4 className="font-bold text-xs text-red-950">Current State</h4>
                <p className="text-xs text-red-700 font-bold mt-0.5">14 nodes · Syndicated ring</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Responsible Lending Notice */}
      <div className="bg-slate-100/70 border border-slate-200 rounded-2xl p-4 flex items-start gap-3 text-xs text-slate-600">
        <ShieldCheck className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
        <div>
          <h5 className="font-bold text-slate-900">Responsible Lending &amp; Procedural Fairness</h5>
          <p className="mt-0.5 leading-relaxed text-slate-600">
            Association is not causation. Entity linkage indicates shared behavioral vectors for targeted verification, not automated disapproval. Underwriters must conduct mandatory manual validation before any final adverse credit action.
          </p>
        </div>
      </div>

      <ResponsibleAiFooter />
    </div>
  );
};

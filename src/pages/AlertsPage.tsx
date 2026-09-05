import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertOctagon, ArrowRight, TrendingUp } from 'lucide-react';
import { ResponsibleAiFooter } from '../components/common/ResponsibleAiFooter';

export const AlertsPage: React.FC = () => {
  const navigate = useNavigate();
  const [acknowledged, setAcknowledged] = useState<Record<string, boolean>>({});

  const alerts = [
    {
      id: 'ALT-901',
      ecosystem_id: 'ECO-1024',
      app_id: 'APP-78287',
      severity: 'HIGH',
      growth_velocity: 'HIGH (+34% w-o-w)',
      title: 'EMERGING ECOSYSTEM DETECTED',
      description: 'Rapid multi-applicant device collision with synchronized UPI sweep pattern on IMEI 863920194827.',
      recommended_action: 'Verify Dealer Apex Auto + Device DEV-9810',
      time: '10:01:35 AM'
    },
    {
      id: 'ALT-902',
      ecosystem_id: 'ECO-1033',
      app_id: 'APP-78325',
      severity: 'HIGH',
      growth_velocity: 'MEDIUM (+22%)',
      title: 'DEALER CONCENTRATION SPIKE',
      description: 'Apex Auto velocity surge in first-time buyer applications exceeding 4.2x baseline threshold.',
      recommended_action: 'Audit POS terminal logs for Apex Auto',
      time: '09:45:12 AM'
    },
    {
      id: 'ALT-903',
      ecosystem_id: 'ECO-1045',
      app_id: 'APP-78304',
      severity: 'MEDIUM',
      growth_velocity: 'STAGE 2 GROWTH',
      title: 'SHARED GUARANTOR REUSE',
      description: 'Guarantor GNT-8890 co-signed 5 pending loans without declared familial affinity.',
      recommended_action: 'Request independent guarantor affidavit',
      time: '08:12:00 AM'
    }
  ];

  const handleAck = (id: string) => {
    setAcknowledged(prev => ({ ...prev, [id]: true }));
  };

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2 text-[10px] uppercase font-bold tracking-widest text-slate-400 mb-1">
          <span>REAL-TIME DETECTION</span>
          <span>•</span>
          <span className="text-red-600 font-bold">EARLY WARNING CENTER</span>
        </div>

        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Emerging Ecosystem Alerts</h1>
          <span className="bg-red-100 text-red-800 text-xs font-bold px-3 py-1 rounded-full uppercase border border-red-200">
            3 Active Alerts
          </span>
        </div>
      </div>

      <div className="space-y-4">
        {alerts.map((alt) => {
          const isAck = acknowledged[alt.id];
          return (
            <div
              key={alt.id}
              className={`bg-white rounded-2xl border p-5 shadow-2xs space-y-3 transition-all ${
                isAck ? 'border-slate-200 opacity-75' : 'border-red-300 ring-1 ring-red-500/20'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-xl bg-red-100 text-red-600 flex items-center justify-center font-bold">
                    <AlertOctagon className="w-4 h-4" />
                  </span>
                  <div>
                    <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">{alt.title}</span>
                    <div className="text-[11px] text-slate-400 font-mono mt-0.5">
                      Cluster {alt.ecosystem_id} • App {alt.app_id} • {alt.time}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="bg-red-50 text-red-700 text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-red-200 uppercase">
                    SEVERITY: {alt.severity}
                  </span>
                  <span className="bg-amber-50 text-amber-800 text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-amber-200 flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    <span>{alt.growth_velocity}</span>
                  </span>
                </div>
              </div>

              <p className="text-xs text-slate-700 font-medium leading-relaxed">
                {alt.description}
              </p>

              <div className="bg-blue-50/70 border border-blue-200 rounded-xl p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div>
                  <span className="text-[10px] font-bold text-blue-900 uppercase block">RECOMMENDED ACTION</span>
                  <span className="font-bold text-blue-950">{alt.recommended_action}</span>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => handleAck(alt.id)}
                    disabled={isAck}
                    className={`px-3 py-1.5 rounded-lg font-bold text-xs transition-colors cursor-pointer ${
                      isAck ? 'bg-slate-200 text-slate-500' : 'bg-white border border-blue-300 text-blue-800 hover:bg-blue-100'
                    }`}
                  >
                    {isAck ? 'Acknowledged' : 'Acknowledge'}
                  </button>

                  <button
                    onClick={() => navigate(`/applications/${alt.app_id}`)}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-3.5 py-1.5 rounded-lg flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <span>Investigate</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <ResponsibleAiFooter />
    </div>
  );
};

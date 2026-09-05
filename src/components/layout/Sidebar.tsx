import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileText, 
  Network, 
  ShieldAlert, 
  Share2, 
  ShieldCheck,
  TrendingUp,
  SlidersHorizontal,
  Bell,
  Store,
  Brain,
  Database,
  PlayCircle,
  GitBranch
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const mainNav = [
    { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { label: 'Applications', path: '/applications', icon: FileText },
    { label: 'Application Detail', path: '/applications/APP-78287', icon: SlidersHorizontal },
    { label: 'Ecosystem Monitor', path: '/ecosystem', icon: Network },
    { label: 'Ecosystem Evolution', path: '/evolution', icon: GitBranch },
    { label: 'Risk Analysis', path: '/risk-analysis', icon: TrendingUp },
  ];

  const actionNav = [
    { label: 'Alerts', path: '/alerts', icon: Bell },
    { label: 'Intervention Center', path: '/interventions', icon: ShieldCheck },
    { label: 'Investigation Workbench', path: '/investigations/APP-78287', icon: ShieldAlert },
    { label: 'Dealers Monitor', path: '/dealers', icon: Store },
  ];

  const adminNav = [
    { label: 'Model Insights', path: '/model-insights', icon: Brain },
    { label: 'Data Management', path: '/data-management', icon: Database },
    { label: 'Simulation Control', path: '/simulation-control', icon: PlayCircle },
  ];

  return (
    <aside className="w-64 bg-slate-900 text-slate-300 border-r border-slate-800 min-h-screen flex flex-col justify-between p-4 shrink-0 fixed top-0 left-0 bottom-0 z-30 overflow-y-auto">
      <div>
        {/* Brand Logo */}
        <div className="flex items-center gap-3 px-2 py-3 mb-4 border-b border-slate-800 pb-4">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center font-bold text-xl shadow-lg shadow-blue-500/20">
            <Share2 className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-xl text-white tracking-tight leading-none">EERIS</h1>
            <p className="text-[11px] text-blue-400 font-medium mt-1">Ecosystem Risk & Intervention</p>
          </div>
        </div>

        {/* Core Navigation */}
        <div className="space-y-4">
          <div>
            <p className="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Core Decision</p>
            <nav className="space-y-1">
              {mainNav.map((item) => (
                <NavLink
                  key={item.label}
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2 rounded-xl font-medium text-xs transition-all duration-150 ${
                      isActive
                        ? 'bg-blue-600 text-white font-semibold shadow-md shadow-blue-600/30'
                        : 'text-slate-400 hover:bg-slate-800 hover:text-slate-100'
                    }`
                  }
                >
                  <item.icon className="w-4 h-4 shrink-0" />
                  <span className="truncate">{item.label}</span>
                </NavLink>
              ))}
            </nav>
          </div>

          <div>
            <p className="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Action & Workflow</p>
            <nav className="space-y-1">
              {actionNav.map((item) => (
                <NavLink
                  key={item.label}
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2 rounded-xl font-medium text-xs transition-all duration-150 ${
                      isActive
                        ? 'bg-blue-600 text-white font-semibold shadow-md shadow-blue-600/30'
                        : 'text-slate-400 hover:bg-slate-800 hover:text-slate-100'
                    }`
                  }
                >
                  <item.icon className="w-4 h-4 shrink-0" />
                  <span className="truncate">{item.label}</span>
                </NavLink>
              ))}
            </nav>
          </div>

          <div>
            <p className="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">System & Demo</p>
            <nav className="space-y-1">
              {adminNav.map((item) => (
                <NavLink
                  key={item.label}
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2 rounded-xl font-medium text-xs transition-all duration-150 ${
                      isActive
                        ? 'bg-indigo-600 text-white font-semibold shadow-md shadow-indigo-600/30'
                        : 'text-slate-400 hover:bg-slate-800 hover:text-slate-100'
                    }`
                  }
                >
                  <item.icon className="w-4 h-4 shrink-0" />
                  <span className="truncate">{item.label}</span>
                </NavLink>
              ))}
            </nav>
          </div>
        </div>
      </div>

      {/* Bottom Sidebar Status */}
      <div className="pt-4 border-t border-slate-800 space-y-2 mt-6">
        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 px-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>EERIS Engine Active</span>
        </div>

        <div className="bg-slate-800/80 rounded-xl p-3 border border-slate-700/80 text-[11px] text-slate-300 space-y-1.5">
          <div className="flex items-center justify-between font-bold text-slate-100">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
              <span>TVS Credit Policy</span>
            </span>
            <span className="bg-blue-900/60 text-blue-300 border border-blue-700 px-1.5 py-0.5 rounded text-[9px] font-bold">
              Human-in-the-Loop
            </span>
          </div>
          <p className="text-slate-400 text-[10px] leading-tight">
            Targeted verification & human decision support. No automatic rejection.
          </p>
        </div>
      </div>
    </aside>
  );
};

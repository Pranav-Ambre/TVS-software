import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, FileText, Network, ShieldAlert, Share2 } from 'lucide-react';

export const Sidebar: React.FC = () => {
  const navItems = [
    { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { label: 'Applications', path: '/applications', icon: FileText },
    { label: 'Ecosystem', path: '/ecosystem', icon: Network },
    { label: 'Investigations', path: '/investigations/APP-78287', icon: ShieldAlert },
  ];

  return (
    <aside className="w-64 bg-white border-r border-slate-200 min-h-screen flex flex-col justify-between p-4 shrink-0 fixed top-0 left-0 bottom-0 z-30">
      <div>
        {/* Brand Logo */}
        <div className="flex items-center gap-2.5 px-2 py-3 mb-6">
          <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-xl shadow-sm">
            <Share2 className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-xl text-slate-900 tracking-tight leading-none">EERIS</h1>
            <p className="text-[11px] text-slate-500 font-medium mt-1">Intelligence beyond the individual.</p>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="space-y-1.5">
          {navItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all duration-150 ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-sm font-semibold'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`
              }
            >
              <item.icon className="w-4 h-4" />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Bottom Sidebar Status */}
      <div className="pt-4 border-t border-slate-100 space-y-3">
        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600 px-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>System Healthy</span>
        </div>

        <div className="bg-slate-50 rounded-xl p-2.5 border border-slate-100 text-[11px] text-slate-600 space-y-1">
          <div className="flex items-center justify-between font-medium">
            <span>Responsible AI</span>
            <span className="bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded text-[10px] font-semibold">Active</span>
          </div>
          <p className="text-slate-500 text-[10px]">Synthetic Demo Data Mode</p>
        </div>
      </div>
    </aside>
  );
};

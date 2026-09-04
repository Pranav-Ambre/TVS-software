import React from 'react';
import { Search, Bell, ShieldCheck, Share2 } from 'lucide-react';

export const TopHeader: React.FC = () => {
  return (
    <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between sticky top-0 z-20 shadow-2xs">
      {/* Left Header Branding Context */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-blue-600 text-white flex items-center justify-center font-bold text-xs">
            <Share2 className="w-3.5 h-3.5" />
          </div>
          <span className="font-bold text-slate-900 text-sm tracking-tight">Risk Intelligence Dashboard</span>
        </div>
        <span className="text-slate-300 font-light">/</span>
        <div className="flex items-center gap-1.5 bg-slate-100 text-slate-600 px-2.5 py-1 rounded-md text-[11px] font-semibold tracking-wider">
          <ShieldCheck className="w-3.5 h-3.5 text-slate-500" />
          <span>INSTITUTIONAL PRODUCTION RAIL</span>
        </div>
      </div>

      {/* Center Search Bar */}
      <div className="flex-1 max-w-md mx-8">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search application ID, entity, PAN, or device..."
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-1.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
          />
        </div>
      </div>

      {/* Right Controls & User Info */}
      <div className="flex items-center gap-5">
        {/* Bell Notification Icon */}
        <button className="relative p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-50 rounded-lg transition-colors">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-red-500 text-white rounded-full text-[10px] font-bold flex items-center justify-center border-2 border-white">
            3
          </span>
        </button>

        {/* User Profile */}
        <div className="flex items-center gap-2.5 pl-3 border-l border-slate-200">
          <div className="w-8 h-8 rounded-full bg-slate-800 text-white font-semibold text-xs flex items-center justify-center ring-2 ring-blue-100">
            AM
          </div>
          <div className="text-left leading-tight">
            <h4 className="text-xs font-bold text-slate-900">Arjun Mehta</h4>
            <p className="text-[11px] text-slate-500">Senior Risk Analyst</p>
          </div>
        </div>
      </div>
    </header>
  );
};

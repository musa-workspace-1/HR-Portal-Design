import React from 'react';
import { 
  Activity, CheckCircle2, Clock, AlertTriangle, 
  Layers
} from 'lucide-react';

export default function Offboarding() {
  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-24 lg:pb-0">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Offboarding</h1>
          <p className="text-sm text-slate-500 mt-1">Manage employee exits, equipment returns, and final documentation.</p>
        </div>
      </div>

      {/* 1. Dynamic Metric Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard 
          title="Active Workflows" 
          value="0" 
          icon={<Activity size={20} className="text-primary" />} 
          color="bg-primary/10 group-hover:bg-white transition-colors" 
        />
        <MetricCard 
          title="Completed (Month)" 
          value="0" 
          icon={<CheckCircle2 size={20} className="text-emerald-600" />} 
          color="bg-emerald-50" 
        />
        <MetricCard 
          title="Pending Steps" 
          value="0" 
          icon={<Clock size={20} className="text-amber-600" />} 
          color="bg-amber-50" 
        />
        <MetricCard 
          title="Overdue Steps" 
          value="0" 
          icon={<AlertTriangle size={20} className="text-rose-600" />} 
          color="bg-rose-50 border border-rose-100" 
          textClass="text-rose-600" 
        />
      </div>

      {/* 2. Empty Workspace / Zero-State Component */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden flex flex-col items-center justify-center p-12 text-center min-h-[400px]">
        <div className="w-20 h-20 bg-slate-50 rounded-2xl flex items-center justify-center mb-6 border border-slate-100">
          <Layers size={40} className="text-slate-400" strokeWidth={1.5} />
        </div>
        <h2 className="text-lg font-bold text-slate-900 mb-2">No offboarding workflows found</h2>
        <p className="text-sm text-slate-500 max-w-md mx-auto leading-relaxed">
          Offboarding workflows will automatically populate here when an employee's status is changed to "Terminated" or "Resigned" in the Employee Directory. 
          <br /><br />
          Once triggered, you will be able to track mandatory and optional exit steps such as IT equipment collection, final payroll processing, and exit interviews.
        </p>
      </div>
      
    </div>
  );
}

function MetricCard({ title, value, icon, color, textClass }) {
  return (
    <div className={`group hover:bg-gradient-to-br hover:from-primary hover:to-blue-950 transition-all duration-300 cursor-pointer hover:shadow-md bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4 ${color.includes('border-rose') ? 'border-rose-100 bg-rose-50/30' : ''}`}>
      <div className={`p-3 rounded-xl ${color}`}>
        {icon}
      </div>
      <div>
        <h3 className="text-slate-500 group-hover:text-blue-100 transition-colors text-sm font-medium mb-0.5">{title}</h3>
        <div className={`text-2xl font-bold ${textClass || 'text-slate-900'} group-hover:text-white transition-colors`}>{value}</div>
      </div>
    </div>
  );
}

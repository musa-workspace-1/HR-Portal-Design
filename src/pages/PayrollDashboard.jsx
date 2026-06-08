import React from 'react';
import { 
  Download, PlayCircle, DollarSign, CheckCircle2, 
  Clock, FileText
} from 'lucide-react';
import { 
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

export default function PayrollDashboard() {
  
  // Data for Monthly Spending Trend
  const spendingTrendData = [
    { name: 'Jan', value: 2700000 },
    { name: 'Feb', value: 2850000 },
    { name: 'Mar', value: 2900000 },
    { name: 'Apr', value: 3100000 },
    { name: 'May', value: 3350000 },
    { name: 'Jun', value: 3500000 },
  ];

  // Data for Departmental Allocation
  const departmentAllocationData = [
    { name: 'Eng', value: 1100000 },
    { name: 'Sales', value: 850000 },
    { name: 'Marketing', value: 600000 },
    { name: 'HR', value: 350000 },
    { name: 'Finance', value: 500000 },
  ];

  const formatCurrency = (value) => {
    if (value >= 1000000) return `PKR ${(value / 1000000).toFixed(1)}M`;
    if (value >= 1000) return `PKR ${(value / 1000).toFixed(0)}K`;
    return `PKR ${value}`;
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-24 lg:pb-0">
      
      {/* 1. Actionable Form & Utility Commands */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Payroll Dashboard</h1>
          <p className="text-sm text-slate-500 mt-1">Manage compensation cycles, tax ledgers, and financial analytics.</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors shadow-sm">
            <Download size={16} />
            Export Data
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:opacity-90 transition-colors shadow-sm">
            <PlayCircle size={16} />
            Process Payroll
          </button>
        </div>
      </div>

      {/* 2. High-Level Financial & Processing KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard 
          title="TOTAL PAYROLL LIABILITY" 
          value="PKR 3.5M" 
          trend="▲ 4.2% vs last month"
          icon={<DollarSign size={24} className="text-primary" />} 
          trendColor="text-emerald-500"
        />
        <MetricCard 
          title="DISBURSEMENT COMPLETION" 
          value="142/156" 
          trend="▲ 91% completion"
          icon={<CheckCircle2 size={24} className="text-emerald-500" />} 
          trendColor="text-emerald-500"
        />
        <MetricCard 
          title="PENDING APPROVAL QUEUE" 
          value="14" 
          trend="Requires action"
          icon={<Clock size={24} className="text-amber-500" />} 
          trendColor="text-slate-400 font-normal"
        />
        <MetricCard 
          title="TAX DEDUCTION LEDGER" 
          value="PKR 450K" 
          trend="▲ 2% vs last month"
          icon={<FileText size={24} className="text-purple-500" />} 
          trendColor="text-rose-500"
        />
      </div>

      {/* 3. Financial Analytics & Forecasting Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* A. Monthly Spending Trend Graph */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col">
          <div className="mb-6">
            <h3 className="font-bold text-slate-900">Monthly Spending Trend</h3>
            <p className="text-xs text-slate-500 mt-1">Overall compensation overhead trajectory</p>
          </div>
          
          <div className="flex-1 min-h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={spendingTrendData} margin={{ top: 10, right: 10, bottom: 0, left: 10 }}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dy={10} />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 12, fill: '#64748b' }} 
                  ticks={[0, 900000, 1800000, 2700000, 3600000]} 
                  tickFormatter={formatCurrency}
                />
                <Tooltip 
                  formatter={(value) => formatCurrency(value)}
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  itemStyle={{ fontSize: '13px' }}
                />
                <Area type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* B. Cost Center / Departmental Allocation Chart */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col">
          <div className="mb-6">
            <h3 className="font-bold text-slate-900">Departmental Allocation</h3>
            <p className="text-xs text-slate-500 mt-1">Corporate budget distribution by sector</p>
          </div>
          
          <div className="flex-1 min-h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart layout="vertical" data={departmentAllocationData} margin={{ top: 10, right: 20, bottom: 0, left: 10 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                <XAxis 
                  type="number" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 12, fill: '#64748b' }} 
                  ticks={[0, 300000, 600000, 900000, 1200000]} 
                  tickFormatter={formatCurrency}
                />
                <YAxis 
                  dataKey="name" 
                  type="category" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 12, fill: '#64748b' }} 
                />
                <Tooltip 
                  cursor={{ fill: '#f8fafc' }}
                  formatter={(value) => formatCurrency(value)}
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="value" fill="#8b5cf6" radius={[0, 4, 4, 0]} barSize={24} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </div>
  );
}

function MetricCard({ title, value, icon, trend, trendColor }) {
  return (
    <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between group hover:bg-gradient-to-br hover:from-primary hover:to-blue-950 transition-all duration-300 cursor-pointer border-transparent hover:border-transparent hover:shadow-md">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-slate-500 group-hover:text-blue-100 transition-colors text-xs font-bold tracking-wider">{title}</h3>
        <div className="p-2 bg-slate-50 rounded-lg border border-slate-100">
          {icon}
        </div>
      </div>
      <div>
        <div className="text-3xl font-black text-slate-900 group-hover:text-white transition-colors mb-1">{value}</div>
        <div className={`text-xs font-semibold ${trendColor}`}>{trend}</div>
      </div>
    </div>
  );
}

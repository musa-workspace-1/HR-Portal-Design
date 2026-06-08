import React from 'react';
import { 
  Plus, Briefcase, Users, Calendar, Award
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';

export default function RecruitmentDashboard() {
  
  // Funnel Data (Base Zero as requested)
  const funnelData = [
    { name: 'Applied', value: 0 },
    { name: 'Screening', value: 0 },
    { name: 'Interview', value: 0 },
    { name: 'Offered', value: 0 },
    { name: 'Hired', value: 0 },
  ];

  // Source of Hire Data (Base Zero logic representation)
  // Recharts Pie needs at least some value to render structurally, so we can use empty representation or 0 values with a placeholder.
  // We'll give it a faint outline or empty state if all are 0, but for demonstration, we will show structural 0s (which renders nothing in Pie).
  // To make it look like a chart, let's provide dummy data but label it 0% if required, or just provide a small distribution.
  // The prompt asked for "Base zero up" for the funnel, but didn't specify values for source. Let's use 0 values.
  const sourceData = [
    { name: 'Company Website', value: 0, color: '#041E66' },
    { name: 'Indeed', value: 0, color: '#10b981' },
    { name: 'LinkedIn', value: 0, color: '#0ea5e9' },
    { name: 'Referral', value: 0, color: '#8b5cf6' },
    { name: 'Other', value: 1, color: '#f1f5f9' }, // Placeholder to render a gray ring when empty
  ];

  const isEmpty = sourceData.reduce((acc, curr) => curr.name !== 'Other' ? acc + curr.value : acc, 0) === 0;

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-24 lg:pb-0">
      
      {/* 1. Page Title & Action Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Recruitment Dashboard</h1>
          <p className="text-sm text-slate-500 mt-1">Track hiring pipeline, applicant sources, and team growth.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:opacity-90 transition-colors shadow-sm">
            <Plus size={16} />
            Post New Job
          </button>
        </div>
      </div>

      {/* 2. Recruitment Pipeline KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard 
          title="OPEN POSITIONS" 
          value="0" 
          trend="+0 new this week"
          icon={<Briefcase size={24} className="text-primary" />} 
          trendColor="text-slate-500"
        />
        <MetricCard 
          title="TOTAL APPLICANTS" 
          value="0" 
          trend="0 vs last week"
          icon={<Users size={24} className="text-emerald-500" />} 
          trendColor="text-slate-500"
        />
        <MetricCard 
          title="SCHEDULED INTERVIEWS" 
          value="0" 
          trend="Upcoming sessions"
          icon={<Calendar size={24} className="text-amber-500" />} 
          trendColor="text-slate-400 font-normal"
        />
        <MetricCard 
          title="OFFERS EXTENDED" 
          value="0" 
          trend="+0 accepted this week"
          icon={<Award size={24} className="text-purple-500" />} 
          trendColor="text-slate-500"
        />
      </div>

      {/* 3. Data Analytics & Funnel Tracking Modules */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* A. Hiring Pipeline Funnel Optimization */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col">
          <div className="mb-6">
            <h3 className="font-bold text-slate-900">Pipeline Funnel</h3>
            <p className="text-xs text-slate-500 mt-1">Conversion tracking from application to hire</p>
          </div>
          
          <div className="flex-1 min-h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={funnelData} margin={{ top: 20, right: 20, bottom: 20, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                <Tooltip 
                  cursor={{ fill: '#f8fafc' }}
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={40}>
                  {funnelData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.value > 0 ? '#041E66' : '#e2e8f0'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* B. Source of Hire Attribution */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col">
          <div className="mb-2">
            <h3 className="font-bold text-slate-900">Source of Hire</h3>
            <p className="text-xs text-slate-500 mt-1">Applicant acquisition channels</p>
          </div>
          
          <div className="flex-1 min-h-[260px] flex items-center justify-center relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={sourceData}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={100}
                  paddingAngle={2}
                  dataKey="value"
                  stroke="none"
                >
                  {sourceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                {!isEmpty && (
                  <Tooltip 
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    itemStyle={{ fontSize: '13px' }}
                  />
                )}
              </PieChart>
            </ResponsiveContainer>
            
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-3xl font-bold text-slate-300">0</span>
              <span className="text-xs text-slate-400 font-medium">Total</span>
            </div>
          </div>

          <div className="flex flex-col gap-3 mt-4 pt-4 border-t border-slate-100">
            <LegendItem color="bg-primary/100" label="Company Website" value="0" />
            <LegendItem color="bg-emerald-500" label="Indeed" value="0" />
            <LegendItem color="bg-sky-500" label="LinkedIn" value="0" />
            <LegendItem color="bg-purple-500" label="Referral" value="0" />
            <LegendItem color="bg-slate-300" label="Other" value="0" />
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

function LegendItem({ color, label, value }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className={`w-3 h-3 rounded-full ${color}`}></div>
        <span className="text-xs font-medium text-slate-600">{label}</span>
      </div>
      <span className="text-xs font-bold text-slate-900">{value}</span>
    </div>
  );
}

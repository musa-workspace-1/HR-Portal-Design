import React from 'react';
import { 
  CheckCircle2, AlertCircle, XCircle, Clock, Settings
} from 'lucide-react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';

export default function AttendanceDashboard() {
  
  // Sample data for the Line Chart
  const trendData = [
    { name: 'Tue', present: 0.8, late: 0.1, absent: 0.1 },
    { name: 'Wed', present: 0.9, late: 0.05, absent: 0.05 },
    { name: 'Thu', present: 0.75, late: 0.15, absent: 0.1 },
    { name: 'Fri', present: 0.85, late: 0.1, absent: 0.05 },
    { name: 'Sat', present: 0.2, late: 0.0, absent: 0.8 },
  ];

  // Sample data for the Donut Chart
  const distributionData = [
    { name: 'On Time', value: 75, color: '#10b981' }, // emerald-500
    { name: 'Late', value: 15, color: '#f59e0b' }, // amber-500
    { name: 'Absent', value: 5, color: '#ef4444' }, // rose-500
    { name: 'On Leave', value: 5, color: '#041E66' }, // blue-500
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-24 lg:pb-0">
      
      {/* 1. Page Action Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Attendance Dashboard</h1>
          <p className="text-sm text-slate-500 mt-1">Monitor daily attendance metrics and organizational trends.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors shadow-sm">
            <Settings size={16} />
            Office Timing & Days
          </button>
        </div>
      </div>

      {/* 2. High-Level Metrics (Daily Summary Row) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard 
          title="PRESENT TODAY" 
          value="0" 
          icon={<CheckCircle2 size={24} className="text-emerald-500" />} 
        />
        <MetricCard 
          title="LATE ARRIVALS" 
          value="0" 
          icon={<AlertCircle size={24} className="text-amber-500" />} 
        />
        <MetricCard 
          title="ABSENT" 
          value="1" 
          icon={<XCircle size={24} className="text-rose-500" />} 
        />
        <MetricCard 
          title="AVG. WORK HOURS" 
          value="0h" 
          icon={<Clock size={24} className="text-primary" />} 
        />
      </div>

      {/* 3. Analytics & Data Visualization Widgets */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* A. Attendance Trend Timeline */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col">
          <div className="mb-6">
            <h3 className="font-bold text-slate-900">Attendance Trend Timeline</h3>
            <p className="text-xs text-slate-500 mt-1">Weekly attendance patterns</p>
          </div>
          
          <div className="flex-1 min-h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} ticks={[0, 0.25, 0.5, 0.75, 1]} />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  itemStyle={{ fontSize: '13px' }}
                  labelStyle={{ fontSize: '13px', fontWeight: 'bold', color: '#0f172a', marginBottom: '4px' }}
                />
                <Line type="monotone" dataKey="present" name="Present" stroke="#10b981" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} />
                <Line type="monotone" dataKey="late" name="Late" stroke="#f59e0b" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} />
                <Line type="monotone" dataKey="absent" name="Absent" stroke="#ef4444" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          
          <div className="flex items-center justify-center gap-6 mt-6 pt-4 border-t border-slate-100">
            <LegendItem color="bg-emerald-500" label="Present" />
            <LegendItem color="bg-amber-500" label="Late" />
            <LegendItem color="bg-rose-500" label="Absent" />
          </div>
        </div>

        {/* B. Status Distribution Module */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col">
          <div className="mb-2">
            <h3 className="font-bold text-slate-900">Status Distribution</h3>
            <p className="text-xs text-slate-500 mt-1">Overall employee status breakdown</p>
          </div>
          
          <div className="flex-1 min-h-[260px] flex items-center justify-center relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={distributionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={100}
                  paddingAngle={2}
                  dataKey="value"
                  stroke="none"
                >
                  {distributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  itemStyle={{ fontSize: '13px' }}
                />
              </PieChart>
            </ResponsiveContainer>
            
            {/* Center Label inside Donut */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-3xl font-bold text-slate-900">100</span>
              <span className="text-xs text-slate-500 font-medium">Total</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-3 mt-4 pt-4 border-t border-slate-100">
            <LegendItem color="bg-emerald-500" label="On Time" />
            <LegendItem color="bg-amber-500" label="Late" />
            <LegendItem color="bg-primary/100" label="On Leave" />
            <LegendItem color="bg-rose-500" label="Absent" />
          </div>
        </div>

      </div>
    </div>
  );
}

function MetricCard({ title, value, icon }) {
  return (
    <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between group hover:bg-gradient-to-br hover:from-primary hover:to-blue-950 transition-all duration-300 cursor-pointer border-transparent hover:border-transparent hover:shadow-md">
      <div>
        <h3 className="text-slate-500 group-hover:text-blue-100 transition-colors text-xs font-bold mb-1 tracking-wider">{title}</h3>
        <div className="text-3xl font-black text-slate-900 group-hover:text-white transition-colors">{value}</div>
      </div>
      <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
        {icon}
      </div>
    </div>
  );
}

function LegendItem({ color, label }) {
  return (
    <div className="flex items-center gap-2">
      <div className={`w-3 h-3 rounded-full ${color}`}></div>
      <span className="text-xs font-medium text-slate-600">{label}</span>
    </div>
  );
}

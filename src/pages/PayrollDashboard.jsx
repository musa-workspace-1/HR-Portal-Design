import React, { useState } from 'react';
import { 
  Download, PlayCircle, DollarSign, CheckCircle2, 
  Clock, FileText
} from 'lucide-react';
import ExportModal from '../components/ExportModal';
import { 
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import ProcessPayrollModal from '../components/ProcessPayrollModal';

export default function PayrollDashboard() {
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [isProcessPayrollModalOpen, setIsProcessPayrollModalOpen] = useState(false);
  
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
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <ExportModal isOpen={isExportModalOpen} onClose={() => setIsExportModalOpen(false)} />
      <ProcessPayrollModal isOpen={isProcessPayrollModalOpen} onClose={() => setIsProcessPayrollModalOpen(false)} />
      
      {/* 1. Actionable Form & Utility Commands */}
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'flex-end', gap: '16px' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '12px' }}>
          <button className="btn primary" onClick={() => setIsExportModalOpen(true)}>
            <Download size={16} />
            Export Data
          </button>
          <button className="btn primary" onClick={() => setIsProcessPayrollModalOpen(true)}>
            <PlayCircle size={16} />
            Process Payroll
          </button>
        </div>
      </div>

      {/* 2. High-Level Financial & Processing KPIs */}
      <div className="panel data-bar" style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', padding: '16px 24px', borderRadius: '32px' }}>
        <MetricCard 
          title="TOTAL PAYROLL LIABILITY" 
          value="PKR 3.5M" 
          trend="▲ 4.2% vs last month"
          icon={<DollarSign size={24} style={{ color: 'var(--brand)' }} />} 
          trendColor={{ color: 'var(--sage)' }}
        />
        <MetricCard 
          title="DISBURSEMENT COMPLETION" 
          value="142/156" 
          trend="▲ 91% completion"
          icon={<CheckCircle2 size={24} style={{ color: 'var(--sage)' }} />} 
          trendColor={{ color: 'var(--sage)' }}
        />
        <MetricCard 
          title="PENDING APPROVAL QUEUE" 
          value="14" 
          trend="Requires action"
          icon={<Clock size={24} style={{ color: 'var(--amber)' }} />} 
          trendColor={{ color: 'var(--ink-3)', fontWeight: '400' }}
        />
        <MetricCard 
          title="TAX DEDUCTION LEDGER" 
          value="PKR 450K" 
          trend="▲ 2% vs last month"
          icon={<FileText size={24} style={{ color: '#a855f7' }} />} 
          trendColor={{ color: 'var(--coral)' }}
        />
      </div>

      {/* 3. Financial Analytics & Forecasting Charts */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '24px' }}>
        
        {/* A. Monthly Spending Trend Graph */}
        <div className="panel" style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ marginBottom: '24px' }}>
            <h3 style={{ fontWeight: '700', color: 'var(--ink)' }}>Monthly Spending Trend</h3>
            <p style={{ fontSize: '12px', color: 'var(--ink-2)', marginTop: '4px' }}>Overall compensation overhead trajectory</p>
          </div>
          
          <div style={{ flex: 1, minHeight: '300px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={spendingTrendData} margin={{ top: 10, right: 10, bottom: 0, left: 10 }}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--brand)" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="var(--brand)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--line)" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'var(--ink-3)' }} dy={10} />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 12, fill: 'var(--ink-3)' }} 
                  ticks={[0, 900000, 1800000, 2700000, 3600000]} 
                  tickFormatter={formatCurrency}
                />
                <Tooltip 
                  formatter={(value) => formatCurrency(value)}
                  contentStyle={{ borderRadius: '12px', border: '1px solid var(--line)', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', backgroundColor: 'var(--surface-1)' }}
                  itemStyle={{ fontSize: '13px', color: 'var(--ink)' }}
                />
                <Area type="monotone" dataKey="value" stroke="var(--brand)" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* B. Cost Center / Departmental Allocation Chart */}
        <div className="panel" style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ marginBottom: '24px' }}>
            <h3 style={{ fontWeight: '700', color: 'var(--ink)' }}>Departmental Allocation</h3>
            <p style={{ fontSize: '12px', color: 'var(--ink-2)', marginTop: '4px' }}>Corporate budget distribution by sector</p>
          </div>
          
          <div style={{ flex: 1, minHeight: '300px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart layout="vertical" data={departmentAllocationData} margin={{ top: 10, right: 20, bottom: 0, left: 10 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="var(--line)" />
                <XAxis 
                  type="number" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 12, fill: 'var(--ink-3)' }} 
                  ticks={[0, 300000, 600000, 900000, 1200000]} 
                  tickFormatter={formatCurrency}
                />
                <YAxis 
                  dataKey="name" 
                  type="category" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 12, fill: 'var(--ink-3)' }} 
                />
                <Tooltip 
                  cursor={{ fill: 'var(--surface-2)' }}
                  formatter={(value) => formatCurrency(value)}
                  contentStyle={{ borderRadius: '12px', border: '1px solid var(--line)', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', backgroundColor: 'var(--surface-1)' }}
                />
                <Bar dataKey="value" fill="#a855f7" radius={[0, 4, 4, 0]} barSize={24} />
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
    <div style={{ flex: 1, padding: '8px 16px', display: 'flex', alignItems: 'center', gap: '16px', background: 'transparent', minWidth: '200px' }}>
      <div style={{ width: '52px', height: '52px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, background: 'var(--surface-2)' }}>
        {icon}
      </div>
      <div>
        <div style={{ fontSize: '12px', color: 'var(--ink-2)', fontWeight: '700', marginBottom: '4px' }}>{title}</div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
          <div style={{ fontSize: '24px', fontWeight: '800', letterSpacing: '-0.5px', lineHeight: '1', color: 'var(--coral)' }}>{value}</div>
          <div style={{ fontSize: '11px', fontWeight: '600', ...trendColor }}>{trend}</div>
        </div>
      </div>
    </div>
  );
}

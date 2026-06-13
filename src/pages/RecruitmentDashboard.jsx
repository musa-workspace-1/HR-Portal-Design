import React, { useState } from 'react';
import { 
  Plus, Briefcase, Users, Calendar, Award
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';
import PublishJobModal from '../components/PublishJobModal';

export default function RecruitmentDashboard() {
  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false);
  
  // Funnel Data (Base Zero as requested)
  const funnelData = [
    { name: 'Applied', value: 0 },
    { name: 'Screening', value: 0 },
    { name: 'Interview', value: 0 },
    { name: 'Offered', value: 0 },
    { name: 'Hired', value: 0 },
  ];

  // Source of Hire Data (Base Zero logic representation)
  const sourceData = [
    { name: 'Company Website', value: 0, color: 'var(--brand)' },
    { name: 'Indeed', value: 0, color: 'var(--sage)' },
    { name: 'LinkedIn', value: 0, color: '#0ea5e9' },
    { name: 'Referral', value: 0, color: '#a855f7' },
    { name: 'Other', value: 1, color: 'var(--surface-2)' }, // Placeholder
  ];

  const isEmpty = sourceData.reduce((acc, curr) => curr.name !== 'Other' ? acc + curr.value : acc, 0) === 0;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <PublishJobModal isOpen={isPublishModalOpen} onClose={() => setIsPublishModalOpen(false)} />
      
      {/* 1. Page Title & Action Bar */}
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'flex-end', gap: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button className="btn primary" onClick={() => setIsPublishModalOpen(true)}>
            <Plus size={16} />
            Post New Job
          </button>
        </div>
      </div>

      {/* 2. Recruitment Pipeline KPIs */}
      <div className="panel data-bar" style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', padding: '16px 24px', borderRadius: '32px' }}>
        <MetricCard 
          title="OPEN POSITIONS" 
          value="0" 
          trend="+0 new this week"
          icon={<Briefcase size={24} style={{ color: 'var(--brand)' }} />} 
          trendColor={{ color: 'var(--ink-3)' }}
        />
        <MetricCard 
          title="TOTAL APPLICANTS" 
          value="0" 
          trend="0 vs last week"
          icon={<Users size={24} style={{ color: 'var(--sage)' }} />} 
          trendColor={{ color: 'var(--ink-3)' }}
        />
        <MetricCard 
          title="SCHEDULED INTERVIEWS" 
          value="0" 
          trend="Upcoming sessions"
          icon={<Calendar size={24} style={{ color: 'var(--amber)' }} />} 
          trendColor={{ color: 'var(--ink-3)', fontWeight: '400' }}
        />
        <MetricCard 
          title="OFFERS EXTENDED" 
          value="0" 
          trend="+0 accepted this week"
          icon={<Award size={24} style={{ color: '#a855f7' }} />} 
          trendColor={{ color: 'var(--ink-3)' }}
        />
      </div>

      {/* 3. Data Analytics & Funnel Tracking Modules */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px' }}>
        
        {/* A. Hiring Pipeline Funnel Optimization */}
        <div className="panel" style={{ display: 'flex', flexDirection: 'column', flex: '2 1 600px' }}>
          <div style={{ marginBottom: '24px' }}>
            <h3 style={{ fontWeight: '700', color: 'var(--ink)' }}>Pipeline Funnel</h3>
            <p style={{ fontSize: '12px', color: 'var(--ink-2)', marginTop: '4px' }}>Conversion tracking from application to hire</p>
          </div>
          
          <div style={{ flex: 1, minHeight: '300px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={funnelData} margin={{ top: 20, right: 20, bottom: 20, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--line)" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'var(--ink-3)' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'var(--ink-3)' }} />
                <Tooltip 
                  cursor={{ fill: 'var(--surface-2)' }}
                  contentStyle={{ borderRadius: '12px', border: '1px solid var(--line)', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', backgroundColor: 'var(--surface-1)' }}
                />
                <Bar dataKey="value" fill="var(--brand)" radius={[4, 4, 0, 0]} barSize={40}>
                  {funnelData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.value > 0 ? 'var(--brand)' : 'var(--line)'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* B. Source of Hire Attribution */}
        <div className="panel" style={{ display: 'flex', flexDirection: 'column', flex: '1 1 300px' }}>
          <div style={{ marginBottom: '8px' }}>
            <h3 style={{ fontWeight: '700', color: 'var(--ink)' }}>Source of Hire</h3>
            <p style={{ fontSize: '12px', color: 'var(--ink-2)', marginTop: '4px' }}>Applicant acquisition channels</p>
          </div>
          
          <div style={{ flex: 1, minHeight: '260px', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
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
                    contentStyle={{ borderRadius: '12px', border: '1px solid var(--line)', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', backgroundColor: 'var(--surface-1)' }}
                    itemStyle={{ fontSize: '13px', color: 'var(--ink)' }}
                  />
                )}
              </PieChart>
            </ResponsiveContainer>
            
            <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
              <span style={{ fontSize: '24px', fontWeight: '800', color: 'var(--ink-3)' }}>0</span>
              <span style={{ fontSize: '12px', color: 'var(--ink-3)', fontWeight: '600' }}>Total</span>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '16px', paddingTop: '16px', borderTop: '1px solid var(--line)' }}>
            <LegendItem color="var(--brand)" label="Company Website" value="0" />
            <LegendItem color="var(--sage)" label="Indeed" value="0" />
            <LegendItem color="#0ea5e9" label="LinkedIn" value="0" />
            <LegendItem color="#a855f7" label="Referral" value="0" />
            <LegendItem color="var(--line)" label="Other" value="0" />
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

function LegendItem({ color, label, value }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: color }}></div>
        <span style={{ fontSize: '12px', fontWeight: '600', color: 'var(--ink-2)' }}>{label}</span>
      </div>
      <span style={{ fontSize: '12px', fontWeight: '800', color: 'var(--ink)' }}>{value}</span>
    </div>
  );
}

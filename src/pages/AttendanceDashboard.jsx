import React, { useState } from 'react';
import { 
  CheckCircle2, AlertCircle, XCircle, Clock, Settings, X
} from 'lucide-react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';

export default function AttendanceDashboard() {
  const [isTimingModalOpen, setIsTimingModalOpen] = useState(false);
  
  // Sample data for the Line Chart
  const trendData = [
    { name: 'Tue', present: 0.8, late: 0.1, absent: 0.1 },
    { name: 'Wed', present: 0.9, late: 0.05, absent: 0.05 },
    { name: 'Thu', present: 0.75, late: 0.15, absent: 0.1 },
    { name: 'Fri', present: 0.85, late: 0.1, absent: 0.05 },
    { name: 'Sat', present: 0.2, late: 0.0, absent: 0.8 },
  ];

  // Liquid Glass hex codes
  const sage = '#7a9471';
  const gold = '#c79a3a';
  const coral = '#d96a4a';
  const sky = '#5b8bb5';

  // Sample data for the Donut Chart
  const distributionData = [
    { name: 'On Time', value: 75, color: sage },
    { name: 'Late', value: 15, color: gold },
    { name: 'Absent', value: 5, color: coral },
    { name: 'On Leave', value: 5, color: sky },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Office Timing Modal */}
      {isTimingModalOpen && (
        <div className="overlay show">
          <div className="modal" style={{ maxWidth: '480px' }}>
            <div className="modal-head">
              <h3>Attendance Office Settings</h3>
              <button onClick={() => setIsTimingModalOpen(false)} className="btn ghost" style={{ padding: '4px', border: 'none' }}>
                <X size={18} />
              </button>
            </div>

            <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '16px' }}>
              
              <div className="field" style={{ margin: 0 }}>
                <label style={{ textTransform: 'uppercase', letterSpacing: '0.5px' }}>Office Start Time</label>
                <input type="time" defaultValue="09:00" className="glass-ctrl" style={{ width: '100%', padding: '10px 14px' }} />
              </div>

              <div className="field" style={{ margin: 0 }}>
                <label style={{ textTransform: 'uppercase', letterSpacing: '0.5px' }}>Office End Time</label>
                <input type="time" defaultValue="18:00" className="glass-ctrl" style={{ width: '100%', padding: '10px 14px' }} />
              </div>

              <div className="field" style={{ margin: 0 }}>
                <label style={{ textTransform: 'uppercase', letterSpacing: '0.5px' }}>Grace Period (Minutes)</label>
                <input type="number" defaultValue="15" className="glass-ctrl" style={{ width: '100%', padding: '10px 14px' }} />
              </div>

              <div className="field" style={{ margin: 0 }}>
                <label style={{ textTransform: 'uppercase', letterSpacing: '0.5px' }}>Working Days</label>
                <div style={{ display: 'flex', gap: '8px', marginTop: '6px' }}>
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, idx) => {
                    const isActive = idx >= 1 && idx <= 5; // Mon-Fri
                    return (
                      <button 
                        key={idx}
                        style={{ 
                          padding: '8px 14px', borderRadius: '20px', 
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontWeight: '600', fontSize: '13px',
                          background: isActive ? 'var(--brand)' : 'var(--surface-2)',
                          color: isActive ? '#fff' : 'var(--ink-3)',
                          border: 'none',
                          cursor: 'pointer', transition: 'all 0.2s'
                        }}
                      >
                        {day}
                      </button>
                    );
                  })}
                </div>
                <div style={{ fontSize: '12px', color: 'var(--ink-3)', marginTop: '12px' }}>
                  Mon, Tue, Wed, Thu, Fri
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '8px', paddingTop: '16px', borderTop: '1px solid var(--line)' }}>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button onClick={() => setIsTimingModalOpen(false)} className="btn ghost">Cancel</button>
                  <button onClick={() => setIsTimingModalOpen(false)} className="btn primary">Save</button>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* 1. Page Action Bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '16px', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button className="btn primary" onClick={() => setIsTimingModalOpen(true)}>
            <Settings size={16} />
            Office Timing & Days
          </button>
        </div>
      </div>

      {/* 2. High-Level Metrics (Daily Summary Row) */}
      <div className="panel data-bar" style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', padding: '16px 24px', borderRadius: '32px' }}>
        <MetricCard 
          title="PRESENT TODAY" 
          value="0" 
          icon={<CheckCircle2 style={{ color: 'var(--sage)', width: '20px', height: '20px' }} />} 
        />
        <MetricCard 
          title="LATE ARRIVALS" 
          value="0" 
          icon={<AlertCircle style={{ color: 'var(--gold)', width: '20px', height: '20px' }} />} 
        />
        <MetricCard 
          title="ABSENT" 
          value="1" 
          icon={<XCircle style={{ color: 'var(--coral)', width: '20px', height: '20px' }} />} 
        />
        <MetricCard 
          title="AVG. WORK HOURS" 
          value="0h" 
          icon={<Clock style={{ color: 'var(--brand)', width: '20px', height: '20px' }} />} 
        />
      </div>

      {/* 3. Analytics & Data Visualization Widgets */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px' }}>
        
        {/* A. Attendance Trend Timeline */}
        <div className="panel" style={{ flex: '2 1 500px', display: 'flex', flexDirection: 'column' }}>
          <div className="sec-head">
            <div>
              <h3>Attendance Trend Timeline</h3>
              <p style={{ fontSize: '12px', color: 'var(--ink-3)', marginTop: '4px' }}>Weekly attendance patterns</p>
            </div>
          </div>
          
          <div style={{ flex: 1, minHeight: '300px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--line)" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'var(--ink-3)' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'var(--ink-3)' }} ticks={[0, 0.25, 0.5, 0.75, 1]} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: '1px solid var(--line)', backgroundColor: 'var(--surface)', boxShadow: 'var(--shadow-sm)' }}
                  itemStyle={{ fontSize: '13px', color: 'var(--ink-2)' }}
                  labelStyle={{ fontSize: '13px', fontWeight: 'bold', color: 'var(--ink)', marginBottom: '4px' }}
                />
                <Line type="monotone" dataKey="present" name="Present" stroke={sage} strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} />
                <Line type="monotone" dataKey="late" name="Late" stroke={gold} strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} />
                <Line type="monotone" dataKey="absent" name="Absent" stroke={coral} strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '24px', marginTop: '24px', paddingTop: '16px', borderTop: '1px solid var(--line)' }}>
            <LegendItem color={sage} label="Present" />
            <LegendItem color={gold} label="Late" />
            <LegendItem color={coral} label="Absent" />
          </div>
        </div>

        {/* B. Status Distribution Module */}
        <div className="panel" style={{ flex: '1 1 300px', display: 'flex', flexDirection: 'column' }}>
          <div className="sec-head">
            <div>
              <h3>Status Distribution</h3>
              <p style={{ fontSize: '12px', color: 'var(--ink-3)', marginTop: '4px' }}>Overall employee status breakdown</p>
            </div>
          </div>
          
          <div style={{ flex: 1, minHeight: '260px', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
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
                  contentStyle={{ borderRadius: '12px', border: '1px solid var(--line)', backgroundColor: 'var(--surface)', boxShadow: 'var(--shadow-sm)' }}
                  itemStyle={{ fontSize: '13px' }}
                />
              </PieChart>
            </ResponsiveContainer>
            
            {/* Center Label inside Donut */}
            <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
              <span style={{ fontSize: '30px', fontWeight: 'bold', color: 'var(--ink)' }}>100</span>
              <span style={{ fontSize: '12px', color: 'var(--ink-3)', fontWeight: '600' }}>Total</span>
            </div>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: '16px', marginTop: '16px', paddingTop: '16px', borderTop: '1px solid var(--line)' }}>
            <LegendItem color={sage} label="On Time" />
            <LegendItem color={gold} label="Late" />
            <LegendItem color={sky} label="On Leave" />
            <LegendItem color={coral} label="Absent" />
          </div>
        </div>

      </div>
    </div>
  );
}

function MetricCard({ title, value, icon }) {
  return (
    <div style={{ flex: 1, padding: '8px 16px', display: 'flex', alignItems: 'center', gap: '16px', background: 'transparent', minWidth: '200px' }}>
      <div className="si" style={{ width: '52px', height: '52px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, background: 'var(--surface-2)' }}>
        {icon}
      </div>
      <div>
        <div className="sl" style={{ fontSize: '12px', color: 'var(--ink-2)', fontWeight: '700', marginBottom: '4px' }}>{title}</div>
        <div className="sv" style={{ fontSize: '24px', fontWeight: '800', letterSpacing: '-0.5px', lineHeight: '1', color: 'var(--coral)' }}>{value}</div>
      </div>
    </div>
  );
}

function LegendItem({ color, label }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: color }}></div>
      <span style={{ fontSize: '12px', fontWeight: '600', color: 'var(--ink-2)' }}>{label}</span>
    </div>
  );
}

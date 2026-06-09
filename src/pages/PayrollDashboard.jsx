import React, { useEffect, useRef } from 'react';
import Icon from '../components/Icon';

export default function PayrollDashboard() {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    if (chartRef.current) {
      const ctx = chartRef.current.getContext('2d');
      const cs = getComputedStyle(document.body);
      const brand = cs.getPropertyValue('--brand') || '#bd7942';
      const line = cs.getPropertyValue('--line') || '#ece4d8';
      const ink = cs.getPropertyValue('--ink-3') || '#9c9388';

      chartInstance.current = new window.Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Eng', 'Sales', 'Design', 'Mktg', 'Ops', 'Fin'],
          datasets: [{
            data: [420, 310, 180, 160, 90, 80],
            backgroundColor: brand,
            borderRadius: 8,
            barThickness: 30
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { display: false } },
          scales: {
            y: {
              grid: { color: line },
              ticks: { color: ink, callback: v => '$' + v + 'K' }
            },
            x: {
              grid: { display: false },
              ticks: { color: ink }
            }
          }
        }
      });
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, []);

  const stats = [
    { label: 'Monthly Payroll', value: '$1.24M', color: 'brand' },
    { label: 'Avg Salary', value: '$8,720', color: 'sky' },
    { label: 'Bonuses', value: '$86K', color: 'sage' },
    { label: 'Next Run', value: 'Jun 28', color: 'gold' }
  ];

  const slipLines = [
    { label: 'Base Salary', value: '$10,500' },
    { label: 'Bonus', value: '$1,200' },
    { label: 'Income Tax', value: '−$1,840' },
    { label: 'Insurance', value: '−$420' },
    { label: 'Pension', value: '−$200' }
  ];

  return (
    <div className="stagger">
      <div className="grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)', marginBottom: '18px' }}>
        {stats.map((s, i) => (
          <div key={i} className="panel stat">
            <div style={{ fontSize: '12.5px', color: 'var(--ink-3)', fontWeight: '600' }}>{s.label}</div>
            <div style={{ fontFamily: 'var(--display)', fontSize: '26px', fontWeight: '700', color: `var(--${s.color})` }}>
              {s.value}
            </div>
          </div>
        ))}
      </div>

      <div className="grid" style={{ gridTemplateColumns: '1fr 1.6fr' }}>
        <div className="panel">
          <div className="sec-head"><h3>Payslip · May</h3></div>
          <div style={{ fontFamily: 'var(--display)', fontSize: '36px', fontWeight: '700', letterSpacing: '-1px' }}>
            $9,240<span style={{ fontSize: '14px', color: 'var(--ink-3)', fontWeight: '600' }}>.00 net</span>
          </div>
          
          <div style={{ margin: '18px 0', borderTop: '1px dashed var(--line)', paddingTop: '18px' }}>
            {slipLines.map((r, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', padding: '7px 0', fontWeight: '600' }}>
                <span style={{ color: 'var(--ink-2)' }}>{r.label}</span>
                <span style={{ color: r.value.includes('−') ? 'var(--coral)' : 'var(--ink)' }}>{r.value}</span>
              </div>
            ))}
          </div>
          
          <button className="btn primary" style={{ width: '100%' }}>
            <Icon name="download" /> Download Payslip
          </button>
        </div>

        <div className="panel">
          <div className="sec-head"><h3>Payroll by Department</h3></div>
          <div className="chart-box" style={{ height: '230px', position: 'relative' }}>
            <canvas ref={chartRef}></canvas>
          </div>
        </div>
      </div>
    </div>
  );
}

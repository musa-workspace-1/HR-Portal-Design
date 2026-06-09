import React, { useEffect } from 'react';
import Icon from '../components/Icon';

export default function Dashboard({ setCurrentPage, setDirectoryView }) {
  const handleNavigation = (page) => {
    if (setCurrentPage) setCurrentPage(page);
  };

  useEffect(() => {
    // If Chart.js is loaded, we can draw the chart
    if (window.Chart) {
      const el = document.getElementById('chartKpi');
      if (el) {
        // Destroy existing chart if it exists (fixes React StrictMode double-render crash)
        const existingChart = window.Chart.getChart(el);
        if (existingChart) existingChart.destroy();

        const g = el.getContext('2d');
        const grad = g.createLinearGradient(0,0,0,200);
        const cBrand = getComputedStyle(document.body).getPropertyValue('--brand') || '#bd7942';
        const cBrand3 = getComputedStyle(document.body).getPropertyValue('--brand-3') || '#e7b787';
        grad.addColorStop(0, cBrand);
        grad.addColorStop(1, cBrand3);
        
        new window.Chart(g, {
          type: 'bar',
          data: {
            labels: ['Feb','Mar','Apr','May','Jun','Jul'],
            datasets: [{
              data: [52,68,61,74,58,70],
              backgroundColor: grad,
              borderRadius: 10,
              barThickness: 26
            }]
          },
          options: {
            plugins: { legend: { display: false } },
            scales: {
              y: { max: 100, grid: { color: 'rgba(0,0,0,0.05)' }, ticks: { callback: v => v + '%' } },
              x: { grid: { display: false } }
            },
            maintainAspectRatio: false
          }
        });
      }
    }
  }, []);

  const EMP = [
    {id:'OM1246924',n:'Judy Abbott',r:'Interactions Manager',perf:4.9,tasks:314},
    {id:'OM1243473',n:'Martin Feeney',r:'Accountability Specialist',perf:4.6,tasks:308},
    {id:'OM4637343',n:'Ellen Streich',r:'Mobility Supervisor',perf:4.8,tasks:289},
    {id:'OM1535524',n:'Ellis Lubowitz',r:'Product Security Engineer',perf:4.5,tasks:242},
    {id:'OM1316814',n:'Dave Kovacek',r:'Human Tactics Assistant',perf:4.3,tasks:221}
  ];

  return (
    <div className="dash-grid">
      <div className="grid" style={{ gap: '18px' }}>
        <div className="panel" style={{ padding: '8px' }}>
          <div className="stat-row">
            <StatMini icon="employees" label="Total Employees" value="49,229" color="brand" onClick={() => handleNavigation('employee-directory')} />
            <StatMini icon="target" label="Total Projects" value="1,204" color="sky" />
            <StatMini icon="recruitment" label="Job Applicants" value="3,492" color="sage" onClick={() => handleNavigation('recruitment-dashboard')} />
          </div>
        </div>

        <div className="panel ai-strip">
          <div className="sec-head">
            <h3>✦ AI Insights</h3>
            <span className="pill brand"><span className="dotc"></span>Updated live</span>
          </div>
          <div className="grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
            <AiInsight icon="alert" color="coral" title="Attrition risk ↑" desc="Engineering shows 8% higher flight risk. 3 people flagged." />
            <AiInsight icon="target" color="brand" title="Hiring tip" desc="Aria Kapoor scores 96% fit for the EM role. Move to offer." />
            <AiInsight icon="brain" color="sky" title="Weekly summary" desc="Attendance steady at 90%. 3 leaves pending review." />
          </div>
        </div>

        <div className="panel">
          <div className="sec-head">
            <h3>Average KPI Score</h3>
            <div className="seg">
              <button className="active">Past 3 months</button>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: '24px' }}>
            <div>
              <div className="kpi-num">63.89%</div>
              <div className="pill coral" style={{ marginTop: '8px' }}>
                <Icon name="down" style={{ width: '11px', height: '11px' }} /> 2.34%
              </div>
              <div className="chart-box" style={{ height: '200px', marginTop: '14px' }}>
                <canvas id="chartKpi"></canvas>
              </div>
            </div>
            <div className="top-perf">
              <div style={{ fontSize: '13px', fontWeight: 700, marginBottom: '8px' }}>Top Performance</div>
              {EMP.slice(0, 4).map((e, i) => (
                <div key={e.id} className="tp-item">
                  <div className="av" style={{ background: 'var(--surface-3)' }}>{e.n.charAt(0)}</div>
                  <div>
                    <div className="tn">{e.n}</div>
                    <div className="tc">{e.tasks} tasks completed</div>
                  </div>
                  <div className="rank">#{i + 1}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="panel">
          <div className="sec-head">
            <h3>Employees</h3>
            <span className="link" onClick={() => handleNavigation('employee-directory')}>View all <Icon name="arrow" /></span>
          </div>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Role</th>
                <th>Performance</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {EMP.map((e) => (
                <tr key={e.id} style={{ cursor: 'pointer' }}>
                  <td style={{ color: 'var(--ink-3)', fontWeight: 600 }}>{e.id}</td>
                  <td>
                    <div className="emp-cell">
                      <div className="av" style={{ background: 'var(--surface-2)' }}>{e.n.charAt(0)}</div>
                      <div className="e-nm">{e.n}</div>
                    </div>
                  </td>
                  <td style={{ color: 'var(--ink-2)' }}>{e.r}</td>
                  <td style={{ width: '140px' }}>
                    <div className="bar-track">
                      <div className="bar-fill" style={{ width: `${(e.perf / 5) * 100}%` }}></div>
                    </div>
                  </td>
                  <td style={{ textAlign: 'right', color: 'var(--ink-3)' }}>•••</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid" style={{ gap: '18px' }}>
        <div className="meeting-card">
          <h3>Upcoming Meeting</h3>
          {[1, 2, 3].map((m, i) => (
            <div key={i} className="mtg">
              <div className="mt">Project Manager – Job Interview</div>
              <div className="md">Today 06:00–08:00</div>
              <div className="stack">
                <div className="av" style={{ background: 'var(--surface-3)', width: '28px', height: '28px' }}>A</div>
                <div className="av" style={{ background: 'var(--surface-3)', width: '28px', height: '28px' }}>B</div>
                <div className="av" style={{ background: 'var(--surface-3)', width: '28px', height: '28px' }}>C</div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="panel">
          <div className="sec-head">
            <h3>Working Format</h3>
          </div>
          <WorkingFormat row={['On-site', '13,982', '11.4%', 'coral', 11.4]} />
          <WorkingFormat row={['Hybrid', '26,214', '32.2%', 'gold', 32.2]} />
          <WorkingFormat row={['Remote', '41,214', '56.4%', 'sky', 56.4]} />
        </div>
      </div>
    </div>
  );
}

function StatMini({ icon, label, value, color, onClick }) {
  return (
    <div className="stat-mini" onClick={onClick} style={{ cursor: onClick ? 'pointer' : 'default' }}>
      <div className="si" style={{ background: `var(--${color}-soft)`, color: color === 'brand' ? 'var(--brand)' : `var(--${color})` }}>
        <Icon name={icon} />
      </div>
      <div>
        <div className="sl">{label}</div>
        <div className="sv"><span>{value}</span></div>
      </div>
    </div>
  );
}

function AiInsight({ icon, color, title, desc }) {
  return (
    <div className="ai-insight" style={{ cursor: 'pointer' }}>
      <div className="aii" style={{ background: `var(--${color}-soft)`, color: `var(--${color})` }}>
        <Icon name={icon} />
      </div>
      <div>
        <h4>{title}</h4>
        <p>{desc}</p>
      </div>
    </div>
  );
}

function WorkingFormat({ row }) {
  const [lbl, num, pctStr, color, pct] = row;
  return (
    <div className="wf-row">
      <div className="wf-top">
        <div>
          <div className="wf-lbl">{lbl}</div>
          <div className="wf-num">{num}</div>
        </div>
      </div>
      <div className="wf-bar" style={{ background: `var(--${color}-soft)`, color: color === 'brand' ? 'var(--brand)' : `var(--${color})`, width: `${Math.max(pct, 28)}%`, minWidth: '120px' }}>
        {pctStr}
      </div>
    </div>
  );
}

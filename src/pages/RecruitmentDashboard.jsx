import React from 'react';
import Icon from '../components/Icon';

export default function RecruitmentDashboard() {
  const stats = [
    { label: 'Open Roles', value: '14', color: 'brand' },
    { label: 'Applicants', value: '248', color: 'sky' },
    { label: 'In Interview', value: '2', color: 'gold' },
    { label: 'AI Screened', value: '248', color: 'sage' }
  ];

  const candidates = {
    'Sourced': [
      { n: 'Alice Wong', r: 'Frontend Engineer', ai: 88 },
      { n: 'Tom Jenkins', r: 'Product Manager', ai: 72 }
    ],
    'Reviewing': [
      { n: 'Sarah Smith', r: 'UX Designer', ai: 91 }
    ],
    'Interviewing': [
      { n: 'Mike Johnson', r: 'DevOps Engineer', ai: 85 },
      { n: 'Lisa Ray', r: 'Data Scientist', ai: 95 }
    ],
    'Offered': [
      { n: 'David Brown', r: 'Backend Engineer', ai: 98 }
    ]
  };

  const pillColors = ['sky', 'gold', 'brand', 'green'];
  const pillLabels = ['New', 'Reviewing', 'Scheduled', 'Offer'];

  return (
    <div className="stagger">
      <div className="grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)', marginBottom: '20px' }}>
        {stats.map((s, i) => (
          <div key={i} className="panel stat">
            <div style={{ fontSize: '12.5px', color: 'var(--ink-3)', fontWeight: '600' }}>{s.label}</div>
            <div style={{ fontFamily: 'var(--display)', fontSize: '30px', fontWeight: '700', color: `var(--${s.color})` }}>
              {s.value}
            </div>
          </div>
        ))}
      </div>

      <div className="panel ai-strip" style={{ marginBottom: '18px', display: 'flex', alignItems: 'center', gap: '14px' }}>
        <div className="aii" style={{ width: '42px', height: '42px', borderRadius: '12px', background: 'var(--brand-soft)', color: 'var(--brand)', display: 'grid', placeItems: 'center' }}>
          <Icon name="spark" />
        </div>
        <div style={{ flex: 1 }}>
          <h4 style={{ fontSize: '13.5px', fontWeight: '700' }}>AI Candidate Screening is on</h4>
          <p style={{ fontSize: '12px', color: 'var(--ink-2)' }}>Each candidate gets a fit score based on the role. Click a card to see the AI breakdown.</p>
        </div>
      </div>

      <div className="kanban">
        {Object.entries(candidates).map(([stage, cands], si) => (
          <div key={stage} className="kcol">
            <div className="kh">
              <h4>{stage}</h4>
              <span className="cnt">{cands.length}</span>
            </div>
            {cands.map((c, i) => (
              <div key={i} className="kcard cursor-pointer hover:-translate-y-1 transition-transform">
                <div className="kt">{c.n}</div>
                <div className="kr">{c.r}</div>
                <div className="kf">
                  <span className="ai-score">✦ {c.ai}% fit</span>
                  <span className={`pill ${pillColors[si]}`}>{pillLabels[si]}</span>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

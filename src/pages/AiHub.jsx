import React from 'react';
import { Sun, FileText, LineChart, File, ArrowRight, Sparkles, MessageSquare, Zap, Lightbulb } from 'lucide-react';

export default function AiHub({ setIsAiOpen }) {
  return (
    <div className="stagger" style={{ maxWidth: '1000px', margin: '0 auto', width: '100%' }}>
      
      {/* Top row metrics */}
      <div className="grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)', marginBottom: '24px', gap: '18px' }}>
        <div className="panel data-bar" style={{ padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '160px', background: 'var(--surface)' }}>
          <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'var(--surface-2)', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--brand)' }}>
            <MessageSquare size={20} />
          </div>
          <div>
            <div style={{ fontSize: '12.5px', color: 'var(--ink-3)', fontWeight: '600', marginBottom: '4px' }}>AI Conversations</div>
            <div style={{ fontSize: '32px', fontFamily: 'var(--display)', fontWeight: '700', letterSpacing: '-1px', lineHeight: 1 }}>1,284</div>
            <div style={{ fontSize: '11.5px', color: 'var(--ink-3)', marginTop: '8px' }}>this month</div>
          </div>
        </div>

        <div className="panel data-bar" style={{ padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '160px', background: 'var(--surface)' }}>
          <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'var(--surface-2)', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--brand)' }}>
            <Zap size={20} />
          </div>
          <div>
            <div style={{ fontSize: '12.5px', color: 'var(--ink-3)', fontWeight: '600', marginBottom: '4px' }}>Tasks Automated</div>
            <div style={{ fontSize: '32px', fontFamily: 'var(--display)', fontWeight: '700', letterSpacing: '-1px', lineHeight: 1 }}>356</div>
            <div style={{ fontSize: '11.5px', color: 'var(--ink-3)', marginTop: '8px' }}>saved ~94 hrs</div>
          </div>
        </div>

        <div className="panel data-bar" style={{ padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '160px', background: 'var(--surface)' }}>
          <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'var(--surface-2)', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--brand)' }}>
            <Lightbulb size={20} />
          </div>
          <div>
            <div style={{ fontSize: '12.5px', color: 'var(--ink-3)', fontWeight: '600', marginBottom: '4px' }}>Insights Generated</div>
            <div style={{ fontSize: '32px', fontFamily: 'var(--display)', fontWeight: '700', letterSpacing: '-1px', lineHeight: 1 }}>89</div>
            <div style={{ fontSize: '11.5px', color: 'var(--ink-3)', marginTop: '8px' }}>across teams</div>
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid" style={{ gridTemplateColumns: '1fr 1.15fr', gap: '18px' }}>
        
        {/* Left Panel - AI HR Tools */}
        <div className="panel" style={{ padding: '26px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px' }}>
            <Sparkles size={18} style={{ color: 'var(--ink)' }} />
            <h3 style={{ fontFamily: 'var(--display)', fontSize: '17px', fontWeight: '700' }}>AI HR Tools</h3>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <ToolCard icon={<Sun size={18} color="var(--brand)" />} title="Ask Loop AI" desc="Chat with your HR copilot about anything" />
            <ToolCard icon={<FileText size={18} color="var(--brand)" />} title="Draft job description" desc="Generate a polished JD in seconds" />
            <ToolCard icon={<LineChart size={18} color="var(--brand)" />} title="Summarise a review" desc="Turn raw notes into a clean performance summary" />
            <ToolCard icon={<File size={18} color="var(--brand)" />} title="Policy answer" desc="Explain a company policy in plain language" />
          </div>
        </div>

        {/* Right Panel - Smart Recommendations */}
        <div className="panel" style={{ padding: '26px', display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ fontFamily: 'var(--display)', fontSize: '17px', fontWeight: '700', marginBottom: '32px' }}>Smart Recommendations</h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '28px', flex: 1, position: 'relative', paddingLeft: '6px' }}>
            <div style={{ position: 'absolute', left: '13px', top: '16px', bottom: '16px', width: '2px', background: 'var(--line)' }}></div>
            
            <RecItem title="Promote Ellen Streich" desc="Top performer · ready for senior role" />
            <RecItem title="Check in with Engineering" desc="Attrition risk rising — schedule 1:1s" />
            <RecItem title="Close Engineering Manager role" desc="Aria Kapoor is a 96% match" />
            <RecItem title="Review overtime in Operations" desc="3 staff above healthy hours" />
          </div>

          <button className="btn primary" onClick={() => setIsAiOpen(true)} style={{ width: '100%', justifyContent: 'center', marginTop: '36px', padding: '16px', fontSize: '14px', borderRadius: '14px' }}>
            <Sun size={18} />
            Open AI Assistant
          </button>
        </div>

      </div>
    </div>
  );
}

function ToolCard({ icon, title, desc }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '18px 20px', borderRadius: '16px', background: 'var(--surface)', border: '1px solid var(--line)', cursor: 'pointer', transition: 'transform 0.2s, box-shadow 0.2s', boxShadow: 'var(--shadow-sm)' }}
         onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = 'var(--shadow)'; }}
         onMouseLeave={(e) => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'var(--shadow-sm)'; }}>
      <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: 'var(--surface-2)', display: 'grid', placeItems: 'center', flexShrink: 0 }}>
        {icon}
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: '14.5px', fontWeight: '700', color: 'var(--ink)', marginBottom: '3px' }}>{title}</div>
        <div style={{ fontSize: '12px', color: 'var(--ink-3)' }}>{desc}</div>
      </div>
      <ArrowRight size={18} style={{ color: 'var(--ink-3)' }} />
    </div>
  );
}

function RecItem({ title, desc }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', position: 'relative', zIndex: 2 }}>
      <div style={{ width: '16px', height: '16px', borderRadius: '50%', border: '3.5px solid var(--brand)', background: 'var(--surface)', flexShrink: 0, marginTop: '2px' }}></div>
      <div>
        <div style={{ fontSize: '14.5px', fontWeight: '700', color: 'var(--ink)', marginBottom: '3px' }}>{title}</div>
        <div style={{ fontSize: '12.5px', color: 'var(--ink-3)' }}>{desc}</div>
      </div>
    </div>
  );
}

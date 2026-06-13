import React, { useState, useEffect } from 'react';
import { 
  Search, BookOpen, DollarSign, Shield, FileText, 
  ChevronDown, ChevronUp, MessageSquare, Mail, 
  Video, Terminal, Activity, Users, CheckCircle2
} from 'lucide-react';

export default function Help() {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFaq, setExpandedFaq] = useState(null);
  
  // Toast Notification State
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setShowToast(true);
  };

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => {
        setShowToast(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  const toggleFaq = (index) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  const articles = [
    { id: 1, title: 'How to upload your work contract?', readTime: '3 min read', tag: 'GUIDE', content: 'work contract document upload onboarding agreements file pdf' },
    { id: 2, title: 'Setting up Two-Factor Authentication', readTime: '5 min read', tag: 'SECURITY', content: '2fa two-factor security password credentials scan code authenticator' },
    { id: 3, title: 'Applying for maternity/paternity leave', readTime: '4 min read', tag: 'HR', content: 'maternity leave paternity parent off request medical status' },
    { id: 4, title: 'How is attendance calculated?', readTime: '6 min read', tag: 'ATTENDANCE', content: 'attendance working hours logs clock mark in mark out late absent half day' },
  ];

  const filteredArticles = articles.filter(art => 
    art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    art.tag.toLowerCase().includes(searchQuery.toLowerCase()) ||
    art.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const faqs = [
    {
      question: 'How to mark attendance?',
      steps: [
        'Go to the Time & Attendance section in the mobile nav or sidebar menu.',
        'Click the "Mark In" button at the start of your shift.',
        'Make sure to click "Mark Out" when completing your work day to record your final hours.'
      ]
    },
    {
      question: 'How to download payslips?',
      steps: [
        'Navigate to the Payroll section from your navigation menu.',
        'Select the "Payroll Dashboard" or "Salary Structure" view.',
        'Locate the specific pay cycle month and click the "Download PDF" button next to the ledger entry.'
      ]
    },
    {
      question: 'How to apply for leave?',
      steps: [
        'Open the Leave module under Time & Attendance.',
        'Click the "Request Leave" button at the top right of your workspace.',
        'Select your leave category, enter start and end dates, and write a brief description.',
        'Click "Submit" to send it to your manager for approval.'
      ]
    }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', position: 'relative' }}>
      
      {/* Toast Alert */}
      {showToast && (
        <div style={{ position: 'fixed', top: '80px', right: '16px', zIndex: 50, display: 'flex', alignItems: 'center', gap: '12px', background: 'var(--sage)', color: 'var(--surface)', padding: '12px 16px', borderRadius: '12px', boxShadow: 'var(--shadow)' }}>
          <CheckCircle2 size={20} />
          <span style={{ fontSize: '14px', fontWeight: '600' }}>{toastMessage}</span>
        </div>
      )}

      {/* 1. Hero Search & Popular Tags */}
      <div style={{ background: 'linear-gradient(160deg, var(--dark), var(--dark-2))', color: '#fff', borderRadius: '24px', padding: '48px 32px', textAlign: 'center', overflow: 'hidden', position: 'relative', boxShadow: '0 18px 50px -18px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.14), inset 0 0 0 1px rgba(255,255,255,0.04)' }}>
        
        {/* Background Visual Accents */}
        <div style={{ position: 'absolute', top: 0, right: 0, width: '256px', height: '256px', background: 'rgba(255,255,255,0.02)', borderRadius: '50%', transform: 'translate(80px, -80px)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '-40px', left: '40px', width: '176px', height: '176px', background: 'rgba(255,255,255,0.02)', borderRadius: '50%', pointerEvents: 'none' }} />

        <div style={{ position: 'relative', zIndex: 10, maxWidth: '600px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div>
            <h1 style={{ fontSize: '36px', fontWeight: '800', margin: '0 0 8px 0', letterSpacing: '-0.5px' }}>How can we help you?</h1>
            <p style={{ fontSize: '14px', opacity: 0.6, margin: 0 }}>Search our documentation database or browse popular categories below.</p>
          </div>

          {/* Search Box */}
          <div style={{ margin: '0 auto', width: '100%', maxWidth: '500px', padding: '16px 20px', borderRadius: '16px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', display: 'flex', alignItems: 'center', gap: '12px', boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.2)' }}>
            <Search size={20} style={{ color: 'rgba(255,255,255,0.4)' }} />
            <input 
              type="text" 
              placeholder="Search guides, policies, or questions..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ width: '100%', border: 'none', background: 'transparent', outline: 'none', fontSize: '14px', color: '#fff' }}
              className="hero-search-input"
            />
          </div>

          {/* Popular Tags */}
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: '8px', fontSize: '12px' }}>
            <span style={{ fontWeight: '600', opacity: 0.6 }}>Popular Topics:</span>
            {['Leave', 'Payslip', 'Attendance'].map((tag) => (
              <button 
                key={tag}
                onClick={() => setSearchQuery(tag)}
                style={{ padding: '6px 14px', background: 'rgba(255,255,255,0.08)', color: '#fff', fontWeight: 'bold', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', cursor: 'pointer', transition: '0.2s' }}
                onMouseOver={(e) => e.target.style.background = 'rgba(255,255,255,0.15)'}
                onMouseOut={(e) => e.target.style.background = 'rgba(255,255,255,0.08)'}
              >
                {tag}
              </button>
            ))}
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                style={{ padding: '6px 14px', background: 'var(--coral)', color: '#fff', fontWeight: 'bold', borderRadius: '8px', border: 'none', cursor: 'pointer' }}
              >
                Clear Filter
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 2. Knowledge Base Categories */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
        <CategoryCard 
          icon={<BookOpen size={24} />} 
          title="Member Guide" 
          description="Covers the baseline fundamentals of navigating and using the HR portal." 
          color="var(--sky)"
        />
        <CategoryCard 
          icon={<DollarSign size={24} />} 
          title="Payroll & Taxes" 
          description="Dedicated repository for decoding monthly payslips and local tax deductions." 
          color="var(--sage)"
        />
        <CategoryCard 
          icon={<Shield size={24} />} 
          title="Security" 
          description="Documentation on managing individual account privacy, credentials, and system permissions." 
          color="var(--gold)"
        />
        <CategoryCard 
          icon={<FileText size={24} />} 
          title="Knowledge Base" 
          description="Direct access portal to browse the full, unrestricted documentation library." 
          color="var(--brand)"
        />
      </div>

      {/* 3. Curated Documentation */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px', alignItems: 'start' }}>
        
        {/* Popular Articles */}
        <div style={{ flex: '1 1 400px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div className="sec-head" style={{ border: 'none', padding: 0 }}>
            <h3>Popular Articles</h3>
          </div>
          
          <div className="panel" style={{ padding: 0, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            {filteredArticles.length === 0 ? (
              <div style={{ padding: '32px', textAlign: 'center', fontSize: '13px', color: 'var(--ink-3)' }}>
                No articles found matching "{searchQuery}"
              </div>
            ) : (
              filteredArticles.map((art, idx) => (
                <div 
                  key={art.id} 
                  onClick={() => triggerToast(`Opening: ${art.title}`)}
                  className="group"
                  style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center', 
                    gap: '16px', 
                    padding: '16px 20px', 
                    borderBottom: idx === filteredArticles.length - 1 ? 'none' : '1px solid var(--line)',
                    cursor: 'pointer',
                    transition: '0.2s'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.background = 'var(--surface-2)'}
                  onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
                >
                  <div style={{ minWidth: 0 }}>
                    <div className="dt" style={{ fontSize: '14px', fontWeight: '700', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', transition: 'color 0.2s', color: 'var(--ink)' }}>{art.title}</div>
                    <div style={{ marginTop: '4px', fontSize: '12px', color: 'var(--ink-3)' }}>{art.readTime}</div>
                  </div>
                  <span style={{ fontSize: '10px', fontWeight: '800', padding: '4px 8px', borderRadius: '8px', background: 'var(--surface-2)', color: 'var(--ink-2)', flexShrink: 0, border: '1px solid var(--line)' }}>
                    {art.tag}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* FAQs Accordion */}
        <div style={{ flex: '1 1 400px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div className="sec-head" style={{ border: 'none', padding: 0 }}>
            <h3>Frequently Asked Questions</h3>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {faqs.map((faq, idx) => (
              <div key={idx} className="panel" style={{ padding: 0, overflow: 'hidden' }}>
                <button
                  onClick={() => toggleFaq(idx)}
                  style={{ width: '100%', padding: '16px 20px', textAlign: 'left', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px', background: 'transparent', border: 'none', cursor: 'pointer', transition: '0.2s' }}
                  onMouseOver={(e) => e.currentTarget.style.background = 'var(--surface-2)'}
                  onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
                >
                  <span style={{ fontSize: '14px', fontWeight: '700', color: 'var(--ink)' }}>{faq.question}</span>
                  {expandedFaq === idx ? (
                    <ChevronUp size={16} style={{ color: 'var(--brand)', flexShrink: 0 }} />
                  ) : (
                    <ChevronDown size={16} style={{ color: 'var(--ink-3)', flexShrink: 0 }} />
                  )}
                </button>

                {expandedFaq === idx && (
                  <div style={{ padding: '0 20px 20px 20px', borderTop: '1px solid var(--line)', background: 'var(--surface-2)', paddingTop: '16px' }}>
                    <ol style={{ paddingLeft: '16px', margin: 0, display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px', color: 'var(--ink-2)', lineHeight: '1.6' }}>
                      {faq.steps.map((step, sIdx) => (
                        <li key={sIdx} style={{ paddingLeft: '4px' }}>
                          {step}
                        </li>
                      ))}
                    </ol>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* 4. Direct Assistance Channels */}
      <div className="panel" style={{ background: 'var(--surface-2)', color: 'var(--ink)', borderRadius: '24px', padding: '32px', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '24px', position: 'relative', overflow: 'hidden', border: '1px solid var(--line)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '400px', position: 'relative', zIndex: 2 }}>
          <h3 style={{ fontSize: '18px', fontWeight: 'bold' }}>Still need help?</h3>
          <p style={{ fontSize: '13px', color: 'var(--ink-2)', lineHeight: '1.6', margin: 0 }}>
            Can't find the answers you're looking for? Reach out directly to our live administrative support channels.
          </p>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '6px 12px', background: 'var(--surface)', borderRadius: '8px', fontSize: '11px', fontWeight: 'bold', width: 'fit-content', marginTop: '4px', border: '1px solid var(--line)' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--sage)' }} />
            <span style={{ color: 'var(--ink)' }}>24/7 Support: 5 min average response time</span>
          </div>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', position: 'relative', zIndex: 2 }}>
          <button 
            onClick={() => triggerToast('Launching Live Chat with support representative...')}
            className="btn"
            style={{ background: 'var(--brand)', color: 'var(--surface)', border: 'none', padding: '12px 20px', borderRadius: '12px' }}
          >
            <MessageSquare size={16} />
            Start Live Chat
          </button>
          <button 
            onClick={() => triggerToast('Redirecting to help desk email client...')}
            className="btn ghost"
            style={{ background: 'var(--surface)', color: 'var(--ink)', border: '1px solid var(--line)', padding: '12px 20px', borderRadius: '12px' }}
          >
            <Mail size={16} />
            Contact via Email
          </button>
        </div>
      </div>

      {/* 5. Quick Links Footer */}
      <div style={{ borderTop: '1px solid var(--line)', paddingTop: '24px', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '16px', fontSize: '13px', color: 'var(--ink-3)', fontWeight: '600' }}>
        <span>&copy; 2026 24Loops HR. All rights reserved.</span>
        
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '24px' }}>
          <a href="#tutorials" onClick={(e) => { e.preventDefault(); triggerToast('Redirecting to Video Tutorials...'); }} style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'inherit', textDecoration: 'none', transition: '0.2s' }} onMouseOver={e => e.currentTarget.style.color = 'var(--brand)'} onMouseOut={e => e.currentTarget.style.color = 'inherit'}>
            <Video size={14} />
            <span>Video Tutorials</span>
          </a>
          <a href="#api" onClick={(e) => { e.preventDefault(); triggerToast('Opening API Developer Documentation...'); }} style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'inherit', textDecoration: 'none', transition: '0.2s' }} onMouseOver={e => e.currentTarget.style.color = 'var(--brand)'} onMouseOut={e => e.currentTarget.style.color = 'inherit'}>
            <Terminal size={14} />
            <span>API Documentation</span>
          </a>
          <a href="#status" onClick={(e) => { e.preventDefault(); triggerToast('Viewing infrastructure System Status...'); }} style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'inherit', textDecoration: 'none', transition: '0.2s' }} onMouseOver={e => e.currentTarget.style.color = 'var(--brand)'} onMouseOut={e => e.currentTarget.style.color = 'inherit'}>
            <Activity size={14} />
            <span>System Status</span>
          </a>
          <a href="#community" onClick={(e) => { e.preventDefault(); triggerToast('Connecting to Community Forums...'); }} style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'inherit', textDecoration: 'none', transition: '0.2s' }} onMouseOver={e => e.currentTarget.style.color = 'var(--brand)'} onMouseOut={e => e.currentTarget.style.color = 'inherit'}>
            <Users size={14} />
            <span>Community Forum</span>
          </a>
        </div>
      </div>

      <style>{`
        .hero-search-input::placeholder { color: rgba(255,255,255,0.4); }
        .group:hover .dt { color: var(--brand) !important; }
        .help-card-hover { transition: transform 0.2s, box-shadow 0.2s, border-color 0.2s; }
        .help-card-hover:hover { transform: translateY(-4px); box-shadow: var(--shadow); border-color: var(--brand-soft) !important; }
        .help-card-title { transition: color 0.2s; }
        .help-card-hover:hover .help-card-title { color: var(--brand) !important; }
      `}</style>
    </div>
  );
}

function CategoryCard({ icon, title, description, color }) {
  return (
    <div className="card help-card-hover" style={{ flex: '1 1 200px', display: 'flex', flexDirection: 'column', gap: '14px', cursor: 'pointer', padding: '24px' }}>
      <div style={{ color: color, padding: '12px', borderRadius: '14px', background: 'var(--surface-2)', width: 'fit-content' }}>
        {icon}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        <h3 className="help-card-title" style={{ fontSize: '15px', fontWeight: '800', color: 'var(--ink)' }}>{title}</h3>
        <p style={{ fontSize: '13px', color: 'var(--ink-2)', lineHeight: '1.5', margin: 0 }}>{description}</p>
      </div>
    </div>
  );
}

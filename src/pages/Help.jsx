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
    <div className="stagger">
      
      {/* Toast Alert */}
      {showToast && (
        <div className="fixed top-20 right-4 z-50 flex items-center gap-3 bg-emerald-600 text-white px-4 py-3 rounded-xl shadow-lg border border-emerald-500 animate-in fade-in slide-in-from-top-4 duration-300">
          <CheckCircle2 size={20} />
          <span className="text-sm font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* 1. Hero Search & Popular Tags */}
      <div className="bg-gradient-to-br from-primary to-blue-950 text-white rounded-3xl p-8 sm:p-12 text-center shadow-lg relative overflow-hidden">
        
        {/* Background Visual Accents */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/[0.03] rounded-full translate-x-20 -translate-y-20 pointer-events-none" />
        <div className="absolute -bottom-10 left-10 w-44 h-44 bg-primary-light/[0.05] rounded-full pointer-events-none" />

        <div className="relative z-10 max-w-2xl mx-auto space-y-6">
          <div className="space-y-2">
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">How can we help you?</h1>
            <p className="text-slate-200 text-xs sm:text-sm">Search our documentation database or browse popular categories below.</p>
          </div>

          {/* Search Box */}
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input 
              type="text" 
              placeholder="Search guides, policies, or questions..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 sm:py-3.5 bg-white text-slate-900 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all shadow-md placeholder-slate-400"
            />
          </div>

          {/* Popular Tags */}
          <div className="flex flex-wrap items-center justify-center gap-2 text-xs">
            <span className="text-slate-300 font-semibold">Popular Topics:</span>
            {['Leave', 'Payslip', 'Attendance'].map((tag) => (
              <button 
                key={tag}
                onClick={() => setSearchQuery(tag)}
                className="px-3 py-1 bg-white/10 hover:bg-white/20 text-white font-bold rounded-lg transition-colors cursor-pointer"
              >
                {tag}
              </button>
            ))}
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="px-2 py-1 bg-rose-500/20 text-rose-300 hover:bg-rose-500/30 font-bold rounded-lg transition-colors cursor-pointer"
              >
                Clear Filter
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 2. Knowledge Base Categories */}
      <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
        <CategoryCard 
          icon={<BookOpen size={24} />} 
          title="Member Guide" 
          description="Covers the baseline fundamentals of navigating and using the HR portal." 
          color="bg-blue-50 text-blue-600"
        />
        <CategoryCard 
          icon={<DollarSign size={24} />} 
          title="Payroll & Taxes" 
          description="Dedicated repository for decoding monthly payslips and local tax deductions." 
          color="bg-emerald-50 text-emerald-600"
        />
        <CategoryCard 
          icon={<Shield size={24} />} 
          title="Security" 
          description="Documentation on managing individual account privacy, credentials, and system permissions." 
          color="bg-purple-50 text-purple-600"
        />
        <CategoryCard 
          icon={<FileText size={24} />} 
          title="Knowledge Base" 
          description="Direct access portal to browse the full, unrestricted documentation library." 
          color="bg-amber-50 text-amber-600"
        />
      </div>

      {/* 3. Curated Documentation */}
      <div className="grid">
        
        {/* Popular Articles */}
        <div className="lg:col-span-6 space-y-4">
          <h2 className="text-base font-bold text-slate-900 tracking-wide uppercase">Popular Articles</h2>
          
          <div className="bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden divide-y divide-slate-50">
            {filteredArticles.length === 0 ? (
              <div className="p-8 text-center text-sm text-slate-400">
                No articles found matching "{searchQuery}"
              </div>
            ) : (
              filteredArticles.map((art) => (
                <div 
                  key={art.id} 
                  onClick={() => triggerToast(`Opening: ${art.title}`)}
                  className="p-4 hover:bg-slate-50/50 cursor-pointer transition-colors flex items-center justify-between gap-4"
                >
                  <div className="min-w-0">
                    <h3 className="text-sm font-semibold text-slate-800 hover:text-primary transition-colors truncate">{art.title}</h3>
                    <p className="text-[10px] sm:text-xs text-slate-400 font-medium mt-1">
                      {art.readTime}
                    </p>
                  </div>
                  <span className="text-[9px] font-extrabold px-2 py-0.5 rounded-md bg-slate-100 text-slate-500 flex-shrink-0">
                    {art.tag}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* FAQs Accordion */}
        <div className="lg:col-span-6 space-y-4">
          <h2 className="text-base font-bold text-slate-900 tracking-wide uppercase">Frequently Asked Questions</h2>
          
          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <div key={idx} className="bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden">
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full px-5 py-4 text-left flex justify-between items-center gap-4 hover:bg-slate-50/30 transition-colors cursor-pointer"
                >
                  <span className="text-xs sm:text-sm font-semibold text-slate-800">{faq.question}</span>
                  {expandedFaq === idx ? (
                    <ChevronUp size={16} className="text-slate-400 flex-shrink-0" />
                  ) : (
                    <ChevronDown size={16} className="text-slate-400 flex-shrink-0" />
                  )}
                </button>

                {expandedFaq === idx && (
                  <div className="px-5 pb-5 pt-1 border-t border-slate-50 bg-slate-50/[0.15]">
                    <ol className="list-decimal pl-4 space-y-2 text-xs text-slate-550 leading-relaxed">
                      {faq.steps.map((step, sIdx) => (
                        <li key={sIdx} className="pl-1">
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
      <div className="bg-slate-900 text-slate-100 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-md relative overflow-hidden border border-slate-850">
        {/* Visual Background Accent */}
        <div className="absolute right-0 top-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl pointer-events-none" />
        
        <div className="space-y-2.5 max-w-md">
          <h3 className="text-lg font-bold text-slate-100">Still need help?</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Can't find the answers you're looking for? Reach out directly to our live administrative support channels.
          </p>
          <div className="inline-flex items-center gap-1.5 px-2 py-1 bg-emerald-500/15 border border-emerald-500/20 text-emerald-400 rounded-lg text-[10px] font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>24/7 Support: 5 min average response time</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <button 
            onClick={() => triggerToast('Launching Live Chat with support representative...')}
            className="flex items-center justify-center gap-2 px-5 py-3 bg-primary hover:opacity-90 text-white rounded-xl text-xs font-bold transition-all shadow-sm shadow-primary/15 cursor-pointer"
          >
            <MessageSquare size={16} />
            Start Live Chat
          </button>
          <button 
            onClick={() => triggerToast('Redirecting to help desk email client...')}
            className="flex items-center justify-center gap-2 px-5 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-xl text-xs font-bold transition-all cursor-pointer"
          >
            <Mail size={16} />
            Contact via Email
          </button>
        </div>
      </div>

      {/* 5. Quick Links Footer */}
      <div className="border-t border-slate-100 pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-slate-400 font-medium">
        <span>&copy; 2026 24Loops HR. All rights reserved.</span>
        
        <div className="grid">
          <a href="#tutorials" onClick={(e) => { e.preventDefault(); triggerToast('Redirecting to Video Tutorials...'); }} className="flex items-center gap-1.5 hover:text-primary transition-colors">
            <Video size={14} />
            <span>Video Tutorials</span>
          </a>
          <a href="#api" onClick={(e) => { e.preventDefault(); triggerToast('Opening API Developer Documentation...'); }} className="flex items-center gap-1.5 hover:text-primary transition-colors">
            <Terminal size={14} />
            <span>API Documentation</span>
          </a>
          <a href="#status" onClick={(e) => { e.preventDefault(); triggerToast('Viewing infrastructure System Status...'); }} className="flex items-center gap-1.5 hover:text-primary transition-colors">
            <Activity size={14} />
            <span>System Status</span>
          </a>
          <a href="#community" onClick={(e) => { e.preventDefault(); triggerToast('Connecting to Community Forums...'); }} className="flex items-center gap-1.5 hover:text-primary transition-colors">
            <Users size={14} />
            <span>Community Forum</span>
          </a>
        </div>
      </div>

    </div>
  );
}

function CategoryCard({ icon, title, description, color }) {
  return (
    <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-350 flex flex-col gap-3 group cursor-pointer hover:border-primary/20">
      <div className={`p-3 rounded-xl w-fit ${color}`}>
        {icon}
      </div>
      <div className="space-y-1">
        <h3 className="font-bold text-slate-900 text-sm group-hover:text-primary transition-colors">{title}</h3>
        <p className="text-slate-500 text-xs leading-normal">{description}</p>
      </div>
    </div>
  );
}

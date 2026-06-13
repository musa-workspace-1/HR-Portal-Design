import React, { useState } from 'react';
import { 
  Search, Plus, MessageSquare, Hash, ArrowLeft, 
  Maximize2, Edit2, CheckSquare, MoreHorizontal,
  LayoutGrid, CheckCircle2, Circle, AlertCircle,
  Image, Video, Paperclip, Mic, Smile, Send, Info, MoreVertical
} from 'lucide-react';

export default function Team() {
  const [activeSidebarTab, setActiveSidebarTab] = useState('Chats');
  const [activeSubTab, setActiveSubTab] = useState('Overview');
  const [activeChat, setActiveChat] = useState(null);
  const [activeTeam, setActiveTeam] = useState(null);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* 1. Shared Communication Left Sidebar & Main Workspace wrapper */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px', alignItems: 'flex-start' }}>
        
        {/* Left Sidebar */}
        <div className="panel" style={{ flex: '1 1 300px', maxWidth: '350px', display: 'flex', flexDirection: 'column', gap: '0', padding: '0', overflow: 'hidden', height: 'calc(100vh - 140px)' }}>
          
          <div style={{ padding: '16px', borderBottom: '1px solid var(--line)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div className="search" style={{ margin: 0 }}>
              <Search />
              <input 
                type="text" 
                placeholder="Search conversations, teams..." 
              />
            </div>
            <button className="btn primary" style={{ width: '100%', justifyContent: 'center' }}>
              <Plus size={16} />
              New Chat
            </button>
          </div>

          {/* Navigation Workspace Tabs */}
          <div className="seg" style={{ margin: '16px', display: 'flex', width: 'auto' }}>
            <button 
              onClick={() => setActiveSidebarTab('Chats')}
              className={activeSidebarTab === 'Chats' ? 'active' : ''}
              style={{ flex: 1, padding: '8px', fontSize: '12px' }}
            >
              Chats <span style={{ marginLeft: '4px', background: activeSidebarTab === 'Chats' ? '#fff' : 'var(--surface-2)', padding: '2px 6px', borderRadius: '12px', fontSize: '10px', color: activeSidebarTab === 'Chats' ? 'var(--brand)' : 'var(--ink-3)', fontWeight: '800' }}>2</span>
            </button>
            <button 
              onClick={() => setActiveSidebarTab('Teams')}
              className={activeSidebarTab === 'Teams' ? 'active' : ''}
              style={{ flex: 1, padding: '8px', fontSize: '12px' }}
            >
              Teams <span style={{ marginLeft: '4px', background: activeSidebarTab === 'Teams' ? '#fff' : 'var(--surface-2)', padding: '2px 6px', borderRadius: '12px', fontSize: '10px', color: activeSidebarTab === 'Teams' ? 'var(--brand)' : 'var(--ink-3)', fontWeight: '800' }}>1</span>
            </button>
          </div>

          {/* Direct Messages Roster */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '0 16px 16px 16px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {activeSidebarTab === 'Chats' ? (
              <>
                <div 
                  onClick={() => { setActiveChat({ name: 'Shah Zaib', date: '17 Apr', avatar: '/shah_zaib_avatar.png' }); setActiveTeam(null); }}
                  style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', borderRadius: '12px', background: activeChat?.name === 'Shah Zaib' ? 'var(--surface-2)' : 'transparent', cursor: 'pointer' }}
                >
                  <div style={{ position: 'relative' }}>
                    <img src="/shah_zaib_avatar.png" alt="Shah Zaib" style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }} />
                    <div style={{ position: 'absolute', bottom: 0, right: 0, width: '10px', height: '10px', background: 'var(--sage)', borderRadius: '50%', border: '2px solid #fff' }}></div>
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '2px' }}>
                      <h4 style={{ fontWeight: '800', fontSize: '14px', color: 'var(--ink)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Shah Zaib</h4>
                      <span style={{ fontSize: '10px', color: 'var(--ink-3)', fontWeight: '600' }}>17 Apr</span>
                    </div>
                    <p style={{ fontSize: '12px', color: 'var(--ink-2)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Hi, can we review the new...</p>
                  </div>
                </div>
                
                <div 
                  onClick={() => { setActiveChat({ name: 'Sarah Ahmed', date: '15 Apr', avatar: 'https://i.pravatar.cc/150?u=sarah' }); setActiveTeam(null); }}
                  style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', borderRadius: '12px', background: activeChat?.name === 'Sarah Ahmed' ? 'var(--surface-2)' : 'transparent', cursor: 'pointer', transition: 'all 0.2s' }}
                >
                  <div style={{ position: 'relative' }}>
                    <img src="https://i.pravatar.cc/150?u=sarah" alt="Sarah Ahmed" style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '2px' }}>
                      <h4 style={{ fontWeight: '600', fontSize: '14px', color: 'var(--ink)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Sarah Ahmed</h4>
                      <span style={{ fontSize: '10px', color: 'var(--ink-3)', fontWeight: '600' }}>15 Apr</span>
                    </div>
                    <p style={{ fontSize: '12px', color: 'var(--ink-2)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>The files are uploaded.</p>
                  </div>
                </div>
              </>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div 
                  onClick={() => { setActiveTeam(true); setActiveChat(null); }}
                  style={{ padding: '16px', borderRadius: '16px', border: activeTeam ? '1px solid var(--brand)' : '1px solid var(--line)', background: activeTeam ? 'var(--brand-soft)' : 'transparent', cursor: 'pointer', marginBottom: '16px', transition: 'all 0.2s' }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <h4 style={{ fontWeight: '800', color: 'var(--ink)' }}>DM • Shah Zaib</h4>
                    <span className="pill green" style={{ padding: '2px 8px', fontSize: '10px' }}>On Track</span>
                  </div>
                  <p style={{ fontSize: '12px', color: 'var(--ink-2)', marginBottom: '16px' }}>1 members • 1 active tasks</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <img src="/shah_zaib_avatar.png" alt="Avatar" style={{ width: '24px', height: '24px', borderRadius: '50%', objectFit: 'cover' }} />
                    <span style={{ fontSize: '12px', fontWeight: '700', color: 'var(--ink-3)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <CheckSquare size={14} /> 0/0
                    </span>
                  </div>
                </div>
                <button className="btn ghost" style={{ width: '100%', justifyContent: 'center', fontWeight: '600', color: 'var(--ink-2)' }}>
                  <Plus size={16} /> Create Team
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Main Workspace Area */}
        <div className="panel" style={{ flex: '3 1 600px', display: 'flex', flexDirection: 'column', gap: '0', padding: '0', overflow: 'hidden', height: 'calc(100vh - 140px)', position: 'relative' }}>
          
          {!activeChat && !activeTeam ? (
            <>
              {/* Empty State */}
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px' }}>
                <div style={{ width: '80px', height: '80px', background: 'var(--brand-soft)', borderRadius: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
                  <MessageSquare size={40} style={{ color: 'var(--brand)' }} />
                </div>
                
                <h2 style={{ fontSize: '24px', fontWeight: '800', color: 'var(--ink)', marginBottom: '12px' }}>Your Messages</h2>
                
                <p style={{ fontSize: '15px', color: 'var(--ink-2)', textAlign: 'center', maxWidth: '300px', lineHeight: '1.6', marginBottom: '32px' }}>
                  Select a conversation to start chatting, or start a new one.
                </p>
                
                <button className="btn primary" style={{ padding: '12px 24px', borderRadius: '12px', fontSize: '15px' }}>
                  <Plus size={18} /> Start New Chat
                </button>
              </div>

              {/* Secondary Administration Navigation */}
              <div style={{ padding: '24px', borderTop: '1px solid var(--line)', display: 'flex', justifyContent: 'center' }}>
                <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--ink-2)', fontSize: '13px', fontWeight: '600', textDecoration: 'none' }}>
                  <LayoutGrid size={16} /> Team admin (grid view)
                </a>
              </div>
            </>
          ) : activeChat ? (
            <>
              {/* Active Chat Header */}
              <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--line)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <button className="btn ghost" onClick={() => setActiveChat(null)} style={{ padding: '8px', marginRight: '-8px' }}>
                    <ArrowLeft size={20} style={{ color: 'var(--ink-2)' }} />
                  </button>
                  <div style={{ position: 'relative' }}>
                    <img src={activeChat.avatar} alt={activeChat.name} style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }} />
                    <div style={{ position: 'absolute', bottom: 0, right: 0, width: '10px', height: '10px', background: 'var(--sage)', borderRadius: '50%', border: '2px solid #fff' }}></div>
                  </div>
                  <div>
                    <h3 style={{ fontSize: '16px', fontWeight: '700', color: 'var(--ink)' }}>{activeChat.name}</h3>
                    <p style={{ fontSize: '12px', color: 'var(--ink-3)', fontWeight: '500' }}>Last seen {activeChat.date}</p>
                  </div>
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <button className="btn ghost" style={{ width: '36px', height: '36px', padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '10px', border: '1px solid var(--line)' }}>
                    <CheckSquare size={16} style={{ color: 'var(--ink-2)' }} />
                  </button>
                  <button className="btn ghost" style={{ width: '36px', height: '36px', padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '10px', border: '1px solid var(--line)' }}>
                    <Search size={16} style={{ color: 'var(--ink-2)' }} />
                  </button>
                  <button className="btn ghost" style={{ width: '36px', height: '36px', padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '10px', border: '1px solid var(--line)' }}>
                    <Info size={16} style={{ color: 'var(--ink-2)' }} />
                  </button>
                  <button className="btn ghost" style={{ width: '36px', height: '36px', padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '10px', border: '1px solid var(--line)' }}>
                    <MoreVertical size={16} style={{ color: 'var(--ink-2)' }} />
                  </button>
                </div>
              </div>

              {/* Chat Messages Area */}
              <div style={{ flex: 1, padding: '24px', overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', alignItems: 'center', margin: '24px 0' }}>
                  <div style={{ flex: 1, height: '1px', background: 'var(--line)' }}></div>
                  <div style={{ padding: '4px 12px', background: 'var(--surface-2)', borderRadius: '20px', fontSize: '11px', fontWeight: '600', color: 'var(--ink-2)' }}>{activeChat.date}</div>
                  <div style={{ flex: 1, height: '1px', background: 'var(--line)' }}></div>
                </div>
                
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '16px' }}>
                  <div style={{ background: 'var(--brand)', color: '#fff', padding: '12px 16px', borderRadius: '16px 16px 0 16px', maxWidth: '70%' }}>
                    <p style={{ fontSize: '14px', lineHeight: '1.5', margin: 0 }}>HI</p>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '4px', marginTop: '4px' }}>
                      <span style={{ fontSize: '10px', opacity: 0.8 }}>17:02</span>
                      <CheckCircle2 size={12} style={{ opacity: 0.8 }} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Chat Input Bar */}
              <div style={{ padding: '16px 24px', borderTop: '1px solid var(--line)', display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button className="btn ghost" style={{ width: '40px', height: '40px', padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '12px', background: 'var(--surface-2)' }}>
                    <Image size={18} style={{ color: 'var(--ink-2)' }} />
                  </button>
                  <button className="btn ghost" style={{ width: '40px', height: '40px', padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '12px', background: 'var(--surface-2)' }}>
                    <Video size={18} style={{ color: 'var(--ink-2)' }} />
                  </button>
                  <button className="btn ghost" style={{ width: '40px', height: '40px', padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '12px', background: 'var(--surface-2)' }}>
                    <Paperclip size={18} style={{ color: 'var(--ink-2)' }} />
                  </button>
                  <button className="btn ghost" style={{ width: '40px', height: '40px', padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '12px', background: 'var(--surface-2)' }}>
                    <Mic size={18} style={{ color: 'var(--ink-2)' }} />
                  </button>
                </div>
                
                <div style={{ flex: 1, display: 'flex', alignItems: 'center', background: 'transparent', border: '1px solid var(--brand)', borderRadius: '24px', padding: '4px 8px' }}>
                  <input 
                    type="text" 
                    placeholder={`Message ${activeChat.name}...`}
                    style={{ flex: 1, background: 'transparent', border: 'none', padding: '8px 12px', fontSize: '14px', color: 'var(--ink)', outline: 'none' }}
                  />
                  <button className="btn ghost" style={{ width: '32px', height: '32px', padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%' }}>
                    <Smile size={18} style={{ color: 'var(--brand)' }} />
                  </button>
                </div>
                
                <button className="btn ghost" style={{ width: '40px', height: '40px', padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '12px', background: 'var(--surface-2)' }}>
                  <Send size={18} style={{ color: 'var(--ink-2)' }} />
                </button>
              </div>
            </>
          ) : (
            <>
              {/* 2. Communication Channel Context Header */}
              <div style={{ padding: '16px 24px', borderBottom: '1px solid var(--line)', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <button className="btn ghost" onClick={() => setActiveTeam(null)} style={{ padding: '8px', marginRight: '-8px' }}>
                    <ArrowLeft size={20} style={{ color: 'var(--ink-2)' }} />
                  </button>
                  <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'var(--brand-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--brand)' }}>
                    <Hash size={24} />
                  </div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '4px' }}>
                      <h2 style={{ fontSize: '18px', fontWeight: '800', color: 'var(--ink)' }}>DM • Shah Zaib</h2>
                      <span className="pill green" style={{ padding: '2px 6px', fontSize: '10px' }}>On Track</span>
                    </div>
                    <p style={{ fontSize: '12px', color: 'var(--ink-2)', fontWeight: '600' }}>1 members • Due 31 May 2026</p>
                  </div>
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <button className="btn ghost" style={{ padding: '8px' }}>
                    <MessageSquare size={18} style={{ color: 'var(--ink-2)' }} />
                  </button>
                  <button className="btn ghost" style={{ padding: '8px' }}>
                    <Edit2 size={18} style={{ color: 'var(--ink-2)' }} />
                  </button>
                  <button className="btn ghost" style={{ padding: '8px' }}>
                    <CheckSquare size={18} style={{ color: 'var(--ink-2)' }} />
                  </button>
                </div>
              </div>

              {/* 3. Sub-Tab Workspace Switcher */}
              <div className="seg" style={{ margin: '12px 24px 16px 24px', width: 'fit-content' }}>
                {['Overview', 'Tasks', 'Members', 'Chat'].map((tab) => (
                  <button 
                    key={tab}
                    onClick={() => setActiveSubTab(tab)}
                    className={activeSubTab === tab ? 'active' : ''}
                    style={{ padding: '6px 12px', fontSize: '12px' }}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Content Area */}
              <div style={{ flex: 1, overflowY: 'auto', padding: '0 24px 24px 24px' }}>
                
                {activeSubTab === 'Overview' && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '900px' }}>
                    
                    {/* 4A. Team Task KPI Block */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
                      <TaskCard title="Total Tasks" value="0" icon={<LayoutGrid size={18} />} color="var(--ink)" />
                      <TaskCard title="Completed" value="0" icon={<CheckCircle2 size={18} />} color="var(--sage)" />
                      <TaskCard title="Active" value="1" icon={<Circle size={18} />} color="var(--brand)" />
                      <TaskCard title="Overdue" value="1" icon={<AlertCircle size={18} />} color="var(--coral)" />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '16px' }}>
                      
                      {/* 4B. Team Progress Module */}
                      <div className="panel" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                          <h3 style={{ fontWeight: '800', color: 'var(--ink)' }}>Team Progress</h3>
                          <span style={{ fontSize: '24px', fontWeight: '800', color: 'var(--coral)' }}>0%</span>
                        </div>
                        
                        <div style={{ width: '100%', background: 'var(--surface-2)', borderRadius: '100px', height: '12px', marginBottom: '12px', overflow: 'hidden' }}>
                          <div style={{ background: 'var(--coral)', height: '100%', borderRadius: '100px', width: '0%' }}></div>
                        </div>
                        
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px', color: 'var(--ink-2)', fontWeight: '600' }}>
                          <span>0 of 0 tasks completed</span>
                          <span>Deadline: 31 May 2026</span>
                        </div>
                      </div>

                      {/* 4C. Team Members Directory Module */}
                      <div className="panel">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                          <h3 style={{ fontWeight: '800', color: 'var(--ink)' }}>Team Members</h3>
                        </div>
                        
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '8px', borderRadius: '12px', cursor: 'pointer', borderBottom: '1px solid var(--line)' }}>
                            <img src="/shah_zaib_avatar.png" alt="Shah Zaib" style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }} />
                            <div style={{ flex: 1, fontWeight: '800', color: 'var(--ink)', fontSize: '14px' }}>Shah Zaib</div>
                            <button className="btn ghost" style={{ width: '36px', height: '36px', padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '10px', border: '1px solid var(--line)' }}>
                              <MessageSquare size={16} style={{ color: 'var(--ink-3)' }} />
                            </button>
                          </div>
                        </div>
                      </div>

                    </div>

                  </div>
                )}

                {activeSubTab !== 'Overview' && (
                  <div className="empty" style={{ height: '100%', border: 'none', background: 'transparent' }}>
                    <div style={{ width: '64px', height: '64px', background: 'var(--surface-2)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px', border: '1px solid var(--line)' }}>
                      <LayoutGrid size={32} style={{ color: 'var(--ink-3)' }} />
                    </div>
                    <h3 style={{ fontSize: '18px', fontWeight: '800', color: 'var(--ink)', marginBottom: '8px' }}>{activeSubTab} Area</h3>
                    <p style={{ fontSize: '14px', color: 'var(--ink-2)', maxWidth: '400px', margin: '0 auto', lineHeight: '1.6' }}>This section is currently empty. Content for {activeSubTab.toLowerCase()} will appear here.</p>
                  </div>
                )}

              </div>
            </>
          )}

        </div>

      </div>
    </div>
  );
}

function TaskCard({ title, value, icon, color }) {
  return (
    <div className="lb-card" style={{ padding: '12px 16px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '64px', transition: 'all 0.3s', cursor: 'pointer', background: '#fff', borderRadius: '10px', border: '1px solid var(--line)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: color, marginBottom: '6px' }}>
        {React.cloneElement(icon, { size: 14 })}
        <span style={{ fontSize: '10px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{title}</span>
      </div>
      <div style={{ fontSize: '20px', fontWeight: '900', color: color }}>{value}</div>
    </div>
  );
}

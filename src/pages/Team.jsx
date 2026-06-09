import React, { useState } from 'react';
import { 
  Search, Plus, MessageSquare, Hash, ArrowLeft, 
  Maximize2, Edit2, CheckSquare, MoreHorizontal,
  LayoutGrid, CheckCircle2, Circle, AlertCircle
} from 'lucide-react';

export default function Team() {
  const [activeSidebarTab, setActiveSidebarTab] = useState('Chats');
  const [activeSubTab, setActiveSubTab] = useState('Overview');

  return (
    <div className="flex flex-col lg:flex-row h-full gap-6 pb-24 lg:pb-0">
      
      {/* 1. Shared Communication Left Sidebar */}
      <div className="w-full lg:w-80 flex-shrink-0 flex flex-col bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden h-[calc(100vh-140px)]">
        
        <div className="p-4 border-b border-slate-100 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input 
              type="text" 
              placeholder="Search conversations, teams..." 
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-primary/50 transition-colors"
            />
          </div>
          <button className="w-full flex items-center justify-center gap-2 py-2.5 bg-primary text-white rounded-lg text-sm font-semibold hover:opacity-90 transition-colors shadow-sm">
            <Plus size={16} />
            New Chat
          </button>
        </div>

        {/* Navigation Workspace Tabs */}
        <div className="flex border-b border-slate-100">
          <button 
            onClick={() => setActiveSidebarTab('Chats')}
            className={`flex-1 py-3 text-sm font-medium border-b-2 transition-colors ${
              activeSidebarTab === 'Chats' ? 'border-primary text-primary' : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            Chats <span className="ml-1 bg-primary/10 text-primary py-0.5 px-1.5 rounded-full text-xs">2</span>
          </button>
          <button 
            onClick={() => setActiveSidebarTab('Teams')}
            className={`flex-1 py-3 text-sm font-medium border-b-2 transition-colors ${
              activeSidebarTab === 'Teams' ? 'border-primary text-primary' : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            Teams <span className="ml-1 bg-slate-100 text-slate-500 py-0.5 px-1.5 rounded-full text-xs">1</span>
          </button>
        </div>

        {/* Direct Messages Roster */}
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {activeSidebarTab === 'Chats' ? (
            <>
              <div className="flex items-center gap-3 p-3 rounded-xl bg-primary/5 cursor-pointer border border-primary/10">
                <div className="relative">
                  <img src="/shah_zaib_avatar.png" alt="Shah Zaib" className="w-10 h-10 rounded-full object-cover" />
                  <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-white"></div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline mb-0.5">
                    <h4 className="font-semibold text-slate-900 text-sm truncate">Shah Zaib</h4>
                    <span className="text-[10px] text-slate-400 font-medium whitespace-nowrap">17 Apr</span>
                  </div>
                  <p className="text-xs text-slate-500 truncate">Hi, can we review the new...</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 cursor-pointer border border-transparent transition-colors">
                <div className="relative">
                  <img src="https://i.pravatar.cc/150?u=sarah" alt="Sarah Ahmed" className="w-10 h-10 rounded-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline mb-0.5">
                    <h4 className="font-medium text-slate-700 text-sm truncate">Sarah Ahmed</h4>
                    <span className="text-[10px] text-slate-400 font-medium whitespace-nowrap">15 Apr</span>
                  </div>
                  <p className="text-xs text-slate-500 truncate">The files are uploaded.</p>
                </div>
              </div>
            </>
          ) : (
            <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 cursor-pointer border border-transparent transition-colors">
              <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center text-purple-600 font-bold">
                <Hash size={20} />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-slate-700 text-sm truncate">Engineering Team</h4>
                <p className="text-xs text-slate-500 truncate">12 members</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Main Workspace Area */}
      <div className="flex-1 flex flex-col bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden h-auto lg:h-[calc(100vh-140px)]">
        
        {/* 2. Communication Channel Context Header */}
        <div className="p-4 lg:p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3 lg:gap-4">
            <button className="lg:hidden p-2 -ml-2 text-slate-500 hover:text-slate-700">
              <ArrowLeft size={20} />
            </button>
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex flex-shrink-0 items-center justify-center text-primary">
              <Hash size={24} />
            </div>
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h2 className="text-lg font-bold text-slate-900">DM • Shah Zaib</h2>
                <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 border border-emerald-200 rounded-md text-[10px] font-bold uppercase tracking-wider">
                  On Track
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium">1 members • Due No deadline</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 self-start sm:self-center">
            <button className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-50 rounded-lg transition-colors">
              <Maximize2 size={18} />
            </button>
            <button className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-50 rounded-lg transition-colors">
              <Edit2 size={18} />
            </button>
            <button className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-50 rounded-lg transition-colors">
              <CheckSquare size={18} />
            </button>
          </div>
        </div>

        {/* 3. Sub-Tab Workspace Switcher */}
        <div className="flex px-4 lg:px-6 border-b border-slate-100 overflow-x-auto hide-scrollbar">
          {['Overview', 'Tasks', 'Members', 'Chat'].map((tab) => (
            <button 
              key={tab}
              onClick={() => setActiveSubTab(tab)}
              className={`px-4 py-3 text-sm font-medium border-b-2 whitespace-nowrap transition-colors ${
                activeSubTab === tab ? 'border-primary text-primary' : 'border-transparent text-slate-500 hover:text-slate-700'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-4 lg:p-6 bg-slate-50/50">
          
          {activeSubTab === 'Overview' && (
            <div className="space-y-6 max-w-4xl">
              
              {/* 4A. Team Task KPI Block */}
              <div className="grid">
                <TaskCard title="Total Tasks" value="0" icon={<LayoutGrid size={18} />} color="text-slate-700" />
                <TaskCard title="Completed" value="0" icon={<CheckCircle2 size={18} />} color="text-emerald-600" />
                <TaskCard title="Active" value="0" icon={<Circle size={18} />} color="text-primary" />
                <TaskCard title="Overdue" value="0" icon={<AlertCircle size={18} />} color="text-rose-600" />
              </div>

              <div className="grid">
                
                {/* 4B. Team Progress Module */}
                <div className="panel">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-slate-900">Task Progress</h3>
                    <span className="text-3xl font-bold text-slate-900">0%</span>
                  </div>
                  
                  <div className="w-full bg-slate-100 rounded-full h-3 mb-3 overflow-hidden">
                    <div className="bg-primary h-full rounded-full" style={{ width: '0%' }}></div>
                  </div>
                  
                  <div className="flex justify-between items-center text-xs text-slate-500 font-medium">
                    <span>0 of 0 tasks completed</span>
                    <span>Deadline: No deadline</span>
                  </div>
                </div>

                {/* 4C. Team Members Directory Module */}
                <div className="panel">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-slate-900">Team Members</h3>
                    <button className="text-primary text-sm font-medium hover:underline">View all</button>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-2 hover:bg-slate-50 rounded-xl transition-colors group cursor-pointer border border-transparent">
                      <img src="/shah_zaib_avatar.png" alt="Shah Zaib" className="w-10 h-10 rounded-full object-cover border border-slate-200" />
                      <div className="flex-1 font-semibold text-slate-900 text-sm">Shah Zaib</div>
                      <button className="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-400 group-hover:bg-white group-hover:text-primary group-hover:border-primary/30 transition-all">
                        <MessageSquare size={16} />
                      </button>
                    </div>
                  </div>
                </div>

              </div>

            </div>
          )}

          {activeSubTab !== 'Overview' && (
            <div className="flex flex-col items-center justify-center h-full text-slate-500 p-8 text-center">
              <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mb-4">
                <LayoutGrid size={32} className="text-slate-300" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">{activeSubTab} Area</h3>
              <p className="text-sm max-w-sm">This section is currently empty. Content for {activeSubTab.toLowerCase()} will appear here.</p>
            </div>
          )}

        </div>
      </div>

    </div>
  );
}

function TaskCard({ title, value, icon, color }) {
  return (
    <div className="panel">
      <div className={`flex items-center gap-2 ${color} mb-2`}>
        {icon}
        <span className="text-xs font-bold uppercase tracking-wide">{title}</span>
      </div>
      <div className={`text-4xl font-black ${color}`}>{value}</div>
    </div>
  );
}

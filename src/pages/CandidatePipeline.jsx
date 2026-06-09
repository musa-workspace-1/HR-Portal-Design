import React, { useState, useEffect } from 'react';
import { 
  Loader2, MoreHorizontal, Calendar, MessageSquare, 
  Paperclip, Star
} from 'lucide-react';

export default function CandidatePipeline() {
  const [isLoading, setIsLoading] = useState(true);
  const [pipelineData, setPipelineData] = useState(null);

  // Simulate Asynchronous Data Management (Progressive Pipeline Ingestion)
  useEffect(() => {
    const fetchPipeline = () => {
      setTimeout(() => {
        setPipelineData({
          Applied: [
            { id: 'c1', name: 'Zackary Lewis', role: 'Frontend Developer', rating: 4, date: 'May 24', comments: 2, files: 1, avatar: 'https://i.pravatar.cc/150?u=zack' },
            { id: 'c2', name: 'Sophia Chen', role: 'UX Designer', rating: 3, date: 'May 23', comments: 0, files: 2, avatar: 'https://i.pravatar.cc/150?u=sophia' }
          ],
          Screening: [
            { id: 'c3', name: 'Marcus Johnson', role: 'Backend Engineer', rating: 5, date: 'May 21', comments: 4, files: 1, avatar: 'https://i.pravatar.cc/150?u=marcus' }
          ],
          Interview: [
            { id: 'c4', name: 'Aisha Patel', role: 'Product Manager', rating: 4, date: 'May 18', comments: 6, files: 3, avatar: 'https://i.pravatar.cc/150?u=aisha' },
            { id: 'c5', name: 'Liam Davies', role: 'Frontend Developer', rating: 3, date: 'May 19', comments: 1, files: 1, avatar: 'https://i.pravatar.cc/150?u=liam' }
          ],
          Offered: [
            { id: 'c6', name: 'Isabella Ross', role: 'Data Analyst', rating: 5, date: 'May 15', comments: 8, files: 2, avatar: 'https://i.pravatar.cc/150?u=isabella' }
          ],
          Hired: [
            { id: 'c7', name: 'James Wilson', role: 'DevOps Engineer', rating: 5, date: 'May 10', comments: 3, files: 4, avatar: 'https://i.pravatar.cc/150?u=james' }
          ]
        });
        setIsLoading(false);
      }, 1500); // 1.5 seconds artificial delay
    };

    fetchPipeline();
  }, []);

  return (
    <div className="stagger">
      
      {/* 1. Page Title & Action Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 shrink-0">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Candidate Pipeline</h1>
          <p className="text-sm text-slate-500 mt-1">Track and manage active applicants across recruitment stages.</p>
        </div>
      </div>

      {/* Pipeline Board Workspace */}
      <div className="flex-1 overflow-hidden relative flex">
        {isLoading ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/50 rounded-2xl border border-slate-100 backdrop-blur-sm z-10">
            <Loader2 className="w-10 h-10 text-primary animate-spin mb-4" />
            <h2 className="text-lg font-bold text-slate-900">Ingesting Pipeline Data...</h2>
            <p className="text-sm text-slate-500">Fetching active applicant profiles and stages.</p>
          </div>
        ) : (
          <div className="flex-1 overflow-x-auto hide-scrollbar flex gap-6 pb-4">
            
            {/* KanBan Stage Columns */}
            {Object.keys(pipelineData).map((stage) => (
              <KanbanColumn key={stage} title={stage} count={pipelineData[stage].length} candidates={pipelineData[stage]} />
            ))}
            
          </div>
        )}
      </div>

    </div>
  );
}

function KanbanColumn({ title, count, candidates }) {
  // Map stage to specific colors
  const getStageColor = (stage) => {
    switch(stage) {
      case 'Applied': return 'bg-slate-200 text-slate-700';
      case 'Screening': return 'bg-amber-100 text-amber-700';
      case 'Interview': return 'bg-primary/20 text-primary';
      case 'Offered': return 'bg-purple-100 text-purple-700';
      case 'Hired': return 'bg-emerald-100 text-emerald-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  return (
    <div className="w-80 shrink-0 flex flex-col bg-slate-50 rounded-2xl border border-slate-200/60 max-h-full">
      {/* Column Header */}
      <div className="p-4 flex items-center justify-between border-b border-slate-200/60 shrink-0">
        <div className="flex items-center gap-2">
          <h3 className="font-bold text-slate-800">{title}</h3>
          <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${getStageColor(title)}`}>
            {count}
          </span>
        </div>
        <button className="text-slate-400 hover:text-slate-700 transition-colors">
          <MoreHorizontal size={18} />
        </button>
      </div>

      {/* Candidate Cards Container */}
      <div className="p-3 flex-1 overflow-y-auto space-y-3">
        {candidates.map(candidate => (
          <CandidateCard key={candidate.id} candidate={candidate} />
        ))}
        {candidates.length === 0 && (
          <div className="text-center py-8 text-sm text-slate-400 font-medium border-2 border-dashed border-slate-200 rounded-xl">
            Drop candidate here
          </div>
        )}
      </div>
    </div>
  );
}

function CandidateCard({ candidate }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 hover:border-primary/40 hover:shadow-md transition-all cursor-grab active:cursor-grabbing group">
      
      {/* Top row: Avatar & Actions */}
      <div className="flex justify-between items-start mb-3">
        <div className="flex gap-3">
          <img src={candidate.avatar} alt={candidate.name} className="w-10 h-10 rounded-full object-cover border border-slate-100 shadow-sm" />
          <div>
            <h4 className="font-bold text-slate-900 text-sm leading-tight mb-1">{candidate.name}</h4>
            <p className="text-xs font-medium text-primary bg-primary/5 px-2 py-0.5 rounded-md inline-block">{candidate.role}</p>
          </div>
        </div>
        <button className="text-slate-300 hover:text-slate-600 opacity-0 group-hover:opacity-100 transition-opacity">
          <MoreHorizontal size={16} />
        </button>
      </div>

      {/* Rating */}
      <div className="flex gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <Star 
            key={i} 
            size={12} 
            className={i < candidate.rating ? "text-amber-400 fill-amber-400" : "text-slate-200"} 
          />
        ))}
      </div>

      {/* Bottom row: Meta stats */}
      <div className="flex items-center justify-between text-xs font-medium text-slate-500 pt-3 border-t border-slate-50">
        <div className="flex items-center gap-1.5">
          <Calendar size={14} className="text-slate-400" />
          {candidate.date}
        </div>
        
        <div className="flex gap-3">
          <div className="flex items-center gap-1">
            <MessageSquare size={14} className="text-slate-400" />
            {candidate.comments}
          </div>
          <div className="flex items-center gap-1">
            <Paperclip size={14} className="text-slate-400" />
            {candidate.files}
          </div>
        </div>
      </div>
      
    </div>
  );
}

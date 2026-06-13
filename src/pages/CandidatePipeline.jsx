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
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: '24px' }}>
      


      {/* Pipeline Board Workspace */}
      <div style={{ flex: 1, position: 'relative', display: 'flex', overflow: 'hidden' }}>
        {isLoading ? (
          <div className="panel" style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', zIndex: 10 }}>
            <Loader2 size={40} style={{ color: 'var(--brand)', animation: 'spin 1s linear infinite', marginBottom: '16px' }} />
            <h2 style={{ fontSize: '18px', fontWeight: 'bold', color: 'var(--ink)', marginBottom: '4px' }}>Ingesting Pipeline Data...</h2>
            <p style={{ fontSize: '13px', color: 'var(--ink-3)' }}>Fetching active applicant profiles and stages.</p>
          </div>
        ) : (
          <div className="kanban" style={{ display: 'flex', gap: '16px', overflowX: 'auto', paddingBottom: '16px', flex: 1, alignItems: 'flex-start' }}>
            
            {/* KanBan Stage Columns */}
            {Object.keys(pipelineData).map((stage) => (
              <KanbanColumn key={stage} title={stage} count={pipelineData[stage].length} candidates={pipelineData[stage]} />
            ))}
            
          </div>
        )}
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .kanban::-webkit-scrollbar { height: 8px; }
        .kanban::-webkit-scrollbar-thumb { background: var(--line); border-radius: 8px; }
        .kanban-col-scroll::-webkit-scrollbar { width: 4px; }
        .kanban-col-scroll::-webkit-scrollbar-thumb { background: var(--line); border-radius: 4px; }
      `}</style>
    </div>
  );
}

function KanbanColumn({ title, count, candidates }) {
  return (
    <div className="kcol" style={{ flex: '0 0 310px', display: 'flex', flexDirection: 'column', maxHeight: '100%' }}>
      {/* Column Header */}
      <div className="kh">
        <h4 style={{ color: 'var(--ink)' }}>{title}</h4>
        <span className="cnt">{count}</span>
      </div>

      {/* Candidate Cards Container */}
      <div className="kanban-col-scroll" style={{ overflowY: 'auto', paddingRight: '4px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {candidates.map(candidate => (
          <CandidateCard key={candidate.id} candidate={candidate} />
        ))}
        {candidates.length === 0 && (
          <div style={{ textAlign: 'center', padding: '32px 0', fontSize: '12px', color: 'var(--ink-3)', border: '2px dashed var(--line)', borderRadius: '12px', fontWeight: '600' }}>
            Drop candidate here
          </div>
        )}
      </div>
    </div>
  );
}

function CandidateCard({ candidate }) {
  return (
    <div className="kcard group" style={{ margin: 0 }}>
      
      {/* Top row: Avatar & Actions */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
        <div style={{ display: 'flex', gap: '12px' }}>
          <img src={candidate.avatar} alt={candidate.name} style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }} />
          <div>
            <div className="kt" style={{ margin: '0 0 2px 0', color: 'var(--ink)', lineHeight: '1.2' }}>{candidate.name}</div>
            <div className="kr" style={{ margin: 0, color: 'var(--brand)', fontWeight: '600', fontSize: '11px' }}>{candidate.role}</div>
          </div>
        </div>
        <button style={{ background: 'none', border: 'none', color: 'var(--ink-3)', cursor: 'pointer', padding: '4px' }}>
          <MoreHorizontal size={16} />
        </button>
      </div>

      {/* Rating */}
      <div style={{ display: 'flex', gap: '4px', marginBottom: '16px' }}>
        {[...Array(5)].map((_, i) => (
          <Star 
            key={i} 
            size={12} 
            style={{ color: i < candidate.rating ? 'var(--gold)' : 'var(--line)', fill: i < candidate.rating ? 'var(--gold)' : 'transparent' }} 
          />
        ))}
      </div>

      {/* Bottom row: Meta stats */}
      <div className="kf" style={{ borderTop: '1px solid var(--line-2)', paddingTop: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: 'var(--ink-3)', fontWeight: '600' }}>
          <Calendar size={13} />
          {candidate.date}
        </div>
        
        <div style={{ display: 'flex', gap: '12px', fontSize: '11px', color: 'var(--ink-3)', fontWeight: '600' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <MessageSquare size={13} />
            {candidate.comments}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Paperclip size={13} />
            {candidate.files}
          </div>
        </div>
      </div>
      
    </div>
  );
}

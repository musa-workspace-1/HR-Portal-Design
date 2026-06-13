import React, { useState } from 'react';
import { 
  Plus, Search, ChevronDown, CalendarClock
} from 'lucide-react';
import CreateShiftModal from '../components/CreateShiftModal';

export default function Shift() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isCreateShiftModalOpen, setIsCreateShiftModalOpen] = useState(false);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <CreateShiftModal isOpen={isCreateShiftModalOpen} onClose={() => setIsCreateShiftModalOpen(false)} />
      
      {/* 1. Page Title & Action Bar */}
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'flex-end', gap: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button className="btn primary" onClick={() => setIsCreateShiftModalOpen(true)}>
            <Plus size={16} />
            Add Shift
          </button>
        </div>
      </div>

      <div className="panel" style={{ padding: 0, display: 'flex', flexDirection: 'column', overflow: 'hidden', minHeight: '500px' }}>
        
        {/* 2. Search & Quick Filter Bar */}
        <div style={{ padding: '20px', borderBottom: '1px solid var(--line)', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '16px', background: 'var(--surface-2)' }}>
          
          {/* Text Search Input Field */}
          <div className="search" style={{ margin: 0, width: '100%', maxWidth: '300px' }}>
            <Search />
            <input 
              type="text" 
              placeholder="Search..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Status Filter Dropdown */}
          <div style={{ position: 'relative', minWidth: '140px', margin: 0 }} className="field">
            <select className="glass-ctrl" style={{ width: '100%', margin: 0 }}>
              <option>All</option>
              <option>Status</option>
              <option>Active</option>
              <option>Inactive</option>
            </select>
          </div>

        </div>

        {/* 3. Empty Workspace / Zero-State Component */}
        <div className="empty" style={{ flex: 1, border: 'none', background: 'transparent' }}>
          <div style={{ width: '80px', height: '80px', background: 'var(--surface-2)', borderRadius: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px', border: '1px solid var(--line)' }}>
            <CalendarClock size={40} style={{ color: 'var(--ink-3)' }} strokeWidth={1.5} />
          </div>
          <h2 style={{ fontSize: '18px', fontWeight: '800', color: 'var(--ink)', marginBottom: '8px' }}>No records found</h2>
          <p style={{ fontSize: '14px', color: 'var(--ink-2)', maxWidth: '400px', margin: '0 auto', lineHeight: '1.6' }}>
            There are currently no active shifts matching your criteria. 
            Click the button above to define a new shift schedule.
          </p>
        </div>

      </div>
    </div>
  );
}




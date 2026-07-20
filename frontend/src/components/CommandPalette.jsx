import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search, Command, Users, UserPlus, Shield, Activity,
  TrendingUp, Lock, FileText, Download, X, ChevronRight, BedDouble
} from 'lucide-react';

const CommandPalette = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const navigate = useNavigate();

  const commands = [
    {
      id: 'staff-mgmt',
      title: 'Personnel Matrix & Staff Management',
      category: 'User Governance',
      icon: Users,
      action: () => navigate('/dashboard/staff')
    },
    {
      id: 'create-staff',
      title: 'Deploy New Staff Account (Doctor / Receptionist)',
      category: 'User Governance',
      icon: UserPlus,
      action: () => navigate('/dashboard/create-staff')
    },
    {
      id: 'patients',
      title: 'Clinical Database & Patient Records',
      category: 'Clinical',
      icon: Activity,
      action: () => navigate('/dashboard/patients')
    },
    {
      id: 'bed-telemetry',
      title: 'Live Ward & ICU Bed Telemetry',
      category: 'Clinical',
      icon: BedDouble,
      action: () => navigate('/dashboard/beds')
    },
    {
      id: 'analytics',
      title: 'Neural Revenue & Performance Analytics',
      category: 'Metrics & Intelligence',
      icon: TrendingUp,
      action: () => navigate('/dashboard/analytics')
    },
    {
      id: 'audit-logs',
      title: 'HIPAA Forensic Audit Logs & Compliance',
      category: 'Security & Compliance',
      icon: FileText,
      action: () => navigate('/dashboard/audit-logs')
    },
    {
      id: 'security-control',
      title: 'Security Control & Emergency Lockdown',
      category: 'Security & Compliance',
      icon: Lock,
      action: () => navigate('/dashboard/security')
    },
    {
      id: 'archived-records',
      title: 'Archived Medical Staff Dossiers',
      category: 'Compliance',
      icon: Shield,
      action: () => navigate('/dashboard/archived-records')
    }
  ];

  const filteredCommands = commands.filter(cmd =>
    cmd.title.toLowerCase().includes(query.toLowerCase()) ||
    cmd.category.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) {
          onClose();
        } else {
          // Trigger open via parent or event
        }
      }

      if (!isOpen) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % (filteredCommands.length || 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filteredCommands.length) % (filteredCommands.length || 1));
      } else if (e.key === 'Enter' && filteredCommands[selectedIndex]) {
        e.preventDefault();
        filteredCommands[selectedIndex].action();
        onClose();
      } else if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filteredCommands, selectedIndex, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-slate-950/60 backdrop-blur-md animate-fade-in">
      <div className="bg-white dark:bg-slate-900 w-full max-w-2xl rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden transition-all">
        {/* Search Bar */}
        <div className="flex items-center px-6 py-4 border-b border-slate-100 dark:border-slate-800">
          <Search className="h-5 w-5 text-brand-teal mr-3" />
          <input
            type="text"
            autoFocus
            placeholder="Type a command or search modules (e.g. Audit Logs, Staff, Beds)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none text-sm font-medium"
          />
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Command List */}
        <div className="max-h-96 overflow-y-auto p-3 space-y-1">
          {filteredCommands.length === 0 ? (
            <div className="py-12 text-center text-slate-400 text-xs font-bold uppercase tracking-widest">
              No matching system command found
            </div>
          ) : (
            filteredCommands.map((cmd, idx) => {
              const Icon = cmd.icon;
              const isSelected = idx === selectedIndex;
              return (
                <div
                  key={cmd.id}
                  onClick={() => {
                    cmd.action();
                    onClose();
                  }}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`flex items-center justify-between px-4 py-3.5 rounded-2xl cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-brand-teal text-white shadow-md'
                      : 'hover:bg-slate-50 dark:hover:bg-slate-800/60 text-slate-700 dark:text-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-xl ${isSelected ? 'bg-white/20' : 'bg-slate-100 dark:bg-slate-800 text-brand-teal'}`}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-xs font-bold leading-snug">{cmd.title}</p>
                      <p className={`text-[10px] ${isSelected ? 'text-teal-100' : 'text-slate-400'}`}>{cmd.category}</p>
                    </div>
                  </div>
                  <ChevronRight className={`h-4 w-4 ${isSelected ? 'text-white' : 'text-slate-300'}`} />
                </div>
              );
            })
          )}
        </div>

        {/* Footer Hint */}
        <div className="px-6 py-3 bg-slate-50 dark:bg-slate-900/80 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[10px] font-bold text-slate-400">
          <div className="flex items-center gap-2">
            <span className="px-1.5 py-0.5 bg-slate-200 dark:bg-slate-800 rounded font-mono">↑↓</span> to navigate
            <span className="px-1.5 py-0.5 bg-slate-200 dark:bg-slate-800 rounded font-mono ml-2">↵</span> to select
          </div>
          <div className="flex items-center gap-1">
            <span className="px-1.5 py-0.5 bg-slate-200 dark:bg-slate-800 rounded font-mono">ESC</span> to exit
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommandPalette;

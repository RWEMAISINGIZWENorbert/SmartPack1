import React from 'react';
import Logo from './Logo';

const Sidebar = ({ 
  items = [], 
  activeId, 
  onItemClick, 
  onLogout,
  onClose
}) => {
  return (
    <div className="h-full flex flex-col py-6 px-4 relative bg-background border-r border-border">

      {/* Branding */}
      <div className="px-4 mb-10 flex items-center gap-3">
        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center shadow-lg shadow-primary/20">
           <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
        </div>
        <h1 className="text-xl font-bold tracking-tight text-text-high">
          Smart<span className="text-primary">Park</span>
        </h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 flex flex-col gap-1 overflow-y-auto custom-scrollbar">
        {items.map((item) => {
          const isActive = activeId === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onItemClick(item.id)}
              className={`
                flex items-center gap-3 px-4 py-2.5 rounded-lg
                transition-all duration-200 group w-full text-sm font-medium
                ${isActive 
                  ? 'bg-muted text-primary border border-border/50' 
                  : 'text-text-low hover:bg-muted/50 hover:text-text-high'}
              `}
            >
              <div className={`
                flex items-center justify-center w-5 h-5
                ${isActive ? 'text-primary' : 'text-text-low group-hover:text-text-high'}
              `}>
                {item.icon}
              </div>
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="mt-auto pt-6 border-t border-border/50">
        <button
          onClick={onLogout}
          className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-text-low hover:bg-error/10 hover:text-error transition-all duration-200 group text-sm font-medium"
        >
          <svg className="w-5 h-5 opacity-70 group-hover:opacity-100" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;

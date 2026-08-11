import React from 'react';

const Table = ({ columns, data, className = '' }) => {
  return (
    <div className={`overflow-x-auto bg-transparent ${className}`}>
      <table className="min-w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-border text-xs text-text-low font-bold uppercase tracking-tight">
            {columns.map((col, idx) => (
              <th key={idx} className="px-5 py-3">
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {data.length > 0 ? (
            data.map((row, rowIndex) => (
              <tr key={rowIndex} className="hover:bg-white/5 transition-colors">
                {columns.map((col, colIndex) => (
                  <td key={colIndex} className="px-5 py-4 text-sm text-text-high whitespace-nowrap">
                    {col.render ? col.render(row) : row[col.accessor]}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length} className="px-5 py-8 text-center text-text-low text-sm italic">
                Nothing here yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;

import React from 'react';

/**
 * Skeleton Loader Component
 * Resolves Issue #6 / #9 ([Free] Add loading skeletons)
 */
export const CardSkeleton = () => {
  return (
    <div style={{ backgroundColor: '#1e293b', borderRadius: '10px', padding: '16px', border: '1px solid #334155' }}>
      <div style={{ height: '140px', backgroundColor: '#0f172a', borderRadius: '8px', marginBottom: '12px', animation: 'pulse 1.5s infinite' }} />
      <div style={{ height: '16px', backgroundColor: '#334155', borderRadius: '4px', width: '60%', marginBottom: '8px' }} />
      <div style={{ height: '12px', backgroundColor: '#334155', borderRadius: '4px', width: '40%' }} />
    </div>
  );
};

export const TableSkeleton = () => {
  return (
    <div style={{ backgroundColor: '#1e293b', padding: '16px', borderRadius: '10px' }}>
      {[1, 2, 3, 4].map((i) => (
        <div key={i} style={{ display: 'flex', gap: '16px', padding: '12px 0', borderBottom: '1px solid #334155' }}>
          <div style={{ height: '20px', backgroundColor: '#334155', borderRadius: '4px', width: '30%' }} />
          <div style={{ height: '20px', backgroundColor: '#334155', borderRadius: '4px', width: '20%' }} />
          <div style={{ height: '20px', backgroundColor: '#334155', borderRadius: '4px', width: '40%' }} />
        </div>
      ))}
    </div>
  );
};

export default { CardSkeleton, TableSkeleton };

import React from 'react';

interface SkeletonProps {
  className?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({ className = 'h-6 w-full' }) => {
  return (
    <div className={`animate-pulse bg-slate-700/50 rounded ${className}`} />
  );
};

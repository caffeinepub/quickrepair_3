import React from 'react';

interface SkeletonLoaderProps {
  height?: string;
  className?: string;
}

export default function SkeletonLoader({ height = '200px', className = '' }: SkeletonLoaderProps) {
  return (
    <div
      className={`w-full rounded-xl bg-surface-800 overflow-hidden relative ${className}`}
      style={{ height }}
    >
      <div className="absolute inset-0 skeleton-shimmer" />
    </div>
  );
}

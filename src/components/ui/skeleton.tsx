'use client'

import { motion } from 'framer-motion'

interface SkeletonProps {
  className?: string
  variant?: 'text' | 'circular' | 'rectangular'
  width?: string | number
  height?: string | number
  animation?: 'pulse' | 'wave' | 'none'
}

export function Skeleton({
  className = '',
  variant = 'text',
  width,
  height,
  animation = 'pulse'
}: SkeletonProps) {
  const baseClasses = 'bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200'

  const variantClasses = {
    text: 'rounded h-4',
    circular: 'rounded-full',
    rectangular: 'rounded-lg'
  }

  const getAnimationProps = () => {
    if (animation === 'pulse') {
      return {
        opacity: [0.5, 1, 0.5],
        transition: {
          duration: 1.5,
          repeat: Infinity,
          ease: 'easeInOut' as const
        }
      }
    }
    if (animation === 'wave') {
      return {
        backgroundPosition: ['200% 0', '-200% 0'],
        transition: {
          duration: 2,
          repeat: Infinity,
          ease: 'linear' as const
        }
      }
    }
    return {}
  }

  const style = {
    width: width || '100%',
    height: height || undefined,
    backgroundSize: animation === 'wave' ? '200% 100%' : undefined
  }

  return (
    <motion.div
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      style={style}
      animate={getAnimationProps()}
    />
  )
}

// Card Skeleton pré-configurado
export function CardSkeleton() {
  return (
    <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
      <div className="flex items-center gap-3 mb-4">
        <Skeleton variant="circular" width={40} height={40} />
        <div className="flex-1">
          <Skeleton width="60%" className="mb-2" />
          <Skeleton width="40%" />
        </div>
      </div>
      <Skeleton width="100%" height={80} className="mb-3" variant="rectangular" />
      <Skeleton width="70%" className="mb-2" />
      <Skeleton width="90%" className="mb-4" />
      <Skeleton width="100%" height={40} variant="rectangular" />
    </div>
  )
}

// Guideline Card Skeleton
export function GuidelineCardSkeleton() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <Skeleton variant="circular" width={48} height={48} />
          <Skeleton width={100} height={24} variant="rectangular" />
        </div>
        <Skeleton variant="circular" width={24} height={24} />
      </div>
      <Skeleton width="90%" height={24} className="mb-3" />
      <Skeleton width="100%" className="mb-2" />
      <Skeleton width="80%" className="mb-4" />
      <div className="flex items-center justify-between mb-4">
        <Skeleton width={120} />
        <Skeleton width={80} />
      </div>
      <Skeleton width="100%" height={44} variant="rectangular" />
    </motion.div>
  )
}

// Table Row Skeleton
export function TableRowSkeleton({ columns = 4 }: { columns?: number }) {
  return (
    <div className="flex items-center gap-4 py-4 border-b border-gray-100">
      {Array.from({ length: columns }).map((_, i) => (
        <Skeleton key={i} width={`${100 / columns}%`} />
      ))}
    </div>
  )
}

// Profile Skeleton
export function ProfileSkeleton() {
  return (
    <div className="flex items-center gap-4 p-4">
      <Skeleton variant="circular" width={64} height={64} />
      <div className="flex-1">
        <Skeleton width="40%" height={20} className="mb-2" />
        <Skeleton width="60%" />
      </div>
    </div>
  )
}

// Stats Grid Skeleton
export function StatsGridSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          className="bg-white rounded-xl p-6 border border-gray-200"
        >
          <Skeleton variant="circular" width={48} height={48} className="mb-4" />
          <Skeleton width="60%" height={32} className="mb-2" />
          <Skeleton width="80%" />
        </motion.div>
      ))}
    </div>
  )
}

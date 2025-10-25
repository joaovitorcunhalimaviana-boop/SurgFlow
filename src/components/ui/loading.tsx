'use client'

import React from 'react'
import { motion } from 'framer-motion'

interface LoadingProps {
  variant?: 'spinner' | 'dots' | 'pulse' | 'skeleton'
  size?: 'sm' | 'md' | 'lg'
  text?: string
  className?: string
}

export const Loading: React.FC<LoadingProps> = ({
  variant = 'spinner',
  size = 'md',
  text,
  className = ''
}) => {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-10 h-10',
    lg: 'w-16 h-16'
  }

  const dotSizes = {
    sm: 'w-2 h-2',
    md: 'w-3 h-3',
    lg: 'w-4 h-4'
  }

  if (variant === 'spinner') {
    return (
      <div className={`flex flex-col items-center justify-center gap-3 ${className}`}>
        <motion.div
          className={`${sizeClasses[size]} border-4 border-purple-200 border-t-purple-600 rounded-full`}
          animate={{ rotate: 360 }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        {text && (
          <motion.p
            className="text-sm text-gray-600 font-medium"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {text}
          </motion.p>
        )}
      </div>
    )
  }

  if (variant === 'dots') {
    return (
      <div className={`flex flex-col items-center justify-center gap-3 ${className}`}>
        <div className="flex gap-2">
          {[0, 1, 2].map((index) => (
            <motion.div
              key={index}
              className={`${dotSizes[size]} bg-gradient-to-br from-purple-600 to-purple-700 rounded-full`}
              animate={{
                y: ["0%", "-50%", "0%"],
                scale: [1, 1.2, 1]
              }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
                delay: index * 0.15,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
        {text && (
          <motion.p
            className="text-sm text-gray-600 font-medium"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {text}
          </motion.p>
        )}
      </div>
    )
  }

  if (variant === 'pulse') {
    return (
      <div className={`flex flex-col items-center justify-center gap-3 ${className}`}>
        <motion.div
          className={`${sizeClasses[size]} bg-gradient-to-br from-purple-500 to-purple-700 rounded-full`}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [1, 0.7, 1]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        {text && (
          <motion.p
            className="text-sm text-gray-600 font-medium"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {text}
          </motion.p>
        )}
      </div>
    )
  }

  // Skeleton variant
  return (
    <div className={`space-y-4 w-full ${className}`}>
      <div className="space-y-3">
        <motion.div
          className="h-4 bg-gray-200 rounded w-3/4"
          animate={{
            opacity: [0.5, 1, 0.5]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="h-4 bg-gray-200 rounded w-full"
          animate={{
            opacity: [0.5, 1, 0.5]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.2
          }}
        />
        <motion.div
          className="h-4 bg-gray-200 rounded w-5/6"
          animate={{
            opacity: [0.5, 1, 0.5]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.4
          }}
        />
      </div>
    </div>
  )
}

// Loading Overlay Component
interface LoadingOverlayProps {
  isLoading: boolean
  children: React.ReactNode
  variant?: 'spinner' | 'dots' | 'pulse'
  text?: string
}

export const LoadingOverlay: React.FC<LoadingOverlayProps> = ({
  isLoading,
  children,
  variant = 'spinner',
  text = 'Carregando...'
}) => {
  return (
    <div className="relative">
      {children}
      {isLoading && (
        <motion.div
          className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-50 rounded-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <Loading variant={variant} size="lg" text={text} />
        </motion.div>
      )}
    </div>
  )
}

export default Loading

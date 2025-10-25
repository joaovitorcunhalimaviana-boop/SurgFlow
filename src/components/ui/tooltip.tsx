'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface TooltipProps {
  children: React.ReactNode
  content: string
  position?: 'top' | 'bottom' | 'left' | 'right'
  delay?: number
}

export const Tooltip: React.FC<TooltipProps> = ({
  children,
  content,
  position = 'top',
  delay = 0
}) => {
  const [isVisible, setIsVisible] = useState(false)

  const getPositionStyles = () => {
    switch (position) {
      case 'top':
        return {
          bottom: '100%',
          left: '50%',
          transform: 'translateX(-50%)',
          marginBottom: '8px'
        }
      case 'bottom':
        return {
          top: '100%',
          left: '50%',
          transform: 'translateX(-50%)',
          marginTop: '8px'
        }
      case 'left':
        return {
          right: '100%',
          top: '50%',
          transform: 'translateY(-50%)',
          marginRight: '8px'
        }
      case 'right':
        return {
          left: '100%',
          top: '50%',
          transform: 'translateY(-50%)',
          marginLeft: '8px'
        }
    }
  }

  const getAnimationVariants = () => {
    switch (position) {
      case 'top':
        return {
          initial: { opacity: 0, y: 5 },
          animate: { opacity: 1, y: 0 },
          exit: { opacity: 0, y: 5 }
        }
      case 'bottom':
        return {
          initial: { opacity: 0, y: -5 },
          animate: { opacity: 1, y: 0 },
          exit: { opacity: 0, y: -5 }
        }
      case 'left':
        return {
          initial: { opacity: 0, x: 5 },
          animate: { opacity: 1, x: 0 },
          exit: { opacity: 0, x: 5 }
        }
      case 'right':
        return {
          initial: { opacity: 0, x: -5 },
          animate: { opacity: 1, x: 0 },
          exit: { opacity: 0, x: -5 }
        }
    }
  }

  const variants = getAnimationVariants()
  const positionStyles = getPositionStyles()

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            className="absolute z-50 pointer-events-none"
            style={positionStyles}
            initial={variants.initial}
            animate={variants.animate}
            exit={variants.exit}
            transition={{
              duration: 0.2,
              delay: delay / 1000,
              ease: 'easeOut'
            }}
          >
            <div className="relative">
              <div className="bg-gray-900 text-white text-xs font-medium px-3 py-2 rounded-lg shadow-lg whitespace-nowrap">
                {content}
              </div>
              {/* Arrow */}
              <div
                className="absolute w-2 h-2 bg-gray-900 transform rotate-45"
                style={
                  position === 'top'
                    ? { bottom: '-4px', left: '50%', marginLeft: '-4px' }
                    : position === 'bottom'
                    ? { top: '-4px', left: '50%', marginLeft: '-4px' }
                    : position === 'left'
                    ? { right: '-4px', top: '50%', marginTop: '-4px' }
                    : { left: '-4px', top: '50%', marginTop: '-4px' }
                }
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Tooltip

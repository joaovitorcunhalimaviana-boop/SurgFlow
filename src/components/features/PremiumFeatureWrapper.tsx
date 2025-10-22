'use client'

import React, { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import UpgradeModal from '@/components/subscription/UpgradeModal'
import { Lock, Crown } from 'lucide-react'

interface PremiumFeatureWrapperProps {
  children: React.ReactNode
  requiredPlan: 'guideflow' | 'mindflow'
  featureName: string
  className?: string
  showLockIcon?: boolean
}

const PremiumFeatureWrapper: React.FC<PremiumFeatureWrapperProps> = ({
  children,
  requiredPlan,
  featureName,
  className = '',
  showLockIcon = true
}) => {
  const { user, isAuthenticated } = useAuth()
  const [showUpgradeModal, setShowUpgradeModal] = useState(false)

  // Check if user has access to the required plan
  const hasAccess = () => {
    if (!isAuthenticated || !user) return false
    
    const planHierarchy = { teste: 0, guideflow: 1, mindflow: 2 }
    const userPlanLevel = planHierarchy[user.plan]
    const requiredPlanLevel = planHierarchy[requiredPlan]
    
    return userPlanLevel >= requiredPlanLevel
  }

  const handleClick = (e: React.MouseEvent) => {
    if (!hasAccess()) {
      e.preventDefault()
      e.stopPropagation()
      setShowUpgradeModal(true)
    }
  }

  if (hasAccess()) {
    return <>{children}</>
  }

  return (
    <>
      <div 
        className={`relative ${className}`}
        onClick={handleClick}
      >
        {/* Overlay for premium content */}
        <div className="relative">
          {/* Blurred content */}
          <div className="filter blur-sm pointer-events-none select-none">
            {children}
          </div>
          
          {/* Premium overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-white/50 to-transparent flex items-center justify-center cursor-pointer hover:from-white/95 hover:via-white/60 transition-all duration-300">
            <div className="text-center p-6 bg-white/90 backdrop-blur-sm rounded-xl border border-purple-200 shadow-lg">
              {showLockIcon && (
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  {requiredPlan === 'mindflow' ? (
                    <Crown className="h-6 w-6 text-purple-600" />
                  ) : (
                    <Lock className="h-6 w-6 text-purple-600" />
                  )}
                </div>
              )}
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Recurso Premium
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                {featureName} está disponível no plano {requiredPlan === 'guideflow' ? 'GuideFlow' : 'MindFlow'}
              </p>
              <div className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors">
                Fazer Upgrade
                <Crown className="h-4 w-4 ml-2" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <UpgradeModal
        isOpen={showUpgradeModal}
        onClose={() => setShowUpgradeModal(false)}
        requiredPlan={requiredPlan}
        currentFeature={featureName}
      />
    </>
  )
}

export default PremiumFeatureWrapper
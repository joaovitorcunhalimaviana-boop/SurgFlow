// Email Templates
export { default as EmailTemplate } from './EmailTemplate'
export { default as WelcomeEmail } from './WelcomeEmail'
export { default as ConfirmationEmail } from './ConfirmationEmail'
export { default as PasswordRecoveryEmail } from './PasswordRecoveryEmail'
export { default as PlanUpgradeEmail } from './PlanUpgradeEmail'
export { default as CancellationEmail } from './CancellationEmail'

// Types
export interface EmailTemplateProps {
  title: string
  preheader?: string
  children: React.ReactNode
}

export interface WelcomeEmailProps {
  userName: string
  userEmail: string
  plan: 'teste' | 'guideflow' | 'mindflow'
}

export interface ConfirmationEmailProps {
  userName: string
  userEmail: string
  confirmationToken: string
}

export interface PasswordRecoveryEmailProps {
  userName: string
  resetToken: string
  expirationTime?: string
}

export interface PlanUpgradeEmailProps {
  userName: string
  oldPlan: 'teste' | 'guideflow' | 'mindflow'
  newPlan: 'teste' | 'guideflow' | 'mindflow'
  upgradeDate: string
}

export interface CancellationEmailProps {
  userName: string
  cancelledPlan: 'guideflow' | 'mindflow'
  cancellationDate: string
  accessExpiryDate: string
  reason?: string
}
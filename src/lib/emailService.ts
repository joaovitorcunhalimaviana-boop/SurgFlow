import { renderToString } from 'react-dom/server'
import React from 'react'
import {
  WelcomeEmail,
  ConfirmationEmail,
  PasswordRecoveryEmail,
  PlanUpgradeEmail,
  CancellationEmail,
  type WelcomeEmailProps,
  type ConfirmationEmailProps,
  type PasswordRecoveryEmailProps,
  type PlanUpgradeEmailProps,
  type CancellationEmailProps
} from '@/components/emails'

// Email service configuration
interface EmailConfig {
  apiKey?: string
  apiUrl?: string
  fromEmail: string
  fromName: string
}

const emailConfig: EmailConfig = {
  apiKey: process.env.EMAIL_API_KEY,
  apiUrl: process.env.EMAIL_API_URL || 'https://api.resend.com/emails',
  fromEmail: process.env.FROM_EMAIL || 'noreply@surgflow.com.br',
  fromName: process.env.FROM_NAME || 'SurgFlow'
}

// Base email sending function
async function sendEmail(
  to: string,
  subject: string,
  htmlContent: string,
  textContent?: string
): Promise<boolean> {
  try {
    // In development, just log the email
    if (process.env.NODE_ENV === 'development') {
      console.log('📧 Email would be sent:')
      console.log('To:', to)
      console.log('Subject:', subject)
      console.log('HTML Content:', htmlContent.substring(0, 200) + '...')
      return true
    }

    // In production, use actual email service (Resend, SendGrid, etc.)
    const response = await fetch(emailConfig.apiUrl!, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${emailConfig.apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: `${emailConfig.fromName} <${emailConfig.fromEmail}>`,
        to: [to],
        subject,
        html: htmlContent,
        text: textContent
      })
    })

    if (!response.ok) {
      throw new Error(`Email service responded with status: ${response.status}`)
    }

    return true
  } catch (error) {
    console.error('Error sending email:', error)
    return false
  }
}

// Email service functions
export const emailService = {
  // Welcome email for new users
  async sendWelcomeEmail(props: WelcomeEmailProps): Promise<boolean> {
    try {
      const htmlContent = renderToString(React.createElement(WelcomeEmail, props))
      const subject = `Bem-vindo ao SurgFlow, ${props.userName}!`
      
      return await sendEmail(props.userEmail, subject, htmlContent)
    } catch (error) {
      console.error('Error sending welcome email:', error)
      return false
    }
  },

  // Email confirmation for new registrations
  async sendConfirmationEmail(props: ConfirmationEmailProps): Promise<boolean> {
    try {
      const htmlContent = renderToString(React.createElement(ConfirmationEmail, props))
      const subject = 'Confirme seu email - SurgFlow'
      
      return await sendEmail(props.userEmail, subject, htmlContent)
    } catch (error) {
      console.error('Error sending confirmation email:', error)
      return false
    }
  },

  // Password recovery email
  async sendPasswordRecoveryEmail(
    userEmail: string, 
    props: PasswordRecoveryEmailProps
  ): Promise<boolean> {
    try {
      const htmlContent = renderToString(React.createElement(PasswordRecoveryEmail, props))
      const subject = 'Recuperação de senha - SurgFlow'
      
      return await sendEmail(userEmail, subject, htmlContent)
    } catch (error) {
      console.error('Error sending password recovery email:', error)
      return false
    }
  },

  // Plan upgrade confirmation email
  async sendPlanUpgradeEmail(
    userEmail: string,
    props: PlanUpgradeEmailProps
  ): Promise<boolean> {
    try {
      const htmlContent = renderToString(React.createElement(PlanUpgradeEmail, props))
      const planNames = {
        teste: 'Plano Teste',
        guideflow: 'GuideFlow',
        mindflow: 'MindFlow'
      }
      const subject = `Upgrade confirmado - Bem-vindo ao ${planNames[props.newPlan]}!`
      
      return await sendEmail(userEmail, subject, htmlContent)
    } catch (error) {
      console.error('Error sending plan upgrade email:', error)
      return false
    }
  },

  // Subscription cancellation email
  async sendCancellationEmail(
    userEmail: string,
    props: CancellationEmailProps
  ): Promise<boolean> {
    try {
      const htmlContent = renderToString(React.createElement(CancellationEmail, props))
      const subject = 'Cancelamento confirmado - SurgFlow'
      
      return await sendEmail(userEmail, subject, htmlContent)
    } catch (error) {
      console.error('Error sending cancellation email:', error)
      return false
    }
  },

  // Generic email sender for custom content
  async sendCustomEmail(
    to: string,
    subject: string,
    htmlContent: string,
    textContent?: string
  ): Promise<boolean> {
    return await sendEmail(to, subject, htmlContent, textContent)
  }
}

// Utility functions for email templates
export const emailUtils = {
  // Generate secure token for email verification/password reset
  generateSecureToken(): string {
    return Math.random().toString(36).substring(2, 15) + 
           Math.random().toString(36).substring(2, 15) +
           Date.now().toString(36)
  },

  // Format date for email display
  formatDate(date: Date): string {
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  },

  // Calculate expiry date (default 24 hours)
  getExpiryDate(hours: number = 24): string {
    const expiryDate = new Date()
    expiryDate.setHours(expiryDate.getHours() + hours)
    return this.formatDate(expiryDate)
  }
}

export default emailService
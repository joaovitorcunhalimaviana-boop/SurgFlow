'use client'

import React from 'react'
import EmailTemplate from './EmailTemplate'

interface PasswordRecoveryEmailProps {
  userName: string
  resetToken: string
  expirationTime?: string
}

export const PasswordRecoveryEmail: React.FC<PasswordRecoveryEmailProps> = ({
  userName,
  resetToken,
  expirationTime = '1 hora'
}) => {
  const resetUrl = `https://surgflow.com.br/redefinir-senha?token=${resetToken}`

  return (
    <EmailTemplate
      title="Recuperação de Senha - SurgFlow"
      preheader="Recebemos uma solicitação para redefinir sua senha. Clique no link para criar uma nova senha."
    >
      <h1 style={{ 
        color: '#1e293b', 
        fontSize: '24px', 
        fontWeight: 'bold', 
        marginBottom: '20px',
        textAlign: 'center'
      }}>
        🔐 Recuperação de Senha
      </h1>

      <p style={{ fontSize: '16px', marginBottom: '20px' }}>
        Olá <strong>{userName}</strong>,
      </p>

      <p style={{ fontSize: '16px', marginBottom: '20px' }}>
        Recebemos uma solicitação para redefinir a senha da sua conta no SurgFlow. 
        Se você fez esta solicitação, clique no botão abaixo para criar uma nova senha.
      </p>

      {/* Alerta de Segurança */}
      <div style={{
        backgroundColor: '#fef3c7',
        border: '1px solid #f59e0b',
        borderRadius: '8px',
        padding: '15px',
        marginBottom: '25px'
      }}>
        <div style={{ display: 'flex', alignItems: 'flex-start' }}>
          <span style={{ fontSize: '18px', marginRight: '10px' }}>⚠️</span>
          <div>
            <p style={{ 
              margin: '0 0 5px 0', 
              fontWeight: '600', 
              color: '#92400e' 
            }}>
              Importante:
            </p>
            <p style={{ 
              margin: '0', 
              fontSize: '14px', 
              color: '#92400e' 
            }}>
              Este link é válido por apenas <strong>{expirationTime}</strong> e pode ser usado apenas uma vez.
            </p>
          </div>
        </div>
      </div>

      {/* Botão de Redefinição */}
      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <a 
          href={resetUrl}
          className="button"
          style={{
            display: 'inline-block',
            background: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)',
            color: '#ffffff',
            textDecoration: 'none',
            padding: '15px 30px',
            borderRadius: '6px',
            fontWeight: '600',
            fontSize: '16px',
            margin: '20px 0'
          }}
        >
          Redefinir Minha Senha
        </a>
      </div>

      {/* Link Alternativo */}
      <div style={{
        backgroundColor: '#f8fafc',
        border: '1px solid #e2e8f0',
        borderRadius: '8px',
        padding: '15px',
        marginBottom: '25px'
      }}>
        <p style={{ 
          margin: '0 0 10px 0', 
          fontSize: '14px', 
          fontWeight: '600',
          color: '#374151'
        }}>
          Não consegue clicar no botão? Copie e cole este link no seu navegador:
        </p>
        <p style={{ 
          margin: '0',
          fontSize: '12px',
          color: '#6b7280',
          wordBreak: 'break-all',
          backgroundColor: '#ffffff',
          padding: '8px',
          borderRadius: '4px',
          border: '1px solid #d1d5db'
        }}>
          {resetUrl}
        </p>
      </div>

      <div className="divider" style={{
        height: '1px',
        backgroundColor: '#e2e8f0',
        margin: '30px 0'
      }}></div>

      {/* Instruções de Segurança */}
      <h2 style={{ 
        color: '#1e293b', 
        fontSize: '18px', 
        fontWeight: 'bold', 
        marginBottom: '15px'
      }}>
        Não solicitou esta alteração?
      </h2>

      <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '15px' }}>
        Se você não solicitou a redefinição de senha, pode ignorar este email com segurança. 
        Sua senha atual permanecerá inalterada.
      </p>

      <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '20px' }}>
        Por segurança, recomendamos que você:
      </p>

      <ul style={{ 
        paddingLeft: '20px', 
        margin: '0 0 20px 0',
        color: '#64748b',
        fontSize: '14px'
      }}>
        <li style={{ marginBottom: '5px' }}>
          Verifique se não há atividade suspeita em sua conta
        </li>
        <li style={{ marginBottom: '5px' }}>
          Use uma senha forte e única para o SurgFlow
        </li>
        <li style={{ marginBottom: '5px' }}>
          Nunca compartilhe suas credenciais com terceiros
        </li>
      </ul>

      {/* Informações de Contato */}
      <div style={{
        backgroundColor: '#f1f5f9',
        border: '1px solid #cbd5e1',
        borderRadius: '8px',
        padding: '15px',
        marginBottom: '20px'
      }}>
        <p style={{ 
          margin: '0 0 10px 0', 
          fontSize: '14px', 
          fontWeight: '600',
          color: '#374151'
        }}>
          Precisa de ajuda?
        </p>
        <p style={{ 
          margin: '0',
          fontSize: '14px',
          color: '#64748b'
        }}>
          Se você está tendo problemas para redefinir sua senha ou suspeita de atividade não autorizada, 
          entre em contato conosco imediatamente através do email{' '}
          <a href="mailto:suporte@surgflow.com.br" style={{ color: '#7c3aed' }}>
            suporte@surgflow.com.br
          </a>
        </p>
      </div>

      <p style={{ fontSize: '14px', color: '#64748b', textAlign: 'center' }}>
        Equipe SurgFlow 🛡️
      </p>
    </EmailTemplate>
  )
}

export default PasswordRecoveryEmail
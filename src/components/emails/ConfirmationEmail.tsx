'use client'

import React from 'react'
import EmailTemplate from './EmailTemplate'

interface ConfirmationEmailProps {
  userName: string
  userEmail: string
  confirmationToken: string
}

export const ConfirmationEmail: React.FC<ConfirmationEmailProps> = ({
  userName,
  userEmail,
  confirmationToken
}) => {
  const confirmationUrl = `https://surgflow.com.br/confirmar-email?token=${confirmationToken}`

  return (
    <EmailTemplate
      title="Confirme seu Email - SurgFlow"
      preheader="Confirme seu endereço de email para ativar sua conta no SurgFlow e começar sua jornada de aprendizado."
    >
      <h1 style={{ 
        color: '#1e293b', 
        fontSize: '24px', 
        fontWeight: 'bold', 
        marginBottom: '20px',
        textAlign: 'center'
      }}>
        📧 Confirme seu Email
      </h1>

      <p style={{ fontSize: '16px', marginBottom: '20px' }}>
        Olá <strong>{userName}</strong>,
      </p>

      <p style={{ fontSize: '16px', marginBottom: '20px' }}>
        Obrigado por se cadastrar no SurgFlow! Para garantir a segurança da sua conta e 
        começar a aproveitar todos os recursos da nossa plataforma, precisamos confirmar 
        seu endereço de email.
      </p>

      {/* Informações da Conta */}
      <div style={{
        backgroundColor: '#f8fafc',
        border: '1px solid #e2e8f0',
        borderRadius: '8px',
        padding: '20px',
        marginBottom: '25px'
      }}>
        <h3 style={{ 
          margin: '0 0 15px 0', 
          fontSize: '16px', 
          fontWeight: '600',
          color: '#374151'
        }}>
          📋 Detalhes da sua conta:
        </h3>
        <div style={{ fontSize: '14px', color: '#64748b' }}>
          <p style={{ margin: '0 0 8px 0' }}>
            <strong>Nome:</strong> {userName}
          </p>
          <p style={{ margin: '0' }}>
            <strong>Email:</strong> {userEmail}
          </p>
        </div>
      </div>

      {/* Botão de Confirmação */}
      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <a 
          href={confirmationUrl}
          className="button"
          style={{
            display: 'inline-block',
            background: 'linear-gradient(135deg, #16a34a 0%, #15803d 100%)',
            color: '#ffffff',
            textDecoration: 'none',
            padding: '15px 30px',
            borderRadius: '6px',
            fontWeight: '600',
            fontSize: '16px',
            margin: '20px 0'
          }}
        >
          ✅ Confirmar Meu Email
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
          {confirmationUrl}
        </p>
      </div>

      {/* Benefícios após Confirmação */}
      <h2 style={{ 
        color: '#1e293b', 
        fontSize: '18px', 
        fontWeight: 'bold', 
        marginBottom: '15px'
      }}>
        🎯 Após confirmar seu email, você terá acesso a:
      </h2>

      <div style={{
        backgroundColor: '#f0fdf4',
        border: '1px solid #bbf7d0',
        borderRadius: '8px',
        padding: '20px',
        marginBottom: '30px'
      }}>
        <ul style={{ 
          paddingLeft: '20px', 
          margin: '0',
          color: '#166534'
        }}>
          <li style={{ marginBottom: '8px', fontSize: '14px' }}>
            ✅ Guidelines cirúrgicos baseados em evidências
          </li>
          <li style={{ marginBottom: '8px', fontSize: '14px' }}>
            ✅ Protocolos atualizados das principais sociedades médicas
          </li>
          <li style={{ marginBottom: '8px', fontSize: '14px' }}>
            ✅ Sistema de favoritos para salvar conteúdos importantes
          </li>
          <li style={{ marginBottom: '8px', fontSize: '14px' }}>
            ✅ Acesso à comunidade médica do SurgFlow
          </li>
          <li style={{ marginBottom: '8px', fontSize: '14px' }}>
            ✅ Notificações sobre atualizações de guidelines
          </li>
          <li style={{ marginBottom: '0', fontSize: '14px' }}>
            ✅ Suporte técnico especializado
          </li>
        </ul>
      </div>

      <div className="divider" style={{
        height: '1px',
        backgroundColor: '#e2e8f0',
        margin: '30px 0'
      }}></div>

      {/* Informações Importantes */}
      <div style={{
        backgroundColor: '#fef3c7',
        border: '1px solid #f59e0b',
        borderRadius: '8px',
        padding: '15px',
        marginBottom: '25px'
      }}>
        <div style={{ display: 'flex', alignItems: 'flex-start' }}>
          <span style={{ fontSize: '18px', marginRight: '10px' }}>⏰</span>
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
              Este link de confirmação é válido por <strong>24 horas</strong>. 
              Após este período, você precisará solicitar um novo link de confirmação.
            </p>
          </div>
        </div>
      </div>

      {/* Problemas com Confirmação */}
      <h3 style={{ 
        color: '#1e293b', 
        fontSize: '16px', 
        fontWeight: 'bold', 
        marginBottom: '10px'
      }}>
        🤔 Não recebeu este email ou está com problemas?
      </h3>

      <div style={{ fontSize: '14px', color: '#64748b', marginBottom: '20px' }}>
        <p style={{ margin: '0 0 10px 0' }}>
          Se você não solicitou este cadastro, pode ignorar este email com segurança.
        </p>
        <p style={{ margin: '0 0 10px 0' }}>
          Se está tendo problemas para confirmar seu email:
        </p>
        <ul style={{ paddingLeft: '20px', margin: '0 0 15px 0' }}>
          <li style={{ marginBottom: '5px' }}>
            Verifique sua pasta de spam ou lixo eletrônico
          </li>
          <li style={{ marginBottom: '5px' }}>
            Certifique-se de que o email {userEmail} está correto
          </li>
          <li style={{ marginBottom: '5px' }}>
            Tente acessar o link em um navegador diferente
          </li>
        </ul>
      </div>

      {/* Suporte */}
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
          Nossa equipe está pronta para ajudar! Entre em contato conosco através do email{' '}
          <a href="mailto:suporte@surgflow.com.br" style={{ color: '#7c3aed' }}>
            suporte@surgflow.com.br
          </a>{' '}
          e resolveremos qualquer problema rapidamente.
        </p>
      </div>

      <p style={{ fontSize: '16px', fontWeight: '600', color: '#1e293b', textAlign: 'center' }}>
        Estamos ansiosos para tê-lo conosco! 🚀
      </p>
    </EmailTemplate>
  )
}

export default ConfirmationEmail
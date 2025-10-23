'use client'

import React from 'react'
import EmailTemplate from './EmailTemplate'

interface CancellationEmailProps {
  userName: string
  cancelledPlan: 'guideflow' | 'mindflow'
  cancellationDate: string
  accessExpiryDate: string
  reason?: string
}

export const CancellationEmail: React.FC<CancellationEmailProps> = ({
  userName,
  cancelledPlan,
  cancellationDate,
  accessExpiryDate,
  reason
}) => {
  const planInfo = {
    guideflow: {
      name: 'GuideFlow',
      color: '#7c3aed'
    },
    mindflow: {
      name: 'MindFlow',
      color: '#f59e0b'
    }
  }

  return (
    <EmailTemplate
      title="Cancelamento Confirmado - SurgFlow"
      preheader={`Seu plano ${planInfo[cancelledPlan].name} foi cancelado. Você ainda tem acesso até ${accessExpiryDate}.`}
    >
      <h1 style={{ 
        color: '#1e293b', 
        fontSize: '24px', 
        fontWeight: 'bold', 
        marginBottom: '20px',
        textAlign: 'center'
      }}>
        😔 Cancelamento Confirmado
      </h1>

      <p style={{ fontSize: '16px', marginBottom: '20px' }}>
        Olá <strong>{userName}</strong>,
      </p>

      <p style={{ fontSize: '16px', marginBottom: '25px' }}>
        Confirmamos o cancelamento da sua assinatura do plano <strong>{planInfo[cancelledPlan].name}</strong> 
        em <strong>{cancellationDate}</strong>. Lamentamos vê-lo partir! 😢
      </p>

      {/* Informações do Cancelamento */}
      <div style={{
        backgroundColor: '#fef2f2',
        border: '1px solid #fecaca',
        borderRadius: '8px',
        padding: '20px',
        marginBottom: '25px'
      }}>
        <h3 style={{ 
          margin: '0 0 15px 0', 
          fontSize: '16px', 
          fontWeight: '600',
          color: '#991b1b'
        }}>
          📋 Detalhes do Cancelamento:
        </h3>
        <div style={{ fontSize: '14px', color: '#7f1d1d' }}>
          <p style={{ margin: '0 0 8px 0' }}>
            <strong>Plano Cancelado:</strong> {planInfo[cancelledPlan].name}
          </p>
          <p style={{ margin: '0 0 8px 0' }}>
            <strong>Data do Cancelamento:</strong> {cancellationDate}
          </p>
          <p style={{ margin: '0 0 8px 0' }}>
            <strong>Acesso válido até:</strong> {accessExpiryDate}
          </p>
          {reason && (
            <p style={{ margin: '0' }}>
              <strong>Motivo:</strong> {reason}
            </p>
          )}
        </div>
      </div>

      {/* Acesso Restante */}
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
              Você ainda tem acesso completo a todos os recursos do seu plano até <strong>{accessExpiryDate}</strong>. 
              Após esta data, sua conta será automaticamente convertida para o Plano Teste gratuito.
            </p>
          </div>
        </div>
      </div>

      {/* O que você ainda pode fazer */}
      <h2 style={{ 
        color: '#1e293b', 
        fontSize: '18px', 
        fontWeight: 'bold', 
        marginBottom: '15px'
      }}>
        📚 O que você ainda pode fazer até {accessExpiryDate}:
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
            ✅ Acessar todos os guidelines e protocolos
          </li>
          <li style={{ marginBottom: '8px', fontSize: '14px' }}>
            ✅ Baixar conteúdos em PDF para referência futura
          </li>
          <li style={{ marginBottom: '8px', fontSize: '14px' }}>
            ✅ Usar todas as calculadoras médicas
          </li>
          {cancelledPlan === 'mindflow' && (
            <>
              <li style={{ marginBottom: '8px', fontSize: '14px' }}>
                ✅ Participar do grupo VIP no WhatsApp
              </li>
            </>
          )}
          <li style={{ marginBottom: '0', fontSize: '14px' }}>
            ✅ Exportar seus guidelines favoritos
          </li>
        </ul>
      </div>

      {/* Oferta de Retenção */}
      <div style={{
        backgroundColor: '#eff6ff',
        border: '2px solid #3b82f6',
        borderRadius: '8px',
        padding: '20px',
        marginBottom: '30px'
      }}>
        <h3 style={{ 
          margin: '0 0 15px 0', 
          fontSize: '18px', 
          fontWeight: 'bold',
          color: '#1e40af',
          textAlign: 'center'
        }}>
          🎁 Oferta Especial de Retenção
        </h3>
        <p style={{ 
          margin: '0 0 15px 0',
          fontSize: '16px',
          color: '#1e40af',
          textAlign: 'center'
        }}>
          Que tal reconsiderar? Temos uma oferta especial para você!
        </p>
        <div style={{ textAlign: 'center' }}>
          <p style={{ 
            margin: '0 0 15px 0',
            fontSize: '14px',
            color: '#3730a3'
          }}>
            <strong>30% de desconto</strong> no seu próximo mês se você reativar até {accessExpiryDate}
          </p>
          <a 
            href="https://surgflow.com.br/reativar" 
            className="button"
            style={{
              display: 'inline-block',
              background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
              color: '#ffffff',
              textDecoration: 'none',
              padding: '12px 24px',
              borderRadius: '6px',
              fontWeight: '600',
              fontSize: '14px'
            }}
          >
            Reativar com Desconto
          </a>
        </div>
      </div>

      {/* Plano Teste */}
      <h2 style={{ 
        color: '#1e293b', 
        fontSize: '18px', 
        fontWeight: 'bold', 
        marginBottom: '15px'
      }}>
        🆓 Após {accessExpiryDate} - Plano Teste Gratuito:
      </h2>

      <div style={{
        backgroundColor: '#f8fafc',
        border: '1px solid #e2e8f0',
        borderRadius: '8px',
        padding: '20px',
        marginBottom: '30px'
      }}>
        <p style={{ 
          margin: '0 0 15px 0',
          fontSize: '14px',
          color: '#64748b'
        }}>
          Sua conta não será excluída! Você ainda terá acesso a:
        </p>
        <ul style={{ 
          paddingLeft: '20px', 
          margin: '0',
          color: '#64748b',
          fontSize: '14px'
        }}>
          <li style={{ marginBottom: '5px' }}>
            Guidelines básicos de Apendicite e Colecistite
          </li>
          <li style={{ marginBottom: '5px' }}>
            Sistema de favoritos
          </li>
          <li style={{ marginBottom: '5px' }}>
            Acesso à comunidade
          </li>
          <li style={{ marginBottom: '0' }}>
            Possibilidade de upgrade a qualquer momento
          </li>
        </ul>
      </div>

      <div className="divider" style={{
        height: '1px',
        backgroundColor: '#e2e8f0',
        margin: '30px 0'
      }}></div>

      {/* Feedback */}
      <div style={{
        backgroundColor: '#f1f5f9',
        border: '1px solid #cbd5e1',
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
          💬 Seu Feedback é Importante
        </h3>
        <p style={{ 
          margin: '0 0 15px 0',
          fontSize: '14px',
          color: '#64748b'
        }}>
          Gostaríamos muito de saber como podemos melhorar. Sua opinião nos ajuda a criar 
          uma experiência ainda melhor para todos os médicos.
        </p>
        <div style={{ textAlign: 'center' }}>
          <a 
            href="https://surgflow.com.br/feedback" 
            className="button"
            style={{
              display: 'inline-block',
              background: 'linear-gradient(135deg, #64748b 0%, #475569 100%)',
              color: '#ffffff',
              textDecoration: 'none',
              padding: '10px 20px',
              borderRadius: '6px',
              fontWeight: '600',
              fontSize: '14px'
            }}
          >
            Deixar Feedback
          </a>
        </div>
      </div>

      {/* Reativação Futura */}
      <h3 style={{ 
        color: '#1e293b', 
        fontSize: '16px', 
        fontWeight: 'bold', 
        marginBottom: '10px'
      }}>
        🔄 Quer voltar no futuro?
      </h3>

      <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '20px' }}>
        Você pode reativar sua assinatura a qualquer momento! Todos os seus dados, 
        favoritos e preferências serão mantidos. Basta fazer login na sua conta e 
        escolher um novo plano.
      </p>

      {/* Suporte */}
      <div style={{
        backgroundColor: '#f0fdf4',
        border: '1px solid #bbf7d0',
        borderRadius: '8px',
        padding: '15px',
        marginBottom: '20px'
      }}>
        <p style={{ 
          margin: '0 0 10px 0', 
          fontSize: '14px', 
          fontWeight: '600',
          color: '#166534'
        }}>
          Precisa de ajuda ou tem dúvidas?
        </p>
        <p style={{ 
          margin: '0',
          fontSize: '14px',
          color: '#166534'
        }}>
          Nossa equipe continua disponível para ajudar! Entre em contato através do email{' '}
          <a href="mailto:suporte@surgflow.com.br" style={{ color: '#166534', fontWeight: '600' }}>
            suporte@surgflow.com.br
          </a>
        </p>
      </div>

      <p style={{ fontSize: '16px', fontWeight: '600', color: '#1e293b', textAlign: 'center' }}>
        Obrigado por ter feito parte da família SurgFlow! 🙏
      </p>
      
      <p style={{ fontSize: '14px', color: '#64748b', textAlign: 'center', marginTop: '10px' }}>
        Esperamos vê-lo novamente em breve! 💙
      </p>
    </EmailTemplate>
  )
}

export default CancellationEmail
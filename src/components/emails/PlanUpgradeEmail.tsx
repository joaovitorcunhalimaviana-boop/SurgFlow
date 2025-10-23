'use client'

import React from 'react'
import EmailTemplate from './EmailTemplate'

interface PlanUpgradeEmailProps {
  userName: string
  oldPlan: 'teste' | 'guideflow' | 'mindflow'
  newPlan: 'teste' | 'guideflow' | 'mindflow'
  upgradeDate: string
}

export const PlanUpgradeEmail: React.FC<PlanUpgradeEmailProps> = ({
  userName,
  oldPlan,
  newPlan,
  upgradeDate
}) => {
  const planInfo = {
    teste: {
      name: 'Plano Teste',
      color: '#64748b'
    },
    guideflow: {
      name: 'GuideFlow',
      color: '#7c3aed'
    },
    mindflow: {
      name: 'MindFlow',
      color: '#f59e0b'
    }
  }

  const newFeatures = {
    guideflow: [
      'Acesso a todos os guidelines disponíveis',
      'Protocolos cirúrgicos detalhados',
      'Calculadoras médicas avançadas',
      'Downloads em PDF de todos os conteúdos',
      'Atualizações em tempo real'
    ],
    mindflow: [
      'Todos os recursos do GuideFlow',
      'Acesso ao Grupo VIP no WhatsApp',
      'Casos clínicos complexos e raros',
      'Acesso antecipado a novos conteúdos',
      'Sessões de discussão de casos ao vivo',
      'Certificados de participação'
    ]
  }

  const currentFeatures = newFeatures[newPlan as keyof typeof newFeatures] || []

  return (
    <EmailTemplate
      title={`Upgrade Confirmado - Bem-vindo ao ${planInfo[newPlan].name}!`}
      preheader={`Seu plano foi atualizado com sucesso para ${planInfo[newPlan].name}. Aproveite todos os novos recursos!`}
    >
      <h1 style={{ 
        color: '#1e293b', 
        fontSize: '24px', 
        fontWeight: 'bold', 
        marginBottom: '20px',
        textAlign: 'center'
      }}>
        🎉 Upgrade Realizado com Sucesso!
      </h1>

      <p style={{ fontSize: '16px', marginBottom: '20px' }}>
        Olá <strong>{userName}</strong>,
      </p>

      <p style={{ fontSize: '16px', marginBottom: '25px' }}>
        Parabéns! Seu plano foi atualizado com sucesso em <strong>{upgradeDate}</strong>.
      </p>

      {/* Comparação de Planos */}
      <div style={{
        backgroundColor: '#f8fafc',
        border: '1px solid #e2e8f0',
        borderRadius: '8px',
        padding: '20px',
        marginBottom: '30px'
      }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginBottom: '15px'
        }}>
          <div style={{ textAlign: 'center', flex: 1 }}>
            <div style={{
              backgroundColor: '#e2e8f0',
              color: '#64748b',
              padding: '8px 16px',
              borderRadius: '20px',
              fontSize: '14px',
              fontWeight: '600',
              display: 'inline-block'
            }}>
              {planInfo[oldPlan].name}
            </div>
            <p style={{ margin: '5px 0 0 0', fontSize: '12px', color: '#94a3b8' }}>
              Plano Anterior
            </p>
          </div>
          
          <div style={{ 
            fontSize: '24px', 
            margin: '0 20px',
            color: '#7c3aed'
          }}>
            →
          </div>
          
          <div style={{ textAlign: 'center', flex: 1 }}>
            <div style={{
              backgroundColor: planInfo[newPlan].color,
              color: '#ffffff',
              padding: '8px 16px',
              borderRadius: '20px',
              fontSize: '14px',
              fontWeight: '600',
              display: 'inline-block'
            }}>
              {planInfo[newPlan].name}
            </div>
            <p style={{ margin: '5px 0 0 0', fontSize: '12px', color: '#94a3b8' }}>
              Plano Atual
            </p>
          </div>
        </div>
      </div>

      {/* Novos Recursos */}
      <h2 style={{ 
        color: '#1e293b', 
        fontSize: '18px', 
        fontWeight: 'bold', 
        marginBottom: '15px'
      }}>
        🚀 Seus Novos Recursos:
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
          {currentFeatures.map((feature, index) => (
            <li key={index} style={{ marginBottom: '8px', fontSize: '14px' }}>
              ✅ {feature}
            </li>
          ))}
        </ul>
      </div>

      {/* Próximos Passos */}
      <h2 style={{ 
        color: '#1e293b', 
        fontSize: '18px', 
        fontWeight: 'bold', 
        marginBottom: '15px'
      }}>
        📋 Próximos Passos:
      </h2>

      <div style={{ marginBottom: '30px' }}>
        <div style={{ marginBottom: '15px' }}>
          <strong>1. Explore os Novos Recursos</strong>
          <p style={{ margin: '5px 0 0 0', color: '#64748b', fontSize: '14px' }}>
            Faça login na plataforma e explore todos os novos recursos disponíveis no seu plano.
          </p>
        </div>
        
        {newPlan === 'mindflow' && (
          <>
            <div style={{ marginBottom: '15px' }}>
              <strong>2. Acesse o Grupo VIP</strong>
              <p style={{ margin: '5px 0 0 0', color: '#64748b', fontSize: '14px' }}>
                Você receberá um convite para o grupo VIP do WhatsApp em até 24 horas.
              </p>
            </div>
          </>
        )}
        
        <div style={{ marginBottom: '15px' }}>
          <strong>{newPlan === 'mindflow' ? '3' : '2'}. Baixe o App Mobile</strong>
          <p style={{ margin: '5px 0 0 0', color: '#64748b', fontSize: '14px' }}>
            Tenha acesso aos guidelines onde estiver com nosso aplicativo mobile (em breve).
          </p>
        </div>
      </div>

      {/* Botão de Ação */}
      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <a 
          href="https://surgflow.com.br/dashboard" 
          className="button"
          style={{
            display: 'inline-block',
            background: `linear-gradient(135deg, ${planInfo[newPlan].color} 0%, ${planInfo[newPlan].color}dd 100%)`,
            color: '#ffffff',
            textDecoration: 'none',
            padding: '15px 30px',
            borderRadius: '6px',
            fontWeight: '600',
            fontSize: '16px',
            margin: '20px 0'
          }}
        >
          Explorar Novos Recursos
        </a>
      </div>

      <div className="divider" style={{
        height: '1px',
        backgroundColor: '#e2e8f0',
        margin: '30px 0'
      }}></div>

      {/* Informações de Faturamento */}
      <div style={{
        backgroundColor: '#f8fafc',
        border: '1px solid #e2e8f0',
        borderRadius: '8px',
        padding: '15px',
        marginBottom: '25px'
      }}>
        <h3 style={{ 
          margin: '0 0 10px 0', 
          fontSize: '16px', 
          fontWeight: '600',
          color: '#374151'
        }}>
          💳 Informações de Cobrança
        </h3>
        <p style={{ 
          margin: '0',
          fontSize: '14px',
          color: '#64748b'
        }}>
          Seu novo plano entrará em vigor imediatamente. A próxima cobrança será processada 
          de acordo com o ciclo de faturamento do seu novo plano. Você pode visualizar 
          todos os detalhes na área "Meus Planos" da plataforma.
        </p>
      </div>

      <p style={{ fontSize: '16px', fontWeight: '600', color: '#1e293b', textAlign: 'center' }}>
        Obrigado por confiar no SurgFlow! 🙏
      </p>
    </EmailTemplate>
  )
}

export default PlanUpgradeEmail
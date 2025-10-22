'use client'

import React from 'react'
import EmailTemplate from './EmailTemplate'

interface WelcomeEmailProps {
  userName: string
  userEmail: string
  plan: 'teste' | 'guideflow' | 'mindflow'
}

export const WelcomeEmail: React.FC<WelcomeEmailProps> = ({
  userName,
  userEmail,
  plan
}) => {
  const planInfo = {
    teste: {
      name: 'Plano Teste',
      description: 'Acesso gratuito aos guidelines básicos',
      features: [
        'Guidelines de Apendicite',
        'Guidelines de Colecistite',
        'Salvamento de favoritos',
        'Acesso à comunidade'
      ]
    },
    guideflow: {
      name: 'GuideFlow',
      description: 'Acesso completo aos guias e protocolos',
      features: [
        'Todos os guidelines disponíveis',
        'Protocolos detalhados',
        'Calculadoras médicas',
        'Downloads em PDF',
        'Suporte prioritário'
      ]
    },
    mindflow: {
      name: 'MindFlow',
      description: 'Acesso total + Grupo VIP + Mentorias',
      features: [
        'Tudo do GuideFlow',
        'Grupo VIP no WhatsApp',
        'Mentorias exclusivas',
        'Casos clínicos avançados',
        'Acesso antecipado a novos conteúdos'
      ]
    }
  }

  const currentPlan = planInfo[plan]

  return (
    <EmailTemplate
      title={`Bem-vindo ao SurgFlow, ${userName}!`}
      preheader="Sua conta foi criada com sucesso. Comece sua jornada de aprendizado agora!"
    >
      <h1 style={{ 
        color: '#1e293b', 
        fontSize: '24px', 
        fontWeight: 'bold', 
        marginBottom: '20px',
        textAlign: 'center'
      }}>
        🎉 Bem-vindo ao SurgFlow!
      </h1>

      <p style={{ fontSize: '16px', marginBottom: '20px' }}>
        Olá <strong>{userName}</strong>,
      </p>

      <p style={{ fontSize: '16px', marginBottom: '20px' }}>
        Sua conta foi criada com sucesso! Estamos muito felizes em tê-lo conosco na maior plataforma 
        de guidelines cirúrgicos do Brasil.
      </p>

      {/* Informações do Plano */}
      <div style={{
        backgroundColor: '#f8fafc',
        border: '1px solid #e2e8f0',
        borderRadius: '8px',
        padding: '20px',
        marginBottom: '30px'
      }}>
        <h2 style={{ 
          color: '#7c3aed', 
          fontSize: '18px', 
          fontWeight: 'bold', 
          marginBottom: '10px',
          margin: '0 0 10px 0'
        }}>
          Seu Plano: {currentPlan.name}
        </h2>
        <p style={{ 
          color: '#64748b', 
          fontSize: '14px', 
          marginBottom: '15px',
          margin: '0 0 15px 0'
        }}>
          {currentPlan.description}
        </p>
        
        <h3 style={{ 
          fontSize: '16px', 
          fontWeight: '600', 
          marginBottom: '10px',
          margin: '0 0 10px 0'
        }}>
          O que você tem acesso:
        </h3>
        <ul style={{ 
          paddingLeft: '20px', 
          margin: '0',
          color: '#334155'
        }}>
          {currentPlan.features.map((feature, index) => (
            <li key={index} style={{ marginBottom: '5px' }}>
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
        Próximos Passos:
      </h2>

      <div style={{ marginBottom: '30px' }}>
        <div style={{ marginBottom: '15px' }}>
          <strong>1. Explore os Guidelines</strong>
          <p style={{ margin: '5px 0 0 0', color: '#64748b' }}>
            Comece explorando nossos guidelines de alta qualidade baseados nas melhores evidências científicas.
          </p>
        </div>
        
        <div style={{ marginBottom: '15px' }}>
          <strong>2. Salve seus Favoritos</strong>
          <p style={{ margin: '5px 0 0 0', color: '#64748b' }}>
            Marque os guidelines mais importantes para você e acesse-os rapidamente quando precisar.
          </p>
        </div>
        
        {plan === 'teste' && (
          <div style={{ marginBottom: '15px' }}>
            <strong>3. Considere um Upgrade</strong>
            <p style={{ margin: '5px 0 0 0', color: '#64748b' }}>
              Para acessar todos os guidelines e recursos exclusivos, considere fazer upgrade para GuideFlow ou MindFlow.
            </p>
          </div>
        )}
      </div>

      {/* Botão de Ação */}
      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <a 
          href="https://surgflow.com.br" 
          className="button"
          style={{
            display: 'inline-block',
            background: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)',
            color: '#ffffff',
            textDecoration: 'none',
            padding: '12px 24px',
            borderRadius: '6px',
            fontWeight: '600',
            margin: '20px 0'
          }}
        >
          Acessar Plataforma
        </a>
      </div>

      <div className="divider" style={{
        height: '1px',
        backgroundColor: '#e2e8f0',
        margin: '30px 0'
      }}></div>

      {/* Informações de Contato */}
      <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '10px' }}>
        <strong>Precisa de ajuda?</strong>
      </p>
      <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '20px' }}>
        Nossa equipe está sempre pronta para ajudar. Entre em contato conosco através do 
        email <a href="mailto:suporte@surgflow.com.br" style={{ color: '#7c3aed' }}>suporte@surgflow.com.br</a> 
        ou pelo WhatsApp disponível na plataforma.
      </p>

      <p style={{ fontSize: '16px', fontWeight: '600', color: '#1e293b' }}>
        Bem-vindo à família SurgFlow! 🚀
      </p>
    </EmailTemplate>
  )
}

export default WelcomeEmail
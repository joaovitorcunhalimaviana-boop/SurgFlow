'use client'

import React from 'react'

interface EmailTemplateProps {
  title: string
  preheader?: string
  children: React.ReactNode
}

export const EmailTemplate: React.FC<EmailTemplateProps> = ({
  title,
  preheader,
  children
}) => {
  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{title}</title>
        <style>{`
          body {
            margin: 0;
            padding: 0;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            background-color: #f8fafc;
            color: #334155;
            line-height: 1.6;
          }
          .email-container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          }
          .email-header {
            background: linear-gradient(135deg, #7c3aed 0%, #a855f7 100%);
            padding: 40px 30px;
            text-align: center;
          }
          .logo {
            color: #ffffff;
            font-size: 28px;
            font-weight: bold;
            margin-bottom: 8px;
          }
          .tagline {
            color: #e9d5ff;
            font-size: 14px;
            margin: 0;
          }
          .email-body {
            padding: 40px 30px;
          }
          .email-footer {
            background-color: #f1f5f9;
            padding: 30px;
            text-align: center;
            border-top: 1px solid #e2e8f0;
          }
          .button {
            display: inline-block;
            background: linear-gradient(135deg, #7c3aed 0%, #a855f7 100%);
            color: #ffffff;
            text-decoration: none;
            padding: 12px 24px;
            border-radius: 6px;
            font-weight: 600;
            margin: 20px 0;
          }
          .button:hover {
            background: linear-gradient(135deg, #6d28d9 0%, #9333ea 100%);
          }
          .text-muted {
            color: #64748b;
            font-size: 14px;
          }
          .text-small {
            font-size: 12px;
            color: #94a3b8;
          }
          .divider {
            height: 1px;
            background-color: #e2e8f0;
            margin: 30px 0;
          }
          .preheader {
            display: none;
            font-size: 1px;
            color: #f8fafc;
            line-height: 1px;
            max-height: 0;
            max-width: 0;
            opacity: 0;
            overflow: hidden;
          }
        `}</style>
      </head>
      <body>
        {preheader && (
          <div className="preheader">
            {preheader}
          </div>
        )}
        
        <div style={{ padding: '20px 0' }}>
          <div className="email-container">
            {/* Header */}
            <div className="email-header">
              <div className="logo">SurgFlow</div>
              <p className="tagline">Sua plataforma de guidelines cirúrgicos</p>
            </div>

            {/* Body */}
            <div className="email-body">
              {children}
            </div>

            {/* Footer */}
            <div className="email-footer">
              <p className="text-small" style={{ margin: '0 0 10px 0' }}>
                © 2024 SurgFlow. Todos os direitos reservados.
              </p>
              <p className="text-small" style={{ margin: '0 0 10px 0' }}>
                Este email foi enviado para você porque possui uma conta no SurgFlow.
              </p>
              <p className="text-small" style={{ margin: '0' }}>
                <a href="/termos" style={{ color: '#7c3aed', textDecoration: 'none' }}>Termos de Uso</a> | 
                <a href="/privacidade" style={{ color: '#7c3aed', textDecoration: 'none', marginLeft: '8px' }}>Política de Privacidade</a>
              </p>
            </div>
          </div>
        </div>
      </body>
    </html>
  )
}

export default EmailTemplate
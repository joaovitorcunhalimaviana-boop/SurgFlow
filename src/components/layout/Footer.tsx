import React from 'react';
import Link from 'next/link';
import { Logo } from '../ui/logo';
import { Mail, Instagram } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Logo and Description - Expandido */}
          <div className="col-span-1 md:col-span-1">
            <Logo size="lg" className="mb-4" />
            <p className="text-gray-600 mb-6 max-w-lg">
              Plataforma médica especializada em fluxogramas práticos baseados em 
              guidelines cirúrgicos, oferecendo acesso rápido e organizado aos 
              principais protocolos internacionais para tomada de decisão clínica. 
              Conectamos profissionais através de um ecossistema cirúrgico completo 
              com grupo de WhatsApp para discussões de casos clínicos com 
              subespecialistas, network profissional e promoção de pesquisa científica.
            </p>
            
            {/* Social Media Links */}
            <div className="flex items-center space-x-4">
              <a 
                href="#" 
                className="text-gray-400 hover:text-purple-600 transition-colors duration-200"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-gray-800 font-semibold mb-4">Contato</h3>
            <ul className="space-y-2 mb-6">
              <li>
                <span className="text-gray-600">Entre em Contato</span>
              </li>
            </ul>
            
            {/* Contact Info */}
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-2 text-purple-500" />
                <span>contato@surgflow.com</span>
              </div>
              <div className="flex items-center">
                <Instagram className="h-4 w-4 mr-2 text-purple-500" />
                <span>Acesse nosso Instagram</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-200 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-600 text-sm mb-4 md:mb-0">
            © 2025 SurgFlow. Todos os direitos reservados.
          </div>
          
          <div className="flex items-center space-x-6 text-sm text-gray-600">
            <Link href="/privacidade" className="hover:text-purple-600 transition-colors duration-200">
              Política de Privacidade
            </Link>
            <Link href="/termos" className="hover:text-purple-600 transition-colors duration-200">
              Termos de Uso
            </Link>
            <Link href="/faq" className="hover:text-purple-600 transition-colors duration-200">
              FAQ
            </Link>
            <div className="flex items-center">
              <span>Versão 1.0.0</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
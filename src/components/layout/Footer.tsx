import React from 'react';
import Link from 'next/link';
import { Logo } from '../ui/logo';
import { Mail, Phone, MapPin, Github, Linkedin, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2">
            <Logo size="lg" className="mb-4" />
            <p className="text-gray-600 mb-6 max-w-md">
              Plataforma médica especializada em guidelines cirúrgicos, oferecendo 
              acesso rápido e organizado aos principais protocolos internacionais 
              para tomada de decisão clínica baseada em evidências.
            </p>
            
            {/* Social Media Links */}
            <div className="flex items-center space-x-4">
              <a 
                href="#" 
                className="text-gray-400 hover:text-purple-600 transition-colors duration-200"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="text-gray-400 hover:text-purple-600 transition-colors duration-200"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="text-gray-400 hover:text-purple-600 transition-colors duration-200"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-gray-800 font-semibold mb-4">Links Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-600 hover:text-purple-600 transition-colors duration-200">
                  Início
                </Link>
              </li>
              <li>
                <Link href="/calculadoras" className="text-gray-600 hover:text-purple-600 transition-colors duration-200">
                  Calculadoras
                </Link>
              </li>
              <li>
                <Link href="/biblioteca" className="text-gray-600 hover:text-purple-600 transition-colors duration-200">
                  Biblioteca
                </Link>
              </li>
              <li>
                <Link href="/sobre" className="text-gray-600 hover:text-purple-600 transition-colors duration-200">
                  Sobre
                </Link>
              </li>
            </ul>
          </div>

          {/* Guidelines & Contact */}
          <div>
            <h3 className="text-gray-800 font-semibold mb-4">Guidelines & Contato</h3>
            <ul className="space-y-2 mb-6">
              <li>
                <Link href="/guideline/cholecystitis-tokyo-2018" className="text-gray-600 hover:text-purple-600 transition-colors duration-200">
                  Tokyo Guidelines 2018
                </Link>
              </li>
              <li>
                <Link href="/guideline/pancreatitis-atlanta-2012" className="text-gray-600 hover:text-purple-600 transition-colors duration-200">
                  Atlanta Classification
                </Link>
              </li>
              <li>
                <Link href="/contato" className="text-gray-600 hover:text-purple-600 transition-colors duration-200">
                  Entre em Contato
                </Link>
              </li>
            </ul>
            
            {/* Contact Info */}
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-2 text-purple-500" />
                <span>contato@surgflow.com</span>
              </div>
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-2 text-purple-500" />
                <span>+55 (11) 99999-9999</span>
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
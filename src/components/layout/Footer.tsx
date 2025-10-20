import React from 'react';
import Link from 'next/link';
import { Logo } from '../ui/logo';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2">
            <Logo size="lg" className="mb-4" />
            <p className="text-gray-600 mb-4 max-w-md">
              Plataforma médica especializada em guidelines cirúrgicos, oferecendo 
              acesso rápido e organizado aos principais protocolos internacionais 
              para tomada de decisão clínica.
            </p>
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
                <Link href="/casos-clinicos" className="text-gray-600 hover:text-purple-600 transition-colors duration-200">
                  Casos Clínicos
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
            </ul>
          </div>

          {/* Guidelines */}
          <div>
            <h3 className="text-gray-800 font-semibold mb-4">Guidelines</h3>
            <ul className="space-y-2">
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
                <Link href="/sobre" className="text-gray-600 hover:text-purple-600 transition-colors duration-200">
                  Sobre o Projeto
                </Link>
              </li>
              <li>
                <Link href="/contato" className="text-gray-600 hover:text-purple-600 transition-colors duration-200">
                  Contato
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-200 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-600 text-sm mb-4 md:mb-0">
            © 2024 SurgFlow. Todos os direitos reservados.
          </div>
          
          <div className="flex items-center space-x-6 text-sm text-gray-600">
            <Link href="/privacidade" className="hover:text-purple-600 transition-colors duration-200">
              Política de Privacidade
            </Link>
            <Link href="/termos" className="hover:text-purple-600 transition-colors duration-200">
              Termos de Uso
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
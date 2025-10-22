'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, ChevronDown, Stethoscope } from 'lucide-react';
import { Logo } from '../ui/logo';
import { Button } from '../ui/button';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isGuidelinesOpen, setIsGuidelinesOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleGuidelines = () => {
    setIsGuidelinesOpen(!isGuidelinesOpen);
  };

  const closeMenus = () => {
    setIsMenuOpen(false);
    setIsGuidelinesOpen(false);
  };

  return (
    <header className={`bg-white/95 backdrop-blur-sm border-b sticky top-0 z-50 transition-all duration-200 ${
      isScrolled ? 'border-purple-200 shadow-sm' : 'border-gray-200'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo - Diminuída */}
          <Link href="/" className="flex items-center" onClick={closeMenus}>
            <Logo size="lg" complete={false} className="hover:scale-105 transition-transform duration-200" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              href="/" 
              className="text-gray-700 hover:text-purple-600 font-medium transition-colors duration-200 relative group"
            >
              Início
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-600 transition-all duration-200 group-hover:w-full"></span>
            </Link>
            
            {/* Guidelines Dropdown */}
            <div className="relative">
              <button
                onClick={toggleGuidelines}
                className="flex items-center text-gray-700 hover:text-purple-600 font-medium transition-colors duration-200 relative group"
              >
                Guidelines
                <ChevronDown className={`ml-1 h-4 w-4 transition-transform duration-200 ${isGuidelinesOpen ? 'rotate-180' : ''}`} />
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-600 transition-all duration-200 group-hover:w-full"></span>
              </button>
              
              {isGuidelinesOpen && (
                <div className="absolute top-full left-0 mt-2 w-72 bg-white border border-purple-200 rounded-xl shadow-lg py-2 animate-in slide-in-from-top-2 duration-200">
                  <div className="px-4 py-2 text-xs font-semibold text-purple-600 uppercase tracking-wide border-b border-gray-100">
                    Guidelines Médicos
                  </div>
                  <Link 
                    href="/guideline/cholecystitis-tokyo-2018" 
                    className="flex items-center px-4 py-3 text-gray-700 hover:bg-purple-50 hover:text-purple-600 transition-colors duration-200"
                    onClick={closeMenus}
                  >
                    <Stethoscope className="h-4 w-4 mr-3 text-purple-500" />
                    <div>
                      <div className="font-medium">Colecistite</div>
                      <div className="text-xs text-gray-500">Tokyo Guidelines 2018</div>
                    </div>
                  </Link>
                  <Link 
                    href="/guideline/cholangitis-tokyo-2018" 
                    className="flex items-center px-4 py-3 text-gray-700 hover:bg-purple-50 hover:text-purple-600 transition-colors duration-200"
                    onClick={closeMenus}
                  >
                    <Stethoscope className="h-4 w-4 mr-3 text-purple-500" />
                    <div>
                      <div className="font-medium">Colangite</div>
                      <div className="text-xs text-gray-500">Tokyo Guidelines 2018</div>
                    </div>
                  </Link>
                  <Link 
                    href="/guideline/pancreatitis-atlanta-2012" 
                    className="flex items-center px-4 py-3 text-gray-700 hover:bg-purple-50 hover:text-purple-600 transition-colors duration-200"
                    onClick={closeMenus}
                  >
                    <Stethoscope className="h-4 w-4 mr-3 text-purple-500" />
                    <div>
                      <div className="font-medium">Pancreatite</div>
                      <div className="text-xs text-gray-500">Atlanta 2012</div>
                    </div>
                  </Link>
                </div>
              )}
            </div>

            <Link 
              href="/calculadoras" 
              className="text-gray-700 hover:text-purple-600 font-medium transition-colors duration-200 relative group"
            >
              Calculadoras
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-600 transition-all duration-200 group-hover:w-full"></span>
            </Link>
            
            <Link 
              href="/biblioteca" 
              className="text-gray-700 hover:text-purple-600 font-medium transition-colors duration-200 relative group"
            >
              Biblioteca
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-600 transition-all duration-200 group-hover:w-full"></span>
            </Link>
            
            <Link 
              href="/sobre" 
              className="text-gray-700 hover:text-purple-600 font-medium transition-colors duration-200 relative group"
            >
              Sobre
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-600 transition-all duration-200 group-hover:w-full"></span>
            </Link>
            
            <Link 
              href="/contato" 
              className="text-gray-700 hover:text-purple-600 font-medium transition-colors duration-200 relative group"
            >
              Contato
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-600 transition-all duration-200 group-hover:w-full"></span>
            </Link>
          </nav>

          {/* Auth & CTA Buttons Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            <Button 
                variant="primary" 
                size="sm"
                className="bg-purple-600 hover:bg-purple-700 text-white"
                onClick={() => window.location.href = '/cadastro'}
              >
                Entre na sua conta
              </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-purple-50 hover:text-purple-600 transition-colors duration-200"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-purple-200 py-4 animate-in slide-in-from-top-2 duration-200">
            <nav className="flex flex-col space-y-4">
              <Link 
                href="/" 
                className="text-gray-700 hover:text-purple-600 font-medium transition-colors duration-200 py-2"
                onClick={closeMenus}
              >
                Início
              </Link>
              
              <div className="space-y-2">
                <div className="text-gray-700 font-medium py-2">Guidelines</div>
                <div className="pl-4 space-y-3 border-l-2 border-purple-100">
                  <Link 
                    href="/guideline/cholecystitis-tokyo-2018" 
                    className="flex items-center text-gray-600 hover:text-purple-600 transition-colors duration-200"
                    onClick={closeMenus}
                  >
                    <Stethoscope className="h-4 w-4 mr-2 text-purple-500" />
                    <div>
                      <div className="font-medium">Colecistite</div>
                      <div className="text-xs text-gray-500">Tokyo Guidelines 2018</div>
                    </div>
                  </Link>
                  <Link 
                    href="/guideline/cholangitis-tokyo-2018" 
                    className="flex items-center text-gray-600 hover:text-purple-600 transition-colors duration-200"
                    onClick={closeMenus}
                  >
                    <Stethoscope className="h-4 w-4 mr-2 text-purple-500" />
                    <div>
                      <div className="font-medium">Colangite</div>
                      <div className="text-xs text-gray-500">Tokyo Guidelines 2018</div>
                    </div>
                  </Link>
                  <Link 
                    href="/guideline/pancreatitis-atlanta-2012" 
                    className="flex items-center text-gray-600 hover:text-purple-600 transition-colors duration-200"
                    onClick={closeMenus}
                  >
                    <Stethoscope className="h-4 w-4 mr-2 text-purple-500" />
                    <div>
                      <div className="font-medium">Pancreatite</div>
                      <div className="text-xs text-gray-500">Atlanta 2012</div>
                    </div>
                  </Link>
                </div>
              </div>
              
              <Link 
                href="/calculadoras" 
                className="text-gray-700 hover:text-purple-600 font-medium transition-colors duration-200 py-2"
                onClick={closeMenus}
              >
                Calculadoras
              </Link>
              
              <Link 
                href="/biblioteca" 
                className="text-gray-700 hover:text-purple-600 font-medium transition-colors duration-200 py-2"
                onClick={closeMenus}
              >
                Biblioteca
              </Link>
              
              <Link 
                href="/sobre" 
                className="text-gray-700 hover:text-purple-600 font-medium transition-colors duration-200 py-2"
                onClick={closeMenus}
              >
                Sobre
              </Link>
              
              <Link 
                href="/contato" 
                className="text-gray-700 hover:text-purple-600 font-medium transition-colors duration-200 py-2"
                onClick={closeMenus}
              >
                Contato
              </Link>
              
              <div className="pt-4 space-y-2">
                <Button 
                  variant="primary" 
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                  onClick={() => window.location.href = '/cadastro'}
                >
                  Entre na sua conta
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
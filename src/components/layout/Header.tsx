'use client';

import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Menu, X, ChevronDown, Stethoscope, User, LogOut, Crown } from 'lucide-react';
import { Logo } from '../ui/logo';
import { Button } from '../ui/button';
import { useAuth } from '@/contexts/AuthContext';
import ProtectedLink from '../auth/ProtectedLink';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isGuidelinesOpen, setIsGuidelinesOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();

  // Transform scroll into blur and shadow values
  const headerBlur = useTransform(scrollY, [0, 50], [0, 10]);
  const headerShadow = useTransform(
    scrollY,
    [0, 50],
    ['0px 0px 0px rgba(0,0,0,0)', '0px 4px 20px rgba(0,0,0,0.1)']
  );

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
    <motion.header
      className={`bg-white/95 border-b sticky top-0 z-50 transition-all duration-200 ${
        isScrolled ? 'border-purple-200' : 'border-gray-200'
      }`}
      style={{
        backdropFilter: isScrolled ? `blur(${headerBlur}px)` : 'blur(0px)',
        boxShadow: isScrolled ? headerShadow : 'none',
        WebkitBackdropFilter: isScrolled ? `blur(${headerBlur}px)` : 'blur(0px)',
      }}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
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
            
            {/* GuideFlows Dropdown */}
            <div className="relative">
              <button
                onClick={toggleGuidelines}
                className="flex items-center text-gray-700 hover:text-purple-600 font-medium transition-colors duration-200 relative group"
              >
                GuideFlows
                <ChevronDown className={`ml-1 h-4 w-4 transition-transform duration-200 ${isGuidelinesOpen ? 'rotate-180' : ''}`} />
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-600 transition-all duration-200 group-hover:w-full"></span>
              </button>
              
              {isGuidelinesOpen && (
                <div className="absolute top-full left-0 mt-2 w-72 bg-white border border-purple-200 rounded-xl shadow-lg py-2 animate-in slide-in-from-top-2 duration-200">
                  <div className="px-4 py-2 text-xs font-semibold text-purple-600 uppercase tracking-wide border-b border-gray-100">
                    Guidelines Médicos
                  </div>
                  <ProtectedLink 
                    href="/guideline/cholecystitis-tokyo-2018" 
                    className="flex items-center px-4 py-3 text-gray-700 hover:bg-purple-50 hover:text-purple-600 transition-colors duration-200"
                    onClick={closeMenus}
                    requiredPlan="teste"
                  >
                    <Stethoscope className="h-4 w-4 mr-3 text-purple-500" />
                    <div>
                      <div className="font-medium">Colecistite</div>
                      <div className="text-xs text-gray-500">Tokyo Guidelines 2018</div>
                    </div>
                  </ProtectedLink>
                  <ProtectedLink 
                    href="/guideline/appendicitis-wses-2020" 
                    className="flex items-center px-4 py-3 text-gray-700 hover:bg-purple-50 hover:text-purple-600 transition-colors duration-200"
                    onClick={closeMenus}
                    requiredPlan="teste"
                  >
                    <Stethoscope className="h-4 w-4 mr-3 text-purple-500" />
                    <div>
                      <div className="font-medium">Apendicite</div>
                      <div className="text-xs text-gray-500">WSES Guidelines 2020</div>
                    </div>
                  </ProtectedLink>
                  <ProtectedLink 
                    href="/guideline/cholangitis-tokyo-2018" 
                    className="flex items-center px-4 py-3 text-gray-700 hover:bg-purple-50 hover:text-purple-600 transition-colors duration-200"
                    onClick={closeMenus}
                    requiredPlan="guideflow"
                  >
                    <Stethoscope className="h-4 w-4 mr-3 text-purple-500" />
                    <div>
                      <div className="font-medium">Colangite</div>
                      <div className="text-xs text-gray-500">Tokyo Guidelines 2018</div>
                    </div>
                  </ProtectedLink>
                  <ProtectedLink 
                    href="/guideline/pancreatitis-atlanta-2012" 
                    className="flex items-center px-4 py-3 text-gray-700 hover:bg-purple-50 hover:text-purple-600 transition-colors duration-200"
                    onClick={closeMenus}
                    requiredPlan="guideflow"
                  >
                    <Stethoscope className="h-4 w-4 mr-3 text-purple-500" />
                    <div>
                      <div className="font-medium">Pancreatite</div>
                      <div className="text-xs text-gray-500">Atlanta 2012</div>
                    </div>
                  </ProtectedLink>
                </div>
              )}
            </div>

            <ProtectedLink 
              href="/calculadoras" 
              className="text-gray-700 hover:text-purple-600 font-medium transition-colors duration-200 relative group"
            >
              Scores
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-600 transition-all duration-200 group-hover:w-full"></span>
            </ProtectedLink>
            
            <Link 
              href="/biblioteca" 
              className="text-gray-700 hover:text-purple-600 font-medium transition-colors duration-200 relative group"
            >
              Biblioteca
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-600 transition-all duration-200 group-hover:w-full"></span>
            </Link>
            
            <Link 
              href="/planos" 
              className="text-gray-700 hover:text-purple-600 font-medium transition-colors duration-200 relative group"
            >
              Planos
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
            <AuthButtons />
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
                <div className="text-gray-700 font-medium py-2">GuideFlows</div>
                <div className="pl-4 space-y-3 border-l-2 border-purple-100">
                  <ProtectedLink 
                    href="/guideline/cholecystitis-tokyo-2018" 
                    className="flex items-center text-gray-600 hover:text-purple-600 transition-colors duration-200"
                    onClick={closeMenus}
                    requiredPlan="teste"
                  >
                    <Stethoscope className="h-4 w-4 mr-2 text-purple-500" />
                    <div>
                      <div className="font-medium">Colecistite</div>
                      <div className="text-xs text-gray-500">Tokyo Guidelines 2018</div>
                    </div>
                  </ProtectedLink>
                  <ProtectedLink 
                    href="/guideline/appendicitis-wses-2020" 
                    className="flex items-center text-gray-600 hover:text-purple-600 transition-colors duration-200"
                    onClick={closeMenus}
                    requiredPlan="teste"
                  >
                    <Stethoscope className="h-4 w-4 mr-2 text-purple-500" />
                    <div>
                      <div className="font-medium">Apendicite</div>
                      <div className="text-xs text-gray-500">WSES Guidelines 2020</div>
                    </div>
                  </ProtectedLink>
                  <ProtectedLink 
                    href="/guideline/cholangitis-tokyo-2018" 
                    className="flex items-center text-gray-600 hover:text-purple-600 transition-colors duration-200"
                    onClick={closeMenus}
                    requiredPlan="guideflow"
                  >
                    <Stethoscope className="h-4 w-4 mr-2 text-purple-500" />
                    <div>
                      <div className="font-medium">Colangite</div>
                      <div className="text-xs text-gray-500">Tokyo Guidelines 2018</div>
                    </div>
                  </ProtectedLink>
                  <ProtectedLink 
                    href="/guideline/pancreatitis-atlanta-2012" 
                    className="flex items-center text-gray-600 hover:text-purple-600 transition-colors duration-200"
                    onClick={closeMenus}
                    requiredPlan="guideflow"
                  >
                    <Stethoscope className="h-4 w-4 mr-2 text-purple-500" />
                    <div>
                      <div className="font-medium">Pancreatite</div>
                      <div className="text-xs text-gray-500">Atlanta 2012</div>
                    </div>
                  </ProtectedLink>
                </div>
              </div>
              
              <ProtectedLink 
                href="/calculadoras" 
                className="text-gray-700 hover:text-purple-600 font-medium transition-colors duration-200 py-2"
                onClick={closeMenus}
              >
                Scores
              </ProtectedLink>
              
              <Link 
                href="/biblioteca" 
                className="text-gray-700 hover:text-purple-600 font-medium transition-colors duration-200 py-2"
                onClick={closeMenus}
              >
                Biblioteca
              </Link>
              
              <Link 
                href="/planos" 
                className="text-gray-700 hover:text-purple-600 font-medium transition-colors duration-200 py-2"
                onClick={closeMenus}
              >
                Planos
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
                <AuthButtons />
              </div>
            </nav>
          </div>
        )}
      </div>
    </motion.header>
  );
};

// Auth Buttons Component
const AuthButtons: React.FC = () => {
  const { user, logout, isAuthenticated } = useAuth()
  const [showUserMenu, setShowUserMenu] = useState(false)
  const router = useRouter()

  if (isAuthenticated && user) {
    return (
      <div className="relative">
        <button
          onClick={() => setShowUserMenu(!showUserMenu)}
          className="flex items-center space-x-2 p-2 rounded-lg text-gray-700 hover:bg-purple-50 hover:text-purple-600 transition-colors duration-200"
        >
          <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
            <User className="h-4 w-4 text-purple-600" />
          </div>
          <span className="font-medium">{user.fullName.split(' ')[0]}</span>
          <ChevronDown className="h-4 w-4" />
        </button>

        {showUserMenu && (
          <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
            <div className="px-4 py-2 border-b border-gray-100">
              <p className="font-medium text-gray-900">{user.fullName}</p>
              <p className="text-sm text-gray-500">{user.email}</p>
              <div className="mt-1">
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                  user.plan === 'mindflow' ? 'bg-gradient-to-r from-purple-100 to-amber-100 text-purple-700' :
                  user.plan === 'guideflow' ? 'bg-purple-100 text-purple-700' :
                  'bg-gray-100 text-gray-700'
                }`}>
                  {user.plan === 'mindflow' && <Crown className="h-3 w-3 mr-1" />}
                  {user.plan === 'mindflow' ? 'MindFlow' : 
                   user.plan === 'guideflow' ? 'GuideFlow' : 
                   'Plano Teste'}
                </span>
              </div>
            </div>
            
            <Link 
              href="/perfil" 
              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
              onClick={() => setShowUserMenu(false)}
            >
              <User className="h-4 w-4 mr-2" />
              Meu Perfil
            </Link>
            
            <Link 
              href="/planos" 
              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
              onClick={() => setShowUserMenu(false)}
            >
              <Crown className="h-4 w-4 mr-2" />
              Meus Planos
            </Link>
            
            <button
              onClick={() => {
                logout()
                setShowUserMenu(false)
              }}
              className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sair
            </button>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="flex items-center space-x-3">
      <Button 
        variant="outline" 
        size="sm"
        className="border-purple-600 text-purple-600 hover:bg-purple-50"
        onClick={() => router.push('/login')}
      >
        Entrar
      </Button>
      <Button 
        variant="primary" 
        size="sm"
        className="bg-purple-600 hover:bg-purple-700 text-white"
        onClick={() => router.push('/cadastro')}
      >
        Cadastrar
      </Button>
    </div>
  )
}

export default Header;
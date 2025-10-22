'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';

interface ProtectedLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  requiredPlan?: 'teste' | 'guideflow' | 'mindflow' | null;
}

const ProtectedLink: React.FC<ProtectedLinkProps> = ({
  href,
  children,
  className,
  onClick,
  requiredPlan = null
}) => {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    
    if (onClick) {
      onClick();
    }

    // Se não está logado, redireciona para cadastro com redirect
    if (!isAuthenticated) {
      const redirectUrl = encodeURIComponent(href);
      router.push(`/cadastro?redirect=${redirectUrl}`);
      return;
    }

    // Se está logado mas não tem o plano necessário
    if (requiredPlan && user?.plan) {
      const planHierarchy = { teste: 0, guideflow: 1, mindflow: 2 };
      const userPlanLevel = planHierarchy[user.plan as keyof typeof planHierarchy] || 0;
      const requiredPlanLevel = planHierarchy[requiredPlan];

      if (userPlanLevel < requiredPlanLevel) {
        // Aqui você pode mostrar o modal de upgrade
        // Por enquanto, vamos redirecionar para planos
        router.push('/planos');
        return;
      }
    }

    // Se passou por todas as verificações, navega normalmente
    router.push(href);
  };

  return (
    <a
      href={href}
      className={className}
      onClick={handleClick}
    >
      {children}
    </a>
  );
};

export default ProtectedLink;
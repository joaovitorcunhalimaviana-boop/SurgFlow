import React from 'react';
import Image from 'next/image';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'hero';
  className?: string;
  showIcon?: boolean;
  complete?: boolean; // Nova prop para mostrar logo completa
}

const logoSizeClasses = {
  sm: 'h-8', // Aumentado para acomodar o ícone
  md: 'h-10', // Aumentado para acomodar o ícone
  lg: 'h-9', // Diminuído para 2/3 do tamanho original (h-14 -> h-9)
  xl: 'h-20', // Aumentado significativamente para o header
  hero: 'h-24' // Aumentado para acomodar o ícone
};

export const Logo: React.FC<LogoProps> = ({ 
  size = 'md', 
  className = '', 
  showIcon = false,
  complete = false 
}) => {
  return (
    <div className={`flex items-center ${className}`}>
      <Image
        src="/nome-cabeçalho.png"
        alt="SurgFlow Logo"
        width={size === 'sm' ? 120 : size === 'md' ? 150 : size === 'lg' ? 120 : size === 'xl' ? 250 : 280}
        height={size === 'sm' ? 32 : size === 'md' ? 40 : size === 'lg' ? 32 : size === 'xl' ? 70 : 80}
        className={`${logoSizeClasses[size]} w-auto object-contain`}
        priority
      />
    </div>
  );
};

export default Logo;
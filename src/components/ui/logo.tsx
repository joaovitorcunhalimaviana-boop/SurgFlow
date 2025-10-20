import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'hero';
  className?: string;
  showIcon?: boolean;
}

const sizeClasses = {
  sm: 'text-lg', // 18px
  md: 'text-2xl', // 24px
  lg: 'text-3xl', // 30px
  xl: 'text-4xl', // 36px
  hero: 'text-5xl' // 48px
};

const iconSizeClasses = {
  sm: 'w-5 h-5', // 20px
  md: 'w-6 h-6', // 24px
  lg: 'w-8 h-8', // 32px
  xl: 'w-10 h-10', // 40px
  hero: 'w-12 h-12' // 48px
};

export const Logo: React.FC<LogoProps> = ({ 
  size = 'md', 
  className = '', 
  showIcon = false 
}) => {
  return (
    <div className={`flex items-center gap-2 ${sizeClasses[size]} ${className}`}>
      {showIcon && (
        <div className={`${iconSizeClasses[size]} flex items-center justify-center bg-purple-600 rounded-lg`}>
          <svg 
            viewBox="0 0 24 24" 
            fill="none" 
            className="w-3/4 h-3/4 text-white"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              d="M2 12C2 12 4 8 8 8C12 8 14 12 18 12C22 12 24 8 24 8" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              fill="none"
            />
            <path 
              d="M2 16C2 16 4 12 8 12C12 12 14 16 18 16C22 16 24 12 24 12" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              fill="none"
            />
            <path 
              d="M2 8C2 8 4 4 8 4C12 4 14 8 18 8C22 8 24 4 24 4" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              fill="none"
            />
          </svg>
        </div>
      )}
      <div className="flex items-baseline">
        <span className="logo-surg font-bold">Surg</span>
        <span className="logo-flow font-semibold ml-0.5" style={{ fontFamily: 'Dancing Script, cursive' }}>Flow</span>
      </div>
    </div>
  );
};

export default Logo;
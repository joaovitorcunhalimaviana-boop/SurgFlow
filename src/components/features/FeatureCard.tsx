import React from 'react';
import { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  className?: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ 
  icon: Icon, 
  title, 
  description, 
  className = '' 
}) => {
  return (
    <div className={`group relative bg-white border border-gray-200 rounded-xl p-8 text-center transition-all duration-300 hover:shadow-lg hover:shadow-purple-100/50 hover:border-purple-200 hover:-translate-y-1 ${className}`}>
      {/* Medical Icon Container */}
      <div className="relative mb-6">
        <div className="w-16 h-16 mx-auto bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl flex items-center justify-center group-hover:from-purple-100 group-hover:to-purple-200 transition-all duration-300">
          <Icon className="w-8 h-8 text-purple-600 group-hover:text-purple-700 transition-colors duration-300" />
        </div>
        {/* Subtle glow effect */}
        <div className="absolute inset-0 w-16 h-16 mx-auto bg-purple-400/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      
      {/* Title */}
      <h3 className="text-xl font-semibold text-gray-900 mb-4 group-hover:text-purple-900 transition-colors duration-300">
        {title}
      </h3>
      
      {/* Description */}
      <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
        {description}
      </p>

      {/* Subtle border accent */}
      <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-purple-200 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-b-xl"></div>
    </div>
  );
};

export default FeatureCard;
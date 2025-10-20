import React from 'react';
import Link from 'next/link';
import { LucideIcon, ArrowRight, Calendar, Users } from 'lucide-react';

interface GuidelineCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  year: string;
  organization: string;
  href: string;
  className?: string;
}

const GuidelineCard: React.FC<GuidelineCardProps> = ({
  icon: Icon,
  title,
  description,
  year,
  organization,
  href,
  className = ''
}) => {
  return (
    <Link href={href} className={`block ${className}`}>
      <div className="group relative bg-white border border-gray-200 rounded-xl p-6 h-full transition-all duration-300 hover:shadow-xl hover:shadow-purple-100/50 hover:border-purple-300 hover:-translate-y-2">
        {/* Header with Medical Icon */}
        <div className="flex items-start justify-between mb-6">
          <div className="relative">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl flex items-center justify-center group-hover:from-purple-100 group-hover:to-purple-200 transition-all duration-300">
              <Icon className="w-8 h-8 text-purple-600 group-hover:text-purple-700 transition-colors duration-300" />
            </div>
            {/* Medical icon glow effect */}
            <div className="absolute inset-0 w-16 h-16 bg-purple-400/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-50 group-hover:bg-purple-50 transition-colors duration-300">
            <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-purple-600 group-hover:translate-x-1 transition-all duration-300" />
          </div>
        </div>

        {/* Title */}
        <h3 className="text-xl font-semibold text-gray-900 mb-4 group-hover:text-purple-900 transition-colors duration-300 leading-tight">
          {title}
        </h3>

        {/* Description */}
        <p className="text-gray-600 mb-6 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
          {description}
        </p>

        {/* Metadata */}
        <div className="flex items-center justify-between text-sm text-gray-500 mt-auto pt-4 border-t border-gray-100 group-hover:border-purple-100 transition-colors duration-300">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-purple-50 rounded-lg flex items-center justify-center mr-3 group-hover:bg-purple-100 transition-colors duration-300">
              <Calendar className="w-4 h-4 text-purple-500" />
            </div>
            <span className="font-medium">{year}</span>
          </div>
          <div className="flex items-center">
            <div className="w-8 h-8 bg-purple-50 rounded-lg flex items-center justify-center mr-3 group-hover:bg-purple-100 transition-colors duration-300">
              <Users className="w-4 h-4 text-purple-500" />
            </div>
            <span className="font-medium text-right">{organization}</span>
          </div>
        </div>

        {/* Subtle gradient border accent */}
        <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-purple-400 via-purple-600 to-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-b-xl"></div>
      </div>
    </Link>
  );
};

export default GuidelineCard;
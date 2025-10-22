import React from 'react'
import Link from 'next/link'
import { ChevronRight, Home } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface BreadcrumbItem {
  label: string
  href?: string
  current?: boolean
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
  className?: string
  showHome?: boolean
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ 
  items, 
  className,
  showHome = true 
}) => {
  const allItems = showHome 
    ? [{ label: 'Início', href: '/' }, ...items]
    : items

  return (
    <nav 
      className={cn(
        "flex items-center space-x-1 text-sm text-gray-500 mb-6",
        className
      )}
      aria-label="Breadcrumb"
    >
      <ol className="flex items-center space-x-1">
        {allItems.map((item, index) => (
          <li key={index} className="flex items-center">
            {index > 0 && (
              <ChevronRight className="h-4 w-4 text-gray-400 mx-2" />
            )}
            
            {item.current || !item.href ? (
              <span 
                className={cn(
                  "font-medium",
                  item.current 
                    ? "text-purple-600" 
                    : "text-gray-900"
                )}
                aria-current={item.current ? "page" : undefined}
              >
                {index === 0 && showHome ? (
                  <span className="flex items-center">
                    <Home className="h-4 w-4 mr-1" />
                    {item.label}
                  </span>
                ) : (
                  item.label
                )}
              </span>
            ) : (
              <Link
                href={item.href}
                className={cn(
                  "hover:text-purple-600 transition-colors duration-200",
                  index === 0 && showHome && "flex items-center"
                )}
              >
                {index === 0 && showHome ? (
                  <>
                    <Home className="h-4 w-4 mr-1" />
                    {item.label}
                  </>
                ) : (
                  item.label
                )}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}

export default Breadcrumb
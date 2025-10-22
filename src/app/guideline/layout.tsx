import React from 'react'
import Layout from '@/components/layout/Layout'
import Breadcrumb from '@/components/ui/breadcrumb'

interface GuidelineLayoutProps {
  children: React.ReactNode
}

export default function GuidelineLayout({ children }: GuidelineLayoutProps) {
  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumb 
            items={[
              { label: 'Guidelines', href: '/guidelines' },
              { label: 'Guideline Atual', current: true }
            ]}
          />
          {children}
        </div>
      </div>
    </Layout>
  )
}
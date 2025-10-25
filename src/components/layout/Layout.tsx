import React from 'react';
import Header from './Header';
import Footer from './Footer';
import ScrollProgress from '../ui/scroll-progress';

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, className = '' }) => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <ScrollProgress />
      <Header />

      <main className={`flex-1 ${className}`}>
        {children}
      </main>

      <Footer />
    </div>
  );
};

export default Layout;
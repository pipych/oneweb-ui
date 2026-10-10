import React, { useState } from 'react';
import { Navbar } from './Navbar';
import { Sidebar, type PageId } from './Sidebar';

interface ShowcaseLayoutProps {
  activePage: PageId;
  onSelectPage: (id: PageId) => void;
  children: React.ReactNode;
}

export const ShowcaseLayout: React.FC<ShowcaseLayoutProps> = ({
  activePage,
  onSelectPage,
  children,
}) => {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-oneweb-bg text-oneweb-text-primary flex flex-col font-sans relative">
      {/* Top Gradient Vignette */}
      <div className="fixed top-0 left-0 right-0 h-12 md:h-16 bg-gradient-to-b from-[#090b0e] via-[#090b0e]/80 to-transparent pointer-events-none z-30" />

      {/* Bottom Gradient Vignette */}
      <div className="fixed bottom-0 left-0 right-0 h-24 md:h-28 bg-gradient-to-t from-[#090b0e] via-[#090b0e]/90 to-transparent pointer-events-none z-30" />

      <Navbar onToggleSidebar={() => setMobileSidebarOpen(!mobileSidebarOpen)} />
      
      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        <Sidebar
          activePage={activePage}
          onSelectPage={onSelectPage}
          isOpenMobile={mobileSidebarOpen}
          onCloseMobile={() => setMobileSidebarOpen(false)}
        />
        
        <main className="flex-1 min-w-0 p-4 sm:p-8 lg:p-10 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

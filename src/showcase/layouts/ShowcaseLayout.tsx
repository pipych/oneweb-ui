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
    <div className="min-h-screen bg-oneweb-bg text-oneweb-text-primary flex flex-col font-sans">
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

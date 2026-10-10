import React, { useState } from 'react';
import { ShowcaseLayout } from './layouts/ShowcaseLayout';
import { type PageId } from './layouts/Sidebar';
import { OverviewPage } from './pages/OverviewPage';
import { TokensPage } from './pages/TokensPage';
import { ButtonsPage } from './pages/ButtonsPage';
import { InputsPage } from './pages/InputsPage';
import { CardsPage } from './pages/CardsPage';
import { OverlaysPage } from './pages/OverlaysPage';
import { BadgesPage } from './pages/BadgesPage';

export const App: React.FC = () => {
  const [activePage, setActivePage] = useState<PageId>('overview');

  const renderPage = () => {
    switch (activePage) {
      case 'overview':
        return <OverviewPage onNavigate={(p) => setActivePage(p)} />;
      case 'tokens':
        return <TokensPage />;
      case 'buttons':
        return <ButtonsPage />;
      case 'inputs':
        return <InputsPage />;
      case 'cards':
        return <CardsPage />;
      case 'overlays':
        return <OverlaysPage />;
      case 'badges':
        return <BadgesPage />;
      default:
        return <OverviewPage onNavigate={(p) => setActivePage(p)} />;
    }
  };

  return (
    <ShowcaseLayout activePage={activePage} onSelectPage={setActivePage}>
      {renderPage()}
    </ShowcaseLayout>
  );
};

export default App;

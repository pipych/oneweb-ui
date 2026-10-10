import React, { useState } from 'react';
import { ShowcaseLayout } from './layouts/ShowcaseLayout';
import { type PageId } from './layouts/Sidebar';
import { OverviewPage } from './pages/OverviewPage';
import { TokensPage } from './pages/TokensPage';
import { ButtonsPage } from './pages/ButtonsPage';
import { InputsPage } from './pages/InputsPage';
import { CardsPage } from './pages/CardsPage';
import { FabPage } from './pages/FabPage';
import { OverlaysPage } from './pages/OverlaysPage';
import { BadgesPage } from './pages/BadgesPage';
import { MobileActionBtn } from '@one/web-ui';

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
      case 'fab':
        return <FabPage />;
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

      {/* Global mobile floating action button (FAB) for the showcase app */}
      {activePage !== 'fab' && (
        <MobileActionBtn
          icon="touch_app"
          variant="primary"
          onClick={() => setActivePage('fab')}
          aria-label="Перейти к FAB"
        />
      )}
    </ShowcaseLayout>
  );
};

export default App;

import React from 'react';
import { Badge } from '@one/web-ui';
import { Icon } from '@one/web-ui';

interface NavbarProps {
  onToggleSidebar?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onToggleSidebar }) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-oneweb-border-subtle bg-oneweb-bg/90 backdrop-blur-md">
      <div className="flex h-16 items-center justify-between px-4 sm:px-8">
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleSidebar}
            className="md:hidden p-2 text-oneweb-text-secondary hover:text-white rounded-full hover:bg-oneweb-surface-subtle"
            aria-label="Toggle Navigation"
          >
            <Icon name="menu" size={24} />
          </button>

          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-oneweb-accent/15 border border-oneweb-border-accent flex items-center justify-center text-oneweb-accent">
              <Icon name="widgets" size={20} />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-bold tracking-tight text-white">
                One<span className="text-oneweb-accent">WebUI</span>
              </span>
              <Badge variant="lime" size="sm">v0.1.0</Badge>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Badge variant="lime" size="sm">Cloudflare Pages</Badge>
          
          <a
            href="https://github.com/pipych/oneweb-ui"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 px-3.5 py-1.5 text-xs font-medium text-oneweb-text-secondary hover:text-white bg-oneweb-surface-subtle hover:bg-oneweb-surface-elevated rounded-full transition-colors"
          >
            <Icon name="code" size={16} />
            <span>GitHub</span>
          </a>
        </div>
      </div>
    </header>
  );
};

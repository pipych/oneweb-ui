export type TabId = 'dashboard' | 'console' | 'settings' | 'players' | 'files' | 'world' | 'modpack';

export interface ServerStatus {
  status: 'online' | 'offline' | 'starting' | 'stopping';
  uptimeSeconds: number;
  cpuPercent: number;
  ramUsedMB: number;
  ramTotalMB: number;
  players: {
    online: number;
    max: number;
    list: string[];
  };
  serverInfo: {
    motd: string;
    version: string;
    difficulty: string;
    gamemode: string;
  };
  lastLogLine?: string;
  error?: string | null;
  tps?: number;
}

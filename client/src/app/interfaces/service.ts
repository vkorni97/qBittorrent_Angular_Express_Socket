import { ServerState, TorrentInfo } from './torrent';

export type InitStates = 'register' | 'login' | 'logged_in';
export enum SocketEmit {
  MISSING_SETTINGS = 'missing_server_settings',
  LOGGED_IN = 'logged_in',
  LOGIN = 'login',
  REGISTER = 'register',
  RESPONSE = 'response',
  MAINDATA = 'maindata',
}

export interface UserData {
  username: string;
  password?: string;
}

export interface RegisterClientArgs {
  user: UserData;
  client: {
    username: string;
    password: string;
    host: string;
    port?: string;
  };
}

export interface LoginClientArgs extends UserData {}

export interface MainDataRes {
  rid?: number;
  full_update?: boolean;
  server_state?: ServerState;
  categories?: {
    [key: string]: {
      name: string;
      savePath: string;
    };
  };
  categories_removed?: string[];
  tags?: string[];
  tags_removed?: string[];
  torrents?: {
    [key: string]: TorrentInfo;
  };
  torrents_removed?: string[];
  trackers?: { [key: string]: string[] };
  trackers_removed?: string[];
}

import { ServerState, TorrentInfo } from "./data";

export interface LoginArgs {
  client?: {
    host: string;
    port?: string;
  };
  url?: "api/v2/auth/login";
  username: string;
  password: string;
}

export interface MainDataArgs {
  client?: {
    host: string;
    port?: string;
  };
  url?: "api/v2/sync/maindata";
  rid: number;
}
export interface MainDataRes {
  rid: number;
  full_update?: boolean;
  server_state: ServerState;
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

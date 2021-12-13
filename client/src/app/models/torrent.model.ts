import { stringify } from '@angular/compiler/src/util';
import { TorrentInfo, Filters } from '../interfaces/torrent';
import { stateFilters } from '../_helper/variables';

export class Torrents {
  private torrents: { [key: string]: TorrentInfo } = {};
  private torrentsLength: number = 0;

  public filters: Filters = {
    Status: {
      downloading: [],
      complete: [],
      stopped: [],
      active: [],
      inactive: [],
    },
    Tag: [],
    Tracker: {},
    Category: {},
  };

  constructor(torrents?: { [key: string]: TorrentInfo }) {
    this.modifyTorrent(torrents);
  }

  get length(): number {
    return this.torrentsLength;
  }
  get getTorrent(): { [key: string]: TorrentInfo } {
    return this.torrents;
  }
  get getTorrentKeys() {
    return Object.keys(this.torrents);
  }

  modifyTorrent(torrents?: { [key: string]: TorrentInfo }) {
    let stateChanged: boolean = false;
    for (const key in torrents) {
      if (!this.torrents[key]) {
        this.torrents[key] = torrents[key];
        this.torrentsLength += 1;
        this.setFilters(torrents[key].state, key);
      } else {
        if (torrents[key].state) {
          this.setFilters(this.torrents[key].state, key, true);
          this.setFilters(torrents[key].state, key);
          stateChanged = true;
        }
        Object.assign(this.torrents[key], torrents[key]);
      }
    }

    if (stateChanged) this.torrents = JSON.parse(JSON.stringify(this.torrents));
  }

  removeTorrent(torrents: string[]) {
    for (let i = 0; i < torrents.length; i++) {
      this.setFilters(this.torrents[torrents[i]].state, torrents[i], true);
      delete this.torrents[torrents[i]];
      this.torrentsLength -= 1;
    }
  }

  addToMenu(
    items: { [key: string]: any } | string[],
    type: 'Category' | 'Tag' | 'Tracker'
  ) {
    if (Array.isArray(items)) {
      this.filters[type] = items;
    } else {
      Object.assign(this.filters[type], items);
    }
  }
  removeFromMenu(items: string[], type: 'Category' | 'Tag' | 'Tracker') {
    for (let i = 0; i < items.length; i++) {
      delete this.filters[type][items[i]];
    }
  }

  setFilters(state: string, key: string, remove: boolean = false) {
    (Object.keys(stateFilters) as Array<keyof typeof stateFilters>).forEach(
      (x) => {
        if (stateFilters[x].includes(state)) {
          if (remove)
            this.filters.Status[x] = this.filters.Status[x].filter(
              (v) => v != key
            );
          else this.filters.Status[x].push(key);
        }
      }
    );
  }
}

import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { MainDataRes } from '../interfaces/service';
import { ServerState, TorrentInfo } from '../interfaces/torrent';
import { Torrents } from '../models/torrent.model';

@Injectable({
  providedIn: 'root',
})
export class TorrentService {
  private _torrents: Torrents = new Torrents();
  private _server_state: ServerState = {};
  private _updateChart: Subject<boolean> = new Subject<boolean>();

  constructor() {}

  get updateChart() {
    return this._updateChart.asObservable();
  }

  get torrents() {
    return this._torrents;
  }

  get server_state() {
    return this._server_state;
  }

  public setMainData(data: MainDataRes) {
    if (data.server_state) {
      Object.assign(this._server_state, data.server_state);
      this._updateChart.next(true);
    }
    if (data.torrents) this._torrents.modifyTorrent(data.torrents);
    if (data.torrents_removed)
      this._torrents.removeTorrent(data.torrents_removed);
    if (data.categories) this._torrents.addToMenu(data.categories, 'Category');
    if (data.categories_removed)
      this._torrents.removeFromMenu(data.categories_removed, 'Category');
    if (data.trackers) this._torrents.addToMenu(data.trackers, 'Tracker');
    if (data.trackers_removed)
      this._torrents.removeFromMenu(data.trackers_removed, 'Tracker');
    if (data.tags) this._torrents.addToMenu(data.tags, 'Tag');
    if (data.tags_removed)
      this._torrents.removeFromMenu(data.tags_removed, 'Tag');
  }
}

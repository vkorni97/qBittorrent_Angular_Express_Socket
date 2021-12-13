import { Component, Input, OnInit } from '@angular/core';
import { TorrentInfo } from 'src/app/interfaces/torrent';

@Component({
  selector: 'app-torrent-item',
  templateUrl: './torrent-item.component.html',
  styleUrls: ['./torrent-item.component.scss'],
})
export class TorrentItemComponent implements OnInit {
  @Input() item: TorrentInfo;
  @Input() key: string;
  constructor() {}

  ngOnInit(): void {}

  handleSelect(event: MouseEvent) {
    if (event.ctrlKey) this.item.selected = !this.item.selected;
  }
}

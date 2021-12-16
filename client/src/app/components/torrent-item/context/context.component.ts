import { trigger, transition, style, animate } from '@angular/animations';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-torrent-item-context',
  templateUrl: './context.component.html',
  styleUrls: ['./context.component.scss'],
  animations: [
    trigger('animateContext', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('.25s ease-out', style('*')),
      ]),
    ]),
  ],
})
export class TorrentItemContextComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}

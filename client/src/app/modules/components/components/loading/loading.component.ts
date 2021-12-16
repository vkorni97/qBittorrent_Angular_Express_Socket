import { Component, HostBinding, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
})
export class LoadingComponent implements OnInit {
  @HostBinding('style.position') position = 'absolute';
  @HostBinding('style.width') width = '100%';
  @HostBinding('style.left') left = '0';
  @HostBinding('style.top') top = '0';
  constructor() {}

  ngOnInit(): void {}
}

import { Component, HostBinding, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss'],
})
export class ProgressBarComponent implements OnInit {
  @HostBinding('style.flex') flex = 1;
  @Input() percent: number = 0;
  constructor() {}

  ngOnInit(): void {}
}

import { trigger, transition, style, animate } from '@angular/animations';
import { Component, HostBinding, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-tooltip',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.scss'],
  animations: [
    trigger('tooltip', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(.5)' }),
        animate('.15s ease-out', style('*')),
      ]),
      transition(':leave', [
        animate('.15s ease-out', style({ opacity: 0, transform: 'scale(.5)' })),
      ]),
    ]),
  ],
})
export class TooltipComponent implements OnInit {
  @HostBinding('@tooltip') public tooltip = true;
  @Input() text: string;
  constructor() {}

  ngOnInit(): void {}
}

import {
  animate,
  keyframes,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-collapse-menu',
  templateUrl: './collapse-menu.component.html',
  styleUrls: ['./collapse-menu.component.scss'],
  animations: [
    trigger('preventAnimation', [transition(':enter', [])]),
    trigger('animateItems', [
      transition(':enter', [
        style({ opacity: 0, paddingLeft: 0, paddingRight: 0, height: 0 }),
        animate(
          '.5s ease-out',
          keyframes([
            style({ height: '*', offset: 0.75 }),
            style({
              opacity: 1,
              paddingLeft: '*',
              paddingRight: '*',
              offset: 1,
            }),
          ])
        ),
      ]),
      transition(':leave', [
        animate(
          '.5s ease-in',
          keyframes([
            style({
              opacity: 0,
              paddingLeft: 0,
              paddingRight: 0,
              offset: 0.25,
            }),
            style({ height: 0, paddingTop: 0, paddingBottom: 0, offset: 1 }),
          ])
        ),
      ]),
    ]),
  ],
})
export class CollapseMenuComponent implements OnInit {
  public isCollapsed: boolean = false;
  @Input() title: string;

  constructor() {}

  ngOnInit(): void {}

  handleCollapse() {
    this.isCollapsed = !this.isCollapsed;
  }
}

import {
  trigger,
  transition,
  style,
  animate,
  group,
  query,
} from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Alert } from '../../interfaces/interface';
import { SnackService } from '../../services/snack.service';

@Component({
  selector: 'app-snack',
  templateUrl: './snack.component.html',
  styleUrls: ['./snack.component.scss'],
  animations: [
    trigger('animateItem', [
      transition(':enter', [
        style({
          opacity: 0,
          transform: 'translate3d(0, -20px, 0)',
          height: 0,
        }),
        query('.underline', style({ width: '0' }), { optional: true }),
        group([
          animate(
            '.25s ease-out',
            style({
              opacity: 1,
              transform: 'translate3d(0, 0, 0)',
              height: '*',
            })
          ),
          query(
            '.underline',
            animate('3.75s .25s ease-out', style({ width: '100%' })),
            { optional: true }
          ),
        ]),
      ]),
      transition(':leave', [
        animate(
          '.25s ease-out',
          style({
            opacity: 0,
            transform: 'translate3d(0, -20px, 0)',
            height: 0,
          })
        ),
      ]),
    ]),
  ],
})
export class SnackComponent implements OnInit {
  public alerts: Alert[] = [];
  constructor(private snack: SnackService) {}

  ngOnInit(): void {
    this.snack.alert.subscribe((dt) => {
      if (dt) {
        this.alerts.push(dt);
      }
    });
  }

  handleDelete(item: number) {
    this.alerts = this.alerts.filter((v, i) => v.i != item);
  }
}

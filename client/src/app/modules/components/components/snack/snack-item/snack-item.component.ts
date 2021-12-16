import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subscription, timer } from 'rxjs';
import { Alert } from '../../../interfaces/interface';

@Component({
  selector: 'app-snack-item',
  templateUrl: './snack-item.component.html',
  styleUrls: ['./snack-item.component.scss'],
})
export class SnackItemComponent implements OnInit {
  @Input() item: Alert;
  @Output() onDelete: EventEmitter<number> = new EventEmitter<number>();
  public subscription: Subscription;

  constructor() {}

  ngOnInit(): void {
    this.subscription = timer(4000).subscribe(() => {
      this.onDelete.emit(this.item.i);
      this.subscription.unsubscribe();
    });
  }

  handleClose() {
    this.onDelete.emit(this.item.i);
    this.subscription.unsubscribe();
  }
}

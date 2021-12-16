import { OverlayRef, Overlay } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Directive, HostListener, ViewContainerRef } from '@angular/core';
import { Subscription, fromEvent, filter, take } from 'rxjs';
import { TorrentItemContextComponent } from 'src/app/components/torrent-item/context/context.component';

@Directive({
  selector: '[appTorrentItemContext]',
})
export class TorrentItemDirective {
  private overlayRef: OverlayRef | undefined;
  private sub: Subscription;

  @HostListener('contextmenu', ['$event'])
  handleContextMenu(e: MouseEvent) {
    e.preventDefault();
    this.open(e);
  }

  constructor(private ref: ViewContainerRef, private overlay: Overlay) {}

  open({ x, y }: MouseEvent) {
    this.close();
    const positionStrategy = this.overlay
      .position()
      .flexibleConnectedTo({ x, y })
      .withPositions([
        {
          originX: 'end',
          originY: 'bottom',
          overlayX: 'start',
          overlayY: 'top',
        },
      ]);

    this.overlayRef = this.overlay.create({
      positionStrategy,
      scrollStrategy: this.overlay.scrollStrategies.close(),
    });

    this.overlayRef.attach(
      new ComponentPortal(TorrentItemContextComponent, this.ref)
    );

    this.sub = fromEvent<MouseEvent>(document, 'mouseup')
      .pipe(
        filter((event) => {
          const clickTarget = event.target as HTMLElement;
          return (
            !!this.overlayRef &&
            !this.overlayRef.overlayElement.contains(clickTarget)
          );
        }),
        take(1)
      )
      .subscribe(() => this.close());
  }

  close() {
    this.sub && this.sub.unsubscribe();
    if (this.overlayRef) {
      this.overlayRef.dispose();
      this.overlayRef = undefined;
    }
  }
}

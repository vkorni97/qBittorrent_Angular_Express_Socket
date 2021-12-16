import {
  ConnectedPosition,
  OverlayRef,
  FlexibleConnectedPositionStrategy,
  Overlay,
  OverlayPositionBuilder,
} from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import {
  ComponentRef,
  Directive,
  ElementRef,
  HostListener,
  Input,
} from '@angular/core';
import { TooltipComponent } from '../components/tooltip/tooltip.component';

@Directive({
  selector: '[appHint]',
})
export class HintDirective {
  @Input('appHint') label: string;
  @Input('hintDirection') pos: Partial<ConnectedPosition>;
  private overlayRef: OverlayRef;
  private timer: any;
  private positionStrategy: FlexibleConnectedPositionStrategy;

  constructor(
    private overlay: Overlay,
    private overlayPositionBuilder: OverlayPositionBuilder,
    private elementRef: ElementRef
  ) {}

  ngOnInit(): void {
    let position: ConnectedPosition = {
      originX: 'center',
      originY: 'bottom',
      overlayX: 'center',
      overlayY: 'top',
      offsetY: 4,
    };

    if (this.pos) {
      position = Object.assign(
        {
          originX: 'center',
          originY: 'center',
          overlayX: 'center',
          overlayY: 'center',
        },
        this.pos
      );
    }
    this.positionStrategy = this.overlayPositionBuilder
      .flexibleConnectedTo(this.elementRef)
      .withPositions([position]);
  }

  @HostListener('mouseenter', ['$event'])
  mouseEnter() {
    this.timer = setTimeout(() => {
      if (!this.overlayRef) {
        this.overlayRef = this.overlay.create({
          positionStrategy: this.positionStrategy,
        });
      }
      const tooltip: ComponentRef<TooltipComponent> = this.overlayRef.attach(
        new ComponentPortal(TooltipComponent)
      );

      tooltip.instance.text = this.label;
    }, 200);
  }

  @HostListener('mouseleave', ['$event'])
  mouseOut() {
    clearTimeout(this.timer);
    if (this.overlayRef) this.overlayRef.detach();
  }

  ngOnDestroy() {
    clearTimeout(this.timer);
    if (this.overlayRef) this.overlayRef.detach();
  }
}

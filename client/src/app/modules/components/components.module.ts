import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from './components/loading/loading.component';
import { InputComponent } from './components/input/input.component';
import { CheckboxComponent } from './components/checkbox/checkbox.component';
import { RadioComponent } from './components/radio/radio.component';
import { SelectComponent } from './components/select/select.component';
import { TextareaComponent } from './components/textarea/textarea.component';
import { SnackComponent } from './components/snack/snack.component';
import { SnackItemComponent } from './components/snack/snack-item/snack-item.component';
import { FormsModule } from '@angular/forms';
import { HintDirective } from './directives/hint.directive';
import { TooltipComponent } from './components/tooltip/tooltip.component';
import { OverlayModule } from '@angular/cdk/overlay';

@NgModule({
  declarations: [
    LoadingComponent,
    InputComponent,
    CheckboxComponent,
    RadioComponent,
    SelectComponent,
    TextareaComponent,
    SnackComponent,
    SnackItemComponent,
    HintDirective,
    TooltipComponent,
  ],
  imports: [CommonModule, FormsModule, OverlayModule],
  exports: [
    LoadingComponent,
    InputComponent,
    CheckboxComponent,
    RadioComponent,
    SelectComponent,
    TextareaComponent,
    SnackComponent,
    HintDirective,
  ],
})
export class ComponentsModule {}

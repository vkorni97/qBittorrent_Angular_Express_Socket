import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from './loading/loading.component';
import { InputComponent } from './input/input.component';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { RadioComponent } from './radio/radio.component';
import { SelectComponent } from './select/select.component';
import { TextareaComponent } from './textarea/textarea.component';
import { SnackComponent } from './snack/snack.component';
import { SnackItemComponent } from './snack/snack-item/snack-item.component';
import { FormsModule } from '@angular/forms';
import { SnackService } from './snack.service';

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
  ],
  imports: [CommonModule, FormsModule],
  exports: [
    LoadingComponent,
    InputComponent,
    CheckboxComponent,
    RadioComponent,
    SelectComponent,
    TextareaComponent,
    SnackComponent,
  ],
})
export class ComponentsModule {}

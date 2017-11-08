// Dépendances
import { NgModule }           from '@angular/core';
import { CommonModule }       from '@angular/common';
import {FormsModule, ReactiveFormsModule}        from '@angular/forms';
// Composants qui seront automatiquement importés par le module
import { LoadingComponent }     from '../loadable/loading.component';
import { LoadableDirective }    from '../loadable/loadable.directive';
import { RadioComponent }       from '../radio/radio.component';
import { DateComponent } from '../date/date.component';
import { DatePickerComponent }  from '../date/datePicker.component';
import { TabComponent }         from '../tab/tab.component';
import { TextareaComponent }    from '../textarea/textarea.component';
import { CheckboxComponent }    from '../check/checkbox.component';
import { NumericComponent }     from '../numeric/numeric.component';
import {ShowResumePipe} from '../pipes/show-resume.pipe';
import {TextfieldComponent} from '../textfield/textfield.component';
import {SelectComponent} from '../select/select.component';
import {BoxComponent} from '../box/box.component';
import {SharedService} from '../switchView/shared.service';
import {ModalComponent} from '../switchView/modal.component';
import {SwitchViewComponent} from '../switchView/switchView.component';
import {DateRangeComponent} from '../dateRange/dateRange.component';
import {DateRangeInputComponent} from '../dateRange/dateRangeInput.component';
import {SwitchViewModule} from '../switchView/switchView.module';

@NgModule({
  imports: [
      CommonModule, FormsModule, ReactiveFormsModule, SwitchViewModule
  ],
  declarations: [ SelectComponent, TextfieldComponent, DateRangeComponent, DateRangeInputComponent,
      DatePickerComponent,
      LoadingComponent, LoadableDirective, RadioComponent, DateComponent, TabComponent, TextareaComponent, CheckboxComponent,
      NumericComponent,
      ShowResumePipe, BoxComponent, ModalComponent],
  exports: [ SelectComponent, TextfieldComponent, DateRangeComponent, DateRangeInputComponent, DatePickerComponent,
      LoadingComponent,
      LoadableDirective, RadioComponent, DateComponent,
      TabComponent, TextareaComponent, CheckboxComponent, NumericComponent, ShowResumePipe,
      BoxComponent,
      ModalComponent],
  providers: [SharedService],
  entryComponents: []
})
export class Angular2ComponentsModule {}



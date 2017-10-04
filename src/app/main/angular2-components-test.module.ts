// Dépendances
import {NgModule}             from '@angular/core';
import {BrowserModule}        from '@angular/platform-browser';
import {CommonModule}         from '@angular/common';
import {FormsModule, ReactiveFormsModule}          from '@angular/forms';

import {DesignComponent}      from '../design/design.component';

// Composants qui seront automatiquement importés par le module
import {SelectComponent} from "../select/select.component";
import {LoadingComponent}     from '../loadable/loading.component';
import {LoadableDirective}    from '../loadable/loadable.directive';
import {RadioComponent}       from '../radio/radio.component';
import {DateComponent} from "../date/date.component";
import {DatePickerComponent}  from "../date/datePicker.component";
import {TabComponent}         from '../tab/tab.component';
import {TextareaComponent}    from '../textarea/textarea.component';
import {CheckboxComponent} from "../check/checkbox.component";
import {NumericComponent}     from "../numeric/numeric.component";
import {TestComponent}        from "../test/test.component";
import {ShowResumePipe}       from "../pipes/show-resume.pipe";
import {TextfieldComponent} from "../textfield/textfield.component";
import {BoxComponent} from "../box/box.component";
import {SharedService} from "../switchView/shared.service";
import {SwitchViewModule} from "../switchView/switchView.module";
import {ModalComponent} from "../switchView/modal.component";
import {BeanFormulaireComponent} from "../design/bandeaux/beanFormulaire.component";
import {DateRangeInputComponent} from "../dateRange/dateRangeInput.component";
import {DateRangeComponent} from "../dateRange/dateRange.component";

@NgModule({
    imports: [BrowserModule, CommonModule, FormsModule, ReactiveFormsModule, SwitchViewModule],
    declarations: [BeanFormulaireComponent, DesignComponent, SelectComponent, TextfieldComponent, DateRangeInputComponent, DateRangeComponent, DatePickerComponent, TestComponent, LoadingComponent, LoadableDirective, RadioComponent, DateComponent, TabComponent, TextareaComponent, CheckboxComponent, NumericComponent, ShowResumePipe, BoxComponent, ModalComponent],
    exports: [BeanFormulaireComponent, DesignComponent, SelectComponent, DateRangeInputComponent, DateRangeComponent, DatePickerComponent, TestComponent, TextfieldComponent, LoadingComponent, LoadableDirective, RadioComponent, DateComponent, TabComponent, TextareaComponent, CheckboxComponent, NumericComponent, ShowResumePipe, BoxComponent, ModalComponent],
    providers: [SharedService],
    bootstrap: [DesignComponent],
    entryComponents: [BeanFormulaireComponent]
})
export class Angular2ComponentsTestModule {
}

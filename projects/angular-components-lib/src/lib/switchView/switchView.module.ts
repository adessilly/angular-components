import {NgModule} from '@angular/core';
import {SharedService} from './shared.service';
import {SwitchViewComponent} from './switchView.component';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
    imports: [CommonModule, FormsModule, ReactiveFormsModule],
    declarations: [ SwitchViewComponent],
    exports: [ SwitchViewComponent],
    providers: [SharedService]
})
export class SwitchViewModule { }

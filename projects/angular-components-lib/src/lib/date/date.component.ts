import {
    Component, Input, ElementRef, AfterContentInit, forwardRef
} from '@angular/core';

import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

/*
 @author Adrien DESSILLY
 */
@Component({
    selector: 'date-component',
    providers: [{
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DateComponent),
      multi: true
    }],
    templateUrl: 'date.template.html'
})
export class DateComponent implements AfterContentInit, ControlValueAccessor {

    @Input() width = '12';
    @Input() label: string;
    @Input() id: string;
    @Input() time = false;
    @Input() month = false;

    @Input() required = false;
    @Input() readonly = false;
    @Input() hasError = false;
    @Input() allowInputToggle = true;
    @Input() message: string;

    public innerDate: Date;
    public onChangeCallback: any;
    public onTouchedCallback: any;
    public simpleMode = true;

    constructor(private element: ElementRef) {}

    onChange($event) {
        this.setValueFromDatepicker(this.innerDate);
    }

    // Ici, il faut setter la date et notifier le datepicker
    setValueFromParent(v: Date) {
        this.innerDate = v;
    }

    // Ici, il faut setter la date et notifier le parent
    setValueFromDatepicker(v: Date) {
        if (this.onChangeCallback) {
            this.onChangeCallback(this.innerDate);
        }
    }

    ngAfterContentInit() {
        if (this.width && this.width.substring(0, 3) === 'col') {
            this.simpleMode = false;
        }
    }

    onTouch($event) {
        this.onTouchedCallback();
    }

    // @Override ControlValueAccessor
    writeValue(v: any) {
        this.setValueFromParent(v);
    }

    // @Override ControlValueAccessor
    registerOnChange(fn: any) {
        this.onChangeCallback = fn;
    }

    // @Override ControlValueAccessor
    registerOnTouched(fn: any) {
        this.onTouchedCallback = fn;
    }

}

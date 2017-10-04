import {
    Component, Input, Output, EventEmitter, ElementRef, AfterContentInit, SimpleChanges,
    ViewChild, ViewChildren, QueryList, forwardRef
} from '@angular/core';

import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import {DateRange} from "./dateRange";

declare var moment: any;
declare var $: any;

/*
 @author Adrien DESSILLY
 */
@Component({
    selector: 'daterange-component',
    providers: [{
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DateRangeComponent),
      multi: true
    }],
    templateUrl: 'dateRange.template.html'
})
export class DateRangeComponent implements AfterContentInit, ControlValueAccessor {

    @Input()
    width:string = "12";
    @Input()
    label:string;
    @Input()
    id:string;

    @Input()
    required:boolean = false;
    @Input()
    readonly:boolean = false;
    @Input()
    hasError:boolean = false;
    @Input()
    message:string;

    public innerDate:DateRange;
    public onChangeCallback: any;
    public onTouchedCallback : any;
    public simpleMode: boolean = true;

    constructor(private element:ElementRef) {}

    onChange($event) {
        this.setValueFromDatepicker(this.innerDate);
    }

    // Ici, il faut setter la date et notifier le datepicker
    setValueFromParent(v:DateRange) {
        this.innerDate = v;
    }

    // Ici, il faut setter la date et notifier le parent
    setValueFromDatepicker(v:DateRange) {
        if(this.onChangeCallback) {
            this.onChangeCallback(this.innerDate);
        }
    }

    ngAfterContentInit() {
        if (this.width && this.width.substring(0, 3) == "col") {
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

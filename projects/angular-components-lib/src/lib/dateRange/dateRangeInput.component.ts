import {
    Component, Input, Output, EventEmitter,
    ViewChild, forwardRef, AfterViewInit
} from '@angular/core';

import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import {DateRange} from './dateRange';

declare var jQuery: any;

/*
 @author Adrien DESSILLY
 */
@Component({
    selector: 'daterangeinput-component',
    providers: [{
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DateRangeInputComponent),
      multi: true
    }],
    templateUrl: 'dateRangeInput.template.html'
})
export class DateRangeInputComponent implements AfterViewInit, ControlValueAccessor {

    @Input() required = false;
    @Input() readonly = false;
    @Input() hasError = false;
    @Output() touchedChange: any = new EventEmitter();

    private innerDate: DateRange;
    private onChangeCallback: any;
    private onTouchedCallback: any;

    private datepicker: any = null;
    private simpleMode = true;

    @ViewChild('myDatePicker') datePickerChild: any;

    constructor() {}

    // Ici, il faut setter la date et notifier le datepicker
    setValueFromParent(v: DateRange) {
        this.innerDate = v;
        if (this.datepicker) {
            this.createDatepickerBootstrap();
        }
    }

    // Ici, il faut setter la date et notifier le parent
    setValueFromDatepicker(startDate: Date, endDate: Date) {
        this.innerDate.startDate = startDate;
        this.innerDate.endDate = endDate;
        if (this.onChangeCallback) {
            this.onChangeCallback(Object.assign({}, this.innerDate));
        }
    }

    ngAfterViewInit() {
        this.createDatepickerBootstrap();

        this.datePickerChild.nativeElement.onblur = () => {
            this.touchedChange.emit();
            this.onTouchedCallback();
        };
    }

    createDatepickerBootstrap() {
        const self = this;

        let daterangevalue = Object.assign({}, this.innerDate);
        if (self.innerDate && (self.innerDate.startDate == null || self.innerDate.endDate == null)) {
            daterangevalue.startDate = new Date();
            daterangevalue.endDate = new Date();
        }

        this.datepicker = jQuery([this.datePickerChild.nativeElement]);
        this.datepicker.daterangepicker(daterangevalue).on('hide.daterangepicker', function(ev, picker) {
            let dateRange = self.datepicker.data('daterangepicker');
            self.setValueFromDatepicker( dateRange.startDate, dateRange.endDate );
        }).on('cancel.daterangepicker', function(ev, picker) {
            jQuery(this).val('');
            self.setValueFromDatepicker( null, null );
        });

        if (self.innerDate && (self.innerDate.startDate == null || self.innerDate.endDate == null)) {
            this.datepicker.val('');
        }

    }

    togglePopup() {
        this.datepicker.data('daterangepicker').show();
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

import {
    Component, Input, Output, EventEmitter,
    ViewChild, forwardRef, AfterViewInit
} from '@angular/core';

import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

declare var moment: any;

/*
 @author Adrien DESSILLY
 */
@Component({
    selector: 'datepicker-component',
    providers: [{
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DatePickerComponent),
      multi: true
    }],
    templateUrl: 'datePicker.template.html'
})
export class DatePickerComponent implements AfterViewInit, ControlValueAccessor {

    @Input() time = false;
    @Input() month = false;
    @Input() required = false;
    @Input() readonly = false;
    @Input() hasError = false;
    @Input() allowInputToggle = true;
    @Output() touchedChange: EventEmitter<boolean> = new EventEmitter();

    private innerDate: Date;
    private onChangeCallback: any;
    private onTouchedCallback: any;

    private datepicker: any = null;
    private simpleMode = true;

    @ViewChild('myDatePicker') datePickerChild: any;

    constructor() {}

    // Ici, il faut setter la date et notifier le datepicker
    setValueFromParent(v: Date) {
        this.innerDate = this.convertToDate(v);
        if (this.datepicker) {
            this.datepicker.data('DateTimePicker').date( this.innerDate );
        }
    }

    // Ici, il faut setter la date et notifier le parent
    setValueFromDatepicker(v: Date) {
        this.innerDate = this.convertToDate(v);
        if (this.onChangeCallback) {
            this.onChangeCallback(this.innerDate);
        }
    }

    ngAfterViewInit() {
        this.createDatepickerBootstrap();

        let i = 0;
        this.datePickerChild.nativeElement.onblur = () => {
            // On va deux fois dedans à cause du datetimetpicker
            // mais on ne veut pas être notifié deux fois
            if (i++ % 2 === 1) {
                return;
            }
            this.touchedChange.emit(true);
            this.onTouchedCallback();
        };
    }

    createDatepickerBootstrap() {
        this.datepicker = jQuery([this.datePickerChild.nativeElement]);
        this.datepicker.datetimepicker({
            locale: 'fr',
            minDate: moment('19100101', 'YYYYMMDD'),
            keepOpen: false, // ok
            sideBySide: true,
            viewMode: 'days',
            allowInputToggle: this.allowInputToggle,
            widgetPositioning: {
                horizontal: 'left',
                vertical: 'auto'
            },
            format: this.month ? 'MM/YYYY' : (this.time ? 'DD/MM/YYYY HH: mm' : 'DD/MM/YYYY'),
            date : this.innerDate // IMPORTANT sinon bug au démarrage, datepicker non setté
        }).on('dp.change', eventDate => {
            this.setValueFromDatepicker( eventDate.date === false ? null : eventDate.date.toDate() );
        });
    }

    convertToDate(value) {
        if (value === undefined) {
            value = null;
        }
        if (value && !(value instanceof Date)) {
            value = new Date(value);
        }
        return value;
    }

    togglePopup() {
        // this.datepicker.data('DateTimePicker').show();
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

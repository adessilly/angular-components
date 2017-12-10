import {
    Component, Input, AfterContentInit,
    AfterViewInit, DoCheck, forwardRef, ViewChild
} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

declare var jQuery: any;
declare var bootstrap: any;

@Component({
    selector: 'checkbox-component',
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => CheckboxComponent),
        multi: true
    }],
    templateUrl: 'checkbox.template.html'
})
export class CheckboxComponent implements AfterContentInit, AfterViewInit, DoCheck, ControlValueAccessor {

    @Input() id = '';
    @Input() width = '12';
    @Input() placeholder: string;
    @Input() label: string;
    @Input() readonly = false;
    @Input() hasError = false;
    @Input() message: string;

    @ViewChild('icheckElement')
    icheckChildren: any;
    icheckElement: any = null;

    public onChangeCallback: any;
    public onTouchedCallback: any;
    public ngValue: boolean;

    public simpleMode = true;

    constructor() {}

    setValueFromComponent(v: boolean) {
        this.ngValue = v;
        this.onChangeCallback(v);
    }

    setValueFromParent(v: boolean) {
        this.ngValue = v;
        this.ngDoCheck();
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

    ngAfterContentInit() {
        if (this.width && this.width.substring(0, 3) === 'col') {
            this.simpleMode = false;
        }

        this.icheckChildren.nativeElement.onblur = () => {
            this.onTouchedCallback();
        };
    }

    ngAfterViewInit() {
        this.createICheck();
    }

    getICheckElement() {
        return jQuery([this.icheckChildren.nativeElement]);
    }

    createICheck() {
        this.icheckElement = this.getICheckElement();

        const elem: any = this.icheckElement;
        const self = this;

        elem.iCheck({
            checkboxClass: 'icheckbox_square-blue',
            radioClass: 'iradio_square-blue',
            increaseArea: '20%'
        }).on('ifToggled', function(event) {
            self.switchValue();
        });
    }

    // le OnChanges intervient trop tôt, utiliser le DoCheck
    ngDoCheck() {
        if (this.icheckElement) {
            this.icheckElement.iCheck('update');
        }
    }

    switchValue() {
        if (this.ngValue === true) {
            this.ngValue = false;
        } else {
            this.ngValue = true;
        }
        this.setValueFromComponent(this.ngValue);
    }

}

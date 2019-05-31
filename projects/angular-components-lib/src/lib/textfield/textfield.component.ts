import {Component, Input, forwardRef, ViewChild, AfterContentInit} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

/**
 @author Adrien DESSILLY
 */
@Component({
    selector: 'textfield-component',
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => TextfieldComponent),
        multi: true
    }],
    templateUrl: 'textfield.template.html'
})
export class TextfieldComponent implements ControlValueAccessor, AfterContentInit {

    // propriétés pour les descendants
    // ne devrait pas se trouver ici, mais si elles sont dans le descendants,
    // les Input du parents ne sont pas transmis au descendants
    @Input() rows: number;
    @Input() width = '12';
    @Input() placeholder: string;
    @Input() label: string;
    @Input() id: string;
    @Input() required = false;
    @Input() readonly = false;
    @Input() hasError = false;
    @Input() message: string;
    @Input() type = 'text';

    @ViewChild('inputText', { static: true }) inputText: any;

    public ngValue: number;
    public onChangeCallback: any;
    public onTouchedCallback: any;
    public simpleMode = true;
    public i = 0;

    constructor() {}

    updateData(event) {
        this.setValueFromField(event);
    }

    // @Override AfterContentInit
    ngAfterContentInit() {
        if (this.width && this.width.substring(0, 3) === 'col') {
            this.simpleMode = false;
        }

        this.inputText.nativeElement.onblur = () => {
            this.onTouchedCallback();
        };
    }

    setValueFromField(v: number) {
        this.ngValue = v;
        this.onChangeCallback(v);
    }

    setValueFromParent(v: number) {
        this.ngValue = v;
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

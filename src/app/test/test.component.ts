import {
    Component, Input, Output, EventEmitter, AfterContentInit,
    OnChanges, SimpleChanges, Inject, ElementRef, forwardRef
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

/**
 @author Adrien DESSILLY
 */
@Component({
    selector: 'test-component',
    providers: [{
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TestComponent),
      multi: true
    }],
    template: `
    <div style="border-radius:5px;background-color:#fefefe;padding:10px;">
    <button  class="btn btn-primary" (click)="setValueFromButton(1)">SET 1</button>
    <button  class="btn btn-primary" (click)="setValueFromButton(2)">SET 2</button>
    <p style="margin-bottom:0px;">Valeur interne : {{innerValue}}</p>
    </div>
    `
})
export class TestComponent implements ControlValueAccessor {

    public onChangeCallback: any;
    public innerValue:number;

    setValueFromButton(v:number) {
        this.innerValue = v;
        this.onChangeCallback(v);
    }

    setValueFromParent(v:number) {
        this.innerValue = v;
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
    registerOnTouched(fn: any) {}

}

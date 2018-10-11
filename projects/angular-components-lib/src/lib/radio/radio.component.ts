import {Component, Input, AfterContentInit, ElementRef, forwardRef} from '@angular/core';
import {RadioListener} from './radioListener.interface';
import {RadioService} from './radio.service';
import {NG_VALUE_ACCESSOR, ControlValueAccessor} from '@angular/forms';

/**
 @author Adrien DESSILLY
 */
@Component({
    selector: 'radio-component',
    templateUrl: 'radio.template.html',
    styleUrls: ['radio.style.css', 'radioDefaultTheme.style.css'],
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => RadioComponent),
        multi: true
    }],
})
export class RadioComponent implements RadioListener, AfterContentInit, ControlValueAccessor {

    @Input() width = '12';
    @Input() label: string;
    @Input() name: string;
    @Input() value: string;
    @Input() disabled = false;
    @Input() required = false;
    @Input() readonly = false;
    @Input() hasError = false;
    @Input() message: string;

    public onChangeCallback: any;
    public onTouchedCallback: any;
    public ngValue: string;
    public simpleMode = true;
    public labelWidth: number;
    public isChecked = false;

// Va permettre d'injecter radioService
// RadioService va faire le lien entre les radio de groupe identique
    constructor(private radioService: RadioService, private element: ElementRef) {
    }

    register() {
        this.radioService.register(this);
    }

    notifyObservers() {
        this.radioService.notifyObservers(this);
    }

    setValueFromComponent(v: string) {
        this.ngValue = v;
        this.onChangeCallback(v);
    }

    setValueFromParent(v: string) {
        this.ngValue = v;
        this.refreshRadio();
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

    // S'abonner au service observer quand le composant est intialisé
    // @Override AfterContentInit
    ngAfterContentInit() {
        if (this.width && this.width.substring(0, 3) === 'col') {
            this.simpleMode = false;
        }
        this.register();
        this.refreshRadio();
    }

    setInputWidth(width: string) {
        this.width = width;
    }

    getWidth(): string {
        return this.width;
    }

    // on change RADIO COMPOSANT -> PARENT COMPOSANT
    // @Override RadioListener
    notifyRadioChanged(radioListener: RadioListener) {
        this.isChecked = radioListener === this;
        // Répercuter la valeur chez le parent
        if (this.isChecked) {
            this.ngValue = this.value;
            this.setValueFromComponent(this.ngValue);
        }
    }

    // @Override RadioListener
    getName() {
        return this.name;
    }

    radioButtonClicked(event) {
        if (this.disabled) {
            return;
        }
        this.radioService.notifyObservers(this);
    }

    refreshRadio() {
        if (this.ngValue === this.value) {
            this.radioService.notifyObservers(this);
        }
    }

}

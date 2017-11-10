import {Component, forwardRef} from '@angular/core';
import {TextfieldComponent} from '../textfield/textfield.component';
import {NG_VALUE_ACCESSOR} from '@angular/forms';

/**
 @author phw
 */
@Component({
    selector: 'textarea-component',
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => TextareaComponent),
        multi: true
    }],
    templateUrl: 'textarea.template.html'
})
export class TextareaComponent extends TextfieldComponent {

    // problème : dès que l'on déclare un @Input, on perds les Inputs du parent
    // en attendant d'avoir une solution, on ajoute les propriétés nécessaires dans le parent
    constructor() {
        super();
    }

}

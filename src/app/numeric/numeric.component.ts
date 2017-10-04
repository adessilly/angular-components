import { Component, Input , Output, EventEmitter, AfterContentInit, forwardRef} from '@angular/core';
import {TextfieldComponent} from "../textfield/textfield.component";
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";

/**
 @author phw
 */
@Component({
  	providers: [{
  		provide: NG_VALUE_ACCESSOR,
  		useExisting: forwardRef(() => NumericComponent),
  		multi: true
  	}],
    selector: 'numeric-component',
    templateUrl: 'numeric.template.html'
})
export class NumericComponent extends TextfieldComponent {

    //problème : dès que l'on déclare un @Input, on perds les Inputs du parent
    //en attendant d'avoir une solution, on ajoute les propriétés nécessaires dans le parent

    constructor(){
        super();
    }

}

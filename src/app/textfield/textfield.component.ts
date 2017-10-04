import {Component, Input, forwardRef, ViewChild} from "@angular/core";
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";

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
export class TextfieldComponent implements ControlValueAccessor {

	@Input()
	width:string = "12";
	@Input()
	placeholder:string;
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
	@Input()
	type = 'text';

	public ngValue:number;
	public onChangeCallback: any;
	public onTouchedCallback: any;
	public simpleMode: boolean = true;

	@ViewChild('inputText')
	inputText:any;

	//propriétés pour les descendants
	//ne devrait pas se trouver ici, mais si elles sont dans le descendants, les Input du parents ne sont pas transmis au descendants
	@Input()
	rows: number;

	constructor(){}

	updateData(event) {
		this.setValueFromField(event);
	}

	public i:number = 0;

	// S'abonner au service observer quand le composant est intialisé
	// @Override AfterContentInit
	ngAfterContentInit() {
		if (this.width && this.width.substring(0, 3) == "col") {
			this.simpleMode = false;
		}

		this.inputText.nativeElement.onblur = () => {
			this.onTouchedCallback();
		};
	}

	setValueFromField(v:number) {
		this.ngValue = v;
		this.onChangeCallback(v);
	}

	setValueFromParent(v:number) {
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

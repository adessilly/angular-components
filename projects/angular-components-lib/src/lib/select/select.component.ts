import {
    Component,
    Input,
    ElementRef,
    OnChanges,
    AfterContentInit,
    SimpleChanges, ViewChild, forwardRef
} from '@angular/core';
import {NG_VALUE_ACCESSOR, ControlValueAccessor} from '@angular/forms';

declare var $: any;
declare var jQuery: any;

/**

  Select2 encapsulé dans Angular2 en lien bidirectionnel.
  ngValue est utilisé plutôt que ngModel car ngModel est une propriété par défaut de Angular2, qui
  requiert des initialisations supplémentaires.

  Pour info sur ngModel, rechercher : ControlValueAccessor : http://almerosteyn.com/2016/04/linkup-custom-control-to-ngcontrol-ngmodel

 @author Adrien DESSILLY
 */
@Component({
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => SelectComponent),
        multi: true
    }],
    selector: 'select-component',
    templateUrl: 'select.template.html',
    styleUrls: ['select.style.css']
})
export class SelectComponent implements AfterContentInit, ControlValueAccessor, OnChanges {

    public innerValue: any;
    public onChangeCallback: any;
    public onTouchedCallback: any;

    @Input() values: any[];

    @Input() width = '12';
    @Input() label: string;
    @Input() id: string;

    @Input() required = false;
    @Input() readonly = false;
    @Input() hasError = false;
    @Input() message: string;

    @ViewChild('select2') select2Html;

    public currentSelectValue: any;
    public simpleMode = true;

    constructor(private element: ElementRef) {
    }

    // @Override AfterContentInit
    ngAfterContentInit() {
        if (this.width && this.width.substring(0, 3) === 'col') {
            this.simpleMode = false;
        }
        this.initSelect2();
    }

    setValueFromSelect(v: any) {
        this.innerValue = v;
        this.onChangeCallback(v);
    }

    setValueFromParent(v: any) {
        this.innerValue = v;
        this.initSelect2();
    }

    // update select2 -> parent
    updateData(event) {

        if (event) {

            if (event instanceof Array) {

                let valArray: Object[] = [];
                for (let item of event) {
                    if (item.value) {
                        valArray = [...valArray, item.value];
                    } else {
                        valArray = [...valArray, item];
                    }
                }

                this.setValueFromSelect(valArray);

            } else {

                if (event.value) {
                    this.setValueFromSelect(event.value);
                } else {
                    this.setValueFromSelect(event);
                }
            }
        }

    }

    /**
     * Vider le select2 au cas où il existait déjà
     */
    emptySelect2() {
        let jqSelect2: any = $(this.select2Html.nativeElement);
        jqSelect2.select2({data: null, language: this.getSelect2Lang});
        jqSelect2.html('');
        jqSelect2.off('change');
        jqSelect2.off('select2:close');
    };

    /**
     * Initialiser le select2
     */
    initSelect2() {
        this.emptySelect2();
        let self = this;

        // init select2
        let jqSelect2: any = jQuery(this.select2Html.nativeElement);
        jqSelect2.select2({
            data: this.values,
            language: this.getSelect2Lang,
            width: '100%',
            multiple: (this.innerValue instanceof Array)
        });

        jqSelect2.on('select2:close', function (e) {
            self.onTouchedCallback();
        });

        // -> setValue (oninit)
        if (this.innerValue) {
            this.currentSelectValue = this.convertValueForSelect2(this.innerValue);
            jqSelect2.val(this.currentSelectValue).trigger('change');
        }

        // <- getValue (onchange)
        jqSelect2.on('change', function() {
            const obj = jqSelect2.select2('val');
            let val = null;
            if (obj instanceof Array) {
                val = self.findArrayObjFromArrayVal(obj);
            } else {
                val = self.findObjFromVal(obj);
            }
            self.updateData(val);
        });

    }

    // Pour sélectionner un élément dans le select2, il ne faut pas fournir l'objet,
    // mais l'id de cet objet. Si c'est un array, c'est un array d'ids
    convertValueForSelect2(obj: any): any {
        if (obj instanceof Array) {
            return this.convertArrayObjToArrayId(obj);
        } else {
            return this.convertObjToId(obj);
        }
    }

    // Convertir un array d'objets en array d'ids (voir convertValueForSelect2)
    convertArrayObjToArrayId(arrayObj: Object[]): string[] {
        let arraySelect2Vals: string[] = [];

        for (let value of arrayObj) {
            const select2val = this.convertObjToId(value);
            arraySelect2Vals = [ ...arraySelect2Vals, select2val ];
        }

        return arraySelect2Vals;
    }

    // Convertir un objets en string contenant l'id (voir convertValueForSelect2)
    // ou renvoyer un string
    convertObjToId(obj: any): string {
        if (obj.id) {
            return obj.id;
        } else {
            return obj.toString();
        }
    }

    findArrayObjFromArrayVal(valArrayFromSelect2: Array<Object>) {
        let objectValue: Object[] = [];
        for (let value of valArrayFromSelect2) {
            let select2Val = this.findObjFromVal(value);
            if (select2Val != null) {
                objectValue = [...objectValue, select2Val];
            }
        }
        return objectValue;
    }

    findObjFromVal(val: any) {
        for (let value of this.values) {
            if (value.id && '' + value.id === '' + val) {
                return value;
            }
            if (!value.id && '' + value.id === '' + val) {
                return value;
            }
        }
        return null;
    }

    getSelect2Lang() {
        return {
            errorLoading: () => 'Le résultat ne peut être affiché.',
            inputTooLong: args => 'Veuillez supprimer des caractères.',
            inputTooShort: args => 'Veuillez saisir des caractères.',
            loadingMore: args => 'Chargement des résultats...',
            maximumSelected: args => 'Vous ne pouvez sélectionner que ' + args.maximum + ' valeurs',
            noResults: () => 'Aucun résultat',
            searching: () => 'Recherche en cours...'
        };
    }

    // on change PARENT COMPOSANT -> SELECT COMPOSANT
    // ->Si on modifie dans un composant parent la valeur, il faut rafraîchir la select
    // pour peut être sélectionner ou désélectinoner la select
    // https://angular.io/docs/ts/latest/api/core/index/OnChanges-class.html
    // @Override ControlValueAccessor
    writeValue(v: any) {
        this.setValueFromParent(v);
    }

    // ngChange doit aussi être utilisé si on change la liste (et pas l'element selectionne)
    ngOnChanges(changes: SimpleChanges) {
        this.initSelect2();
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

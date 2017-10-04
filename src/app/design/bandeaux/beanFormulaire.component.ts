import {Component, OnInit} from "@angular/core";
import {BaseModal} from "../../switchView/baseModal";

@Component({
    selector: 'bean-formulaire',
    template : `
        <div class="row">
            <textfield-component [(ngModel)]="data.nom" label="Nom" width="col-md-6"></textfield-component>
            <textfield-component [(ngModel)]="data.prenom" label="Prénom" width="col-md-6"></textfield-component>
            <textfield-component [(ngModel)]="data.nom" label="Nom" width="col-md-6"></textfield-component>
            <select-component [(ngModel)]="data.choix" [values]="data.valuesSelect" label="Choix" width="col-md-6" [readonly]="false" [required]="false" [hasError]="false"></select-component>
        </div>
    `,
})
export class BeanFormulaireComponent extends BaseModal {

    constructor() {
        super();
    }

    ngOnInit(){}
}

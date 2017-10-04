
import {
    Component, ViewContainerRef, ViewChild, ComponentRef, ComponentFactoryResolver, Injector
} from "@angular/core";
import {SharedService} from "./shared.service";
import {FormBuilder, FormGroup} from "@angular/forms";

declare var $: any;

@Component({
    selector: 'modal-comp',
    template: `
<style>
#theModal .modal-header {
    background: #3c8dbc;
    color: white;
}
#theModal .modal-footer button {
    min-width:85px;
}
</style>
    <div class="modal fade" id="theModal" role="dialog" aria-labelledby="theModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <form [formGroup]="formGroup" autocomplete="on" novalidate>
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close" (close)="close()">
                            <i class="fa fa-times" style="padding-top:3px;" aria-hidden="true"></i>
                       </button>
                        <h4 class="modal-title" id="theModalLabel"><i class="fa" [ngClass]="icon"></i>&nbsp;&nbsp;{{title}}</h4>
                    </div>
                <div class="modal-body">
                        <div class="row">
                            <div class="col-md-12">
                                <div #theBody>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default btn-flat" style="margin-right:8px;" data-dismiss="modal" (click)="close()">
                            <i class="fa fa-undo"></i>&nbsp;&nbsp;Annuler
                        </button>
                        <button type="button" class="btn btn-primary btn-flat faa-parent animated-hover" data-dismiss="modal" (click)="validate()" [disabled]="!formGroup.valid">
                            <i class="fa fa-check faa-tada"></i>&nbsp;&nbsp;Valider
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
`
})
export class ModalComponent {
    @ViewChild('theBody', {read: ViewContainerRef}) theBody;

    cmpRef:ComponentRef<any>;
    originalData:any=null;
    copyOriginalData:any=null;
    copyOriginalData2:any=null; // TODO : A modifier
    title:string;
    icon:string="";

    initCloneFunction:(original:any) => any = null;
    commitCloneFunction:(original:any, clone:any) => any = null;

    //pour utilisation de formControl...
    formGroup: FormGroup = null;
    initLocalDataFunction : (value:any)=>void = null;
    updateOriginalDataFunction : (originalData:any)=>void = null;

    constructor(
        sharedService:SharedService,
        private componentFactoryResolver: ComponentFactoryResolver,
        injector: Injector,
        fb: FormBuilder) {

        console.log("ModalComponent constructor");

        this.formGroup = fb.group({});

        sharedService.showModal.subscribe(msg => {

            // msg.title = Type de la fenêtre
            // msg.type = Type du composant contenu le formulaire (Qui sera le body de la fenêtre modal)
            // msg.data = Données du formulaire
            // msg.codificationList = Liste contenant toutes les listes pour les codifications. Ces différentes listes seront ajoutées à l'objet data pour le binding des Select2

            console.log("ModalComponent subscribe");
            console.log(msg);

            this.title = msg.title;
            this.icon = msg.icon;

            if(this.cmpRef) {
                this.cmpRef.destroy();
            }
            let factory = this.componentFactoryResolver.resolveComponentFactory(msg.type);
            this.cmpRef = this.theBody.createComponent(factory);

            //copie des fonctions de clonage
            this.initCloneFunction = msg.initCloneFunction;
            this.commitCloneFunction = msg.commitCloneFunction;

            // Prendre une copie de l'objet avec les données du formulaire.
            this.initClone(msg.data, msg.data2);

            // Ajout des différents listes des codifications à l'objet data utilisé dans le composant qui définit le body de la modal (le formulaire)
            if (msg.codificationList != null) {
                var i : number = 0;
                 for (let o of msg.codificationList) {
                     console.log("codif : ");
                     console.log(o[0]);
                     if (i == 0) {
                         this.cmpRef.instance.codif = Object.assign({}, o[0]);
                     } else {
                        Object.assign(this.cmpRef.instance.codif, o[0]);
                     }
                     i++;
                 }
            }

            if (msg.codificationMap != null){
                this.cmpRef.instance.codificationMap = Object.assign({}, msg.codificationMap);
            }

            if (msg.onValidated != null){
                this.cmpRef.instance.onValidated = msg.onValidated;
            }

            // Copier la référence de l'objet contenant les données du formulaire. Cet objet sera mis à jour si l'utilisateur Valide les modifications.
            this.copyOriginalData = msg.data;
            this.copyOriginalData2 = msg.data2;

            //copie du formGroup et de la méthode de submit selon la def du composant injecté
            if (this.cmpRef.instance['formGroup']){
                console.log("this.cmpRef.instance['formGroup'] : ");
                console.log(this.cmpRef.instance['formGroup']);
                this.formGroup = this.cmpRef.instance['formGroup'];
            }

            this.initLocalDataFunction = this.cmpRef.instance['initLocalDataFunction'];
            this.updateOriginalDataFunction = this.cmpRef.instance['updateOriginalDataFunction'];
            if (this.initLocalDataFunction){
                this.initLocalDataFunction(msg.data);
            }

            $('#theModal').modal('show');
        });
    }

    close() {
        if(this.cmpRef) {
            this.cmpRef.destroy();
        }
        this.cmpRef = null;
    }

    validate() {
        if(this.cmpRef) {
            // Màj des données du formulaire
            this.commitClone();
            if (this.updateOriginalDataFunction){
                this.updateOriginalDataFunction(this.copyOriginalData);
                if (this.cmpRef.instance.onValidated) this.cmpRef.instance.onValidated.emit(this.cmpRef.instance);
            }
            this.cmpRef.destroy();
        }
        this.cmpRef = null;
    }

    initClone(originalData, originalData2){
        // Prendre une  copie de l'objet avec les données du formulaire.
        if (this.initCloneFunction){
            if (originalData){
                this.cmpRef.instance.data = this.initCloneFunction(originalData);
            }
            if (originalData2){
                this.cmpRef.instance.data2 = this.initCloneFunction(originalData2);
            }
        } else {
            if (originalData){
                this.cmpRef.instance.data = Object.assign({} , originalData);
            }
            if (originalData2){
                this.cmpRef.instance.data2 = Object.assign({} , originalData2); // TODO : A modifier !!!
            }
        }
    }

    commitClone(){
        if (this.commitCloneFunction){
            if (this.copyOriginalData){
                this.commitCloneFunction(this.copyOriginalData, this.cmpRef.instance.data);
            }
            if (this.copyOriginalData2) {  // TODO : A modifier !!
                this.commitCloneFunction(this.copyOriginalData2, this.cmpRef.instance.data2);
            }
        } else {
            if (this.copyOriginalData){
                Object.assign(this.copyOriginalData, this.cmpRef.instance.data);
            }
            if (this.copyOriginalData2) {  // TODO : A modifier !!
                Object.assign(this.copyOriginalData2, this.cmpRef.instance.data2);
            }
        }

    }
}

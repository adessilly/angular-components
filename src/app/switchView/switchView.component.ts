import {
    Component, OnInit, Input, ComponentRef, ComponentFactoryResolver, ViewContainerRef,
    ViewChild, EventEmitter, Output
} from '@angular/core';
import {SharedService} from './shared.service';
import {FormBuilder} from '@angular/forms';
import {BaseModal} from './baseModal';

@Component({
    selector: 'switchView',
    templateUrl: 'switchView.component.html'
})
export class SwitchViewComponent implements OnInit {

    @Input() id: string;
    // Le titre de la box (Utilisé pour le bandeau,  le formulaire ou le titre de la fenêtre modal)
    @Input() title: string;
    @Input() icon = '';
    // Les données du formulaires
    @Input() data: any;
    @Input() data2: any;
    // La liste des codifications pour les Select2
    @Input() codificationList: Array<Array<any>>;
    @Input() codificationMap: {};
    // Le type du composant à utiliser pour afficher le formulaire
    @Input() formComponentType: any;
    // Indique le mode de fonctionnement (Bandeau ou formulaire (cas de l'ajout))
    @Input() modeBandeau = true;
    // méthode utilisée pour cloner les objets
    @Input() initCloneFunction: (original: any) => any = null;
    // méthode utilisée pour copier les valeurs du clone dans l'objet de données original
    @Input() commitCloneFunction: (original: any, clone: any) => any = null;
    @Input() boxStyle = 'box-default';
    @Input() boxStyleForm = '';
    @Input() boxOpen = true;

    @Output() onValidated: EventEmitter<BaseModal> = new EventEmitter<BaseModal>();

    // Référence vers la div dans laquelle doit être injecté le formulaire
    @ViewChild('bodyBoxFormulaire', {read: ViewContainerRef}) bodyBoxFormulaire;

    public arrowOpen = true;
    public cmpRef: ComponentRef<any>;
    // formGroup utilisé en mode inline (bandeau == false)
    public formGroupInline: any = null;

    constructor(private sharedService: SharedService,
                private componentFactoryResolver: ComponentFactoryResolver,
                private fb: FormBuilder) {
        this.formGroupInline = this.fb.group({});
    }

    ngOnInit() {

        if (this.modeBandeau === false) {
            if (this.cmpRef == null || this.cmpRef === undefined) {
                let factory = this.componentFactoryResolver.resolveComponentFactory(this.formComponentType);
                this.cmpRef = this.bodyBoxFormulaire.createComponent(factory);

                if (this.data) {
                    this.cmpRef.instance.data = this.data;
                }

                if (this.data2) {
                    this.cmpRef.instance.data2 = this.data2;
                }

                this.cmpRef.instance.modalMode = false;

                if (this.cmpRef.instance.formGroup) {
                    this.formGroupInline = this.cmpRef.instance.formGroup;
                }
                if (this.cmpRef.instance.initLocalDataFunction) {
                    this.cmpRef.instance.initLocalDataFunction(this.data);
                }

                if (this.codificationList != null) {
                    for (let o of this.codificationList) {
                        // console.log('codif : '); console.log(o[0]);
                        this.cmpRef.instance.codif = Object.assign({}, o[0]);
                    }
                }

                if (this.codificationMap != null) {
                    this.cmpRef.instance.codificationMap = Object.assign({}, this.codificationMap);
                }

                if (this.onValidated) {
                    this.cmpRef.instance.onValidated = this.onValidated;
                }
            }
        }

        this.arrowOpen = this.boxOpen;
    }

    edit() {
        let params = {
            'type': this.formComponentType,
            'title': this.title,
            'data': this.data,
            'data2': this.data2,
            'codificationList': this.codificationList,
            'codificationMap': this.codificationMap,
            'initCloneFunction': this.initCloneFunction,
            'commitCloneFunction': this.commitCloneFunction,
            'icon': this.icon,
            'onValidated': this.onValidated
        };
        // envoi des infos de la modal au Subject showModal (une 'sorte d'Observable'),
        // le ModalComponent écoute et pourra charger le composant dans sa fenêtre modale
        this.sharedService.showModal.next(params);
    }

    toggleBoxArrow() {
        this.arrowOpen = !this.arrowOpen;
    }

    validate() {
        if (this.cmpRef && this.cmpRef.instance) {
            if (this.cmpRef.instance.beforeSave()) {
                this.cmpRef.instance.updateOriginalDataFunction(this.data);
            }
        }
    }

    // relance la fonction d'initalisation de form avec les datas données
    refreshDetailDatas(datas) {
        this.data = datas;
        if (this.cmpRef.instance.initLocalDataFunction) {
            this.cmpRef.instance.initLocalDataFunction(this.data);
        }
    }

    refreshCodification(codificationMap) {
        this.codificationMap = codificationMap;
        this.cmpRef.instance.codificationMap = codificationMap;
        this.cmpRef.instance.refreshCodification();
    }

    // retourne l'instance du composant instancié dans le switchView (cas modeBandeau = false)
    // permet d'invoquer des fonctions de se composant par la composant qui inclu le switchview
    getComponentInstance() {
        if (this.cmpRef) {
            return this.cmpRef.instance;
        } else {
            return null;
        }
    }

    setData(data: any) {
        console.log('set data :', data);
        this.data = data;
        if (this.cmpRef && this.cmpRef.instance) {
            console.log('set data : initLocalDataFunction')
            this.cmpRef.instance.initLocalDataFunction(data);
        }
    }

}

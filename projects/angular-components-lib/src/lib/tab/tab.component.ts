import {
    Component,
    Input,
    Output,
    EventEmitter,
    AfterContentInit,
    OnChanges,
    SimpleChanges,
    ElementRef
} from '@angular/core';
import {TabListener} from './tabListener.interface';
import {TabService} from './tab.service';

/**
 @author Adrien DESSILLY
 */
@Component({
    selector: 'tab-component',
    templateUrl: 'tab.template.html',
    styleUrls: [
        'tab.style.css'
    ]
})
export class TabComponent implements TabListener, AfterContentInit, OnChanges {

    @Input() width: number;
    @Input() label: string;
    @Input() name: string;
    @Input() value: string;
    @Input() ngValue: any;
    @Input() disabled = false;
    @Output() ngValueChange: any = new EventEmitter();

    public inputWidth = 12;
    public isChecked = false;

    // Va permettre d'injecter radioService
    // RadioService va faire le lien entre les radio de groupe identique
    constructor(private tabService: TabService, private element: ElementRef) {
    }

    // S'abonner au service observer quand le composant est intialisé
    // @Override AfterContentInit
    ngAfterContentInit() {

        if (this.width) {
            this.inputWidth = this.width;
        } else {
            let nbTabs = document.querySelectorAll('tab-component[name=' + this.name + ']').length;
            this.inputWidth = Math.floor(12 / nbTabs);
        }

        this.tabService.register(this);
        this.refreshTab();

    }

    // on change PARENT COMPOSANT -> RADIO COMPOSANT
    // ->Si on modifie dans un composant parent la valeur, il faut rafraîchir la radio
    // pour peut être sélectionner ou désélectinoner la radio
    // https://angular.io/docs/ts/latest/api/core/index/OnChanges-class.html
    // @Override OnChanges (classe par défaut Angular2)
    ngOnChanges(changes: SimpleChanges) {
        this.refreshTab();
    }

    // on change RADIO COMPOSANT -> PARENT COMPOSANT
    // @Override RadioListener
    notifyTabChanged(tabListener: TabListener) {
        this.isChecked = tabListener === this;
        // Répercuter la valeur chez le parent
        if (this.isChecked) {
            this.ngValue = this.value;
            this.ngValueChange.emit(this.value);
        }
    }

    // @Override RadioListener
    getName() {
        return this.name;
    }

    tabClicked(event) {
        this.tabService.notifyObservers(this);
    }

    refreshTab() {
        if (this.ngValue === this.value) {
            this.tabService.notifyObservers(this);
        }
    }

}

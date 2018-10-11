import {Directive, ElementRef, Input, OnChanges, SimpleChanges, AfterContentInit} from '@angular/core';

declare var jQuery: any;

/*
    Attribut rendant n'importe quel élément du DOM loadable
    Pré-requis :
    - font-awesome (sinon l'icone de chargement ne se verra pas)
    @author Adrien DESSILLY
*/
@Directive({
    selector: '[loadable]'
})
export class LoadableDirective implements AfterContentInit, OnChanges {

    @Input('loadable') loading: boolean;

    elementRef: HTMLElement;

    constructor(private el: ElementRef) {
        this.elementRef = el.nativeElement;
    }

    // @Override AfterContentInit
    ngAfterContentInit() {

        // Mettre ceci à la fin du composant html renseigné comme étant [loadable]
        // il s'agit d'une div en absolute se mettant par dessus, devenant légèrement transparente
        // et avec une icone font awesome de loading lorsqu'elle est visible
        const template = `
            <div class="loadingHidden overlay">
                <i class="fa fa-refresh fa-spin"></i>
            </div>
        `;

        jQuery(this.elementRef).addClass('loadable');
        jQuery(this.elementRef).append(template);

    }

    ngOnChanges(simpleChange: SimpleChanges) {
        if (this.loading) {
            jQuery(this.elementRef).children('.overlay').removeClass('loadingHidden');
        } else {
            jQuery(this.elementRef).children('.overlay').addClass('loadingHidden');
        }
    }

    /*
    Pour info, pourrait être utile pour une autre directive
    Ajouter HostListener dans les imports @angular/core
    https://angular.io/docs/ts/latest/guide/attribute-directives.html

    @HostListener('mouseenter') onMouseEnter() {
    }
    @HostListener('mouseleave') onMouseLeave() {
    }
    */
}

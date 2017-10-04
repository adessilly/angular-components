import { Directive, ElementRef, Input, OnChanges, SimpleChanges, AfterContentInit } from '@angular/core';

declare var $: any;

/*

    Attribut rendant n'importe quel élément du DOM loadable

    Pré-requis :
    - font-awesome (sinon l'icone de chargement ne se verra pas)
    - le css de la loading à mettre au préalable :

    .loadable {
        position:relative;
    }
    .loadable > .overlay,
    .overlay-wrapper > .overlay,
    .loadable > .loading-img,
    .overlay-wrapper > .loading-img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
    .loadable .overlay,
    .overlay-wrapper .overlay {
      z-index: 50;
      background: rgba(255, 255, 255, 0.7);
      border-radius: 3px;
    }
    .loadable .overlay > .fa,
    .overlay-wrapper .overlay > .fa {
      position: absolute;
      top: 50%;
      left: 50%;
      margin-left: -15px;
      margin-top: -15px;
      color: #000;
      font-size: 30px;
    }
    .loadable .overlay.dark,
    .overlay-wrapper .overlay.dark {
      background: rgba(0, 0, 0, 0.5);
    }
    .overlay {
        cursor: wait;
    }
    .overlay.loadingHidden {
        display:none;
    }

    @author Adrien DESSILLY

*/
@Directive({
    selector: '[loadable]'
})
export class LoadableDirective implements AfterContentInit, OnChanges {

    @Input('loadable') loading: boolean;

    elementRef:HTMLElement;

    constructor(el: ElementRef) { this.elementRef = el.nativeElement; }

    // @Override AfterContentInit
	ngAfterContentInit() {

        // Mettre ceci à la fin du composant html renseigné comme étant [loadable]
        // il s'agit d'une div en absolute se mettant par dessus, devenant légèrement transparente
        // et avec une icone font awesome de loading lorsqu'elle est visible
        var template:string = `
            <div class="loadingHidden overlay">
                <i class="fa fa-refresh fa-spin"></i>
            </div>
        `;

        $(this.elementRef).addClass('loadable');
        $(this.elementRef).append(template);

	}

    ngOnChanges(simpleChange:SimpleChanges){
        console.log(this.loading);
        if(this.loading) {
            $(this.elementRef).children('.overlay').removeClass('loadingHidden');
        } else {
            $(this.elementRef).children('.overlay').addClass('loadingHidden');
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

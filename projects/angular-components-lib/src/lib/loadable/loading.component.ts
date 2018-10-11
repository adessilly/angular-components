import {
    Component,
    Input
} from '@angular/core';

/**
 @author Adrien DESSILLY
 */
@Component({
    selector: 'loading-component',
    template: `
        <div class="loadable-component">
            <div class="overlay" [class.loadingHidden]="!ngValue">
                <i class="fa fa-refresh fa-spin"></i>
            </div>
        </div>
    `,
    styleUrls: [
        'loading.style.css',
    ]
})
export class LoadingComponent {

    @Input()
    ngValue: any;

}

import {Component, Input, OnInit} from '@angular/core';
/**
 @author phw
 */
@Component({
    selector: 'box-component',
    templateUrl: 'box.template.html'
})
export class BoxComponent implements OnInit{

    @Input() title: string;
    @Input() boxOpen = true;
    @Input() boxStyle = 'box-default';

    public arrowOpen = true;

    constructor() {}

    ngOnInit() {
        this.arrowOpen = this.boxOpen;
    }

}

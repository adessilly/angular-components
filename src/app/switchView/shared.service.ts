import {Subject} from 'rxjs/Rx';
import {Injectable} from '@angular/core';

@Injectable()
export class SharedService {
    showModal: Subject<any> = new Subject();
}
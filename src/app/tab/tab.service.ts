import {Injectable} from '@angular/core';
import {TabListener} from './tabListener.interface';

/**
 Classe servant de singleton observer-observable.
 Pour être singleton il doit être déclaré au niveau du bootstrap et PAS dans
 les inclusions des composants providers: [xxx], sinon nouvelle instance
 */
@Injectable()
export class TabService {

    private listeners: TabListener[] = [];

    register(listener: TabListener) {
        this.listeners.push(listener);
    }

    cancel(tabListener: TabListener) {
        let i = 0;
        for (let listener of this.listeners) {
            if (listener === tabListener) {
                this.listeners.splice(i, 1);
            }
            i++;
        }
    }

    notifyObservers(tabListener: TabListener) {
        for (let listener of this.listeners) {
            if (tabListener.getName() === listener.getName()) {
                listener.notifyTabChanged(tabListener);
            }
        }
    }
}

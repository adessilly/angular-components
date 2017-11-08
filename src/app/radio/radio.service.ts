import { Injectable }       from '@angular/core';
import { RadioListener }    from './radioListener.interface';

/**
Classe servant de singleton observer-observable.
Pour être singleton il doit être déclaré au niveau du bootstrap et PAS dans
les inclusions des composants providers: [xxx], sinon nouvelle instance
*/
@Injectable()
export class RadioService {

    private listeners:RadioListener[] = [];

    register(listener:RadioListener) {
        this.listeners.push(listener);
    }

    cancel(radioListener:RadioListener) {
        var i:number = 0;
        for(var listener of this.listeners) {
            if(listener == radioListener) {
                this.listeners.splice(i , 1);
            }
            i++;
        }
    }

    notifyObservers(radioListener:RadioListener) {
        for(var listener of this.listeners) {
          if(radioListener.getName() == listener.getName())
            listener.notifyRadioChanged(radioListener);
        }
    }

}

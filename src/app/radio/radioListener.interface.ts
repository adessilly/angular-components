import { Component, Input , Output, EventEmitter, Inject } from '@angular/core';
import { RadioComponent } from './radio.component';

export interface RadioListener {
    notifyRadioChanged(radioComponent:RadioListener):void;
    getName():string;
}

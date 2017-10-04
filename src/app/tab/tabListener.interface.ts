import { Component, Input , Output, EventEmitter, Inject } from '@angular/core';

export interface TabListener {
    notifyTabChanged(tabComponent:TabListener):void;
    getName():string;
}

export interface RadioListener {
    notifyRadioChanged(radioComponent: RadioListener): void;
    getName(): string;
}

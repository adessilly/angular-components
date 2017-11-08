
import {EventEmitter} from '@angular/core';

export class BaseModal {

    // objet de données pour binding classique ngModel
    data: any = null;
    data2: any = null;
    // depracated, use codificationMap
    codif: any = null;
    codificationMap: any = null;
    modalMode = true;

    // formGroup pour binding avec formControl
    formGroup: any = null;

    onValidated: EventEmitter<BaseModal> = null;

    constructor() {
    }

    // pour init le formGroup
    initLocalDataFunction(originalData) {
        if (originalData && this.formGroup && this.formGroup.controls) {

            let val = {};

            // attention, on doit fournir au formGroup un objet qui contient des proprios pour chaque controls du formGroup
            for (var prop in this.formGroup.controls) {
                val[prop] = null;
            }

            // parcourir les originalData pour ne recopier que les propriétés qui existent dans formGroup
            for (var prop in originalData) {
                if (this.formGroup.value.hasOwnProperty(prop)) {
                    val[prop] = (originalData[prop] != undefined && originalData[prop] != null) ? originalData[prop] : null;
                }
            }

            this.formGroup.setValue(val);
        }
    }

    // pour mettre à jour un objet original avec le formGroup
    updateOriginalDataFunction(originalData) {
        if (this.formGroup && originalData) {
            let objetFromForm: any = this.formGroup.getRawValue();
            Object.assign(originalData, objetFromForm);
        }
    }

    // vérifie si si formGroup contient au moins un control touched et invalide
    existsControlInvalidTouched(): boolean {
        if (this.formGroup && this.formGroup.controls) {
            for (var prop in this.formGroup.controls) {
                if (this.formGroup.controls[prop].touched && !this.formGroup.controls[prop].valid) {
                    return true;
                }
            }
        }
        return false;
    }

    // méthode exécutée lors d'une demande de refresh des codifs par le switchView
    // a implémenter dans les descendants qui souhaitent exploiter la codificationMap pour garnir les codifs
    public refreshCodification() {
    }

    /**
     * méthode exécutée par le switchview avant le save, permet d'effectuer des opérations sur le formulaire
     */
    public beforeSave() {
        return true;
    }

}

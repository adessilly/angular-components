
export class DateRange {

  public startDate: Date;
  public endDate: Date;
  public locale: any = DateRangeFactory.createDefaultLocale();
  public applyClass = 'btn-primary';

}

export class DateRangeWithOptions extends DateRange {

  public minDate: Date;
  public maxDate: Date;
  public dateLimit: any;
  public ranges: any;
  public opens: string; // 'left' 'right' 'center'
  public drops: string; // 'down' 'up'
  public cancelClass: string;
  public parentEl: string; // (string) jQuery selector of the parent element that the date range picker will be added to
  public buttonClasses: string[];
  public showDropdowns: boolean;
  public showWeekNumbers: boolean;
  public showISOWeekNumbers: boolean;
  public timePicker: boolean;
  public timePickerIncrement: boolean;
  public timePicker24Hour: boolean;
  public timePickerSeconds: boolean;
  public showCustomRangeLabel: boolean;
  public alwaysShowCalendars: boolean;
  public singleDatePicker: boolean;
  public autoApply: boolean;
  public linkedCalendars: boolean;
  public autoUpdateInput: boolean;
  public isInvalidDate: (date: Date) => string | string[];
  public isCustomDate: (date: Date) => string | string[];

}

export class DateRangeFactory {
  static createDefaultLocale() {
    return {
      'format': 'DD/MM/YYYY',
      'separator': ' - ',
      'applyLabel': 'Appliquer',
      'cancelLabel': 'Vider',
      'fromLabel': 'Du',
      'toLabel': 'Au',
      'customRangeLabel': 'Choisir',
      'weekLabel': 'S',
      'daysOfWeek': [
        'Lu',
        'Ma',
        'Me',
        'Je',
        'Ve',
        'Sa',
        'Di'
      ],
      'monthNames': [
        'Janvier',
        'Février',
        'Mars',
        'Avril',
        'Mai',
        'Juin',
        'Juillet',
        'Août',
        'Septembre',
        'Octobre',
        'Novembre',
        'Décembre'
      ],
      'firstDay': 1
    };
  }
}

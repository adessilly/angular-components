
export class DateRange {

  public startDate:Date;
  public endDate:Date;

  public locale:any = DateRangeFactory.createDefaultLocale();
  public applyClass:string = 'btn-primary';

}

/*
 Options
 http://www.daterangepicker.com/#options
 startDate (Date object, moment object or string) The start of the initially selected date range
 endDate: (Date object, moment object or string) The end of the initially selected date range
 minDate: (Date object, moment object or string) The earliest date a user may select
 maxDate: (Date object, moment object or string) The latest date a user may select
 dateLimit: (object) The maximum span between the selected start and end dates. Can have any property you can add to a moment object (i.e. days, months)
 showDropdowns: (boolean) Show year and month select boxes above calendars to jump to a specific month and year
 showWeekNumbers: (boolean) Show localized week numbers at the start of each week on the calendars
 showISOWeekNumbers: (boolean) Show ISO week numbers at the start of each week on the calendars
 timePicker: (boolean) Allow selection of dates with times, not just dates
 timePickerIncrement: (number) Increment of the minutes selection list for times (i.e. 30 to allow only selection of times ending in 0 or 30)
 timePicker24Hour: (boolean) Use 24-hour instead of 12-hour times, removing the AM/PM selection
 timePickerSeconds: (boolean) Show seconds in the timePicker
 ranges: (object) Set predefined date ranges the user can select from. Each key is the label for the range, and its value an array with two dates representing the bounds of the range
 showCustomRangeLabel: (boolean) Displays an item labeled "Custom Range" at the end of the list of predefined ranges, when the ranges option is used. This option will be highlighted whenever the current date range selection does not match one of the predefined ranges. Clicking it will display the calendars to select a new range.
 alwaysShowCalendars: (boolean) Normally, if you use the ranges option to specify pre-defined date ranges, calendars for choosing a custom date range are not shown until the user clicks "Custom Range". When this option is set to true, the calendars for choosing a custom date range are always shown instead.
 opens: (string: 'left'/'right'/'center') Whether the picker appears aligned to the left, to the right, or centered under the HTML element it's attached to
 drops: (string: 'down' or 'up') Whether the picker appears below (default) or above the HTML element it's attached to
 buttonClasses: (array) CSS class names that will be added to all buttons in the picker
 applyClass: (string) CSS class string that will be added to the apply button
 cancelClass: (string) CSS class string that will be added to the cancel button
 locale: (object) Allows you to provide localized strings for buttons and labels, customize the date format, and change the first day of week for the calendars. Check off "locale (with example settings)" in the configuration generator to see how to customize these options.
 singleDatePicker: (boolean) Show only a single calendar to choose one date, instead of a range picker with two calendars; the start and end dates provided to your callback will be the same single date chosen
 autoApply: (boolean) Hide the apply and cancel buttons, and automatically apply a new date range as soon as two dates or a predefined range is selected
 linkedCalendars: (boolean) When enabled, the two calendars displayed will always be for two sequential months (i.e. January and February), and both will be advanced when clicking the left or right arrows above the calendars. When disabled, the two calendars can be individually advanced and display any month/year.
 isInvalidDate: (function) A function that is passed each date in the two calendars before they are displayed, and may return true or false to indicate whether that date should be available for selection or not.
 isCustomDate: (function) A function that is passed each date in the two calendars before they are displayed, and may return a string or array of CSS class names to apply to that date's calendar cell.
 autoUpdateInput: (boolean) Indicates whether the date range picker should automatically update the value of an <input> element it's attached to at initialization and when the selected dates change.
 parentEl: (string) jQuery selector of the parent element that the date range picker will be added to, if not provided this will be 'body'
 */
export class DateRangeWithOptions extends DateRange {

  public minDate:Date;
  public maxDate:Date;
  public dateLimit:any;
  public ranges:any;
  public opens:string; // 'left' 'right' 'center'
  public drops:string; // 'down' 'up'
  public cancelClass:string;
  public parentEl:string; // (string) jQuery selector of the parent element that the date range picker will be added to
  public buttonClasses:string[];
  public showDropdowns:boolean;
  public showWeekNumbers:boolean;
  public showISOWeekNumbers:boolean;
  public timePicker:boolean;
  public timePickerIncrement:boolean;
  public timePicker24Hour:boolean;
  public timePickerSeconds:boolean;
  public showCustomRangeLabel:boolean;
  public alwaysShowCalendars:boolean;
  public singleDatePicker:boolean;
  public autoApply:boolean;
  public linkedCalendars:boolean;
  public autoUpdateInput:boolean;
  public isInvalidDate : (date:Date) => string | string[];
  public isCustomDate : (date:Date) => string | string[];

}

export class DateRangeFactory {
  static createDefaultLocale(){
    return {
      "format": "DD/MM/YYYY",
      "separator": " - ",
      "applyLabel": "Appliquer",
      "cancelLabel": "Vider",
      "fromLabel": "Du",
      "toLabel": "Au",
      "customRangeLabel": "Choisir",
      "weekLabel": "S",
      "daysOfWeek": [
        "Lu",
        "Ma",
        "Me",
        "Je",
        "Ve",
        "Sa",
        "Di"
      ],
      "monthNames": [
        "Janvier",
        "Février",
        "Mars",
        "Avril",
        "Mai",
        "Juin",
        "Juillet",
        "Août",
        "Septembre",
        "Octobre",
        "Novembre",
        "Décembre"
      ],
      "firstDay": 1
    };
  }
}

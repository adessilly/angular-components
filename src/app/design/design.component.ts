import {Component, AfterContentInit, OnInit} from '@angular/core';

import {RadioService} from '../radio/radio.service';
import {Select2Element} from "../select/select2Element.interface";
import {TabService} from '../tab/tab.service';
import {Observable} from 'rxjs/Observable'
import {Model} from "./model";
import {FormGroup, Validators, FormBuilder} from "@angular/forms";
import {BeanFormulaireComponent} from "./bandeaux/beanFormulaire.component";
import {DateRangeWithOptions} from "../dateRange/dateRange";
import {BaseModal} from "../switchView/baseModal";

declare var $: any;
declare var hljs: any;
declare var WOW: any;
declare var moment:any;

@Component({
    selector: 'library-tester',
    templateUrl: 'design.template.html',
    providers: [RadioService, TabService]
})
export class DesignComponent implements AfterContentInit, OnInit {

    valuefieldTextfield: string = 'Valeur préinit';
    valuefieldTextarea: string = 'Valeur préinit';
    valuefieldSelect:Select2Element = {id:'-1', text:''};
    valuefieldSelect2:string = 'bbbbb';
    valuefieldRadio: string = '1';
    valuefieldRadio2: string = '2';
    valuefieldTab:number;
    valuefieldDate: Date;
    valuefieldCheckbox:boolean = true;
    valuefieldCheckbox2: boolean = false;
    valuefieldNumeric:number = 1;
    valueLongText:String = 'Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean. A small river named Duden flows by their place and supplies it with the necessary regelialia.';
    testValue:number = 0;

    valueDateRange:DateRangeWithOptions = new DateRangeWithOptions();

    adrien = {id:'0', name:'Adrien'};
    maryline = {id:'4', name:'Maryline'};
    geoffrey = {id:'1', name:'Geoffrey'};
    denis = {id:'5', name:'Denis'};
    vide = {id:'-1', name:''};

    valuesSelect:Select2Element[] = [
        {id:'0', text:'Adrien', value:this.adrien},
        {id:'4', text:'Maryline', value:this.maryline},
        {id:'1', text:'Geoffrey', value:this.geoffrey},
        {id:'5', text:'Denis', value:this.denis},
        {id:'-1', text:'-', value:this.vide}
    ];

    bean:any = {
        nom:'Dessilly',
        prenom:'Adrien',
        choix:this.adrien,
        valuesSelect : this.valuesSelect
    }

    valuesSelectMultiple:Select2Element[] = [
        {id:'0', text:'Adrien', value:this.adrien},
        {id:'4', text:'Maryline', value:this.maryline},
        {id:'1', text:'Geoffrey', value:this.geoffrey},
        {id:'5', text:'Denis', value:this.denis}
    ];
    valuesSelectedMultiple:any[] = [
        this.adrien,
        this.geoffrey
    ];

    valuesSelect2:string[] = [
        'aaaaa','bbbbb','ccccc','dddddd',
    ];

    loading = false;

    model: Model = new Model();

    beanFormulaireComponentClass: any = null;
    modeBandeau: boolean = true;

    constructor() {
        this.beanFormulaireComponentClass = BeanFormulaireComponent;
        this.initDateRange();
    }

    initDateRange() {
        this.valueDateRange.startDate = new Date();
        this.valueDateRange.endDate = new Date(this.valueDateRange.startDate.getTime() + (86400000 * 10));
        this.valueDateRange.ranges = {
            'Ajd': [moment(), moment()],
            'Hier': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
            '7 derniers jours': [moment().subtract(6, 'days'), moment()],
            '30 derniers jours': [moment().subtract(29, 'days'), moment()],
            'Ce mois': [moment().startOf('month'), moment().endOf('month')],
            'Le mois dernier': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
        };
    }

    // protected formRegister : FormGroup;
    //
    // constructor( private fb:FormBuilder ) {
    //
    //     this.formRegister = this.fb.group({
    //         'test1' : ['test1 value', Validators.required ],
    //         'test2' : ['test2 value', Validators.required ],
    //         'test3' : ['test3 value', Validators.required ]
    //     });
    //
    // }

    ngOnInit() {

         var obs = new Observable(observer => {
             setTimeout(() => {
                 let m:Model = new Model();
                 //simulation valeur du service rest
                 m.date = 1481756400000;
                 //correction format
                 //m.date = new Date(m.date);
                 observer.next(m);
             }, 1000);

         });

        obs.subscribe(
            (m:Model) => {
              this.model = m;
            }
        );

        // Initialiser WOW.js
        new WOW().init();

        //this.valuefieldDate = new Date();
    }

    initCloneFunctionBean(b) {

    }

    commitCloneFunctionBean(b) {

    }

    changeTest() {
      this.testValue = 3;
    }

    ngAfterContentInit() {
        this.valuefieldSelect = {id:'1', text:'Geoffrey'};

        hljs.initHighlighting();
        console.log(hljs.listLanguages());
    }

    changeSelectListMultiple() {
        this.valuesSelectedMultiple = [
            this.maryline,
            this.denis
        ];
    }

    changeSelectList() {
        this.valuesSelect = [
            {id:'0', text:'Adrien'},
            {id:'4', text:'Maryline'},
            {id:'1', text:'Geoffrey'},
            {id:'5', text:'Denis'}
        ];
    }

    changeSelectList2() {
      this.valuesSelect2 = [
          'aaaaa2','bbbbb2','ccccc2','dddddd2','bbbbb',
      ];
    }

    changeSelect() {
      this.valuefieldSelect = this.valuesSelect[1];
    }

    changeSelect2() {
      this.valuefieldSelect2 = this.valuesSelect2[2];
    }

    onClickLoading() {
        this.loading = !this.loading;
    }

    onClickChangeTextfield() {
        this.valuefieldTextfield = 'hello from button';
    }

    onClickChangeTextarea() {
        this.valuefieldTextarea = 'hello from button';
    }

    onClickChangeDate() {
        this.model.date = new Date();
    }

    onClickEmptyDate() {
        this.model.date = null; // Reinit de la date !
    }

    onClickChangeRange() {
        this.valueDateRange = Object.assign({}, this.valueDateRange);
        this.valueDateRange.startDate = new Date();
        this.valueDateRange.endDate = new Date(this.valueDateRange.startDate.getTime() + (86400000 * 10));
    }

    onClickEmptyRange() {
        this.valueDateRange = Object.assign({}, this.valueDateRange);
        this.valueDateRange.startDate = null
        this.valueDateRange.endDate = null;
    }

    onClickChangeTab() {
        this.valuefieldTab = 2;
    }

    onClickChangeRadio1() {
        this.valuefieldRadio = '3';
    }

    onClickChangeRadio2() {
        this.valuefieldRadio2 = '3';
    }

    onClickShowSelect(){
        for (let item of this.valuesSelectedMultiple){
            console.log(item);
        }
    }

    toggleCheckbox(){
        if (this.valuefieldCheckbox == true){
            this.valuefieldCheckbox = false;
        } else {
            //si null ou false
            this.valuefieldCheckbox = true;
        }
    }

    onClickChangeNumeric(){
        this.valuefieldNumeric = this.valuefieldNumeric * 2;
    }

    updateSwitchView(data: BaseModal){
        console.log("Event onValidated recu du switchView !!!!", data);
    }
}

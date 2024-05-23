import { Component, OnInit } from '@angular/core';
import { QueryBuilderConfig, QueryBuilderClassNames } from 'ngx-angular-query-builder';

@Component({
  selector: 'nlf-ors-search-fallskjerm',
  templateUrl: './ors-search-fallskjerm.component.html',
  styleUrls: ['./ors-search-fallskjerm.component.css']
})
export class NlfOrsSearchFallskjermComponent implements OnInit {


  _query = {
    condition: 'and',
    rules: [
      {field: 'age', operator: '<=', value: 22},
      {field: "involved.data.competences._code", operator: 'in', value: ['NLF-PFLY']},
      {field: 'type', operator: '=', value: 'incident'},
      {field: 'injury', operator: '='}
    ]
  };

  config: QueryBuilderConfig = {
    fields: {
      age: {name: 'Age', type: 'number'},
      "involved.data.competences._code": {
        name: 'Kompetanser',
        type: 'category',
        options: [
          {name: 'P-FLY', value: 'NLF-PFLY'},
          {name: 'Sporting License', value: 'F-SPO'},
          {name: 'EL', value: 'F-EL'},
          {name: 'EF', value: 'F-EF'},
          {name: 'EAFF', value: 'F-EAFF'},
          {name: 'A', value: 'F-A'},
          {name: 'B', value: 'F-B'},
          {name: 'C', value: 'F-C'},
          {name: 'D', value: 'F-D'},


          
        ]
      },
      type: {
        name: 'Type',
        type: 'category',
        options: [
          {name: 'Erfaringsdeling', value: 'sharing'},
          {name: 'Uønsket', value: 'unwanted_act'},
          {name: 'Næruhell', value: 'near_miss'},
          {name: 'Uhell', value: 'incident'},
          {name: 'Ulykke', value: 'accident'},
        ]
      },
      injury: {
        name: 'Personskade',
        type: 'boolean'
      }
    }
  }

  classNames: QueryBuilderClassNames = {
    removeIcon: "fa fa-minus",
    addIcon: "fa fa-plus",
    arrowIcon: "fa fa-chevron-right px-2",
    button: "btn",
    buttonGroup: "btn-group",
    rightAlign: "order-12 ml-auto",
    switchRow: "d-flex px-2",
    switchGroup: "d-flex align-items-center",
    switchRadio: "custom-control-input",
    switchLabel: "custom-control-label",
    switchControl: "custom-control custom-radio custom-control-inline",
    row: "row p-2 m-1",
    rule: "border",
    ruleSet: "border",
    invalidRuleSet: "alert alert-danger",
    emptyWarning: "text-danger mx-auto",
    operatorControl: "form-control",
    operatorControlSize: "col-auto pr-0",
    fieldControl: "form-control",
    fieldControlSize: "col-auto pr-0",
    entityControl: "form-control",
    entityControlSize: "col-auto pr-0",
    inputControl: "form-control",
    inputControlSize: "col-auto"
  };

  /**
   *   public defaultOperatorMap: { [key: string]: string[] } = {
    string: ['=', '!=', 'contains', 'like'],
    number: ['=', '!=', '>', '>=', '<', '<='],
    time: ['=', '!=', '>', '>=', '<', '<='],
    date: ['=', '!=', '>', '>=', '<', '<='],
    category: ['=', '!=', 'in', 'not in'],
    boolean: ['=']
  };
   */

  constructor() { }

  ngOnInit(): void {
  }

}

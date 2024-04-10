import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxCsvParser, NgxCSVParserError } from 'ngx-csv-parser';
import { Columns, Config, STYLE } from 'ngx-easy-table';
import { DefaultTableConfig } from 'app/interfaces/ngx-easy-table.interface';
import { ApiOptionsInterface, NlfConfigItem, ApiUserDataSubjectItem } from 'app/api/api.interface';
import { LungoOrganizationsService } from 'app/api/lungo-organizations.service';
import { faPlus, faQuestion, faSave, faClose, faCheck, faPersonCircleQuestion, faPerson, faPersonCirclePlus, faPersonCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { ApiFallskjermTandemService } from 'app/api/api-fallskjerm-tandem.service';
import { API, APIDefinition } from 'ngx-easy-table';

@Component({
    selector: 'nlf-fallskjerm-tandem',
    templateUrl: './fallskjerm-tandem.component.html',
    styleUrls: ['./fallskjerm-tandem.component.css']
})
export class NlfFallskjermTandemComponent implements OnInit {

    @ViewChild('fileImportInput', { static: false }) fileImportInput: any;
    @ViewChild('tandemTable') table: APIDefinition;

    csvRecords: any[];
    header = true;

    manifestSystems = ['Burble', 'JumpRun', 'Other'];
    defaultManifestSystem = 'Burble';
    manifestSystem: string;
    isRegisteredList: any[] = [];

    clubs: any[];
    selectedClub;

    registerReady = false;

    tableConf: Config;
    public columns: Columns[] = [

        /**<th>#</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>Gender</th>
          <th>Age</th>
          <th>Weight</th>
          <th>Date Of Birth</th>
          <th>Address</th>
          <th>Phone</th>
          <th>Last Jump Date</th>
          <th>Zip/Postal</th>
          <th>City</th>
          <th>Land</th>
          <th>Statsborgerskap</th>
        </tr>
      </thead> */
        { key: null, title: '#' },
        { key: 'First Name', title: 'First Name' },
        { key: 'Last Name', title: 'Last Name' },
        { key: 'Email', title: 'Email' },
        { key: 'Gender', title: 'Gender' },
        { key: 'Age', title: 'Age' },
        { key: 'Weight', title: 'Weight' },
        { key: 'Date Of Birth', title: 'Birthdate' },
        { key: 'Address', title: 'Address' },
        { key: 'Phone', title: 'Phone' },
        { key: 'Last Jump Date', title: 'Date' },
        { key: 'Zip/Postal', title: 'Zip' },
        { key: 'City', title: 'City' },
        { key: 'Land', title: 'Country' },
        { key: 'Statsborgerskap', title: 'Citizen' },
        { key: null, title: 'NIF' },
        { key: null, title: 'Handling' },
    ];

    // Icons
    faPlus = faPlus;
    faQuestion = faQuestion;
    faSave = faSave;
    faClose = faClose;
    faCheck = faCheck;
    faPersonCircleQuestion = faPersonCircleQuestion;
    faPersonCirclePlus = faPersonCirclePlus;
    faPerson = faPerson;
    faPersonCircleCheck = faPersonCircleCheck;

    constructor(
        private csvParser: NgxCsvParser,
        private orgService: LungoOrganizationsService,
        private tandemService: ApiFallskjermTandemService
    ) {
        this.getClubs();
    }

    ngOnInit(): void {
    }

    setRowClass(_class, index) {
        return;
        try {
            this.table.apiEvent({
                type: API.setRowClass,
                value: { row: index + 1, className: _class },
            });
        } catch (e) {
            console.log('Error setting row background color', e);
        }
    }
    getNumberOfChecked() {
        return this.csvRecords.filter(element => element.checked === true).length;
    }
    fileChangeListener($event: any): void {
        this.registerReady = false;
        const files = $event.srcElement.files;
        this.header =
            (this.header as unknown as string) === 'true' ||
            this.header === true;

        this.csvParser
            .parse(files[0], {
                header: this.header,
                delimiter: ',',
                //encoding: 'utf8'
            })
            .pipe()
            .subscribe(
                (result: Array<any>) => {
                    console.log('Result', result);
                    this.csvRecords = result;

                    this.csvRecords.forEach((element, index) => {
                        element['state'] = 'searching';
                        element['checked'] = false;

                        const query = { first_name: element['First Name'], last_name: element['Last Name'] };
                        this.tandemService.search(query).subscribe(
                            data => {

                                element['searchResult'] = data['_items'];
                                element['state'] = 'finished';
                                if (element['searchResult'].length > 1) {
                                    element['type'] = 'multiple';
                                    element['person_id'] = null;
                                } else if (element['searchResult'].length == 1) {
                                    element['type'] = 'single';
                                    element['person_id'] = element['searchResult'][0]['PersonId'];
                                    this.isRegisteredList[element['searchResult'][0]['PersonId']] = false;
                                    this.isRegistered(element['person_id'], this.selectedClub, index);
                                    element['checked'] = true;
                                } else if (element['searchResult'].length == 0) {
                                    element['type'] = 'none';
                                    element['checked'] = true;
                                    element['person_id'] = null;
                                }
                            },
                            err => {
                                console.log(err);
                                //this.error = true;
                            }

                        );
                    });

                },
                (error: NgxCSVParserError) => {
                    console.log('Error', error);
                },
                () => this.registerReady = true
            );

        console.log(this.csvRecords);




    }

    canRegisterTable() {

        return true;

    }
    public isRegistered(person_id, org_id, index) {

        this.tandemService.getTandemRegistered(person_id, org_id).subscribe(
            data => {
                this.isRegisteredList[person_id] = data['tandem'];
                if (data['tandem'] === true) {
                    this.csvRecords[index]['checked'] = false;
                }
            },
            err => {
                console.log(err);
            }
        );
    }

    public getClubs() {

        const options: ApiOptionsInterface = {
            query: {
                where: {
                    'main_activity.id': 109,
                    type_id: 5,
                    is_active: true
                },
                max_results: 1000,
                projection: { id: 1, _id: 1, parent_id: 1, name: 1 }
            }
        };
        this.orgService.getOrganizations(options).subscribe(
            data => {
                this.clubs = data._items;
                //this.dataReady = true;
            },
            err => console.error(err)
        );

    }

}

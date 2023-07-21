import { Component, OnInit } from '@angular/core';
import { faCheck, faUpload, faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'nlf-fallskjerm',
  templateUrl: './fallskjerm.component.html',
  styleUrls: ['./fallskjerm.component.css']
})
export class NlfFallskjermComponent implements OnInit {

  //icons
  public faCheck = faCheck;
  faUpload = faUpload;
  faSearch = faSearch;
  
  constructor() { }

  ngOnInit(): void {
  }

}

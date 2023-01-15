import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NlfOrsSportsflyReportComponent } from './ors-sportsfly-report.component';

describe('NlfOrsSportsflyReportComponent', () => {
  let component: NlfOrsSportsflyReportComponent;
  let fixture: ComponentFixture<NlfOrsSportsflyReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NlfOrsSportsflyReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NlfOrsSportsflyReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

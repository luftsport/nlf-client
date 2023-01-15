import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NlfOrsFallskjermReportSummaryComponent } from './report-summary.component';

describe('NlfOrsFallskjermReportSummaryComponent', () => {
  let component: NlfOrsFallskjermReportSummaryComponent;
  let fixture: ComponentFixture<NlfOrsFallskjermReportSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NlfOrsFallskjermReportSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NlfOrsFallskjermReportSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

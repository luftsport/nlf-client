import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NlfOrsFallskjermReportSummaryComponent } from './report-summary.component';

describe('NlfOrsFallskjermReportSummaryComponent', () => {
  let component: NlfOrsFallskjermReportSummaryComponent;
  let fixture: ComponentFixture<NlfOrsFallskjermReportSummaryComponent>;

  beforeEach(waitForAsync(() => {
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

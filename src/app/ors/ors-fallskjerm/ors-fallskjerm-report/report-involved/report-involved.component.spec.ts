import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NlfOrsFallskjermReportInvolvedComponent } from './report-involved.component';

describe('NlfOrsFallskjermReportInvolvedComponent', () => {
  let component: NlfOrsFallskjermReportInvolvedComponent;
  let fixture: ComponentFixture<NlfOrsFallskjermReportInvolvedComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NlfOrsFallskjermReportInvolvedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NlfOrsFallskjermReportInvolvedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NlfOrsModellflyReportInvolvedComponent } from './report-involved.component';

describe('NlfOrsModellflyReportInvolvedComponent', () => {
  let component: NlfOrsModellflyReportInvolvedComponent;
  let fixture: ComponentFixture<NlfOrsModellflyReportInvolvedComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NlfOrsModellflyReportInvolvedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NlfOrsModellflyReportInvolvedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

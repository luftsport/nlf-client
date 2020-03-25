import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NlfOrsMotorReportComponent } from './ors-motor-report.component';

describe('NlfOrsMotorReportComponent', () => {
  let component: NlfOrsMotorReportComponent;
  let fixture: ComponentFixture<NlfOrsMotorReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NlfOrsMotorReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NlfOrsMotorReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

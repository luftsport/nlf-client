import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NlfOrsFallskjermReportComponent } from './ors-fallskjerm-report.component';

describe('NlfOrsFallskjermReportComponent', () => {
  let component: NlfOrsFallskjermReportComponent;
  let fixture: ComponentFixture<NlfOrsFallskjermReportComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NlfOrsFallskjermReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NlfOrsFallskjermReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

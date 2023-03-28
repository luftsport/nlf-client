import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NlfOrsReportE5xComponent } from './report-e5x.component';

describe('ReportE5xComponent', () => {
  let component: NlfOrsReportE5xComponent;
  let fixture: ComponentFixture<NlfOrsReportE5xComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NlfOrsReportE5xComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NlfOrsReportE5xComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

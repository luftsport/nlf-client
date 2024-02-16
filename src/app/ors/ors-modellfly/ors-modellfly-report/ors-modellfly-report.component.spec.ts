import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NlfOrsModellflyReportComponent } from './ors-modellfly-report.component';

describe('NlfOrsModellflyReportComponent', () => {
  let component: NlfOrsModellflyReportComponent;
  let fixture: ComponentFixture<NlfOrsModellflyReportComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NlfOrsModellflyReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NlfOrsModellflyReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NlfOrsReportAskComponent } from './report-ask.component';

describe('NlfOrsFallskjermReportAskComponent', () => {
  let component: NlfOrsReportAskComponent;
  let fixture: ComponentFixture<NlfOrsReportAskComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NlfOrsReportAskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NlfOrsReportAskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

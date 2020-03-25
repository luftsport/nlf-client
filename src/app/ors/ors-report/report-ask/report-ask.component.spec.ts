import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NlfOrsReportAskComponent } from './report-ask.component';

describe('NlfOrsFallskjermReportAskComponent', () => {
  let component: NlfOrsReportAskComponent;
  let fixture: ComponentFixture<NlfOrsReportAskComponent>;

  beforeEach(async(() => {
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

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NlfOrsFallskjermReportAskComponent } from './report-ask.component';

describe('NlfOrsFallskjermReportAskComponent', () => {
  let component: NlfOrsFallskjermReportAskComponent;
  let fixture: ComponentFixture<NlfOrsFallskjermReportAskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NlfOrsFallskjermReportAskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NlfOrsFallskjermReportAskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NlfOrsFallskjermReportAskTextComponent } from './report-ask-text.component';

describe('NlfOrsFallskjermReportAskTextComponent', () => {
  let component: NlfOrsFallskjermReportAskTextComponent;
  let fixture: ComponentFixture<NlfOrsFallskjermReportAskTextComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NlfOrsFallskjermReportAskTextComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NlfOrsFallskjermReportAskTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

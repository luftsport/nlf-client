import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NlfOrsReportAskTextComponent } from './report-ask-text.component';

describe('NlfOrsFallskjermReportAskTextComponent', () => {
  let component: NlfOrsReportAskTextComponent;
  let fixture: ComponentFixture<NlfOrsReportAskTextComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NlfOrsReportAskTextComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NlfOrsReportAskTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

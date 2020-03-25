import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NlfOrsReportActionsComponent } from './report-actions.component';

describe('NlfOrsFallskjermReportActionsComponent', () => {
  let component: NlfOrsReportActionsComponent;
  let fixture: ComponentFixture<NlfOrsReportActionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NlfOrsReportActionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NlfOrsReportActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

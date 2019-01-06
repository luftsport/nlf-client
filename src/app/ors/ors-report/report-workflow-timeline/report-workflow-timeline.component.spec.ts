import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NlfOrsFallskjermReportWorkflowTimelineComponent } from './report-workflow-timeline.component';

describe('NlfOrsFallskjermReportWorkflowTimelineComponent', () => {
  let component: NlfOrsFallskjermReportWorkflowTimelineComponent;
  let fixture: ComponentFixture<NlfOrsFallskjermReportWorkflowTimelineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NlfOrsFallskjermReportWorkflowTimelineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NlfOrsFallskjermReportWorkflowTimelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

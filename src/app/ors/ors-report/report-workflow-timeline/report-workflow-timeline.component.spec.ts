import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NlfOrsReportWorkflowTimelineComponent } from './report-workflow-timeline.component';

describe('NlfOrsFallskjermReportWorkflowTimelineComponent', () => {
  let component: NlfOrsReportWorkflowTimelineComponent;
  let fixture: ComponentFixture<NlfOrsReportWorkflowTimelineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NlfOrsReportWorkflowTimelineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NlfOrsReportWorkflowTimelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

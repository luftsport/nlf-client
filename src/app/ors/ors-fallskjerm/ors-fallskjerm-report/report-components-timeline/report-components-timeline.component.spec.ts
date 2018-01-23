import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NlfOrsReportComponentsTimelineComponent } from './report-components-timeline.component';

describe('NlfOrsReportComponentsTimelineComponent', () => {
  let component: NlfOrsReportComponentsTimelineComponent;
  let fixture: ComponentFixture<NlfOrsReportComponentsTimelineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NlfOrsReportComponentsTimelineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NlfOrsReportComponentsTimelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NlfOrsActivitiesTimelineComponent } from './ors-activities-timeline.component';

describe('NlfOrsActivitiesTimelineComponent', () => {
  let component: NlfOrsActivitiesTimelineComponent;
  let fixture: ComponentFixture<NlfOrsActivitiesTimelineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NlfOrsActivitiesTimelineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NlfOrsActivitiesTimelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

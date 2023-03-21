import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NlfOrsActivitiesTimelineComponent } from './ors-activities-timeline.component';

describe('NlfOrsActivitiesTimelineComponent', () => {
  let component: NlfOrsActivitiesTimelineComponent;
  let fixture: ComponentFixture<NlfOrsActivitiesTimelineComponent>;

  beforeEach(waitForAsync(() => {
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

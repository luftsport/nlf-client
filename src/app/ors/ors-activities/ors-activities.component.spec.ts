import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NlfOrsActivitiesComponent } from './ors-activities.component';

describe('NlfOrsActivitiesComponent', () => {
  let component: NlfOrsActivitiesComponent;
  let fixture: ComponentFixture<NlfOrsActivitiesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NlfOrsActivitiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NlfOrsActivitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

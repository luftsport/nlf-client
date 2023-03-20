import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NlfResolveObservationRatingComponent } from './resolve-observation-rating.component';

describe('NlfResolveObservationRatingComponent', () => {
  let component: NlfResolveObservationRatingComponent;
  let fixture: ComponentFixture<NlfResolveObservationRatingComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NlfResolveObservationRatingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NlfResolveObservationRatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

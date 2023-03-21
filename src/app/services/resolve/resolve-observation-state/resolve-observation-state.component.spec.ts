import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ResolveObservationStateComponent } from './resolve-observation-state.component';

describe('ResolveObservationStateComponent', () => {
  let component: ResolveObservationStateComponent;
  let fixture: ComponentFixture<ResolveObservationStateComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ResolveObservationStateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResolveObservationStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NlfResolveObservationComponent } from './resolve-observation.component';

describe('NlfResolveObservationComponent', () => {
  let component: NlfResolveObservationComponent;
  let fixture: ComponentFixture<NlfResolveObservationComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NlfResolveObservationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NlfResolveObservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

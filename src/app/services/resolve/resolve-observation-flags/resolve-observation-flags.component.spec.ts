import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NlfResolveObservationFlagsComponent } from './resolve-observation-flags.component';

describe('NlfResolveObservationFlagsComponent', () => {
  let component: NlfResolveObservationFlagsComponent;
  let fixture: ComponentFixture<NlfResolveObservationFlagsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NlfResolveObservationFlagsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NlfResolveObservationFlagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

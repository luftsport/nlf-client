import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NlfResolveObservationTypesComponent } from './resolve-observation-types.component';

describe('NlfResolveObservationTypesComponent', () => {
  let component: NlfResolveObservationTypesComponent;
  let fixture: ComponentFixture<NlfResolveObservationTypesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NlfResolveObservationTypesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NlfResolveObservationTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

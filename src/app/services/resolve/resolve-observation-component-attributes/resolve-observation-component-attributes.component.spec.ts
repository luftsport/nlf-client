import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NlfResolveObservationComponentAttributesComponent } from './resolve-observation-component-attributes.component';

describe('NlfResolveObservationComponentAttributesComponent', () => {
  let component: NlfResolveObservationComponentAttributesComponent;
  let fixture: ComponentFixture<NlfResolveObservationComponentAttributesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NlfResolveObservationComponentAttributesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NlfResolveObservationComponentAttributesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NlfAircraftOrsComponent } from './aircraft-ors.component';

describe('NlfAircraftOrsComponent', () => {
  let component: NlfAircraftOrsComponent;
  let fixture: ComponentFixture<NlfAircraftOrsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NlfAircraftOrsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NlfAircraftOrsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

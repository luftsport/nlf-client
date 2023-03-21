import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NlfOrsEditorFlightMapComponent } from './report-flight-map.component';

describe('NlfOrsEditorFlightMapComponent', () => {
  let component: NlfOrsEditorFlightMapComponent;
  let fixture: ComponentFixture<NlfOrsEditorFlightMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NlfOrsEditorFlightMapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NlfOrsEditorFlightMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

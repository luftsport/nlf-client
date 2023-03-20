import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NlfOrsEditorE5XAcFlightComponent } from './ors-editor-e5x-ac-flight.component';

describe('NlfOrsEditorE5XAcFlightComponent', () => {
  let component: NlfOrsEditorE5XAcFlightComponent;
  let fixture: ComponentFixture<NlfOrsEditorE5XAcFlightComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NlfOrsEditorE5XAcFlightComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NlfOrsEditorE5XAcFlightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrsEditorFlightComponent } from './ors-editor-flight.component';

describe('OrsEditorFlightComponent', () => {
  let component: OrsEditorFlightComponent;
  let fixture: ComponentFixture<OrsEditorFlightComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrsEditorFlightComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrsEditorFlightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

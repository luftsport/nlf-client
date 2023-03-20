import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { OrsEditorFlightComponent } from './ors-editor-flight.component';

describe('OrsEditorFlightComponent', () => {
  let component: OrsEditorFlightComponent;
  let fixture: ComponentFixture<OrsEditorFlightComponent>;

  beforeEach(waitForAsync(() => {
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

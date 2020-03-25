import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NlfOrsEditorE5XAircraftComponent } from './ors-editor-e5x-aircraft.component';

describe('NlfOrsEditorE5XAircraftComponent', () => {
  let component: NlfOrsEditorE5XAircraftComponent;
  let fixture: ComponentFixture<NlfOrsEditorE5XAircraftComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NlfOrsEditorE5XAircraftComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NlfOrsEditorE5XAircraftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

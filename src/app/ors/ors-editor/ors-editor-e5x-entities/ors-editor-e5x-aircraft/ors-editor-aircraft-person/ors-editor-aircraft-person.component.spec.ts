import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NlfOrsEditorAircraftPersonComponent } from './ors-editor-aircraft-person.component';

describe('NlfOrsEditorAircraftPersonComponent', () => {
  let component: NlfOrsEditorAircraftPersonComponent;
  let fixture: ComponentFixture<NlfOrsEditorAircraftPersonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NlfOrsEditorAircraftPersonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NlfOrsEditorAircraftPersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrsEditorInvolvedComponent } from './ors-editor-involved.component';

describe('OrsEditorInvolvedComponent', () => {
  let component: OrsEditorInvolvedComponent;
  let fixture: ComponentFixture<OrsEditorInvolvedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrsEditorInvolvedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrsEditorInvolvedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

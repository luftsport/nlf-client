import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrsEditorRoleInObservationComponent } from './ors-editor-role-in-observation.component';

describe('OrsEditorRoleInObservationComponent', () => {
  let component: OrsEditorRoleInObservationComponent;
  let fixture: ComponentFixture<OrsEditorRoleInObservationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrsEditorRoleInObservationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrsEditorRoleInObservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

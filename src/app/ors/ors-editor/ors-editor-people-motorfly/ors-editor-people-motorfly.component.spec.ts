import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NlfOrsEditorPeopleMotorflyComponent } from './ors-editor-organization.component';

describe('NlfOrsEditorPeopleMotorflyComponent', () => {
  let component: NlfOrsEditorPeopleMotorflyComponent;
  let fixture: ComponentFixture<NlfOrsEditorPeopleMotorflyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NlfOrsEditorPeopleMotorflyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NlfOrsEditorPeopleMotorflyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

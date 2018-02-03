import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NlfOrsEditorPeopleComponent } from './ors-editor-organization.component';

describe('NlfOrsEditorPeopleComponent', () => {
  let component: NlfOrsEditorPeopleComponent;
  let fixture: ComponentFixture<NlfOrsEditorPeopleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NlfOrsEditorPeopleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NlfOrsEditorPeopleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

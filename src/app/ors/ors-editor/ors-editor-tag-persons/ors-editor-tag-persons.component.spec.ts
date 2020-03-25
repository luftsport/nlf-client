import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NlfOrsEditorTagPersonsComponent } from './ors-editor-tag-person.component';

describe('NlfOrsEditorTagPersonsComponent', () => {
  let component: NlfOrsEditorTagPersonsComponent;
  let fixture: ComponentFixture<NlfOrsEditorTagPersonsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NlfOrsEditorTagPersonsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NlfOrsEditorTagPersonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

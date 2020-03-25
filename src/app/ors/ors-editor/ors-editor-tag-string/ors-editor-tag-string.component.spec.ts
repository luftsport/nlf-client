import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NlfOrsEditorTagStringComponent } from './ors-editor-tag-string.component';

describe('NlfOrsEditorTagStringComponent', () => {
  let component: NlfOrsEditorTagStringComponent;
  let fixture: ComponentFixture<NlfOrsEditorTagStringComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NlfOrsEditorTagStringComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NlfOrsEditorTagStringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

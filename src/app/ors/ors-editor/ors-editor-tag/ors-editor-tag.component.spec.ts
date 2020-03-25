import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NlfOrsEditorTagComponent } from './ors-editor-tag.component';

describe('NlfOrsEditorTagComponent', () => {
  let component: NlfOrsEditorTagComponent;
  let fixture: ComponentFixture<NlfOrsEditorTagComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NlfOrsEditorTagComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NlfOrsEditorTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

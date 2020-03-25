import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NlfOrsEditorE5XClassificationComponent } from './ors-editor-e5x-classification.component';

describe('NlfOrsEditorE5XClassificationComponent', () => {
  let component: NlfOrsEditorE5XClassificationComponent;
  let fixture: ComponentFixture<NlfOrsEditorE5XClassificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NlfOrsEditorE5XClassificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NlfOrsEditorE5XClassificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

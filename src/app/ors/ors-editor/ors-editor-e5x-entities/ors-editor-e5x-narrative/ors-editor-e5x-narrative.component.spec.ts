import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NlfOrsEditorE5XNarrativeComponent } from './ors-editor-e5x-narrative.component';

describe('NlfOrsEditorE5XNarrativeComponent', () => {
  let component: NlfOrsEditorE5XNarrativeComponent;
  let fixture: ComponentFixture<NlfOrsEditorE5XNarrativeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NlfOrsEditorE5XNarrativeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NlfOrsEditorE5XNarrativeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

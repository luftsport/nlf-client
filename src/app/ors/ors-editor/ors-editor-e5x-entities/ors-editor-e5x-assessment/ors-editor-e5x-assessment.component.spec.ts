import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NlfOrsEditorE5xAssessmentComponent } from './ors-editor-e5x-assessment.component';

describe('NlfOrsEditorE5xAssessmentComponent', () => {
  let component: NlfOrsEditorE5xAssessmentComponent;
  let fixture: ComponentFixture<NlfOrsEditorE5xAssessmentComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NlfOrsEditorE5xAssessmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NlfOrsEditorE5xAssessmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

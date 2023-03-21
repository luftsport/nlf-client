import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NlfOrsEditorE5xRiskComponent } from './ors-editor-e5x-risk.component';

describe('NlfOrsEditorE5xRiskComponent', () => {
  let component: NlfOrsEditorE5xRiskComponent;
  let fixture: ComponentFixture<NlfOrsEditorE5xRiskComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NlfOrsEditorE5xRiskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NlfOrsEditorE5xRiskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

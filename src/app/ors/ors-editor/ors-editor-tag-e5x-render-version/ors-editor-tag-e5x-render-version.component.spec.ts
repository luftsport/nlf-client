import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NlfOrsEditorTagE5xRenderVersionComponent } from './ors-editor-tag-e5x-render-version.component';

describe('NlfOrsEditorTagE5xRenderVersionComponent', () => {
  let component: NlfOrsEditorTagE5xRenderVersionComponent;
  let fixture: ComponentFixture<NlfOrsEditorTagE5xRenderVersionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NlfOrsEditorTagE5xRenderVersionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NlfOrsEditorTagE5xRenderVersionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

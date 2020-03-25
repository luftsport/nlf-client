import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NlfOrsEditorTagE5xRenderComponent } from './ors-editor-tag-e5x-render.component';

describe('NlfOrsEditorTagE5xRenderComponent', () => {
  let component: NlfOrsEditorTagE5xRenderComponent;
  let fixture: ComponentFixture<NlfOrsEditorTagE5xRenderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NlfOrsEditorTagE5xRenderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NlfOrsEditorTagE5xRenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NlfOrsEditorE5xSeparationComponent } from './ors-editor-e5x-separation.component';

describe('NlfOrsEditorE5xSeparationComponent', () => {
  let component: NlfOrsEditorE5xSeparationComponent;
  let fixture: ComponentFixture<NlfOrsEditorE5xSeparationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NlfOrsEditorE5xSeparationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NlfOrsEditorE5xSeparationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NlfOrsEditorE5XAcWildlifeComponent } from './ors-editor-e5x-ac-wildlife.component';

describe('NlfOrsEditorE5XAcWildlifeComponent', () => {
  let component: NlfOrsEditorE5XAcWildlifeComponent;
  let fixture: ComponentFixture<NlfOrsEditorE5XAcWildlifeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NlfOrsEditorE5XAcWildlifeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NlfOrsEditorE5XAcWildlifeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

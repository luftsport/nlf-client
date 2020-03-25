import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NlfOrsEditorTagE5XComponent } from './ors-editor-tag-e5x.component';

describe('NlfOrsEditorTagE5XComponent', () => {
  let component: NlfOrsEditorTagE5XComponent;
  let fixture: ComponentFixture<NlfOrsEditorTagE5XComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NlfOrsEditorTagE5XComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NlfOrsEditorTagE5XComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NlfOrsEditorTitleComponent } from './ors-editor-title.component';

describe('NlfOrsEditorTitleComponent', () => {
  let component: NlfOrsEditorTitleComponent;
  let fixture: ComponentFixture<NlfOrsEditorTitleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NlfOrsEditorTitleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NlfOrsEditorTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

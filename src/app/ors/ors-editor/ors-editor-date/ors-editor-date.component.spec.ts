import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NlfOrsEditorDateComponent } from './ors-editor-date.component';

describe('NlfOrsEditorDateComponent', () => {
  let component: NlfOrsEditorDateComponent;
  let fixture: ComponentFixture<NlfOrsEditorDateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NlfOrsEditorDateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NlfOrsEditorDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

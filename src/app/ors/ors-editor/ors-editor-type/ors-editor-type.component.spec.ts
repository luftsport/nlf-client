import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NlfOrsEditorTypeComponent } from './ors-editor-type.component';

describe('NlfOrsEditorTypeComponent', () => {
  let component: NlfOrsEditorTypeComponent;
  let fixture: ComponentFixture<NlfOrsEditorTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NlfOrsEditorTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NlfOrsEditorTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

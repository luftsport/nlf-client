import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NlfOrsEditorAskTextComponent } from './ors-editor-ask-text.component';

describe('NlfOrsEditorAskTextComponent', () => {
  let component: NlfOrsEditorAskTextComponent;
  let fixture: ComponentFixture<NlfOrsEditorAskTextComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NlfOrsEditorAskTextComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NlfOrsEditorAskTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

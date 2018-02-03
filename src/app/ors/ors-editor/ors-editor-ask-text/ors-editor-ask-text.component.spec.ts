import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrsEditorAskTextComponent } from './ors-editor-ask-text.component';

describe('OrsEditorAskTextComponent', () => {
  let component: OrsEditorAskTextComponent;
  let fixture: ComponentFixture<OrsEditorAskTextComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrsEditorAskTextComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrsEditorAskTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

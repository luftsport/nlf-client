import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NlfOrsEditorAskComponent } from './ors-editor-ask.component';

describe('NlfOrsEditorAskComponent', () => {
  let component: NlfOrsEditorAskComponent;
  let fixture: ComponentFixture<NlfOrsEditorAskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NlfOrsEditorAskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NlfOrsEditorAskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NlfOrsEditorDebugComponent } from './ors-editor-help.component';

describe('NlfOrsEditorDebugComponent', () => {
  let component: NlfOrsEditorDebugComponent;
  let fixture: ComponentFixture<NlfOrsEditorDebugComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NlfOrsEditorDebugComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NlfOrsEditorDebugComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

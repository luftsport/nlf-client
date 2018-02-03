import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NlfOrsEditorActionsComponent } from './ors-editor-actions.component';

describe('NlfOrsEditorActionsComponent', () => {
  let component: NlfOrsEditorActionsComponent;
  let fixture: ComponentFixture<NlfOrsEditorActionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NlfOrsEditorActionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NlfOrsEditorActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

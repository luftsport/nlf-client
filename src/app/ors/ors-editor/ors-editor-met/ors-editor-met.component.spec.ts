import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NlfOrsEditorMetComponent } from './ors-editor-met.component';

describe('NlfOrsEditorMetComponent', () => {
  let component: NlfOrsEditorMetComponent;
  let fixture: ComponentFixture<NlfOrsEditorMetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NlfOrsEditorMetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NlfOrsEditorMetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NlfOrsEditorComponentsComponent } from './ors-editor-components.component';

describe('NlfOrsEditorComponentsComponent', () => {
  let component: NlfOrsEditorComponentsComponent;
  let fixture: ComponentFixture<NlfOrsEditorComponentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NlfOrsEditorComponentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NlfOrsEditorComponentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

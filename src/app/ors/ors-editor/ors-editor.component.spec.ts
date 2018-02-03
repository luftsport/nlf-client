import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NlfOrsEditorComponent } from './ors-editor.component';

describe('NlfOrsEditorComponent', () => {
  let component: NlfOrsEditorComponent;
  let fixture: ComponentFixture<NlfOrsEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NlfOrsEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NlfOrsEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NlfOrsSeilflyEditorComponent } from './ors-seilfly-editor.component';

describe('NlfOrsSeilflyEditorComponent', () => {
  let component: NlfOrsSeilflyEditorComponent;
  let fixture: ComponentFixture<NlfOrsSeilflyEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NlfOrsSeilflyEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NlfOrsSeilflyEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

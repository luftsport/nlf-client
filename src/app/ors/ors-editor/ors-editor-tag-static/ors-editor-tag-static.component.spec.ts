import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrsEditorTagStaticComponent } from './ors-editor-tag-static.component';

describe('OrsEditorTagStaticComponent', () => {
  let component: OrsEditorTagStaticComponent;
  let fixture: ComponentFixture<OrsEditorTagStaticComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrsEditorTagStaticComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrsEditorTagStaticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

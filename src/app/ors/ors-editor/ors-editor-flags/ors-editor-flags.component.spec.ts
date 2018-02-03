import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrsEditorFlagsComponent } from './ors-editor-flags.component';

describe('OrsEditorFlagsComponent', () => {
  let component: OrsEditorFlagsComponent;
  let fixture: ComponentFixture<OrsEditorFlagsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrsEditorFlagsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrsEditorFlagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

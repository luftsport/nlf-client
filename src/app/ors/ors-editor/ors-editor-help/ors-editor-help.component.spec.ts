import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrsEditorHelpComponent } from './ors-editor-help.component';

describe('OrsEditorHelpComponent', () => {
  let component: OrsEditorHelpComponent;
  let fixture: ComponentFixture<OrsEditorHelpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrsEditorHelpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrsEditorHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

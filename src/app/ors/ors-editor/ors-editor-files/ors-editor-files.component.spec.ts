import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrsEditorFilesComponent } from './ors-editor-files.component';

describe('OrsEditorFilesComponent', () => {
  let component: OrsEditorFilesComponent;
  let fixture: ComponentFixture<OrsEditorFilesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrsEditorFilesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrsEditorFilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

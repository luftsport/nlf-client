import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NlfOrsEditorFilesComponent } from './ors-editor-files.component';

describe('NlfOrsEditorFilesComponent', () => {
  let component: NlfOrsEditorFilesComponent;
  let fixture: ComponentFixture<NlfOrsEditorFilesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NlfOrsEditorFilesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NlfOrsEditorFilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

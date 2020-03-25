import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NlfOrsEditorAboutComponent } from './ors-editor-help.component';

describe('NlfOrsEditorAboutComponent', () => {
  let component: NlfOrsEditorAboutComponent;
  let fixture: ComponentFixture<NlfOrsEditorAboutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NlfOrsEditorAboutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NlfOrsEditorAboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

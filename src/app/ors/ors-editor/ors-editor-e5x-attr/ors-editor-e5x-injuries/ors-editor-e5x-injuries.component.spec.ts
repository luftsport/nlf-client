import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NlfOrsEditorE5XInjuriesComponent } from './ors-editor-flight-injuries.component';

describe('NlfOrsEditorE5XInjuriesComponent', () => {
  let component: NlfOrsEditorE5XInjuriesComponent;
  let fixture: ComponentFixture<NlfOrsEditorE5XInjuriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NlfOrsEditorE5XInjuriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NlfOrsEditorE5XInjuriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

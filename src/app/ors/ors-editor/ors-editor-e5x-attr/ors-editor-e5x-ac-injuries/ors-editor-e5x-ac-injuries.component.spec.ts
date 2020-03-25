import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NlfOrsEditorE5XAcInjuriesComponent } from './ors-editor-e5x-ac-injuries.component';

describe('NlfOrsEditorE5XAcInjuriesComponent', () => {
  let component: NlfOrsEditorE5XAcInjuriesComponent;
  let fixture: ComponentFixture<NlfOrsEditorE5XAcInjuriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NlfOrsEditorE5XAcInjuriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NlfOrsEditorE5XAcInjuriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

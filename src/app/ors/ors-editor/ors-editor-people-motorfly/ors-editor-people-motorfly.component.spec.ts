import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NlfOrsEditorPeopleMotorflyComponent } from './ors-editor-organization.component';

describe('NlfOrsEditorPeopleMotorflyComponent', () => {
  let component: NlfOrsEditorPeopleMotorflyComponent;
  let fixture: ComponentFixture<NlfOrsEditorPeopleMotorflyComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NlfOrsEditorPeopleMotorflyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NlfOrsEditorPeopleMotorflyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

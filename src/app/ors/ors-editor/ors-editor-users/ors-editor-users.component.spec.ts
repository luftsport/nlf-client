import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NlfOrsEditorUsersComponent } from './ors-editor-users.component';

describe('NlfOrsEditorUsersComponent', () => {
  let component: NlfOrsEditorUsersComponent;
  let fixture: ComponentFixture<NlfOrsEditorUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NlfOrsEditorUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NlfOrsEditorUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

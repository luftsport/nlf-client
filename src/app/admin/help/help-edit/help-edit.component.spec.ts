import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NlfAdminHelpEditComponent } from './help-edit.component';

describe('NlfAdminHelpEditComponent', () => {
  let component: NlfAdminHelpEditComponent;
  let fixture: ComponentFixture<NlfAdminHelpEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NlfAdminHelpEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NlfAdminHelpEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

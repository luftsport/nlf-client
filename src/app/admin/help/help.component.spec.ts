import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NlfAdminHelpComponent } from './help.component';

describe('NlfAdminHelpComponent', () => {
  let component: NlfAdminHelpComponent;
  let fixture: ComponentFixture<NlfAdminHelpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NlfAdminHelpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NlfAdminHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

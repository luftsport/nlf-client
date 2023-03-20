import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NlfAdminComponent } from './admin.component';

describe('NlfAdminComponent', () => {
  let component: NlfAdminComponent;
  let fixture: ComponentFixture<NlfAdminComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NlfAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NlfAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

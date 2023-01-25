import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NlfAdminFilesComponent } from './files.component';

describe('NlfAdminFilesComponent', () => {
  let component: NlfAdminFilesComponent;
  let fixture: ComponentFixture<NlfAdminFilesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NlfAdminFilesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NlfAdminFilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

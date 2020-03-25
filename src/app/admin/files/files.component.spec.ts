import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NlfAdminFilesComponent } from './files.component';

describe('NlfAdminFilesComponent', () => {
  let component: NlfAdminFilesComponent;
  let fixture: ComponentFixture<NlfAdminFilesComponent>;

  beforeEach(async(() => {
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

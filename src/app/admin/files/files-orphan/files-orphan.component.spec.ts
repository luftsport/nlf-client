import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NlfAdminFilesOrphanComponent } from './files-orphan.component';

describe('NlfAdminFilesOrphanComponent', () => {
  let component: NlfAdminFilesOrphanComponent;
  let fixture: ComponentFixture<NlfAdminFilesOrphanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NlfAdminFilesOrphanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NlfAdminFilesOrphanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ResolveRoleComponent } from './resolve-role.component';

describe('ResolveRoleComponent', () => {
  let component: ResolveRoleComponent;
  let fixture: ComponentFixture<ResolveRoleComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ResolveRoleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResolveRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResolveRoleComponent } from './resolve-role.component';

describe('ResolveRoleComponent', () => {
  let component: ResolveRoleComponent;
  let fixture: ComponentFixture<ResolveRoleComponent>;

  beforeEach(async(() => {
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

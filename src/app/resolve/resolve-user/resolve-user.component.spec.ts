import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResolveUserComponent } from './resolve-user.component';

describe('ResolveUserComponent', () => {
  let component: ResolveUserComponent;
  let fixture: ComponentFixture<ResolveUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResolveUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResolveUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

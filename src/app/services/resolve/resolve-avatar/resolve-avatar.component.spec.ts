import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NlfResolveAvatarComponent } from './resolve-avatar.component';

describe('NlfResolveAvatarComponent', () => {
  let component: NlfResolveAvatarComponent;
  let fixture: ComponentFixture<NlfResolveAvatarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NlfResolveAvatarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NlfResolveAvatarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

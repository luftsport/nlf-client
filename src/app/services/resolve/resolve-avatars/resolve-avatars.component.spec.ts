import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NlfResolveAvatarsComponent } from './resolve-avatars.component';

describe('NlfResolveAvatarsComponent', () => {
  let component: NlfResolveAvatarsComponent;
  let fixture: ComponentFixture<NlfResolveAvatarsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NlfResolveAvatarsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NlfResolveAvatarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

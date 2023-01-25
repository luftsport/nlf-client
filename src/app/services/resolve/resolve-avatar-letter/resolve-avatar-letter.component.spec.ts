import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NlfResolveAvatarLetterComponent } from './resolve-avatar-letter.component';

describe('NlfResolveAvatarLetterComponent', () => {
  let component: NlfResolveAvatarLetterComponent;
  let fixture: ComponentFixture<NlfResolveAvatarLetterComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NlfResolveAvatarLetterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NlfResolveAvatarLetterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

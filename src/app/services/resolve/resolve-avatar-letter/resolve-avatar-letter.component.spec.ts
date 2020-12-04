import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NlfResolveAvatarLetterComponent } from './resolve-avatar-letter.component';

describe('NlfResolveAvatarLetterComponent', () => {
  let component: NlfResolveAvatarLetterComponent;
  let fixture: ComponentFixture<NlfResolveAvatarLetterComponent>;

  beforeEach(async(() => {
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

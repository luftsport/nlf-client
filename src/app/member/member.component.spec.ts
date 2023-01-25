import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NlfMemberComponent } from './member.component';

describe('NlfMemberComponent', () => {
  let component: NlfMemberComponent;
  let fixture: ComponentFixture<NlfMemberComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NlfMemberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NlfMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

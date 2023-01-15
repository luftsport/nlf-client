import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NlfMemberComponent } from './member.component';

describe('NlfMemberComponent', () => {
  let component: NlfMemberComponent;
  let fixture: ComponentFixture<NlfMemberComponent>;

  beforeEach(async(() => {
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

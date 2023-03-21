import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ResolveClubComponent } from './resolve-club.component';

describe('ResolveClubComponent', () => {
  let component: ResolveClubComponent;
  let fixture: ComponentFixture<ResolveClubComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ResolveClubComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResolveClubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

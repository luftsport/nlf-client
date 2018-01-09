import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResolveClubComponent } from './resolve-club.component';

describe('ResolveClubComponent', () => {
  let component: ResolveClubComponent;
  let fixture: ComponentFixture<ResolveClubComponent>;

  beforeEach(async(() => {
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

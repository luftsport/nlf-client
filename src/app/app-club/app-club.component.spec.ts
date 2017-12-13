import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppClubComponent } from './app-club.component';

describe('AppClubComponent', () => {
  let component: AppClubComponent;
  let fixture: ComponentFixture<AppClubComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppClubComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppClubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

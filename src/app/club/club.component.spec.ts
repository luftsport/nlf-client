import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NlfClubComponent } from './club.component';

describe('NlfClubComponent', () => {
  let component: NlfClubComponent;
  let fixture: ComponentFixture<NlfClubComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NlfClubComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NlfClubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

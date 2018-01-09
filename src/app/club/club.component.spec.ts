import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NlfClubComponent } from './club.component';

describe('NlfClubComponent', () => {
  let component: NlfClubComponent;
  let fixture: ComponentFixture<NlfClubComponent>;

  beforeEach(async(() => {
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

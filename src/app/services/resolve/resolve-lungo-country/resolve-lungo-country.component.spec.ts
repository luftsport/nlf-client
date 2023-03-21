import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ResolveLungoCountryComponent } from './resolve-lungo-country.component';

describe('ResolveLungoCountryComponent', () => {
  let component: ResolveLungoCountryComponent;
  let fixture: ComponentFixture<ResolveLungoCountryComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ResolveLungoCountryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResolveLungoCountryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

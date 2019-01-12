import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResolveLungoCountryComponent } from './resolve-lungo-country.component';

describe('ResolveLungoCountryComponent', () => {
  let component: ResolveLungoCountryComponent;
  let fixture: ComponentFixture<ResolveLungoCountryComponent>;

  beforeEach(async(() => {
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

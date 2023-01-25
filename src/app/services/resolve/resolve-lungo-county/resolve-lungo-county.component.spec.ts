import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ResolveLungoCountyComponent } from './resolve-lungo-county.component';

describe('ResolveLungoCountyComponent', () => {
  let component: ResolveLungoCountyComponent;
  let fixture: ComponentFixture<ResolveLungoCountyComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ResolveLungoCountyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResolveLungoCountyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

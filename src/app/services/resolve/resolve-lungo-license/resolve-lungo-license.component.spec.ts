import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResolveLungoLicenseComponent } from './resolve-lungo-license.component';

describe('ResolveLungoLicenseComponent', () => {
  let component: ResolveLungoLicenseComponent;
  let fixture: ComponentFixture<ResolveLungoLicenseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResolveLungoLicenseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResolveLungoLicenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ResolveLicenseComponent } from './resolve-license.component';

describe('ResolveLicenseComponent', () => {
  let component: ResolveLicenseComponent;
  let fixture: ComponentFixture<ResolveLicenseComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ResolveLicenseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResolveLicenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

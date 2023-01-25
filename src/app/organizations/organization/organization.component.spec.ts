import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NlfOrganizationComponent } from './organization.component';

describe('NlfOrganizationComponent', () => {
  let component: NlfOrganizationComponent;
  let fixture: ComponentFixture<NlfOrganizationComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NlfOrganizationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NlfOrganizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

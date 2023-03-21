import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NlfOrganizationToolbarComponent } from './organization-toolbar.component';

describe('NlfOrganizationToolbarComponent', () => {
  let component: NlfOrganizationToolbarComponent;
  let fixture: ComponentFixture<NlfOrganizationToolbarComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NlfOrganizationToolbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NlfOrganizationToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

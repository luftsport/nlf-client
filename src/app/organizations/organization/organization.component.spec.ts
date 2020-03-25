import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NlfOrganizationComponent } from './organization.component';

describe('NlfOrganizationComponent', () => {
  let component: NlfOrganizationComponent;
  let fixture: ComponentFixture<NlfOrganizationComponent>;

  beforeEach(async(() => {
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

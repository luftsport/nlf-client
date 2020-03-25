import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NlfOrganizationsComponent } from './organizations.component';

describe('NlfOrganizationsComponent', () => {
  let component: NlfOrganizationsComponent;
  let fixture: ComponentFixture<NlfOrganizationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NlfOrganizationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NlfOrganizationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

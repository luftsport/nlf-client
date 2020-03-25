import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NlfOrganizationToolbarComponent } from './organization-toolbar.component';

describe('NlfOrganizationToolbarComponent', () => {
  let component: NlfOrganizationToolbarComponent;
  let fixture: ComponentFixture<NlfOrganizationToolbarComponent>;

  beforeEach(async(() => {
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

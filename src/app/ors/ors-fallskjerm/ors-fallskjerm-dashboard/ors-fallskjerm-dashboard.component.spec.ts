import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NlfOrsFallskjermDashboardComponent } from './ors-fallskjerm-dashboard.component';

describe('NlfOrsFallskjermDashboardComponent', () => {
  let component: NlfOrsFallskjermDashboardComponent;
  let fixture: ComponentFixture<NlfOrsFallskjermDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NlfOrsFallskjermDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NlfOrsFallskjermDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

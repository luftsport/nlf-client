import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NlfOrsFallskjermDashboardTableComponent } from './ors-fallskjerm-dashboard-table.component';

describe('NlfOrsFallskjermDashboardTableComponent', () => {
  let component: NlfOrsFallskjermDashboardTableComponent;
  let fixture: ComponentFixture<NlfOrsFallskjermDashboardTableComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NlfOrsFallskjermDashboardTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NlfOrsFallskjermDashboardTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

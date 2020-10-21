import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NlfOrsFallskjermDashboardTableComponent } from './ors-fallskjerm-dashboard-table.component';

describe('NlfOrsFallskjermDashboardTableComponent', () => {
  let component: NlfOrsFallskjermDashboardTableComponent;
  let fixture: ComponentFixture<NlfOrsFallskjermDashboardTableComponent>;

  beforeEach(async(() => {
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

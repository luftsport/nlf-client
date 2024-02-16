import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NlfOrsModellflyDashboardTableComponent } from './ors-modellfly-dashboard-table.component';

describe('NlfOrsModellflyDashboardTableComponent', () => {
  let component: NlfOrsModellflyDashboardTableComponent;
  let fixture: ComponentFixture<NlfOrsModellflyDashboardTableComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NlfOrsModellflyDashboardTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NlfOrsModellflyDashboardTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

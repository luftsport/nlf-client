import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NlfOrsStatsHeatmapComponent } from './ors-stats-heatmap.component';

describe('NlfOrsStatsHeatmapComponent', () => {
  let component: NlfOrsStatsHeatmapComponent;
  let fixture: ComponentFixture<NlfOrsStatsHeatmapComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NlfOrsStatsHeatmapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NlfOrsStatsHeatmapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NlfOrsStatsComponent } from './ors-stats.component';

describe('NlfOrsStatsComponent', () => {
  let component: NlfOrsStatsComponent;
  let fixture: ComponentFixture<NlfOrsStatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NlfOrsStatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NlfOrsStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

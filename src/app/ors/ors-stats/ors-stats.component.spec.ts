import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrsStatsComponent } from './ors-stats.component';

describe('OrsStatsComponent', () => {
  let component: OrsStatsComponent;
  let fixture: ComponentFixture<OrsStatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrsStatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrsStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

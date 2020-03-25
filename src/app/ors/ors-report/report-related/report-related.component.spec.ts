import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NlfOrsReportRelatedComponent } from './report-related.component';

describe('NlfOrsFallskjermReportRelatedComponent', () => {
  let component: NlfOrsReportRelatedComponent;
  let fixture: ComponentFixture<NlfOrsReportRelatedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NlfOrsReportRelatedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NlfOrsReportRelatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

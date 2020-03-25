import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NlfOrsReportFilesComponent } from './report-files.component';

describe('NlfOrsFallskjermReportFilesComponent', () => {
  let component: NlfOrsReportFilesComponent;
  let fixture: ComponentFixture<NlfOrsReportFilesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NlfOrsReportFilesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NlfOrsReportFilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

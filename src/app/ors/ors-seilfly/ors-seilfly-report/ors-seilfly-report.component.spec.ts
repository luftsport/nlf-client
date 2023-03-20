import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NlfOrsSeilflyReportComponent } from './ors-seilfly-report.component';

describe('NlfOrsSeilflyReportComponent', () => {
  let component: NlfOrsSeilflyReportComponent;
  let fixture: ComponentFixture<NlfOrsSeilflyReportComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NlfOrsSeilflyReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NlfOrsSeilflyReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

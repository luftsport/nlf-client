import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NlfContentSummaryComponent } from './content-summary.component';

describe('NlfContentSummaryComponent', () => {
  let component: NlfContentSummaryComponent;
  let fixture: ComponentFixture<NlfContentSummaryComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NlfContentSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NlfContentSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NlfAircraftsViewComponent } from './aircrafts-view.component';

describe('NlfAircraftsViewComponent', () => {
  let component: NlfAircraftsViewComponent;
  let fixture: ComponentFixture<NlfAircraftsViewComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NlfAircraftsViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NlfAircraftsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

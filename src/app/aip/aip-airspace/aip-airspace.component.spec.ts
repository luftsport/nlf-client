import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NlfAipAirspaceComponent } from './aip-airspace.component';

describe('NlfAipAirspaceComponent', () => {
  let component: NlfAipAirspaceComponent;
  let fixture: ComponentFixture<NlfAipAirspaceComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NlfAipAirspaceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NlfAipAirspaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

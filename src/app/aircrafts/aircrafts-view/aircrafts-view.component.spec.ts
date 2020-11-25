import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NlfAircraftsViewComponent } from './aircrafts-view.component';

describe('NlfAircraftsViewComponent', () => {
  let component: NlfAircraftsViewComponent;
  let fixture: ComponentFixture<NlfAircraftsViewComponent>;

  beforeEach(async(() => {
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

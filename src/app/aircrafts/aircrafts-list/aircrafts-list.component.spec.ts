import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NlfAircraftsListComponent } from './aircrafts-list.component';

describe('NlfAircraftsListComponent', () => {
  let component: NlfAircraftsListComponent;
  let fixture: ComponentFixture<NlfAircraftsListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NlfAircraftsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NlfAircraftsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

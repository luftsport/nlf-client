import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NlfAircraftsAddComponent } from './aircrafts-add.component';

describe('NlfAircraftsAddComponent', () => {
  let component: NlfAircraftsAddComponent;
  let fixture: ComponentFixture<NlfAircraftsAddComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NlfAircraftsAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NlfAircraftsAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ChangesHourComponent } from './changes-hour.component';

describe('ChangesHourComponent', () => {
  let component: ChangesHourComponent;
  let fixture: ComponentFixture<ChangesHourComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangesHourComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangesHourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

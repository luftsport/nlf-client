import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangesHourComponent } from './changes-hour.component';

describe('ChangesHourComponent', () => {
  let component: ChangesHourComponent;
  let fixture: ComponentFixture<ChangesHourComponent>;

  beforeEach(async(() => {
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

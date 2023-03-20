import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NlfUserClubSelectorComponent } from './user-club-selector.component';

describe('NlfUserClubSelectorComponent', () => {
  let component: NlfUserClubSelectorComponent;
  let fixture: ComponentFixture<NlfUserClubSelectorComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NlfUserClubSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NlfUserClubSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

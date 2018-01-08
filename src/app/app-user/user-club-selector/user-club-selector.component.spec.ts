import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppUserClubSelectorComponent } from './app-user-club-selector.component';

describe('AppUserClubSelectorComponent', () => {
  let component: AppUserClubSelectorComponent;
  let fixture: ComponentFixture<AppUserClubSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppUserClubSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppUserClubSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NlfUserSettingsComponent } from './user-settings.component';

describe('NlfUserSettingsComponent', () => {
  let component: NlfUserSettingsComponent;
  let fixture: ComponentFixture<NlfUserSettingsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NlfUserSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NlfUserSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NlfFallskjermObsregUserComponent } from './fallskjerm-obsreg-user.component';

describe('NlfFallskjermObsregUserComponent', () => {
  let component: NlfFallskjermObsregUserComponent;
  let fixture: ComponentFixture<NlfFallskjermObsregUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NlfFallskjermObsregUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NlfFallskjermObsregUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

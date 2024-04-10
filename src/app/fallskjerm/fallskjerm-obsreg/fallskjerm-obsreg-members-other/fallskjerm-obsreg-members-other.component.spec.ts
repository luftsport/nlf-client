import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FallskjermObsregMembersOtherComponent } from './fallskjerm-obsreg-members-other.component';

describe('FallskjermObsregMembersOtherComponent', () => {
  let component: FallskjermObsregMembersOtherComponent;
  let fixture: ComponentFixture<FallskjermObsregMembersOtherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FallskjermObsregMembersOtherComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FallskjermObsregMembersOtherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

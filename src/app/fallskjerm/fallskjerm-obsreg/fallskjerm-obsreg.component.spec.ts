import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NlfFallskjermObsregComponent } from './fallskjerm-obsreg.component';

describe('NlfFallskjermObsregComponent', () => {
  let component: NlfFallskjermObsregComponent;
  let fixture: ComponentFixture<NlfFallskjermObsregComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NlfFallskjermObsregComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NlfFallskjermObsregComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

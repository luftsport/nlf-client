import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NlfFallskjermObsregQueryComponent } from './fallskjerm-obsreg-query.component';

describe('NlfFallskjermObsregQueryComponent', () => {
  let component: NlfFallskjermObsregQueryComponent;
  let fixture: ComponentFixture<NlfFallskjermObsregQueryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NlfFallskjermObsregQueryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NlfFallskjermObsregQueryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

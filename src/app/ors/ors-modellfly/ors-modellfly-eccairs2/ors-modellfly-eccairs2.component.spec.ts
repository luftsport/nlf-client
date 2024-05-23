import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrsModellflyEccairs2Component } from './ors-modellfly-eccairs2.component';

describe('OrsModellflyEccairs2Component', () => {
  let component: OrsModellflyEccairs2Component;
  let fixture: ComponentFixture<OrsModellflyEccairs2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrsModellflyEccairs2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrsModellflyEccairs2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

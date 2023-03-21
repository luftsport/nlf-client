import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { OrsE5xComponent } from './ors-e5x.component';

describe('OrsE5xComponent', () => {
  let component: OrsE5xComponent;
  let fixture: ComponentFixture<OrsE5xComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ OrsE5xComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrsE5xComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

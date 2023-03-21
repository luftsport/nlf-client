import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ResolveLungoFunctionTypeComponent } from './resolve-lungo-function-type.component';

describe('ResolveLungoFunctionTypeComponent', () => {
  let component: ResolveLungoFunctionTypeComponent;
  let fixture: ComponentFixture<ResolveLungoFunctionTypeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ResolveLungoFunctionTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResolveLungoFunctionTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NlfResolveLungoPersonComponent } from './resolve-user.component';

describe('NlfResolveLungoPersonComponent', () => {
  let component: NlfResolveLungoPersonComponent;
  let fixture: ComponentFixture<NlfResolveLungoPersonComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NlfResolveLungoPersonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NlfResolveLungoPersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

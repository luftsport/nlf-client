import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NlfUserOrsComponent } from './user-ors.component';

describe('NlfUserOrsComponent', () => {
  let component: NlfUserOrsComponent;
  let fixture: ComponentFixture<NlfUserOrsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NlfUserOrsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NlfUserOrsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

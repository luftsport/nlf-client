import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NlfResolveComponent } from './resolve.component';

describe('ResolveComponent', () => {
  let component: NlfResolveComponent;
  let fixture: ComponentFixture<NlfResolveComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NlfResolveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NlfResolveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NlfOrsModellflyMainComponent } from './ors-modellfly-main.component';

describe('NlfOrsModellflyMainComponent', () => {
  let component: NlfOrsModellflyMainComponent;
  let fixture: ComponentFixture<NlfOrsModellflyMainComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NlfOrsModellflyMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NlfOrsModellflyMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

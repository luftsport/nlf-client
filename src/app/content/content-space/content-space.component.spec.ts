import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NlfContentSpaceComponent } from './content-space.component';

describe('NlfContentSpaceComponent', () => {
  let component: NlfContentSpaceComponent;
  let fixture: ComponentFixture<NlfContentSpaceComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NlfContentSpaceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NlfContentSpaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

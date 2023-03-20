import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NlfContentComponent } from './content.component';

describe('NlfContentComponent', () => {
  let component: NlfContentComponent;
  let fixture: ComponentFixture<NlfContentComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NlfContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NlfContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

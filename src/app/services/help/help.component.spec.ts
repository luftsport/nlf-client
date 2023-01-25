import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NlfHelpComponent } from './help.component';

describe('NlfHelpComponent', () => {
  let component: NlfHelpComponent;
  let fixture: ComponentFixture<NlfHelpComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NlfHelpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NlfHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

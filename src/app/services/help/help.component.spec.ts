import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NlfHelpComponent } from './help.component';

describe('NlfHelpComponent', () => {
  let component: NlfHelpComponent;
  let fixture: ComponentFixture<NlfHelpComponent>;

  beforeEach(async(() => {
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

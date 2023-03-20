import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { OrsCreateModalComponent } from './ors-create-modal.component';

describe('OrsCreateModalComponent', () => {
  let component: OrsCreateModalComponent;
  let fixture: ComponentFixture<OrsCreateModalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ OrsCreateModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrsCreateModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

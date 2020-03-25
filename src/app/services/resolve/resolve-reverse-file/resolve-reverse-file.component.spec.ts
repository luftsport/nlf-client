import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NlfResolveFileComponent } from './resolve-file.component';

describe('NlfResolveFileComponent', () => {
  let component: NlfResolveFileComponent;
  let fixture: ComponentFixture<NlfResolveFileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NlfResolveFileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NlfResolveFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

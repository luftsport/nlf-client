import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NlfResolveConfigComponent } from './resolve-config.component';

describe('NlfResolveConfigComponent', () => {
  let component: NlfResolveConfigComponent;
  let fixture: ComponentFixture<NlfResolveConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NlfResolveConfigComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NlfResolveConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

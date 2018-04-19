import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NlfContentTreeComponent } from './content-tree.component';

describe('NlfContentTreeComponent', () => {
  let component: NlfContentTreeComponent;
  let fixture: ComponentFixture<NlfContentTreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NlfContentTreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NlfContentTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ResolveLungoCompetenceComponent } from './resolve-lungo-competence.component';

describe('ResolveLungoCompetenceComponent', () => {
  let component: ResolveLungoCompetenceComponent;
  let fixture: ComponentFixture<ResolveLungoCompetenceComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ResolveLungoCompetenceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResolveLungoCompetenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilesDuplicatesComponent } from './files-duplicates.component';

describe('FilesDuplicatesComponent', () => {
  let component: FilesDuplicatesComponent;
  let fixture: ComponentFixture<FilesDuplicatesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilesDuplicatesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilesDuplicatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

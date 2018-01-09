import { TestBed, inject } from '@angular/core/testing';

import { ApiJumpCategoriesService } from './api-jump-categories.service';

describe('JumpCategoriesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApiJumpCategoriesService]
    });
  });

  it('should be created', inject([ApiJumpCategoriesService], (service: ApiJumpCategoriesService) => {
    expect(service).toBeTruthy();
  }));
});

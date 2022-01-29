import { TestBed } from '@angular/core/testing';

import { ModelGenerateService } from './model-generate.service';

describe('ModelGenerateService', () => {
  let service: ModelGenerateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModelGenerateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

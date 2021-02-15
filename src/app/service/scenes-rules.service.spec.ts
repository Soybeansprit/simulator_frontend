import { TestBed } from '@angular/core/testing';

import { ScenesRulesService } from './scenes-rules.service';

describe('ScenesRulesService', () => {
  let service: ScenesRulesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScenesRulesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

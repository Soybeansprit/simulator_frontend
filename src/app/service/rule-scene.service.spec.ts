import { TestBed } from '@angular/core/testing';

import { RuleSceneService } from './rule-scene.service';

describe('RuleSceneService', () => {
  let service: RuleSceneService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RuleSceneService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

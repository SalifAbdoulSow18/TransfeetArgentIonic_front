import { TestBed } from '@angular/core/testing';

import { ListSiegeService } from './list-siege.service';

describe('ListSiegeService', () => {
  let service: ListSiegeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListSiegeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

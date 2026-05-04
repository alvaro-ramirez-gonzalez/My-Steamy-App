import { TestBed } from '@angular/core/testing';

import { Deals } from './deals';

describe('Deals', () => {
  let service: Deals;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Deals);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

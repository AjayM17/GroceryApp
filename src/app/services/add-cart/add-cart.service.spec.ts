import { TestBed } from '@angular/core/testing';

import { AddCartService } from './add-cart.service';

describe('AddCartService', () => {
  let service: AddCartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddCartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

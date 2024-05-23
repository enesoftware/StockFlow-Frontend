import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { loggedInControlGuard } from './logged-in-control.guard';

describe('loggedInControlGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => loggedInControlGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});

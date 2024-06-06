import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { validarAccesoGuard } from './validar-acceso.guard';

describe('validarAccesoGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => validarAccesoGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});

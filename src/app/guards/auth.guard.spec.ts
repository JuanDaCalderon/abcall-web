import {TestBed} from '@angular/core/testing';
import {Router} from '@angular/router';
import {AuthGuard} from './auth.guard';

describe('AuthGuard', () => {
  let service: AuthGuard;

  beforeEach(() => {
    const routerStub = () => ({navigate: () => ({})});
    TestBed.configureTestingModule({
      providers: [AuthGuard, {provide: Router, useFactory: routerStub}]
    });
    service = TestBed.inject(AuthGuard);
  });

  afterEach(() => {
    localStorage.removeItem('usuario');
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });

  describe('canActivate', () => {
    it('makes expected calls', () => {
      const routerStub: Router = TestBed.inject(Router);
      spyOn(routerStub, 'navigate').and.callThrough();
      service.canActivate();
      expect(routerStub.navigate).toHaveBeenCalled();
    });

    it('should allow access if user is logged in', () => {
      localStorage.setItem('usuario', JSON.stringify({}));
      const result = service.canActivate();
      expect(result).toBeTrue(); // Debe permitir el acceso
    });
  });
});

import {TestBed} from '@angular/core/testing';
import {GestorService} from './gestor.service';
import {provideHttpClient} from '@angular/common/http';
import {HttpTestingController, provideHttpClientTesting} from '@angular/common/http/testing';
import {Subscription} from 'rxjs';
import {Gestores, GESTORTIERS, ROLES} from '../models/users';
import {environment} from '../../environments/environment';

describe('GestorService', () => {
  let service: GestorService;
  let httpMock: HttpTestingController;
  const subscriptions: Subscription[] = [];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()]
    });
    service = TestBed.inject(GestorService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterAll(() => {
    subscriptions.forEach((s) => s.unsubscribe());
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should login the user and return a token', () => {
    const gestorMock: Gestores = {
      email: 'pepito@gmail.com',
      username: 'pepito',
      telefono: '23423423432',
      password: '123456789',
      nombres: 'Juan David',
      apellidos: 'Calderon Jimenez',
      direccion: 'Cll 38c No.72j - 55',
      rol: ROLES.gestor,
      gestortier: GESTORTIERS.lead
    };
    subscriptions.push(
      service.createGestor(gestorMock).subscribe((response) => {
        expect(response.email).toBe(gestorMock.email);
        expect(response.username).toBe(gestorMock.username);
        expect(response.telefono).toBe(gestorMock.telefono);
        expect(response.password).toBe(gestorMock.password);
      })
    );
    const req = httpMock.expectOne(`${environment.apiUrl}${environment.userPort}/usuario/register`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(gestorMock);
    req.flush(gestorMock);
  });
});

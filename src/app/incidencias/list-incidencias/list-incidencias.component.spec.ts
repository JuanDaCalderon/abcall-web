import {ComponentFixture, TestBed} from '@angular/core/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {TranslateModule, TranslateLoader, TranslateFakeLoader} from '@ngx-translate/core';
import {ListIncidenciasComponent} from './list-incidencias.component';
import {IncidenciasService} from '../../services/incidencias.service';
import {of, throwError} from 'rxjs';
import {Incidente} from '../../models/incidentes';

describe('ListIncidenciasComponent', () => {
  let component: ListIncidenciasComponent;
  let fixture: ComponentFixture<ListIncidenciasComponent>;
  let incidenciaServiceStub = jasmine.createSpyObj('IncidenciasService', ['getIncidencias']);

  beforeEach(async () => {
    incidenciaServiceStub = jasmine.createSpyObj('IncidenciasService', ['getIncidencias']);
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useClass: TranslateFakeLoader
          }
        }),
        ListIncidenciasComponent
      ],
      providers: [{provide: IncidenciasService, useFactory: incidenciaServiceStub}]
    }).compileComponents();

    fixture = TestBed.createComponent(ListIncidenciasComponent);
    component = fixture.componentInstance;
    const mockIncidencias: Incidente[] = [
      {
        ID: 1,
        DESCRIPCION: 'Test Incidente',
        CLIENTE: 'Cliente Test',
        COMENTARIOS: 'Comentarios Test',
        CORREO: 'CorreoTest@correotest.com',
        DIRECCION: 'Dirección Test',
        ESTADO: 'Abierto',
        FECHACREACION: '19-10-2024 11:39:00',
        PRIORIDAD: 'Alta',
        TELEFONO: '111111111',
        USUARIO: 'Usuario Test'
      },
      {
        ID: 1,
        DESCRIPCION: 'Test Incidente',
        CLIENTE: 'Cliente Test',
        COMENTARIOS: 'Comentarios Test',
        CORREO: 'CorreoTest@correotest.com',
        DIRECCION: 'Dirección Test',
        ESTADO: 'Abierto',
        FECHACREACION: '19-10-2024 11:39:00',
        PRIORIDAD: 'Alta',
        TELEFONO: '111111111',
        USUARIO: 'Usuario Test'
      }
    ];
    incidenciaServiceStub.getIncidencias.and.returnValues(of(mockIncidencias));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load incidencias on init', () => {
    component.getIncidencias();

    expect(component.incidencias.length).toBe(0);
  });

  it('should load incidencias on init', () => {
    const incidenciaServiceStub: IncidenciasService = fixture.debugElement.injector.get(IncidenciasService);
    const mockIncidencias: Incidente[] = [
      {
        ID: 1,
        DESCRIPCION: 'Test Incidente',
        CLIENTE: 'Cliente Test',
        COMENTARIOS: 'Comentarios Test',
        CORREO: 'CorreoTest@correotest.com',
        DIRECCION: 'Dirección Test',
        ESTADO: 'Abierto',
        FECHACREACION: '19-10-2024 11:39:00',
        PRIORIDAD: 'Alta',
        TELEFONO: '111111111',
        USUARIO: 'Usuario Test'
      },
      {
        ID: 1,
        DESCRIPCION: 'Test Incidente',
        CLIENTE: 'Cliente Test',
        COMENTARIOS: 'Comentarios Test',
        CORREO: 'CorreoTest@correotest.com',
        DIRECCION: 'Dirección Test',
        ESTADO: 'Abierto',
        FECHACREACION: '19-10-2024 11:39:00',
        PRIORIDAD: 'Alta',
        TELEFONO: '111111111',
        USUARIO: 'Usuario Test'
      }
    ];
    spyOn(incidenciaServiceStub, 'getIncidencias').and.returnValues(of(mockIncidencias));
    component.getIncidencias();
    expect(incidenciaServiceStub.getIncidencias).toHaveBeenCalled();
  });

  it('should reload incidencias', () => {
    const incidenciaServiceStub: IncidenciasService = fixture.debugElement.injector.get(IncidenciasService);
    const mockIncidencias: Incidente[] = [
      {
        ID: 1,
        DESCRIPCION: 'Incidencia 1',
        ESTADO: 'Abierto',
        PRIORIDAD: 'Alta',
        CLIENTE: 'Cliente 1',
        USUARIO: 'Usuario 1',
        COMENTARIOS: '',
        CORREO: '',
        DIRECCION: '',
        FECHACREACION: '',
        TELEFONO: ''
      }
    ];
    spyOn(incidenciaServiceStub, 'getIncidencias').and.returnValues(of(mockIncidencias));
    component.reloadIncidencias();
    expect(incidenciaServiceStub.getIncidencias).toHaveBeenCalled();
  });

  it('should change language', () => {
    spyOn(component.translate, 'use');

    component.changeLang('en');

    expect(component.language).toBe('en');
    expect(component.translate.use).toHaveBeenCalledWith('en');
  });

  it('getIncidencias fetches incidencias error', () => {
    const incidenciaServiceStub: IncidenciasService = fixture.debugElement.injector.get(IncidenciasService);
    const errorResponse = {status: 404, message: 'Not found'};
    spyOn(incidenciaServiceStub, 'getIncidencias').and.returnValue(throwError(errorResponse));
    component.getIncidencias();
    expect(incidenciaServiceStub.getIncidencias).toHaveBeenCalledWith();
  });
});

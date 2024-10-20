import {ComponentFixture, TestBed} from '@angular/core/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {TranslateModule, TranslateLoader, TranslateFakeLoader} from '@ngx-translate/core';
import {ListIncidenciasComponent} from './list-incidencias.component';
import {IncidenciasService} from '../../services/incidencias.service';
import {of} from 'rxjs';
import {Incidente} from '../../models/incidentes';

describe('ListIncidenciasComponent', () => {
  let component: ListIncidenciasComponent;
  let fixture: ComponentFixture<ListIncidenciasComponent>;
  let incidenciasService: IncidenciasService;

  beforeEach(async () => {
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
      providers: [IncidenciasService]
    }).compileComponents();

    fixture = TestBed.createComponent(ListIncidenciasComponent);
    component = fixture.componentInstance;
    incidenciasService = TestBed.inject(IncidenciasService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load incidencias on init', () => {
    const mockIncidencias: Incidente[] = [
      {
        ID: '1',
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
        ID: '1',
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
    spyOn(incidenciasService, 'getIncidencias').and.returnValue(of(mockIncidencias));

    component.getIncidencias();
  });

  it('should reload incidencias', () => {
    const mockIncidencias: Incidente[] = [
      {
        ID: '1',
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

    spyOn(incidenciasService, 'getIncidencias').and.returnValue(of(mockIncidencias));

    component.reloadIncidencias();
  });

  it('should change language', () => {
    spyOn(component.translate, 'use');

    component.changeLang('en');

    expect(component.language).toBe('en');
    expect(component.translate.use).toHaveBeenCalledWith('en');
  });
});

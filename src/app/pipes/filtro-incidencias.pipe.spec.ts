import {Incidente} from '../models/incidentes';
import {FiltroIncidenciasPipe} from './filtro-incidencias.pipe';

describe('FiltroIncidenciasPipe', () => {
  it('create an instance', () => {
    const pipe = new FiltroIncidenciasPipe();
    expect(pipe).toBeTruthy();
  });

  it('transforms cliente to cliente', () => {
    const pipe = new FiltroIncidenciasPipe();
    const incidencias: Incidente[] = [
      {
        USUARIO: 'user1',
        CLIENTE: 'cliente1',
        COMENTARIOS: '',
        CORREO: '',
        DESCRIPCION: '',
        DIRECCION: '',
        ESTADO: '',
        FECHACREACION: '',
        ID: 0,
        PRIORIDAD: '',
        TELEFONO: ''
      },
      {
        USUARIO: 'user2',
        CLIENTE: 'cliente2',
        COMENTARIOS: '',
        CORREO: '',
        DESCRIPCION: '',
        DIRECCION: '',
        ESTADO: '',
        FECHACREACION: '',
        ID: 0,
        PRIORIDAD: '',
        TELEFONO: ''
      }
    ];
    const value = '';
    expect(pipe.transform(incidencias, value).length).toBe(2);
  });

  it('transforms usuario to usuario', () => {
    const pipe = new FiltroIncidenciasPipe();
    const incidencias: Incidente[] = [
      {
        USUARIO: 'user1',
        CLIENTE: 'cliente1',
        COMENTARIOS: '',
        CORREO: '',
        DESCRIPCION: '',
        DIRECCION: '',
        ESTADO: '',
        FECHACREACION: '',
        ID: 0,
        PRIORIDAD: '',
        TELEFONO: ''
      },
      {
        USUARIO: 'user2',
        CLIENTE: 'cliente2',
        COMENTARIOS: '',
        CORREO: '',
        DESCRIPCION: '',
        DIRECCION: '',
        ESTADO: '',
        FECHACREACION: '',
        ID: 0,
        PRIORIDAD: '',
        TELEFONO: ''
      }
    ];
    const value = 'user2';
    expect(pipe.transform(incidencias, value).length).toBe(1);
  });
});

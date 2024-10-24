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
        id: 1,
        cliente: {
          id: '1',
          email: '',
          username: '',
          password: '',
          nombres: 'cliente1',
          apellidos: '',
          telefono: '',
          direccion: '',
          gestortier: '',
          token: '',
          rol: {
            id: 4,
            nombre: 'cliente',
            permisos: []
          }
        },
        fechacreacion: '2023-10-01',
        usuario: {
          id: '2',
          email: '',
          username: '',
          password: '',
          nombres: 'user1',
          apellidos: '',
          telefono: '',
          direccion: '',
          gestortier: '',
          token: '',
          rol: {
            id: 2,
            nombre: 'cliente',
            permisos: []
          }
        },
        correo: 'prueba@prueba.com',
        direccion: 'Test address',
        telefono: '123456789',
        descripcion: 'Test description',
        prioridad: 'High',
        estado: 'Open',
        comentarios: 'Test comments'
      },
      {
        id: 2,
        cliente: {
          id: '1',
          email: '',
          username: '',
          password: '',
          nombres: 'cliente2',
          apellidos: '',
          telefono: '',
          direccion: '',
          gestortier: '',
          token: '',
          rol: {
            id: 4,
            nombre: 'cliente',
            permisos: []
          }
        },
        fechacreacion: '2023-10-01',
        usuario: {
          id: '2',
          email: '',
          username: '',
          password: '',
          nombres: 'user2',
          apellidos: '',
          telefono: '',
          direccion: '',
          gestortier: '',
          token: '',
          rol: {
            id: 2,
            nombre: 'cliente',
            permisos: []
          }
        },
        correo: 'prueba@prueba.com',
        direccion: 'Test address',
        telefono: '123456789',
        descripcion: 'Test description',
        prioridad: 'High',
        estado: 'Open',
        comentarios: 'Test comments'
      }
    ];
    const value = '';
    expect(pipe.transform(incidencias, value).length).toBe(2);
  });

  it('transforms usuario to usuario', () => {
    const pipe = new FiltroIncidenciasPipe();
    const incidencias: Incidente[] = [
      {
        id: 1,
        cliente: {
          id: '1',
          email: '',
          username: '',
          password: '',
          nombres: 'cliente1',
          apellidos: '',
          telefono: '',
          direccion: '',
          gestortier: '',
          token: '',
          rol: {
            id: 4,
            nombre: 'cliente',
            permisos: []
          }
        },
        fechacreacion: '2023-10-01',
        usuario: {
          id: '2',
          email: '',
          username: '',
          password: '',
          nombres: 'user1',
          apellidos: '',
          telefono: '',
          direccion: '',
          gestortier: '',
          token: '',
          rol: {
            id: 2,
            nombre: 'cliente',
            permisos: []
          }
        },
        correo: 'prueba@prueba.com',
        direccion: 'Test address',
        telefono: '123456789',
        descripcion: 'Test description',
        prioridad: 'High',
        estado: 'Open',
        comentarios: 'Test comments'
      },
      {
        id: 2,
        cliente: {
          id: '1',
          email: '',
          username: '',
          password: '',
          nombres: 'cliente2',
          apellidos: '',
          telefono: '',
          direccion: '',
          gestortier: '',
          token: '',
          rol: {
            id: 4,
            nombre: 'cliente',
            permisos: []
          }
        },
        fechacreacion: '2023-10-01',
        usuario: {
          id: '2',
          email: '',
          username: '',
          password: '',
          nombres: 'user2',
          apellidos: '',
          telefono: '',
          direccion: '',
          gestortier: '',
          token: '',
          rol: {
            id: 2,
            nombre: 'cliente',
            permisos: []
          }
        },
        correo: 'prueba@prueba.com',
        direccion: 'Test address',
        telefono: '123456789',
        descripcion: 'Test description',
        prioridad: 'High',
        estado: 'Open',
        comentarios: 'Test comments'
      }
    ];
    const value = 'user2';
    expect(pipe.transform(incidencias, value).length).toBe(1);
  });
});

import {Incidente} from '../models/incidentes';
import {FiltroIncidenciasPipe} from './filtro-incidencias.pipe';
import {Usuario} from '../models/usuario';

describe('FiltroIncidenciasPipe', () => {
  it('create an instance', () => {
    const pipe = new FiltroIncidenciasPipe();
    expect(pipe).toBeTruthy();
  });

  it('transforms cliente to cliente', () => {
    const pipe = new FiltroIncidenciasPipe();
    const mockGestores: Usuario[] = [
      {
        id: '3',
        email: 'gestorjunior@gmail.com',
        username: 'gestorjunior',
        telefono: '6666666666',
        password: '123456789',
        nombres: 'gestorjunior',
        apellidos: 'gestorjunior',
        direccion: 'Cll 38c No.72j - 55',
        gestortier: 'junior',
        token: 'token',
        rol: {id: 3, nombre: 'gestor', permisos: []}
      },
      {
        id: '4',
        email: 'gestormid@gmail.com',
        username: 'gestormid',
        telefono: '77777777',
        password: '123456789',
        nombres: 'gestormid',
        apellidos: 'gestormid',
        direccion: 'Cll 38c No.72j - 55',
        gestortier: 'mid',
        token: 'token',
        rol: {id: 3, nombre: 'gestor', permisos: []}
      },
      {
        id: '5',
        email: 'gestorsenior@gmail.com',
        username: 'gestorsenior',
        telefono: '999999',
        password: '123456789',
        nombres: 'juan',
        apellidos: 'senior',
        direccion: 'Cll 38c No.72j - 55',
        gestortier: 'senior',
        token: 'token',
        rol: {id: 3, nombre: 'gestor', permisos: []}
      }
    ];
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
        comentarios: 'Test comments',
        canal: 'web',
        tipo: 'icidencia',
        gestor: mockGestores[0]
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
        comentarios: 'Test comments',
        canal: 'web',
        tipo: 'icidencia',
        gestor: mockGestores[1]
      }
    ];
    const value = '';
    expect(pipe.transform(incidencias, value).length).toBe(2);
  });

  it('transforms usuario to usuario', () => {
    const pipe = new FiltroIncidenciasPipe();
    const mockGestores: Usuario[] = [
      {
        id: '3',
        email: 'gestorjunior@gmail.com',
        username: 'gestorjunior',
        telefono: '6666666666',
        password: '123456789',
        nombres: 'gestorjunior',
        apellidos: 'gestorjunior',
        direccion: 'Cll 38c No.72j - 55',
        gestortier: 'junior',
        token: 'token',
        rol: {id: 3, nombre: 'gestor', permisos: []}
      },
      {
        id: '4',
        email: 'gestormid@gmail.com',
        username: 'gestormid',
        telefono: '77777777',
        password: '123456789',
        nombres: 'gestormid',
        apellidos: 'gestormid',
        direccion: 'Cll 38c No.72j - 55',
        gestortier: 'mid',
        token: 'token',
        rol: {id: 3, nombre: 'gestor', permisos: []}
      },
      {
        id: '5',
        email: 'gestorsenior@gmail.com',
        username: 'gestorsenior',
        telefono: '999999',
        password: '123456789',
        nombres: 'juan',
        apellidos: 'senior',
        direccion: 'Cll 38c No.72j - 55',
        gestortier: 'senior',
        token: 'token',
        rol: {id: 3, nombre: 'gestor', permisos: []}
      }
    ];
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
        comentarios: 'Test comments',
        canal: 'web',
        tipo: 'icidencia',
        gestor: mockGestores[0]
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
        comentarios: 'Test comments',
        canal: 'web',
        tipo: 'icidencia',
        gestor: mockGestores[1]
      }
    ];
    const value = 'user2';
    expect(pipe.transform(incidencias, value).length).toBe(1);
  });
});

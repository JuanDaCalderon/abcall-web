describe('Crear Gestor', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.intercept('POST', 'http://localhost:8003/usuario/login', {
      statusCode: 200, // Código de estado HTTP
      body: {
        id: '86c2ea7a-c64d-4e8c-8dff-6aa03bec6ac3',
        email: 'admin@gmail.com',
        username: 'admin',
        telefono: '3452342131',
        nombres: 'admin',
        apellidos: 'admin',
        direccion: 'cll 38c no.72j - 55',
        fechacreacion: '2024-11-04T12:59:58.953699',
        token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoiYWRtaW4iLCJleHAiOjE3MzIxNTI4MzF9.0hub3A4AZZznJj5wTpZGciommCJDGLkXIohA8-dZ29A',
        rol: {
          id: 2,
          nombre: 'administrador',
          permisos: [
            {
              id: 1,
              nombre: 'gestion permisos'
            },
            {
              id: 2,
              nombre: 'crear incidentes'
            },
            {
              id: 3,
              nombre: 'crear gestor'
            },
            {
              id: 4,
              nombre: 'crear cliente'
            },
            {
              id: 5,
              nombre: 'crear usuario'
            }
          ]
        }
      }
    }).as('loginMock');
    cy.intercept('GET', 'http://localhost:8003/usuarios', {
      statusCode: 200, // Código de estado HTTP
      body: [
        {
          id: 'fb36cfbc-8803-434b-a2e1-29d90e76a3ad',
          email: 'superadmin@gmail.com',
          username: 'superadmin',
          telefono: '123456789',
          nombres: 'superadmin',
          apellidos: 'superadmin',
          direccion: 'cll 38c no.72j - 55',
          fechacreacion: '2024-11-04T12:59:30.606129',
          rol: {
            id: 1,
            nombre: 'superadministrador'
          },
          gestortier: 'junior'
        },
        {
          id: '86c2ea7a-c64d-4e8c-8dff-6aa03bec6ac3',
          email: 'admin@gmail.com',
          username: 'admin',
          telefono: '3452342131',
          nombres: 'admin',
          apellidos: 'admin',
          direccion: 'cll 38c no.72j - 55',
          fechacreacion: '2024-11-04T12:59:58.953699',
          rol: {
            id: 2,
            nombre: 'administrador'
          },
          gestortier: 'junior'
        },
        {
          id: 'afc30784-f786-4f58-86ae-757ebab45d84',
          email: 'gestor@gmail.com',
          username: 'gestor',
          telefono: '345232131',
          nombres: 'gestor',
          apellidos: 'gestor',
          direccion: 'cll 38c no.72j - 55',
          fechacreacion: '2024-11-04T13:09:33.335273',
          rol: {
            id: 3,
            nombre: 'gestor'
          },
          gestortier: 'junior'
        },
        {
          id: '8c7e616f-8d30-48bf-9dfc-836401a89b32',
          email: 'cliente@gmail.com',
          username: 'cliente',
          telefono: '456323167',
          nombres: 'cliente',
          apellidos: 'cliente',
          direccion: 'cll 38c no.72j - 55',
          fechacreacion: '2024-11-04T13:09:54.468459',
          rol: {
            id: 4,
            nombre: 'cliente'
          },
          gestortier: 'junior'
        },
        {
          id: 'd0407b97-9e93-4357-952d-3563abc99e3c',
          email: 'usuario@gmail.com',
          username: 'usuario',
          telefono: '123432111',
          nombres: 'usuario',
          apellidos: 'usuario',
          direccion: 'cll 38c no.72j - 55',
          fechacreacion: '2024-11-04T13:10:12.424695',
          rol: {
            id: 5,
            nombre: 'usuario'
          },
          gestortier: 'junior'
        },
        {
          id: '5ae25e4a-5bc9-438e-ae19-c7f332557fea',
          email: 'usuario2@gmail.com',
          username: 'usuario2',
          telefono: '3452341334',
          nombres: 'usuario2',
          apellidos: 'usuario2',
          direccion: 'cll 38c no.72j - 55',
          fechacreacion: '2024-11-04T13:13:34.602017',
          rol: {
            id: 5,
            nombre: 'usuario'
          },
          gestortier: 'junior'
        },
        {
          id: '70de494b-21a0-4cf8-84df-65de24a89fcc',
          email: 'cliente2@gmail.com',
          username: 'cliente2',
          telefono: '677877777',
          nombres: 'cliente2',
          apellidos: 'cliente2',
          direccion: 'cll 38c no.72j - 55',
          fechacreacion: '2024-11-04T13:16:25.789284',
          rol: {
            id: 4,
            nombre: 'cliente'
          },
          gestortier: 'junior'
        },
        {
          id: 'ac6663c0-ce21-41ba-a9c7-3b2cae690f0d',
          email: 'gestor2@gmail.com',
          username: 'gestor2',
          telefono: '6666666666',
          nombres: 'gestor2',
          apellidos: 'gestor2',
          direccion: 'cll 38c no.72j - 55',
          fechacreacion: '2024-11-04T13:16:45.025836',
          rol: {
            id: 3,
            nombre: 'gestor'
          },
          gestortier: 'junior'
        }
      ]
    }).as('usuariosMock');
    cy.intercept('GET', 'http://localhost:8001/incidentes', {
      statusCode: 200, // Código de estado HTTP
      body: [
        {
          fechacreacion: '2024-11-04T13:19:16',
          correo: 'usuario@gmail.com',
          telefono: '1111111111',
          descripcion: 'incidente de prueba usuario',
          estado: 'en progreso',
          id: 1,
          cliente: {
            email: 'cliente2@gmail.com',
            telefono: '677877777',
            nombres: 'cliente2',
            direccion: 'cll 38c no.72j - 55',
            gestortier: 'junior',
            roleid: 4,
            username: 'cliente2',
            id: '70de494b-21a0-4cf8-84df-65de24a89fcc',
            password: '$2b$12$GnUOAA3AZpWw1PCBmNcEBOOTChvdz6BMPPRSUiQYrjy92KHQSeHMq',
            apellidos: 'cliente2',
            fechacreacion: '2024-11-04T13:16:25.789284'
          },
          usuario: {
            email: 'usuario@gmail.com',
            telefono: '123432111',
            nombres: 'usuario',
            direccion: 'cll 38c no.72j - 55',
            gestortier: 'junior',
            roleid: 5,
            username: 'usuario',
            id: 'd0407b97-9e93-4357-952d-3563abc99e3c',
            password: '$2b$12$Y/acL8XZK0tsvqCb8KRYCuTr6KyB0xbr5LyU1bYar8DOAhLmzcEBi',
            apellidos: 'usuario',
            fechacreacion: '2024-11-04T13:10:12.424695'
          },
          gestor: {
            email: 'gestor2@gmail.com',
            telefono: '6666666666',
            nombres: 'gestor2',
            direccion: 'cll 38c no.72j - 55',
            gestortier: 'junior',
            roleid: 3,
            username: 'gestor2',
            id: 'ac6663c0-ce21-41ba-a9c7-3b2cae690f0d',
            password: '$2b$12$8v1AIVX7eDdLzwXDYrtcB.SMni2fyKPzaFhsqnubHqc5NUT7VwYC6',
            apellidos: 'gestor2',
            fechacreacion: '2024-11-04T13:16:45.025836'
          },
          direccion: 'dirección',
          prioridad: 'baja',
          comentarios: 'otro comentario',
          canal: 'web',
          tipo: 'pqrs'
        },
        {
          fechacreacion: '2024-11-04T15:09:47.790748',
          correo: 'juandacalji@gmail.com',
          telefono: ' 2342312',
          descripcion: ' descripcion 1 desde email',
          estado: 'abierto',
          id: 2,
          cliente: '',
          usuario: '',
          gestor: '',
          direccion: ' direccion desde email carrera 1',
          prioridad: 'media',
          comentarios: ' comentario 1 desde el email',
          canal: 'email',
          tipo: 'incidente'
        },
        {
          fechacreacion: '2024-11-04T13:19:16',
          correo: 'usuarioagain@gmail.com',
          telefono: '1111111111',
          descripcion: 'incidente de prueba usuario',
          estado: 'abierto',
          id: 3,
          cliente: {
            email: 'cliente2@gmail.com',
            telefono: '677877777',
            nombres: 'cliente2',
            direccion: 'cll 38c no.72j - 55',
            gestortier: 'junior',
            roleid: 4,
            username: 'cliente2',
            id: '70de494b-21a0-4cf8-84df-65de24a89fcc',
            password: '$2b$12$GnUOAA3AZpWw1PCBmNcEBOOTChvdz6BMPPRSUiQYrjy92KHQSeHMq',
            apellidos: 'cliente2',
            fechacreacion: '2024-11-04T13:16:25.789284'
          },
          usuario: {
            email: 'usuario@gmail.com',
            telefono: '123432111',
            nombres: 'usuario',
            direccion: 'cll 38c no.72j - 55',
            gestortier: 'junior',
            roleid: 5,
            username: 'usuario',
            id: 'd0407b97-9e93-4357-952d-3563abc99e3c',
            password: '$2b$12$Y/acL8XZK0tsvqCb8KRYCuTr6KyB0xbr5LyU1bYar8DOAhLmzcEBi',
            apellidos: 'usuario',
            fechacreacion: '2024-11-04T13:10:12.424695'
          },
          gestor: {
            email: 'gestor2@gmail.com',
            telefono: '6666666666',
            nombres: 'gestor2',
            direccion: 'cll 38c no.72j - 55',
            gestortier: 'junior',
            roleid: 3,
            username: 'gestor2',
            id: 'ac6663c0-ce21-41ba-a9c7-3b2cae690f0d',
            password: '$2b$12$8v1AIVX7eDdLzwXDYrtcB.SMni2fyKPzaFhsqnubHqc5NUT7VwYC6',
            apellidos: 'gestor2',
            fechacreacion: '2024-11-04T13:16:45.025836'
          },
          direccion: 'dirección',
          prioridad: 'media',
          comentarios: 'otro comentario',
          canal: 'mobile',
          tipo: 'incidente'
        }
      ]
    }).as('incidentesMock');
    cy.intercept('POST', 'http://localhost:8003/usuario/register', {
      statusCode: 201, // Código de estado HTTP
      body: {
        id: '86c2ea7a-c64d-4e8c-8dff-6aa03bec6ac3',
        email: 'admin@gmail.com',
        username: 'admin',
        telefono: '3452342131',
        nombres: 'admin',
        apellidos: 'admin',
        direccion: 'cll 38c no.72j - 55',
        fechacreacion: '2024-11-04T12:59:58.953699',
        token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoiYWRtaW4iLCJleHAiOjE3MzIxNTI4MzF9.0hub3A4AZZznJj5wTpZGciommCJDGLkXIohA8-dZ29A',
        rol: {
          id: 2,
          nombre: 'administrador',
          permisos: [
            {
              id: 1,
              nombre: 'gestion permisos'
            },
            {
              id: 2,
              nombre: 'crear incidentes'
            },
            {
              id: 3,
              nombre: 'crear gestor'
            },
            {
              id: 4,
              nombre: 'crear cliente'
            },
            {
              id: 5,
              nombre: 'crear usuario'
            }
          ]
        }
      }
    }).as('gestorCreadoMock');

    cy.get('form').should('be.visible');
    const emailInput = cy.get('[data-cy="email-input"]');
    const passwordInput = cy.get('[data-cy="password-input"]');
    emailInput.click();
    emailInput.type('admin@gmail.com');
    passwordInput.click();
    passwordInput.type('123456789');
    const submitButton = cy.get('[data-cy="submit-button"]');
    submitButton.click();
    cy.wait('@loginMock').then((interception) => {
      expect(interception.response.body).to.have.property(
        'token',
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoiYWRtaW4iLCJleHAiOjE3MzIxNTI4MzF9.0hub3A4AZZznJj5wTpZGciommCJDGLkXIohA8-dZ29A'
      );
    });
    cy.get('button[id="mostrarNavBar"]').click();
    cy.get('[data-cy="tablero-incidentes"]').click();
    cy.wait(1000);
  });

  it('Prueba tablero de incidentes', () => {
    const clienteSelector = cy.get('[data-cy="tablero-cliente"]');
    const gestorSelector = cy.get('[data-cy="tablero-gestor"]');
    const usuarioSelector = cy.get('[data-cy="tablero-usuario"]');
    clienteSelector.select('cliente cliente', {force: true});
    cy.wait(1000);
    clienteSelector.select('Todos los clientes', {force: true});
    cy.get('[seriesName="web"]').should('be.visible');
    gestorSelector.select('gestor gestor', {force: true});
    cy.wait(1000);
    gestorSelector.select('Incidentes sin gestores', {force: true});
    cy.get('[seriesName="pqrs"]').should('be.visible');
    cy.wait(1000);
    usuarioSelector.select('usuario usuario', {force: true});
    cy.wait(1000);
    usuarioSelector.select('Todos los usuarios', {force: true});
    cy.get('[seriesName="abierto"]').should('be.visible');
    cy.wait(1000);
  });
});

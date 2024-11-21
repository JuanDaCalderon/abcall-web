import { faker } from '@faker-js/faker';

describe('Update incidencia', () => { 
    
    const mockSuperUsuario = {
        email: faker.internet.email().toLowerCase(),
        username: faker.internet.userName().toLowerCase(),
        password: '123456789',
        telefono: faker.phone.phoneNumber('##########'),
        nombres: faker.name.firstName().toLowerCase(),
        apellidos: faker.name.lastName().toLowerCase(),
        direccion: faker.address.streetAddress().toLowerCase(),
        rol: 1
    }

    const mockCliente = {   
        nombres: faker.name.firstName().toLowerCase(),
        apellidos: faker.name.lastName().toLowerCase(),
        email: faker.internet.email().toLowerCase(),
        telefono: faker.phone.phoneNumber('##########'), 
        direccion: faker.address.streetAddress().toLowerCase()
    }

    const mockUsuario = {
        email: faker.internet.email().toLowerCase(),
        username: faker.internet.userName().toLowerCase(),
        password: '123456789',
        telefono: faker.phone.phoneNumber('##########'),
        nombres: faker.name.firstName().toLowerCase(),
        apellidos: faker.name.lastName().toLowerCase(),
        direccion: faker.address.streetAddress().toLowerCase(),
        rol: 5
    }
    
    const mockIncidente = { 
        cliente: mockCliente.nombres + ' ' + mockCliente.apellidos,
        nombreUsuario: mockUsuario.nombres + ' ' + mockUsuario.apellidos,
        correoUsuario: faker.internet.email().toLowerCase(),
        telefonoUsuario: faker.phone.phoneNumber('##########'),
        direccionUsuario: faker.address.streetAddress().toLowerCase(),
        descripcionProblema: 'mi pc no conecta a internet',
        tipoIncidencia: 'incidencia',
        prioridad: 'alta',
        estado: 'abierto',
    };

    const mockIncidenteUpdate = {
        cliente: mockCliente.nombres + ' ' + mockCliente.apellidos,
        nombreUsuario: mockUsuario.nombres + ' ' + mockUsuario.apellidos,
        correoUsuario: faker.internet.email().toLowerCase(),
        telefonoUsuario: faker.phone.phoneNumber('##########'),
        direccionUsuario: faker.address.streetAddress().toLowerCase(),
        descripcionProblema: 'mi pc no conecta a internet',
        tipoIncidencia: 'pqrs',
        prioridad: 'media',
        estado: 'en proceso',
        comentario: faker.lorem.sentence().toLowerCase()
    };

    const mockIncidenteUpdate2 = {
        cliente: mockCliente.nombres + ' ' + mockCliente.apellidos,
        nombreUsuario: mockUsuario.nombres + ' ' + mockUsuario.apellidos,
        correoUsuario: faker.internet.email().toLowerCase(),
        telefonoUsuario: faker.phone.phoneNumber('##########'),
        direccionUsuario: faker.address.streetAddress().toLowerCase(),
        descripcionProblema: 'mi pc no conecta a internet',
        tipoIncidencia: 'incidencia',
        prioridad: 'baja',
        estado: 'a espera de respuesta usuario',
        comentario: faker.lorem.sentence().toLowerCase()
    };

  const mockRespuestaIA =
    'Por favor, intenta lo siguiente para resolver el problema de conexión: 1) Revisa que tu dispositivo esté conectado a internet; 2) Reinicia tu router o punto de acceso; 3) Verifica que no haya restricciones de red en tu firewall o antivirus. Si el problema persiste, contáctanos para mayor asistencia.';

    it('Crear superusuario', () => {
        cy.request({
            method: 'POST',
            url: 'http://localhost:8003/usuario/register',
            body: {
                email: mockSuperUsuario.email,
                username: mockSuperUsuario.username,
                password: mockSuperUsuario.password,
                telefono: mockSuperUsuario.telefono,
                nombres: mockSuperUsuario.nombres,
                apellidos: mockSuperUsuario.apellidos,
                direccion: mockSuperUsuario.direccion,
                rol: mockSuperUsuario.rol
            }
        }).then((response) => {
            expect(response.status).to.eq(201);
            expect(response.body).to.have.property('id');
        });
    });

    it('Crea cliente con superadmin', () => {        
        cy.visit('/login'); 
        cy.get('input[id="email"]').type(mockSuperUsuario.email);
        cy.get('input[id="password"]').type(mockSuperUsuario.password);
        cy.get('button[type="submit"]').click();
    
        cy.get('button[id="mostrarNavBar"]').should('be.visible');

        cy.get('button[id="mostrarNavBar"]').click();
        cy.get('a[id="crearCliente"]').click();

        cy.get('form').should('be.visible');

        cy.get('input[id="nombres"]').type(mockCliente.nombres, {force: true});
        cy.get('input[id="apellidos"]').type(mockCliente.apellidos, {force: true});
        cy.get('input[id="email"]').type(mockCliente.email, {force: true});
        cy.get('input[id="telefono"]').type(mockCliente.telefono, {force: true});
        cy.get('input[id="direccion"]').type(mockCliente.direccion, {force: true});

        cy.get('button[type="submit"]').should('be.enabled');
        cy.get('button[type="submit"]').click();

    }); 

    it('crear usuario()', () => {
        cy.request({
            method: 'POST',
            url: 'http://localhost:8003/usuario/register',
            body: {
                email: mockUsuario.email,
                username: mockUsuario.username,
                password: mockUsuario.password,
                telefono: mockUsuario.telefono,
                nombres: mockUsuario.nombres,
                apellidos: mockUsuario.apellidos,
                direccion: mockUsuario.direccion,
                rol: mockUsuario.rol
            }
        }).then((response) => {
            expect(response.status).to.eq(201);
            expect(response.body).to.have.property('id');
        });
    });

    it('Crear un incidente como superadmin', () => {

        cy.visit('/login'); 
        cy.get('input[id="email"]').type(mockSuperUsuario.email);
        cy.get('input[id="password"]').clear({force: true});
        cy.get('input[id="password"]').type(mockSuperUsuario.password);
        cy.get('button[type="submit"]').click();
        cy.get('button[id="mostrarNavBar"]').click();
        cy.get('a[id="crearIncidencia"]').click();

    cy.get('form').should('be.visible');
    cy.get('select[id="cliente"]').select(mockIncidente.cliente, {force: true});
    cy.get('select[id="nombreUsuario"]').select(mockIncidente.nombreUsuario, {force: true});
    cy.get('input[id="correoUsuario"]').type(mockIncidente.correoUsuario, {force: true});
    cy.get('input[id="telefonoUsuario"]').type(mockIncidente.telefonoUsuario, {force: true});
    cy.get('input[id="direccionUsuario"]').type(mockIncidente.direccionUsuario, {force: true});
    cy.get('textarea[id="descripcionProblema"]').type(mockIncidente.descripcionProblema, {force: true});
    cy.get('select[id="tipoIncidencia"]').select(mockIncidente.tipoIncidencia, {force: true});
    cy.get('select[id="prioridad"]').select(mockIncidente.prioridad, {force: true});
    cy.get('select[id="estado"]').select(mockIncidente.estado, {force: true});

    cy.get('textarea[id="respuestaIA"]').should('have.value', mockRespuestaIA);
    cy.get('button[id="guardar"]').should('be.enabled');
    cy.get('button[id="escalar"]').should('be.enabled');

        cy.get('button[id="guardar"]').click();
        cy.get('.toast-success').should('be.visible').and('contain', 'Incidente creado correctamente');
    });

    it('Actualizar y escalar la incidencia', () => {
        
        cy.visit('/login'); 
        cy.get('input[id="email"]').type(mockSuperUsuario.email);
        cy.get('input[id="password"]').clear({force: true});
        cy.get('input[id="password"]').type(mockSuperUsuario.password);
        cy.get('button[type="submit"]').click();
        
        // Click en el boton the "Ver/Editar" de la ultima tarjeta creada
        cy.get('div.card').last().within(() => {
            cy.get('button[id="verEditar"]').click();
        });
        cy.get('body').then($body => {
        if ($body.find('.toast-close-button').length > 0) {
            cy.get('.toast-close-button').click();
        }
        });
        
        cy.get('form').should('be.visible');
        cy.get('select[id="cliente"]').select(mockIncidenteUpdate.cliente, {force: true});
        cy.get('select[id="nombreUsuario"]').select(mockIncidenteUpdate.nombreUsuario, {force: true});
        cy.get('select[id="tipoIncidencia"]').select(mockIncidenteUpdate.tipoIncidencia, {force: true});
        cy.get('select[id="prioridad"]').select(mockIncidenteUpdate.prioridad,{force: true});
        cy.get('select[id="estado"]').select(mockIncidenteUpdate.estado, {force: true});
        cy.get('textarea[id="nuevoComentario"]').type(mockIncidenteUpdate.comentario, {force: true});
        
        cy.get('button[id="guardar"]').should('be.enabled');
        cy.get('button[id="escalar"]').should('be.enabled');

        cy.get('button[id="escalar"]').click();
        cy.get('.toast-success').should('be.visible').and('contain', 'Actualización exitosa');
    });

    it('Actualizar la incidencia por el superadmin', () => {
        
        cy.visit('/login'); 
        cy.get('input[id="email"]').type(mockSuperUsuario.email);
        cy.get('input[id="password"]').clear({force: true});
        cy.get('input[id="password"]').type(mockSuperUsuario.password);
        cy.get('button[type="submit"]').click();
        
        // Click en el boton the "Ver/Editar" de la ultima tarjeta creada
        cy.get('div.card').last().within(() => {
            cy.get('button[id="verEditar"]').click();
        });
        cy.get('body').then($body => {
        if ($body.find('.toast-close-button').length > 0) {
            cy.get('.toast-close-button').click();
        }
        });
        
        cy.get('form').should('be.visible');
        cy.get('select[id="cliente"]').select(mockIncidenteUpdate.cliente, {force: true});
        cy.get('select[id="nombreUsuario"]').select(mockIncidenteUpdate.nombreUsuario, {force: true});
        cy.get('select[id="tipoIncidencia"]').select(mockIncidenteUpdate2.tipoIncidencia, {force: true});
        cy.get('select[id="prioridad"]').select(mockIncidenteUpdate2.prioridad,{force: true});
        cy.get('select[id="estado"]').select(mockIncidenteUpdate2.estado, {force: true});
        cy.get('textarea[id="nuevoComentario"]').type(mockIncidenteUpdate2.comentario, {force: true});
        
        cy.get('button[id="guardar"]').should('be.enabled');
        cy.get('button[id="escalar"]').should('be.enabled');

        cy.get('button[id="guardar"]').click();
        cy.get('.toast-success').should('be.visible').and('contain', 'Actualización exitosa');


        /*------ verificar los cambios ----------*/

        cy.get('div.card').last().within(() => {
            cy.get('button[id="verEditar"]').click();
        });
        cy.get('body').then($body => {
        if ($body.find('.toast-close-button').length > 0) {
            cy.get('.toast-close-button').click();
        }
        });

        cy.get('form').should('be.visible');
        cy.get('select[id="cliente"]').should('contain', mockIncidenteUpdate2.cliente);
        cy.get('select[id="nombreUsuario"]').should('contain', mockIncidenteUpdate2.nombreUsuario);
        cy.get('select[id="tipoIncidencia"]').should('contain', mockIncidenteUpdate2.tipoIncidencia);
        cy.get('select[id="prioridad"]').should('contain', mockIncidenteUpdate2.prioridad,{force: true});
        cy.get('select[id="estado"]').should('contain', mockIncidenteUpdate2.estado); 
    });
    
});


import { faker } from '@faker-js/faker';

describe('E2E incidencias', () => { 
    
    const mockSuperUsuario = {
        email: faker.internet.email().toLowerCase(),
        username: faker.internet.userName().toLowerCase(),
        password: '123456789',
        telefono: faker.phone.phoneNumber('##########'),
        nombres: faker.name.firstName().replace("'", '').toLowerCase(),
        apellidos: faker.name.lastName().replace("'", '').toLowerCase(),
        direccion: faker.address.streetAddress().toLowerCase(),
        rol: 1
    }

    const mockGestorJunior = {  
        email: faker.internet.email().toLowerCase(),
        username: faker.internet.userName().toLowerCase(),
        password: '123456789',
        telefono: faker.phone.phoneNumber("##########"),
        nombres: faker.name.firstName().replace("'", '').toLowerCase(),
        apellidos: faker.name.lastName().replace("'", '').toLowerCase(),
        direccion: faker.address.streetAddress().toLowerCase(),
        gestor: 'junior'    
    };
    
    const mockGestorMid = {  
        email: faker.internet.email().toLowerCase(),
        username: faker.internet.userName().toLowerCase(),
        password: '123456789',
        telefono: faker.phone.phoneNumber('##########'), 
        nombres: faker.name.firstName().replace("'", '').toLowerCase(),
        apellidos: faker.name.lastName().replace("'", '').toLowerCase(),
        direccion: faker.address.streetAddress().toLowerCase(),
        gestor: 'mid'    
    };

    const mockCliente = {   
        email: faker.internet.email().toLowerCase(),
        username: faker.internet.userName().toLowerCase(),
        password: '123456789',
        telefono: faker.phone.phoneNumber('#########'),
        nombres: faker.name.firstName().replace("'", '').toLowerCase(),
        apellidos: faker.name.lastName().replace("'", '').toLowerCase(),
        direccion: faker.address.streetAddress().toLowerCase(),
        rol: 4
    }

    const mockUsuario = {
        email: faker.internet.email().toLowerCase(),
        username: faker.internet.userName().toLowerCase(),
        password: '123456789',
        telefono: faker.phone.phoneNumber('##########'),
        nombres: faker.name.firstName().replace(/[^a-zA-Z]/g, '').toLowerCase(),
        apellidos: faker.name.lastName().replace(/[^a-zA-Z]/g, '').toLowerCase(),
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

    const mockRespuestaIA = 'Por favor, intenta lo siguiente para resolver el problema de conexión: 1) Revisa que tu dispositivo esté conectado a internet; 2) Reinicia tu router o punto de acceso; 3) Verifica que no haya restricciones de red en tu firewall o antivirus. Si el problema persiste, contáctanos para mayor asistencia.';

    let incidenteId = 0;

    beforeEach(() => {        
        cy.visit('/login'); // Adjust the URL according to your routing configuration
    });

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

    it('Crear gestor junior con superadmin', () => {
        cy.get('input[id="email"]').type(mockSuperUsuario.email);
        cy.get('input[id="password"]').type(mockSuperUsuario.password);
        cy.get('button[type="submit"]').click();
    
        cy.get('button[id="mostrarNavBar"]').should('be.visible');

        cy.get('button[id="mostrarNavBar"]').click();
        cy.get('a[id="crearGestor"]').click();
        
        cy.get('form').should('be.visible');
        cy.wait(1000);

        cy.get('input[id="email"]').type(mockGestorJunior.email, {force: true});
        cy.get('input[id="username"]').type(mockGestorJunior.username, {force: true});
        cy.get('input[id="password"]').clear({force: true});
        cy.get('input[id="password"]').type(mockGestorJunior.password, {force: true});
        cy.get('input[id="telefono"]').type(mockGestorJunior.telefono, {force: true});
        cy.get('input[id="nombres"]').type(mockGestorJunior.nombres, {force: true});
        cy.get('input[id="apellidos"]').type(mockGestorJunior.apellidos, {force: true});
        cy.get('input[id="direccion"]').type(mockGestorJunior.direccion, {force: true});
        cy.get('select[id="gestortier"]').select(mockGestorJunior.gestor, {force: true});

        cy.get('button[data-cy="submit-button"]').should('be.enabled');
        cy.get('button[data-cy="submit-button"]').click();
        cy.wait(200);
        cy.get('.toast-success').should('be.visible').and('contain', 'gestor creado satisfactoriamente');
    });

    it('Crear gestor mid con superadmin', () => {
        cy.get('input[id="email"]').type(mockSuperUsuario.email);
        cy.get('input[id="password"]').type(mockSuperUsuario.password);
        cy.get('button[type="submit"]').click();
    
        cy.get('button[id="mostrarNavBar"]').should('be.visible');

        cy.get('button[id="mostrarNavBar"]').click();
        cy.get('a[id="crearGestor"]').click();
        
        cy.get('form').should('be.visible');
        cy.wait(1000);

        cy.get('input[id="email"]').type(mockGestorMid.email, {force: true});
        cy.get('input[id="username"]').type(mockGestorMid.username, {force: true});
        cy.get('input[id="password"]').clear({force: true});
        cy.get('input[id="password"]').type(mockGestorMid.password, {force: true});
        cy.get('input[id="telefono"]').type(mockGestorMid.telefono, {force: true});
        cy.get('input[id="nombres"]').type(mockGestorMid.nombres, {force: true});
        cy.get('input[id="apellidos"]').type(mockGestorMid.apellidos, {force: true});
        cy.get('input[id="direccion"]').type(mockGestorMid.direccion, {force: true});
        cy.get('select[id="gestortier"]').select(mockGestorMid.gestor, {force: true});

        cy.get('button[data-cy="submit-button"]').should('be.enabled');
        cy.get('button[data-cy="submit-button"]').click();
        cy.wait(200);
        cy.get('.toast-success').should('be.visible').and('contain', 'gestor creado satisfactoriamente');    
    });

    /*it('Crear cliente con superadmin', () => {        
        cy.get('input[id="email"]').type(mockSuperUsuario.email);
        cy.get('input[id="password"]').type(mockSuperUsuario.password);
        cy.get('button[type="submit"]').click();
    
        cy.get('button[id="mostrarNavBar"]').should('be.visible');

        cy.get('button[id="mostrarNavBar"]').click();
        cy.get('a[id="crearCliente"]').click();

        cy.get('form').should('be.visible');
        cy.wait(1000);

        cy.get('input[id="nombres"]').type(mockCliente.nombres, {force: true});
        cy.get('input[id="apellidos"]').type(mockCliente.apellidos, {force: true});
        cy.get('input[id="email"]').type(mockCliente.email, {force: true});
        cy.get('input[id="telefono"]').type(mockCliente.telefono, {force: true});
        cy.get('input[id="direccion"]').type(mockCliente.direccion, {force: true});

        cy.get('button[type="submit"]').should('be.enabled');
        cy.get('button[type="submit"]').click();
        cy.wait(1000);

    }); */

    it('Crea cliente con superadmin', () => {
        cy.request({
            method: 'POST',
            url: 'http://localhost:8003/usuario/register',
            body: {
                email: mockCliente.email,
                username: mockCliente.username,
                password: mockCliente.password,
                telefono: mockCliente.telefono,
                nombres: mockCliente.nombres,
                apellidos: mockCliente.apellidos,
                direccion: mockCliente.direccion,
                rol: mockCliente.rol
            }
        }).then((response) => {
            expect(response.status).to.eq(201);
            expect(response.body).to.have.property('id');
        });
    });

    it('Crear usuario', () => {
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

    it('Crear un incidente como gestor junior', () => {
        cy.get('input[id="email"]').type(mockGestorJunior.email);
        cy.get('input[id="password"]').clear({force: true});
        cy.get('input[id="password"]').type(mockGestorJunior.password);
        cy.get('button[type="submit"]').click();
        cy.get('button[id="mostrarNavBar"]').click();
        cy.get('a[id="crearIncidencia"]').click();

        cy.get('form').should('be.visible');
        cy.wait(1000);
        cy.get('select[id="cliente"]').select(mockIncidente.cliente, {force: true});
        cy.get('select[id="nombreUsuario"]').select(mockIncidente.nombreUsuario, {force: true});
        cy.get('input[id="correoUsuario"]').type(mockIncidente.correoUsuario, {force: true});
        cy.get('input[id="telefonoUsuario"]').type(mockIncidente.telefonoUsuario, {force: true});
        cy.get('input[id="direccionUsuario"]').type(mockIncidente.direccionUsuario, {force: true});
        cy.get('textarea[id="descripcionProblema"]').type(mockIncidente.descripcionProblema, {force: true});
        cy.get('select[id="tipoIncidencia"]').select(mockIncidente.tipoIncidencia, {force: true});
        cy.get('select[id="prioridad"]').select(mockIncidente.prioridad,{force: true});
        cy.get('select[id="estado"]').select(mockIncidente.estado, {force: true});

        cy.get('textarea[id="respuestaIA"]').should('have.value', mockRespuestaIA);
        cy.get('button[id="guardar"]').should('be.enabled');
        cy.get('button[id="escalar"]').should('be.enabled');

        cy.get('button[id="guardar"]').click();
        cy.wait(200);
        cy.get('.toast-success').should('be.visible').and('contain', 'Incidente creado correctamente');
        cy.get('.toast-success').invoke('text').then((toastText) => {
            const toastMessage = toastText;
            expect(toastMessage).to.contain('');
            const numbers = toastMessage.match(/\d+/g);
            cy.log('******* id '+ numbers);
            expect(numbers).to.not.be.null;
            if (numbers) {
                incidenteId = parseInt(numbers[0], 10);
            }
        });
    });

    it('Actualizar y escalar la incidencia', () => {
        cy.get('input[id="email"]').type(mockGestorJunior.email);
        cy.get('input[id="password"]').clear({force: true});
        cy.get('input[id="password"]').type(mockGestorJunior.password);
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
        cy.wait(1000);
        cy.get('select[id="cliente"]').select(mockIncidenteUpdate.cliente, {force: true});
        cy.get('select[id="nombreUsuario"]').select(mockIncidenteUpdate.nombreUsuario, {force: true});
        cy.get('select[id="tipoIncidencia"]').select(mockIncidenteUpdate.tipoIncidencia, {force: true});
        cy.get('select[id="prioridad"]').select(mockIncidenteUpdate.prioridad,{force: true});
        cy.get('select[id="estado"]').select(mockIncidenteUpdate.estado, {force: true});
        cy.get('textarea[id="nuevoComentario"]').type(mockIncidenteUpdate.comentario, {force: true});
        
        cy.get('button[id="guardar"]').should('be.enabled');
        cy.get('button[id="escalar"]').should('be.enabled');

        cy.get('button[id="escalar"]').click();
        cy.wait(200);
        cy.get('.toast-success').should('be.visible').and('contain', 'Actualización exitosa');
    });

    it('Actualizar la incidencia por el gestor mid', () => {
        cy.get('input[id="email"]').type(mockGestorMid.email);
        cy.get('input[id="password"]').clear({force: true});
        cy.get('input[id="password"]').type(mockGestorMid.password);
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
        cy.wait(1000);
        cy.get('select[id="cliente"]').select(mockIncidenteUpdate.cliente, {force: true});
        cy.get('select[id="nombreUsuario"]').select(mockIncidenteUpdate.nombreUsuario, {force: true});
        cy.get('select[id="tipoIncidencia"]').select(mockIncidenteUpdate2.tipoIncidencia, {force: true});
        cy.get('select[id="prioridad"]').select(mockIncidenteUpdate2.prioridad,{force: true});
        cy.get('select[id="estado"]').select(mockIncidenteUpdate2.estado, {force: true});
        cy.get('textarea[id="nuevoComentario"]').type(mockIncidenteUpdate2.comentario, {force: true});
        
        cy.get('button[id="guardar"]').should('be.enabled');
        cy.get('button[id="escalar"]').should('be.enabled');

        cy.get('button[id="guardar"]').click();
        cy.wait(200);
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
        cy.wait(1000);
        cy.get('select[id="cliente"]').should('contain', mockIncidenteUpdate2.cliente);
        cy.get('select[id="nombreUsuario"]').should('contain', mockIncidenteUpdate2.nombreUsuario);
        cy.get('select[id="tipoIncidencia"]').should('contain', mockIncidenteUpdate2.tipoIncidencia);
        cy.get('select[id="prioridad"]').should('contain', mockIncidenteUpdate2.prioridad,{force: true});
        cy.get('select[id="estado"]').should('contain', mockIncidenteUpdate2.estado); 
    });

    it('crear un comentario por un usuario', () => {
        cy.get('input[id="email"]').type(mockUsuario.email);
        cy.get('input[id="password"]').clear({force: true});
        cy.get('input[id="password"]').type(mockUsuario.password);
        cy.get('button[type="submit"]').click();
        
        // Click en el boton the "Ver/Editar" de la ultima tarjeta creada
        cy.get('div.card').last().within(() => {
            cy.get('button[id="verEditar"]').click();
        });
        cy.get('body').then($body => {
        if ($body.find('.toast-close-button').length > 0) {
            cy.get('.toast-close-button').click();
        }

        cy.get('form').should('be.visible');
        cy.wait(1000);

        cy.get('img[id="languageButton"]').click();

        //cy.get('h1="[id="formTitle"]').should('contain', 'Issue details');
        cy.get('label[id="clienteLabel"]').should('contain', 'Customer');
        cy.get('label[id="fechaLabel"]').should('contain', 'Creation datetime');
        cy.get('label[id="nombreUsuarioLabel"]').should('contain', 'User name');
        cy.get('label[id="mailLabel"').should('contain', 'User email');
        
        cy.get('textarea[id="nuevoComentario"]').type('Nuevo comentario', {force: true});

        cy.get('button[id="guardar"]').should('be.enabled');

        cy.get('button[id="guardar"]').click();
        cy.wait(200);
        cy.get('.toast-success').should('be.visible').and('contain', 'Actualización exitosa');

        // Click en el boton the "Ver/Editar" de la ultima tarjeta creada
        cy.get('div.card').last().within(() => {
            cy.get('button[id="verEditar"]').click();
        });
        cy.get('body').then($body => {
        if ($body.find('.toast-close-button').length > 0) {
            cy.get('.toast-close-button').click();
        }
        });

        cy

        cy.get('form').should('be.visible');
        cy.wait(1000);
        cy.get('textarea[id="comentarios"]').should('contain.value', 'Nuevo comentario');
        
        });
    });
});

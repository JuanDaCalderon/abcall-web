describe('Update Incidencia by usuario', () => {
    const mockCredencialsGestor = {
        email:'gestorjunior@gmail.com',
        password:'123456789'
    };

    const mockCredencialsUsuario = {
        email:'usuario1@gmail.com',
        password:'123456789'
    };
    
    const mockIncidente = { 
        cliente: 'cliente cliente',
        nombreUsuario: 'usuario usuario',
        correoUsuario: 'usuario1@pruebas',
        telefonoUsuario: '30012345678',
        direccionUsuario: 'calle 123',
        descripcionProblema: 'mi pc no conecta a internet',
        tipoIncidencia: 'incidencia',
        prioridad: 'alta',
        estado: 'cerrado',
        respuestaIA: 'respuesta generdada por IA'
    };

    const mockRespuestaIA = 'Por favor, intenta lo siguiente para resolver el problema de conexión: 1) Revisa que tu dispositivo esté conectado a internet; 2) Reinicia tu router o punto de acceso; 3) Verifica que no haya restricciones de red en tu firewall o antivirus. Si el problema persiste, contáctanos para mayor asistencia.';

    it('login as gestor', () => {
        cy.visit('/login'); 
        cy.get('input[id="email"]').type(mockCredencialsGestor.email);
        cy.get('input[id="password"]').type(mockCredencialsGestor.password);
        cy.get('button[type="submit"]').click();
    

        //------ Crear Incidencia
        cy.get('button[id="mostrarNavBar"]').click();
        cy.get('a[id="crearIncidencia"]').click();
        
        cy.contains('Prioridad').should('be.visible');

        cy.get('form').should('be.visible');
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
        cy.get('.toast-success').should('be.visible').and('contain', 'Incidente creado correctamente');
    });

    it('login as user', () => {
        cy.visit('/login'); 
        cy.get('input[id="email"]').type(mockCredencialsUsuario.email);
        cy.get('input[id="password"]').type(mockCredencialsUsuario.password);
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
        cy.get('textarea[id="nuevoComentario"]').type('Nuevo comentario', {force: true});

        cy.get('button[id="guardar"]').should('be.enabled');

        cy.get('button[id="guardar"]').click();
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

        cy.get('form').should('be.visible');
        cy.get('textarea[id="comentarios"]').should('contain.value', 'Nuevo comentario');
    });
});

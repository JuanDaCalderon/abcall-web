describe('Updateng se Incidencia', () => {
    const mockCredencials = {
        email:'superadmin@gmail.com',
        password:'123456789'
    };
    
    const mockIncidente = {
        cliente: 'cliente cliente',
        nombreUsuario: 'usuario usuario',
        correoUsuario: 'prueba@pruebas',
        telefonoUsuario: '30012345678',
        direccionUsuario: 'calle 123',
        descripcionProblema: 'problema con la tarjeta',
        tipoIncidencia: 'incidencia',
        prioridad: 'baja',
        estado: 'abierto',
        respuestaIA: 'respuesta generdada por IA'
    };

    beforeEach(() => {
        cy.viewport(1024, 768);
        cy.visit('/login'); 
        cy.get('input[id="email"]').type(mockCredencials.email);
        cy.get('input[id="password"]').type(mockCredencials.password);
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

        cy.get('textarea[id="respuestaIA"]').should('have.value', 'Respuesta generdada por IA');
        cy.get('button[id="guardar"]').should('be.enabled');
        cy.get('button[id="escalar"]').should('be.enabled');

        cy.get('button[id="guardar"]').click();
        cy.get('.toast-success').should('be.visible').and('contain', 'Incidente creado correctamente');
        
        //------ Ir a ver Incidencia
        cy.get('button[id="mostrarNavBar"]').click();
        cy.get('a[id="home"]').click();

        // Click en el boton the "Ver/Editar" de la ultima tarjeta creada
        cy.get('div.card').last().within(() => {
            cy.get('button[id="verEditar"]').click();
        });

    });

    it('should display the incident details', () => {
        cy.get('form').should('be.visible');
        cy.get('select[id="cliente"]').should('contain', mockIncidente.cliente);
        cy.get('select[id="nombreUsuario"]').should('contain', mockIncidente.nombreUsuario);
        cy.get('input[id="correoUsuario"]').should('have.value', mockIncidente.correoUsuario);
        cy.get('input[id="telefonoUsuario"]').should('have.value', mockIncidente.telefonoUsuario);
        cy.get('input[id="direccionUsuario"]').should('have.value', mockIncidente.direccionUsuario);
        cy.get('textarea[id="descripcionProblema"]').should('have.value', mockIncidente.descripcionProblema);
        cy.get('select[id="tipoIncidencia"]').should('contain', mockIncidente.tipoIncidencia);
        cy.get('select[id="prioridad"]').should('contain', mockIncidente.prioridad,{force: true});
        cy.get('select[id="estado"]').should('contain', mockIncidente.estado);
    
        
    
    });

    

 /*   it('should display a success message when incident is updated', () => {
        cy.intercept('POST', '/api/incidentes/1', {
            statusCode: 200,
            body: { message: 'Incidente actualizado correctamente' }
        }).as('updateIncident');

        cy.get('[data-cy=update-button]').click();
        cy.wait('@updateIncident');

        cy.get('.toast-success').should('contain', 'Incidente actualizado correctamente');
    });

    it('should display an error message when incident update fails', () => {
        cy.intercept('POST', '/api/incidentes/1', {
            statusCode: 500,
            body: { message: 'Error al actualizar el incidente' }
        }).as('updateIncidentFail');

        cy.get('[data-cy=update-button]').click();
        cy.wait('@updateIncidentFail');

        cy.get('.toast-error').should('contain', 'Error al actualizar el incidente');
    });

    it('should navigate to the edit page when edit button is clicked', () => {
        cy.get('[data-cy=edit-button]').click();
        cy.url().should('include', '/editar-incidencia/1');
    });

*/
});
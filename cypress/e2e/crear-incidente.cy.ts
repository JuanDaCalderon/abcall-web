describe('Crear Incidente', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it('should display the crear incidente form', () => {
        cy.get('form').should('be.visible');
    });

    it('should create an incident successfully', () => {
        cy.get('select[id="cliente"]').select('Bancolombia');
        cy.get('input[id="nombreUsuario"]').type('Test User');
        cy.get('input[id="correoUsuario"]').type('prueba@prueba.com');
        cy.get('input[id="direccionUsuario"]').type('Test address');
        cy.get('input[id="telefonoUsuario"]').type('123456789');
        cy.get('textarea[id="descripcionProblema"]').type('Test description');
        cy.get('select[id="tipoIncidencia"]').select('Incidencia');
        cy.get('select[id="prioridad"]').select('Alta');
        cy.get('select[id="estado"]').select('Abierto');
        cy.get('textarea[id="respuestaIA"]').type('Test response');

        cy.get('button[id="guardar"]').click();

        //cy.wait('').its('response.statusCode').should('eq', 201);
        //cy.get('.success-message').should('contain', 'Incidente creado con éxito');
        cy.contains('Incidente creado con éxito');
    });

    /*it('should show validation errors', () => {
        cy.get('button[type="submit"]').click();
        cy.get('.error-message').should('contain', 'Este campo es obligatorio');
    });*/
});
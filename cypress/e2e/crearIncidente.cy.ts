describe('CrearIncidenciasComponent E2E Tests', () => {
    beforeEach(() => {
        cy.visit('/'); 
    });

    it('should display the crearIncidencias form', () => {
        cy.get('form').should('be.visible');
        cy.get('select[id="cliente"]').should('be.visible');
        cy.get('input[id="fecha"]').should('be.visible');
        cy.get('input[id="nombreUsuario"]').should('be.visible');
        cy.get('input[id="correoUsuario"]').should('be.visible');
        cy.get('input[id="telefonoUsuario"]').should('be.visible');
        cy.get('input[id="direccionUsuario"]').should('be.visible');
        cy.get('textarea[id="descripcionProblema"]').should('be.visible');
        cy.get('select[id="tipoIncidencia"]').should('be.visible');
        cy.get('select[id="canalIngreso"]').should('be.visible');
        cy.get('select[id="prioridad"]').should('be.visible');
        cy.get('select[id="estado"]').should('be.visible');
        cy.get('textarea[id="respuestaIA"]').should('be.visible');
        cy.get('button[id="guardar"]').should('be.visible');
        cy.get('button[id="escalar"]').should('be.visible');
    });

    it('should enable guardar and escalar buttons', () => {
        cy.get('form').should('be.visible');
        cy.get('select[id="cliente"]').select('Bancolombia');
        cy.get('input[id="nombreUsuario"]').type('Juan Perez');
        cy.get('input[id="correoUsuario"]').type('prueba@prueba.com');
        cy.get('input[id="telefonoUsuario"]').type('3006155372');
        cy.get('input[id="direccionUsuario"]').type('Calle 123');
        cy.get('textarea[id="descripcionProblema"]').type('Problema con la tarjeta');
        cy.get('select[id="tipoIncidencia"]').select('Incidencia');
        cy.get('select[id="prioridad"]').select('Baja');
        cy.get('select[id="estado"]').select('Abierto');

        cy.get('textarea[id="respuestaIA"]').should('have.value', 'Respuesta generdada por IA');
        cy.get('button[id="guardar"]').should('be.enabled');
        cy.get('button[id="escalar"]').should('be.enabled');
    });

    it('should show usuario required message', () => {
        cy.get('input[id="nombreUsuario"]').type('Juan Perez');
        cy.get('input[id="nombreUsuario"]').clear();
        cy.get('input[id="correoUsuario"]').type('prueba@prueba.com');
        
        cy.get('div[id="usuarioRequiredError"').should('contain', 'Nombre usuario requerido');

    });

    it('should show mail required message', () => {
        cy.get('input[id="correoUsuario"]').type('prueba');
        cy.get('input[id="nombreUsuario"]').type('Juan Perez');
        
        cy.get('div[id="mailFormatError"').should('contain', 'Formato de correo inválido');
    });

    it('should show descripcion required message', () => {    
        cy.get('textarea[id="descripcionProblema"]').type('prueba');
        cy.get('textarea[id="descripcionProblema"]').clear();
        cy.get('input[id="nombreUsuario"]').type('Juan Perez');
        
        cy.get('div[id="descripcionRequiredError"').should('contain', 'Descripción del problema requerido');
    });
});
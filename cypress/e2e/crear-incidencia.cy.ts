describe('CrearIncidenciasComponent E2E Tests', () => {
    beforeEach(() => {
        cy.viewport(1024, 768);
        cy.visit('/login'); 
        cy.get('input[id="email"]').type('pepito@gmail.com');
        cy.get('input[id="password"]').type('123456789');
        cy.get('button[type="submit"]').click();
        cy.get('button[id="mostrarNavBar"]').click();
        cy.get('a[id="crearIncidencia"]').click();

        cy.contains('Prioridad').should('be.visible');
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

    it('should create', () => {
        cy.get('form').should('be.visible');
        cy.get('select[id="cliente"]').select('Bancolombia', {force: true});
        cy.get('input[id="nombreUsuario"]').type('Juan Perez', {force: true});
        cy.get('input[id="correoUsuario"]').type('prueba@prueba.com', {force: true});
        cy.get('input[id="telefonoUsuario"]').type('3006155372', {force: true});
        cy.get('input[id="direccionUsuario"]').type('Calle 123', {force: true});
        cy.get('textarea[id="descripcionProblema"]').type('Problema con la tarjeta', {force: true});
        cy.get('select[id="tipoIncidencia"]').select('Incidencia', {force: true});
        cy.get('select[id="prioridad"]').select('Baja',{force: true});
        cy.get('select[id="estado"]').select('Abierto', {force: true});

        cy.get('textarea[id="respuestaIA"]').should('have.value', 'Respuesta generdada por IA');
        cy.get('button[id="guardar"]').should('be.enabled');
        cy.get('button[id="escalar"]').should('be.enabled');
    });

    it('should create an issue', () => {
        cy.get('form').should('be.visible');
        cy.get('select[id="cliente"]').select('Bancolombia', {force: true});
        cy.get('input[id="nombreUsuario"]').type('Juan Perez', {force: true});
        cy.get('input[id="correoUsuario"]').type('prueba@prueba.com', {force: true});
        cy.get('input[id="telefonoUsuario"]').type('3006155372', {force: true});
        cy.get('input[id="direccionUsuario"]').type('Calle 123', {force: true});
        cy.get('textarea[id="descripcionProblema"]').type('Problema con la tarjeta', {force: true});
        cy.get('select[id="tipoIncidencia"]').select('Incidencia', {force: true});
        cy.get('select[id="prioridad"]').select('Baja',{force: true});
        cy.get('select[id="estado"]').select('Abierto', {force: true});

        cy.get('textarea[id="respuestaIA"]').should('have.value', 'Respuesta generdada por IA');
        cy.get('button[id="guardar"]').should('be.enabled');
        cy.get('button[id="escalar"]').should('be.enabled');

        cy.get('button[id="guardar"]').click();
        cy.get('.toast-success').should('be.visible').and('contain', 'Incidente creado correctamente');
    });

    it('should escalate an issue', () => {
        cy.get('form').should('be.visible');
        cy.get('select[id="cliente"]').select('Bancolombia', {force: true});
        cy.get('input[id="nombreUsuario"]').type('Juan Perez', {force: true});
        cy.get('input[id="correoUsuario"]').type('prueba@prueba.com', {force: true});
        cy.get('input[id="telefonoUsuario"]').type('3006155372', {force: true});
        cy.get('input[id="direccionUsuario"]').type('Calle 123', {force: true});
        cy.get('textarea[id="descripcionProblema"]').type('Problema con la tarjeta', {force: true});
        cy.get('select[id="tipoIncidencia"]').select('Incidencia', {force: true});
        cy.get('select[id="prioridad"]').select('Baja',{force: true});
        cy.get('select[id="estado"]').select('Abierto', {force: true});

        cy.get('textarea[id="respuestaIA"]').should('have.value', 'Respuesta generdada por IA');
        cy.get('button[id="guardar"]').should('be.enabled');
        cy.get('button[id="escalar"]').should('be.enabled');

        cy.get('button[id="escalar"]').click();
        cy.get('.toast-success').should('be.visible').and('contain', 'Incidente escalado correctamente');
    });

    it('should show usuario required message', () => {
        cy.get('input[id="nombreUsuario"]').type('Juan Perez', {force: true});
        cy.get('input[id="nombreUsuario"]').clear({force: true});
        cy.get('input[id="correoUsuario"]').type('prueba@prueba.com', {force: true});
        
        cy.get('div[id="usuarioRequiredError"').should('contain', 'Nombre usuario requerido');

    });

    it('should show mail required message', () => {
        cy.get('input[id="correoUsuario"]').type('prueba', {force: true});
        cy.get('input[id="nombreUsuario"]').type('Juan Perez', {force: true});
        
        cy.get('div[id="mailFormatError"').should('contain', 'Formato de correo inválido');
    });

    it('should show descripcion required message', () => {    
        cy.get('textarea[id="descripcionProblema"]').type('prueba', {force: true});
        cy.get('textarea[id="descripcionProblema"]').clear({force: true});
        cy.get('input[id="nombreUsuario"]').type('Juan Perez', {force: true});
        
        cy.get('div[id="descripcionRequiredError"').should('contain', 'Descripción del problema requerido');
    });
});
describe('LoginComponent E2E Tests', () => {
    beforeEach(() => {
        cy.visit('/login'); // Adjust the URL according to your routing configuration
    });

    it('should display the login form', () => {
        cy.get('form').should('be.visible');
        cy.get('input[id="email"]').should('be.visible');
        cy.get('input[id="password"]').should('be.visible');
        cy.get('button[type="submit"]').should('be.visible');
    });

    it('should initialize the form with empty fields', () => {
        cy.get('input[id="email"]').should('have.value', '');
        cy.get('input[id="password"]').should('have.value', '');
    });

    it('should display error message on login failure', () => {
        cy.intercept('POST', '/api/auth/login', {
            statusCode: 401,
            body: { error: { message: 'Datos de usuario incorrectos' } },
        }).as('loginRequest');

        cy.get('input[id="email"]').type('test@test.com');
        cy.get('input[id="password"]').type('password123');
        cy.get('button[type="submit"]').click();

       //cy.wait('@loginRequest');
        cy.get('div[id="authFlag"]').should('contain', 'Datos de usuario incorrectos');
    });

    /*fit('should display success message on login success', () => {
        cy.intercept('POST', '/api/auth/login', {
            statusCode: 200,
            body: {
                token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imp1YW5kYWNhbGppQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoiYmVkYW1va2EiLCJleHAiOjE3Mjg3MDE4NDV9.8AweMAcU5LCvA7TzPRf5kRJgHCRgrTEEfEC_gg4Ml7c',
            },
        }).as('loginRequest');

        cy.get('input[id="email"]').type('test@test.com');
        cy.get('input[id="password"]').type('password123');
        cy.get('button[type="submit"]').click();

        //cy.wait('@loginRequest');
        cy.get('div[id="authFlag"]').should('contain', 'Has iniciado sesión correctamente');
    });*/

    it('should validate email field as required and email format', () => {
        cy.get('input[id="email"]').focus().blur();
        cy.get('div[id="emailRequired"]').should('contain', 'El correo es obligatorio');

        cy.get('input[id="email"]').type('invalid-email').blur();
        cy.get('div[id="emailFormatError"]').should('contain', 'El correo debe tener formato de email');
    });

    it('should validate password field as required and minimum length', () => {
        cy.get('input[id="password"]').focus().blur();
        cy.get('.passwordRequired').should('contain', 'Password is required');

        cy.get('input[id="passwordMinLength"]').type('short').blur();
        cy.get('.password-error').should('contain', 'Password must be at least 6 characters');
    });

    it('should change language when changeLang is called', () => {
        cy.get('.language-selector').select('en');
        cy.get('html').should('have.attr', 'lang', 'en');
    });
});
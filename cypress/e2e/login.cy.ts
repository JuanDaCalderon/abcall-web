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
        cy.get('div[id="authFlagError"]').should('contain', 'Datos de usuario incorrectos');
    });

   
    it('should validate email field as required and email format', () => {
        cy.get('input[id="email"]').focus().blur();
        cy.get('div[id="emailRequired"]').should('contain', 'El correo es obligatorio');

        cy.get('input[id="email"]').type('invalid-email').blur();
        cy.get('div[id="emailFormatError"]').should('contain', 'El correo debe tener formato de email');
    });

    it('should validate password field as required and minimum length', () => {
        cy.get('input[id="password"]').focus().blur();
        cy.get('div[id="passwordRequired"]').should('contain', 'La contraseña es obligatoria');

        cy.get('input[id="password"]').type('short').blur();
        cy.get('div[id="passwordMinLength"]').should('contain', 'La contraseña debe tener al menos 8 caracteres');
    });

    it('should change language when changeLang is called', () => {
        cy.get('img[id="languageButton"]').click();
        cy.get('label[id="emailLabel"]').should('contain', 'Email');
        cy.get('label[id="passwordLabel"]').should('contain', 'Password');
        cy.get('button[type="submit"]').should('contain', 'Login');
    });

    //--------

    it('should display error message on login failure in english', () => {
        cy.get('img[id="languageButton"]').click();
        cy.intercept('POST', '/api/auth/login', {
            statusCode: 401,
            body: { error: { message: 'Datos de usuario incorrectos' } },
        }).as('loginRequest');

        cy.get('input[id="email"]').type('test@test.com');
        cy.get('input[id="password"]').type('password123');
        cy.get('button[type="submit"]').click();

       //cy.wait('@loginRequest');
        cy.get('div[id="authFlagError"]').should('contain', 'Incorrect user data');
    });

    it('should validate email field as required and email format in english', () => {
        cy.get('img[id="languageButton"]').click();
        cy.get('input[id="email"]').focus().blur();
        cy.get('div[id="emailRequired"]').should('contain', 'Email is required');

        cy.get('input[id="email"]').type('invalid-email').blur();
        cy.get('div[id="emailFormatError"]').should('contain', 'The email must be in email format');
    });

    it('should validate password field as required and minimum length in english', () => {
        cy.get('img[id="languageButton"]').click();
        cy.get('input[id="password"]').focus().blur();
        cy.get('div[id="passwordRequired"]').should('contain', 'Password is required');

        cy.get('input[id="password"]').type('short').blur();
        cy.get('div[id="passwordMinLength"]').should('contain', 'Password must be at least 8 characters long');
    });
});
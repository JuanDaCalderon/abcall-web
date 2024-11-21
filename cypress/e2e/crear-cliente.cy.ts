describe('Crear cliente', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.get('form').should('be.visible');
    const emailInput = cy.get('[data-cy="email-input"]');
    const passwordInput = cy.get('[data-cy="password-input"]');
    emailInput.click();
    emailInput.type('superadmin@gmail.com');
    passwordInput.click();
    passwordInput.type('123456789');
    const submitButton = cy.get('[data-cy="submit-button"]');
    submitButton.click();
    cy.get('button[id="mostrarNavBar"]').click();
    cy.get('a[id="crearCliente"]').click();
    cy.wait(1000);
  });

  it('should display the crearCliente form', () => {
    cy.get('form').should('be.visible');
    cy.get('input[id="nombres"]').should('be.visible');
    cy.get('input[id="apellidos"]').should('be.visible');
    cy.get('input[id="email"]').should('be.visible');
    cy.get('input[id="telefono"]').should('be.visible');
    cy.get('input[id="direccion"]').should('be.visible');
  });

  it('should create', () => {
    cy.get('form').should('be.visible');
    cy.get('input[id="nombres"]').type('pepito', {force: true});
    cy.get('input[id="apellidos"]').type('perez', {force: true});
    cy.get('input[id="email"]').type('pepio@perez.com', {force: true});
    cy.get('input[id="telefono"]').type('9856321478', {force: true});
    cy.get('input[id="direccion"]').type('calle siempre viva #89-25', {force: true});
    cy.get('button[id="guardar"]').should('be.enabled');
  });

  it('should create an issue', () => {
    cy.get('form').should('be.visible');
    cy.get('input[id="nombres"]').type('pepito', {force: true});
    cy.get('input[id="apellidos"]').type('perez', {force: true});
    cy.get('input[id="email"]').type('pepio@perez.com', {force: true});
    cy.get('input[id="telefono"]').type('9856321478', {force: true});
    cy.get('input[id="direccion"]').type('calle siempre viva #89-25', {force: true});
    cy.get('button[id="guardar"]').should('be.enabled');
    cy.get('button[id="guardar"]').click();
  });
});

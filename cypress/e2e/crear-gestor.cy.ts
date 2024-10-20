describe('Crear Gestor', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Prueba crear gestor', () => {
    cy.get('form').should('be.visible');
    const emailInput = cy.get('[data-cy="email-input"]');
    const passwordInput = cy.get('[data-cy="password-input"]');
    emailInput.click();
    emailInput.type('admin@gmail.com');
    passwordInput.click();
    passwordInput.type('123456789');
    const submitButton = cy.get('[data-cy="submit-button"]');
    submitButton.click();

    /* const usernameInput = cy.get('[data-cy="username-input"]');
    const telefonoInput = cy.get('[data-cy="telefono-input"]');
    const nombreInput = cy.get('[data-cy="nombres-input"]');
    const apellidosdInput = cy.get('[data-cy="apellidos-input"]');
    const direccionInput = cy.get('[data-cy="direccion-input"]');
    const gestorInput = cy.get('[data-cy="gestortier-input"]');
    const submitButton = cy.get('[data-cy="submit-button"]'); */

    /* cy.contains('Incidente creado con éxito'); */
  });
});

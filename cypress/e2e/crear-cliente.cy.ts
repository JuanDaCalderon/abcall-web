describe('Crear cliente', () => {
    beforeEach(() => {
      cy.visit('/');
    });
  
    it('Prueba crear cliente', () => {
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
  });
  
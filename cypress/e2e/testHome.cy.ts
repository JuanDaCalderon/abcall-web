describe('navbar test abcall', () => {
  it('prueba', () => {
    cy.visit('/home');
    cy.get('[data-cy="accordion-btn-1"]').click();
    expect(2).to.equal(2);
  });
});

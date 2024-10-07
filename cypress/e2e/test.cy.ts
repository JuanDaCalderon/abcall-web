describe('prueba test abcall', () => {
  it('prueba', () => {
    cy.visit('/');
    cy.get('[data-cy="accordion-btn-1"]').click();
    expect(2).to.equal(2);
  });
});

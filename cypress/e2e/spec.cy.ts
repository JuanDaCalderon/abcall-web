/*describe('My First Test', () => {
  /*it('Visits the initial project page', () => {
    cy.visit('/')
    cy.contains('app is running')
    })
  
  })
})*/

describe('Prueba Login', () => {
  beforeEach(() => {
    cy.visit('/')
  })
  
  it('Muestra formulario login en español', () => {
    cy.contains('Correo electronico')
    cy.contains('Contraseña')
  })

  it('LLenar campos con credenciakes invalida', () => {
    cy.get('input[id="email"]').type('prueba1@prueba.com')
    cy.get('input[id="password"]').type('123456789')
    cy.get('button[id="guardar"]').click()
    cy.contains('Datos de usuario incorrectos')
    
  })

  it('Llenar campos con correo en formato invalido y contraseña menor a 8 caracteres', () => {
    cy.get('input[id="email"]').type('aa')
    cy.get('input[id="password"]').type('123')
    cy.contains('Formato correo invalido')
    cy.contains('Contraseña menos 8 caracteres')
  })

  it('Llenar campos con correo en formato invalido y contraseña menor a 8 caracteres', () => {
    cy.get('input[id="email"]'). type('aa')
    cy.get('input[id="password"]').type('123')
    cy.get('input[id="email"]').clear()
    cy.get('input[id="password"]').clear()
    cy.contains('Correo requerido')
    cy.contains('Contraseña requerida')
  })
})
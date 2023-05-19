/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', () => {

  beforeEach(() => {
    cy.visit('src/index.html')
  })

  it('Verifica o título da aplicação', () => {
    cy.title().should('equal', 'Central de Atendimento ao Cliente TAT')
  })

  it('Preenche os campos obrigatórios e envia o formulário', () => {
    cy.get('#firstName').type('Fulano')
    cy.get('#lastName').type('da Silva')
    cy.get('#email').type('fulano@email.com')
    cy.get('#open-text-area').type('Hello World', {delay: 0})
    cy.get('button[type="submit"]').click()

    cy.get('span.success').should('be.visible')
  })

  it('Exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
    cy.get('#firstName').type('Fulano')
    cy.get('#lastName').type('da Silva')
    cy.get('#email').type('fulano@email,com')
    cy.get('#open-text-area').type('Teste')
    cy.get('button[type="submit"]').click()

    cy.get('span.error').should('be.visible')
  })

  it('Campo telefone continua vazio quando preenchido com valor não-numérico', () => {
    cy.get('#phone').type('abc').should('be.empty')
  })

  it('Exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
    cy.get('#firstName').type('Fulano')
    cy.get('#lastName').type('da Silva')
    cy.get('#email').type('fulano@email,com')
    cy.get('#phone-checkbox').click()
    cy.get('#open-text-area').type('Teste')
    cy.get('button[type="submit"]').click()

    cy.get('span.error').should('be.visible')
  })

  it.only('Preenche e limpa os campos nome, sobrenome, email e telefone', () => {
    cy.get('#firstName').type('Fulano').should('have.value', 'Fulano')
    cy.get('#lastName').type('da Silva').should('have.value', 'da Silva')
    cy.get('#email').type('fulano@email.com').should('have.value', 'fulano@email.com')
    cy.get('#phone-checkbox').click()
    cy.get('#phone').type('123456789').should('have.value', '123456789')
    cy.get('#open-text-area').type('Teste').should('have.value', 'Teste')

    cy.get('#firstName').clear().should('have.value', '')
    cy.get('#lastName').clear().should('have.value', '')
    cy.get('#email').clear().should('have.value', '')
    cy.get('#phone').clear().should('have.value', '')
    cy.get('#open-text-area').clear().should('have.value', '')
  })
})

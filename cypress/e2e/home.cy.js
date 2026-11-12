beforeEach(() => {
  cy.visit('/')
})

it('should have a heading', () => {
  cy.get('header').should('be.visible')
})

it('starts with an empty poke container', () => {
  cy.get('#poke-container').children().should('have.length', 0)
})

it('should render a Pokemon card for the user\'s search', () => {
  cy.get('input[id=pokemon-name]').type('Bulbasaur')
  cy.get('button[type=submit]').click()
  cy.get('#bulbasaur-card').should('be.visible')
  cy.get('#bulbasaur-card img').should('have.attr', 'alt', 'bulbasaur')
  cy.get('#bulbasaur-card img').should('have.attr', 'src').and('not.include', 'shiny')
})

it('should render MULTIPLE Pokemon cards', () => {
  cy.get('input[id=pokemon-name]').type('Bulbasaur{enter}')
  cy.get('input[id=pokemon-name]').type('Charizard{enter}')
  cy.get('#bulbasaur-card').should('be.visible')
  cy.get('#charizard-card').should('be.visible')
})

it('clears the input after a search', () => {
  cy.get('input[id=pokemon-name]').type('Bulbasaur{enter}')
  cy.get('input[id=pokemon-name]').should('have.value', '')
})

it('does nothing on an empty search', () => {
  const alerts = []
  cy.on('window:alert', (text) => alerts.push(text))
  cy.get('button[type=submit]').click()
  cy.wait(1000)
  cy.wrap(alerts).should('have.length', 0)
})

it('does not add the same Pokemon twice', () => {
  cy.get('input[id=pokemon-name]').type('Bulbasaur{enter}')
  cy.get('#bulbasaur-card').should('be.visible')
  cy.get('input[id=pokemon-name]').type('Bulbasaur{enter}')
  cy.get('input[id=pokemon-name]').type('Charizard{enter}')
  cy.get('#charizard-card').should('be.visible')
  cy.get('[id="bulbasaur-card"]').should('have.length', 1)
})

// it('alerts when a Pokemon does not exist', () => {
//   let alerts = []
//   cy.on('window:alert', (text) => alerts.push(text))
 
//   cy.get('input[id=pokemon-name]').type('pikachoo{enter}')
//   cy.wait(1000)
//   cy.wrap(alerts).should('have.length', 1)
// })

it('changes the title when you click Change Title', () => {
  cy.get('header button').click()
  cy.get('header h1').should('have.text', 'Pokemon Project: Day 2')
})

it('counts clicks', () => {
  cy.contains('button', 'Click me!').click().click()
  cy.contains('Total Clicks: 2')
})
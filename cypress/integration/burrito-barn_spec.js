describe('Burrito builder', () => {
  beforeEach(() => {
    cy.fixture('allBurritosGoToHeaven').then(data => {
      cy.intercept('http://localhost:3001/api/v1/orders', {
        statusCode: 200,
        body: data
      })
    })
    cy.visit('http://localhost:3000/')
  });

  it('Should have a header', () => {
    cy.get('h1').contains('Burrito Builder')
  });

  it('Should display the current orders on page load', () => {
    cy.get('section > div').eq(0).contains('Shelly')
      .get('section > div').eq(0).contains('beans')
      .get('section > div').eq(0).contains('fresco')
      .get('section > div').eq(0).contains('jalapeno')

    cy.get('section > div').eq(2).contains('Log lady')
  });

  it('Should be able to type into a form', () => {
    cy.get('input').type('Cthulhu')
      .get('input').should('have.value', 'Cthulhu')
  })

  it('Should see current select ingredients on the page', () => {
    cy.get('button[name="beans"').click()
      .get('button[name="sour cream"').click()
      .get('p').contains('beans, sour cream')
  })

  it("Should be able to submit an order", () => {
    cy.intercept('POST','http://localhost:3001/api/v1/orders',
      {
        status: 201,
        body: {
          name: "Cthulhu",
          ingredients: ["beans", "sour cream"]
        }
      }
      )
      .fixture('allBurritosGoToHeaven').then(data => {
        cy.intercept('http://localhost:3001/api/v1/orders', {
          statusCode: 200,
          body: { "orders":[...data.orders, {
            "id": 3,
            "name": "Cthulhu",
            "ingredients": ["beans", "sour cream"]
          }]}
        })
      })
      .get('input').type('Cthulhu')
      .get('button[name="beans"').click()
      .get('button[name="sour cream"').click()
      .get('.submit').click()
      .get('section > div').eq(3).contains('Cthulhu')
  });
})
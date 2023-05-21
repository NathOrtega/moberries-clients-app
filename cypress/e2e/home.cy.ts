describe('Given user visits the home page for the first time', () => {
  it('Should be able to see an initial table with 4 clients', () => {
    cy.visit('/')
    cy.get('[data-cy=clientsTable]').find("tbody > tr").should("have.length", 4)
  })
})

describe('Given user wants to create a new user and filled the form', () => {
  it('Should be able to create a new user', () => {
    cy.visit('/')
    cy.get('[data-cy=createButton]').click()
    cy.get('[data-cy=createClientModal]').should("exist")
    cy.get('[data-cy=createForm]').should("be.visible")
    cy.get('[data-cy=saveClient]').should("be.disabled")
    cy.get('[data-cy=nameInput]').type(" ")
    cy.get('[data-cy=nameError]').should("be.visible")
    cy.get('[data-cy=nameInput]').type("John Doe")
    cy.get('[data-cy=nameError]').should("not.be.visible")
    cy.get('[data-cy=emailInput]').type("john")
    cy.get('[data-cy=emailError]').should("be.visible")
    cy.get('[data-cy=emailInput]').clear()
    cy.get('[data-cy=emailInput]').type("john@doe.com")
    cy.get('[data-cy=emailError]').should("not.be.visible")
    cy.get('[data-cy=dateOfBirthInput]').type("1984-06-17")
    cy.get('[data-cy=statusSelect]').select("Active")
    cy.get('[data-cy=saveClient]').should("be.enabled").click()
    cy.get('[data-cy=createClientModal]').should("not.exist")
    cy.get('[data-cy=createForm]').should("not.exist")
    cy.get('[data-cy=clientsTable]').find("tbody > tr").should("have.length", 5)
  })
})

describe('Given user wants to create a user but regrets and cancel creation', () => {
  it('Should not see any change on the table nor in the form', () => {
    cy.visit('/')
    cy.get('[data-cy=createButton]').click()
    cy.get('[data-cy=createClientModal]').should("exist")
    cy.get('[data-cy=createForm]').should("be.visible")
    cy.get('[data-cy=saveClient]').should("be.disabled")
    cy.get('[data-cy=nameInput]').type("John Doe")
    cy.get('[data-cy=cancelCreate]').click()
    cy.get('[data-cy=createClientModal]').should("not.exist")
    cy.get('[data-cy=clientsTable]').find("tbody > tr").should("have.length", 4)
    cy.get('[data-cy=createButton]').click()
    cy.get('[data-cy=createClientModal]').should("exist")
    cy.get('[data-cy=nameInput]').should("have.value", "")
  })
})

describe('Given user wants to delete a user', () => {
  it('Should not see the user on the table after clicking the delete button', () => {
    cy.visit('/')
    const userToDelete = "charlotte@email.com"
    cy.get(`[data-cy="deleteButton-${userToDelete}"]`).should("exist").should("be.enabled").click()
    cy.get(`[data-cy="deleteButton-${userToDelete}"]`).should("not.exist")
    cy.get(`[data-cy="tableRow-${userToDelete}"]`).should("not.exist")
  })
})

describe('Given user wants to edit a user', () => {
  it('Should see the changes on the table after saving the form', () => {
    cy.visit('/')
    const userToEdit = "charlotte@email.com"
    const newUser = "john@email.com"
    cy.get(`[data-cy="editButton-${userToEdit}"]`).should("exist").should("be.enabled").click()
    cy.get('[data-cy=editClientModal]').should("exist")
    cy.get('[data-cy=editForm]').should("be.visible")
    cy.get('[data-cy=saveClient]').should("be.enabled")
    cy.get('[data-cy=nameInput]').clear()
    cy.get('[data-cy=nameInput]').type("John")
    cy.get('[data-cy=emailInput]').clear()
    cy.get('[data-cy=emailInput]').type(newUser)
    cy.get('[data-cy=dateOfBirthInput]').clear()
    cy.get('[data-cy=dateOfBirthInput]').type("1998-11-03")
    cy.get('[data-cy=statusSelect]').select("Pending")
    cy.get('[data-cy=saveClient]').should("be.enabled").click()
    cy.get('[data-cy=createClientModal]').should("not.exist")
    cy.get('[data-cy=createForm]').should("not.exist")
    cy.get(`[data-cy="editButton-${userToEdit}"]`).should("not.exist")
    cy.get(`[data-cy="editButton-${newUser}"]`).should("exist")
  })
})

describe('Given user wants to sort by name in alphabetical order', () => {
  it('Should see the table in alphabetical order if it was not ordered before, or should see it in the original order if it was already sorted', () => {
    cy.visit("/")
    const initialFirstUser = "Charlotte"
    const sortedFirstUser = "Alina"
    cy.get("[data-cy=clientsTable]").find("tr").eq(1).find("[data-cy=clientName]").should("contain", `Name ${initialFirstUser}`)
    cy.get("[data-cy=sort").should("exist").should("be.enabled").click()
    cy.get("[data-cy=clientsTable]").find("tr").eq(1).find("[data-cy=clientName]").should("contain", `Name ${sortedFirstUser}`)
    cy.get("[data-cy=sort").should("exist").should("be.enabled").click()
    cy.get("[data-cy=clientsTable]").find("tr").eq(1).find("[data-cy=clientName]").should("contain", `Name ${initialFirstUser}`)
  })
})

describe('Given user wants to filter by email', () => {
  it('Should see the table with just two clients which email contains the given input', () => {
    const filteredClient1 = "Dominic"
    const filteredClient2 = "Benedict"
    cy.visit("/")
    cy.get('[data-cy=filterInput]').type("ic")
    cy.get('[data-cy=clientsTable]').find("tbody > tr").should("have.length", 2)
    cy.get("[data-cy=clientsTable]").find("tr").eq(1).find("[data-cy=clientName]").should("contain", `Name ${filteredClient1}`)
    cy.get("[data-cy=clientsTable]").find("tr").eq(2).find("[data-cy=clientName]").should("contain", `Name ${filteredClient2}`)
    cy.get('[data-cy=filterInput]').clear()
    cy.get('[data-cy=clientsTable]').find("tbody > tr").should("have.length", 4)
  })
})

describe('Given user wants to filter by status', () => {
  it('Should see the table with just the clients that match the selected status', () => {
    const filteredClient1 = "Alina"
    const filteredClient2 = "Dominic"
    cy.visit("/")
    cy.get('[data-cy=statusFilter]').select("Active")
    cy.get('[data-cy=clientsTable]').find("tbody > tr").should("have.length", 2)
    cy.get("[data-cy=clientsTable]").find("tr").eq(1).find("[data-cy=clientName]").should("contain", `Name ${filteredClient1}`)
    cy.get("[data-cy=clientsTable]").find("tr").eq(2).find("[data-cy=clientName]").should("contain", `Name ${filteredClient2}`)
    cy.get('[data-cy=statusFilter]').select("All")
    cy.get('[data-cy=clientsTable]').find("tbody > tr").should("have.length", 4)
  })
})
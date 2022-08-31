describe("Search", () => {
  it("should search Hey Jude", () => {
    cy.viewport(1600, 900);

    // Start from the index page
    cy.visit("http://localhost:3000/");

    cy.get('[data-cy="searchBar"]').eq(1).click();

    cy.get('[data-cy="searchBar"]').eq(1).type("Hey Jude").type("{enter}");

    cy.url().should("include", "/search/Hey%20Jude/tracks");
  });
});

export {};

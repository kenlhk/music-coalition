describe("Navigation", () => {
  it("should navigate to the panel page", () => {
    cy.visit("http://localhost:3000/");

    cy.get('a[href*="panel"]').click({ multiple: true, force: true });

    cy.url().should("include", "/panel");
  });
});

export {};

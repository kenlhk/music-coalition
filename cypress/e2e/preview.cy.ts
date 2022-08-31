describe("Navigation", () => {
  it("should navigate to the panel page", () => {
    cy.visit("http://localhost:3000/track/1yvMUkIOTeUNtNWlWRgANS");

    cy.get('[data-cy="previewButton"]').click();
  });
});

export { };

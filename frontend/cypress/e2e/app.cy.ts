/// <reference types="cypress" />

// Make sure both front and backend are running before executing these tests!
describe("App", function () {
  beforeEach(function () {
    cy.visit("http://localhost:3000"); // Adjust the URL to match your local development server
  });
  it("sucessfully loads", function () {
    cy.contains("Roman numeral converter");
    cy.contains("Enter a number:");
  });
  it("converts a valid number to Roman numeral", function () {
    cy.get("input").type("10"); // Type a valid number into the input field
    cy.get("button").contains("Convert").click();

    cy.contains("Roman numeral: X").should("be.visible"); // Check if the output is displayed correctly
  });
  it("handles invalid input gracefully", function () {
    cy.get("input").type("4000"); // Type an invalid number (out of range)
    cy.get("button").contains("Convert").click();

    cy.contains("Number must be between 1 and 3999").should("be.visible"); // Ensure the error message is shown for out-of-range input

    cy.get("input").clear().type("abc"); // Type a non-numeric input
    cy.get("button").contains("Convert").click();

    cy.contains("Invalid number").should("be.visible"); // Ensure the error message is shown for non-numeric input
  });
});

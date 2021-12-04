import { fromNumbers } from "../../utils/iter";
/// <reference types="Cypress" />
describe("Form Submission Test", () => {
  it("Visit the deployment site and start the questions", () => {
    cy.visit("http://localhost:3000/");

    cy.contains("Get started").click();

    cy.url().should("include", "/annotate?id=");
  });

  // const attCheckOneText =
  //   'How likely is that you are paying attention, please select "everybody"';
  it("complete the survey", () => {
    fromNumbers.forEach((submissionNo) => {
      cy.get("h2").should("contain", `${submissionNo + 1} / 60`);
      cy.get("input[type=radio]").first().check({ force: true });
      cy.get('[type="checkbox"]').check(["Nobody"], { force: true });
      cy.get("button[type=submit]").click();
    });
  });
});

describe("Done Page Tests", () => {
  it("check for Done Page with corresponding UID and Limesurvey Link", () => {
    cy.contains("Done");
    cy.contains("Thanks for participating.");
    // cy.contains("https://survey.academiccloud.de/index.php/532222?lang=de");
    cy.url().then((url) => {
      const uid = url.split("=")[1];
      cy.get("[id=doneInput]").should("have.value", uid);
      cy.contains("Continue on Limesurvey");
    });
  });
});

export {};

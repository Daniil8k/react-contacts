import cypress from "cypress";
import React from "react";

describe("Auth", () => {
	beforeEach(() => {
		cy.wait(500);
	});

	it("Login as test user", () => {
		cy.visit("/");
		const email = "test@mail.com";
		const password = "BAJFr2FF";

		cy.get("input#email").type(email);
		cy.get("input#password").type(`${password}{enter}`);

		cy.url().should("include", "/");
		cy.contains(email);
	});

	it("Register a new user", () => {
		cy.visit("/");
		const rand = (Math.random() * 100).toFixed(0);
		const email = `user${rand}@mail.com`;
		const password = "password1";

		cy.get("button").contains("Sign Up").as("signUpButton").click();
		cy.get("input#email").type(email);
		cy.get("input#password").type(`${password}`);
		cy.get("input#confirm_password").type(`${password}{enter}`);

		cy.url().should("include", "/");
		cy.contains(email);
	});
});

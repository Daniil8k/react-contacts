/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

import "cypress-localstorage-commands";

declare global {
	namespace Cypress {
		interface Chainable {
			login(): Chainable<void>;
		}
	}
}

Cypress.Commands.add("login", () => {
	const email = "test@mail.com";
	const password = "BAJFr2FF";

	cy.request({
		method: "POST",
		url: "http://localhost:3000/login",
		body: {
			email,
			password
		}
	})
		.its("body")
		.then((body) => {
			cy.setLocalStorage("accessToken", body.accessToken);
			cy.setLocalStorage("user", JSON.stringify(body.user));
			cy.saveLocalStorage();
		});
});
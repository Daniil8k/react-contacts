import cypress from "cypress";
import React from "react";

const contact = {
	name: "John Week",
	email: "john@mail.com",
	phone: "+1 43043028"
};

describe("Contacts", () => {
	before(() => {
		cy.login();
	});

	beforeEach(() => {
		cy.restoreLocalStorage();
		cy.wait(500);
	});

	it("Create new contact", () => {
		cy.visit("/");

		cy.get("button").contains("New contact").click();
		cy.get("input#name").type(contact.name);
		cy.get("input#email").type(contact.email);
		cy.get("input#phone").type(contact.phone);
		cy.get("button").contains("Create").click();

		cy.contains(contact.name);
		cy.contains(contact.email);
		cy.contains(contact.phone);
	});

	it("Edit contact", () => {
		let newEmail = "week@mail.ru";
		let newPhone = "+1 920230";
		cy.contains(contact.name).parent().find("button[title=edit]").click();

		cy.get("input#email").type(`{selectAll}${newEmail}`);
		cy.get("input#phone").type(`{selectAll}${newPhone}`);
		cy.get("button").contains("Edit").click();

		cy.contains(contact.name);
		cy.contains(newEmail);
		cy.contains(newPhone);
	});

	it("Delete contact", () => {
		cy.contains(contact.name)
			.parent()
			.find("button[title=delete]")
			.as("DeleteButton")
			.click();

		cy.contains(contact.name).should("not.exist");
	});
});

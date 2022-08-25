import baseAxios from "@/api/helpers/baseAxios";
import { IContact } from "@/types/types";

const getConfig = () => ({
	headers: { Authorization: "Bearer " + localStorage.getItem("accessToken") }
});

const getUserId = () => {
	let user = localStorage.getItem("user") ? localStorage.getItem("user") : null;
	return user ? JSON.parse(user)?.id : "";
};

const getAll = async () => {
	const response = await baseAxios.get<IContact[]>(
		`/contacts?userId=${getUserId()}`,
		getConfig()
	);

	return response.data;
};

const create = async (contact: IContact) => {
	const response = await baseAxios.post<IContact[]>(
		"/contacts",
		{ ...contact, userId: getUserId() },
		getConfig()
	);

	return response.data;
};

const update = async (contact: IContact) => {
	const response = await baseAxios.put<IContact[]>(
		`/contacts/${contact.id}`,
		{ ...contact, userId: getUserId() },
		getConfig()
	);

	return response.data;
};

const remove = async (contactId: IContact["id"]) => {
	const response = await baseAxios.delete<IContact[]>(
		`/contacts/${contactId}`,
		getConfig()
	);

	return contactId;
};

export default { getAll, create, update, remove };
